const sortedSet = require("sorted-set");

class ModelObject{ constructor(created, username, phone, token, confirmed, expires, email)
{
    this.created = created;
    this.username = username;
    this.phone = phone;
    this.token = token;
    this.expires = expires;
    this.confirmed = confirmed;
    this.email = email;

 }
}

class Node {
  constructor(personObject) {
    this.personObject = personObject;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.count = 0;
    this.next = null;
    this.prev = null;
  }

  insertObject(object) {
    let node = new Node(object);
    //let (current = this.head), previous;
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.count++;
  }

  searchForItem(item) {
    const SortedSet = require("sorted-set");
    var set = new SortedSet();

    let current = this.head;
    if (this.head == null) {
      console.log("Nothing in here!");
      return null;
    }
    while (current != null) {
      if (
        current.username.toLowerCase().includes(item) ||
        current.phone.includes(item) || current.email.includes(item)
      ) {
        set.add(current.ModelObject);
      }
      current = current.next;
    }
    return set;
  }

  
}



module.exports = {
  DoublyLinkedList,
  ModelObject,
  Node,
};
