
// God Task

var fork  = require('child_process').fork,
    fs    = require('fs'),
    path  = require('path'),

    Task = function (task) {
      for (var prop in task) {
        this[prop] = task[prop];
      }
    };

Task.prototype = {

  constructor: Task,

  startProcess: function () {
    this.log('God is starting: ' + this.name);
    // start process
    this.process = fork(path.resolve(this.path), this.args, {
      silent: true,
      stdio : 'stream'
    });
    // stream output to log file
    this.process.stdout.on('data', this.log.bind(this));
    this.process.stderr.on('data', this.log.bind(this));
  },

  killProcess: function () {
    this.log('God is killing: ' + this.name);
    this.process.kill();
  },

  isProcessOn: function () {
    return !!(this.process && !this.process.killed && !this.process.exitCode && this.process.connected);
  },

  // Logs to the process's log file
  log: function (data) {
    this.logStream = this.logStream || fs.createWriteStream(path.resolve(this.logPath), { flags: 'a' });
    console.log(data.toString());
    this.logStream.write((new Date()).toString() + ": " + data + "\n\n");
  }
};

module.exports.Task = Task;
