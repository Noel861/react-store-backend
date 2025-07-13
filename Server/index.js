import express from "express";
import cors from 'cors';
import path from 'path';

import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products-routes.js";

dotenv.config();

const app = express();

app.use(cors());             // ✅ add this line here
app.use(express.json());     // ✅ for JSON body parsing

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Client", "dist", "index.html"));
    })
}

app.listen(5000, () => {
    connectDB();
    console.log('server started at http://localhost:5000');
});
