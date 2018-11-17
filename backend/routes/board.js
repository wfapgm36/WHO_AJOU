var express = require("express");
var Boards = require("../models/board")
var router = express.Router();

router.use(function (req, res, next) {
    console.log(req.user)
    res.locals.currentUser = req.user;
    next();
});

router.get("/", function (req, res) {
    Boards.find({}).sort({date: -1}).exec(function (err, rawContents) {
        if (err) {
            console.log(err);
            res.status(401).send(err)
        }else{
            res.json(rawContents);
            res.status(200).send();
        }
    })
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

router.get("/view", function (req, res) {
    var contentId = req.param('id');
    Boards.findOne({_id: contentId}, function (err, rawContent) {
        if (err) {
            console.log(err);
            res.status(401).send(err)
        }else {
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
    let title = req.body.title;
    let contents = req.body.contents;
    Boards.findOne({title: title}, (err, board) => {
        if (err) {
            console.log(err);
            res.status(401).send(err);
        }else {
            let newBoard = new Boards({
                writer: req.user.username,
                title: title,
                contents: contents
            });
            newBoard.save();
            res.status(200).send('게시글 저장 완료');
        }
    })
});

router.delete("/", function(req, res){

});

module.exports = router;
