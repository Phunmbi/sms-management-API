export default (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
