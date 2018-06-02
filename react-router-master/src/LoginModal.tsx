import * as React from 'react';
import {IUser} from './Entities';
import Field from './Field';
import {alert} from "./ModalComp";

interface ILoginModalProps {
    onSubmit: (u: IUser) => void,
    loginStatus: alert
}

interface ILoginModalState {
    user: IUser
}

export default class LoginModal extends React.Component<ILoginModalProps, ILoginModalState> {

    private messages = {
        [alert.allGood]: 'you\'re logged in!!!',
        [alert.credentials]: 'username or password are wrong!',
        [alert.locked]: 'you\'re locked!!'
    };

    private colors = {
        [alert.allGood]: 'green',
        [alert.credentials]: 'red',
        [alert.locked]: 'red'
    }

    constructor(props:any) {
        super(props);
        this.state = {
            user: {username: '', password: ''}
        }
    }

    updateField = (fieldName: string, value: string) => {

        this.setState(prevState => {
            //1
            //prevState.user[fieldName] = value;

            // const newState = Object.assign({},
            //     prevState,
            //     {user:prevState.user});
            //
            // return newState;

            return {
                // 1
                //user: prevState.user
                // 2
                prop: 'sdf',
                user: {
                    ...this.state.user,
                    [fieldName]: value
                }
            }
        })
    };

    submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onSubmit(this.state.user);
    };



    render() {
        return (
            <form>
                <Field name={'username'} type={'text'} onChange={this.updateField}/>
                <Field name={'password'} type={'password'} onChange={this.updateField}/>

                <button type="button" onClick={this.submitHandler}>Login</button>
                <p style={{color:this.colors[this.props.loginStatus]}}>{this.messages[this.props.loginStatus]}</p>


            </form>
        );
    }
}