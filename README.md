getopt-c
============

Overview
-----

getopt-c implements the C getopt() function for Node.getopt() provides a function for parse option.

Install the npm package in:

	$ npm install getopt()

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

API
---

### `parser.getoptind()`

Returns the next argv-argument index.

### `parser.getopt()`

Returns the next argument.