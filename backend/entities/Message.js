

class Message{
    constructor(id,content,userName,dateTime,userAvatar){
        this.id=id;
        this.content=content;
        this.userName=userName;
        this.dateTime=dateTime;
        this.userAvatar=userAvatar;
    }
}

module.exports =  Message;