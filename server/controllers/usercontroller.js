const { set } = require('mongoose');
const User = require('../model/usermodel');
const bcrypt = require('bcryptjs');

// login controller
module.exports.login = async (req, res,next) => {
    try{
        const {username, password} = req.body;
        const  user =  await User.findOne({username});
    if(!user) {
        return res.json({status:false ,message: "User not exists"});
    }
    const unhashedPassword = await bcrypt.compare(password, user.password);
    if(!unhashedPassword) {
        return res.json({status:false ,message: "Invalid password"});
    } 
        return res.json({status:true ,data:user,message:"login sucessfull"});
        
    }
    catch(err) {
        next(err);
        return res.json({status: false,message: err.message});
    }
}

// register controller
module.exports.register = async (req, res,next) => {
    try{
        const {username, email, password} = req.body;
        const  user =  await User.findOne({username});
    if(user) {
        return res.json({status:false, message: "User already exists"});
    }
    const emailpresent = await User.findOne({email});
    if(emailpresent) {
        return res.json({status:false, message: "Email already exists"});
    }
    const hashedPassword =  await bcrypt.hash(password, 12);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword, 
      });
      await newUser.save();
    return res.json({status:true,message:"Registration successful" ,data: newUser});
    }
    catch(err) {
        next(err);
        return res.status(500).json({message: err.message});
    }
}

// avatar controller
module.exports.avatar = async (req, res,next) => {
    try{
        console.log(req.params.id)
        const {avatar} = req.body;
        const {id} = req.body;
        const user = await User.findByIdAndUpdate(id);
        if(!user) {
            return res.json({status:false, message: "User not exists" });
        }
        user.profileimg = avatar;
        user.isProfile = true;
        await user.save();
        return res.json({status:true,message:"Avatar saved", data: user});
    }
    catch(err) {
        next(err);
        return res.json({status: false,message: err.message});
    }
}   

// getuser controller
module.exports.getuser = async (req, res,next) => {
    try{
        const user = await User.find({_id : {$ne:req.params.id}}).select(["email","username","profileimg","_id"]);
        console.log(user);
        if(!user) {
            return res.json({status:false, message: "User not exists" });
        }
        return res.json(user);
        
    }
    catch(err) {
        next(err);
        return res.json({status: false,message: err.message});
    }
}   