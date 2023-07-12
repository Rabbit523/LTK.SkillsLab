const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const isLocal = true;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ltk", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema
const borrowerSchema = new mongoose.Schema({
  pairId: Number,
  firstName: String,
  lastName: String,
  phone: String,
});

const loanSchema = new mongoose.Schema({
  loanId: Number,
  borrowers: [borrowerSchema],
});

// Create a model
const Loan = mongoose.model("Loan", loanSchema);

app.use(express.json());

// get all loans
app.get("/loans", async (req, res) => {
  const loans = await Loan.find();
  res.send(loans);
});

// get a loan by id
app.get("/loans/:id", async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  res.send(loan);
});

// create a loan
app.post("/loans", async (req, res) => {
  const loan = new Loan(req.body);
  await loan.save();
  res.send(loan);
});

// update a borrower
app.patch("/loans/:id/borrowers/:pairId", async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  const borrower = loan.borrowers.find(
    (borrower) => borrower.pairId === parseInt(req.params.pairId)
  );
  Object.assign(borrower, req.body);
  await loan.save();
  res.send(loan);
});

// delete a borrower
app.delete("/loans/:id/borrowers/:pairId", async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  loan.borrowers = loan.borrowers.filter(
    (borrower) => borrower.pairId !== parseInt(req.params.pairId)
  );
  await loan.save();
  res.send(loan);
});

// delete a loan
app.delete("/loans/:id", async (req, res) => {
  const loan = await Loan.findByIdAndDelete(req.params.id);
  res.send(loan);
});

// test route
app.get("/", (req, res) => {
  res.json({
    message: "✨ 👋🌏 ✨",
    stage: process.env.NODE_ENV,
  });
});
app.get("/ping", (req, res) => {
  res.json({
    message: "🏓",
  });
});

if (isLocal) {
  //local host
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;

