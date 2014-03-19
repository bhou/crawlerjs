var config = {
	'home' : 'C:/_Personal/GitHub/SKUcrawler',   // where to find the scrawler program
  'maxRequest' : 10,    // max request number
  'maxPhantom'  : 5,    // max phantom instance
  'dynamicWait' : 2000,   // milliseconds, how long will the crawler wait for dynamic page loading
  'endCheckInterval' : 10000,   // milliseconds, how often will the crawler check if there is still task alive
  'memCheckInterval' : 10000    // milliseconds, how often will the crawler check heap size, -1 to disable it
}

module.exports = config;