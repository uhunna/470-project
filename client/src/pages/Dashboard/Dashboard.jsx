import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [habits, setHabits] = useState({});
  const [newHabit, setNewHabit] = useState({
    habit_name: "",
    description: "",
    category: "",
    goal: "",
  });

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/habit", {
          withCredentials: true, // Include cookies for session authentication
        });
        const habitsByCategory = response.data.reduce((acc, habit) => {
          acc[habit.category] = acc[habit.category] || [];
          acc[habit.category].push(habit);
          return acc;
        }, {});
        setHabits(habitsByCategory);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch habits. Please check the server or network.", {
          position: "top-center",
        });
      }
    };

    fetchHabits();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabit((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/habit/add",
        newHabit,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data, { position: "top-center" });

      setNewHabit({
        habit_name: "",
        description: "",
        category: "",
        goal: "",
      });

      // Refresh habits after adding
      const updatedHabits = await axios.get("http://localhost:8800/api/habit", {
        withCredentials: true,
      });
      const habitsByCategory = updatedHabits.data.reduce((acc, habit) => {
        acc[habit.category] = acc[habit.category] || [];
        acc[habit.category].push(habit);
        return acc;
      }, {});
      setHabits(habitsByCategory);
    } catch (err) {
      toast.error(err.response?.data || "Failed to add habit", { position: "top-center" });
    }
  };

  const handleDeleteHabit = async (habitId, category) => {
    try {
      await axios.delete(`http://localhost:8800/api/habit/delete/${habitId}`, {
        withCredentials: true,
      });
      toast.success("Habit deleted successfully!", { position: "top-center" });

      setHabits((prevHabits) => {
        const updatedCategory = prevHabits[category].filter((habit) => habit.hid !== habitId);
        if (updatedCategory.length === 0) {
          const updatedHabits = { ...prevHabits };
          delete updatedHabits[category]; // Remove empty category
          return updatedHabits;
        }
        return {
          ...prevHabits,
          [category]: updatedCategory,
        };
      });
    } catch (err) {
      toast.error("Failed to delete habit", { position: "top-center" });
      console.error(err);
    }
  };

  const calculateProgress = (completed, goal) => {
    return (completed / goal) * 100;
  };

  const renderProgressBar = (completed, goal) => {
    const progress = calculateProgress(completed, goal);
    return (
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="progress-bar-text">{progress === 100 ? "Goal Reached!" : `${completed}/${goal} days`}</div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <ToastContainer />
      <h2>My Habits</h2>

      <div className="habit-form">
        <h3>Create a New Habit</h3>
        <form onSubmit={handleAddHabit}>
          <input
            type="text"
            name="habit_name"
            placeholder="Habit Name"
            value={newHabit.habit_name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newHabit.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newHabit.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="goal"
            placeholder="Goal (e.g., 30 days)"
            value={newHabit.goal}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Habit</button>
        </form>
      </div>

      <div className="dashboard-content">
        <h3>Dashboard</h3>
        {Object.keys(habits).length === 0 ? (
          <p>No habits to display.</p>
        ) : (
          Object.keys(habits).map((category) => (
            <div key={category} className="habit-category">
              <h3>{category}</h3>
              {habits[category].map((habit) => (
                <div key={habit.hid} className="habit-item">
                  <div className="habit-details">
                    <p><strong>{habit.habit_name}</strong></p>
                    <p>{habit.description}</p>
                    <p><strong>Streak: {habit.streak || 0}/{habit.goal} days completed</strong></p>
                  </div>
                  {renderProgressBar(habit.streak || 0, habit.goal)}
                  <div className="habit-actions">
                    <button className="delete" onClick={() => handleDeleteHabit(habit.hid, category)}>Delete</button>
                    <button className="checkoff">Check Off</button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
