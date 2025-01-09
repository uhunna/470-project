import React, { useEffect, useState } from "react";
import axios from "axios";
import { WeeklyChart } from "../../components/Charts/WeeklyChart";
import { MonthlyChart } from "../../components/Charts/MonthlyChart";
import "./Analytics.css";

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [badges, setBadges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch weekly analytics
        const weeklyRes = await axios.get("http://localhost:8800/api/analytics/weekly", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Get token from session storage
          },
        });
        setWeeklyData(weeklyRes.data);

        // Fetch monthly analytics
        const monthlyRes = await axios.get("http://localhost:8800/api/analytics/monthly", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Get token from session storage
          },
        });
        setMonthlyData(monthlyRes.data);

        // Fetch badges
        const badgesRes = await axios.get("http://localhost:8800/api/analytics/badges", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Get token from session storage
          },
        });
        setBadges(badgesRes.data);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to fetch analytics. Please try again later.");
      }
    };

    fetchAnalytics();
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
