const { z } = require("zod");

const validateLeadInput = (req, res, next) => {
  const leadSchema = z.object({
    leadName: z.string().min(1, "Lead name is required"),
    contactNumber: z
      .string()
      .min(10, "Contact number should have at least 10 characters"),
    email: z.string().email("Invalid email format"),
    address: z.string().optional(),
    status: z.enum(["new", "contacted", "qualified", "lost"]).optional(),
    assignedTo: z.string().optional(),
    nextFollowUpDate: z.string().optional(),
    nextFollowUpTime: z.string().optional(),
    leadSource: z.string().optional(),
    conversionDate: z.string().optional(),
    leadNotes: z.string().optional(),
    customerType: z.string().optional(),
    purchaseHistory: z.string().optional(),
    medicalNeeds: z.string().optional(),
  });

  try {
    leadSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

const validateUserInput = (req, res, next) => {
  const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password should be at least 6 characters long"),
    role: z.enum(["admin", "user"]).optional().default("user"),
    status: z.enum(["active", "inactive"]).optional().default("active"),
  });

  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

module.exports = {
  validateLeadInput,
  validateUserInput,
};
