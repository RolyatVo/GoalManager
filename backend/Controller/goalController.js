const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalsModel");
const User = require("../model/userModel");

// @description     get User's goal
// @route           GET /api/goals
// @access          Private
const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    console.log(`Read goal`);
    res.status(200).json(goals);
});

// @description     Set goals
// @route           POST /api/goals
// @access          Private
const setGoal = asyncHandler(async (req, res) => {
    console.log(`Created goal`);
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add text field");
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });
    res.status(200).json(goal);
});

// @description     Update goals
// @route           PUT /api/goals/:id  (goal)
// @access          Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    //Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    //Make sure the logged in user matches goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    console.log(`Updated ${req.params.id}`);
    res.status(200).json(updatedGoal);
});

// @description     Delete a goal
// @route           DEL /api/goals/:id  (goal)
// @access          Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(200);
        throw new Error("Goal not found");
    }

    //Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    //Make sure the logged in user matches goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

    console.log(`Deleted ${req.params.id}`);
    res.status(200).json(deletedGoal);
});

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
};
