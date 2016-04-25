/**
 * parser optarg
 *
 * @class parser
 */
function parser(optstring, argv, opts) {
  var ii;
  
  if (!(this instanceof parser))
    return new parser(optstring, argv);

  this.optind = 2;
  this.opterr = 1;
  this.options = {};
  // create Array to save arg
  this.argArray = new Array();

  this.optArgv = new Array(argv.length);

  for (ii = 0; ii < argv.length; ++ii) {
    this.optArgv[ii] = argv[ii];
  }

  this.parserOptstr(optstring, opts);

  return this;
}

parser.prototype.parserOptstr = function(optstr, opts) {
  var ii, chr, arg;

  ii = 0;
  while (ii < optstr.length) {
    chr = optstr[ii];
    arg = false;

    if (!/^\w$/.test(chr))
      throw (new Error('invalid optstring: ' + chr));

    if (ii + 1 < optstr.length && optstr[ii+1] === ':') {
      arg = true;
      ii++;
    }

    this.options[chr] = {
      has_arg: arg,
      val: chr
    };

    ii++;
  }

  if (opts !== undefined) {
    for (var j = 0; j < opts.length; ++j) {
      this.options[opts[j].name] = {
	has_arg: opts[j].has_arg,
	val: opts[j].val
      };
	
    }
  }
  
};

parser.prototype.getoptind = function() {
  return this.optind;
};


parser.prototype.getopt = function() {
  if (this.optind >= this.optArgv.length) {
    return (undefined);
  }
  var arg = this.optArgv[this.optind];

  if ('-' !== arg[0]) {
    this.argArray.push(arg);
    this.optind++;
    return this.getopt();
  }

  var chr = arg[1];

  if (!(chr in this.options)) {
    this.optind++;
    return {
      option: '?'
    };
  }
  var ar;

  this.optind++;
  if (this.options[chr].has_arg) {
    if (arg.length > 2) {
      ar = arg.slice(2);
      return {
	option: this.options[chr].val,
	arg: ar
      };
    }
    else {
      ar = this.optArgv[this.optind++];
      return {
	option: this.options[chr].val,
	arg: ar
      };
    }
  }
  else {
    return {
      option: this.options[chr].val
    };
  }
};

parser.prototype.getopt_long = function() {
  if (this.optind >= this.optArgv.length) {
    return (undefined);
  }
  var arg = this.optArgv[this.optind];

  if (arg.length >= 2 && arg[0] === '-' && arg[1] === '-') {
    var ar = arg.slice(2);
    if (ar in this.options) {
      this.optind++;
      if (this.options[ar].has_arg) {
	return {
	  option: this.options[ar].val,
	  arg: this.optArgv[this.optind++]
	};
      }
      else {
	return {
	  option: this.options[ar].val
	};
      }
    }
    else
      return this.getopt();
  }
      
  
  else
    return this.getopt();
    
};

parser.prototype.getArg = function() {
  return this.argArray;
};


module.exports = parser;
