# kweutils
Various utilities, index.html for browser, and index.goja.html for server.

Instructions: deploy to public webdirectory and make the following adjustments...

For Goja, in index.goja.html, ensure you adjust the paths as needed
```
...
var GOJA=true;
eval(fsutils.File2String('./www/kweutils/lib/core/require.goja.js'));
eval(fsutils.File2String('./www/kweutils/main.js'));
...
```
Additionally, in index.html, ensure you adjust the baseUrl as needed.

```
...
require.config({
    baseUrl:"./www/kweutils/",
...
```
