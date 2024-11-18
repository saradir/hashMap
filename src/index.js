import LinkedList from "./linkedlist";
class HashMap{
    constructor(){
        this.loadFactor = 0.8;
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
            return;
        } 
        // in case of collision
        if(bucketValue instanceof LinkedList){
            bucketValue.append(key,value);
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
        

    
}
