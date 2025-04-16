const bcrypt = require('bcryptjs')

const VoterModel = require('../models/voterModel')
const HttpError = require('../models/ErrorModel')

// = =================================== REGISTER NEW VOTER======
//POST :api/voters/register
// UNPROTECTED
const registerVoter = async (req, res, next) =>{
    try{
       const {fullName, email, password, password2} = req.body;
       if(!fullName || !email || !password || !password2){
        return next(new HttpError("Fill in all fields.", 422))
       }
       //make all email lowercased
       const newEmail = email.toLowerCase()
       //check if the email already exists in db 
       const emailExists = await VoterModel.findOne({email: newEmail})
       if(emailExists) {
        return next(new HttpError("Email already exists.",422))
       }
       //make sure password 6+ characters
       if((password.trim().length) < 6){
        return next(new HttpError("Password Should be atleast 6 characters.",
            422
        ))
       }
       //make sure passwords match
       if(password.trim() != password2.trim()){
        return next(new HttpError("Passwords do not match.", 422))
       }
       //hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       //No user/voter should be admin except for one with email "achiever@gmail.com"

       let isAdmin = false;
       if(newEmail == "achiever@gmail.com"){
        isAdmin = true
       }
       //save new voter to db 
       const newVoter = await VoterModel.create({fullName, email: newEmail,
        password : hashedPassword, isAdmin
       })
       res.status(201).json(`New voter ${fullName} created.`)

    }catch(error){
        console.log(error);
        return next(new HttpError("Voter registration failed.", 422))
    }
}








// = =================================== LOGIN VOTER======
//POST :api/voters/login
// UNPROTECTED
const loginVoter = async (req, res, next) =>{
    res.json("Login Voter");
}


// = =================================== REGISTER NEW VOTER======
//POST :api/voters/:id
// PROTECTED
const getVoter = async (req, res, next) =>{
    res.json("Get Voter");
}



module.exports = {registerVoter, loginVoter, getVoter}