import UserModel from "../model/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
      } catch (error) {
        console.log(error);
        res.send(error.message);
      }   
  };

  export const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserModel.findById(userId).populate('messages').populate({path:'subscriptions',populate:{path: 'messages'}});
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
        res.send(error.message);
      }   
  };

  export const addUser = async (req, res) => {
    try {
      const newUser = new UserModel(req.body); 
      await newUser.save();
      res.json({ msg: "New user was added", newUser });
    } catch (error) {
      res.send(error.message);
    }
  };


  export const findUser = async(name, surname) => { 
    try {
        const user = await UserModel.findOne({ name, surname });            
        return user;
      } catch (error) {
        console.log(error);    
      }   
  };
