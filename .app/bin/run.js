const app = require("../app.js");
const { port } = require("../core/config.js").system;

app.listen(port);
console.log(">> Listen port " + port);