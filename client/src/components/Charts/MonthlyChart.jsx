import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const MonthlyChart = ({ data }) => {
  // data shape: [{ weekLabel: "Week 45", completedCount: 10 }, ...]

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weekLabel" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="completedCount" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};