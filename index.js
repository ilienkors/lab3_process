let resource = 10000;

const tasks = [
  {
    needResources: 10000,
    timeToProcess: 2000,
    state: false,
  },
  {
    needResources: 5000,
    timeToProcess: 2000,
    state: false,
  },
  {
    needResources: 5000,
    timeToProcess: 2000,
    state: false,
  },
];

const resourceIsAvailable = (resource, needed) => needed <= resource;

const doTask = async (needResources, timeToProcess, processid) => {
  resource -= needResources;
  setTimeout(() => {
    resource += needResources;
    console.log('Process', processid, 'finished')
  }, timeToProcess);
}

const start = (tasks) => {
  let length = tasks.length;
  setInterval(() => {
    tasks.forEach((task, index) => {
      if (resourceIsAvailable(resource, task.timeToProcess) && !task.state) {
        tasks[index].state = true;
        console.log('Working on process', index);
        console.log('Available resource:', resource);
        console.log('Needed resources:', task.needResources, '| Needed time to process:', task.timeToProcess);
        doTask(task.needResources, task.timeToProcess, index);
        length--;
      }
      else {
        if (length != 0) {
          console.log('Waiting for resource, time:', Date.now());
        }
      }
    });
  }, 500);
}

start(tasks);
