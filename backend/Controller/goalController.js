const asyncHandler = require("express-async-handler")

const getGoal = asynchandler( async (req, res) => { 
    console.log(`Read goal`)
    if (!req.body.text) { 
        res.status(400);
        throw new Error("Please add text field")
    }
    res.status(200).json({message: 'Get goals'})
})

const setGoal = asyncHandler( async (req, res) => { 
    console.log(`Created goal`)
    res.status(200).json({message: 'Post goals'})
})
const updateGoal = asyncHandler (async (req, res) => { 
    console.log(`Updated ${req.params.id}`)
    res.status(200).json({message: `Updated ${req.params.id} goal`})

})

const deleteGoal = asyncHandler(async (req, res) => { 
    console.log(`Deleted ${req.params.id}`)
    res.status(200).json({message: `Deleted ${req.params.id} goal`})
})

module.exports = { 
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
}