const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb+srv://test:sparta@cluster0.yjvro.mongodb.net/Cluster0?retryWrites=true&w=majority", { ignoreUndefined: true }).catch((err) => {
        console.error(err);
    })

};


module.exports = connect;