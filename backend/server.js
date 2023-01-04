const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./Config/DB");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("Please set to Production"));
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
console.log("Hello World");
