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
    }

    // self.postMessage('You said: ' + e.data);
  }, false);