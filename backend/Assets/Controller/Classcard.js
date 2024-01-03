
import { Classcard } from '../Schema/UserSchema.js';

const createCard = async (req, res) => {
  try {
    const { content } = req.body;
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let classcode = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      classcode += characters.charAt(randomIndex);
  }
    const card = new Classcard({ content,classcode });
    await card.save();

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }

};
const createAssignment = async (req, res) => {
  // console.log("assignment");
  const {title,description,classsection}=req.body
  // console.log(title,description,classsection);
  try {
    
    const classcard = await Classcard.findOne({content:classsection});
    // await card.save();
    // console.log(classcard);
    if (!classcard) {
      // Handle the case where the Classcard with the given code doesn't exist.
      console.log("class not found.");
    } else {
     
        // Push the new student ID into the "students" array.
        classcard.assignment.push({title:title,description:description});
        // Save the updated Classcard.
        await classcard.save();
        // console.log('hihihihi');
        res.json({message:"success",classcard})
        console.log("Student ID saved successfully.");
      
    }

    // res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }

};
const submitAssignment = async (req, res) => {
  // console.log("assignment");
  const {title,description,text,class1,id}=req.body
  // console.log(title,description,id);
  // console.log(class1,text);
  try {
    
    // const classcard = await Classcard.findOne({content:class1});
    // await card.save();
    // console.log(classcard);

    Classcard.findOneAndUpdate(
{content:class1,'assignment.title':title},
{ $push:{'assignment.$.student':{id:id,description:text}}},
{ new:true},
(error,updatedass)=>{
  if(error){
    // console.log('h1');
    res.json({message:error})
  }
  if(!updatedass){
    // console.log('h2');
    res.json({message:"fail to post the work"})
  }
  else{
    // console.log('h3');
    res.status(200).json({message:"post the work successfully"})
  } 
}
    ) 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const joinclass = async(req,res)=>{
  // console.log('joinclass')
  const code = req.body.classcode
  const id = req.body.id

  // console.log(code,id)
  try{
  //  / const joint= await Classcard.findOne({classcode:code})
  const classcard = await Classcard.findOne({ classcode: code });
  if (!classcard) {
    // Handle the case where the Classcard with the given code doesn't exist.
    // console.log("Classcard not found.");
  } else {
    const studentExists = classcard.students.some(student => student._id === id._id);
    if (studentExists) {
      // Handle the case where the student ID already exists.
      console.log("Student ID already exists.");
    } else {
      // Push the new student ID into the "students" array.
      classcard.students.push(id);
      // Save the updated Classcard.
      await classcard.save();
      res.json({message:"success",classcard})
      console.log("Student ID saved successfully.");
    }
  }
  
    // console.log(req.body)
// if(!joint){
//   res.json({message:"no class available"})
// }else{
//   res.json({message:"success",joint})
// }
  }
  catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}
const getclass = async(req,res)=>{
  // console.log('getclass')
  const code = req.body.classsection
  // const id = req.body.id

  // console.log(code)
  try{
  //  / const joint= await Classcard.findOne({classcode:code})
  const classcard = await Classcard.findOne({ content:code });
  if (!classcard) {
    // Handle the case where the Classcard with the given code doesn't exist.
    console.log("Classcard not found.");
  } else {
      res.json({message:"success",classcard})
      // console.log("class get successfully.");
    
  }
  }
  catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}


const classlist = async(req,res)=>{
  try {
    const cards = await Classcard.find();
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching class cards' });
  }
};

const joinedclass = async(req,res)=>{
  try{
const id = req.body.id
// console.log(id,"summa");
// const studentIdToFind = 'yourStudentId'; // Replace with the student ID you want to find

const classcard = await Classcard.find({ 'students._id': id });

if (classcard) { 
  // A class card containing the specified student ID was found
  // res.status(201).json(classcard);
  res.json({message:"success",classcard})
  // console.log('Class card found:', classcard);
} else {
  // No class card containing the specified student ID was found
  console.log('Class card not found for the given student ID.');
}


// console.log(id,"id got successfuly")
  }catch{
console.log('error')
  }
}


const getAllStudents = async (req, res) => {
  const classsection=req.body.classsection
  // console.log(classsection);
  try {
    const classcards = await Classcard.findOne({content:classsection});
    // console.log(classcards.students)
    // const allStudents = [];

    // classcards.forEach((classcard) => {
    //   allStudents.push(...classcard.students);
    // });

    res.json(classcards.students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};



export default {
  createCard,joinclass,classlist,joinedclass,getAllStudents,submitAssignment,createAssignment,getclass
};
