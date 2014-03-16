Godjs
=====

Overlook processes with node.

Godjs overlooks your processes and starts/stops them based on set times every day.

The idea for Godjs came from the fantastic, more impressive, God ruby gem https://github.com/mojombo/god.
However, I needed a lighter framework to overlook other processes and kill/spawn them based on set times every day.

Install
=======

After installing node.js, create a JSON file containing your tasks:

/example/tasks.json
`[
  {
    "name"    : "example script",
    "start"   : "2300",
    "stop"    : "2330",
    "path"    : "/path/to/example_script.js",
    "args"    : [],
    "logPath" : "/path/to/example_log.log"
  }
]`

When all set, fire up Godjs: `node god.js /example/tasks.json` and the example script will run every day from 11pm to 1130pm.

Additionally
============

It is recommended that you monitor Godjs (in case it crashes/computer restarts).

This can be done with an init.d script or a cronjob like this:
`(crontab -l ; echo "* * * * * god.js <path_to_tasks.json>")| crontab -` will add god.js to your crontab and will check on once a minute.
