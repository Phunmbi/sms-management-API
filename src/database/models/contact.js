export default (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    { paranoid: true }
  );
  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'sentMessage'
    });

    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receivedMessage'
    });
  };
  return Contact;
};
