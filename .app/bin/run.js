const app = require("../app.js");
const { PORT } = require("../core/config.js").system;

app.listen(PORT);
console.log(">> Listen port " + PORT);