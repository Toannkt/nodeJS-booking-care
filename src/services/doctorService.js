/** @format */

/** @format */
import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = await db.User.findAll({
                        limit: limitInput,
                        where: { roleId: "R2" },
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["password"] },
                        include: [
                              { model: db.Allcodes, as: "positionData", attributes: ["valueEn", "valueVi"] },
                              { model: db.Allcodes, as: "genderData", attributes: ["valueEn", "valueVi"] },
                        ],
                        raw: true,
                        nest: true,
                  });
                  resolve({
                        errCode: 0,
                        data: users,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

let getAllDoctor = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let doctors = await db.User.findAll({
                        where: { roleId: "R2" },
                        attributes: {
                              exclude: ["password", "image"],
                        },
                  });
                  resolve({
                        errCode: 0,
                        data: doctors,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

let createDetailDoctors = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
                        resolve({
                              errCode: 1,
                              message: "Missing parameter 'doctorId' || 'contentHTML' || 'contentMarkdown'!",
                        });
                  } else {
                        console.log("data: ", data);
                        await db.Markdown.create({
                              contentHTML: data.contentHTML,
                              contentMarkdown: data.contentMarkdown,
                              description: data.description,
                              doctorId: data.doctorId,
                              specialtyId: data.specialtyId,
                              clinicId: data.clinicId,
                        });
                        resolve({
                              errCode: 0,
                              message: "Created detail doctor successfully!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

let getDetailDoctor = (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let data = await db.User.findOne({
                        where: { id: id },
                        attributes: {
                              exclude: ["password", "image"],
                        },
                        include: [
                              {
                                    model: db.Markdown,
                                    attributes: ["contentHTML", "contentMarkdown", "description"],
                              },
                              {
                                    model: db.Allcodes,
                                    as: "positionData",
                                    attributes: ["valueEn", "valueVi"],
                              },
                        ],
                        raw: true,
                        nest: true,
                  });
                  resolve({
                        errCode: 0,
                        data: data,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};
module.exports = {
      getTopDoctorHome: getTopDoctorHome,
      getAllDoctor: getAllDoctor,
      createDetailDoctors: createDetailDoctors,
      getDetailDoctor: getDetailDoctor,
};
