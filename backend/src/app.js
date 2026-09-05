const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes =
  require("./routes/authRoutes");

const caseRoutes =
  require("./routes/caseRoutes");

const documentRoutes =
  require("./routes/documentRoutes");

const doctorRoutes =
  require("./routes/doctorRoutes");

const errorHandler =
  require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173"
  })
);

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(morgan("dev"));

app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      status: "OK",
      service:
        "AarogyaSaar Backend"
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/cases",
  caseRoutes
);

app.use(
  "/api/documents",
  documentRoutes
);

app.use(
  "/api/doctor",
  doctorRoutes
);

app.use(errorHandler);

module.exports = app;