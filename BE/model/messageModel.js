import mongoose, {Schema, model} from 'mongoose';


const messageSchema = new Schema({
    text: {
        type: String,
    },
    author:
        {
            type: mongoose.SchemaTypes.ObjectId,
              //ref:MessageModel,
           }
    

})

const Message = model("Message", messageSchema);

export default Message;