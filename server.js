import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import bannerRouter from "./router/Banner.js";
import businessProfileRouter from "./router/businessProfile.js";
import adRouter from "./router/ad.js";

// Initialize the app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Routes
app.use("/api/banner", bannerRouter);
app.use("/api/business", businessProfileRouter); // Corrected naming for businessProfileRouter
app.use("/api/ad", adRouter); // Corrected router naming

// Health Check Route
app.get("/", (req, res) => {
  res.send("API is working great!");
});

// Start the server
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};
 
startServer();
