const express = require("express")
const projects = require("../data/helpers/projectModel")
const { orWhereNotExists } = require("../data/dbConfig")

const router = express.Router()

// GET
router.get("/", (req, res) => {
    projects.get()
    .then((projects) => {
        res.status(200).json(projects)
    })
    .catch((error) => {
        next(error)
    })
})

// GET BY ID
router.get("/:id", validateProjectID(), (req, res) => {
    projects.get(req.params.id)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch((error) => {
        next(error)
    })
})

// GET PROJECT ACTIONS
router.get("/:id/actions", validateProjectID(), (req, res) => {
    projects.getProjectActions(req.params.id)
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        next(error)
    })
})

// POST
router.post("/", validateProjectID(), (req, res) => {
    projects.insert(req.body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "Could not add project"
        })
    })
})


// UPDATE
router.put('/:id', validateProjectID(), (req, res) => {
    projects.update(req.params.id, req.body)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch((error) => {
        next(error)
    })

})

// DELETE 
router.delete('/:id', validateProjectID(), (req, res) => {
    projects.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({
                message: "The project has been deleted"
            })
        }
    })
    .catch((error) => {
        next(error)
    })
})


// custom middleware
function validateProjectID() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then((project) => {
                if (project) {
                    req.project = project
                    next()
                } else {
                    res.status(404).json({
                        message: "Project not found"
                    })
                }
            })
            .catch((error) => {
                next(error)
            })
    }
}

module.exports = router