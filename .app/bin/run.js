var app = require("../app.js");

app.listen(process.env.PORT || 3000);
console.log("server start on port " + (process.env.PORT || 3000));