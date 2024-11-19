class Node{
    constructor(key, value= null){
        this.key = key;
        this.value = value;
        this.next = null;

    }
}

 export default class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    #size = 0;

    append(key, value){

        // check if key already exists in list
        const nodeExists = this.find(key);
        if(nodeExists){
            nodeExists.value = value;
            return;
        }
        const newNode = new Node(key, value);

        //if list hasn't been initiated with an head
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        this.tail.next = newNode;
        this.tail = newNode;
        this.#size += 1;
    }

    size(){
        return this.#size;
    }

    head(){
        return this.head;
    }

    tail(){
        return this.tail;
    }

    at(index){
        let currNode = this.head;
        for(let i = 0; i < index ; i++){
            if(currNode.next){
                currNode = currNode.next;
            } else{
                console.log("eror: index is too big");
            }
        }
        return currNode;
    }

    pop(){
        if(this.#size === 1){
            console.log("a list needs its head!")
        }
        const penultimateNode = this.at(this.#size - 2);
        penultimateNode.next = null;
        this.#size -= 1;
    }

    contains(key){
        let currNode = this.head;

        while(currNode){
            if(currNode.key === key){
                return true;
            }else{
                currNode = currNode.next;
            };
        }   
        return false;
    }
    
    find(key){
        let currNode = this.head;
        while(currNode){
            if(currNode.key === key){
                return currNode;
            }else{
                currNode = currNode.next;
            };
        }
        return null;  
    }
    
    toString(){
        let currNode = this.head;
        let listString = "";
        while(currNode){
            const valueString = String(currNode.value);
            listString = `${listString} -> ${valueString}`
            currNode = currNode.next;
        }
        return `${listString} -> null`;
    }

    remove(key){
        //list is empty
        if(!this.head) return false;

        //key found in head
        if(this.head.key === key){
            this.head = this.head.next;
            return true;
        }

        let currNode = this.head;
        let prevNode = null;

        while(currNode){
            if(currNode.key === key){
                prevNode.next = currNode.next;
                return true;
            }
            prevNode = currNode;
            currNode = currNode.next;
        }
        return false; 
    }

    keys(){
        let currNode = this.head;
        const keys = [];

        while(currNode){
            keys.push(currNode.key);
            currNode = currNode.next;
        }

        return keys;
    }

    values(){
        let currNode = this.head;
        const values = [];

        while(currNode){
            values.push(currNode.value);
            currNode = currNode.next
        }

        return values;
    }
    
    entries(){
        let currNode = this.head;
        const entries = [];

        while(currNode){
            entries.push([currNode.key, currNode.value]);
            currNode = currNode.next
        }

        return entries;

    }
}
