const adminMIddleWare = (req,res,next)  => {
    if(!req.user || req.user.role !== 'admin')return res.status(403).json({message:"Access Denied. Administrated Privilages are required."});
    next();

};

module.exports = adminMIddleWare;