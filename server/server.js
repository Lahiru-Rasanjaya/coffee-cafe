const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const login = require("./routes/login");
const cashier = require('./routes/cashier/view');
const cashierBill = require('./routes/cashier/bill');




const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/login", login);
app.use('/cashier', cashier);
app.use('/cashier',cashierBill);

app.post('*', (req, res) => {
    console.log('Route error: Invalid POST request');
    res.status(404).json({ success: false, message: 'Invalid route' });
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
