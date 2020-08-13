module.exports = (sequelize, type) => {
    return sequelize.define(
      "time_zodiac",
      {
        id: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        time_start: {
          type: type.TIME,
        },
        time_end: {
          type: type.TIME,
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
  