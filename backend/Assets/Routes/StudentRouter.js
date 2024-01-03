import express from "express";
import Student from '../Controller/StudentController.js';
import Auth from '../Middleware/Auth.js';

const router = express.Router();

router.post('/student/createAccount', Student.CreateAccount);
router.post('/student/login', Student.StudentLogin);

router.get('/student/profile', Auth, Student.profileView);


router.put('/student/updateProfile', Auth, Student.ProfileUpdate);
router.put('/student/changePassword', Auth, Student.ChangePassword);
router.get('/student/profiles', Student.StudentProfiles);



export default router;
