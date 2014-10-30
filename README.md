Godjs
=====

Godjs overlooks your node processes and starts/stops them on set times every day.

The idea came from the more impressive rubygem, [God] (https://github.com/mojombo/god).
But since I didn't need much of its functionality and also wanted to learn node.js in the process, I decided to build my own, leaner version of God.

[![Code Climate](https://codeclimate.com/github/PelegR/godjs/badges/gpa.svg)](https://codeclimate.com/github/PelegR/godjs)

Install
=======

After installing node.js, create a JSON file containing your tasks:

```json
> /example/tasks.json
[
  {
    "name"    : "fuck w moses",
    "start"   : "2300",
    "stop"    : "2330",
    "path"    : "/path/to/example_script.js",
    "args"    : [],
    "logPath" : "/path/to/example_log.log"
  }
]
```

When all set, fire up Godjs: `$ node god.js /example/tasks.json` and `example_script.js` will run every day from 11pm to 1130pm.

Additionally
============

It is recommended that you monitor your God (in case it crashes/computer restarts).

This can be done with an init.d script or a cron job like this:
`(crontab -l ; echo "* * * * * god.js <path_to_tasks.json>")| crontab -` which will religiously check on your God every minute to make sure he's alive.
