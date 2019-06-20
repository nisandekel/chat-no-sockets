const express = require('express');
const router = express.Router();
const db = require('./../dbService/db.json');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../dbService/db.json');
const Message = require('./../entities/Message');


router.get('/', function (req, res, next) {
    res.send(db.messages);
})

router.post('/', function (req, res, next) {
    if(req.body.content===""){
        res.send({emptyMsg:"empty message"});
        return;
    }
    const id = Math.random().toString(32).split(".")[1];
    const newMsg = new Message(id,req.body.content,req.body.userName,req.body.timeAndDate);
    db.messages.push(newMsg);
    fs.writeFile(dbPath, JSON.stringify(db) , function (err) {
        if (err) throw err;
        res.send({success:"success"});
    });
})

router.post('/checkUpdates',function(req,res,next){
    if(req.body.msgListLength===db.messages.length){
        res.send({isNeedUpdate:false})
    }
    else{
        res.send({isNeedUpdate:true, newList:db.messages});
    }
})

module.exports = router;
