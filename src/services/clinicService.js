/** @format */

import db from "../models/index";

let createClinic = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (
                        !data.name ||
                        !data.address ||
                        !data.imageBase64 ||
                        !data.descriptionHTML ||
                        !data.descriptionMarkdown
                  ) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing parameter!",
                        });
                  } else {
                        await db.Clinic.create({
                              name: data.name,
                              descriptionMarkdown: data.descriptionMarkdown,
                              descriptionHTML: data.descriptionHTML,
                              address: data.address,
                              image: data.imageBase64,
                        });
                        resolve({
                              errCode: 0,
                              errMessage: "OK!",
                        });
                  }
            } catch (e) {
                  console.log(e);
                  reject(e);
            }
      });
};

module.exports = {
      createClinic: createClinic,
};
