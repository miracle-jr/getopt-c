var optparse = require('../index');

var parse = optparse(process.argv).addUsage('usage%prog -f <file> -d <dictionary>').addOption('-f', 'fname').addOption('-d', 'dname');

var options = parse.parseArgs();

console.log(parse.usage);

console.log(options.fname);
console.log(options.dname);
