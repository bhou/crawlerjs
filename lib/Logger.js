var winston = require('winston');

var customLevels = {
  levels: {
    debug: 0,
    info: 1,
    routine: 2,
    notice: 3,
    warn: 4,
    error: 5
  },
  colors: {
    debug: 'blue',
    info: 'green',
    routine : 'cyan',
    notice: 'magenta',
    warn: 'yellow',
    error: 'red'
  }
};

var logger = new (winston.Logger)({
  levels : customLevels.levels,
  colors : customLevels.colors,

  transports: [
    new (winston.transports.Console)({
      'level': 'routine',
      'timestamp':true,
      'colorize' : true})
  ]
});

function Logger(name) {
  this.name = name;
}

Logger.prototype.debug = function (message) {
  logger.debug(['[', this.name ,'] ' , message].join('') );
}

Logger.prototype.info = function (message) {
  logger.info(['[', this.name ,'] ' , message].join('') );
}

Logger.prototype.routine = function (message) {
  logger.routine(['[', this.name ,'] ' , message].join('') );
}

Logger.prototype.notice = function (message) {
  logger.notice(['[', this.name ,'] ' , message].join('') );
}

Logger.prototype.warn = function (message) {
  logger.warn(['[', this.name ,'] ' , message].join('') );
}

Logger.prototype.error = function (message) {
  logger.error(['[', this.name ,'] ' , message].join('') );
}

Logger.prototype.log = function (level, message) {
  logger.log(level, ['[', this.name ,'] ' , message].join('') );
}


module.exports = Logger;