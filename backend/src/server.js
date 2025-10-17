const { default: mongoose } = require("mongoose");
const config = require("./config/index.js");
const connectDatabase = require("./config/db.connect.js");
const app = require("../app.js");

const PORT = process.env.PORT || 3000;

connectDatabase()
.then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })
})
.catch(err => {
    console.error('Database connection failed', err);
})