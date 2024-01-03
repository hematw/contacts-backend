require("dotenv").config();
const express = require('express');
const contactRoutes = require("./routes/contactRoutes");
const dbConnect = require("./config/dbConnection")

const app = express();

dbConnect();


app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(require("./middlewares/errorHandler"));

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is runnning in port ${port}`);
})