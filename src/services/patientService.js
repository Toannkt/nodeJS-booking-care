/** @format */

import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
      let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
      return result;
};

let postBookAppointment = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName)
                        resolve({
                              errCode: 1,
                              errMessage: "Missing parameters!",
                        });
                  else {
                        let token = uuidv4();
                        await emailService.sendEmail({
                              reciverEmail: data.email,
                              patientName: data.fullName,
                              time: data.timeString,
                              doctorName: data.doctorName,
                              lang: data.lang,
                              redirecLink: buildUrlEmail(data.doctorId, token),
                        });

                        let user = await db.User.findOrCreate({
                              where: { email: data.email },
                              defaults: {
                                    email: data.email,
                                    roleId: "R3",
                              },
                        });
                        // console.log("create booking record: ", user[0]);
                        if (user && user[0]) {
                              await db.Booking.findOrCreate({
                                    where: { patientId: user[0].id },
                                    defaults: {
                                          statusId: "s1",
                                          doctorId: data.doctorId,
                                          patientId: user[0].id,
                                          date: data.date,
                                          timeType: data.timeType,
                                          token: token,
                                    },
                              });
                        }
                        resolve({
                              errCode: 0,
                              errMessage: "Save infor patient successfully!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

let postVerifyBookAppointment = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.token || !data.doctorId) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing parameter doctorId || token !",
                        });
                  } else {
                        let appointment = await db.Booking.findOne({
                              where: {
                                    doctorId: data.doctorId,
                                    token: data.token,
                                    status: "S1",
                              },
                              raw: false,
                        });
                        if (appointment) {
                              appointment.status = "S2";
                              await appointment.save();

                              resolve({
                                    errCode: 0,
                                    errMessage: "Update the appointment succeed!",
                              });
                        } else {
                              resolve({
                                    errCode: 2,
                                    errMessage: "Update the appointment doesn't exist!",
                              });
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      postBookAppointment: postBookAppointment,
      postVerifyBookAppointment: postVerifyBookAppointment,
};
