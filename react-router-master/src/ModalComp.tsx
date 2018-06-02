import * as React from 'react';
import './App.css';
import {IUser} from './Entities';
import LoginModal from "./LoginModal";


export
enum alert{
    none,
    allGood,
    credentials,
    locked
}

interface ImodalComp {
    loggedInUser: IUser | null,
    errorMsg: alert,
    counter: number


}

class ModalComp extends React.Component<{}, ImodalComp> {

    constructor(props:any) {
        super(props);

        this.state = {
            loggedInUser: null,
            errorMsg: alert.none,
            counter: 0


        }
    }

    auth = (user: IUser): boolean => {
        console.log(user);
        return user.username == 'batman' && user.password == 'robin';
    };

    onLoginSubmitHandler =(user:IUser)=>{

        if(this.auth(user)){
            this.setState({
                loggedInUser: user,
                errorMsg: alert.allGood

            })
        }

        else{
            if(this.state.counter===2){
                this.setState({
                    loggedInUser: null,
                    errorMsg: alert.locked
                });
            }
            else {
                this.setState((prev) => ({
                    loggedInUser: null,
                    errorMsg: alert.credentials,
                    counter: this.state.counter + 1
                }));
            }
        }
    };

    public render() {
        return (
            <LoginModal loginStatus={this.state.errorMsg} onSubmit={this.onLoginSubmitHandler}/>
        );
    }
}

export default ModalComp;
