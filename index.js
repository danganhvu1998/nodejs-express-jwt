const app = require("./app");


let port = 3031
app.app.listen(port, () => {
  console.log("Example app listening on port ${port}!");
});