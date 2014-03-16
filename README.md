Godjs
=====

Overlook processes with node

// Godjs overlooks your processes and starts/stops them appropriately.
// to start Godjs, simply type godjs <path to your tasks.json file>
// and Godjs will begin overlooking your processes.

// It is recommended that you add a cronjob
// that will start Godjs when it's not working.
// something like `(crontab -l ; echo "* * * * * god.js <path_to_tasks.json>")| crontab -` will add god.js to your crontab and will make sure it is running every minute
