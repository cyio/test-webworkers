self.addEventListener('message', function ({data}) {
    const {
        method,
        args
    } = data
    // debugger
    const arr = Array(1000001).fill(0); // 2ms 快 10 倍

    if (method === 'compute') {
        // const arr = args.arr
        // const arr = new Int32Array(args.arr); // 差距不大

        function main() {
            console.time("worker thread");
            for (let i = 0; i < arr.length; i++) {
                arr[i] = i;
            }
            console.timeEnd("worker thread");
        }
    
        main();
    } else if (method === 'process-image') {   
        const imageData = getImageDataByOffscreenCanvas()
        // 将图像数据发送回主线程
        self.postMessage({
            method: 'process-image',
            args: {
                imageData
            }
        });
    }

    // self.postMessage('You said: ' + e.data);
  }, false);


function getImageData() {
// 创建一个新的 Uint8ClampedArray 对象
    const imageData = new Uint8ClampedArray(400 * 400 * 4);

    // 进行图像处理操作，例如将整个图像设置为红色
    for (let i = 0; i < imageData.length; i += 4) {
        imageData[i] = 255;   // 红色通道
        imageData[i + 1] = 0; // 绿色通道
        imageData[i + 2] = 0; // 蓝色通道
        imageData[i + 3] = 255; // 透明度通道
    }

    // 创建一个新的 ImageData 对象
    return new ImageData(imageData, 400, 400);
}

function getImageDataByOffscreenCanvas() {
    // 创建一个新的 Canvas 对象
    const canvas = new OffscreenCanvas(400, 400);
    const ctx = canvas.getContext('2d');

    // 在 Canvas 上进行绘制
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 400, 400);

    // 获取绘制好的图像数据
    return ctx.getImageData(0, 0, 400, 400);
}