/** @format */

const db = require("../models");

const createSpecialty = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing parameter!",
                        });
                  } else {
                        await db.Specialty.create({
                              name: data.name,
                              image: data.imageBase64,
                              descriptionHTML: data.descriptionHTML,
                              descriptionMarkdown: data.descriptionMarkdown,
                        });
                        resolve({
                              errCode: 0,
                              errMessage: "OK!",
                        });
                  }
            } catch (e) {
                  console.log("<<<<<>>>> :", e);
                  reject(e);
            }
      });
};

const getAllSpecialty = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let data = await db.Specialty.findAll({});
                  if (data && data.length > 0) {
                        data.map((item) => {
                              item.image = new Buffer(item.image, "base64").toString("binary");
                              return item;
                        });
                  }
                  resolve({
                        errCode: 0,
                        data: data,
                        errMessage: "OK!",
                  });
            } catch (e) {
                  console.log(e);
                  reject(e);
            }
      });
};

const getDetailSpecialty = (inputId, location) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!inputId || !location) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing parameter!",
                        });
                  } else {
                        let data = await db.Specialty.findOne({
                              where: { id: inputId },
                              attributes: ["descriptionHTML", "descriptionMarkdown"],
                        });
                        if (data) {
                              let doctorSpecialty = [];
                              if (location === "ALL") {
                                    doctorSpecialty = await db.Doctor_Infor.findAll({
                                          where: { specialtyId: inputId },
                                          attributes: ["doctorId", "provinceId"],
                                    });
                              } else {
                                    doctorSpecialty = await db.Doctor_Infor.findAll({
                                          where: { specialtyId: inputId, provinceId: location },
                                          attributes: ["doctorId", "provinceId"],
                                    });
                              }
                              data.doctorSpecialty = doctorSpecialty;
                        }
                        resolve({
                              errCode: 0,
                              errMessage: "OK!",
                              data: data,
                        });
                  }
            } catch (e) {
                  console.log(e);
                  reject(e);
            }
      });
};
module.exports = {
      createSpecialty: createSpecialty,
      getAllSpecialty: getAllSpecialty,
      getDetailSpecialty: getDetailSpecialty,
};
