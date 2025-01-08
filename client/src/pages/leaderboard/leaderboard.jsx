/*import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import goldMedal from "../../assets/medals/gold medal.png";
import silverMedal from "../../assets/medals/silver medal.png";
import bronzeMedal from "../../assets/medals/bronze medal.png";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8060/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data.");
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err.message);
        setError("Could not load leaderboard. Try again later.");
      }
    };

    fetchLeaderboard();
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
*/
import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import goldMedal from "../../assets/medals/gold medal.png";
import silverMedal from "../../assets/medals/silver medal.png";
import bronzeMedal from "../../assets/medals/bronze medal.png";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

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
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8060/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data.");
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err.message);
        setError("Could not load leaderboard. Try again later.");
      }
    };

    // Display a random motivational quote in an alert
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    alert(randomQuote);

    fetchLeaderboard();
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
