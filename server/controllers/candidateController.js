// = =================================== Add Candidate======
//POST :api/candidates
// PROTECTED(only admin)
const addCandidate = (req, res, next) =>{
    res.json("ADD Candidate");
}




// = =================================== GET Candidate======
//POST :api/candidates/:id
// PROTECTED
const getCandidate = (req, res, next) =>{
    res.json("Get Candidate");
}




// = =================================== DELETE Candidate======
//DELETE :api/candidates/:id
// PROTECTED(only admin)
const removeCandidate = (req, res, next) =>{
    res.json("DElete Candidate");
}




// = =================================== VOTE Candidate======
//PATCH:api/candidates/:id
// PROTECTED
const voteCandidate = (req, res, next) =>{
    res.json("Vote Candidate");
}



module.exports = {addCandidate, voteCandidate, getCandidate, removeCandidate}