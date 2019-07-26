'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Delivered', 'Read'),
        allowNull: false,
        defaultValue: 'Pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};
