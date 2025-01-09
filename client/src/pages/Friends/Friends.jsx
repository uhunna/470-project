import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Friends.css";

const Friends = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const userId = sessionStorage.getItem("userId");


  if (!userId) {
    console.error("User is not authenticated");
    return <p>User not authenticated. Please log in.</p>;
  }



  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/friends/${userId}/all`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    axios
      .get(`http://localhost:8800/api/friends/list/${userId}`)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  }, [userId]);

  const handleAddFriend = (friendId) => {
    axios
      .post("http://localhost:8800/api/friends/add", {
        userId: userId,
        friendId: friendId,
      })
      .then((response) => {
        alert(response.data.message); // Success message
        setFriends([...friends, { id: friendId }]); // Add friend to list
        setUsers(users.filter((user) => user.id !== friendId)); // Remove friend from suggestions
      })
      .catch((error) => {
        alert("Error adding friend: " + error.response?.data?.message);
      });
  };

  return (
    <div className="friends-page">
      <div className="suggestions">
        <h2>Friend Suggestions</h2>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="friend-card">
              <p>{user.username}</p>
              <button onClick={() => handleAddFriend(user.id)}>Add</button>
            </div>
          ))
        ) : (
          <p>No suggestions available</p>
        )}
      </div>
      <div className="friends-list">
        <h2>Your Friends</h2>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.id} className="friend-card">
              <p>{friend.username}</p> {/* Display friend's username */}
            </div>
          ))
        ) : (
          <p>You have no friends yet</p>
        )}
      </div>
    </div>
  );
};

export default Friends;