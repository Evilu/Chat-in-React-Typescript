import * as React from 'react';


import StateStore from '../models/StateStore';

interface IState {
    myStateKey: IUser[]
}

interface IUser {
    name:string,
    password:string
}


class StateStoreContainer extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
    }
    componentWillMount(){
            this.getUsers()
    }
    public getUsers= ()=>{
        const users = StateStore.getInstance().get('users');
        this.setState({myStateKey:users})
    };

    render() {

        const list = this.state.myStateKey.map((user, index)=>{
            return <li key={index}>{user.name}</li>
        });
        return (
            <div>
                <div> {list}</div>

        {this.props.children}
        </div>
    )
    }
}

// function Connector(): any {
//     return StateStoreContainer;
// }

export default StateStoreContainer;