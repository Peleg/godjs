
// This module overlooks all other tasks and spawns/kills them appropriately

var fs    = require('fs'),
    path  = require('path'),
    Task  = require('./task').Task,

    tasks = [],
    delay = 1000, // 1 sec delay btwn iterations

    // Pads single digits with leading zero
    zerofy = function (num) {
      return ("0" + num).slice(-2);
    },

    // returns time in 24hr HH:MM format
    formattedTime = function () {
      var date = new Date();
      return zerofy(date.getHours()).toString() + zerofy(date.getMinutes());
    },

    // infinite loop
    watch = function () {
      var time = formattedTime();

      tasks.forEach(function (task) {
        if (task.start <= time && task.stop > time) {
          if (!task.isProcessOn()) {
            task.startProcess();
          }
        } else {
          if (task.isProcessOn()) {
            task.killProcess();
          }
        }
      });

      // setTimeout/setImmediate
      // allow the event loop to handle other things meantime
      setTimeout(this.watch, this.delay);
    },

    Watcher = function (pathToTasks) {
      // Loads tasks, then invokes watch()
      fs.readFile(path.resolve(pathToTasks), 'utf8', function (err, data) {
        if (err) throw err;
        JSON.parse(data).forEach(function (task) {
          tasks.push(new Task(task));
        });
        watch();
        console.log("God is watching ...");
      });
    };

Watcher.prototype.killAll = function () {
  tasks.forEach(function (task) {
    if (task.isProcessOn()) {
      task.killProcess();
    }
  });
};

module.exports.Watcher = Watcher;
