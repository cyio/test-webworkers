// https://www.ruanyifeng.com/blog/2018/07/web-worker.html

let worker = new Worker('worker.js')
const handleMessage = (event) => {
    console.log(event.data)
}

worker.addEventListener('message', handleMessage);

// worker.postMessage('Hello World');

const arr = Array(10000000).fill(0);

const arr1 = new Int32Array(10000000).fill(0);

// 使用主线程计算
function main() {
  console.time("main thread");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
  }
  console.timeEnd("main thread");
}

main();

worker.postMessage({
    method: 'compute',
    args: {
        arr: arr1
    }
})
