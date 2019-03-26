var app = require("../app.js");

app.listen(process.env.PORT || 3000);
console.log(">> Server start on port " + (process.env.PORT || 3000));