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
      type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Contacts',
          key: 'phoneNumber',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      }
    },
      receiverId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Contacts',
          key: 'phoneNumber',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
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
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};
