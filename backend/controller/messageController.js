import MessageModel from "../model/messageModel.js";
import UserModel from "../model/userModel.js";

export const createMessage = async (req, res) => {
    try {
      const newMessage = new MessageModel(req.body); 
      await newMessage.save();
      const user = await UserModel.findById(req.body.author);
      user.messages.push(newMessage);
      user.save();

      res.json({ msg: "New message was created", newMessage });
    } catch (error) {
      res.send(error.message);
    }
  };

  export const findMessage = async(text, author) => { 
    try {
        const message = await MessageModel.findOne({ text, author });            
        return message;
      } catch (error) {
        console.log(error);    
      }   
  };