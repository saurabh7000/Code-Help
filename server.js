const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
// routes path
const authRoutes = require("./routes/authRoute");
const errorHandler = require("./middlewares/errorMiddleware");


//dotenv
dotenv.config();

// mongoDB connection
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai",require("./routes/openaiRoutes"))

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
