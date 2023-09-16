const express = require("express");
const router = express.Router();

const tasks = [{ id: 1, name: "Practice Node" }, { id: 2, name: "Practice React" }, { id: 3, name: "Check Emails" }];

router.route("/")
    .get((req, res) => {
        res.status(200).json({ tasks: tasks })
    })
    .post((req, res) => {
        console.log("Body : ", req.body)
        if (req.body) {
            tasks.push(req.body);
            res.status(201).json({ result: "Task Added", task: req.body })
        } else {
            res.status(500).json({ result: "Task Not Added", error: "Request Body Empty" })
        }
    })
    .delete((req, res) => {
        if (req.body) {
            let index = -1;
            for (let i = 0; i < tasks.length; i++) {
                if (req.body.id === tasks[i].id) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                tasks.splice(index, 1);
                res.status(200).json({ result: "Task Deleted", task: req.body })
            } else {
                res.status(404).json({ result: "Not Deleted", error: "Task does not exist" })
            }
        } else {
            res.status(500).json({ result: "Not Deleted", error: "Request missing task ID" })
        }
    });


router.route('/:id')
    .get((req, res) => {
        let index = -1;
        for (let i = 0; i < tasks.length; i++) {
            if (req.params.id == tasks[i].id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            res.status(200).json({ result: "Task Found", task: tasks[index] })
        } else {
            res.status(404).json({ result: "Not Found", error: "Task does not exist" })
        }
    })

module.exports = router;