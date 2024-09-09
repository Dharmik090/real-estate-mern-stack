const Property = require('../models/Property');
const User = require('../models/User');


const addProperty = async (req,res) => {
    const userid = req.params.userid;
    const { description,price,bhk,area,status,location,city,state,country,latitude,longtitude } = req.body;
    
    try{
        const user = await User.findById(userid);

        const property = new Property({ description,price,bhk,area,status,location,city,state,country,latitude,longtitude,userid:user._id });
        await property.save();
        res.send('Property Added');
    }
    catch(err){
        res.send('ERROR : ' + err);
    }
}


const getProperties = async (req,res) => {
    try{
        const properties = await Property.find().populate('userid');

        if(!properties){
            res.send('No properties found');
            return;
        }

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

        if(!properties){
            res.send(`No property found with ID ${id}`);
            return;
        }

        res.send(property);
    }
    catch(err){
        res.send('ERROR : ' + err);
    }
}


const getPropertyByUserId = async (req,res) => {
    const userid = req.paramas.userid;

    try{
        const user = await User.findById(userid);
        if(!user){
            res.send(`User with ${userid} not found`);
            return;
        }

        const properties = await Property.find({ userid:user._id});
        if(!properties){
            res.send(`No properties found for User with ${usreid} not found`);
            return;
        }
        res.send(properties);
    }
    catch(err){
        res.send('ERROR : ' + err);
    }
}


const updateProperty = async (req, res) => {
    const id = req.params.id;
    
    try {
        const property = await Property.findByIdAndUpdate(id, req.body, { new: true });
        if (!property) {
            res.status(404).send(`Property with ID ${id} not found`);
        } else {
            res.send(property);
        }
    } catch (err) {
        res.status(500).send('ERROR : ' + err);
    }
}


const deletePropertyById = async (req,res) => {
    const id = req.params.id;
   
    try{
        const property = await Property.deleteOne({_id:id});
        if(!property){
            res.status(404).send(`Property with ID ${id} not found`);
            return;
        }
        
        res.send(`Property with ID ${id} deleted successfully`);
    }catch(err){
        res.send('ERROR : ' + err);
    }
}


module.exports = {
    addProperty,
    getProperties,
    getPropertyById,
    getPropertyByUserId,
    deletePropertyById,
    updateProperty
}