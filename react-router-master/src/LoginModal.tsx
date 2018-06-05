import * as React from 'react';
import {IUser} from './Entities';
import Field from './Field';
import {alert} from "./App";
import './LoginModal.css';
import {Link} from 'react-router-dom';

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
            return {
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
            <div className='login-wrapper'>
                <div className='login-form-wrapper'>
                    <form className='login-form'>
                        <div>
                            <Link to='/'><button className='login-X'>X</button></Link>
                        </div>
                        <div className='login-fields'>
                            <Field name={'username'} type={'text'} onChange={this.updateField}/>
                            <Field name={'password'} type={'password'} onChange={this.updateField}/>
                            <button disabled={!this.state.user.username || !this.state.user.password} className='login-btn' type="button" onClick={this.submitHandler}>Login</button>
                            <p style={{color:this.colors[this.props.loginStatus]}}>{this.messages[this.props.loginStatus]}</p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}