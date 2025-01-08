const getWeeklyAnalytics = (req, res) => {
    const userId = req.user.id; // Use the logged-in user's ID from middleware
    const query = `
      SELECT 
        DATE_FORMAT(date, '%a') AS weekday,
        COUNT(*) AS completedCount
      FROM daily_checklist 
      WHERE 
        user_id = ? 
        AND is_completed = 1
        AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY weekday
      ORDER BY FIELD(weekday, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')
    `;
  
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching weekly analytics:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (!result.length) {
        // Dummy data for 7 days
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
      }
  
      return res.status(200).json(result);
    });
  };
  
  const getMonthlyAnalytics = (req, res) => {
    const userId = req.user.id; // Use the logged-in user's ID from middleware
    const query = `
      SELECT 
        CONCAT('Week ', WEEK(date, 1)) AS weekLabel,
        COUNT(*) AS completedCount
      FROM daily_checklist
      WHERE 
        user_id = ?
        AND is_completed = 1
        AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY weekLabel
      ORDER BY WEEK(date, 1)
    `;
  
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching monthly analytics:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (!result.length) {
        // Dummy data for 4 weeks
        const dummyData = [
          { weekLabel: "Week 45", completedCount: 10 },
          { weekLabel: "Week 46", completedCount: 15 },
          { weekLabel: "Week 47", completedCount: 8 },
          { weekLabel: "Week 48", completedCount: 20 },
        ];
        return res.status(200).json(dummyData);
      }
  
      return res.status(200).json(result);
    });
  };
  
  const getBadges = (req, res) => {
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
  