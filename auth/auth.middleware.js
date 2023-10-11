const authService = require("./auth.service");
const User = require("../users/user.model");
// const userDao = require("../users/users.dao");

const extractTokenFromHeaders = (headers) => {
    return headers.authorization?.replace("Bearer ", "");
};

const authMiddleware = async (req, res, next) => {
    try {
        const token = extractTokenFromHeaders(req.headers);
        if(!token) {
            return res.status(401).json({message: "Authorization token is missing."});
        }
        const {id} = authService.verifyToken(token);
        const userEntity = await User.findById(id);
        if(!userEntity || userEntity.token !== token) {
            throw new Error("Token is invalid.")
        } 
        req.user = userEntity;
        next();
        
    } catch (error) {
        return res.status(401).json({message: "Not authorized"})
    }
};

module.exports = {
    extractTokenFromHeaders,
    authMiddleware,
}
