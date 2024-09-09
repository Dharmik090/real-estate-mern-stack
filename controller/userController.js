const User = require("../models/User")


const addUser = async (req,res) => {
    const { firstname,lastname,email,username,password } = req.body;

    const user = new User({ firstname,lastname,email,username,password });
    try{
        await user.save();
        res.status(200).send("User Created");
    }
    catch(err){
        res.send("ERROR : " + err);
    }
}


const getUserByUserId = async (req,res) => {
    const userid = req.params.userid;

    try{
        const user = await User.findById(userid);

        if(!user){
            res.status(404).send(`User with ID ${id} not found`);
            return;
        }
        res.status(200).send(user);
    }
    catch(err){
        res.send("ERROR : " + err)
    }
}


const getUsers = async (req,res) => {
    try{
        const users = await User.find();

        if(!users){
            res.send('No users found');
            return;
        }

        res.status(200).send(users);
    }
    catch(err){
        res.send("ERROR : " + err);
    }
}


const updateUser = async (req,res) => {
    const id = req.params.userid;

    try{
        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            res.status(404).send(`User with ID ${id} not found`);
            return;
        }

        res.send(user);
    }catch(err){
        res.send("ERROR : " + err);
    }
}


const deleteUserById = async (req,res) => {
    const id = req.params.userid;
    try{
        const user = await User.deleteOne({_id:id});
        if(!user){
            res.status(404).send(`User with ID ${id} not found`);
            return;
        }

        res.send(`User deleted successfully`);
    }catch(err){
        res.send('ERROR : ' + err);
    }
}


module.exports = {
    addUser,
    getUserByUserId,
    getUsers,
    deleteUserById,
    updateUser
}