import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Notifications.css";

const Notifications = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowUps = async () => {
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
          throw new Error("Failed to fetch follow-up reminders.");
        }

        const data = await response.json();
        setFollowUps(data);

        data.forEach((lead) => {
          toast.info(
            `Reminder: Follow-up with ${lead.leadName} on ${new Date(
              lead.nextFollowUpDate
            ).toLocaleDateString()}`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            }
          );
        });
      } catch (error) {
        setError("Failed to fetch follow-up reminders.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, []);

  return (
    <div className="notifications">
      <ToastContainer />
      <h2>Upcoming Follow-Ups</h2>
      {loading && <p>Loading follow-up reminders...</p>}
      {error && <p>{error}</p>}
      {followUps.length > 0 ? (
        <ul>
          {followUps.map((lead) => (
            <li key={lead._id}>
              <p>
                <strong>{lead.leadName}</strong> - Follow-up on{" "}
                {new Date(lead.nextFollowUpDate).toLocaleDateString()} at{" "}
                {lead.nextFollowUpTime}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No follow-ups for tomorrow.</p>
      )}
    </div>
  );
};

export default Notifications;
