module.exports = app => {
    const info = require("../controllers/info.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", info.create);
  
    router.get("/", info.findAll);

  
    app.use('/api/info', router);
  };