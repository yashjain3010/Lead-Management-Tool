const Lead = require("../models/leadModel");
const { z } = require("zod");
const mongoose = require("mongoose");

const createLead = async (req, res) => {
  try {
    const leadSchema = z.object({
      leadName: z.string().min(1, "Lead name is required"),
      contactNumber: z.string().min(10, "Invalid contact number"),
      email: z.string().email("Invalid email format"),
      address: z.string(),
      status: z.enum([
        "new",
        "contacted",
        "qualified",
        "lost",
        "in progress",
        "converted",
        "not interested",
      ]),
      assignedTo: z.string(),
      nextFollowUpDate: z.string(),
      nextFollowUpTime: z.string(),
      leadSource: z.enum(["Email", "Website", "Referral", "Social Media"]),
      conversionDate: z.string(),
      leadNotes: z.string(),
      customerType: z.string(),
      purchaseHistory: z.string(),
      medicalNeeds: z.string(),
    });

    const leadData = leadSchema.parse(req.body);
    if (req.user.role !== "admin") {
      leadData.assignedTo = req.user._id;
    }
    const lead = new Lead(leadData);
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

const getLeads = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortField,
    sortOrder,
    filters,
    search,
  } = req.query;

  let query = {};

  if (filters) {
    const { status, leadSource } = JSON.parse(filters);
    if (status) query.status = status;
    if (leadSource) query.leadSource = leadSource;
  }

  if (req.user.role !== "admin") {
    query.assignedTo = req.user._id;
  }

  if (search) {
    query.$or = [
      { leadName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { contactNumber: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {};
  if (sortField && sortOrder) {
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
  }

  try {
    const leads = await Lead.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalLeads = await Lead.countDocuments(query);

    res.status(200).json({
      leads,
      totalPages: Math.ceil(totalLeads / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching leads" });
  }
};

const getLeadById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ data: lead });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.status(200).json({ success: true, data: lead });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.status(204).json({ success: true, data: null });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getUpcomingFollowUps = async (req, res) => {
  try {
    const today = new Date();
    const twoDaysFromNow = new Date(today.setDate(today.getDate() + 1));

    const upcomingFollowUps = await Lead.find({
      nextFollowUpDate: { $gte: today, $lte: twoDaysFromNow },
      assignedTo: req.user._id,
    }).select("leadName nextFollowUpDate nextFollowUpTime");

    res.status(200).json(upcomingFollowUps);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching upcoming follow-ups",
      error: error.message,
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  getLeadById,
  getUpcomingFollowUps,
};
