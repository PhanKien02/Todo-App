
import express from 'express';
import morgan from "morgan";
import dotenv from  "dotenv"
import connectDB from "./configs/database"
require('express-async-errors');
import bodyParser from "body-parser";
import cors from 'cors';
import ApiRouter from './router/router';
dotenv.config({
  path: ".env",
});
const app = express();
const port = process.env.PORT;
connectDB();
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text())
app.use(cors({
  origin:["http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials:true
}))
ApiRouter(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
