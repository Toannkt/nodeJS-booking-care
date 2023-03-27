/** @format */

import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
const cors = require("cors");

// cors HANDLE ERROR:  Access to XMLHttpRequest at 'http://localhost:8080/api/login'
// from origin 'http://localhost:3000' has been blocked by CORS policy: The value of
// the 'Access-Control-Allow-Credentials' header in the response is '' which must be
// 'true' when the request's credentials mode is 'include'. The credentials mode of
//requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
const corsOptions = {
      origin: true,
      credentials: true, //access-control-allow-credentials:true
      optionSuccessStatus: 200,
};

require("dotenv").config();

let app = express();

app.use(cors(corsOptions)); // Use this after the variable declaration
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
      console.log(`Backend Nodejs is running on the port: http://localhost:${port}`);
});
