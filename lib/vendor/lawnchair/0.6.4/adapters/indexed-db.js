/**
 * indexed db adapter
 * === 
 * - originally authored by Vivian Li
 *
 */ 

Lawnchair.adapter('indexed-db', (function(){

  // update the STORE_VERSION when the schema used by this adapter changes
  // (for example, if you change the STORE_NAME above)
  // NB: Causes onupgradeneeded to be fired, which erases the old database!
  var STORE_VERSION = 3;

  var getIDB = function() {
      return window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.oIndexedDB || window.msIndexedDB;
  };

  var getIDBTransaction = function() {
      return window.IDBTransaction || window.webkitIDBTransaction || window.mozIDBTransaction || window.oIDBTransaction || window.msIDBTransaction;
  };

  var getIDBKeyRange = function() {
      return window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.oIDBKeyRange || window.msIDBKeyRange;
  };

  // see https://groups.google.com/a/chromium.org/forum/?fromgroups#!topic/chromium-html5/OhsoAQLj7kc
  var READ_WRITE = (getIDBTransaction() && 'READ_WRITE' in getIDBTransaction()) ? getIDBTransaction().READ_WRITE : 'readwrite';

  return {
    valid: function() {
        return !!getIDB();
    },

    init: function(options, callback) {
        var self = this;

        var cb = self.fn(self.name, callback);
        if (cb && typeof cb !== 'function') {
            throw 'callback not valid';
        }

        // queues pending operations
        self.waiting = [];

        // open idb
        self.idb = getIDB();
        var request = self.idb.open(self.name, STORE_VERSION);

        // attach callback handlers
        request.onerror = fail;
        request.onupgradeneeded = onupgradeneeded;
        request.onsuccess = onsuccess;

        // first start or indexeddb needs a version upgrade
        function onupgradeneeded() {
            self.db = request.result;
            self.transaction = request.transaction;

            // NB! in case of a version conflict, we don't try to migrate,
            // instead just throw away the old store and create a new one.
            // this happens if somebody changed the 
            try {
                self.db.deleteObjectStore(self.record);
            } catch (e) { /* ignore */ }

            // create object store.
            var objectStoreOptions = {
                autoIncrement: useAutoIncrement()
            }
            if( typeof( self.keyPath )) {
                objectStoreOptions.keyPath = self.keyPath;
            }
            self.db.createObjectStore(self.record, objectStoreOptions);
        }

        // database is ready for use
        function onsuccess(event) {
            // remember the db instance
            self.db = event.target.result;

            // storage is now possible
            self.store = true;

            // execute all pending operations
            while (self.waiting.length) {
                self.waiting.shift().call(self);
            }

            // we're done, fire the callback
            if (cb) {
                cb.call(self, self);
            }
        }
    },

    save:function(obj, callback) {
        var self = this;
        if(!this.store) {
            this.waiting.push(function() {
                this.save(obj, callback);
            });
            return;
         }

         var objs = (this.isArray(obj) ? obj : [obj]).map(function(o){var row_key = self.keyEmbellish(o);return o})

         var win  = function (e) {
           if (callback) { self.lambda(callback).call(self, self.isArray(obj) ? objs : objs[0] ) }
         };

         var trans = this.db.transaction(this.record, READ_WRITE);
         var store = trans.objectStore(this.record);

         for (var i = 0; i < objs.length; i++) {
          var o = objs[i];
		  var row_key = self.keyExtraction(o);
          store.put(o, row_key);
         }
         store.transaction.oncomplete = win;
         store.transaction.onabort = fail;
         
         return this;
    },
    
    batch: function (objs, callback) {
        return this.save(objs, callback);
    },
    
    get: function (row_key, callback) {
        if(!this.store) {
            this.waiting.push(function() {
                this.get(row_key, callback);
            });
            return;
        }
        var is_array = this.isArray(row_key);
        var set = ((is_array)?(row_key):([row_key]))
            .map(function(row_key)
            {return((typeof(row_key)==='string')?(row_key):(JSON.stringify(row_key)));})
            .sort();
        var res = [];
        var i = 0,
            self = this,
            req = this.db
                .transaction([this.record])
                .objectStore(this.record)
                .openCursor();
        req.onsuccess = function (event) {
            var cursor = event.target.result;
            if (!cursor) {
                var result = ((is_array)?(res):((res.length > 0)?(res[ 0 ]):(null)));
                callback(result);
                return;
            }
            var key = cursor.key;
            while (key > set[i]) {
                // cursor has passed beyond this key, check next
                ++i;
                if (i === set.length) {
                    // finito
                    var result = ((is_array)?(res):((res.length > 0)?(res[ 0 ]):(null)));
                    callback(result);
                    return;
                }
            } // /while
            if (key === set[i]) {
                // current cursor must be included in the results
                // then continue checking the next
                res.push(cursor.value);
                cursor.continue();
            } else {
                // cursor.key not yet at set[i] so lets forward to next search key
                cursor.continue(set[i]);
            }// /if
        } // /req.onsuccuss
        req.onerror = function (event) {
            req.onsuccess = req.onerror = null;
            fail(event);
        };
        return this;
    },

    exists:function(row_key, callback) {
        if(!this.store) {
            this.waiting.push(function() {
                this.exists(row_key, callback);
            });
            return;
        }

        var self = this;

        var req = this.db.transaction(self.record).objectStore(this.record).openCursor(getIDBKeyRange().only(row_key));

        req.onsuccess = function(event) {
            req.onsuccess = req.onerror = null;
            // exists iff req.result is not null
            // XXX but firefox returns undefined instead, sigh XXX
            var undef;
            self.lambda(callback).call(self, event.target.result !== null &&
                                             event.target.result !== undef);
        };
        req.onerror = function(event) {
            req.onsuccess = req.onerror = null;
            fail(event);
        };

        return this;
    },

    all:function(callback) {
        if(!this.store) {
            this.waiting.push(function() {
                this.all(callback);
            });
            return;
        }
        var cb = this.fn(this.name, callback) || undefined;
        var self = this;
        var objectStore = this.db.transaction(this.record).objectStore(this.record);
        var toReturn = [];
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
               toReturn.push(cursor.value);
               cursor['continue']();
          }
          else {
              if (cb) cb.call(self, toReturn);
          }
        };
        return this;
    },

    keys:function(callback) {
        if(!this.store) {
            this.waiting.push(function() {
                this.keys(callback);
            });
            return;
        }
        var cb = this.fn(this.name, callback) || undefined;
        var self = this;
        var objectStore = this.db.transaction(this.record).objectStore(this.record);
        var toReturn = [];
        // in theory we could use openKeyCursor() here, but no one actually
        // supports it yet.
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
               var row_key = cursor.key;
               try{row_key = JSON.parse(row_key);}catch(exc){}
               toReturn.push(row_key);
               cursor['continue']();
          }
          else {
              if (cb) cb.call(self, toReturn);
          }
        };
        return this;
    },

    remove:function(keyOrArray, callback) {
        if(!this.store) {
            this.waiting.push(function() {
                this.remove(keyOrArray, callback);
            });
            return;
        }
        var self = this;

        var toDelete = keyOrArray; 
        if (!this.isArray(keyOrArray)) {
          toDelete=[keyOrArray];
        }


        var win = function () {
          if (callback) self.lambda(callback).call(self)
        };

        var os = this.db.transaction(this.record, READ_WRITE).objectStore(this.record);

        for (var i = 0; i < toDelete.length; i++) {
          var row_key = self.keyExtraction(toDelete[i]);
          os['delete'](row_key);
        };

        os.transaction.oncomplete = win;
        os.transaction.onabort = fail;

        return this;
    },

    nuke:function(callback) {
        if(!this.store) {
            this.waiting.push(function() {
                this.nuke(callback);
            });
            return;
        }
        
        var self = this
        ,   win  = callback ? function() { self.lambda(callback).call(self) } : function(){};
        
        try {
          var os = this.db.transaction(this.record, READ_WRITE).objectStore(this.record);
          os.clear();
          os.transaction.oncomplete = win;
          os.transaction.onabort = fail;
        } catch (e) {
          if (e.name=='NotFoundError') 
            win() 
          else 
            fail(e);
        }
        return this;
    }
    
  };

  //
  // Helper functions
  //

  function fail(e, i) {
      console.error('error in indexed-db adapter!', e, i);
  }

  function useAutoIncrement() {
      // using preliminary mozilla implementation which doesn't support
      // auto-generated keys.  Neither do some webkit implementations.
      return !!window.indexedDB;
  }

})());
