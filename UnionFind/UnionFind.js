class UnionFind {

  /*
  p->parent
  N->size
  rank->秩（根结点到叶结点的最长路径长度）
  */

  constructor(N) {
    this.p = new Array(N);
    this.rank = new Array(N);

    //初始化
    for (let i = 0; i < N; i++) {
      this.p[i] = i;            //每个元素自成一个集合
      this.rank[i] = 0;         //父结点指向自己
    }
  }

  //查找元素x所在集合的root
  find(x) {
    if (this.p[x] !== x) {
      this.p[x] = this.find(this.p[x]); //路径压缩
    }
    return this.p[x];
  }

  // 合并x所在集合和y所在集合
  union(x, y) {
    const root_X = this.find(x);
    const root_Y = this.find(y);

    if (root_X !== root_Y) {
      if (this.rank[root_X] < this.rank[root_Y]) {
        this.p[root_X] = root_Y;
      } else if (this.rank[root_X] > this.rank[root_Y]) {
        this.p[root_Y] = root_X;
      } else {
        this.p[root_Y] = root_X;  //深度相等
        this.rank[root_X]++;
      }
    }
  }
}