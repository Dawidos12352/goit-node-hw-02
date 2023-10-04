const app = require('./app')
const db = require("./db");


const serverStart = async () => {
  try {
    await db.dbConnect();
    console.log("Database connection successful!");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  } catch (error) {
    console.error(error.message)
  }
}
serverStart();
