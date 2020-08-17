const express = require("express")
const actions = require("../data/helpers/actionModel")

const router = express.Router()

// GET
router.get("/", validateActionID(), (req, res) => {
    actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        next(error)
    })
})

// GET BY ID
router.get("/:id", validateActionID(), (req, res) => {
    actions.get(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        next(error)
    })
})


// POST
router.post("/", validateActionID(), (req, res) => {
    actions.insert(req.body)
    .then((action) => {
        res.status(201).json(action)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "Can't save actions"
        })
    })
})

// UPDATE
router.put('/:id', validateActionID(), (req, res) => {
    actions.update(req.params.id, req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        next(error)
    })
})

// DELETE
router.delete('/:id', validateActionID(), (req, res) => {
    actions.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({
                message: "The action has been deleted"
            })
        }
    })
    .catch((error) => {
        next(error)
    })
})


// custom middleware
function validateActionID() {
    return (req, res, next) => {
        actions.get(req.params.id)
            .then((action) => {
                if (action) {
                    req.action = action
                    next()
                } else {
                    res.status(404).json({
                        message: "Action not found"
                    })
                }
            })
            .catch((error) => {
                next(error)
            })
    }
}

module.exports = router