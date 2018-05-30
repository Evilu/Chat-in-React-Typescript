import * as React from 'react';

interface IChatInputState {
    // name:{},
    // items:IChatInputState[],
    // item:any,
    // className:string,
    // onSend:any,
    message:string
    currentMessage:string

}

class ChatInput extends React.Component<{},IChatInputState> {
    constructor(props:IChatInputState) {
        super(props);
        this.state = { message: '' ,currentMessage:''}
    }

    submitHandler=(event:any)=> {
        // Stop the Component from refreshing the page on every submit and driving you mad bashing your head on the floor..
        event.preventDefault();

        // Letting us clear the input box
        this.setState({currentMessage:this.state.message, message: '' });

        // Call the onSend callback with the message message
    };

    textChangeHandler=(event:any) => {
        this.setState({ message: event.target.value });
    };

    render() {
        return (
            <div>
                <form className="chat-input" onSubmit={this.submitHandler}>
                    <input type="text" onChange={this.textChangeHandler} value={this.state.message} placeholder="Well type something will ya?!..."/>
                </form>
            </div>
        );
    }
}


export default ChatInput;