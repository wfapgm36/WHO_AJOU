var express = require("express");
var Board= require("../models/board")
var router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.get("/", function (req, res) {
    Board.find({}).sort({date: -1}).exec(function (err, board) {
        if (err) {
            console.log(err);
            res.status(401).send(err)
        } else {
            res.status(200).json(board);
        }
    })
});

router.get("/view/:id", function (req, res) {
    var contentId = req.params.id;
    Board.findOne({_id: contentId}, function (err, rawContent) {
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

router.post("/", (req, res) => {
    let newBoard = new Board({
        title: req.body.title,
        writer: req.body.nickname,
        contents: req.body.contents
    });
    newBoard.save();
    res.status(200).send(Board)
    }
);

router.post("/comment", (req, res) => {
    let comment = {
        name: "",
        memo: "",
        boardId: Number
    }
    comment = req.body
    console.log(comment)
    Board.findOne({_id: req.body.boardId}, function(err, board){
        console.log(board)
        board.comments.push(comment)
        board.save();
    })
});

router.delete("/comment", (req, res) => {
    Board.findOne({_id: req.body.boardId}, function(err, board){
        for(i = 0; i<board.comments.length; i++){
            if(board.comments[i]._id == req.body.commentId){
                console.log(board.comments[i]);
                board.comments.remove(board.comments[i])
            }
        }
        board.save()
    })
})

router.put("/:id", function(req, res){
    
})

router.delete("/post/:id", function(req, res){
    Board.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log(err)
        }
    })
});

module.exports = router;