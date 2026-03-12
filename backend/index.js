import dotenv from "dotenv";
dotenv.config();
import express from "express";
//import { Port, mongodb } from "./Port.js";
import mongoose from "mongoose";
import { Book } from "./models/BookStore.js";
import router from "./routes/Books.js";
import cors from 'cors';
//import session from "express-session";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
/* 
app.use(session({
      name : 'xyz',
      secret : 'xakjc',
      resave : false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60*10*1000
      }
    })
)
     */

app.listen(process.env.PORT, () => {
  console.log(`server is connected to ${process.env.PORT}`);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoose is connected");
  })
  .catch((error) => console.log("error while connecting", error.message));

app.use( cors(
    {
        origin : 'https://book-store-tau-olive.vercel.app/',
        methods : ['GET','POST','PUT','DELETE'],
        allowedHeaders : ['Content-Type'],
        credentials: true
    }
)
)

app.get("/", (req, res) => {
  res.cookie('name','wsc');
  res.status(200).send("you are in home page");
});
app.use("/books", router);
