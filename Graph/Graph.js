//图
class Graph {
  constructor() {
    this.vertices = {}; //顶点
  }

  addVertex(vertex) {
    if (!this.vertices[vertex]) {
      this.vertices[vertex] = []; //创建空结点
    }
  }

  //有向边
  addEdges(from, to) {
    this.vertices[from].push(to);
  }

  // BFS
  bfs(startVertex) {
    const visited = {};
    const queue = [];
    const result = [];

    queue.push(startVertex);
    visited[startVertex] = true;

    while (queue.length > 0) {
      const vertex = queue.shift(); //出队
      result.push(vertex);

      this.vertices[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          queue.push(neighbor); //所有邻接点入队
          visited[neighbor] = true;
        }
      });
    }

    return result;
  }

  //DFS
  dfs(startVertex) {
    const visited = {};
    const result = [];

    const dfsRecursive = (vertex) => {
      visited[vertex] = true;
      result.push(vertex);

      this.vertices[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          stack.push(vertex);

        }
      });
    };

    dfsRecursive(startVertex);

    return result;
  }

  // 拓扑排序（利用栈+dfs）
  topologicalSort() {
    const visited = {};
    const stack = [];
    const result = [];

    const topologicalSortRecursive = (vertex) => {  //匿名函数
      visited[vertex] = true;
      // 首先找到一个没有未探索邻居的顶点，然后递归处理它的依赖项
      this.vertices[vertex].forEach((neighbor) => { //回调函数
        if (!visited[neighbor]) {
          topologicalSortRecursive(neighbor);
        }
      });

      stack.push(vertex);
    };

    for (const vertex in this.vertices) {
      if (!visited[vertex]) {
        topologicalSortRecursive(vertex);
      }
    }

    while (stack.length > 0) {
      result.push(stack.pop());
    }

    return result;
  }
}