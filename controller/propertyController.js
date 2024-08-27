const Property = require('../models/Property');
const User = require('../models/User');


const addProperty = async (req,res) => {
    const userid = req.params.userid;
    const { description,price,bhk,area,status,location,city,state,country,latitude,longtitude } = req.body;
    
    try{
        const user = await User.findById(userid);

        const property = new Property({ description,price,bhk,area,status,location,city,state,country,latitude,longtitude,userid:user._id });
        await property.save();
        res.send('<h1> Property Added </h1>');
    }
    catch(err){
        res.send('ERROR : ' + err);
    }
}


const getProperties = async (req,res) => {
    try{
        const properties = await Property.find().populate('userid');
        res.send(properties);
    }
    catch(err){
        res.send('ERROR : ' + err);
    }
}


const getPropertyById = async (req,res) => {
    const id = req.params.id;

    try{
        const property = await Property.findById(id);
        res.send(property);
    }
    catch(err){
        res.send('ERROR : ' + err);
    }
}


const getPropertyByUsername = async (req,res) => {
    const userid = req.paramas.userid;

    try{
        const user = await User.findById(userid);
        if(!user){
            res.send('<h1> User not found </h1>');
            return;
        }

        const properties = await Property.find({ userid:user._id});
        res.send(properties);
    }
    catch(err){
        res.send('ERROR : ' + err);
    }
}


module.exports = {
    addProperty,
    getProperties,
    getPropertyById,
    getPropertyByUsername
}