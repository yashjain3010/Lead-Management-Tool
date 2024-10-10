import "./StatusBar.css";

export default function StatusBar({ leadData }) {
  var status = leadData.status;

  var calc = 785 * (1 - 0.25);
  if (status == "new") {
    calc = 785 * (1 - 0.25);
  } else if (status == "contacted") {
    calc = 785 * (1 - 0.5);
  } else if (status == "qualified") {
    calc = 785 * (1 - 1);
  } else {
    calc = 785 * (1 - 0);
  }

  return (
    <div className="circuler-progress">
      <div className="percent">
        <svg width="300" height="300">
          <circle cx="150" cy="150" r="125"></circle>
          <circle cx="150" cy="150" r="125"></circle>
          <circle
            cx="150"
            cy="150"
            r="125"
            style={{ strokeDashoffset: calc }}
          ></circle>
        </svg>
        <span className="percentage-lbl">{status}</span>
      </div>
    </div>
  );
}
