import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);



let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
            })
            resolve('Oke! Create new user successfully');
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch(e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject)=>{
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            if(user){
                resolve(user);
            }
            else{
                resolve({});
            }
        } catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where:{id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.email = data.email;

                await user.save();
                let allUser = await db.User.findAll();
                resolve(allUser);
            }
            else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    })
}

let destroyUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            let userAll = await db.User.findAll();
            resolve(userAll);;
        } catch (e){
            reject(e);
        }
    })
}

const hash = bcrypt.hashSync("B4c0/\/", salt);

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    destroyUserById: destroyUserById,
}