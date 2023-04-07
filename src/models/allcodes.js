/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Allcodes extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  Allcodes.hasMany(models.User, { foreignKey: "positionId", as: "positionData" });
                  Allcodes.hasMany(models.User, { foreignKey: "gender", as: "genderData" });

                  Allcodes.hasMany(models.Schedule, { foreignKey: "timeType", as: "timeTypeData" });

                  Allcodes.hasMany(models.Doctor_Infor, { foreignKey: "priceId", as: "priceTypeData" });
                  Allcodes.hasMany(models.Doctor_Infor, { foreignKey: "provinceId", as: "provinceTypeData" });
                  Allcodes.hasMany(models.Doctor_Infor, { foreignKey: "paymentId", as: "paymentTypeData" });
            }
      }
      Allcodes.init(
            {
                  keyMap: DataTypes.STRING,
                  type: DataTypes.STRING,
                  valueEn: DataTypes.STRING,
                  valueVi: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Allcodes",
            },
      );
      return Allcodes;
};
