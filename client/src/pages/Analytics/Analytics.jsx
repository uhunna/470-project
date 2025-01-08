import React, { useEffect, useState } from "react";
import axios from "axios";
import { WeeklyChart } from "../../components/Charts/WeeklyChart";
import { MonthlyChart } from "../../components/Charts/MonthlyChart";
import "./Analytics.css";

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Fetch weekly analytics
    axios
      .get("http://localhost:8800/api/analytics/weekly?userId=1", {
        withCredentials: true,
      })
      .then((res) => {
        setWeeklyData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching weekly data:", err);
      });

    // Fetch monthly analytics
    axios
      .get("http://localhost:8800/api/analytics/monthly?userId=1", {
        withCredentials: true,
      })
      .then((res) => {
        setMonthlyData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching monthly data:", err);
      });

    // Fetch badges
    axios
      .get("http://localhost:8800/api/analytics/badges?userId=1", {
        withCredentials: true,
      })
      .then((res) => {
        setBadges(res.data);
      })
      .catch((err) => {
        console.error("Error fetching badges:", err);
      });
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>
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
          {badges.map((badge, idx) => (
            <li key={idx}>
              <strong>{badge.badge}</strong> — Awarded On: {badge.awardedOn}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;