const sortedSet = require('sorted-set');


class ModelObject{
    constructor(created, username, email, phone, token, confirmed, expires){
        this.created = created;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.token = token;
        this.confirmed = confirmed;
        this.expires = expires;
        
    }
}

class Node {
    constructor(personObject){
        this.personObject = personObject;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.count = 0;
        this.next = null;
        this.prev = null;
    }

    insertObject(object){
        let node = new Node(object);
        current = this.head,
        previous;
        if ( !this.head){
            this.head = node;
            this.tail = node;
        }else{
            node.prev = tail;
            tail.next = node;
            tail = node;
        }
        this.count++;
    }

    insert(object, index) {
        if(index >= 0 && index <= this.count) {
            const node = new Node(object);
            let current = this.head;
            //Head
            if(index === 0){
                if(this.head == null){
                    this.head = node;
                    this.tail = node;
                }else{
                    node.next = this.head
                    current.prev = node;
                    this.head = node;
                }
                // Tail
            }else if (index === this.count){
                current = this.tail
                current.next = node;
                node.prev = current;
                this.tail = node;
            }else{
                // const previous = this.getElementAt(index - 1);
                previous = current;
                // current = previous.next;
                current = current.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        
    }


    size(){
        return this.count;
    }
    toString(){
        if ( this.head == null){
            return '';
        }
        let objString = `${this.head.personObject.email}`;
        let current = this.head.next;
        for( let i = 1; i < this.size() && current!= null; i++ ){
            objString = `${objString},${current.personObject.email}`;
            current = current.next;
        }
        return objString;
    }
    searchForItem(item) {
        const SortedSet = require('sorted-set');
        const set = new SortedSet();

        let current = this.head;
        if(this.head == null) {
            console.log("Nothing in here!");
            return null;
        }
        while(current != null) {
            if (current.username.toLowerCase().includes(item) || current.phone.includes(item)){
                set.add(current.ModelObject)
            }
            current = current.next;
        }
        return set;
    }

    main() {
        const readline = require('readline');
        const r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        r1.on('line', function (line){
            itemTosearch = line;
            while(!itemTosearch.equals("q")){
                sortedSet = this.searchForItem(itemTosearch);
                if(sortedSet.size() != 0) {
                    for(i = 0; i <= sortedSet.size(); i++) {
                        // console.log(sortedSet)
                    }
                }
                else{
                    console.log("Can not find anything in here!");
                }
                console.log("\nEnter search item (or q to quit):");
            }
            r1.close();
        })
    }
}

// const sorted = DLL.searchForItem("people")
// console.log(sorted)


// const DLL = new DoublyLinkedList();
// DLL.insert(personObject0, 0);
// DLL.insert(personObject1, 1);
// DLL.insert(personObject2, 2);
// DLL.insert(personObject3, 3);
// DLL.insert(personObject4, 4);
// DLL.insert(personObject5, 5);
