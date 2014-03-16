#!/usr/local/bin/node

var exec     = require('child_process').exec,
    Watcher  = require('./lib/watcher').Watcher,

    pathToTasks = process.argv[process.argv.length - 1],
    cmd = "ps aux | grep " + __filename + " | grep -v grep",
    watcher;

// Gracefully shut down if there is already an instance of Godjs running
exec(cmd, function (err, stdout, stderr) {
  if (stdout) {
    console.log('Looks like Godjs is already running. Exitting.');
    process.exit(0);
  } else {
    setUpExitHandler();
    watcher = new Watcher(pathToTasks);
  }
});

// Set up an exit handler that will kill
// all running child processes before exitting
function setUpExitHandler () {
  var exitHandler = function (options, err) {
    console.log("God is exitting and is taking all other tasks with him.");
    watcher.killAll();
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
  };

  // Added so the process will not shut down instantly
  // this allows to go through exit handler first
  process.stdin.resume();
  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit:true}));
  process.on('exit', exitHandler.bind(null, {}));
  process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
}
