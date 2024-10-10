const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "qualified",
        "lost",
        "in progress",
        "converted",
        "not interested",
      ],
      default: "new",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nextFollowUpDate: { type: Date, required: true },
    nextFollowUpTime: { type: String, required: true },
    leadSource: { type: String, required: true },
    conversionDate: { type: Date, required: true },
    leadNotes: { type: String, required: true },
    customerType: { type: String, required: true },
    purchaseHistory: { type: String, required: true },
    medicalNeeds: { type: String, required: true },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
