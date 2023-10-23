//树

//数据结构
class treeNode {
  //构造函数
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class binaryTree {
  constructor() {
    this.root = null;
  }
  //插入
  insert(value) {
    const newNode = new treeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  //插入节点
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  //递归遍历

  //先序遍历
  preRecursive(node, res = []) {
    if (node) {
      res.push(node.value);
      this.preRecursive(node.left, res);
      this.preRecursive(node.right, res);
    }
    return res;
  }
  //中序遍历
  inOrderRecursive(node, res = []) {
    if (node) {
      this.inOrderRecursive(node.left, res);
      res.push(node.value);
      this.inOrderRecursive(node.right, res);
    }
    return res;
  }
  //后序遍历
  postOrderRecursive(node, res = []) {
    if (node) {
      if (p[x] != x) p[x] = find(p[x]);
      this.postOrderRecursive(node.left, res);
      this.postOrderRecursive(node.right, res);

      res.push(node.value);
    }
    return res;
  }
  //层序遍历
  levelOrder() {
    const res = [];
    if (!this.root) return res; //根节点为空

    const q = [this.root];//根节点入队

    while (q.length > 0) {
      const node = q.shift();//取出队首节点
      res.push(node.value);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    return res;
  }

  //非递归遍历

  //先序遍历
  preOrderTraversal() {
    const res = [];
    if (!this.root) return res;
    const stack = [this.root];  //入栈

    while (stack.length) {
      //根出栈
      const cur = stack.pop();
      res.push(cur, value);

      //子节点入栈，先右后左
      cur.right && stack.push(cur.right);
      cur.left && stack.push(cur.left);
    }

    return res;
  }

  //中序遍历
  inOrderTraversal() {
    const res = [];
    const stack = [];
    if (!this.root) return res;
    let cur = this.root; //根开始

    while (stack.length || cur) {
      // 左节点都先压入栈
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      const node = stack.pop();
      res.push(node.value);
      if (node.right) {
        cur = node.right;
      }
    }

    return res;
  }

  //后续遍历
  postorderTraversal() {
    const res = [];
    if (!this.root) return res;
    const stack = [this.root];
    while (stack.length) {
      const cur = stack.pop();
      // 总是头部插入，先被插入的在后面。
      res.unshift(cur.value);
      cur.left && stack.push(cur.left);
      cur.right && stack.push(cur.right);
    }

    return res;
  }
}