import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Challenges from "./pages/Challenges/Challenges";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Notifications from "./pages/Notifications/notifications";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics"; // Import the Analytics component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/analytics" element={<Analytics />} /> {/* Added Analytics route */}
      </Routes>
    </Router>
  );
};

export default App;
