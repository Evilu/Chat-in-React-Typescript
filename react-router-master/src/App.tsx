import * as React from 'react';
import "./App.css";
import ChatTree from './ChatTree'
import MessagesList from "./Messageslist";
import {IUser} from "./Entities";
import {Link, Route} from "react-router-dom";
import LoginModal from "./LoginModal";
import {Redirect, Switch} from "react-router";
import StateStore from "./models/StateStore";
import {Message} from "./models/Message";


export enum alert{
    none,
    allGood,
    credentials,
    locked
}


 interface IAppstate {
    message:string
    items:Iitem[],
     list?:string[],
     loggedInUser: IUser | null,
     alert: alert,
     counter: number,
     approveUser:boolean,
     selected?:{id:string, type:string}


}


export interface Iitem {

    type:string,
     name:string,
    items?:Iitem[],
    id:string


}

 class App extends React.Component<{},IAppstate> {
    constructor(props:any){
        super(props);
        this.state={
            loggedInUser: null,
            alert: alert.none,
            counter: 0,
            approveUser:false,
             items:[
                {
                    "type": "group",
                    "id":"1",
                    "name": "Friends",
                    "items": [
                        {
                            "type": "user",
                            "id":"3",
                            "name": "James"
                        },
                        {
                            "type": "group",
                            "id":"2",
                            "name": "Best Friends",
                            "items": [
                                {
                                    "type": "user",
                                    "id":"4",
                                    "name": "Ugi"
                                },
                                {
                                    "type": "user",
                                    "id":"5",
                                    "name": "Pikachu"
                                },
                                {
                                    "type": "user",
                                    "id":"6",
                                    "name": "Ash"
                                },
                                {
                                    "type": "user",
                                    "id":"7",
                                    "name": "Trainer"
                                },
                                {
                                    "type": "user",
                                    "id":"8",
                                    "name": "Jessie"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "user",
                    "id":"9",
                    "name": "Shula"
                },
                {
                    "type": "user",
                    "id":"10",
                    "name": "Tikva"
                }
            ]
            ,
            message:''

        }
    }


    auth = (user: IUser): boolean => {
        console.log(user);
        return user.username == 'batman' && user.password == 'robin';
    };

    getIDfromElement=(element:any)=>{
        this.setState({selected: {id:element.id, type:element.type}})
        const newList = StateStore.getInstance().getGroupMessages(this.state.selected!.id);
        this.setState({ message: '' , list:newList})
    };

    onLoginSubmitHandler =(user:IUser)=>{

        if(this.auth(user)){
            this.setState({
                loggedInUser: user,
                alert: alert.allGood,
                approveUser:true
            })
        }

        else{
            if(this.state.counter===2){
                this.setState({
                    loggedInUser: null,
                    alert: alert.locked
                });
            }
            else {
                this.setState((prev) => ({
                    loggedInUser: null,
                    alert: alert.credentials,
                    counter: this.state.counter + 1
                }));
            }
        }
    };

    public submitHandler=(event:any)=> {

        event.preventDefault();
        if (this.state.selected && this.state.selected!.type==='group'){
            StateStore.getInstance().addMessageToGroup(this.state.selected!.id, new Message(this.state.message, new Date().toLocaleTimeString(), this.state.loggedInUser!.username));
                   const newList = StateStore.getInstance().getGroupMessages(this.state.selected!.id);
                    this.setState({ message: '' , list:newList})
        }

    };

    public textChangeHandler=(event:any) => {
        this.setState({ message: event.target.value });
    };



    public  appRender=()=>(
        <div className='main'>
            <div className="main-left">
                <span className="sidebar"><ChatTree getIDfromElement={this.getIDfromElement} items={this.state.items} /></span>
            </div>
            <div className="main-right">
                <div className="messages-list"><MessagesList textChangeHandler={this.textChangeHandler} submitHandler={this.submitHandler} list={this.state.list} message={this.state.message} /></div>
            </div>
        </div>
    );

    public loginRender =()=>(this.state.approveUser?<Redirect to={{pathname:'/chat'}}/>:<LoginModal loginStatus={this.state.alert} onSubmit={this.onLoginSubmitHandler}/>);

    render() {
        return (
            <div className="App">
                <Route path='/login' render={this.loginRender}/>
                <nav className="nav">
                    <div className="nav-left">
                        <div className='gbText'>
                        GAME BOY
                        </div>
                    <Link to='/login'><button className='loginBtn'>login</button></Link>
                        <div  hidden={!this.state.loggedInUser}>
                            {this.state.loggedInUser?this.state.loggedInUser!.username:""}
                        </div>
                    </div>
                </nav>
                <div className="chat">
                    <Switch>
                        <Route path='/' render={this.appRender}/>
                        <Route path='/chat' render={this.appRender}/>
                    </Switch>
                </div>

            </div>

        );
    }
}

export default App;