/** @format */

require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
      let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                  user: process.env.EMAIL_APP,
                  pass: process.env.EMAIL_APP_PASSWORD,
            },
      });

      let info = await transporter.sendMail({
            from: '"KhacToan<a>432" <toan.nguyenkhactoan432@hcmut.edu.vn>',
            to: dataSend.reciverEmail,
            subject: "Thông tin đặt lịch khám bệnh",
            html: getBodyHTMLEmail(dataSend),
      });
};

const getBodyHTMLEmail = (dataSend) => {
      console.log("dataSend: ", dataSend);
      let result = "";
      if (dataSend.lang === "vi") {
            result = `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được thông báo này vì đã đặt lịch khám bệnh online trên BookingCare By Toan!</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu thông tin trên là đúng, vui lòng click vào đường link bên dưới để xác định thủ tục khám bệnh.</p>
            <div>
                <a href="${dataSend.redirecLink} target="_blank" >Click here!</a>
            </div>
            <div>BookingCare By Toan xin chân thành cảm ơn!</div>
        `;
      }
      if (dataSend.lang === "en") {
            result = `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You received this message because you booked an online medical appointment on BookingCare By Toan!</p>
            <p>Information to schedule an appointment:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>If the above information is correct, please click on the link below to determine the medical examination procedure.</p>
            <div>
                <a href="${dataSend.redirecLink} target="_blank" >Click here!</a>
            </div>
            <div>BookingCare By Toan sincerely thanks!</div>
        `;
      }
      console.log("result: ", result);
      return result;
};

module.exports = {
      sendEmail: sendEmail,
};
