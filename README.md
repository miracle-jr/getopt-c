getopt-c
============

Overview
-----

getopt-c implements the posix C getopt() function for Node.getopt() provides a function for parse option.

Install the npm package in:

	$ npm install getopt-c

Here's how to use:

       var opt_parser = require('getopt-c');
       var parser, opt;

       parser = opt_parser('ab:', process.argv);

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

	var parse = new optparse('ab:c:de:', process.argv,
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

testOutput:

	$ cmd node test.js --arg --brg btest
	optind: 2
	---------------------------------
	optind: 3, argv[]:--brg
	hava option: -a

	optind: 5, argv[]:undefined
	hava option: -b
	The argument of -b is btest

	---------------------------------
	optind: 5, argv[]:undefined


API
---

### `parser.getoptind()`

Returns the next argv-argument index.

### `parser.getopt()`

Returns the next argument.