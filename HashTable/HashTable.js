//哈希表

class HashTable {

  constructor() {
    this.storage = [];
    this.size = 13; //容量
    this.count = 0; //当前表中存储数据个数
  }
  //哈希函数 (哈希化)——霍纳法则（哈希化计算时间复杂度优化）
  hashFn(str, size) {
    let hashCode = 0;
    for (let i = 0; i < str.length; i++) {
      hashCode = hashCode * 37 + str.charCodeAt(i);
    }
    return hashCode % size;
  }

  //增删改查

  //增与改(链地址法解决冲突)
  update(key, value) {
    //获取下标
    const index = this.hashFn(key, this.size);
    //判断该位置是否有数组
    let bucketArray = this.storage[index];
    if (!bucketArray) {
      this.storage[index] = bucketArray = [];
    }
    //有
    let found = false;
    for (let i = 0; i < bucketArray.length; i++) {
      if (key === bucketArray[i][0]) {
        bucketArray[i][1] = value;
        found = true;
        break;
      }
    }
    //没有
    if (!found) {
      bucketArray.push([key, value]);
      this.count++;
      // 检查是否需要扩容
      if (this.count > this.size * 0.75) {
        this.resize(this.getPrime(this.size * 2));
      }
    }
  }
  //查
  find(key) {
    // 获取下标
    const index = this.hashFn(key, this.size);
    // 判断该位置是否存在bucketArray
    let bucketArray = this.storage[index];
    if (bucketArray) {
      // 原本存在数组
      for (let i = 0; i < bucketArray.length; i++) {
        if (key === bucketArray[i][0]) {
          return bucketArray[i][1];
        }
      }
    }

    throw new Error("Key not found");

  }
  //删
  remove(key) {
    const index = this.hashFn(key, this.size);
    let bucketArray = this.storage[index];

    if (bucketArray) {
      for (let i = 0; i < bucketArray.length; i++) {
        if (key === bucketArray[i][0]) {
          this.count--;
          const removedItem = bucketArray.splice(i, 1)[0];
          // 检查是否需要缩容
          if (this.size > 13 && this.count < this.size * 0.25) {
            this.resize(this.getPrime(Math.floor(this.size / 2)));
          }

          return removedItem;
        }
      }
    }

    throw new Error("Key not found");
  }
  // 扩容 & 缩容
  resize(newSize) {
    //先将原本的 storage 的值保存起来
    const oldStorage = this.storage;
    // 然后进行改变容量的操作
    this.storage = [];
    this.size = newSize;
    this.count = 0;
    // 将所有存储的数据重新放入新的 storage
    oldStorage.forEach((bucketArray) => {
      if (bucketArray) {
        bucketArray.forEach((item) => this.update(item[0], item[1]));
      }
    });
  }
  //获取质数
  getPrime(num) {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }

  // 判断质数
  isPrime(num) {
    // 获取 num 的平方根
    const squareRoot = Math.sqrt(num);
    for (let i = 2; i <= squareRoot; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}





