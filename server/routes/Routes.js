const {Router} = require("express")

const {registerVoter, loginVoter, getVoter}  = require("../controllers/voterController")
const router = Router()

const {addElection ,getElection, getElections, updateElection, removeElection,
    getCandidatesOfElection, getElectionVoters
} = require("../controllers/electionController")

const {addCandidate, voteCandidate, getCandidate, removeCandidate} = require('../controllers/candidateController')

router.post('/voters/register', registerVoter);
router.post('/voters/login', loginVoter);
router.get('/voters/:id', getVoter);

router.post('/elections', addElection)
router.get('/elections', getElections)
router.get('/elections/:id', getElection)
router.delete('/elections/:id', removeElection)
router.patch('/elections/:id', updateElection)
router.get('/elections/:id/candidates', getCandidatesOfElection)
router.get('/elections/:id/voters', getElectionVoters)



router.post('/candidates', addCandidate)
router.get('/candidates/:id', getCandidate)
router.delete('/candidates/:id', removeCandidate)
router.patch('/candidates/:id',voteCandidate)  


module.exports = router


//ePPWPpxhyJr5x2ee password