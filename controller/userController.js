const User = require("../models/User")


const addUser = async (req,res) => {
    const { firstname,lastname,email,username,password } = req.body;

    const user = new User({ firstname,lastname,email,username,password });
    try{
        await user.save();
        res.status(200).send("<h1> User Created </h1>");
    }
    catch(err){
        res.send("ERROR : " + err);
    }
}


const getUserByUserId = async (req,res) => {
    const userid = req.params.userid;

    try{
        const user = await User.findById(userid);
        res.status(200).send(user);
    }
    catch(err){
        res.send("ERROR : " + err)
    }
}


const getUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).send(users);
    }
    catch(err){
        res.send("ERROR : " + err);
    }
}


module.exports = {
    addUser,
    getUserByUserId,
    getUsers
}