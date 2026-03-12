import dotenv from "dotenv";
dotenv.config();
import authMiddleware from "./middleware/authMiddleware.js";
import express from "express";
import { Book } from "../models/BookStore.js";
import Userdata from "../models/LoginDetails.js";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
const router = express.Router();
const secret=process.env.JWT_SECRET;
 router.get('/logout',async (req,res)=>{
    const token = req.cookies.token;
    if(!token) {
        res.status(200).send({message : "Successfully logged out"});
    }
    try {
        const ver = jwt.verify(token,secret);
        res.clearCookie('token');
        res.status(200).send({message : "Successfully logged out"})
    } catch (error) {
        return  res.status(400).send({message : 'we getting error while logging out'});
    }

})
router.post('/', async (req,res)=> {
    const data = req.body;
    const token = req.cookies.token;
    if(!token) {
      return   res.status(400).send({message : 'you are not allowted to create'});
    }
    try {
         const ver = jwt.verify(token,secret);
         const user = ver.id;
         const college = ver.college;
         const access = ver.access;
         if(Array.isArray(data)){
        const isvalid = data.some((element)=> !element.title || !element.author || !element.publishYear);
        if(isvalid){
            res.status(400).send('give all three inputs');
        }
        else {
            const books = await Book.insertMany(data,college);
            console.log(req.body);
            res.status(200).json({books,access});
        }
    }
    else {
    if(!req.body.title || !req.body.author || !req.body.publishYear) {
        res.status(400).send({message: 'give all three values'} );
    }
    else {
        const newbook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
            user : user,
            college : college
        };
        
        const book = await Book.create(newbook);
        console.log(req.body)
        res.status(200).send(book,access);
    }
}
    } catch (error) {
        return  res.status(400).send({message : 'you are not allowted to create'});
    }
});
router.get('/',async (req,res)=> {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).send({message : 'you are not allowted'})
    }
    try{
        const ver = jwt.verify(token,secret);
        const books = await Book.find({user : ver.id});
        res.status(200).json(books);
    }
    catch(error){
        res.status(400).send({message : error.message});
    }
});
router.get('/auth', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
});
router.get('/:id', async (req,res)=> {
    try{
        const {id} = req.params;
        const books = await Book.findById(id);
        res.status(200).json(books);
    }
    catch(error){
        res.status(400).send({message : error.message});
    }
});
router.put('/:id',async (req,res)=>{
    const token  = req.cookies.token;
    if(!token){
        res.status(400).send({message : 'you have to re-login'});
    }
    try {
        const ver = jwt.verify(token,secret);

        if(!req.body.title || !req.body.author || !req.body.publishYear) {
        res.status(400).send({message: 'give all three values'} );
        }
            const data = {...req.body,
                          user : ver.id
            }
            const {id} = req.params;
            const isupdated = await Book.findByIdAndUpdate(id,data);
            if(!isupdated) {
            res.status(404).send(
                {
                message : 'book is not found'
                });
            }
        else {
        res.status(200).send(isupdated);
        }
        
    } catch (error) {
        if(error.response.status == 500)
        res.status(500).send({message : 'server error'})
        else 
        res.status(400).send({message : 'please relogin'})
    }
});
router.delete('/:id',async (req,res)=> {
    const {id} = req.params;
    const token = req.cookies.token;
    if(!token){
        return res.status(400).send({message : 'you are not allowted'})
    }
    try{
        const ver = jwt.verify(token,secret);
        const isdeleted = await Book.findByIdAndDelete(id);
        if(!isdeleted) {
            res.status(400).send({
                message : 'not found',
            });
        } 
        else {
            res.status(200).send({
                message : 'book is deleted'
            });
            console.log('deleted');
        }
    }
    catch(error){
       if(error.response.status == 500)
        res.status(500).send({message : 'server error'})
       else 
        res.status(400).send({message : 'please relogin'})
    }
    }
);
router.post('/user_ver', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Userdata.findOne({ username }); 

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    const payload = {
        id : user._id,
        name : user.username,
        access : user.access,
        college : user.college
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(payload,secret);
    res.cookie('token',token);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      userId: user._id,
      access : user.access,
      college : user.college
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.post('/create_user',async (req,res)=>{
    const {username,password,access,college} = req.body;
    const  Password = await bcrypt.hash(password,12);
    const x = await Userdata.create({
        username ,
        password : Password,
        access : access,
        college : college
    });
    res.send(console.log(x));
    console.log(Password);
})
router.get('/search/:id',authMiddleware,async (req,res)=>{
    const {id} = req.params;
    const {college} = req.user;
    if(!id){
        return res.send([]);
    }
    try {
            const Books = await Book.find({
        $or: [
                { title: { $regex: id, $options: 'i' } },
                { author: { $regex: id, $options: 'i' } },
                { category: { $regex: id, $options: 'i' } },
                { college : college } 
            ]
    }).limit(20);
    res.status(200).json(Books);
    }
    catch (error) {
            console.log(error.message);
        }
})

export default router;