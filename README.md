getopt-c
============

Overview

[![NPM version](https://im.shields.io/npm/v/getopt-c.svg)](https://www.npmjs.com/package/getopt-c)

getopt-c implements the posix C getopt() function for Node.getopt() provides a function for parse option.

Install the npm package in:

	$ npm install getopt-c


Add a simple method to use, use parseArgs() method to quite use option:

	var optparse = require('getopt-c');

	var parse = optparse().addUsage('test').addOption('-f', 'fname').addOption('-d', 'dname');

	var options = parse.parseArgs();

	
	console.log(options.fname);
	console.log(options.dname);
	
	----------------------------------------
	$ cmd node test3.js -f evil -d /home
	usage%prog -f <file> -d <dictionary>
	evil
	/home
	
	$ cmd node test3.js --help
	usage: node [programe name] [OPTIONS]
	
	test
	
	options:
	  --help HELP Show this message and exit.
	   -f FNAME   file name.
	   -d DNAME   dir name.
	
	
Here's how to use:

       var opt_parser = require('getopt-c');
       var parser, opt;

       parser = opt_parser(process.argv, 'ab:');

       while ((opt = parser.getopt()) !== undefined) {
       	     switch(opt.option) {
	     case 'a':
	     	  console.log('option a is set);
		  break;
	     case 'b':
	     	  console.log('option b has arg: ' + opt.arg)'
		  break;
	     case '?':
	     	  console.log('unknow option');
		  break;
	     }
       }

Examples:

	$ cmd -a -btest
	option a is set
	option b has arg: test

	$ cmd -b ouput
	option b has arg: ouput

Test:

	var optparse = require('../index');

	var parse = new optparse(process.argv, 'ab:c:de:',
	    		 		     [
						{
							name: 'arg',
			     				has_arg: false,
			     				val: 'a'
			   			},
			   			{
							name: 'brg',
			     				has_arg: true,
			     				val: 'b'
			   			}
			 		     ]);

	console.log("optind: " + parse.getoptind());
	console.log("---------------------------------");
	var opt;
	while ((opt = parse.getopt_long()) !== undefined) {
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
	console.log(parse.getArg());

testOutput:

	$ cmd node test2.js --arg --brg btest argument 
	optind: 2
	---------------------------------
	optind: 3, argv[]:--brg
	hava option: -a

	optind: 5, argv[]:undefined
	hava option: -b
	The argument of -b is btest

	---------------------------------
	optind: 5, argv[]:undefined
	[ 'argument' ]
	
	
New:
	
	can use new parser(argv, [{name: '', has_arg: false, val: 'a'}]) instead of new parser(argv, "a")


API
---

### `parser.getoptind()`

Returns the next argv-argument index.

### `parser.getopt()`

Returns the next argument.

### `parser.getopt_long()`

Add long opt support

### `parser.getArg()`

Return not opt argument

### `parser.addOption(opt, dist, hasArg, help)`

Add option

### `parser.parseArgs()`

parser option and return result
