const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(formidable());
app.use(cors());

app.post("/payment", async (req, res) => {
  console.log("~ process.env.STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);

  try {
    const { stripeToken, cost, description } = req.fields;
    //creer la transac
    const response = await stripe.charges.create({
      amount: cost * 100,
      currency: "eur",
      description,
      source: stripeToken,
    });
    console.log("~ response", response);
    res.json(response.status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(4000, () => {
  console.log("server started !");
});
