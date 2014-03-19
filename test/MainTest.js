var Task = require('../lib/Task');

function callback(task, url, err, data) {
  console.info('processing url: ' + url);

  task.done();
}

function init(crawler) {
  crawler.push(new Task(crawler,  {
    url: 'http://www.google.com',
    context: {},
    callback: callback
  }));
}



module.exports = init;