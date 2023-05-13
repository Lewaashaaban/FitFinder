const jwt =require('jsonwebtoken');
const {promisify}=require("util") ;
const User =require('../Models/UserModels') ;

exports.Protect = async(req, res, next) => {
    // 1: Check if the owner still exists
    try{
        let token;
    
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message: "You are not logged in! Please login to gain access"});
        }

        // 2: Verify the token

        let decoded;
        try{
            decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        }
        catch(error){
            console.log(error);
            if(error.name === "JsonWebTokenError"){
                return res.status(401).json({message: "Invalid token, Login again"})
            }
            else if(error.name === "TokenExpiredError"){
                return res.status(401).json({message: "Your session token has expired !! Please login again"});
            }
        }

        // 3: Check if the token owner still exists
        const currentUser = await User.findById(decoded.id);
        if(!currentUser){
            return res.status(401).json({message: "The user belonging to this session no longer exists"});
        }

        // 4: If everything is okay, add the user to all the requests under req.user = currentUser
        req.user = currentUser;
        next();
    }
    catch(err){
        console.log(err);
    }
}

// export { protect };