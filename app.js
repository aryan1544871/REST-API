const path = require ('path');
const express = require('express');
const bodyParser = require ('body-parser');
const feedRoutes = require ('./routes/feed');
const authRoutes = require ('./routes/auth');
const mongoose = require ('mongoose');
const multer = require ('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4()+ file.originalname)
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}
//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use (bodyParser.json()); //application/json

app.use (multer({
    storage : fileStorage,
    fileFilter : fileFilter
}).single('image'))

app.use ((req, res ,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next ();
})

app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use ((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json ({message : message, data : data});

})

mongoose.connect ('mongodb+srv://aryanmnitj:Arykush1$U+762817@cluster0.dvnql.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0') .then ( result => {
    app.listen(8080);
}).catch(err => console.log(err));
