import bcrypt from 'bcryptjs'

const saltRound=10;

const hashpassword=async(plainpassword)=>{
    try {
        const salt=await bcrypt.genSalt(saltRound);
        const hash=await bcrypt.hash(plainpassword,salt)
        return hash;
    } catch (error) {
        return false;
    }
}

const hashValidater=async(plainpassword,hashpassword)=>{
    try {
        const result=await bcrypt.compare(plainpassword,hashpassword);
        return result;
    } catch (error) {
        return error.message;
    }
}

export default {hashpassword, hashValidater}

