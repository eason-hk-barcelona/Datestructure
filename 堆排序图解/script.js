// 使用DOMContentLoaded事件确保文档加载完毕后运行代码
document.addEventListener('DOMContentLoaded', function () {
  let array = [];
  let sortedArray = [];
  let animationSteps = [];
  let animationIndex = 0;

  const inputArray = document.getElementById('inputArray');
  const initializeButton = document.getElementById('initialize');
  const nextStepButton = document.getElementById('nextStep');
  const prevStepButton = document.getElementById('prevStep');
  const finishButton = document.getElementById('finish');

  initializeButton.addEventListener('click', () => {
    const inputText = inputArray.value.trim(); // 获取输入框的文本并去除首尾空格
    if (inputText === '') {
      window.alert('Please enter a valid array');
    } else {
      array = inputArray.value.split(',').map(Number);
      sortedArray = inputArray.value.split(',').map(Number);
      animationSteps = heapSort(array);
      for (let i = 0; i < array.length; i++)array[i] = sortedArray[i];
      //调试
      console.log(animationSteps);
      animationIndex = 0;
      initializeButton.disabled = true;
      nextStepButton.disabled = false;
      prevStepButton.disabled = false;
      finishButton.disabled = false;
      render();
    }
  });

  nextStepButton.addEventListener('click', () => {
    if (animationIndex < animationSteps.length) {
      animationSteps[animationIndex++]();
      render();
    }
  });

  prevStepButton.addEventListener('click', () => {
    if (animationIndex > 0) {
      animationSteps[--animationIndex]();
      render();
    }
  });

  finishButton.addEventListener('click', () => {
    while (animationIndex < animationSteps.length) {
      animationSteps[animationIndex++]();
    }
    render();
  });

  function render() {
    const heapContainer = document.getElementById('container');
    heapContainer.innerHTML = '';

    const totalLevels = Math.floor(Math.log2(array.length)) + 1;  //totalLevels

    for (let i = 0; i < totalLevels; i++) {
      const levelContainer = document.createElement('div');
      levelContainer.className = 'level-container';

      // 每层最多2^i个结点
      for (let j = 0; j < Math.pow(2, i) && Math.pow(2, i) - 1 + j < array.length; j++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.textContent = array[Math.pow(2, i) - 1 + j];
        levelContainer.appendChild(node);
      }

      heapContainer.appendChild(levelContainer);
    }
  }

  function heapify(arr, n, i) {
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
      animationSteps.push(() => {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
      });
      console.log(arr);
      heapify(arr, n, largest);
    }
  }

  function heapSort(arr) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      animationSteps.push(() => {
        [arr[0], arr[i]] = [arr[i], arr[0]];
      });
      console.log(arr);
      heapify(arr, i, 0);
    }

    return animationSteps;
  }
});