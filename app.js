const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods");


const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
};

app.use(express.json());
app.use(requestMiddleware);

app.use("/api", [goodsRouter]);

app.get("/", (req, res) => {
    res.send("hillllooo worldo");
});

app.listen(port, () => {
    console.log(port, "port opened biatchhh");
});
