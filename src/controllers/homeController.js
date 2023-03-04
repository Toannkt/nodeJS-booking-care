import db from '../models/index'
import CRUDService from '../services/CRUDService';

let getHomePage = async(req, res)  => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch(e) {
        console.log(e)
    }
}


let getCrud = async(req, res)  => {
    res.render('crud.ejs')
}
let displayGetCrud  =  async(req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs',{
        data:data,
    });
}

let postCrud = async(req, res) => {
    const message = await CRUDService.createNewUser(req.body);
    res.send('post crud')
    console.log(message)
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check data not found
        res.render('editCRUD.ejs',{
            user: userData
        })
    }
    else{ return res.send('not found 404')}
    
}

let putCRUD = async(req, res) => {
    let data = req.body;
    let newUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        data: newUser
    })
}

let destroyCRUD = async(req, res) => {
    let userId = req.query.id;
    if(userId){
        let userAll = await CRUDService.destroyUserById(userId);
        res.render('displayCRUD.ejs',{
            data: userAll,
        })
    }
    else{ return res.send('not found 404')}
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
    displayGetCrud: displayGetCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    destroyCRUD: destroyCRUD,
};