module.exports = (sequelize, type) => {
    return sequelize.define(
      "element",
      {
        id: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name_th: {
          type: type.STRING,
        },
        name_en: {
          type: type.STRING,
        },
        code: {
          type: type.STRING,
        },
        value: {
          type: type.INTEGER,
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
  