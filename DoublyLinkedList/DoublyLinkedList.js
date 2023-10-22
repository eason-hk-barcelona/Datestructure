class DoublyNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 插入
  insert(data, pos = this.length) {
    if (pos < 0 || pos > this.length) throw Error('输入的 position 无效');
    const node = new DoublyNode(data);

    // 添加位置在表头
    if (pos === 0) {
      // 链表为空
      if (this.length === 0) {
        this.head = node;
        this.tail = node;
      } else {
        // 链表有结点
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      }
    } else if (pos === this.length) {
      // 添加位置在链表尾部
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      // 添加位置在链表中间
      let cur = this.head;
      for (let i = 0; i < pos; i++) {
        cur = cur.next;
      }
      cur.prev.next = node;
      node.prev = cur.prev;
      node.next = cur;
      cur.prev = node;
    }
    this.length++;
  }

  // 删除pos位置的内容
  remove_pos(pos) {
    if (pos < 0 || pos > this.length - 1) throw Error('输入的 position 无效');
    let cur = this.head;
    // 删除头结点
    if (pos === 0) {
      if (this.length === 1) {
        // 链表原本只有 1 个结点
        this.head = null;
        this.tail = null;
      } else {
        // 链表原本不止 1 个结点
        this.head = this.head.next;
        this.head.prev = null;
      }
    } else if (pos === this.length - 1) {
      // 删除尾结点
      cur = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      // 删除中间结点
      for (let i = 0; i < pos; i++) {
        cur = cur.next;
      }
      cur.next.prev = cur.prev;
      cur.prev.next = cur.next;
    }
    this.length--;
    return cur;
  }

  // 查找pos位置的内容
  get(pos) {
    if (pos < 0 || pos > this.length - 1) throw Error('输入的 position 无效');
    let cur = null;
    if (pos <= this.length / 2) {
      cur = this.head;
      for (let i = 0; i < pos; i++) cur = cur.next;
    } else {
      cur = this.tail;
      for (let i = this.length - 1; i > pos; i--) cur = cur.prev;
    }
    return cur.data;
  }
  // 修改结点
  update(pos, newData) {
    if (pos < 0 || pos > this.length - 1) throw Error('输入的 position 无效');
    let cur = null;
    let i = null;
    if (pos <= this.length / 2) {
      cur = this.head;
      i = 0;
      while (i++ < pos) cur = cur.next;
    } else {
      cur = this.tail;
      i = this.length - 1;
      while (i-- > pos) {
        cur = cur.prev;
      }
    }
    cur.data = newData;
    return true;
  }
}