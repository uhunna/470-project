import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUserId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8800/notifications?user_id=${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [currentUserId, token]);

  const handleAction = (notificationId, action, friendId) => {
    const url =
      action === "accept"
        ? `http://localhost:8800/friends/accept`
        : `http://localhost:8800/friends/delete`;

    axios
      .post(
        url,
        { friend_id: friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setNotifications(notifications.filter((notif) => notif.id !== notificationId));
        alert(`Friend request ${action}ed successfully!`);
      })
      .catch((error) => {
        console.error(`Error ${action}ing friend request:`, error);
      });
  };

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${notif.is_read ? "read" : ""}`}
            >
              <p>{notif.message}</p>
              {notif.type === "friend_request" && (
                <div className="friend-request-actions">
                  <button
                    onClick={() => handleAction(notif.id, "accept", notif.friend_id)}
                    className="accept-btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(notif.id, "delete", notif.friend_id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
