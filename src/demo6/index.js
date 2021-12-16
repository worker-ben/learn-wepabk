const { Scheduler } = require('./scheduler.js');

const scheduler = new Scheduler(2);

scheduler
  .addTask(1, '1')
  .addTask(10, '2')
  .addTask(1, '3')
  .addTask(1, '4')

scheduler.start();