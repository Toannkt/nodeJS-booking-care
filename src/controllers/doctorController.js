/** @format */

import doctorService from "../services/doctorService";

const getTopDoctorHome = async (req, res) => {
      let limit = req.query.limit;
      if (!limit) limit = 10;
      try {
            let response = await doctorService.getTopDoctorHome(+limit);
            return res.status(200).json(response);
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: "Error from the server!",
            });
      }
};

const getAllDoctor = async (req, res) => {
      try {
            let response = await doctorService.getAllDoctor();
            return res.status(200).json(response);
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: "Error from the server!",
            });
      }
};

const createDetailDoctors = async (req, res) => {
      try {
            let response = await doctorService.createDetailDoctors(req.body);
            return res.status(200).json(response);
      } catch (e) {
            return res.status(200).json({
                  errCode: -1,
                  errMessage: "Error from the server!",
            });
      }
};

const getDetailDoctor = async (req, res) => {
      try {
            let id = req.query.id;
            if (!id) {
                  return res.status(200).json({
                        errCode: 1,
                        errMessage: "Missing parameter",
                  });
            }
            let response = await doctorService.getDetailDoctor(id);
            return res.status(200).json(response);
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: "Erro from server...",
            });
      }
};

const bulkCreateSchedule = async (req, res) => {
      try {
            let infor = await doctorService.bulkCreateSchedule(req.body);
            return res.status(200).json(infor);
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: "Error from the server!",
            });
      }
};

let getScheduleByDate = async (req, res) => {
      try {
            let infor = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
            return res.status(200).json(infor);
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: "Error from the server!",
            });
      }
};

module.exports = {
      getTopDoctorHome: getTopDoctorHome,
      getAllDoctor: getAllDoctor,
      createDetailDoctors: createDetailDoctors,
      getDetailDoctor: getDetailDoctor,
      bulkCreateSchedule: bulkCreateSchedule,
      getScheduleByDate: getScheduleByDate,
};
