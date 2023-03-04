import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    raw: true,
                    attributes:['roleId', 'email', 'password'],
                    where:{email: email},
                })
                if(user){
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode= 0;
                        userData.errMessage ='Ok!'
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong Password!'
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`
                }
                resolve(userData);
            }else{
                userData.errCode = 1;
                userData.errMessage  = `Your's Email isn't exist in your system. Plz try other Email!`
                resolve(userData);
            }
        }catch(e){
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email}
            })
            if(user) resolve(true);
            else resolve(false);
        } catch(e){
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
}