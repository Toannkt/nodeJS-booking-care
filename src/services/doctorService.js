/** @format */

import db from "../models/index";
require("dotenv").config();
import _ from "lodash";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

const getTopDoctorHome = (limitInput) => {
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

const getAllDoctor = () => {
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

const createDetailDoctors = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (
                        !data.doctorId ||
                        !data.contentHTML ||
                        !data.contentMarkdown ||
                        !data.description ||
                        !data.action ||
                        !data.selectedPrice ||
                        !data.selectedProvince ||
                        !data.selectedPayment ||
                        !data.nameClinic ||
                        !data.addressClinic ||
                        !data.note
                  ) {
                        resolve({
                              errCode: 1,
                              message: "Missing parameter 'doctorId' || 'contentHTML' || 'contentMarkdown'!",
                        });
                  } else {
                        //upsert to markdown table
                        if (data.action === "CREATE") {
                              await db.Markdown.create({
                                    contentHTML: data.contentHTML,
                                    contentMarkdown: data.contentMarkdown,
                                    description: data.description,
                                    doctorId: data.doctorId,
                                    specialtyId: data.specialtyId,
                                    clinicId: data.clinicId,
                              });
                        } else if (data.action === "EDIT") {
                              let doctorMarkdown = await db.Markdown.findOne({
                                    where: { doctorId: data.doctorId },
                                    raw: false,
                              });
                              if (doctorMarkdown) {
                                    (doctorMarkdown.contentHTML = data.contentHTML),
                                          (doctorMarkdown.contentMarkdown = data.contentMarkdown),
                                          (doctorMarkdown.descrition = data.description),
                                          (doctorMarkdown.updateAt = new Date());
                                    await doctorMarkdown.save();
                              }
                        }
                        //upsert to doctor_infor table
                        let doctorInfor = await db.Doctor_Infor.findOne({
                              where: {
                                    doctorId: data.doctorId,
                              },
                              raw: false,
                        });
                        if (doctorInfor) {
                              doctorInfor.doctorId = data.doctorId;
                              doctorInfor.priceId = data.selectedPrice;
                              doctorInfor.paymentId = data.selectedPayment;
                              doctorInfor.provinceId = data.selectedProvince;
                              doctorInfor.nameClinic = data.nameClinic;
                              doctorInfor.addressClinic = data.addressClinic;
                              doctorInfor.note = data.note;
                              await doctorInfor.save();
                        } else {
                              await db.Doctor_Infor.create({
                                    doctorId: data.doctorId,
                                    priceId: data.selectedPrice,
                                    paymentId: data.selectedPayment,
                                    provinceId: data.selectedProvince,
                                    nameClinic: data.nameClinic,
                                    addressClinic: data.addressClinic,
                                    note: data.note,
                              });
                        }
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

const getDetailDoctor = (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let data = await db.User.findOne({
                        where: { id: id },
                        attributes: {
                              exclude: ["password"],
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
                              {
                                    model: db.Doctor_Infor,
                                    attributes: {
                                          exclude: ["id", "doctorId"],
                                    },
                                    include: [
                                          {
                                                model: db.Allcodes,
                                                as: "priceTypeData",
                                                attributes: ["valueEn", "valueVi"],
                                          },
                                          {
                                                model: db.Allcodes,
                                                as: "provinceTypeData",
                                                attributes: ["valueEn", "valueVi"],
                                          },
                                          {
                                                model: db.Allcodes,
                                                as: "paymentTypeData",
                                                attributes: ["valueEn", "valueVi"],
                                          },
                                    ],
                              },
                        ],
                        raw: true,
                        nest: true,
                  });
                  if (data && data.image) {
                        data.image = new Buffer(data.image, "base64").toString("binary");
                  }
                  if (!data) data = {};
                  resolve({
                        errCode: 0,
                        data: data,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const bulkCreateSchedule = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                        resolve({
                              errCode: 1,
                              message: "Missing parameters!",
                        });
                  } else {
                        let schedule = data.arrSchedule;
                        if (schedule && schedule.length > 0) {
                              schedule.map((item) => {
                                    item.maxNumber = MAX_NUMBER_SCHEDULE;
                                    return item;
                              });
                        }
                        let existing = await db.Schedule.findAll({
                              where: { doctorId: data.doctorId, date: data.formatedDate },
                              attributes: ["timeType", "date", "doctorId", "maxNumber"],
                              raw: true,
                        });
                        // convert date from string to date
                        // if (existing && existing.length > 0) {
                        //       existing = existing.map((item) => {
                        //             item.date = new Date(item.date).getTime();
                        //             return item;
                        //       });
                        // }
                        // choose item different
                        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                              return a.timeType === b.timeType && +a.date === +b.date;
                        });

                        if (toCreate && toCreate.length > 0) {
                              await db.Schedule.bulkCreate(toCreate);
                        }
                        resolve({
                              errCode: 0,
                              errMessage: "Ok",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const getScheduleByDate = (doctorId, date) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!doctorId || !date) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing required doctorId or date!",
                        });
                  } else {
                        let dataSchedule = await db.Schedule.findAll({
                              where: { doctorId: doctorId, date: date },
                              include: [
                                    { model: db.Allcodes, as: "timeTypeData", attributes: ["valueEn", "valueVi"] },
                                    { model: db.User, as: "doctorData", attributes: ["firstName", "lastName"] },
                              ],
                              raw: false,
                              nest: true,
                        });
                        if (!dataSchedule) dataSchedule = [];
                        resolve({
                              errCode: 0,
                              data: dataSchedule,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const getExtraDoctorById = (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!id) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing required parameter!",
                        });
                  } else {
                        let data = await db.Doctor_Infor.findOne({
                              where: { doctorId: id },
                              attributes: { exclude: ["id", "doctorId"] },
                              include: [
                                    { model: db.Allcodes, as: "priceTypeData", attributes: ["valueEn", "valueVi"] },
                                    { model: db.Allcodes, as: "paymentTypeData", attributes: ["valueEn", "valueVi"] },
                                    { model: db.Allcodes, as: "provinceTypeData", attributes: ["valueEn", "valueVi"] },
                              ],
                              raw: false,
                              nest: true,
                        });
                        if (!data) data = {};
                        resolve({
                              errCode: 0,
                              data: data,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

// const getProfileDoctorById = (id) => {
//       return new Promise(async (resolve, reject) => {
//             try {
//                   if (!id) {
//                         resolve({
//                               errCode: 1,
//                               errMessage: "Missing required parameter!",
//                         });
//                   } else {
//                         let data = await db.Doctor_Infor.findOne({
//                               where: { doctorId: id },
//                               attributes: {
//                                     exclude: ["password"],
//                               },
//                               include: [
//                                     {
//                                           model: db.Markdown,
//                                           attributes: ["contentHTML", "contentMarkdown", "description"],
//                                     },
//                                     {
//                                           model: db.Allcodes,
//                                           as: "positionData",
//                                           attributes: ["valueEn", "valueVi"],
//                                     },
//                                     {
//                                           model: db.Doctor_Infor,
//                                           attributes: {
//                                                 exclude: ["id", "doctorId"],
//                                           },
//                                           include: [
//                                                 {
//                                                       model: db.Allcodes,
//                                                       as: "priceTypeData",
//                                                       attributes: ["valueEn", "valueVi"],
//                                                 },
//                                                 {
//                                                       model: db.Allcodes,
//                                                       as: "provinceTypeData",
//                                                       attributes: ["valueEn", "valueVi"],
//                                                 },
//                                                 {
//                                                       model: db.Allcodes,
//                                                       as: "paymentTypeData",
//                                                       attributes: ["valueEn", "valueVi"],
//                                                 },
//                                           ],
//                                     },
//                               ],
//                               raw: true,
//                               nest: true,
//                         });
//                         console.log("data: ", data);
//                         if (data && data.image) {
//                               data.image = new Buffer(data.image, "base64").toString("binary");
//                         }
//                         if (!data) data = {};
//                         resolve({
//                               errCode: 0,
//                               data: data,
//                         });
//                   }
//             } catch (e) {
//                   reject(e);
//             }
//       });
// };
module.exports = {
      getTopDoctorHome: getTopDoctorHome,
      getAllDoctor: getAllDoctor,
      createDetailDoctors: createDetailDoctors,
      getDetailDoctor: getDetailDoctor,
      bulkCreateSchedule: bulkCreateSchedule,
      getScheduleByDate: getScheduleByDate,
      getExtraDoctorById: getExtraDoctorById,
      // getProfileDoctorById: getProfileDoctorById,
};
