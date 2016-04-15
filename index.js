
function parser(optstring, argv) {
  var ii;
  
  if (!(this instanceof parser))
    return new parser(optstring, argv);

  this.optind = 2;
  this.opterr = 1;
  this.options = {};

  this.optArgv = new Array(argv.length);

  for (ii = 0; ii < argv.length; ++ii) {
    this.optArgv[ii] = argv[ii];
  }

  this.parserOptstr(optstring);

  return this;
}

parser.prototype.parserOptstr = function(optstr) {
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

    this.options[chr] = arg;

    ii++;
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
  if (this.options[chr]) {
    if (arg.length > 2) {
      ar = arg.slice(2);
      return {
	option: chr,
	arg: ar
      };
    }
    else {
      ar = this.optArgv[this.optind++];
      return {
	option: chr,
	arg: ar
      };
    }
  }
  else {
    return {
      option: chr
    };
  }
};

module.exports = parser;
