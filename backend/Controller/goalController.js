const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalsModel");

const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    console.log(`Read goal`);
    res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
    console.log(`Created goal`);
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add text field");
    }

    const goal = await Goal.create({
        text: req.body.text,
    });
    res.status(200).json(goal);
});
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    console.log(`Updated ${req.params.id}`);
    res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(200);
        throw new Error("Goal not found");
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
