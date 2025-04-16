// = =================================== ADD NEW Election======
//POST :api/elections
// PROTECTED(only admin)
const addElection = (req, res, next) =>{
    res.json("Add Election");
}


// = =================================== Get all elections======
//POST :api/elections
// PROTECTED
const getElections = (req, res, next) =>{
    res.json("Get All Election");
}


// = =================================== GET SINGLE Election======
//GET :api/elections/:id
// PROTECTED
const getElection = (req, res, next) =>{
    res.json("Get single Election");
}


// = ===================================Get Election  candidates======
//GET :api/elections/id/candidates
// PROTECTED
const getCandidatesOfElection = (req, res, next) =>{
    res.json("get candidates of election");
}


// = =================================== get Voters of Election======
//GET :api/elections/id/voters
// PROTECTED
const  getElectionVoters= (req, res, next) =>{
    res.json("Get Election voters");
}


// = =================================== UPDATE Election======
//PATCH :api/elections/id
// PROTECTED
const updateElection = (req, res, next) =>{
    res.json("Edit Election");
}


// = =================================== Delete Election======
//DELETE :api/elections/:id
// PROTECTED(only admin)
const removeElection = (req, res, next) =>{
    res.json("Delete Election");
}

module.exports = {addElection, getElection, getElections, updateElection, removeElection,
    getCandidatesOfElection, getElectionVoters
}