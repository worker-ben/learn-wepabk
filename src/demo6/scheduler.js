class Scheduler {
  constructor(parallel) {
    // 并行的个数
    this.parallel = parallel;
    // 任务列表
    this.task = [];
    // 当前任务列表
    this.currentTask = [];
    console.log('Create Scheduler instance')
  }

  // 添加任务
  addTask(time, str) {
    // 不能直接返回 new Promise ，这样就直接执行了，而是返回一个包裹住 promise 的函数，调用才执行
    // 放进任务列表里面
    // 2. 改造一下，执行完毕后清除自己
    const tempFunc = () => {
      const promise = new Promise((resolve) => {
        console.log('开始执行任务',str);
        setTimeout(() => {
          console.log(str);
          resolve(str);
        }, time * 1000)
      });
      // promise.then(() => {
      //   // 删除在 task 里面的
      //   const index = this.task.indexOf(tempFunc);
      //   if (index >= 0) {
      //     this.task.splice(index, 1);
      //   }
      // })
      return promise;
    }
    this.task.push(tempFunc);
    // 需要链式执行可以返回 this
    return this;
  }

  // 开始任务
  async start() {
    console.log('start', this.task.length);
    // 如果任务列表里面的个数，小于最大并行个数，直接全都执行就完了
    // if (this.task.length <= this.parallel) {
    //   // 1. 发现这样没法清空 task 数组（在取出来的时候 shift 也行,也算清空了）
    //   return await Promise.all(this.task.map(task => task()));
    // }

    // 如果剩余的任务大于并行的任务数，就一个个取出来
    // 有任务当然不结束咯
    while (this.task.length > 0) {

      // 如果剩余的任务大于并行的任务数，就一个个取出来
      while (this.currentTask.length < this.parallel && this.task.length >= 1) {
        // console.log('放入1个');
        // 从队头取出放到当前的任务队列
        // 放入函数不行，因为可能重复调用函数，导致重复输出
        // shift 之后，相当于 length -- 了
        // 能加入当前队列的时候，才拿真正的 promise，此刻就相当于开始执行任务了
        const promise = this.task.shift()();
        this.currentTask.push(promise);
        // 如果完成后，要清掉自己
        promise.then((data) => {
          const index = this.currentTask.indexOf(promise);
          if (index >= 0) {
            console.log('完成任务，清掉自己',data);
            this.currentTask.splice(index, 1);
          }
        })
      }

      // 这里，this.currentTask 就满了
      // 等待最快的执行完成，就会空出一个，接着下一次循环继续加入即可
      await Promise.race(this.currentTask);

      // 清掉 currentTask 里面完成的 promise 才行
      // 如何清除呢？
    }

    // 这里跳出来之后，有可能 task 已经没有任务了，但是 currentTask 还有
    await Promise.all(this.currentTask);

    console.log('执行完毕', this.task.length, this.currentTask.length);
  }

}

module.exports = {
  Scheduler
}