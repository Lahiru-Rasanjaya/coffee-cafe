const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// page router
const login = require("./routes/login");
const cashier = require("./routes/cashier/view");
const cashierBill = require("./routes/cashier/bill");
const adminItemAdd = require("./routes/admin/ItemAdd");
const adminItemEdit = require('./routes/admin/ItemEdit');
const adminItemDelete = require('./routes/admin/ItemDelete');
const salesReport = require('./routes/SalesReport');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Login page
app.use("/login", login);
// cashier
app.use("/cashier", cashier);
app.use("/cashier", cashierBill);
//admin
app.use("/admin", adminItemAdd);
app.use("/admin", adminItemEdit);
app.use("/admin", adminItemDelete);
//sales Report
app.use('/sales',salesReport);

app.post("*", (req, res) => {
  console.log("Route error: Invalid POST request");
  res.status(404).json({ success: false, message: "Invalid route" });
});

console.log(process.env.PORT);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
