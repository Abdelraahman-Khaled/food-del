import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bodyParser from "body-parser";

// to access on env file
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000; // 4000

//  middleware
app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: '*', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// db connection
connectDB();

app.get("/", (req, res) => {
  res.json("Welcome");
});
// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
// user endpoints
app.use("/api/user", userRouter);
// cart endpoints
app.use("/api/cart", cartRouter);
// order
app.use("/api/order", orderRouter)

app.use((err, req, res, next) => {
  console.error(err); // طباعة الخطأ في السجل
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// rung the server
app.listen(port, () => {
  console.log(`server is running  in port :${port}`);
});
