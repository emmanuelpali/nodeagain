const User = require('../model/User') 
const bcrypt = require('bcrypt');

const handleNewUser = async ( req, res ) => {
    const { userName, pwd } = req.body;
    if(!userName || !pwd) return res.status(400).json({ 'message': 'Username and password are required'});
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: userName}).exec();
    if(duplicate) return res.sendStatus(409); //conflict
    try{
        //encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store
        const newUser = await User.create({ 
            'username': userName, 
            "password": hashedPwd
         });
        console.log(newUser);
        res.status(201).json({ 'success': `New user ${newUser} created!`})
    } catch (err) {
        res.stetus(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };