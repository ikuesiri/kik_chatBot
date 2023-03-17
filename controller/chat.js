const CustomerModel = require("../model/userSchema")

const date = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// dis chat page
    const chat  = async(req, res) => {

  try {
    // gotten from the session middleware
    const sessionId = req.session.id;
    const customer = await CustomerModel.findOne({ userId: sessionId });
    if (customer.length <= 0 || !customer) {
      const newCustomer = await CustomerModel.create({
        customerId: sessionId
      });
    }
    res.render("index", { date });
  } catch (error) {
    res.status(500).send({ message : error.message })
  }
}

module.exports = chat
