const express = require("express");
const router = express.Router();
const {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
} = require("../Controller/goalController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoal).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
