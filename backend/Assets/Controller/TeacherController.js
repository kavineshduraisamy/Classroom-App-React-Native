import { Teacher, validateUser } from '../Schema/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const CreateAccount = async (req, res) => {
    const Email = req.body.Email;
    console.log(req.body)
    const { error } = validateUser(req.body);

    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0]);
    }

    const ExTeacher = await Teacher.findOne({ Email: Email });

    if (ExTeacher) {
        console.log('already exist')
        return res.status(400).send("Email is already taken");
    } else {
        try {
            let Hash = await bcrypt.hash(req.body.Password, 10);

            let data = new Teacher({
                Name: req.body.Name,
                Email: req.body.Email,
                RegisterNumber: req.body.RegisterNumber,
                Gender: req.body.Gender,
                Password: Hash
            });
            console.log(data)
            let result = await data.save();
            result = result.toObject();
            delete result.Password;
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
};

const TeacherLogin = async (req, res) => {
    const Email = req.body.Email;

    let TeacherData = await Teacher.findOne({ Email: Email });
    if (!TeacherData) {
        return res.status(400).json("Email not found");
    } else {
        try {
            let validPassword = await bcrypt.compare(req.body.Password, TeacherData.Password);
            
            if (!validPassword) {
                return res.status(400).json("Invalid password");
            }

            const id = TeacherData._id;
            const Name = TeacherData.Name;
            
            const TeacherToken = jwt.sign({ id, Name, Email }, "kdhoihfihg");

            res.header('auth', TeacherToken).json(TeacherToken);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

const profileView = async (req, res) => {
    try {
        let result = await Teacher.findById({ _id: req.user.id });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const ProfileUpdate = async (req, res) => {
    const data = req.body;

    try {
        if (!req.body.Email) {
            let Update = await Teacher.findOneAndUpdate({ _id: req.user.id }, { $set: data }, { new: true });

            if (Update) {
                try {
                    res.status(200).send(Update);
                } catch (error) {
                    res.status(400).send(error.message);
                }
            } else {
                res.send("Teacher not found");
            }
        } else {
            res.send("You did not edit the email");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const ChangePassword = async (req, res) => {
    try {
        let hash = await bcrypt.hash(req.body.Password, 10);
        let update = await Teacher.findOneAndUpdate({ _id: req.user.id }, { $set: { Password: hash } }, { new: true });
        res.status(200).send("Password updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const TeacherProfiles = async (req, res) => {
    try {
        const data = await Teacher.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default {
    CreateAccount,
    TeacherLogin,
    profileView,
    ProfileUpdate,
    ChangePassword,
    TeacherProfiles
};
