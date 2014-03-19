var Crawler = require('../lib/Crawler');
var Task = require('../lib/Task');


var crawler = new Crawler();

var task = new Task(crawler,
  {
    'url': 'http://google.com',
    'method': 'get',
    'dynamicpage': false,
    'context': {},
    'callback': function(task, url, err, data) {
      console.log('processing: ' + task.url);
      task.done();
    }
  });

crawler.push(task);

crawler.start();