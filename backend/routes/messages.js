const express = require('express');
const router = express.Router();
const Database = require('./../dbService2/Database');
const Message = require('./../entities/Message');


let db = new Database();
db.initDB();

router.post('/', async function (req, res, next) {
    if (req.body.content === "") {
        res.send({ emptyMsg: "empty message" });
        return;
    }
    const dateTime = getTimeAndDate();
    const id = Math.random().toString(32).split(".")[1];
    const newMsg = new Message(id, req.body.content, req.body.userName, dateTime, req.body.userAvatar);
    const result = await db.insertOne(newMsg, "messages");
    if (result.affectedRows === 1) {
        res.send({ msgUploded: "msgUploded" })
    }
})

router.get('/:id', async function (req, res, next) {
    const msgID = req.params.id;
    if(msgID==="emptyList"){
        const newMessages = await db.getLastInstancesByLimit("messages",10);
        res.send({isNeedUpdate: true, newMessages});
        return;
    }
    const newMessages = await db.getNewInstances(msgID, "messages");
    if (newMessages.length === 0) {
        res.send({ isNeedUpdate: false })
    }
    else {
        res.send({ isNeedUpdate: true, newMessages });
    }
})

function getTimeAndDate() {
    const date = new Date();
    const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const currentTime = hours + ":" + minutes + ":" + seconds;
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const currentDate = year + "-" + month + "-" + day;
    return currentDate + " " + currentTime;
}

module.exports = router;
