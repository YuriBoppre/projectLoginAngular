module.exports = app => {
    const produtos = require("../controllers/teste.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", produtos.create);
  
    // Login
    router.post("/login", produtos.login);

    // Retrieve all Tutorials
    router.get("/", produtos.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", produtos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", produtos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", produtos.delete);
  
    // Delete all Tutorials
    router.delete("/", produtos.deleteAll);
  
    app.use('/api/teste', router);
  };