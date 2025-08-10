import bcryptjs from 'bcryptjs'
import { User } from '../models/user.js';
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
  
export const signup = async (req, res) => {
    try {
      if (!req.body) {
        throw new Error('Request body is missing');
      }
  
      const { email, password, name ,role } = req.body;
  
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
  
      const userAlreadyExist = await User.findOne({ email });
      if (userAlreadyExist) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
   
      const user = new User({
        role,
        email,
        password: hashedPassword,
        name,
       });
      console.log("user", user);
  
      // Save the user to the database
      await user.save();
  
      // Generate JWT and set cookies
      generateTokenAndSetCookies(res, user._id);
  
      
  
      // Send a response after everything is done
      return res.status(201).json({
        success: true,
        message: 'User is created successfully',
        user: {
          ...user._doc,
          password: undefined, // Don't send the password
        },
      });
    } catch (error) {
      console.log("error.response.status", error);
      return res.status(400).json({ success: false, message: `Error in catch: ${error.message}` });
    }
  };
export const  login =async(req,res)=>{
     const {email,password}=req.body;
    try {
      const user=await User.findOne({email});
      if(!user){
        return res.status(400).json({success:false,message:"Invalid Email"})
      }

      const isPasswordValid=await bcryptjs.compare(password,user.password);
      console.log(isPasswordValid,password)
      if(!isPasswordValid){
        return res.status(400).json({success:false,message:"Invalid password"})
      }
    const token= generateTokenAndSetCookies(res,user._id);
    console.log("token",token);
      user.lastlogin=new Date();

      await user.save();

     res.status(200).json({
      success:true,
      token,
      message:"Logged in successfully",
      user:{
        ...user._doc,
        password:undefined,

      }
     })
    } catch (error) {
      console.log("error in login");
      res.status(400).json({success:false,message:error.message})
    }

}
export const  logout =(req,res)=>{
  res.clearCookie('token');
  res.status(200).json({success:true,message:"Logged out successfully"})
}
 export const checkAuth=async(req,res)=>{

  try {
    const user=await User.findById(req.userId).select("password");
    if(!user)return res.status(400).json({success:false,message:"User not found"})

      res.status(200).json({success:true,user})
  } catch (error) {
    console.log("error in checkAuth",error);
    res.status(400).json({success:false,message:error.message})
  }

 }

 