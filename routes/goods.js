const express = require("express");
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");
// const res = require("express/lib/response");
const router = express.Router();

router.get("/goods/cart", async (req, res) => {
    const carts = await Cart.find();
    const goodsIds = carts.map((cart) => cart.goodsId);

    const goods = await Goods.find({ goodsId: goodsIds });

    const results = carts.map((cart) => {
        return {
            quantity: cart.quantity,
            goods: goods.find((item) => item.goodsId === cart.goodsId),
        };
    });

    res.json({
        cart: results,
    });
});

router.get("/", (req, res) => {
    res.send("this is root page");
});

router.get("/goods", async (req, res) => {
    const { category } = req.query;

    const goods = await Goods.find({ category });
    
    res.json({
        goods:goods
    });
});

router.get("/goods/:goodsId", async (req, res) => {
    const { goodsId } = req.params;

    const [goods] = await Goods.find({ goodsId: Number(goodsId) });
    // const [detail] = goods.filter((ittem) => ittem.goodsId === Number(goodsId));

    res.json({
        goods,
    });
});

router.post("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existCarts.length) {
        return res.status(400).json({ success: false, errorMessage: "Already in the cart" });
    }

    await Cart.create({ goodsId: Number(goodsId), quantity});
    res.json({ success: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;

    const existCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existCarts.length) {
        await Cart.deleteOne({ goodsId: Number(goodsId) });
    };

    res.json({ success: true });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({
            errorMessage: "Only inputs 1 or above can be inputed"
        });        
    }

    const existCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (!existCarts.length) {
        await Cart.create({ goodsId: Number(goodsId), quantity});
    } else{
        await Cart.updateOne({ goodsId: Number(goodsId)}, { $set: { quantity } });
    }

    res.json({ success: true });
});

router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });

    if (goods.length) {
        return res.status(400).json({ success: false, errorMessage: "Data already exists."});
    };

    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

    res.json({ goods: createdGoods });
});

module.exports = router;