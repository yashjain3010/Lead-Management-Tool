import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../../components/charts/pieChart/pieChart";
import "./DashBoard.css";

const DashBoard = () => {
  var leadData = [];
  const [totalPages, setTotalPages] = useState(1);
  const [dt, setDt] = useState({});
  var leadnewCount = 0;
  var leadqualifiedCount = 0;
  var leadcontactedCount = 0;
  var leadlostCount = 0;

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:3000/api/leads/my-leads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      leadData = data.leads;
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads().then(() => {
      if (leadData.length != 0) {
        for (let i = 0; i < leadData.length; i++) {
          if (leadData[i].status == "new") {
            leadnewCount = leadnewCount + 1;
          } else if (leadData[i].status == "qualified") {
            leadqualifiedCount = leadqualifiedCount + 1;
          } else if (leadData[i].status == "contacted") {
            leadcontactedCount = leadcontactedCount + 1;
          } else if (leadData[i].status == "lost") {
            leadlostCount = leadlostCount + 1;
          }
        }
        setDt({
          leadlostCount: leadlostCount,
          leadcontactedCount: leadcontactedCount,
          leadqualifiedCount: leadqualifiedCount,
          leadnewCount: leadnewCount,
        });
      }
    });
  }, []);

  if (dt.leadcontactedCount != undefined) {
  }

  return (
    <div className="mainCont">
      <div className="contentC">
        {dt.leadcontactedCount != undefined ? <PieChart data={dt} /> : ""}
      </div>
    </div>
  );
};

export default DashBoard;
