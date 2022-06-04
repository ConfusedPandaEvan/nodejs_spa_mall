const mongoose = require("mongoose");

const goodsSchema = mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnailUrl: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: String,
    },
});

module.exports = mongoose.model("Goods", goodsSchema);