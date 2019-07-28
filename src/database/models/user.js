export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
        allowNull: false
      },
      password: {
      type: DataTypes.STRING,
        allowNull: false
      },
    },
    { paranoid: true }
  );
  User.associate = (models) => {

  };
  return User;
};


