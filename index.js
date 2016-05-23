/**
 * parser optarg
 *
 * @class parser
 */
function parser(argv, optstring,  opts) {
  var ii;
  
  if (!(this instanceof parser))
    return new parser(argv, optstring, opts);

  if (!opts && Array.isArray(optstring)) {
    opts = optstring;
    optstring = undefined;
  }

  argv = argv || process.argv;
  optstring = optstring || "";
  opts = opts || [];

  if (typeof optstring !== 'string') {
    throw new Error('a optstring is a string');
  }
  if (!Array.isArray(opts)) {
    throw new Error('opts should be a object');
  }
  if (!Array.isArray(argv)) {
    throw new Error('argv should be a array');
  }
  
  this.optind = 2;
  this.opterr = 1;
  this.options = {};
  this.usage = "";
  // create Array to save arg
  this.argArray = new Array();

  this.optArgv = new Array(argv.length);

  for (ii = 0; ii < argv.length; ++ii) {
    this.optArgv[ii] = argv[ii];
  }

  this.addOption("--help", "help", false, 'Show this message and exit.');

  this.parserOptstr(optstring, opts);

  return this;
}

parser.prototype.addUsage = function(str) {
  this.usage = str;
  return this;
};

parser.prototype.addOption = function(flag, dest, harg, help) {
  if (typeof flag !== 'string' || flag[0] !== '-') {
    throw new Error('flag should be -[a-z]');
  }
  if (typeof dest !== 'string') {
    throw new Error('dest should be string');
  }
  if (harg === undefined)
    harg = true;
  help = help || "";

  if (flag.length > 2) {
    if (flag[1] !== '-')
      throw new Error('error flag');
    this.options[flag.slice(2)] = {
      has_arg: harg,
      val: flag[2],
      name: dest,
      help: help
    };
  }
  else if (flag.length > 1) {
    this.options[flag[1]] = {
      has_arg: harg,
      val: flag[1],
      name: dest,
      help: help
    };
  }
  else {
    throw new Error('not a flag');
  }

  return this;
};

parser.prototype.help = function() {
  console.log("Usage: node [programe name] [OPTIONS]");
  console.log("");
  console.log(this.usage || "");
  console.log("");
  console.log("Options:");
  for(var i in this.options) {

    if (i.length > 1) {

      console.log('  --' + i + " " + this.options[i].name.toUpperCase() + '\t' + this.options[i].help);

    }
    else {
      console.log("   -" + i + " " + this.options[i].name.toUpperCase() + "\t" + this.options[i].help);
    }
  }
};

parser.prototype.parseArgs = function() {
  var ret = {};
  var opt;
  while ((opt = this.getopt_long()) !== undefined) {
    if (opt.name && opt.option !== '?') {
      ret[opt.name] = opt.arg || true;
    }
    else if (opt.arg) {
      ret[opt.option] = opt.arg;
    }
    else {
      ret[opt.option] = true;
    }
    if (opt.name === "help") {
      this.help();
      process.exit(0);
    }
  }
  ret['args'] = this.getArg();
  return ret;
};


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
      var ret = {
	option: this.options[chr].val,
	arg: ar,
	name: this.options[chr].name,
	help: this.options[chr].help
      };
//      if (this.options[chr].name)
//	ret[this.options[chr].name] = ar;
      return ret;
    }
    else {
      ar = this.optArgv[this.optind++];
      return {
	option: this.options[chr].val,
	arg: ar,
	name: this.options[chr].name,
	help: this.options[chr].help
      };
    }
  }
  else {
    return {
      option: this.options[chr].val,
      name: this.options[chr].name,
      help: this.options[chr].help
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
	  arg: this.optArgv[this.optind++],
	  name: this.options[ar].name,
	  help: this.options[ar].help
	};
      }
      else {
	return {
	  option: this.options[ar].val,
	  name: this.options[ar].name,
	  help: this.options[ar].help
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
