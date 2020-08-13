module.exports = (sequelize, type) => {
    return sequelize.define(
      "sages_table",
      {
        id: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        value: {
            type: type.INTEGER,
        },
        zodiac_th: {
          type: type.STRING,
        },
        zodiac_en: {
          type: type.STRING,
        },
        zodiac_code: {
          type: type.STRING,
        },
        zodiac_value: {
          type: type.INTEGER,
        },
        element_th: {
          type: type.STRING,
        },
        element_en: {
          type: type.STRING,
        },
        element_code: {
          type: type.STRING,
        },
        element_value: {
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
  