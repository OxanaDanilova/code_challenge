import MessageModel from "../model/messageModel.js";
import UserModel from "../model/userModel.js";

// export const getAllMessages = async (req, res) => {
//     try {
//         const messages = await MessageModel.find();
//         res.status(200).json(messages);
//       } catch (error) {
//         console.log(error);
//         res.send(error.message);
//       }   
//   };

//   export const getUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await UserModel.findById(userId);
//         res.status(200).json(user);
//       } catch (error) {
//         console.log(error);
//         res.send(error.message);
//       }   
//   };

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