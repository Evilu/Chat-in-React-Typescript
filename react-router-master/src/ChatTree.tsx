import * as React from 'react';
import {Iitem} from './App'

interface Iprops {
    items:Iitem[]
}

class ChatTree extends React.Component<Iprops> {
    private ref:any;
    constructor(props: Iprops){
        super(props);
    }
    componentDidMount(){
        this.load(this.props.items);
    }
    render(){
        return(
            <ul ref={elem=>this.ref=elem}/>
        )
    }

     load(items:Iitem[]) {


        this.clearInner();

        for (const item of items) {
            const li = this.createLiElementWithName(item.name, 'root-name');
            if (item.items) {
                this.createChildren(li, item);
            }
            this.ref.appendChild(li);
        }
        this.startListening(this.ref);
    }


     createChildren(li:HTMLLIElement, item:Iitem) {
        const ul = document.createElement('ul');
        if (item.items) {
            for (const i of item.items) {
                let className;
                if (!i.items) {
                    className = 'last-name'
                }
                else {
                    className = 'items-name';
                }
                const li = this.createLiElementWithName(i.name, className);
                ul.appendChild(li);
                ul.style.display='none'
                if (i.items) {
                    this.createChildren(li, i);
                }
            }
        }

        li.appendChild(ul);
    }


     createLiElementWithName(name:string, className:string) {
        const li = document.createElement('li');
        const a = addNameToElement(name, className);
        a.setAttribute('tabIndex','1');
        li.appendChild(a);

        function addNameToElement(name:string, className:string) {
            const a = document.createElement('a');
            a.innerText = name;
            a.classList.add(className);
            return a;
        }

        return li;
    }


     displayNextSibling(ref:any){
        if(ref){
            if (ref.style.display !== "none") {
                ref.style.display = "none";
            }
            else {
                ref.style.display = "block";

            }
        }
    }


     startListening(ref:any){
        this.addClickListener(ref);
        this.toggleOnDoubleClick(ref);
        this.addKeyUpListener(ref);

    }


     addClickListener(ref:any){
         ref.addEventListener("click", (event:any)=>{
            event.target.focus();
            event.stopPropagation();
        })
    }
     toggleOnDoubleClick(ref:any){
         ref.addEventListener("dblclick", (event:any)=>{
            this.displayNextSibling(event.target.nextElementSibling);
            event.stopPropagation();
        });
    }
     displayChildren(ref:any) {
        if (ref.nextElementSibling){
            ref.nextElementSibling.style.display = 'block';

        }
    }
      hideChildren(ref:any){
        if (ref.nextElementSibling){
            if (ref.nextElementSibling.style.display === 'block'){
                ref.nextElementSibling.style.display = 'none'
            }
            else {
                if (ref.parentElement.parentElement.previousElementSibling) {
                    ref.parentElement.parentElement.previousElementSibling.focus();
                }
            }
        }
    }



     enterLevel(ref:any) {
        if(ref.nextElementSibling){
            this.displayNextSibling (ref.nextElementSibling);
        }
    }


     dealWithLi(ref:any, keyName:any){
        const selectedLi = ref.parentElement;
        const allLi = document.querySelectorAll('li');

         const liArray = () => {
            const result = [];
            for(let i = 0; i < allLi.length; i++){
                if(allLi[i].offsetParent){
                    result.push(allLi[i]);
                }
            }
            return result;
        }
        const caughtLi = liArray();
        function findIndex (){
            let result;
            for(let i = 0; i < caughtLi.length; i++){
                if(caughtLi[i] === selectedLi){
                    result = i;
                }
            }
            return result;
        }
        const index = findIndex();
        if(index !== undefined && index !== -1){

            if(keyName === 'ArrowDown'){
                const nextLi=index+1;
                if( nextLi < caughtLi.length){
                    if(caughtLi !== null && caughtLi[nextLi] !== null) {
                        (caughtLi[nextLi].querySelector(":scope>a") as HTMLElement).focus();
                    }
                }
            }
            else if(keyName === 'ArrowUp'){
                if(index){
                const nextLi=index-1;
                if(caughtLi[nextLi] && nextLi >= 0){
                    (caughtLi[nextLi].querySelector(":scope>a") as HTMLElement).focus();
                }
            }}
        }
    }



     addKeyUpListener(ref:any) {
         ref.addEventListener('keyup',(event:any)=> {
            if (event.key === 'ArrowRight'){
                this.displayChildren(event.target);

            }
            if (event.key === 'ArrowLeft'){
                this.hideChildren(event.target);
            }
            if (event.key === 'Enter'){
                this.enterLevel(event.target);
            }
            if(event.key === "ArrowDown" || event.key === "ArrowUp") {debugger
                this.dealWithLi(event.target, event.key);

            }
        })
    }





     clearInner() {
        if (this.ref.children.length){
            while (this.ref.children.length){
                this.ref.children[0].remove();
            }
        }
    }



}

export default ChatTree;