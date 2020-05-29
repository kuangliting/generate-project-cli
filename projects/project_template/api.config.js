let Path = require("path");
let resolve = (path) => {
    return Path.resolve(__dirname, path);
}

module.exports = {
    apiHost: "http://10.9.110.37:7410/v2/api-docs",//"http://10.9.105.13:8889/v2/api-docs"
    includes: [],
    excludes: [],
    swaggerPath: resolve(".swagger/swagger.json"),
    api: {
        path: resolve("src/api"),
        fileName: "{moduleName}/index.js",
        requestPath:"../request.js",
        hasComments: true,
    },
    tsSupport: false,
    typePath: resolve("src/typings/api/smartCity.d.ts"),
}