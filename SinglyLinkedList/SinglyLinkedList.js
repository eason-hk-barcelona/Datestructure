class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 打印链表结点内容
  toString() {
    let cur = this.head;
    let temString = '';
    while (cur) {
      temString += cur.data + '';
      cur = cur.next;
    }
    return temString;
  }

  // 增
  insert(data, pos) {
    // 边界判断
    if (pos < 0 || pos > this.length) throw Error('请传入正确的pos');

    const node = new Node(data);

    if (pos === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let cur = this.head;
      for (let i = 0; i < pos - 1; i++) cur = cur.next;   //cur指向要插入位置的前一个元素
      node.next = cur.next;
      cur.next = node;
    }
    this.length++;
  }

  // 获取pos位置结点数据
  get(pos) {
    if (pos < 0 || pos > this.length - 1) throw Error('请传入正确的pos');
    let index = 0;
    let cur = this.head;
    while (index++ < pos) cur = cur.next;
    return cur.data;
  }

  // 查询传入的 data 在链表中的位置，如果链表中不包含 data，则返回 -1
  findPos(data) {
    let cur = this.head;
    let index = 0;
    while (cur) {
      if (cur.data === data) return index;
      cur = cur.next;
      index++;
    }
    return -1;
  }

  // 改
  update(newData, pos) {
    if (pos < 0 || pos > this.length - 1) throw Error('请传入正确的pos');
    let cur = this.head;
    for (let i = 0; i < pos; i++) {
      cur = cur.next;
    }
    // cur即为当前pos
    cur.data = newData;
  }

  // 删除pos位置结点
  remove_pos(pos) {
    if (pos < 0 || pos > this.length - 1) throw Error('请传入正确的pos');
    let cur = this.head;
    if (pos === 0) {
      this.head = this.head.next;
    } else {
      let pre = null; //被删除结点的前一个结点
      let index = 0;
      while (index++ < pos) {
        pre = cur;
        cur = cur.next;
      }
      //删
      pre.next = cur.next;
    }
    this.length--;
    return cur.data;
  }

  //删除值为data所在结点
  remove_data(data) {
    const pos = this.findPos(data);
    this.remove_pos(pos);
  }
}
