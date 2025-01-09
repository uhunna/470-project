import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import goldMedal from "../../assets/medals/gold medal.png";
import silverMedal from "../../assets/medals/silver medal.png";
import bronzeMedal from "../../assets/medals/bronze medal.png";

const Leaderboard = () => {
  // Hardcoded leaderboard data (Dummy Data)
  const dummyLeaderboardData = [
    { id: 1, username: "john_doe", name: "John Doe", total_points: 110 },
    { id: 2, username: "jane_smith", name: "Jane Smith", total_points: 90 },
    { id: 3, username: "mike_jones", name: "Mike Jones", total_points: 80 },
    { id: 4, username: "lisa_white", name: "Lisa White", total_points: 70 },
    { id: 5, username: "david_brown", name: "David Brown", total_points: 60 },
    { id: 6, username: "emma_green", name: "Emma Green", total_points: 50 },
    { id: 7, username: "lucas_gray", name: "Lucas Gray", total_points: 40 },
    { id: 8, username: "sophia_black", name: "Sophia Black", total_points: 30 },
    { id: 9, username: "oliver_blue", name: "Oliver Blue", total_points: 20 },
    { id: 10, username: "mia_pink", name: "Mia Pink", total_points: 10 },
  ];

  const [leaderboard, setLeaderboard] = useState(dummyLeaderboardData);
  const [error, setError] = useState(null);

  // Motivational quotes
  const motivationalQuotes = [
    "Discipline is the bridge between goals and accomplishment.",
    "Small daily improvements are the key to staggering long-term results.",
    "Every action you take is a vote for the person you wish to become.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The pain of discipline is better than the pain of regret.",
    "Motivation gets you started, but habit keeps you going.",
    "What you do today can improve all your tomorrows.",
    "Consistency is harder when no one is clapping for you. Stay disciplined.",
    "You don't have to be perfect, just be consistent.",
    "Good habits are the key to all success."
  ];

  useEffect(() => {
    // Display a random motivational quote in an alert
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    alert(randomQuote);

    // No need to fetch data as we are using dummy data
    // You can later replace it with a fetch call when the backend is set up
    setLeaderboard(dummyLeaderboardData);
  }, []);

  const getMedalImage = (rank) => {
    if (rank === 1) return goldMedal;
    if (rank === 2) return silverMedal;
    if (rank === 3) return bronzeMedal;
    return null;
  };

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
            <th>Medal</th>
            <th>Point Difference</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => {
            const rank = index + 1;
            const medal = getMedalImage(rank);
            const pointDifference =
              index < leaderboard.length - 1
                ? user.total_points - leaderboard[index + 1].total_points
                : "-";

            return (
              <tr key={user.id}>
                <td>{rank}</td>
                <td>{user.name}</td>
                <td>{user.total_points}</td>
                <td>
                  {medal && (
                    <img
                      src={medal}
                      alt={`${rank} medal`}
                      className="medal-icon"
                    />
                  )}
                </td>
                <td>{pointDifference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
