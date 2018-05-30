import * as React from 'react';

interface IMessagesListState {


}
interface IMessagesListProps {
    list:string[]

}



class MessagesList extends React.Component<IMessagesListProps,IMessagesListState> {
    constructor(props:IMessagesListProps) {
        super(props);
        this.state = { }
    }



    render() {
         const newList = this.props.list.map((message,index)=>{
             return <li key={index}>{message}  </li>
         })
        return (
            <div>
           <ul>
               {newList}
           </ul>


            </div>
        );
    }
}


export default MessagesList;