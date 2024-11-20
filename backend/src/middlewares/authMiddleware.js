const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) { return res.status(403).json({ message: "Unauthorised"})};
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch(error){
        req.status(401).json({ message: "Invalid Token"});
    }
}

module.exports = authMiddleware;