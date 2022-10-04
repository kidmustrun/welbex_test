module.exports = (sequelize, Sequelize) => {
    const Info = sequelize.define("info", {
      title: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      distance: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      }
    });
  
    return Info;
  };