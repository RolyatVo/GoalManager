const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./Config/DB");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./Routes/getGoals"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
console.log("Hello World");
