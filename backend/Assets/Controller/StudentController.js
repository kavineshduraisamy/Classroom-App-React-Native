import { Student, validateUser } from '../Schema/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const CreateAccount = async (req, res) => {
    const Email = req.body.Email;
    const { error } = validateUser(req.body);

    if (error) {
        return res.status(400).send(error.details[0]);
    }

    const ExStudent = await Student.findOne({ Email: Email });

    if (ExStudent) {
        return res.status(400).send("Email is already taken");
    } else {
        try {
            let Hash = await bcrypt.hash(req.body.Password, 10);

            let data = new Student({
                Name: req.body.Name,
                Email: req.body.Email,
                RegisterNumber: req.body.RegisterNumber,
                Gender: req.body.Gender,
                Password: Hash
            });

            let result = await data.save();
            result = result.toObject();
            delete result.Password;
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};
const StudentLogin = async (req, res) => {
    const Email = req.body.Email;

    let StudentData = await Student.findOne({ Email: Email });
// console.log(StudentData)
    if (!StudentData) {
     res.status(400).json("Email not found");
    } else {
        try {
            let validPassword = await bcrypt.compare(req.body.Password,StudentData.Password);
            // console.log(validPassword)
            if (!validPassword) {
                 res.status(400).json("Invalid password");
            }
            const id = StudentData._id;
            const Name = StudentData.Name;          
            const StudentToken = jwt.sign({ id, Name, Email }, "kdhoihfihg");
             res.header('auth', StudentToken).json(StudentToken);
            // console.log(StudentToken)
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message);
        }
    }
};

const profileView = async (req, res) => {
    try {
        let result = await Student.findById({ _id: req.user.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
const ProfileUpdate = async (req, res) => {
    const data = req.body;
    try {
        if (!req.body.Email) {
            let Update = await Student.findOneAndUpdate({ _id: req.user.id }, { $set: data }, { new: true });

            if (Update) {
                try {
                    res.status(200).send(Update);
                } catch (error) {
                    res.status(400).send(error.message);
                }
            } else {
                res.send("Student not found");
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
        let update = await Student.findOneAndUpdate({ _id: req.user.id }, { $set: { Password: hash } }, { new: true });
        res.status(200).send("Password updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const StudentProfiles = async (req, res) => {
    try {
        const data = await Student.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
export default {
    CreateAccount,
    StudentLogin,
    profileView,
    ProfileUpdate,
    ChangePassword,
    StudentProfiles
};
