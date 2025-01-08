import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const WeeklyChart = ({ data }) => {
  // data shape: [{ weekday: "Mon", completedCount: 2 }, ...]

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weekday" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completedCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};