import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://book-store-tau-olive.vercel.app",
  credentials: true
}));

app.options("*", cors());

app.use("/books", router);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

app.listen(PORT, ()=>{
  console.log(`Server running on ${PORT}`);
});