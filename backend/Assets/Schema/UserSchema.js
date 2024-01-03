import mongoose from "mongoose";
import Joi from 'joi';

// Teacher model
const Teacher = mongoose.model('Teacher', new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    RegisterNumber: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}));

// Student model
const Student = mongoose.model('Student', new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    RegisterNumber: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}));


const Classcard = mongoose.model('Classcard', new mongoose.Schema({
      content: String,
      classcode: String,
      assignment:[{}],
      students:[{}]
}));



// Validation function for both teacher and student
const validateUser = (value) => {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Email: Joi.string().required(),
        RegisterNumber: Joi.number().required(),
        Gender: Joi.string().required(),
        Password: Joi.string().required()
    });

    const result = schema.validate(value);
    return result;
}

export { Teacher, Student, validateUser,Classcard };





















// import mongoose from "mongoose";
// import Joi from 'joi'

// const User=mongoose.model('User',new mongoose.Schema({
//     Name:{
//         type: String,
//         required: true
//     },
//      Email:{
//             type: String,
//             required: true
//     },
//     PhoneNumber:{
//         type:Number,
//         required: true
//     },
//     Gender:{
//         type: String,
//             required: true
//     },
//        Password:{
//           type: String,
//           required: true
//     },
 
 
// }));

// const ValidateUser=(value)=>{
//     const schema=Joi.object({
//         Name:Joi.string().required(),
//     //    Dob:Joi.string().required(),
//        Email:Joi.string().required(),
//        PhoneNumber:Joi.number().required(),
//        Gender:Joi.string().required(),
//        Password:Joi.string().required(),
//     //    Address:Joi.string().required(),
//     });

//     const result=schema.validate(value);
//     return result;
// }

// export {User, ValidateUser}