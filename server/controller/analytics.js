const getWeeklyAnalytics = (req, res) => {
  // Dummy data for weekly analytics
  const dummyData = [
    { weekday: "Mon", completedCount: 2 },
    { weekday: "Tue", completedCount: 1 },
    { weekday: "Wed", completedCount: 3 },
    { weekday: "Thu", completedCount: 0 },
    { weekday: "Fri", completedCount: 4 },
    { weekday: "Sat", completedCount: 1 },
    { weekday: "Sun", completedCount: 3 },
  ];
  return res.status(200).json(dummyData);
};

const getMonthlyAnalytics = (req, res) => {
  // Dummy data for monthly analytics
  const dummyData = [
    { weekLabel: "Week 45", completedCount: 10 },
    { weekLabel: "Week 46", completedCount: 15 },
    { weekLabel: "Week 47", completedCount: 8 },
    { weekLabel: "Week 48", completedCount: 20 },
  ];
  return res.status(200).json(dummyData);
};

const getBadges = (req, res) => {
  // Dummy data for badges
  const dummyBadges = [
    { badge: "Early Bird", awardedOn: "2024-12-01" },
    { badge: "Consistency Champion", awardedOn: "2024-12-08" },
  ];
  return res.status(200).json(dummyBadges);
};

module.exports = {
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getBadges,
};
