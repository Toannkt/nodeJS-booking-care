import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing enter email or password",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users: users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditNewUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteNewUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let typeInput = req.query.type;
    if (!typeInput) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing parameter, plz provide type",
      });
    }
    let data = await userService.getAllCodeService(typeInput);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(200).json({ errCode: 1, errMessage: "No data found" });
    }
  } catch (e) {
    console.log("get all code error", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditNewUser: handleEditNewUser,
  handleDeleteNewUser: handleDeleteNewUser,
  getAllCode: getAllCode,
};
