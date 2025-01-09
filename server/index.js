const express = require("express");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const challengesRouter = require("./routes/challenges");
const userChallengesRoutes = require("./routes/userChallenges"); // Made consistent
const habitRoutes = require("./routes/habit.js");
const analyticsRouter = require("./routes/analytics"); // Added analytics
const leaderboardRouter = require("./routes/leaderboard"); 
const friendRoutes = require("./routes/friends.js")
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const { db } = require("./connect");

const app = express();

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// Multer file upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/challenges", challengesRouter);
app.use("/api/userChallenges", userChallengesRoutes); // Made consistent
app.use("/api/habit", habitRoutes);
app.use("/api/analytics", analyticsRouter); // Added analytics
app.use("/api/leaderboard", leaderboardRouter); // Add leaderboard route
app.use("/api/friends", friendRoutes);
// CRON job for incrementing points
cron.schedule("0 0 * * *", () => {
  console.log("Running daily increment of points...");
  const incrementPointsQuery = `
    UPDATE user_challenges 
    SET point = point + 10
  `;
  db.query(incrementPointsQuery, (err, result) => {
    if (err) {
      console.error("Error incrementing points:", err);
    } else {
      console.log("Points incremented successfully for all users.");
    }
  });
});

// Start server
app.listen(8800, () => {
  console.log("API working on port 8800!");
});

