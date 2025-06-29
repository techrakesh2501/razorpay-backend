const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post("/create-order", async (req, res) => {
  const { amount, currency, receipt, userId, planKey, planPoint, Expiry, Features, PerStudentPrice } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
      payment_capture: 1,
      notes: {
        userId,
        planKey,
        planPoint,
        expiry,
        features,
        perStudentPrice
      }
    });
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

app.get("/", (req, res) => {
  res.send("✅ Razorpay backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
