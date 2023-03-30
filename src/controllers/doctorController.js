/** @format */

import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
      let limit = req.query.limit;
      if (!limit) limit = 10;
      try {
            let response = await doctorService.getTopDoctorHome(+limit);
            return res.status(200).json(response);
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  message: "Error from server...",
            });
      }
};

let getAllDoctor = async (req, res) => {
      try {
            let response = await doctorService.getAllDoctor();
            return res.status(200).json(response);
      } catch (e) {
            console.log(e);
            return res.status(200).json({
                  errCode: -1,
                  message: "Error from server...",
            });
      }
};

let createDetailDoctors = async (req, res) => {
      try {
            let response = await doctorService.createDetailDoctors(req.body);
            return res.status(200).json(response);
      } catch (e) {
            return res.status(200).json({
                  errCode: -1,
                  message: "Erro from server...",
            });
      }
};

let getDetailDoctor = async (req, res) => {
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
                  message: "Erro from server...",
            });
      }
};

module.exports = {
      getTopDoctorHome: getTopDoctorHome,
      getAllDoctor: getAllDoctor,
      createDetailDoctors: createDetailDoctors,
      getDetailDoctor: getDetailDoctor,
};
