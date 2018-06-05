import {messagesDB} from '../models/Messages';
import {IMessage} from "../models/Message";
interface IStateStore {
    state: {
        // users:{name:string, password:string}[],
    };

    set(key: string, val: any): void
    get(key: string): any | null,
    addMessageToGroup(groupId:string, message:IMessage):any
    getGroupMessages(groupId:string):any
}

class StateStore implements IStateStore {
    state: {} = {
        // users : [{name:'gal',password:'1234'},{name:'shoko',password:'1234'},{name:'moshe',password:'1234'}],
    };

    public messagesDB = messagesDB

    set(key: string, val: any) {
        this.state[key] = val;
    }

    get(key: string) {
        return this.state[key] || null;
    }


    public addMessageToGroup(groupId:string, message:IMessage) {
        this.messagesDB.addMessageToGroup(groupId, message)
    }

    public getGroupMessages(groupId:string) {
        return this.messagesDB.getGroupMessages(groupId);
    }

    static instance: IStateStore;

    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }

        return StateStore.instance;
    }
}

export default StateStore;