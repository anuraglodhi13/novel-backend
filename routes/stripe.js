const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripeToken = require("stripe")(process.env.STRIPE_PUBLISH_KEY);
const express = require("express");
const stripeRoute = express.Router();
const { v4: uuid } = require("uuid");
const User = require("../model/userModel");

stripeRoute.post("/payment", async (req, res) => {
  const { token, amount, plan } = req.body;
  const customer = await stripe.customers.create({
    email: token.email, // Use the email from the token
    source: token.id, // Use the token ID as the payment method source
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount, // Amount in cents
    currency: "usd",
    payment_method_types: [token.type],
    payment_method: token.card.id, // Use the card ID from the token's card object
    customer: customer.id,
    confirm: true,
    description: plan,
  });

  if (paymentIntent.status === "requires_action") {
    // Return client_secret and requires_action to the frontend
    return res.status(200).json({
      requires_action: true,
      client_secret: paymentIntent.client_secret,
      payment_method: paymentIntent.payment_method,
    });
  } else if (paymentIntent.status === "succeeded") {
    return res.status(200).json({
      message: "Success",
    });
  } else {
    // Handle other paymentIntent statuses
    return res.status(500).json({
      message: "Payment failed",
    });
  }
});

stripeRoute.post("/updateSuccessPaymentStatus", async (req, res) => {
  try {
    const { plan, userId } = req.body;
    const foundUser = await User.findOneAndUpdate(
      { userId: userId },
      { plan: plan }
    );
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Payment status updated successfully." });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
module.exports = stripeRoute;
