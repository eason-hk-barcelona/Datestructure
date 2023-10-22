class SortingAlgorithms {
    // 插入排序

    // 1.0 最坏情况O(n^2) 最好情况O(n)
    insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    //2.0 折半插入 复杂度和1.0一致，只是查找插入位置优化
    binaryInsertionSort(arr) {
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let left = 0, right = i - 1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (arr[mid] > key) { //mid到i之间的值都比key大，都得往后移一位
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            //移动
            for (let j = i - 1; j >= left; j--) {
                arr[j + 1] = arr[j];
            }
            arr[left] = key;
        }

    }

    // 堆排序

    // 维护大顶堆
    maxHeapify(arr, n, i) {
        //假设父节点最大
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.maxHeapify(arr, n, largest);
        }
    }
    // 核心算法
    heapSort(arr) {
        // 建大顶堆
        const n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {//这里的i即第一个有孩子的叶子节点，或者n/2
            this.maxHeapify(arr, n, i);
        }
        //sort
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            this.maxHeapify(arr, i, 0);
        }
    }

    // 快速排序 时间复杂度O(nlogn),不稳定
    //假设arr是0--n-1
    quickSort(arr, l, r) {
        if (l >= r) return;

        let i = l - 1;
        let j = r + 1;
        const x = arr[Math.floor((l + r) / 2)]; //选取中位数为分界元素

        while (i < j) {
            do i++; while (arr[i] < x);
            do j--; while (arr[j] > x);
            if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        this.quickSort(arr, l, j);
        this.quickSort(arr, j + 1, r);
    }

    //归并排序 时间复杂度O(nlogn)——n除logn层才能变成n个1，每层时间复杂度是O(n)

    mergeSort(arr, l, r) {
        if (l >= r) return;

        let mid = (l + r) >> 1;
        let tmp = [];
        this.mergeSort(arr, l, mid);
        this.mergeSort(arr, mid + 1, r);

        let k = 0, i = l, j = mid + 1;
        while (i <= mid && j << r) {
            if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
            else tmp[k++] = arr[j++];
        }
        while (i <= mid) tmp[k++] = arr[i++];
        while (j <= r) tmp[k++] = arr[j++];

        for (i = l, j = 0; i <= r; i++, j++) arr[i] = tmp[j];
    }
}