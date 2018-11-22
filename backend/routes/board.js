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
    var contentId = req.param('id');
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


router.post("/", (req, res, next) => {
    console.log(req.body);
    let title = req.body.title;
    let contents = req.body.contents;
    Board.findOne({
        title: title
    }, (err, board) => {
        if (err) {
            console.log(err);
            res.status(401).send(err);
        } else {
            console.log(title);
            console.log(contents);
            let newBoard = new Board({
                //writer: req.user.username,
                title: title,
                contents: contents
            });
            newBoard.save();
            //res.status(200).send(newBoard);
            res.send(Board)
        }
    })
});

router.delete("/", function(req, res){
    
});

module.exports = router;