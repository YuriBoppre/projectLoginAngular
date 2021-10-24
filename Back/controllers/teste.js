const db = require("../models");
const Teste = db.teste;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.usuario) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Teste
    //TODO
    const teste = {
        usuario: req.body.usuario,
        senha: req.body.senha
    };
  
    // Save user in the database
    Teste.create(teste)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;
  
    Teste.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user."
        });
      });
  };

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Teste.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
  };

  // Login
  exports.login = (req, res) => {
    Teste.findOne({ where: {
        usuario: req.body.usuario,
        senha: req.body.senha
      }
    }).then( data => {
      if(!data) res.send({ success: false, message: 'Erro ao realizar login' });
      res.send({ success: true, message: 'Login realizado com sucesso' });
    }).catch(err => {
      res.status(500).send({
        message: "Erro no servidor"
      });
    });
  };

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Teste.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update usuario with id=${id}. Maybe usuario was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Teste.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Produto was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Produto with id=${id}. Maybe Produto was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Produto with id=" + id
        });
      });
  };

// Delete all Produtos from the database.
exports.deleteAll = (req, res) => {
    Teste.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Produtos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Produtos."
        });
      });
  };