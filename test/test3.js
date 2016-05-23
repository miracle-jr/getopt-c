var optparse = require('../index');

var parse = optparse(process.argv).addUsage('usage%prog -f <file> -d <dictionary>').addOption('-f', 'fname', true, 'file name.').addOption('-d', 'dname', true, 'dir name.').addUsage('test');

var options = parse.parseArgs();

//console.log(parse.usage);

console.log(options.fname);
console.log(options.dname);
