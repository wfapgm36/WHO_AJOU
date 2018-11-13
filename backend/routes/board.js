var express = require("express");
var Boards = require("../models/board")

var router = express.Router();
var mongoose = require("mongoose");

//템플릿용 변수 설정
router.use(function (req, res, next) {
    console.log(req.user)
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/boards", function(req, res){
    Boards.find({}).sort({date:-1}).exec(function(err, rawContents){
        if(err) throw err;

        //res.render('boards', {title:"Board", contents: rawContents});
        res.sendFile(path.join(__dirname, '../public', 'index.html'))
    })
    res.send(Boards)
});

router.get("/boards/view", function(req, res){
    var contentId = req.param('id');

    Boards.findOne({_id:contentId}, function(err, rawContent){
        if(err) throw err;
        rawContent.count += 1; // 조회수를 늘려줍니다.
        rawContent.save(function(err){ // 변화된 조횟수 저장
            if(err) throw err;
            //res.render('viewboard',{title: "Board", content:rawContent}); // db에서 가져온 내용을 뷰로 렌더링
            res.sendFile(path.join(__dirname, '../public', 'index.html'))
        });
    })
});

router.get("/board_write", function(req, res){
    //res.render("board_write");
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});


router.post("/boards", (req, res, next) => {
    let title = req.body.title;
    let contents = req.body.contents;
    Boards.findOne({title:title}, (err, board) =>{
        if(err) console.log(err);
        if(board){
            req.flash("error", "이미 있는 게시글.");
            res.redirect("board_write");
        }else{
            let newBoard = new Boards({
                writer: req.user.username,
                title: title,
                contents: contents
            });
            newBoard.save();
            res.redirect('/boards');
        }
    })
});



module.exports = router;
