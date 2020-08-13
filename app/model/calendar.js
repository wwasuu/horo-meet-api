module.exports = (sequelize, type) => {
  return sequelize.define(
    "calendar",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: type.DATE,
      },
      zodiac_code: {
        type: type.STRING,
      },
      element_code: {
        type: type.STRING,
      },
      created_at: type.DATE,
      updated_at: type.DATE,
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
