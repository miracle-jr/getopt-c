var optparse = require('..');

var parse = new optparse(process.argv, 'ab:c:de:');

console.log("optind: " + parse.getoptind());
console.log("---------------------------------");
var opt;
while ((opt = parse.getopt()) !== undefined) {
  console.log("optind: " + parse.getoptind() + ", argv[]:" + process.argv[parse.getoptind()]);
  switch (opt.option) {
  case 'a':
    console.log("hava option: -a");
    break;
  case 'b':
    console.log("hava option: -b");
    console.log("The argument of -b is " + opt.arg);
    break;
  case 'c':
    console.log("hava option: -c");
    console.log("The argument of -c is " + opt.arg);
    break;
  case 'd':
    console.log("hava option: -d");
    break;
  case 'e':
    console.log("hava option: -e");
    console.log("The argument of -e is " + opt.arg);
    break;
  case '?':
    console.log("unknown option: " + opt.option);
    break;
  }
  console.log("");
}
console.log("---------------------------------");
console.log("optind: " + parse.getoptind() + ", argv[]:" + process.argv[parse.getoptind()]);
  

