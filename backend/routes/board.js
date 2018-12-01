var express = require("express");
var Board = require("../models/board")
var router = express.Router();
var auth = require("../config/auth")

router.use(function (req, res, next) {
    next();
});

router.get("/", function (err, res) {
    Board.find({}).sort({ _id: -1 }).exec(function (err, board) {
        if (err) {
            console.log(err);
            res.status(401).send(err)
        } else {
            res.status(200).json(board);
        }
    })
})

router.get("/posts/:id", auth.ensureAuth(), function (req, res) {
    Board.findOne({ _id: req.params.id })
        .then(board => {
            if (board) {
                if (board.userId == req.user.username) {
                    res.status(200)
                    res.json(board)
                } else {
                    res.status(203).send(); // writer 와 사용자 일치 x
                }
            } else {
                res.status(405).send(); // data 없음
            }
        })
});

router.get("/view/:id", function (req, res) {
    var contentId = req.params.id;
    Board.findOne({ _id: contentId }, function (err, rawContent) {
        if (err) {
            console.log(err);
            res.status(401).send(err)
        } else {
            rawContent.count += 1; // 조회수를 늘려줍니다.
            rawContent.save(function (err) { // 변화된 조횟수 저장
                if (err) {
                    console.log(err);
                    res.status(401).send(err)
                } else {
                    res.json(rawContent);
                    res.status(200).send();
                }
            });
        }
    })
});

router.post("/", auth.ensureAuth(), (req, res) => {
    let newBoard = new Board({
        userId: req.user.username,
        title: req.body.title,
        writer: req.body.nickname,
        contents: req.body.contents
    });
    newBoard.save();
    res.status(200).send(Board)
});

router.post("/comment", (req, res) => {
    let comment = {
        name: "",
        memo: "",
        boardId: Number
    }
    comment = req.body
    Board.findOne({ _id: req.body.boardId }, function (err, board) {
        board.comments.push(comment)
        board.save();
    })
});

router.get("/posts/:id", auth.ensureAuth(), function (req, res) {
    Board.findOne({ _id: req.params.id })
        .then(board => {
            if (board) {
                if (board.userId == req.user.username) {
                    res.status(200)
                    res.json(board)
                } else {
                    res.status(203).send(); // writer 와 사용자 일치 x
                }
            } else {
                res.status(405).send(); // data 없음
            }
        })
});

router.delete("/comment", auth.ensureAuth(), (req, res) => {
    Board.findOne({ _id: req.body.boardId }, function (err, board) {
        if (board) {
            for (i = 0; i < board.comments.length; i++) {
                if (board.userId == req.user.username) {
                    if (board.comments[i]._id == req.body.commentId) {
                        console.log(board.comments[i]);
                        board.comments.remove(board.comments[i])
                    }
                    board.save()
                }
                else {
                    res.status(203).send() // 사용자 일치 x
                }
            }
        } else {
            res.status(405).send(); // data 없음
        }
    })
})

router.put("/posts/:id", auth.ensureAuth(), function (req, res) {
    Board.findOne({ _id: req.params.id })
        .then(board => {
            console.log(board)
            if (board) {
                if (board.userId == req.user.username) {
                    Board.findOneAndUpdate({ _id: req.params.id },
                        {
                            title: req.body.title,
                            contents: req.body.contents
                        }, function (err) {
                            if (err) {
                                console.log(err)
                            } else {
                                res.status(200).send();
                            }
                        })
                } else {
                    res.status(203).send(); // writer 와 사용자 일치 x
                }
            } else {
                res.status(405).send();
            }
        })
})
router.delete("/posts/:id", auth.ensureAuth(), function (req, res) {
    Board.findOne({ _id: req.params.id })
        .then(board => {
            if (board) {
                console.log(board)
                if (board.userId == req.user.username) {
                    Board.deleteOne({ _id: req.params.id }, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200).send();
                        }
                    })
                } else {
                    res.status(203).send(); // writer 와 사용자 일치 x
                }
            } else {
                res.status(405).send();
            }
        })
});

module.exports = router;