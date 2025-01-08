import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Challenges.css";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState({
    name: "",
    description: "",
  });
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  // Fetch challenges on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8800/challenges", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setChallenges(response.data);
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
      });
  }, [token]);

  // Handle joining a challenge
  const handleJoinChallenge = (challengeId) => {
    if (!userId) {
      alert("User not logged in. Please log in and try again.");
      return;
    }

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    axios
      .post(
        "http://localhost:8800/api/userChallenges", // Corrected endpoint
        {
          cha_user_id: userId,
          challenge_id: challengeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        }
      )
      .then(() => {
        alert("Challenge accepted successfully!");
      })
      .catch((error) => {
        console.error("Error accepting challenge:", error.response?.data || error);
        alert("Error accepting challenge.");
      });
  };

  // Handle creating a challenge
  const handleCreateChallenge = async () => {
    if (newChallenge.name && newChallenge.description) {
      try {
        const response = await axios.post(
          "http://localhost:8800/challenges",
          {
            name: newChallenge.name,
            description: newChallenge.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChallenges([...challenges, response.data.challenge]);
        alert("Challenge created successfully!");
        setShowCreateChallenge(false);
      } catch (error) {
        console.error("Error creating challenge:", error.response || error);
        alert("Error creating challenge.");
      }
    } else {
      alert("Please provide both name and description for the challenge.");
    }
  };

  return (
    <div className="community">
      <h2>Community Challenges</h2>
      <div className="challenge-list">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-card">
            <h3>{challenge.name}</h3>
            <p>{challenge.description}</p>
            <button onClick={() => handleJoinChallenge(challenge.id)}>
              Accept
            </button>
          </div>
        ))}
      </div>

      <button
        className="create-challenge-btn"
        onClick={() => setShowCreateChallenge(true)}
      >
        Create New Challenge
      </button>

      {showCreateChallenge && (
        <div className="create-challenge-form">
          <h3>Create Challenge</h3>
          <input
            type="text"
            placeholder="Challenge Name"
            value={newChallenge.name}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Challenge Description"
            value={newChallenge.description}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, description: e.target.value })
            }
          />
          <button onClick={handleCreateChallenge}>Create Challenge</button>
          <button onClick={() => setShowCreateChallenge(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Challenges;
