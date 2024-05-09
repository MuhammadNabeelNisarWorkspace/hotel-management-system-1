const express = require("express");
const cors = require("cors");
const auth_router = require("./routes/auth-router");
const admin_router = require("./routes/admin-router");
const app = express();
const db = require("./db");
// Allow requests from localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware
app.use(express.json());

app.use("/api/auth", auth_router);
app.use("/api/admin", admin_router);

db().then(() => {
  const port = 5000;
  app.listen(port, () =>
    console.log("The app is running on http://localhost:" + port)
  );
});
