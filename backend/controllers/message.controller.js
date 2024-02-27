export const sendMessage = async (req,res) =>{
    try{
        const {message} = req.body
        const {id:receiverId} = req.params
        const senderId = req.userId
        
      let converstion  =  await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},

        })
        if(!converstion){
            converstion = await Conversation.create({
                participants:[senderId,receiverId],

            })
        }
        const newMessage = new message({
            senderId,
            receiverId,
            messsage
        })
        if(newMessage) {
            conversation.message.push(newMessage._id);
            
        }
    }catch(error){
        console.log("Error in sendMessage controller".error.message)
        res.status(500).json({error:"Internal server error"})
    }
} 