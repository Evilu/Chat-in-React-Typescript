import * as React from 'react';
import ChatInput from "./ChatInput";
import "../App.css";
interface IMessagesListState {
}

interface IMessagesListProps {
    list:any,
    message:any,
    submitHandler(event:any):void,
    textChangeHandler(event:any):void
}

class MessagesList extends React.Component<IMessagesListProps,IMessagesListState> {
    constructor(props:IMessagesListProps) {
        super(props);
        this.state = { }
    }

    render() {
        let list;
        if(this.props.list){
             list = this.props.list.map((message:any,index:number)=>{
                 return <li key={index}>{message.content} <div className="message-date"> {message.date} </div></li>
            });
        }
            return (
                <div>
                    <div className="list">
                        <ul>
                            {list}
                        </ul>
                    </div>
                    <div className="new-message">
                        <ChatInput message={this.props.message} textChangeHandler={this.props.textChangeHandler} submitHandler={this.props.submitHandler} />
                    </div>
                </div>
            );
        }
}


export default MessagesList;