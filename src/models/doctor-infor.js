/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Doctor_Infor extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  Doctor_Infor.belongsTo(models.User, { foreignKey: "doctorId" });

                  Doctor_Infor.hasOne(models.Markdown, { foreignKey: "doctorId" });

                  Doctor_Infor.belongsTo(models.Allcodes, {
                        foreignKey: "priceId",
                        targetKey: "keyMap",
                        as: "priceTypeData",
                  });
                  Doctor_Infor.belongsTo(models.Allcodes, {
                        foreignKey: "provinceId",
                        targetKey: "keyMap",
                        as: "provinceTypeData",
                  });
                  Doctor_Infor.belongsTo(models.Allcodes, {
                        foreignKey: "paymentId",
                        targetKey: "keyMap",
                        as: "paymentTypeData",
                  });
            }
      }
      Doctor_Infor.init(
            {
                  doctorId: DataTypes.INTEGER,
                  priceId: DataTypes.STRING,
                  specialtyId: DataTypes.INTEGER,
                  clinicId: DataTypes.INTEGER,
                  provinceId: DataTypes.STRING,
                  paymentId: DataTypes.STRING,
                  addressClinic: DataTypes.STRING,
                  nameClinic: DataTypes.STRING,
                  note: DataTypes.STRING,
                  count: DataTypes.INTEGER,
            },
            {
                  sequelize,
                  modelName: "Doctor_Infor",
            },
      );
      return Doctor_Infor;
};
