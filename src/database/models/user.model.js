const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Users',
  });

  return UserTable;
};

module.exports = UserSchema;
