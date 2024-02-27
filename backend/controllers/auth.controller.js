import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req,res) =>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Credentials or password"});
        }
        
        generateTokenAndSetCookie(user.id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profile:user.profilePic
        })

    }
    catch(err){
        console.log("Error in login controller",error.meesage)
        res.status(500).json({error:"Interal Server Error"})
    }
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out Successfully"})
    }catch{
        console.log("Error in logout controller",error.meesage)
        res.status(500).json({error:"Interal Server Error"})
    }
}


export const  signup = async(req,res)=>{
    try{
        const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log(req.body)
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords does not match"})
        }
        const user  = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"Username already exists"})

        }


        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt)



        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
			fullName,
			username,
			password: hashPassword,
    		gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

        await newUser.save()
        if(newUser){

             generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })
        }
        else{
            res.status(400).json({error : "Invalid user data"})
        }
        

    }
    catch(err){    
        console.log("Error in signup controller",error.meesage)
        res.status(500).json({error:"Interal Server Error"})
    }
}

