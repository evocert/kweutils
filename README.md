# kweutils
Various utilities, index.html for browser, and main.goja.js for server.

For Goja, in main.goja.js, ensure you adjust the paths as needed
```
...
var GOJA=true;
eval(fsutils.File2String('./www/kweutils/lib/core/require.goja.js'));
eval(fsutils.File2String('./www/kweutils/main.js'));
...
```
Additionally, in main.js, ensure you adjust the baseUrl as needed.

```
...
require.config({
    baseUrl:"./www/kweutils/",
...
```

In main.js, DBALIAS may be adjusted to a configured alias
