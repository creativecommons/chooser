# Testing

This file will be used to document some useful commands and tips for tests. Also, some common errors found that may prevent you from running them.

## Unit Testing

### Useful Commands and Tips
If you want to run only unit tests, use:

``` bash
$ npm run test:unit
```

If you want to run only e2e tests, use:
``` bash
$ npm run test:e2e
```

### About Snapshots Test
When updating some components, snapshots test may fail if the UI's changed. To prevent that from happening, press u while in watch mode to update your snapshots.

### Common Errors
When running your unit tests for the first time, you may encounter this error:

``` bash
$ ENOSPC: System limit for number of file watchers reached
```

This means that your system's preventing you from running the command, since the numbers of files it can watch has been exceeded. To fix it you'll have to manually expand it's file limits. On Ubuntu distributions, it looks like this:

``` bash
$ sudo vim /etc/sysctl.conf
```

Then add the following line:

``` bash
$ fs.inotify.max_user_watches=524288
```

After running it you should be good to go!



1903 18362.535
node 13.3.0
npm 6.4.1

