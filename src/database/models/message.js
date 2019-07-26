export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      senderId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      receiverId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Delivered', 'Read'),
        defaultValue: 'Pending',
        allowNull: false
      }
    },
    { paranoid: true }
  );
  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      as: 'Sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });

    Message.belongsTo(models.Contact, {
      as: 'Receiver',
      foreignKey: 'receiverId',
    });

  };
  return Message;
};
