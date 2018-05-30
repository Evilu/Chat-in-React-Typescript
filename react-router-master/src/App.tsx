import * as React from 'react';
import "./App.css";
import ChatTree from './ChatTree'
import ChatInput from "./ChatInput";
import MessagesList from "./Messageslist";

 interface IAppstate {
    message:string
    items:Iitem[],
     list:string[]
}

export interface Iitem {
    type:string,
     name:string,
    items?:Iitem[],
    // className:string,
}



class App extends React.Component<{},IAppstate> {
    constructor(props:any){
        super(props);
        this.state={
             list :['hey there kids, wants to buy some drugs?', 'suuuure you do '],
             items:[
                {
                    "type": "group",
                    "name": "Friends",
                    "items": [
                        {
                            "type": "user",
                            "name": "Ugi"
                        },
                        {
                            "type": "group",
                            "name": "Best Friends",
                            "items": [
                                {
                                    "type": "user",
                                    "name": "CrackDealer3000"
                                },
                                {
                                    "type": "user",
                                    "name": "Don Cornilio"
                                },
                                {
                                    "type": "user",
                                    "name": "That Guy playing Spiderman"
                                },
                                {
                                    "type": "user",
                                    "name": "Zus and Tus"
                                },
                                {
                                    "type": "user",
                                    "name": "Jabba the Hut"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "user",
                    "name": "Shula"
                },
                {
                    "type": "user",
                    "name": "Tikva"
                }
            ]
            ,
            message:'',

            // users:[],
            // selectedGroup:null
        }
    }

    public submitHandler=(event:any)=> {
        // Stop the Component from refreshing the page on every submit and driving you mad bashing your head on the floor..
        event.preventDefault();

        // Letting us clear the input box
        this.setState({list:this.state.list.concat(this.state.message), message: '' });


    };

    public textChangeHandler=(event:any) => {
        this.setState({ message: event.target.value });
    };


    render() {
        return (
            <div id="container">
                <aside id="sidebar"><ChatTree items={this.state.items} /></aside>
                <section id="main">
                    <section id="top-bar">Top bar</section>
                    <section id="messages-list"><MessagesList list={this.state.list}  /></section>
                    <section id="new-message"><ChatInput message={this.state.message} textChangeHandler={this.textChangeHandler} submitHandler={this.submitHandler} /></section>
                </section>
            </div>
        );
    }
}

export default App;