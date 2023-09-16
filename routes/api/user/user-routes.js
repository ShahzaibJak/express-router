const express = require("express");
const router = express.Router();

const users = [{ id: 1, name: "Shahzaib" }, { id: 2, name: "Ali" }, { id: 3, name: "Ali" }];

router.route("/")
    .get((req, res) => {
        res.status(200).json({ users: users })
    })
    .post((req, res) => {
        console.log("Body : ", req.body)
        if (req.body) {
            users.push(req.body);
            res.status(201).json({ result: "User Added", user: req.body })
        } else {
            res.status(500).json({ result: "User Not Added", error: "Request Body Empty" })
        }
    })
    .delete((req, res) => {
        if (req.body) {
            let index = -1;
            for (let i = 0; i < users.length; i++) {
                if (req.body.id === users[i].id) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                users.splice(index, 1);
                res.status(200).json({ result: "User Deleted", user: req.body })
            } else {
                res.status(404).json({ result: "Not Deleted", error: "User does not exist" })
            }
        } else {
            res.status(500).json({ result: "Not Deleted", error: "Request missing user ID" })
        }
    });


router.route('/:id')
    .get((req, res) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (req.params.id == users[i].id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            res.status(200).json({ result: "User Found", user: users[index] })
        } else {
            res.status(404).json({ result: "Not Found", error: "User does not exist" })
        }
    })

module.exports = router;