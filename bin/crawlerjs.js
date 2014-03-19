var memwatch = require('memwatch');

var crawlerjs = require('../lib/main');
var config = require('../config');

var Crawler = crawlerjs.Crawler;
var Task = crawlerjs.Task;
var Logger = crawlerjs.Logger;

var logger = new Logger('crawlerjs');

/**
 * Usage:
 */
function printUsage() {
  console.log('Usage: ');
  console.log('crawlerjs [options]');
  console.log('option:');
  console.log('-t [task]:   task file');
  console.log('-s [static request]:   the max static request number');
  console.log('-d [dynamic request]:  the max dynamic request number');
  console.log('-w [dynamic wait time]: the wait time for dynamic content loading in ms');
  console.log('-e [end check interval]: the interval to check the end of crawling in ms');
  console.log('-m [mem check interval]: the interval to check memeory usage in ms');
  console.log('-p : turn on memory watch')
  console.log('');
}

var args = process.argv.slice(2);

while (args.length > 0) {
  switch (args[0]) {
    case '-t':
      if (args[1] != null && args[1].substring(0,1) != '-') {
        config.main = args[1];
        args = args.slice(2);
        break;
      }
      printUsage();
      return;
    case '-s':
      if (args[1] != null && args[1].substring(0,1) != '-') {
        config.maxRequest = parseInt(args[1]);
        args = args.slice(2);
        break;
      }
      printUsage();
      return;
    case '-d':
      if (args[1] != null && args[1].substring(0,1) != '-') {
        config.maxPhantom = parseInt(args[1]);
        args = args.slice(2);
        break;
      }
      printUsage();
      return;
    case '-w':
      if (args[1] != null && args[1].substring(0,1) != '-') {
        config.dynamicWait = parseInt(args[1]);
        args = args.slice(2);
        break;
      }
      printUsage();
      return;
    case '-e':
      if (args[1] != null && args[1].substring(0,1) != '-') {
        config.endCheckInterval = parseInt(args[1]);
        args = args.slice(2);
        break;
      }
      printUsage();
      return;
    case '-m':
      if (args[1] != null && args[1].substring(0,1) != '-') {
        config.memCheckInterval = parseInt(args[1]);
        args = args.slice(2);
        break;
      }
      printUsage();
      return;
    case '-p':
      config.memcheck = true;
      args = args.slice(1);
      break;
    default:
      printUsage();
      return;
  }
}

if (config.main == null || typeof config.main == 'undefined') {
  printUsage();
  return;
}

var tasks = require(config.main);
if (tasks == null) {
  console.error('could not load task: ' + config.main);
}

var crawler = new Crawler();
tasks(crawler);

crawler.start();

/**
 * start the memwatch
 */
if (config.memcheck == true) {
  var memUsage = 0;
  var hd = null;
//  var n = 0;
  var memCheckTimer = setInterval(function () {
    if (hd != null) {
      var diff = hd.end();

      if (diff == null) {
        return;
      }


//      fs.writeFile('./memdiff_' + n + '.log', JSON.stringify(diff, null, 2), function (err) {
//        if (err) {
//          logger.error('could no append mem diff in log');
//        }
//      });

//      n++;
      diff = null;
      hd = null;
    }

    var newMemUsage = process.memoryUsage().heapUsed;
    logger.routine(['Heap Usage: ', newMemUsage/1000000, 'M ; delta: ', memUsage == 0 ? 0 : (newMemUsage-memUsage)/1000000, ' M'].join(''));
    memUsage = newMemUsage;

    hd = new memwatch.HeapDiff();
  }, config.memCheckInterval);

  crawler.on('exit', function(){
    clearInterval(memCheckTimer);
  });
}