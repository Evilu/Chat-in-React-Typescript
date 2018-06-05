export interface IMessage {
     content:string;
     date:string;
    sender?:string;
}

export class Message implements IMessage{
    public content:string;
    public date:string;
    public sender:string;

    constructor(content:string, date:string, sender:string){
        this.content=content;
        this.sender=sender;
        this.date=date;
    }
}

const m = new Message("hi", "d", "gal");
m;

