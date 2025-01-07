import React from "react";

const AcceptedChallenges = ({ userId, acceptedChallenges, onNewChallengeAccepted }) => {
  return (
    <div>
      <h2>Accepted Challenges</h2>
      {acceptedChallenges.length === 0 ? (
        <p>No challenges accepted yet. Accept some challenges!</p>
      ) : (
        acceptedChallenges.map((challenge) => (
          <div key={challenge.acceptance_id}>
            <h3>{challenge.name}</h3>
            <p>{challenge.description}</p>
            <p>Points: {challenge.point}</p>
          </div>
        ))
      )}
      {/* Add a button or form to accept a new challenge */}
      <button onClick={onNewChallengeAccepted}>Accept New Challenge</button>
    </div>
  );
};

export default AcceptedChallenges;
