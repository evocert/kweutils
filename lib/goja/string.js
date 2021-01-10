define([],function(){
        //String.prototype.slice=String.prototype.slice==null?function(){return this.trim();}:String.prototype.slice;
        String.prototype.trimRight=String.prototype.trimRight==null?function(){return this.trim();}:String.prototype.trimRight;
        String.prototype.trimLeft=String.prototype.trimLeft==null?function(){return this.trim();}:String.prototype.trimLeft;
        String.prototype.trimEnd=String.prototype.trimEnd==null?function(){return this.trim();}:String.prototype.trimEnd;
        String.prototype.trimStart=String.prototype.trimStart==null?function(){return this.trim();}:String.prototype.trimStart;
        return String;
});
