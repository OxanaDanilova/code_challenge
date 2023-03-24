import { findUser } from "./userController.js";
import UserModel from "../model/userModel.js";
import MessageModel from "../model/messageModel.js";

export const importFile = async(req, res) => {        
        const dataString = String(req.files.file.data);
        const dataArr = dataString.split('\r\n');  
        try {
            await parseData(dataArr);     
            res.status(201).send();
            
        } catch (error) {
            console.log(error);
        }
       
}

export const parseSubscriptionsData = async(row)=> {
    if (row) {   
    const usersArr = row.split('>');
            const firstUser = usersArr[0].trim();        
            const secondUser = usersArr[1].trim();
            const firstUserName = firstUser.split(' ')[0].trim();           
            const firstUserSurname = firstUser.split(' ')[1].trim();           
            const secondUserName = secondUser.split(' ')[0].trim();         
            const secondUserSurname = secondUser.split(' ')[1].trim();     
            let secondUserObj /* = await  findUser(secondUserName, secondUserSurname) */;
            let secondUserId;
           let firstUserObj /* = await  findUser(firstUserName, firstUserSurname) */;           
       
            if (!await  findUser(secondUserName, secondUserSurname)){    
                     
                secondUserObj = new UserModel({name: secondUserName, surname:secondUserSurname}); 
                await secondUserObj.save();
                secondUserId = String(secondUserObj._id);
            } else {
                secondUserObj = await  findUser(secondUserName, secondUserSurname);
                secondUserId = String(secondUserObj._id);
     
            }

            if (await  findUser(firstUserName, firstUserSurname)){  
                firstUserObj = await  findUser(firstUserName, firstUserSurname);      
                if (!firstUserObj.subscriptions.includes(secondUserId)){
                    firstUserObj.subscriptions.push(secondUserId);  
                   await  firstUserObj.save();             
                 
                } 
             
            } else {              
                firstUserObj = new UserModel({name: firstUserName, surname:firstUserSurname, subscriptions:[secondUserId]}); 
                await firstUserObj.save();             
            }
        }
}


export const parseMessageData = async(row)=> {
    if (row) {
        const tempArr = row.split(':');
            const user = tempArr[0].trim();
            const userMessage = tempArr[1].trim();          
            const userName = user.split(' ')[0].trim();           
            const userSurname = user.split(' ')[1].trim();           
            let userObj = await  findUser(userName, userSurname);          
            if (!userObj){           
                userObj = new UserModel({name: userName, surname:userSurname}); 
                await userObj.save();
                if (!userObj.messages.includes({text:userMessage, author:String(userObj._id)})){
                    const newMessage = new MessageModel({text:userMessage, author:String(userObj._id)}); 
                    await newMessage.save();                  
                    userObj.messages.push(newMessage);
                    await userObj.save(); 
                }                     
                
            } else {
                if (!userObj.messages.includes({text:userMessage, author:String(userObj._id)})){
                    const newMessage = new MessageModel({text:userMessage, author:String(userObj._id)}); 
                    await newMessage.save();              
                    userObj.messages.push(newMessage);
                    await userObj.save(); 
                }  
            }    
        }       
}

export const parseData = async(arr)=> {
    const subArr = [];
    const mesArr = [];
    arr.map((row)=> {
        if (row.includes('>')){
            subArr.push(row);
        }
        if (row.includes(':')){
            mesArr.push(row);

    }})
    try {
        for (let i=0; i<=subArr.length; i++){
            await parseSubscriptionsData(subArr[i])
        }
       // subArr.map(async(row)=>await parseSubscriptionsData(row));     
       for (let i=0; i<=mesArr.length; i++){
        await parseMessageData(mesArr[i])
    }
         
        //   if (row.includes(':')){
        //     await parseMessageData(row);     

        // }

       
        
    } catch (error) {
        console.log(error);
    }


}

