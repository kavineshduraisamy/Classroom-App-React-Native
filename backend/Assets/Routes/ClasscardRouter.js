import express from "express";
import createCard from '../Controller/Classcard.js';
import Auth from '../Middleware/Auth.js';

const router = express.Router();

router.post('/createCard', createCard.createCard);
router.post('/createAssignment', createCard.createAssignment);
router.post('/submitAssignment', createCard.submitAssignment);
router.post('/getclass', createCard.getclass);
router.post('/joinclass',Auth,createCard.joinclass)
router.get('/classlist',createCard.classlist)
router.post('/joinedclass',createCard.joinedclass)
router.post('/getallstudents',createCard.getAllStudents);
export default router;