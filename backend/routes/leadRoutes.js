const express = require("express");
const leadController = require("../controllers/leadController");
const inputValidation = require("../middleware/inputValidation");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/upcoming-follow-ups",
  authMiddleware.protect,
  leadController.getUpcomingFollowUps
);

router.post(
  "/create",
  authMiddleware.protect,
  inputValidation.validateLeadInput,
  leadController.createLead
);
router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  leadController.getLeads
);
router.get("/my-leads", authMiddleware.protect, leadController.getLeads);
router.get("/:id", authMiddleware.protect, leadController.getLeadById);
router.put(
  "/:id",
  authMiddleware.protect,
  inputValidation.validateLeadInput,
  leadController.updateLead
);
router.delete("/:id", authMiddleware.protect, leadController.deleteLead);

module.exports = router;
