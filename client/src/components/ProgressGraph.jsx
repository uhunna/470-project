import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"; 
import ChartDataLabels from "chartjs-plugin-datalabels";


import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartDataLabels);

const ProgressGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    if (!token || !userId) {
      console.error("No token or user ID found.");
      setLoading(false);
      return;
    }

    // Fetch user's challenge data (points or milestones)
    axios
      .get(`http://localhost:8800/api/userChallenges/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching challenge data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading graph...</div>;
  }

  
  const chartData = {
    labels: data.map((challenge) => challenge.challenge_name),  
    datasets: [
      {
        label: "Points Progress",
        data: data.map((challenge) => challenge.point), 
        borderColor: "rgba(75, 192, 192, 1)",  //
        backgroundColor: "rgba(75, 192, 192, 0.2)", 
        tension: 0.4,
        fill: true, 
        pointBackgroundColor: "rgba(75, 192, 192, 1)", 
        pointBorderColor: "white", 
        pointRadius: 6, 
        pointHoverRadius: 8,
        animation: {
          duration: 1500,
          easing: "easeInOutQuad", 
        },
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
              size: 14,
            },
            formatter: (value) => `${value} pts`,
            align: 'top',
            anchor: 'end',
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,  // Hide x-axis grid
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid color for y-axis
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white', 
        bodyColor: 'white',   
        footerColor: 'white', 
        displayColors: false, 
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} points`,
        },
      },
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,  
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    maintainAspectRatio: false,  
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ color: 'white' }}>Progress Graph</h3>
      <div style={{ width: '80%', height: '400px', margin: 'auto' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProgressGraph;


