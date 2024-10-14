const messagemodel = require("../model/messagemodel");

// addmsg function is used to send message from one user to another user
module.exports.addmsg = async (req, res,next) => {
    try{
        const {sender,reciver,message} = req.body;
        console.log(sender , reciver, message);
        const data = await messagemodel.create({
            message : { text: message},
            users : [sender,reciver],
            sender : sender
        });
        if(data)
            return res.json({status:true,message:"Message sent successfully",data:data});
        else
            return res.json({status:false,message:"Message not sent"});
    }
    catch(err) {
        next(err);
    }
}

// getmsg function is used to get messages between two users
module.exports.getmsg = async (req, res, next) => {
    try{
        const {sender,reciver} = req.body;
        const chats = await messagemodel.find({
            users:{
                $all:[sender,reciver],
            },
        }).sort({updatedAt : 1});
        const showmessage = chats.map((msg)=>{
            return  {
                from_me:  msg.sender.toString() === sender.toString(),
                message : msg.message.text,
            };
        });
        res.json(showmessage);
    }
    catch(err)
    {
        next(err);
    }
}