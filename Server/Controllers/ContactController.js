const Contact = require("../Models/ContactSchema");


const addFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  if(!name || !email || !message){
    return res.json({ success: false});
  }

  try{
        const newUser = new Contact({ name, email, message });
        await newUser.save();
        return res.json({ success: true, message: "msg saved" });
  }
  catch(err){
        // console.error("Error occuruing", err);
        return res.json({ success: false, message: "error" });
  }
  
}


module.exports = addFeedback;