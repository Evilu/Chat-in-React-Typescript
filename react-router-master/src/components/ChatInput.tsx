import * as React from 'react';

interface IChatInputProps {

    textChangeHandler(event:any):void,
    submitHandler(event:any):void,
    message:string

}

class ChatInput extends React.Component<IChatInputProps,{}> {
    constructor(props:IChatInputProps) {
        super(props);
        this.state = { message: '' ,currentMessage:''}
    }



    render() {
        return (
            <div>
                <form className="chat-input" onSubmit={this.props.submitHandler}>

                    <input className='typeBox' type="text" onChange={this.props.textChangeHandler} value={this.props.message} placeholder="Well type something will ya?!..."/>
                    <button className="input-button" onClick={this.props.submitHandler}>Send</button>
                </form>
            </div>
        );
    }
}


export default ChatInput;