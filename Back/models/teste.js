module.exports = (sequelize, Sequelize) => {
    const Teste = sequelize.define("teste", {
      usuario: { type: Sequelize.STRING },
      senha: { type: Sequelize.STRING },
    });
  
    return Teste;
  };