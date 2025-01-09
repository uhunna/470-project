import React, { useEffect, useState } from "react";
import { WeeklyChart } from "../../components/Charts/WeeklyChart";
import { MonthlyChart } from "../../components/Charts/MonthlyChart";
import "./Analytics.css";

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [badges, setBadges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Hardcoded dummy data for testing
    const dummyWeeklyData = [
      { weekday: "Mon", completedCount: 2 },
      { weekday: "Tue", completedCount: 1 },
      { weekday: "Wed", completedCount: 3 },
      { weekday: "Thu", completedCount: 0 },
      { weekday: "Fri", completedCount: 4 },
      { weekday: "Sat", completedCount: 1 },
      { weekday: "Sun", completedCount: 3 },
    ];
    const dummyMonthlyData = [
      { weekLabel: "Week 45", completedCount: 10 },
      { weekLabel: "Week 46", completedCount: 15 },
      { weekLabel: "Week 47", completedCount: 8 },
      { weekLabel: "Week 48", completedCount: 20 },
    ];
    const dummyBadges = [
      { badge: "Early Bird", awardedOn: "2024-12-01" },
      { badge: "Consistency Champion", awardedOn: "2024-12-08" },
    ];

    // Set dummy data to state
    setWeeklyData(dummyWeeklyData);
    setMonthlyData(dummyMonthlyData);
    setBadges(dummyBadges);
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="charts-wrapper">
        <div className="chart-section">
          <h3>Weekly Progress</h3>
          <WeeklyChart data={weeklyData} />
        </div>

        <div className="chart-section">
          <h3>Monthly Progress</h3>
          <MonthlyChart data={monthlyData} />
        </div>
      </div>

      <div className="badges-section">
        <h3>Unlocked Badges</h3>
        <ul>
          {badges.length > 0 ? (
            badges.map((badge, idx) => (
              <li key={idx}>
                <strong>{badge.badge}</strong> — Awarded On: {badge.awardedOn}
              </li>
            ))
          ) : (
            <p>No badges unlocked yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
