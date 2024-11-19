import LinkedList from "./linkedlist.mjs";
class HashMap{

    #size = 0;
    constructor(){
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.bucket = [];
       
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
      } 

    set(key, value){
        const hashCode = this.hash(key);
        const bucketValue = this.bucket[hashCode];

        // index is empty
        if(!bucketValue){
            this.bucket[hashCode] = {key: key, value: value};
            this.increment();
            return;
        } 
        // in case of collision
        if(bucketValue instanceof LinkedList){
            const isNew = !(bucketValue.contains(key));
            bucketValue.append(key,value);
            if(isNew) this.increment();
            return;
        }

        if(bucketValue.key === key){           
            bucketValue.value = value;
            return;
        } else{
            const list = new LinkedList();
            list.append(bucketValue.key, bucketValue.value);
            list.append(key, value);
            this.bucket[hashCode] = list;
            this.increment();
        }
}
            
    
    get(key){
        const hashCode = this.hash(key);
        const node =  this.bucket[hashCode];

        if(!node) return null;
        if(!(node instanceof LinkedList)) return node.value;
        const value = node.find(key);
        return value? value.value: null;
        }
        
    has(key){
        const hashCode = this.hash(key);
        const node = this.bucket[hashCode];

        if(!node) return false;
        if(!(node instanceof LinkedList)) return (node.key === key);
        // if node is a list
        return node.contains(key);
    }

    remove(key){
        const hashCode = this.hash(key);
        const node = this.bucket[hashCode];

        if(!node) return false;

        if(node.key === key){
            this.bucket[hashCode] = undefined;
            this.#size -= 1;
            return true;
        }
        if(node instanceof LinkedList){
            const removed = node.remove(key);
            if(removed) this.#size -= 1;
            if (!node.head) {
                // If the LinkedList becomes empty, clean up the bucket
                this.bucket[hashCode] = undefined;
            }
            return removed;
        }
        return false;


    }

    length(){
        return this.#size;
    }

    clear(){
        this.bucket = [];
        this.capacity = 16;
        this.#size = 0;
    }

    keys(){
        const keys = [];
        for(let node of this.bucket){
            if(!node) continue;
            if('key' in node ){
                keys.push(node.key);
                continue;
            }
            if(node instanceof LinkedList){
                keys.push(...node.keys());
            }           
        }

        return keys;
    }

    values(){
        const values = [];
        for(let node of this.bucket){
            if(!node) continue;
            if('value' in node){
                values.push(node.value);
                continue;
            }
            if(node instanceof LinkedList){
                values.push(...node.values());
            }           
        }

        return values;
    }

    entries(){
        const entries = [];
        for(let node of this.bucket){
            if(!node) continue;
            if(node instanceof LinkedList){
                entries.push(...node.entries());
            }else{
                entries.push([node.key, node.value]);
            }
        }
        return entries;
    }

    isOverloaded(){
        return (this.#size / this.capacity) > this.loadFactor;
    }

    increment(){
        this.#size += 1;
        if (this.isOverloaded()){ this.resize()};
    }

    resize(){
        const entries = this.entries();
        this.clear();
        this.capacity = this.capacity * 2;
        for(let [key, value] of entries){
            this.set(key, value);
        }
    }
}

/* some test code
const test = new HashMap()


test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.capacity, test.length());
test.set('lion', 'pink');
console.log(test.capacity, test.length());
test.set('moon', 'silver');
console.log(test.capacity, test.length());

test.set('moon', 'pink');
console.log(...test.entries());
console.log(test.get('frog')); */
