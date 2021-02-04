var express = require("express");
var multer = require('multer');
var path = require("path");
var mime = require("mime");
var router = express.Router();


//Upload member image
var storage_member_image = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/member/passport');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
    }
});
var upload_member_image = multer({
    storage: storage_member_image,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});

/**router.post('/upload_member', upload_member_image.single('image'), (req, res, next) => {
    const file = req.file
    console.log(file.filename);
    if (!file) {
        const error = new Error('No file found');
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
    res.send("Path",req.file.path)
})**/


router.post('/upload_member', (req,res,next)=>{
    
    console.log(req.body)
    
    var storage_member_image = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/member/passport');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
    }
});
})

module.exports = router;