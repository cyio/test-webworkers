// https://www.ruanyifeng.com/blog/2018/07/web-worker.html

let worker = new Worker('worker.js')
const handleMessage = (event) => {
    console.log(event.data)
    const { method, args } = event.data
    if (method === 'process-image') {
        // 从消息中获取渲染好的图像数据
        const { imageData } = args;

        // 将图像数据绘制到 Canvas 上
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.putImageData(imageData, 0, 0);
    }
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

worker.postMessage({
  method: 'process-image',
  args: {
  }
})