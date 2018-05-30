import * as React from 'react';
import "./App.css";
import ChatTree from './ChatTree'
import ChatInput from "./ChatInput";



class App extends React.Component<{},any> {
    constructor(props:any){
        super(props);
        this.state={
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
                    "name": "Ori"
                },
                {
                    "type": "user",
                    "name": "Roni"
                }
            ],
            users:[],
            selectedGroup:null
        }
    }

    render() {
        return (
            <div id="container">
                <aside id="sidebar"><ChatTree items={this.state.items} /></aside>
                <section id="main">
                    <section id="top-bar">Top bar</section>
                    <section id="messages-list">Messages list</section>
                    <section id="new-message"><ChatInput /></section>
                </section>
            </div>
        );
    }
}

export default App;