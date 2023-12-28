const JWT = require ("jsonwebtoken");
const userAuthModel = require("../models/userAuthModel");


//Token based protected routes
exports.requireLoggedIn = async (req, res, next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.userExit = decode;
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, message: `You dont have token Login first ${error}`})
        
    }
}


//admin access
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await userAuthModel.findById(req.userExit._id);

        if (!user) {
            return res.status(401).send({ success: false, message: 'Unauthorized Access!' });
        }

        if (user.role !== 1) {
            return res.status(401).send({ success: false, message: 'Unauthorized Access!' });
        } else {
            next();
        }
    } catch (error) {
        return res.status(401).send({ success: false, message: `Error in admin middleware ${error}` });
    }
};

