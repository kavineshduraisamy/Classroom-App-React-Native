import express from "express";
import Teacher from '../Controller/TeacherController.js';
import Auth from '../Middleware/Auth.js';

const router = express.Router();

router.post('/teacher/createAccount',Teacher.CreateAccount);

router.post('/teacher/login',Teacher.TeacherLogin);

router.get('/teacher/profile',Auth,Teacher.profileView);
router.put('/teacher/updateProfile',Auth,Teacher.ProfileUpdate);
router.put('/teacher/changePassword',Auth,Teacher.ChangePassword);
router.get('/teacher/profiles',Teacher.TeacherProfiles);

export default router;
