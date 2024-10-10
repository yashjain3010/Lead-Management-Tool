import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/leads/upcoming-follow-ups",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications.");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/list-view")}>List View</button>
          <button onClick={() => navigate("/create-lead")}>Create Lead</button>
          <button onClick={() => navigate("/notifications")}>
            Notifications{" "}
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
          {notifications.length > 0 && (
            <div className="notification-dropdown">
              {notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                  {notification.message}
                </div>
              ))}
            </div>
          )}
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
        <div></div>
      </div>
    </nav>
  );
}
