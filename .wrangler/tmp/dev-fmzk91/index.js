var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x4) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x4, {
  get: (a3, b4) => (typeof require !== "undefined" ? require : a3)[b4]
}) : x4)(function(x4) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x4 + '" is not supported');
});
var __esm = (fn2, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  } catch (e7) {
    throw err = [e7], e7;
  }
};
var __commonJS = (cb, mod2) => function __require2() {
  try {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  } catch (e7) {
    throw mod2 = 0, e7;
  }
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node-built-in-modules:events
import libDefault from "events";
var require_events = __commonJS({
  "node-built-in-modules:events"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault;
  }
});

// node_modules/pg/node_modules/pg-types/node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/pg/node_modules/pg-types/node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    exports.parse = function(source, transform) {
      return new ArrayParser(source, transform).parse();
    };
    var ArrayParser = class _ArrayParser {
      static {
        __name(this, "ArrayParser");
      }
      constructor(source, transform) {
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
      }
      isEof() {
        return this.position >= this.source.length;
      }
      nextCharacter() {
        var character = this.source[this.position++];
        if (character === "\\") {
          return {
            value: this.source[this.position++],
            escaped: true
          };
        }
        return {
          value: character,
          escaped: false
        };
      }
      record(character) {
        this.recorded.push(character);
      }
      newEntry(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
          entry = this.recorded.join("");
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null) entry = this.transform(entry);
          this.entries.push(entry);
          this.recorded = [];
        }
      }
      consumeDimensions() {
        if (this.source[0] === "[") {
          while (!this.isEof()) {
            var char = this.nextCharacter();
            if (char.value === "=") break;
          }
        }
      }
      parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while (!this.isEof()) {
          character = this.nextCharacter();
          if (character.value === "{" && !quote) {
            this.dimension++;
            if (this.dimension > 1) {
              parser = new _ArrayParser(this.source.substr(this.position - 1), this.transform);
              this.entries.push(parser.parse(true));
              this.position += parser.position - 2;
            }
          } else if (character.value === "}" && !quote) {
            this.dimension--;
            if (!this.dimension) {
              this.newEntry();
              if (nested) return this.entries;
            }
          } else if (character.value === '"' && !character.escaped) {
            if (quote) this.newEntry(true);
            quote = !quote;
          } else if (character.value === "," && !quote) {
            this.newEntry();
          } else {
            this.record(character.value);
          }
        }
        if (this.dimension !== 0) {
          throw new Error("array dimension not balanced");
        }
        return this.entries;
      }
    };
    function identity(value) {
      return value;
    }
    __name(identity, "identity");
  }
});

// node_modules/pg/node_modules/pg-types/lib/arrayParser.js
var require_arrayParser = __commonJS({
  "node_modules/pg/node_modules/pg-types/lib/arrayParser.js"(exports, module) {
    init_modules_watch_stub();
    var array = require_postgres_array();
    module.exports = {
      create: /* @__PURE__ */ __name(function(source, transform) {
        return {
          parse: /* @__PURE__ */ __name(function() {
            return array.parse(source, transform);
          }, "parse")
        };
      }, "create")
    };
  }
});

// node_modules/pg/node_modules/pg-types/node_modules/postgres-date/index.js
var require_postgres_date = __commonJS({
  "node_modules/pg/node_modules/pg-types/node_modules/postgres-date/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
    var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
    var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
    var INFINITY = /^-?infinity$/;
    module.exports = /* @__PURE__ */ __name(function parseDate(isoDate) {
      if (INFINITY.test(isoDate)) {
        return Number(isoDate.replace("i", "I"));
      }
      var matches = DATE_TIME.exec(isoDate);
      if (!matches) {
        return getDate(isoDate) || null;
      }
      var isBC = !!matches[8];
      var year = parseInt(matches[1], 10);
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var hour = parseInt(matches[4], 10);
      var minute = parseInt(matches[5], 10);
      var second = parseInt(matches[6], 10);
      var ms2 = matches[7];
      ms2 = ms2 ? 1e3 * parseFloat(ms2) : 0;
      var date;
      var offset = timeZoneOffset(isoDate);
      if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms2));
        if (is0To99(year)) {
          date.setUTCFullYear(year);
        }
        if (offset !== 0) {
          date.setTime(date.getTime() - offset);
        }
      } else {
        date = new Date(year, month, day, hour, minute, second, ms2);
        if (is0To99(year)) {
          date.setFullYear(year);
        }
      }
      return date;
    }, "parseDate");
    function getDate(isoDate) {
      var matches = DATE.exec(isoDate);
      if (!matches) {
        return;
      }
      var year = parseInt(matches[1], 10);
      var isBC = !!matches[4];
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var date = new Date(year, month, day);
      if (is0To99(year)) {
        date.setFullYear(year);
      }
      return date;
    }
    __name(getDate, "getDate");
    function timeZoneOffset(isoDate) {
      if (isoDate.endsWith("+00")) {
        return 0;
      }
      var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
      if (!zone) return;
      var type = zone[1];
      if (type === "Z") {
        return 0;
      }
      var sign2 = type === "-" ? -1 : 1;
      var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
      return offset * sign2 * 1e3;
    }
    __name(timeZoneOffset, "timeZoneOffset");
    function bcYearToNegativeYear(year) {
      return -(year - 1);
    }
    __name(bcYearToNegativeYear, "bcYearToNegativeYear");
    function is0To99(num) {
      return num >= 0 && num < 100;
    }
    __name(is0To99, "is0To99");
  }
});

// node_modules/xtend/mutable.js
var require_mutable = __commonJS({
  "node_modules/xtend/mutable.js"(exports, module) {
    init_modules_watch_stub();
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    __name(extend, "extend");
  }
});

// node_modules/pg/node_modules/pg-types/node_modules/postgres-interval/index.js
var require_postgres_interval = __commonJS({
  "node_modules/pg/node_modules/pg-types/node_modules/postgres-interval/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var extend = require_mutable();
    module.exports = PostgresInterval;
    function PostgresInterval(raw3) {
      if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw3);
      }
      extend(this, parse(raw3));
    }
    __name(PostgresInterval, "PostgresInterval");
    var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
    PostgresInterval.prototype.toPostgres = function() {
      var filtered = properties.filter(this.hasOwnProperty, this);
      if (this.milliseconds && filtered.indexOf("seconds") < 0) {
        filtered.push("seconds");
      }
      if (filtered.length === 0) return "0";
      return filtered.map(function(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
        }
        return value + " " + property;
      }, this).join(" ");
    };
    var propertiesISOEquivalent = {
      years: "Y",
      months: "M",
      days: "D",
      hours: "H",
      minutes: "M",
      seconds: "S"
    };
    var dateProperties = ["years", "months", "days"];
    var timeProperties = ["hours", "minutes", "seconds"];
    PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
      var datePart = dateProperties.map(buildProperty, this).join("");
      var timePart = timeProperties.map(buildProperty, this).join("");
      return "P" + datePart + "T" + timePart;
      function buildProperty(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
        }
        return value + propertiesISOEquivalent[property];
      }
      __name(buildProperty, "buildProperty");
    };
    var NUMBER = "([+-]?\\d+)";
    var YEAR = NUMBER + "\\s+years?";
    var MONTH = NUMBER + "\\s+mons?";
    var DAY = NUMBER + "\\s+days?";
    var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
    var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
      return "(" + regexString + ")?";
    }).join("\\s*"));
    var positions = {
      years: 2,
      months: 4,
      days: 6,
      hours: 9,
      minutes: 10,
      seconds: 11,
      milliseconds: 12
    };
    var negatives = ["hours", "minutes", "seconds", "milliseconds"];
    function parseMilliseconds(fraction) {
      var microseconds = fraction + "000000".slice(fraction.length);
      return parseInt(microseconds, 10) / 1e3;
    }
    __name(parseMilliseconds, "parseMilliseconds");
    function parse(interval) {
      if (!interval) return {};
      var matches = INTERVAL.exec(interval);
      var isNegative = matches[8] === "-";
      return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        if (!value) return parsed;
        value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
        if (!value) return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
          value *= -1;
        }
        parsed[property] = value;
        return parsed;
      }, {});
    }
    __name(parse, "parse");
  }
});

// node_modules/pg/node_modules/pg-types/node_modules/postgres-bytea/index.js
var require_postgres_bytea = __commonJS({
  "node_modules/pg/node_modules/pg-types/node_modules/postgres-bytea/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var bufferFrom = Buffer.from || Buffer;
    module.exports = /* @__PURE__ */ __name(function parseBytea(input) {
      if (/^\\x/.test(input)) {
        return bufferFrom(input.substr(2), "hex");
      }
      var output = "";
      var i = 0;
      while (i < input.length) {
        if (input[i] !== "\\") {
          output += input[i];
          ++i;
        } else {
          if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
            output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
            i += 4;
          } else {
            var backslashes = 1;
            while (i + backslashes < input.length && input[i + backslashes] === "\\") {
              backslashes++;
            }
            for (var k4 = 0; k4 < Math.floor(backslashes / 2); ++k4) {
              output += "\\";
            }
            i += Math.floor(backslashes / 2) * 2;
          }
        }
      }
      return bufferFrom(output, "binary");
    }, "parseBytea");
  }
});

// node_modules/pg/node_modules/pg-types/lib/textParsers.js
var require_textParsers = __commonJS({
  "node_modules/pg/node_modules/pg-types/lib/textParsers.js"(exports, module) {
    init_modules_watch_stub();
    var array = require_postgres_array();
    var arrayParser = require_arrayParser();
    var parseDate = require_postgres_date();
    var parseInterval = require_postgres_interval();
    var parseByteA = require_postgres_bytea();
    function allowNull(fn2) {
      return /* @__PURE__ */ __name(function nullAllowed(value) {
        if (value === null) return value;
        return fn2(value);
      }, "nullAllowed");
    }
    __name(allowNull, "allowNull");
    function parseBool(value) {
      if (value === null) return value;
      return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
    }
    __name(parseBool, "parseBool");
    function parseBoolArray(value) {
      if (!value) return null;
      return array.parse(value, parseBool);
    }
    __name(parseBoolArray, "parseBoolArray");
    function parseBaseTenInt(string) {
      return parseInt(string, 10);
    }
    __name(parseBaseTenInt, "parseBaseTenInt");
    function parseIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(parseBaseTenInt));
    }
    __name(parseIntegerArray, "parseIntegerArray");
    function parseBigIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(function(entry) {
        return parseBigInteger(entry).trim();
      }));
    }
    __name(parseBigIntegerArray, "parseBigIntegerArray");
    var parsePointArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p4 = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parsePoint(entry);
        }
        return entry;
      });
      return p4.parse();
    }, "parsePointArray");
    var parseFloatArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p4 = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseFloat(entry);
        }
        return entry;
      });
      return p4.parse();
    }, "parseFloatArray");
    var parseStringArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p4 = arrayParser.create(value);
      return p4.parse();
    }, "parseStringArray");
    var parseDateArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p4 = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseDate(entry);
        }
        return entry;
      });
      return p4.parse();
    }, "parseDateArray");
    var parseIntervalArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p4 = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseInterval(entry);
        }
        return entry;
      });
      return p4.parse();
    }, "parseIntervalArray");
    var parseByteAArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(parseByteA));
    }, "parseByteAArray");
    var parseInteger = /* @__PURE__ */ __name(function(value) {
      return parseInt(value, 10);
    }, "parseInteger");
    var parseBigInteger = /* @__PURE__ */ __name(function(value) {
      var valStr = String(value);
      if (/^\d+$/.test(valStr)) {
        return valStr;
      }
      return value;
    }, "parseBigInteger");
    var parseJsonArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(JSON.parse));
    }, "parseJsonArray");
    var parsePoint = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "(") {
        return null;
      }
      value = value.substring(1, value.length - 1).split(",");
      return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
      };
    }, "parsePoint");
    var parseCircle = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "<" && value[1] !== "(") {
        return null;
      }
      var point = "(";
      var radius = "";
      var pointParsed = false;
      for (var i = 2; i < value.length - 1; i++) {
        if (!pointParsed) {
          point += value[i];
        }
        if (value[i] === ")") {
          pointParsed = true;
          continue;
        } else if (!pointParsed) {
          continue;
        }
        if (value[i] === ",") {
          continue;
        }
        radius += value[i];
      }
      var result = parsePoint(point);
      result.radius = parseFloat(radius);
      return result;
    }, "parseCircle");
    var init2 = /* @__PURE__ */ __name(function(register) {
      register(20, parseBigInteger);
      register(21, parseInteger);
      register(23, parseInteger);
      register(26, parseInteger);
      register(700, parseFloat);
      register(701, parseFloat);
      register(16, parseBool);
      register(1082, parseDate);
      register(1114, parseDate);
      register(1184, parseDate);
      register(600, parsePoint);
      register(651, parseStringArray);
      register(718, parseCircle);
      register(1e3, parseBoolArray);
      register(1001, parseByteAArray);
      register(1005, parseIntegerArray);
      register(1007, parseIntegerArray);
      register(1028, parseIntegerArray);
      register(1016, parseBigIntegerArray);
      register(1017, parsePointArray);
      register(1021, parseFloatArray);
      register(1022, parseFloatArray);
      register(1231, parseFloatArray);
      register(1014, parseStringArray);
      register(1015, parseStringArray);
      register(1008, parseStringArray);
      register(1009, parseStringArray);
      register(1040, parseStringArray);
      register(1041, parseStringArray);
      register(1115, parseDateArray);
      register(1182, parseDateArray);
      register(1185, parseDateArray);
      register(1186, parseInterval);
      register(1187, parseIntervalArray);
      register(17, parseByteA);
      register(114, JSON.parse.bind(JSON));
      register(3802, JSON.parse.bind(JSON));
      register(199, parseJsonArray);
      register(3807, parseJsonArray);
      register(3907, parseStringArray);
      register(2951, parseStringArray);
      register(791, parseStringArray);
      register(1183, parseStringArray);
      register(1270, parseStringArray);
    }, "init");
    module.exports = {
      init: init2
    };
  }
});

// node_modules/pg-int8/index.js
var require_pg_int8 = __commonJS({
  "node_modules/pg-int8/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var BASE2 = 1e6;
    function readInt8(buffer) {
      var high = buffer.readInt32BE(0);
      var low = buffer.readUInt32BE(4);
      var sign2 = "";
      if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign2 = "-";
      }
      var result = "";
      var carry;
      var t;
      var digits;
      var pad;
      var l4;
      var i;
      {
        carry = high % BASE2;
        high = high / BASE2 >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE2 >>> 0;
        digits = "" + (t - BASE2 * low);
        if (low === 0 && high === 0) {
          return sign2 + digits + result;
        }
        pad = "";
        l4 = 6 - digits.length;
        for (i = 0; i < l4; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE2;
        high = high / BASE2 >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE2 >>> 0;
        digits = "" + (t - BASE2 * low);
        if (low === 0 && high === 0) {
          return sign2 + digits + result;
        }
        pad = "";
        l4 = 6 - digits.length;
        for (i = 0; i < l4; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE2;
        high = high / BASE2 >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE2 >>> 0;
        digits = "" + (t - BASE2 * low);
        if (low === 0 && high === 0) {
          return sign2 + digits + result;
        }
        pad = "";
        l4 = 6 - digits.length;
        for (i = 0; i < l4; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE2;
        t = 4294967296 * carry + low;
        digits = "" + t % BASE2;
        return sign2 + digits + result;
      }
    }
    __name(readInt8, "readInt8");
    module.exports = readInt8;
  }
});

// node_modules/pg/node_modules/pg-types/lib/binaryParsers.js
var require_binaryParsers = __commonJS({
  "node_modules/pg/node_modules/pg-types/lib/binaryParsers.js"(exports, module) {
    init_modules_watch_stub();
    var parseInt64 = require_pg_int8();
    var parseBits = /* @__PURE__ */ __name(function(data, bits, offset, invert, callback) {
      offset = offset || 0;
      invert = invert || false;
      callback = callback || function(lastValue, newValue, bits2) {
        return lastValue * Math.pow(2, bits2) + newValue;
      };
      var offsetBytes = offset >> 3;
      var inv = /* @__PURE__ */ __name(function(value) {
        if (invert) {
          return ~value & 255;
        }
        return value;
      }, "inv");
      var mask = 255;
      var firstBits = 8 - offset % 8;
      if (bits < firstBits) {
        mask = 255 << 8 - bits & 255;
        firstBits = bits;
      }
      if (offset) {
        mask = mask >> offset % 8;
      }
      var result = 0;
      if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
      }
      var bytes = bits + offset >> 3;
      for (var i = offsetBytes + 1; i < bytes; i++) {
        result = callback(result, inv(data[i]), 8);
      }
      var lastBits = (bits + offset) % 8;
      if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
      }
      return result;
    }, "parseBits");
    var parseFloatFromBits = /* @__PURE__ */ __name(function(data, precisionBits, exponentBits) {
      var bias = Math.pow(2, exponentBits - 1) - 1;
      var sign2 = parseBits(data, 1);
      var exponent = parseBits(data, exponentBits, 1);
      if (exponent === 0) {
        return 0;
      }
      var precisionBitsCounter = 1;
      var parsePrecisionBits = /* @__PURE__ */ __name(function(lastValue, newValue, bits) {
        if (lastValue === 0) {
          lastValue = 1;
        }
        for (var i = 1; i <= bits; i++) {
          precisionBitsCounter /= 2;
          if ((newValue & 1 << bits - i) > 0) {
            lastValue += precisionBitsCounter;
          }
        }
        return lastValue;
      }, "parsePrecisionBits");
      var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
      if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
          return sign2 === 0 ? Infinity : -Infinity;
        }
        return NaN;
      }
      return (sign2 === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
    }, "parseFloatFromBits");
    var parseInt16 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
      }
      return parseBits(value, 15, 1);
    }, "parseInt16");
    var parseInt32 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
      }
      return parseBits(value, 31, 1);
    }, "parseInt32");
    var parseFloat32 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 23, 8);
    }, "parseFloat32");
    var parseFloat64 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 52, 11);
    }, "parseFloat64");
    var parseNumeric = /* @__PURE__ */ __name(function(value) {
      var sign2 = parseBits(value, 16, 32);
      if (sign2 == 49152) {
        return NaN;
      }
      var weight = Math.pow(1e4, parseBits(value, 16, 16));
      var result = 0;
      var digits = [];
      var ndigits = parseBits(value, 16);
      for (var i = 0; i < ndigits; i++) {
        result += parseBits(value, 16, 64 + 16 * i) * weight;
        weight /= 1e4;
      }
      var scale = Math.pow(10, parseBits(value, 16, 48));
      return (sign2 === 0 ? 1 : -1) * Math.round(result * scale) / scale;
    }, "parseNumeric");
    var parseDate = /* @__PURE__ */ __name(function(isUTC, value) {
      var sign2 = parseBits(value, 1);
      var rawValue = parseBits(value, 63, 1);
      var result = new Date((sign2 === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
      if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 6e4);
      }
      result.usec = rawValue % 1e3;
      result.getMicroSeconds = function() {
        return this.usec;
      };
      result.setMicroSeconds = function(value2) {
        this.usec = value2;
      };
      result.getUTCMicroSeconds = function() {
        return this.usec;
      };
      return result;
    }, "parseDate");
    var parseArray2 = /* @__PURE__ */ __name(function(value) {
      var dim2 = parseBits(value, 32);
      var flags = parseBits(value, 32, 32);
      var elementType = parseBits(value, 32, 64);
      var offset = 96;
      var dims = [];
      for (var i = 0; i < dim2; i++) {
        dims[i] = parseBits(value, 32, offset);
        offset += 32;
        offset += 32;
      }
      var parseElement = /* @__PURE__ */ __name(function(elementType2) {
        var length = parseBits(value, 32, offset);
        offset += 32;
        if (length == 4294967295) {
          return null;
        }
        var result;
        if (elementType2 == 23 || elementType2 == 20) {
          result = parseBits(value, length * 8, offset);
          offset += length * 8;
          return result;
        } else if (elementType2 == 25) {
          result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
          return result;
        } else {
          console.log("ERROR: ElementType not implemented: " + elementType2);
        }
      }, "parseElement");
      var parse = /* @__PURE__ */ __name(function(dimension, elementType2) {
        var array = [];
        var i2;
        if (dimension.length > 1) {
          var count = dimension.shift();
          for (i2 = 0; i2 < count; i2++) {
            array[i2] = parse(dimension, elementType2);
          }
          dimension.unshift(count);
        } else {
          for (i2 = 0; i2 < dimension[0]; i2++) {
            array[i2] = parseElement(elementType2);
          }
        }
        return array;
      }, "parse");
      return parse(dims, elementType);
    }, "parseArray");
    var parseText = /* @__PURE__ */ __name(function(value) {
      return value.toString("utf8");
    }, "parseText");
    var parseBool = /* @__PURE__ */ __name(function(value) {
      if (value === null) return null;
      return parseBits(value, 8) > 0;
    }, "parseBool");
    var init2 = /* @__PURE__ */ __name(function(register) {
      register(20, parseInt64);
      register(21, parseInt16);
      register(23, parseInt32);
      register(26, parseInt32);
      register(1700, parseNumeric);
      register(700, parseFloat32);
      register(701, parseFloat64);
      register(16, parseBool);
      register(1114, parseDate.bind(null, false));
      register(1184, parseDate.bind(null, true));
      register(1e3, parseArray2);
      register(1007, parseArray2);
      register(1016, parseArray2);
      register(1008, parseArray2);
      register(1009, parseArray2);
      register(25, parseText);
    }, "init");
    module.exports = {
      init: init2
    };
  }
});

// node_modules/pg/node_modules/pg-types/lib/builtins.js
var require_builtins = __commonJS({
  "node_modules/pg/node_modules/pg-types/lib/builtins.js"(exports, module) {
    init_modules_watch_stub();
    module.exports = {
      BOOL: 16,
      BYTEA: 17,
      CHAR: 18,
      INT8: 20,
      INT2: 21,
      INT4: 23,
      REGPROC: 24,
      TEXT: 25,
      OID: 26,
      TID: 27,
      XID: 28,
      CID: 29,
      JSON: 114,
      XML: 142,
      PG_NODE_TREE: 194,
      SMGR: 210,
      PATH: 602,
      POLYGON: 604,
      CIDR: 650,
      FLOAT4: 700,
      FLOAT8: 701,
      ABSTIME: 702,
      RELTIME: 703,
      TINTERVAL: 704,
      CIRCLE: 718,
      MACADDR8: 774,
      MONEY: 790,
      MACADDR: 829,
      INET: 869,
      ACLITEM: 1033,
      BPCHAR: 1042,
      VARCHAR: 1043,
      DATE: 1082,
      TIME: 1083,
      TIMESTAMP: 1114,
      TIMESTAMPTZ: 1184,
      INTERVAL: 1186,
      TIMETZ: 1266,
      BIT: 1560,
      VARBIT: 1562,
      NUMERIC: 1700,
      REFCURSOR: 1790,
      REGPROCEDURE: 2202,
      REGOPER: 2203,
      REGOPERATOR: 2204,
      REGCLASS: 2205,
      REGTYPE: 2206,
      UUID: 2950,
      TXID_SNAPSHOT: 2970,
      PG_LSN: 3220,
      PG_NDISTINCT: 3361,
      PG_DEPENDENCIES: 3402,
      TSVECTOR: 3614,
      TSQUERY: 3615,
      GTSVECTOR: 3642,
      REGCONFIG: 3734,
      REGDICTIONARY: 3769,
      JSONB: 3802,
      REGNAMESPACE: 4089,
      REGROLE: 4096
    };
  }
});

// node_modules/pg/node_modules/pg-types/index.js
var require_pg_types = __commonJS({
  "node_modules/pg/node_modules/pg-types/index.js"(exports) {
    init_modules_watch_stub();
    var textParsers = require_textParsers();
    var binaryParsers = require_binaryParsers();
    var arrayParser = require_arrayParser();
    var builtinTypes = require_builtins();
    exports.getTypeParser = getTypeParser2;
    exports.setTypeParser = setTypeParser;
    exports.arrayParser = arrayParser;
    exports.builtins = builtinTypes;
    var typeParsers = {
      text: {},
      binary: {}
    };
    function noParse(val) {
      return String(val);
    }
    __name(noParse, "noParse");
    function getTypeParser2(oid, format) {
      format = format || "text";
      if (!typeParsers[format]) {
        return noParse;
      }
      return typeParsers[format][oid] || noParse;
    }
    __name(getTypeParser2, "getTypeParser");
    function setTypeParser(oid, format, parseFn) {
      if (typeof format == "function") {
        parseFn = format;
        format = "text";
      }
      typeParsers[format][oid] = parseFn;
    }
    __name(setTypeParser, "setTypeParser");
    textParsers.init(function(oid, converter) {
      typeParsers.text[oid] = converter;
    });
    binaryParsers.init(function(oid, converter) {
      typeParsers.binary[oid] = converter;
    });
  }
});

// node_modules/pg/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/pg/lib/defaults.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var user;
    try {
      user = process.platform === "win32" ? process.env.USERNAME : process.env.USER;
    } catch {
    }
    module.exports = {
      // database host. defaults to localhost
      host: "localhost",
      // database user's name
      user,
      // name of database to connect
      database: void 0,
      // database user's password
      password: null,
      // a Postgres connection string to be used instead of setting individual connection items
      // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
      // in the defaults object.
      connectionString: void 0,
      // database port
      port: 5432,
      // number of rows to return at a time from a prepared statement's
      // portal. 0 will return all rows at once
      rows: 0,
      // binary result mode
      binary: false,
      // Connection pool options - see https://github.com/brianc/node-pg-pool
      // number of connections to use in connection pool
      // 0 will disable connection pooling
      max: 10,
      // max milliseconds a client can go unused before it is removed
      // from the pool and destroyed
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      // max milliseconds any query using this connection will execute for before timing out in error.
      // false=unlimited
      statement_timeout: false,
      // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
      // false=unlimited
      lock_timeout: false,
      // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
      // false=unlimited
      idle_in_transaction_session_timeout: false,
      // max milliseconds to wait for query to complete (client side)
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var pgTypes = require_pg_types();
    var parseBigInteger = pgTypes.getTypeParser(20, "text");
    var parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
      pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
      pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  }
});

// node-built-in-modules:util
import libDefault2 from "util";
var require_util = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault2;
  }
});

// node_modules/pg/lib/utils.js
var require_utils = __commonJS({
  "node_modules/pg/lib/utils.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var defaults2 = require_defaults();
    var util = require_util();
    var { isDate } = util.types || util;
    function escapeElement(elementRepresentation) {
      const escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '"' + escaped + '"';
    }
    __name(escapeElement, "escapeElement");
    function arrayString(val) {
      let result = "{";
      for (let i = 0; i < val.length; i++) {
        if (i > 0) {
          result = result + ",";
        }
        if (val[i] === null || typeof val[i] === "undefined") {
          result = result + "NULL";
        } else if (Array.isArray(val[i])) {
          result = result + arrayString(val[i]);
        } else if (ArrayBuffer.isView(val[i])) {
          let item = val[i];
          if (!(item instanceof Buffer)) {
            const buf = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
            if (buf.length === item.byteLength) {
              item = buf;
            } else {
              item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
            }
          }
          result += "\\\\x" + item.toString("hex");
        } else {
          result += escapeElement(prepareValue(val[i]));
        }
      }
      result = result + "}";
      return result;
    }
    __name(arrayString, "arrayString");
    var prepareValue = /* @__PURE__ */ __name(function(val, seen) {
      if (val == null) {
        return null;
      }
      if (typeof val === "object") {
        if (val instanceof Buffer) {
          return val;
        }
        if (ArrayBuffer.isView(val)) {
          const buf = Buffer.from(val.buffer, val.byteOffset, val.byteLength);
          if (buf.length === val.byteLength) {
            return buf;
          }
          return buf.slice(val.byteOffset, val.byteOffset + val.byteLength);
        }
        if (isDate(val)) {
          if (defaults2.parseInputDatesAsUTC) {
            return dateToStringUTC(val);
          } else {
            return dateToString(val);
          }
        }
        if (Array.isArray(val)) {
          return arrayString(val);
        }
        return prepareObject(val, seen);
      }
      return val.toString();
    }, "prepareValue");
    function prepareObject(val, seen) {
      if (val && typeof val.toPostgres === "function") {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
          throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
      }
      return JSON.stringify(val);
    }
    __name(prepareObject, "prepareObject");
    function dateToString(date) {
      let offset = -date.getTimezoneOffset();
      let year = date.getFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0") + "." + String(date.getMilliseconds()).padStart(3, "0");
      if (offset < 0) {
        ret += "-";
        offset *= -1;
      } else {
        ret += "+";
      }
      ret += String(Math.floor(offset / 60)).padStart(2, "0") + ":" + String(offset % 60).padStart(2, "0");
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToString, "dateToString");
    function dateToStringUTC(date) {
      let year = date.getUTCFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getUTCMonth() + 1).padStart(2, "0") + "-" + String(date.getUTCDate()).padStart(2, "0") + "T" + String(date.getUTCHours()).padStart(2, "0") + ":" + String(date.getUTCMinutes()).padStart(2, "0") + ":" + String(date.getUTCSeconds()).padStart(2, "0") + "." + String(date.getUTCMilliseconds()).padStart(3, "0");
      ret += "+00:00";
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToStringUTC, "dateToStringUTC");
    function normalizeQueryConfig(config4, values, callback) {
      config4 = typeof config4 === "string" ? { text: config4 } : config4;
      if (values) {
        if (typeof values === "function") {
          config4.callback = values;
        } else {
          config4.values = values;
        }
      }
      if (callback) {
        config4.callback = callback;
      }
      return config4;
    }
    __name(normalizeQueryConfig, "normalizeQueryConfig");
    var escapeIdentifier2 = /* @__PURE__ */ __name(function(str) {
      return '"' + str.replace(/"/g, '""') + '"';
    }, "escapeIdentifier");
    var escapeLiteral2 = /* @__PURE__ */ __name(function(str) {
      let hasBackslash = false;
      let escaped = "'";
      if (str == null) {
        return "''";
      }
      if (typeof str !== "string") {
        return "''";
      }
      for (let i = 0; i < str.length; i++) {
        const c2 = str[i];
        if (c2 === "'") {
          escaped += c2 + c2;
        } else if (c2 === "\\") {
          escaped += c2 + c2;
          hasBackslash = true;
        } else {
          escaped += c2;
        }
      }
      escaped += "'";
      if (hasBackslash === true) {
        escaped = " E" + escaped;
      }
      return escaped;
    }, "escapeLiteral");
    module.exports = {
      prepareValue: /* @__PURE__ */ __name(function prepareValueWrapper(value) {
        return prepareValue(value);
      }, "prepareValueWrapper"),
      normalizeQueryConfig,
      escapeIdentifier: escapeIdentifier2,
      escapeLiteral: escapeLiteral2
    };
  }
});

// node-built-in-modules:crypto
import libDefault3 from "crypto";
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault3;
  }
});

// node_modules/pg/lib/crypto/utils-legacy.js
var require_utils_legacy = __commonJS({
  "node_modules/pg/lib/crypto/utils-legacy.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var nodeCrypto = require_crypto();
    function md5(string) {
      return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
    }
    __name(md5, "md5");
    function postgresMd5PasswordHash(user, password, salt) {
      const inner = md5(password + user);
      const outer = md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    function sha256(text) {
      return nodeCrypto.createHash("sha256").update(text).digest();
    }
    __name(sha256, "sha256");
    function hashByName(hashName, text) {
      hashName = hashName.replace(/(\D)-/, "$1");
      return nodeCrypto.createHash(hashName).update(text).digest();
    }
    __name(hashByName, "hashByName");
    function hmacSha256(key, msg) {
      return nodeCrypto.createHmac("sha256", key).update(msg).digest();
    }
    __name(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      return nodeCrypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");
    }
    __name(deriveKey, "deriveKey");
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes: nodeCrypto.randomBytes,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
  }
});

// node_modules/pg/lib/crypto/utils-webcrypto.js
var require_utils_webcrypto = __commonJS({
  "node_modules/pg/lib/crypto/utils-webcrypto.js"(exports, module) {
    init_modules_watch_stub();
    var nodeCrypto = require_crypto();
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
    var webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
    var subtleCrypto = webCrypto.subtle;
    var textEncoder = new TextEncoder();
    function randomBytes(length) {
      return webCrypto.getRandomValues(Buffer.alloc(length));
    }
    __name(randomBytes, "randomBytes");
    async function md5(string) {
      try {
        return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
      } catch (e7) {
        const data = typeof string === "string" ? textEncoder.encode(string) : string;
        const hash = await subtleCrypto.digest("MD5", data);
        return Array.from(new Uint8Array(hash)).map((b4) => b4.toString(16).padStart(2, "0")).join("");
      }
    }
    __name(md5, "md5");
    async function postgresMd5PasswordHash(user, password, salt) {
      const inner = await md5(password + user);
      const outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    async function sha256(text) {
      return await subtleCrypto.digest("SHA-256", text);
    }
    __name(sha256, "sha256");
    async function hashByName(hashName, text) {
      return await subtleCrypto.digest(hashName, text);
    }
    __name(hashByName, "hashByName");
    async function hmacSha256(keyBuffer, msg) {
      const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
    }
    __name(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      const key = await subtleCrypto.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
      const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
      return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
    }
    __name(deriveKey, "deriveKey");
  }
});

// node_modules/pg/lib/crypto/utils.js
var require_utils2 = __commonJS({
  "node_modules/pg/lib/crypto/utils.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var useLegacyCrypto = parseInt(process.versions && process.versions.node && process.versions.node.split(".")[0]) < 15;
    if (useLegacyCrypto) {
      module.exports = require_utils_legacy();
    } else {
      module.exports = require_utils_webcrypto();
    }
  }
});

// node_modules/pg/lib/crypto/cert-signatures.js
var require_cert_signatures = __commonJS({
  "node_modules/pg/lib/crypto/cert-signatures.js"(exports, module) {
    init_modules_watch_stub();
    function x509Error(msg, cert) {
      return new Error("SASL channel binding: " + msg + " when parsing public certificate " + cert.toString("base64"));
    }
    __name(x509Error, "x509Error");
    function readASN1Length(data, index) {
      let length = data[index++];
      if (length < 128) return { length, index };
      const lengthBytes = length & 127;
      if (lengthBytes > 4) throw x509Error("bad length", data);
      length = 0;
      for (let i = 0; i < lengthBytes; i++) {
        length = length << 8 | data[index++];
      }
      return { length, index };
    }
    __name(readASN1Length, "readASN1Length");
    function readASN1OID(data, index) {
      if (data[index++] !== 6) throw x509Error("non-OID data", data);
      const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
      index = indexAfterOIDLength;
      const lastIndex = index + OIDLength;
      const byte1 = data[index++];
      let oid = (byte1 / 40 >> 0) + "." + byte1 % 40;
      while (index < lastIndex) {
        let value = 0;
        while (index < lastIndex) {
          const nextByte = data[index++];
          value = value << 7 | nextByte & 127;
          if (nextByte < 128) break;
        }
        oid += "." + value;
      }
      return { oid, index };
    }
    __name(readASN1OID, "readASN1OID");
    function expectASN1Seq(data, index) {
      if (data[index++] !== 48) throw x509Error("non-sequence data", data);
      return readASN1Length(data, index);
    }
    __name(expectASN1Seq, "expectASN1Seq");
    function signatureAlgorithmHashFromCertificate(data, index) {
      if (index === void 0) index = 0;
      index = expectASN1Seq(data, index).index;
      const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
      index = indexAfterCertInfoLength + certInfoLength;
      index = expectASN1Seq(data, index).index;
      const { oid, index: indexAfterOID } = readASN1OID(data, index);
      switch (oid) {
        // RSA
        case "1.2.840.113549.1.1.4":
          return "MD5";
        case "1.2.840.113549.1.1.5":
          return "SHA-1";
        case "1.2.840.113549.1.1.11":
          return "SHA-256";
        case "1.2.840.113549.1.1.12":
          return "SHA-384";
        case "1.2.840.113549.1.1.13":
          return "SHA-512";
        case "1.2.840.113549.1.1.14":
          return "SHA-224";
        case "1.2.840.113549.1.1.15":
          return "SHA512-224";
        case "1.2.840.113549.1.1.16":
          return "SHA512-256";
        // ECDSA
        case "1.2.840.10045.4.1":
          return "SHA-1";
        case "1.2.840.10045.4.3.1":
          return "SHA-224";
        case "1.2.840.10045.4.3.2":
          return "SHA-256";
        case "1.2.840.10045.4.3.3":
          return "SHA-384";
        case "1.2.840.10045.4.3.4":
          return "SHA-512";
        // RSASSA-PSS: hash is indicated separately
        case "1.2.840.113549.1.1.10": {
          index = indexAfterOID;
          index = expectASN1Seq(data, index).index;
          if (data[index++] !== 160) throw x509Error("non-tag data", data);
          index = readASN1Length(data, index).index;
          index = expectASN1Seq(data, index).index;
          const { oid: hashOID } = readASN1OID(data, index);
          switch (hashOID) {
            // standalone hash OIDs
            case "1.2.840.113549.2.5":
              return "MD5";
            case "1.3.14.3.2.26":
              return "SHA-1";
            case "2.16.840.1.101.3.4.2.1":
              return "SHA-256";
            case "2.16.840.1.101.3.4.2.2":
              return "SHA-384";
            case "2.16.840.1.101.3.4.2.3":
              return "SHA-512";
          }
          throw x509Error("unknown hash OID " + hashOID, data);
        }
        // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
        case "1.3.101.110":
        case "1.3.101.112":
          return "SHA-512";
        // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
        case "1.3.101.111":
        case "1.3.101.113":
          throw x509Error("Ed448 certificate channel binding is not currently supported by Postgres");
      }
      throw x509Error("unknown OID " + oid, data);
    }
    __name(signatureAlgorithmHashFromCertificate, "signatureAlgorithmHashFromCertificate");
    module.exports = { signatureAlgorithmHashFromCertificate };
  }
});

// node_modules/pg/lib/crypto/sasl.js
var require_sasl = __commonJS({
  "node_modules/pg/lib/crypto/sasl.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var crypto2 = require_utils2();
    var { signatureAlgorithmHashFromCertificate } = require_cert_signatures();
    function startSession(mechanisms, stream) {
      const candidates = ["SCRAM-SHA-256"];
      if (stream) candidates.unshift("SCRAM-SHA-256-PLUS");
      const mechanism = candidates.find((candidate) => mechanisms.includes(candidate));
      if (!mechanism) {
        throw new Error("SASL: Only mechanism(s) " + candidates.join(" and ") + " are supported");
      }
      if (mechanism === "SCRAM-SHA-256-PLUS" && typeof stream.getPeerCertificate !== "function") {
        throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
      }
      const clientNonce = crypto2.randomBytes(18).toString("base64");
      const gs2Header = mechanism === "SCRAM-SHA-256-PLUS" ? "p=tls-server-end-point" : stream ? "y" : "n";
      return {
        mechanism,
        clientNonce,
        response: gs2Header + ",,n=*,r=" + clientNonce,
        message: "SASLInitialResponse"
      };
    }
    __name(startSession, "startSession");
    async function continueSession(session, password, serverData, stream) {
      if (session.message !== "SASLInitialResponse") {
        throw new Error("SASL: Last message was not SASLInitialResponse");
      }
      if (typeof password !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
      }
      if (password === "") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
      }
      const sv = parseServerFirstMessage(serverData);
      if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
      } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      }
      const clientFirstMessageBare = "n=*,r=" + session.clientNonce;
      const serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
      let channelBinding = stream ? "eSws" : "biws";
      if (session.mechanism === "SCRAM-SHA-256-PLUS") {
        const peerCert = stream.getPeerCertificate().raw;
        let hashName = signatureAlgorithmHashFromCertificate(peerCert);
        if (hashName === "MD5" || hashName === "SHA-1") hashName = "SHA-256";
        const certHash = await crypto2.hashByName(hashName, peerCert);
        const bindingData = Buffer.concat([Buffer.from("p=tls-server-end-point,,"), Buffer.from(certHash)]);
        channelBinding = bindingData.toString("base64");
      }
      const clientFinalMessageWithoutProof = "c=" + channelBinding + ",r=" + sv.nonce;
      const authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
      const saltBytes = Buffer.from(sv.salt, "base64");
      const saltedPassword = await crypto2.deriveKey(password, saltBytes, sv.iteration);
      const clientKey = await crypto2.hmacSha256(saltedPassword, "Client Key");
      const storedKey = await crypto2.sha256(clientKey);
      const clientSignature = await crypto2.hmacSha256(storedKey, authMessage);
      const clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
      const serverKey = await crypto2.hmacSha256(saltedPassword, "Server Key");
      const serverSignatureBytes = await crypto2.hmacSha256(serverKey, authMessage);
      session.message = "SASLResponse";
      session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
      session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
    }
    __name(continueSession, "continueSession");
    function finalizeSession(session, serverData) {
      if (session.message !== "SASLResponse") {
        throw new Error("SASL: Last message was not SASLResponse");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
      }
      const { serverSignature } = parseServerFinalMessage(serverData);
      if (serverSignature !== session.serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
    }
    __name(finalizeSession, "finalizeSession");
    function isPrintableChars(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: text must be a string");
      }
      return text.split("").map((_2, i) => text.charCodeAt(i)).every((c2) => c2 >= 33 && c2 <= 43 || c2 >= 45 && c2 <= 126);
    }
    __name(isPrintableChars, "isPrintableChars");
    function isBase64(text) {
      return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
    }
    __name(isBase64, "isBase64");
    function parseAttributePairs(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: attribute pairs text must be a string");
      }
      return new Map(
        text.split(",").map((attrValue) => {
          if (!/^.=/.test(attrValue)) {
            throw new Error("SASL: Invalid attribute pair entry");
          }
          const name2 = attrValue[0];
          const value = attrValue.substring(2);
          return [name2, value];
        })
      );
    }
    __name(parseAttributePairs, "parseAttributePairs");
    function parseServerFirstMessage(data) {
      const attrPairs = parseAttributePairs(data);
      const nonce = attrPairs.get("r");
      if (!nonce) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
      } else if (!isPrintableChars(nonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
      }
      const salt = attrPairs.get("s");
      if (!salt) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
      } else if (!isBase64(salt)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
      }
      const iterationText = attrPairs.get("i");
      if (!iterationText) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
      } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
      }
      const iteration = parseInt(iterationText, 10);
      return {
        nonce,
        salt,
        iteration
      };
    }
    __name(parseServerFirstMessage, "parseServerFirstMessage");
    function parseServerFinalMessage(serverData) {
      const attrPairs = parseAttributePairs(serverData);
      const serverSignature = attrPairs.get("v");
      if (!serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
      } else if (!isBase64(serverSignature)) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
      }
      return {
        serverSignature
      };
    }
    __name(parseServerFinalMessage, "parseServerFinalMessage");
    function xorBuffers(a3, b4) {
      if (!Buffer.isBuffer(a3)) {
        throw new TypeError("first argument must be a Buffer");
      }
      if (!Buffer.isBuffer(b4)) {
        throw new TypeError("second argument must be a Buffer");
      }
      if (a3.length !== b4.length) {
        throw new Error("Buffer lengths must match");
      }
      if (a3.length === 0) {
        throw new Error("Buffers cannot be empty");
      }
      return Buffer.from(a3.map((_2, i) => a3[i] ^ b4[i]));
    }
    __name(xorBuffers, "xorBuffers");
    module.exports = {
      startSession,
      continueSession,
      finalizeSession
    };
  }
});

// node_modules/pg/lib/type-overrides.js
var require_type_overrides = __commonJS({
  "node_modules/pg/lib/type-overrides.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var types3 = require_pg_types();
    function TypeOverrides2(userTypes) {
      this._types = userTypes || types3;
      this.text = {};
      this.binary = {};
    }
    __name(TypeOverrides2, "TypeOverrides");
    TypeOverrides2.prototype.getOverrides = function(format) {
      switch (format) {
        case "text":
          return this.text;
        case "binary":
          return this.binary;
        default:
          return {};
      }
    };
    TypeOverrides2.prototype.setTypeParser = function(oid, format, parseFn) {
      if (typeof format === "function") {
        parseFn = format;
        format = "text";
      }
      this.getOverrides(format)[oid] = parseFn;
    };
    TypeOverrides2.prototype.getTypeParser = function(oid, format) {
      format = format || "text";
      return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
    };
    module.exports = TypeOverrides2;
  }
});

// node-built-in-modules:dns
import libDefault4 from "dns";
var require_dns = __commonJS({
  "node-built-in-modules:dns"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault4;
  }
});

// node-built-in-modules:fs
import libDefault5 from "fs";
var require_fs = __commonJS({
  "node-built-in-modules:fs"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault5;
  }
});

// node_modules/pg-connection-string/index.js
var require_pg_connection_string = __commonJS({
  "node_modules/pg-connection-string/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    function parse(str, options = {}) {
      if (str.charAt(0) === "/") {
        const config5 = str.split(" ");
        return { host: config5[0], database: config5[1] };
      }
      const config4 = {};
      let result;
      let dummyHost = false;
      if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
        str = encodeURI(str).replace(/%25(\d\d)/g, "%$1");
      }
      try {
        try {
          result = new URL(str, "postgres://base");
        } catch (e7) {
          result = new URL(str.replace("@/", "@___DUMMY___/"), "postgres://base");
          dummyHost = true;
        }
      } catch (err) {
        err.input && (err.input = "*****REDACTED*****");
        throw err;
      }
      for (const entry of result.searchParams.entries()) {
        config4[entry[0]] = entry[1];
      }
      config4.user = config4.user || decodeURIComponent(result.username);
      config4.password = config4.password || decodeURIComponent(result.password);
      if (result.protocol == "socket:") {
        config4.host = decodeURI(result.pathname);
        config4.database = result.searchParams.get("db");
        config4.client_encoding = result.searchParams.get("encoding");
        return config4;
      }
      const hostname = dummyHost ? "" : result.hostname;
      if (!config4.host) {
        config4.host = decodeURIComponent(hostname);
      } else if (hostname && /^%2f/i.test(hostname)) {
        result.pathname = hostname + result.pathname;
      }
      if (!config4.port) {
        config4.port = result.port;
      }
      const pathname = result.pathname.slice(1) || null;
      config4.database = pathname ? decodeURI(pathname) : null;
      if (config4.ssl === "true" || config4.ssl === "1") {
        config4.ssl = true;
      }
      if (config4.ssl === "0") {
        config4.ssl = false;
      }
      if (config4.sslcert || config4.sslkey || config4.sslrootcert || config4.sslmode) {
        config4.ssl = {};
      }
      const fs2 = config4.sslcert || config4.sslkey || config4.sslrootcert ? require_fs() : null;
      if (config4.sslcert) {
        config4.ssl.cert = fs2.readFileSync(config4.sslcert).toString();
      }
      if (config4.sslkey) {
        config4.ssl.key = fs2.readFileSync(config4.sslkey).toString();
      }
      if (config4.sslrootcert) {
        config4.ssl.ca = fs2.readFileSync(config4.sslrootcert).toString();
      }
      if (options.useLibpqCompat && config4.uselibpqcompat) {
        throw new Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");
      }
      if (config4.uselibpqcompat === "true" || options.useLibpqCompat) {
        switch (config4.sslmode) {
          case "disable": {
            config4.ssl = false;
            break;
          }
          case "prefer": {
            config4.ssl.rejectUnauthorized = false;
            break;
          }
          case "require": {
            if (config4.sslrootcert) {
              config4.ssl.checkServerIdentity = function() {
              };
            } else {
              config4.ssl.rejectUnauthorized = false;
            }
            break;
          }
          case "verify-ca": {
            if (!config4.ssl.ca) {
              throw new Error(
                "SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security."
              );
            }
            config4.ssl.checkServerIdentity = function() {
            };
            break;
          }
          case "verify-full": {
            break;
          }
        }
      } else {
        switch (config4.sslmode) {
          case "disable": {
            config4.ssl = false;
            break;
          }
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full": {
            if (config4.sslmode !== "verify-full") {
              deprecatedSslModeWarning(config4.sslmode);
            }
            break;
          }
          case "no-verify": {
            config4.ssl.rejectUnauthorized = false;
            break;
          }
        }
      }
      return config4;
    }
    __name(parse, "parse");
    function toConnectionOptions(sslConfig) {
      const connectionOptions = Object.entries(sslConfig).reduce((c2, [key, value]) => {
        if (value !== void 0 && value !== null) {
          c2[key] = value;
        }
        return c2;
      }, {});
      return connectionOptions;
    }
    __name(toConnectionOptions, "toConnectionOptions");
    function toClientConfig(config4) {
      const poolConfig = Object.entries(config4).reduce((c2, [key, value]) => {
        if (key === "ssl") {
          const sslConfig = value;
          if (typeof sslConfig === "boolean") {
            c2[key] = sslConfig;
          }
          if (typeof sslConfig === "object") {
            c2[key] = toConnectionOptions(sslConfig);
          }
        } else if (value !== void 0 && value !== null) {
          if (key === "port") {
            if (value !== "") {
              const v3 = parseInt(value, 10);
              if (isNaN(v3)) {
                throw new Error(`Invalid ${key}: ${value}`);
              }
              c2[key] = v3;
            }
          } else {
            c2[key] = value;
          }
        }
        return c2;
      }, {});
      return poolConfig;
    }
    __name(toClientConfig, "toClientConfig");
    function parseIntoClientConfig(str) {
      return toClientConfig(parse(str));
    }
    __name(parseIntoClientConfig, "parseIntoClientConfig");
    function deprecatedSslModeWarning(sslmode) {
      if (!deprecatedSslModeWarning.warned && typeof process !== "undefined" && process.emitWarning) {
        deprecatedSslModeWarning.warned = true;
        process.emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${sslmode}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`);
      }
    }
    __name(deprecatedSslModeWarning, "deprecatedSslModeWarning");
    module.exports = parse;
    parse.parse = parse;
    parse.toClientConfig = toClientConfig;
    parse.parseIntoClientConfig = parseIntoClientConfig;
  }
});

// node_modules/pg/lib/connection-parameters.js
var require_connection_parameters = __commonJS({
  "node_modules/pg/lib/connection-parameters.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var dns = require_dns();
    var defaults2 = require_defaults();
    var parse = require_pg_connection_string().parse;
    var val = /* @__PURE__ */ __name(function(key, config4, envVar) {
      if (config4[key]) {
        return config4[key];
      }
      if (envVar === void 0) {
        envVar = process.env["PG" + key.toUpperCase()];
      } else if (envVar === false) {
      } else {
        envVar = process.env[envVar];
      }
      return envVar || defaults2[key];
    }, "val");
    var readSSLConfigFromEnvironment = /* @__PURE__ */ __name(function() {
      switch (process.env.PGSSLMODE) {
        case "disable":
          return false;
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          return true;
        case "no-verify":
          return { rejectUnauthorized: false };
      }
      return defaults2.ssl;
    }, "readSSLConfigFromEnvironment");
    var quoteParamValue = /* @__PURE__ */ __name(function(value) {
      return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    }, "quoteParamValue");
    var add2 = /* @__PURE__ */ __name(function(params, config4, paramName) {
      const value = config4[paramName];
      if (value !== void 0 && value !== null) {
        params.push(paramName + "=" + quoteParamValue(value));
      }
    }, "add");
    var ConnectionParameters = class {
      static {
        __name(this, "ConnectionParameters");
      }
      constructor(config4) {
        config4 = typeof config4 === "string" ? parse(config4) : config4 || {};
        if (config4.connectionString) {
          config4 = Object.assign({}, config4, parse(config4.connectionString));
        }
        this.user = val("user", config4);
        this.database = val("database", config4);
        if (this.database === void 0) {
          this.database = this.user;
        }
        this.port = parseInt(val("port", config4), 10);
        this.host = val("host", config4);
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: val("password", config4)
        });
        this.binary = val("binary", config4);
        this.options = val("options", config4);
        this.ssl = typeof config4.ssl === "undefined" ? readSSLConfigFromEnvironment() : config4.ssl;
        if (typeof this.ssl === "string") {
          if (this.ssl === "true") {
            this.ssl = true;
          }
        }
        if (this.ssl === "no-verify") {
          this.ssl = { rejectUnauthorized: false };
        }
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this.client_encoding = val("client_encoding", config4);
        this.replication = val("replication", config4);
        this.isDomainSocket = !(this.host || "").indexOf("/");
        this.application_name = val("application_name", config4, "PGAPPNAME");
        this.fallback_application_name = val("fallback_application_name", config4, false);
        this.statement_timeout = val("statement_timeout", config4, false);
        this.lock_timeout = val("lock_timeout", config4, false);
        this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config4, false);
        this.query_timeout = val("query_timeout", config4, false);
        if (config4.connectionTimeoutMillis === void 0) {
          this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
        } else {
          this.connect_timeout = Math.floor(config4.connectionTimeoutMillis / 1e3);
        }
        if (config4.keepAlive === false) {
          this.keepalives = 0;
        } else if (config4.keepAlive === true) {
          this.keepalives = 1;
        }
        if (typeof config4.keepAliveInitialDelayMillis === "number") {
          this.keepalives_idle = Math.floor(config4.keepAliveInitialDelayMillis / 1e3);
        }
      }
      getLibpqConnectionString(cb) {
        const params = [];
        add2(params, this, "user");
        add2(params, this, "password");
        add2(params, this, "port");
        add2(params, this, "application_name");
        add2(params, this, "fallback_application_name");
        add2(params, this, "connect_timeout");
        add2(params, this, "options");
        const ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
        add2(params, ssl, "sslmode");
        add2(params, ssl, "sslca");
        add2(params, ssl, "sslkey");
        add2(params, ssl, "sslcert");
        add2(params, ssl, "sslrootcert");
        if (this.database) {
          params.push("dbname=" + quoteParamValue(this.database));
        }
        if (this.replication) {
          params.push("replication=" + quoteParamValue(this.replication));
        }
        if (this.host) {
          params.push("host=" + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
          return cb(null, params.join(" "));
        }
        if (this.client_encoding) {
          params.push("client_encoding=" + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
          if (err) return cb(err, null);
          params.push("hostaddr=" + quoteParamValue(address));
          return cb(null, params.join(" "));
        });
      }
    };
    module.exports = ConnectionParameters;
  }
});

// node_modules/pg/lib/result.js
var require_result = __commonJS({
  "node_modules/pg/lib/result.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var types3 = require_pg_types();
    var matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
    var Result2 = class {
      static {
        __name(this, "Result");
      }
      constructor(rowMode, types4) {
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = void 0;
        this._types = types4;
        this.RowCtor = null;
        this.rowAsArray = rowMode === "array";
        if (this.rowAsArray) {
          this.parseRow = this._parseRowAsArray;
        }
        this._prebuiltEmptyResultObject = null;
      }
      // adds a command complete message
      addCommandComplete(msg) {
        let match2;
        if (msg.text) {
          match2 = matchRegexp.exec(msg.text);
        } else {
          match2 = matchRegexp.exec(msg.command);
        }
        if (match2) {
          this.command = match2[1];
          if (match2[3]) {
            this.oid = parseInt(match2[2], 10);
            this.rowCount = parseInt(match2[3], 10);
          } else if (match2[2]) {
            this.rowCount = parseInt(match2[2], 10);
          }
        }
      }
      _parseRowAsArray(rowData) {
        const row = new Array(rowData.length);
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          if (rawValue !== null) {
            row[i] = this._parsers[i](rawValue);
          } else {
            row[i] = null;
          }
        }
        return row;
      }
      parseRow(rowData) {
        const row = { ...this._prebuiltEmptyResultObject };
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          const field = this.fields[i].name;
          if (rawValue !== null) {
            const v3 = this.fields[i].format === "binary" ? Buffer.from(rawValue) : rawValue;
            row[field] = this._parsers[i](v3);
          } else {
            row[field] = null;
          }
        }
        return row;
      }
      addRow(row) {
        this.rows.push(row);
      }
      addFields(fieldDescriptions) {
        this.fields = fieldDescriptions;
        if (this.fields.length) {
          this._parsers = new Array(fieldDescriptions.length);
        }
        const row = {};
        for (let i = 0; i < fieldDescriptions.length; i++) {
          const desc = fieldDescriptions[i];
          row[desc.name] = null;
          if (this._types) {
            this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
          } else {
            this._parsers[i] = types3.getTypeParser(desc.dataTypeID, desc.format || "text");
          }
        }
        this._prebuiltEmptyResultObject = { ...row };
      }
    };
    module.exports = Result2;
  }
});

// node_modules/pg/lib/query.js
var require_query = __commonJS({
  "node_modules/pg/lib/query.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var { EventEmitter } = require_events();
    var Result2 = require_result();
    var utils = require_utils();
    var Query2 = class extends EventEmitter {
      static {
        __name(this, "Query");
      }
      constructor(config4, values, callback) {
        super();
        config4 = utils.normalizeQueryConfig(config4, values, callback);
        this.text = config4.text;
        this.values = config4.values;
        this.rows = config4.rows;
        this.types = config4.types;
        this.name = config4.name;
        this.queryMode = config4.queryMode;
        this.binary = config4.binary;
        this.portal = config4.portal || "";
        this.callback = config4.callback;
        this._rowMode = config4.rowMode;
        if (process.domain && config4.callback) {
          this.callback = process.domain.bind(config4.callback);
        }
        this._result = new Result2(this._rowMode, this.types);
        this._results = this._result;
        this._canceledDueToError = false;
      }
      requiresPreparation() {
        if (this.queryMode === "extended") {
          return true;
        }
        if (this.name) {
          return true;
        }
        if (this.rows) {
          return true;
        }
        if (!this.text) {
          return false;
        }
        if (!this.values) {
          return false;
        }
        return this.values.length > 0;
      }
      _checkForMultirow() {
        if (this._result.command) {
          if (!Array.isArray(this._results)) {
            this._results = [this._result];
          }
          this._result = new Result2(this._rowMode, this._result._types);
          this._results.push(this._result);
        }
      }
      // associates row metadata from the supplied
      // message with this query object
      // metadata used when parsing row results
      handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners("row").length;
      }
      handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
          return;
        }
        try {
          row = this._result.parseRow(msg.fields);
        } catch (err) {
          this._canceledDueToError = err;
          return;
        }
        this.emit("row", row, this._result);
        if (this._accumulateRows) {
          this._result.addRow(row);
        }
      }
      handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        if (this.rows) {
          connection.sync();
        }
      }
      // if a named prepared statement is created with empty query text
      // the backend will send an emptyQuery message but *not* a command complete message
      // since we pipeline sync immediately after execute we don't need to do anything here
      // unless we have rows specified, in which case we did not pipeline the initial sync call
      handleEmptyQuery(connection) {
        if (this.rows) {
          connection.sync();
        }
      }
      handleError(err, connection) {
        if (this._canceledDueToError) {
          err = this._canceledDueToError;
          this._canceledDueToError = false;
        }
        if (this.callback) {
          return this.callback(err);
        }
        this.emit("error", err);
      }
      handleReadyForQuery(con) {
        if (this._canceledDueToError) {
          return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
          try {
            this.callback(null, this._results);
          } catch (err) {
            process.nextTick(() => {
              throw err;
            });
          }
        }
        this.emit("end", this._results);
      }
      submit(connection) {
        if (typeof this.text !== "string" && typeof this.name !== "string") {
          return new Error("A query must have either text or a name. Supplying neither is unsupported.");
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
          return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
          return new Error("Query values must be an array");
        }
        if (this.requiresPreparation()) {
          connection.stream.cork && connection.stream.cork();
          try {
            this.prepare(connection);
          } finally {
            connection.stream.uncork && connection.stream.uncork();
          }
        } else {
          connection.query(this.text);
        }
        return null;
      }
      hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
      }
      handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
      }
      _getRows(connection, rows) {
        connection.execute({
          portal: this.portal,
          rows
        });
        if (!rows) {
          connection.sync();
        } else {
          connection.flush();
        }
      }
      // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      prepare(connection) {
        if (!this.hasBeenParsed(connection)) {
          connection.parse({
            text: this.text,
            name: this.name,
            types: this.types
          });
        }
        try {
          connection.bind({
            portal: this.portal,
            statement: this.name,
            values: this.values,
            binary: this.binary,
            valueMapper: utils.prepareValue
          });
        } catch (err) {
          this.handleError(err, connection);
          return;
        }
        connection.describe({
          type: "P",
          name: this.portal || ""
        });
        this._getRows(connection, this.rows);
      }
      handleCopyInResponse(connection) {
        connection.sendCopyFail("No source stream defined");
      }
      handleCopyData(msg, connection) {
      }
    };
    module.exports = Query2;
  }
});

// node_modules/pg-protocol/dist/messages.js
var require_messages = __commonJS({
  "node_modules/pg-protocol/dist/messages.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
    exports.parseComplete = {
      name: "parseComplete",
      length: 5
    };
    exports.bindComplete = {
      name: "bindComplete",
      length: 5
    };
    exports.closeComplete = {
      name: "closeComplete",
      length: 5
    };
    exports.noData = {
      name: "noData",
      length: 5
    };
    exports.portalSuspended = {
      name: "portalSuspended",
      length: 5
    };
    exports.replicationStart = {
      name: "replicationStart",
      length: 4
    };
    exports.emptyQuery = {
      name: "emptyQuery",
      length: 4
    };
    exports.copyDone = {
      name: "copyDone",
      length: 4
    };
    var DatabaseError2 = class extends Error {
      static {
        __name(this, "DatabaseError");
      }
      constructor(message, length, name2) {
        super(message);
        this.length = length;
        this.name = name2;
      }
    };
    exports.DatabaseError = DatabaseError2;
    var CopyDataMessage = class {
      static {
        __name(this, "CopyDataMessage");
      }
      constructor(length, chunk) {
        this.length = length;
        this.chunk = chunk;
        this.name = "copyData";
      }
    };
    exports.CopyDataMessage = CopyDataMessage;
    var CopyResponse = class {
      static {
        __name(this, "CopyResponse");
      }
      constructor(length, name2, binary, columnCount) {
        this.length = length;
        this.name = name2;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
      }
    };
    exports.CopyResponse = CopyResponse;
    var Field = class {
      static {
        __name(this, "Field");
      }
      constructor(name2, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
        this.name = name2;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format;
      }
    };
    exports.Field = Field;
    var RowDescriptionMessage = class {
      static {
        __name(this, "RowDescriptionMessage");
      }
      constructor(length, fieldCount) {
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = "rowDescription";
        this.fields = new Array(this.fieldCount);
      }
    };
    exports.RowDescriptionMessage = RowDescriptionMessage;
    var ParameterDescriptionMessage = class {
      static {
        __name(this, "ParameterDescriptionMessage");
      }
      constructor(length, parameterCount) {
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = "parameterDescription";
        this.dataTypeIDs = new Array(this.parameterCount);
      }
    };
    exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
    var ParameterStatusMessage = class {
      static {
        __name(this, "ParameterStatusMessage");
      }
      constructor(length, parameterName, parameterValue) {
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = "parameterStatus";
      }
    };
    exports.ParameterStatusMessage = ParameterStatusMessage;
    var AuthenticationMD5Password = class {
      static {
        __name(this, "AuthenticationMD5Password");
      }
      constructor(length, salt) {
        this.length = length;
        this.salt = salt;
        this.name = "authenticationMD5Password";
      }
    };
    exports.AuthenticationMD5Password = AuthenticationMD5Password;
    var BackendKeyDataMessage = class {
      static {
        __name(this, "BackendKeyDataMessage");
      }
      constructor(length, processID, secretKey) {
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = "backendKeyData";
      }
    };
    exports.BackendKeyDataMessage = BackendKeyDataMessage;
    var NotificationResponseMessage = class {
      static {
        __name(this, "NotificationResponseMessage");
      }
      constructor(length, processId, channel, payload) {
        this.length = length;
        this.processId = processId;
        this.channel = channel;
        this.payload = payload;
        this.name = "notification";
      }
    };
    exports.NotificationResponseMessage = NotificationResponseMessage;
    var ReadyForQueryMessage = class {
      static {
        __name(this, "ReadyForQueryMessage");
      }
      constructor(length, status) {
        this.length = length;
        this.status = status;
        this.name = "readyForQuery";
      }
    };
    exports.ReadyForQueryMessage = ReadyForQueryMessage;
    var CommandCompleteMessage = class {
      static {
        __name(this, "CommandCompleteMessage");
      }
      constructor(length, text) {
        this.length = length;
        this.text = text;
        this.name = "commandComplete";
      }
    };
    exports.CommandCompleteMessage = CommandCompleteMessage;
    var DataRowMessage = class {
      static {
        __name(this, "DataRowMessage");
      }
      constructor(length, fields) {
        this.length = length;
        this.fields = fields;
        this.name = "dataRow";
        this.fieldCount = fields.length;
      }
    };
    exports.DataRowMessage = DataRowMessage;
    var NoticeMessage = class {
      static {
        __name(this, "NoticeMessage");
      }
      constructor(length, message) {
        this.length = length;
        this.message = message;
        this.name = "notice";
      }
    };
    exports.NoticeMessage = NoticeMessage;
  }
});

// node_modules/pg-protocol/dist/buffer-writer.js
var require_buffer_writer = __commonJS({
  "node_modules/pg-protocol/dist/buffer-writer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Writer = void 0;
    var Writer = class {
      static {
        __name(this, "Writer");
      }
      constructor(size = 256) {
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(size);
      }
      ensure(size) {
        const remaining = this.buffer.length - this.offset;
        if (remaining < size) {
          const oldBuffer = this.buffer;
          const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
          this.buffer = Buffer.allocUnsafe(newSize);
          oldBuffer.copy(this.buffer);
        }
      }
      addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 255;
        this.buffer[this.offset++] = num >>> 16 & 255;
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addCString(string) {
        if (!string) {
          this.ensure(1);
        } else {
          const len = Buffer.byteLength(string);
          this.ensure(len + 1);
          this.buffer.write(string, this.offset, "utf-8");
          this.offset += len;
        }
        this.buffer[this.offset++] = 0;
        return this;
      }
      addString(string = "") {
        const len = Buffer.byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
      }
      add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
      }
      join(code) {
        if (code) {
          this.buffer[this.headerPosition] = code;
          const length = this.offset - (this.headerPosition + 1);
          this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
      }
      flush(code) {
        const result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(this.size);
        return result;
      }
    };
    exports.Writer = Writer;
  }
});

// node_modules/pg-protocol/dist/serializer.js
var require_serializer = __commonJS({
  "node_modules/pg-protocol/dist/serializer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = void 0;
    var buffer_writer_1 = require_buffer_writer();
    var writer = new buffer_writer_1.Writer();
    var startup = /* @__PURE__ */ __name((opts) => {
      writer.addInt16(3).addInt16(0);
      for (const key of Object.keys(opts)) {
        writer.addCString(key).addCString(opts[key]);
      }
      writer.addCString("client_encoding").addCString("UTF8");
      const bodyBuffer = writer.addCString("").flush();
      const length = bodyBuffer.length + 4;
      return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
    }, "startup");
    var requestSsl = /* @__PURE__ */ __name(() => {
      const response = Buffer.allocUnsafe(8);
      response.writeInt32BE(8, 0);
      response.writeInt32BE(80877103, 4);
      return response;
    }, "requestSsl");
    var password = /* @__PURE__ */ __name((password2) => {
      return writer.addCString(password2).flush(
        112
        /* code.startup */
      );
    }, "password");
    var sendSASLInitialResponseMessage = /* @__PURE__ */ __name(function(mechanism, initialResponse) {
      writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
      return writer.flush(
        112
        /* code.startup */
      );
    }, "sendSASLInitialResponseMessage");
    var sendSCRAMClientFinalMessage = /* @__PURE__ */ __name(function(additionalData) {
      return writer.addString(additionalData).flush(
        112
        /* code.startup */
      );
    }, "sendSCRAMClientFinalMessage");
    var query = /* @__PURE__ */ __name((text) => {
      return writer.addCString(text).flush(
        81
        /* code.query */
      );
    }, "query");
    var emptyArray = [];
    var parse = /* @__PURE__ */ __name((query2) => {
      const name2 = query2.name || "";
      if (name2.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", name2, name2.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const types3 = query2.types || emptyArray;
      const len = types3.length;
      const buffer = writer.addCString(name2).addCString(query2.text).addInt16(len);
      for (let i = 0; i < len; i++) {
        buffer.addInt32(types3[i]);
      }
      return writer.flush(
        80
        /* code.parse */
      );
    }, "parse");
    var paramWriter = new buffer_writer_1.Writer();
    var writeValues = /* @__PURE__ */ __name(function(values, valueMapper) {
      for (let i = 0; i < values.length; i++) {
        const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
        if (mappedVal == null) {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(-1);
        } else if (mappedVal instanceof Buffer) {
          writer.addInt16(
            1
            /* ParamType.BINARY */
          );
          paramWriter.addInt32(mappedVal.length);
          paramWriter.add(mappedVal);
        } else {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(Buffer.byteLength(mappedVal));
          paramWriter.addString(mappedVal);
        }
      }
    }, "writeValues");
    var bind = /* @__PURE__ */ __name((config4 = {}) => {
      const portal = config4.portal || "";
      const statement = config4.statement || "";
      const binary = config4.binary || false;
      const values = config4.values || emptyArray;
      const len = values.length;
      writer.addCString(portal).addCString(statement);
      writer.addInt16(len);
      writeValues(values, config4.valueMapper);
      writer.addInt16(len);
      writer.add(paramWriter.flush());
      writer.addInt16(1);
      writer.addInt16(
        binary ? 1 : 0
        /* ParamType.STRING */
      );
      return writer.flush(
        66
        /* code.bind */
      );
    }, "bind");
    var emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
    var execute = /* @__PURE__ */ __name((config4) => {
      if (!config4 || !config4.portal && !config4.rows) {
        return emptyExecute;
      }
      const portal = config4.portal || "";
      const rows = config4.rows || 0;
      const portalLength = Buffer.byteLength(portal);
      const len = 4 + portalLength + 1 + 4;
      const buff = Buffer.allocUnsafe(1 + len);
      buff[0] = 69;
      buff.writeInt32BE(len, 1);
      buff.write(portal, 5, "utf-8");
      buff[portalLength + 5] = 0;
      buff.writeUInt32BE(rows, buff.length - 4);
      return buff;
    }, "execute");
    var cancel = /* @__PURE__ */ __name((processID, secretKey) => {
      const buffer = Buffer.allocUnsafe(16);
      buffer.writeInt32BE(16, 0);
      buffer.writeInt16BE(1234, 4);
      buffer.writeInt16BE(5678, 6);
      buffer.writeInt32BE(processID, 8);
      buffer.writeInt32BE(secretKey, 12);
      return buffer;
    }, "cancel");
    var cstringMessage = /* @__PURE__ */ __name((code, string) => {
      const stringLen = Buffer.byteLength(string);
      const len = 4 + stringLen + 1;
      const buffer = Buffer.allocUnsafe(1 + len);
      buffer[0] = code;
      buffer.writeInt32BE(len, 1);
      buffer.write(string, 5, "utf-8");
      buffer[len] = 0;
      return buffer;
    }, "cstringMessage");
    var emptyDescribePortal = writer.addCString("P").flush(
      68
      /* code.describe */
    );
    var emptyDescribeStatement = writer.addCString("S").flush(
      68
      /* code.describe */
    );
    var describe = /* @__PURE__ */ __name((msg) => {
      return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
    }, "describe");
    var close = /* @__PURE__ */ __name((msg) => {
      const text = `${msg.type}${msg.name || ""}`;
      return cstringMessage(67, text);
    }, "close");
    var copyData = /* @__PURE__ */ __name((chunk) => {
      return writer.add(chunk).flush(
        100
        /* code.copyFromChunk */
      );
    }, "copyData");
    var copyFail = /* @__PURE__ */ __name((message) => {
      return cstringMessage(102, message);
    }, "copyFail");
    var codeOnlyBuffer = /* @__PURE__ */ __name((code) => Buffer.from([code, 0, 0, 0, 4]), "codeOnlyBuffer");
    var flushBuffer = codeOnlyBuffer(
      72
      /* code.flush */
    );
    var syncBuffer = codeOnlyBuffer(
      83
      /* code.sync */
    );
    var endBuffer = codeOnlyBuffer(
      88
      /* code.end */
    );
    var copyDoneBuffer = codeOnlyBuffer(
      99
      /* code.copyDone */
    );
    var serialize = {
      startup,
      password,
      requestSsl,
      sendSASLInitialResponseMessage,
      sendSCRAMClientFinalMessage,
      query,
      parse,
      bind,
      execute,
      describe,
      close,
      flush: /* @__PURE__ */ __name(() => flushBuffer, "flush"),
      sync: /* @__PURE__ */ __name(() => syncBuffer, "sync"),
      end: /* @__PURE__ */ __name(() => endBuffer, "end"),
      copyData,
      copyDone: /* @__PURE__ */ __name(() => copyDoneBuffer, "copyDone"),
      copyFail,
      cancel
    };
    exports.serialize = serialize;
  }
});

// node_modules/pg-protocol/dist/buffer-reader.js
var require_buffer_reader = __commonJS({
  "node_modules/pg-protocol/dist/buffer-reader.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BufferReader = void 0;
    var BufferReader = class {
      static {
        __name(this, "BufferReader");
      }
      constructor(offset = 0) {
        this.offset = offset;
        this.buffer = Buffer.allocUnsafe(0);
        this.encoding = "utf-8";
      }
      setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
      }
      int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
      }
      byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
      }
      int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      uint32() {
        const result = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
      cstring() {
        const start = this.offset;
        let end = start;
        while (this.buffer[end++] !== 0) {
        }
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
      }
      bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
    };
    exports.BufferReader = BufferReader;
  }
});

// node_modules/pg-protocol/dist/parser.js
var require_parser = __commonJS({
  "node_modules/pg-protocol/dist/parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    var messages_1 = require_messages();
    var buffer_reader_1 = require_buffer_reader();
    var CODE_LENGTH = 1;
    var LEN_LENGTH = 4;
    var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
    var LATEINIT_LENGTH = -1;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var Parser = class {
      static {
        __name(this, "Parser");
      }
      constructor(opts) {
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
          throw new Error("Binary mode not supported yet");
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
      }
      parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while (offset + HEADER_LENGTH <= bufferFullLength) {
          const code = this.buffer[offset];
          const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
          const fullMessageLength = CODE_LENGTH + length;
          if (fullMessageLength + offset <= bufferFullLength) {
            const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
            callback(message);
            offset += fullMessageLength;
          } else {
            break;
          }
        }
        if (offset === bufferFullLength) {
          this.buffer = emptyBuffer;
          this.bufferLength = 0;
          this.bufferOffset = 0;
        } else {
          this.bufferLength = bufferFullLength - offset;
          this.bufferOffset = offset;
        }
      }
      mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
          const newLength = this.bufferLength + buffer.byteLength;
          const newFullLength = newLength + this.bufferOffset;
          if (newFullLength > this.buffer.byteLength) {
            let newBuffer;
            if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
              newBuffer = this.buffer;
            } else {
              let newBufferLength = this.buffer.byteLength * 2;
              while (newLength >= newBufferLength) {
                newBufferLength *= 2;
              }
              newBuffer = Buffer.allocUnsafe(newBufferLength);
            }
            this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
            this.buffer = newBuffer;
            this.bufferOffset = 0;
          }
          buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
          this.bufferLength = newLength;
        } else {
          this.buffer = buffer;
          this.bufferOffset = 0;
          this.bufferLength = buffer.byteLength;
        }
      }
      handlePacket(offset, code, length, bytes) {
        const { reader } = this;
        reader.setBuffer(offset, bytes);
        let message;
        switch (code) {
          case 50:
            message = messages_1.bindComplete;
            break;
          case 49:
            message = messages_1.parseComplete;
            break;
          case 51:
            message = messages_1.closeComplete;
            break;
          case 110:
            message = messages_1.noData;
            break;
          case 115:
            message = messages_1.portalSuspended;
            break;
          case 99:
            message = messages_1.copyDone;
            break;
          case 87:
            message = messages_1.replicationStart;
            break;
          case 73:
            message = messages_1.emptyQuery;
            break;
          case 68:
            message = parseDataRowMessage(reader);
            break;
          case 67:
            message = parseCommandCompleteMessage(reader);
            break;
          case 90:
            message = parseReadyForQueryMessage(reader);
            break;
          case 65:
            message = parseNotificationMessage(reader);
            break;
          case 82:
            message = parseAuthenticationResponse(reader, length);
            break;
          case 83:
            message = parseParameterStatusMessage(reader);
            break;
          case 75:
            message = parseBackendKeyData(reader);
            break;
          case 69:
            message = parseErrorMessage(reader, "error");
            break;
          case 78:
            message = parseErrorMessage(reader, "notice");
            break;
          case 84:
            message = parseRowDescriptionMessage(reader);
            break;
          case 116:
            message = parseParameterDescriptionMessage(reader);
            break;
          case 71:
            message = parseCopyInMessage(reader);
            break;
          case 72:
            message = parseCopyOutMessage(reader);
            break;
          case 100:
            message = parseCopyData(reader, length);
            break;
          default:
            return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
        }
        reader.setBuffer(0, emptyBuffer);
        message.length = length;
        return message;
      }
    };
    exports.Parser = Parser;
    var parseReadyForQueryMessage = /* @__PURE__ */ __name((reader) => {
      const status = reader.string(1);
      return new messages_1.ReadyForQueryMessage(LATEINIT_LENGTH, status);
    }, "parseReadyForQueryMessage");
    var parseCommandCompleteMessage = /* @__PURE__ */ __name((reader) => {
      const text = reader.cstring();
      return new messages_1.CommandCompleteMessage(LATEINIT_LENGTH, text);
    }, "parseCommandCompleteMessage");
    var parseCopyData = /* @__PURE__ */ __name((reader, length) => {
      const chunk = reader.bytes(length - 4);
      return new messages_1.CopyDataMessage(LATEINIT_LENGTH, chunk);
    }, "parseCopyData");
    var parseCopyInMessage = /* @__PURE__ */ __name((reader) => parseCopyMessage(reader, "copyInResponse"), "parseCopyInMessage");
    var parseCopyOutMessage = /* @__PURE__ */ __name((reader) => parseCopyMessage(reader, "copyOutResponse"), "parseCopyOutMessage");
    var parseCopyMessage = /* @__PURE__ */ __name((reader, messageName) => {
      const isBinary2 = reader.byte() !== 0;
      const columnCount = reader.int16();
      const message = new messages_1.CopyResponse(LATEINIT_LENGTH, messageName, isBinary2, columnCount);
      for (let i = 0; i < columnCount; i++) {
        message.columnTypes[i] = reader.int16();
      }
      return message;
    }, "parseCopyMessage");
    var parseNotificationMessage = /* @__PURE__ */ __name((reader) => {
      const processId = reader.int32();
      const channel = reader.cstring();
      const payload = reader.cstring();
      return new messages_1.NotificationResponseMessage(LATEINIT_LENGTH, processId, channel, payload);
    }, "parseNotificationMessage");
    var parseRowDescriptionMessage = /* @__PURE__ */ __name((reader) => {
      const fieldCount = reader.int16();
      const message = new messages_1.RowDescriptionMessage(LATEINIT_LENGTH, fieldCount);
      for (let i = 0; i < fieldCount; i++) {
        message.fields[i] = parseField(reader);
      }
      return message;
    }, "parseRowDescriptionMessage");
    var parseField = /* @__PURE__ */ __name((reader) => {
      const name2 = reader.cstring();
      const tableID = reader.uint32();
      const columnID = reader.int16();
      const dataTypeID = reader.uint32();
      const dataTypeSize = reader.int16();
      const dataTypeModifier = reader.int32();
      const mode = reader.int16() === 0 ? "text" : "binary";
      return new messages_1.Field(name2, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
    }, "parseField");
    var parseParameterDescriptionMessage = /* @__PURE__ */ __name((reader) => {
      const parameterCount = reader.int16();
      const message = new messages_1.ParameterDescriptionMessage(LATEINIT_LENGTH, parameterCount);
      for (let i = 0; i < parameterCount; i++) {
        message.dataTypeIDs[i] = reader.int32();
      }
      return message;
    }, "parseParameterDescriptionMessage");
    var parseDataRowMessage = /* @__PURE__ */ __name((reader) => {
      const fieldCount = reader.int16();
      const fields = new Array(fieldCount);
      for (let i = 0; i < fieldCount; i++) {
        const len = reader.int32();
        fields[i] = len === -1 ? null : reader.string(len);
      }
      return new messages_1.DataRowMessage(LATEINIT_LENGTH, fields);
    }, "parseDataRowMessage");
    var parseParameterStatusMessage = /* @__PURE__ */ __name((reader) => {
      const name2 = reader.cstring();
      const value = reader.cstring();
      return new messages_1.ParameterStatusMessage(LATEINIT_LENGTH, name2, value);
    }, "parseParameterStatusMessage");
    var parseBackendKeyData = /* @__PURE__ */ __name((reader) => {
      const processID = reader.int32();
      const secretKey = reader.int32();
      return new messages_1.BackendKeyDataMessage(LATEINIT_LENGTH, processID, secretKey);
    }, "parseBackendKeyData");
    var parseAuthenticationResponse = /* @__PURE__ */ __name((reader, length) => {
      const code = reader.int32();
      const message = {
        name: "authenticationOk",
        length
      };
      switch (code) {
        case 0:
          break;
        case 3:
          if (message.length === 8) {
            message.name = "authenticationCleartextPassword";
          }
          break;
        case 5:
          if (message.length === 12) {
            message.name = "authenticationMD5Password";
            const salt = reader.bytes(4);
            return new messages_1.AuthenticationMD5Password(LATEINIT_LENGTH, salt);
          }
          break;
        case 10:
          {
            message.name = "authenticationSASL";
            message.mechanisms = [];
            let mechanism;
            do {
              mechanism = reader.cstring();
              if (mechanism) {
                message.mechanisms.push(mechanism);
              }
            } while (mechanism);
          }
          break;
        case 11:
          message.name = "authenticationSASLContinue";
          message.data = reader.string(length - 8);
          break;
        case 12:
          message.name = "authenticationSASLFinal";
          message.data = reader.string(length - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + code);
      }
      return message;
    }, "parseAuthenticationResponse");
    var parseErrorMessage = /* @__PURE__ */ __name((reader, name2) => {
      const fields = {};
      let fieldType = reader.string(1);
      while (fieldType !== "\0") {
        fields[fieldType] = reader.cstring();
        fieldType = reader.string(1);
      }
      const messageValue = fields.M;
      const message = name2 === "notice" ? new messages_1.NoticeMessage(LATEINIT_LENGTH, messageValue) : new messages_1.DatabaseError(messageValue, LATEINIT_LENGTH, name2);
      message.severity = fields.S;
      message.code = fields.C;
      message.detail = fields.D;
      message.hint = fields.H;
      message.position = fields.P;
      message.internalPosition = fields.p;
      message.internalQuery = fields.q;
      message.where = fields.W;
      message.schema = fields.s;
      message.table = fields.t;
      message.column = fields.c;
      message.dataType = fields.d;
      message.constraint = fields.n;
      message.file = fields.F;
      message.line = fields.L;
      message.routine = fields.R;
      return message;
    }, "parseErrorMessage");
  }
});

// node_modules/pg-protocol/dist/index.js
var require_dist = __commonJS({
  "node_modules/pg-protocol/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseError = exports.serialize = exports.parse = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return messages_1.DatabaseError;
    }, "get") });
    var serializer_1 = require_serializer();
    Object.defineProperty(exports, "serialize", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return serializer_1.serialize;
    }, "get") });
    var parser_1 = require_parser();
    function parse(stream, callback) {
      const parser = new parser_1.Parser();
      stream.on("data", (buffer) => parser.parse(buffer, callback));
      return new Promise((resolve) => stream.on("end", () => resolve()));
    }
    __name(parse, "parse");
    exports.parse = parse;
  }
});

// node-built-in-modules:net
import libDefault6 from "net";
var require_net = __commonJS({
  "node-built-in-modules:net"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault6;
  }
});

// node-built-in-modules:tls
import libDefault7 from "tls";
var require_tls = __commonJS({
  "node-built-in-modules:tls"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault7;
  }
});

// node_modules/pg-cloudflare/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/pg-cloudflare/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CloudflareSocket = void 0;
    var events_1 = require_events();
    var CloudflareSocket = class extends events_1.EventEmitter {
      static {
        __name(this, "CloudflareSocket");
      }
      constructor(ssl) {
        super();
        this.ssl = ssl;
        this.writable = false;
        this.destroyed = false;
        this._upgrading = false;
        this._upgraded = false;
        this._cfSocket = null;
        this._cfWriter = null;
        this._cfReader = null;
      }
      setNoDelay() {
        return this;
      }
      setKeepAlive() {
        return this;
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      async connect(port, host, connectListener) {
        try {
          log3("connecting");
          if (connectListener)
            this.once("connect", connectListener);
          const options = this.ssl ? { secureTransport: "starttls" } : {};
          const mod2 = await import("cloudflare:sockets");
          const connect = mod2.connect;
          this._cfSocket = connect(`${host}:${port}`, options);
          this._cfWriter = this._cfSocket.writable.getWriter();
          this._addClosedHandler();
          this._cfReader = this._cfSocket.readable.getReader();
          if (this.ssl) {
            this._listenOnce().catch((e7) => this.emit("error", e7));
          } else {
            this._listen().catch((e7) => this.emit("error", e7));
          }
          await this._cfWriter.ready;
          log3("socket ready");
          this.writable = true;
          this.emit("connect");
          return this;
        } catch (e7) {
          this.emit("error", e7);
        }
      }
      async _listen() {
        while (true) {
          log3("awaiting receive from CF socket");
          const { done, value } = await this._cfReader.read();
          log3("CF socket received:", done, value);
          if (done) {
            log3("done");
            break;
          }
          this.emit("data", Buffer.from(value));
        }
      }
      async _listenOnce() {
        log3("awaiting first receive from CF socket");
        const { done, value } = await this._cfReader.read();
        log3("First CF socket received:", done, value);
        this.emit("data", Buffer.from(value));
      }
      write(data, encoding = "utf8", callback = () => {
      }) {
        if (data.length === 0)
          return callback();
        if (typeof data === "string")
          data = Buffer.from(data, encoding);
        log3("sending data direct:", data);
        this._cfWriter.write(data).then(() => {
          log3("data sent");
          callback();
        }, (err) => {
          log3("send error", err);
          callback(err);
        });
        return true;
      }
      end(data = Buffer.alloc(0), encoding = "utf8", callback = () => {
      }) {
        log3("ending CF socket");
        this.write(data, encoding, (err) => {
          this._cfSocket.close();
          if (callback)
            callback(err);
        });
        return this;
      }
      destroy(reason) {
        log3("destroying CF socket", reason);
        this.destroyed = true;
        return this.end();
      }
      startTls(options) {
        if (this._upgraded) {
          this.emit("error", "Cannot call `startTls()` more than once on a socket");
          return;
        }
        this._cfWriter.releaseLock();
        this._cfReader.releaseLock();
        this._upgrading = true;
        this._cfSocket = this._cfSocket.startTls(options);
        this._cfWriter = this._cfSocket.writable.getWriter();
        this._cfReader = this._cfSocket.readable.getReader();
        this._addClosedHandler();
        this._listen().catch((e7) => this.emit("error", e7));
      }
      _addClosedHandler() {
        this._cfSocket.closed.then(() => {
          if (!this._upgrading) {
            log3("CF socket closed");
            this._cfSocket = null;
            this.emit("close");
          } else {
            this._upgrading = false;
            this._upgraded = true;
          }
        }).catch((e7) => this.emit("error", e7));
      }
    };
    exports.CloudflareSocket = CloudflareSocket;
    var debug3 = false;
    function dump(data) {
      if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
        const hex = Buffer.from(data).toString("hex");
        const str = new TextDecoder().decode(data);
        return `
>>> STR: "${str.replace(/\n/g, "\\n")}"
>>> HEX: ${hex}
`;
      } else {
        return data;
      }
    }
    __name(dump, "dump");
    function log3(...args) {
      debug3 && console.log(...args.map(dump));
    }
    __name(log3, "log");
  }
});

// node_modules/pg/lib/stream.js
var require_stream = __commonJS({
  "node_modules/pg/lib/stream.js"(exports, module) {
    init_modules_watch_stub();
    var { getStream, getSecureStream } = getStreamFuncs();
    module.exports = {
      /**
       * Get a socket stream compatible with the current runtime environment.
       * @returns {Duplex}
       */
      getStream,
      /**
       * Get a TLS secured socket, compatible with the current environment,
       * using the socket and other settings given in `options`.
       * @returns {Duplex}
       */
      getSecureStream
    };
    function getNodejsStreamFuncs() {
      function getStream2(ssl) {
        const net = require_net();
        return new net.Socket();
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        const tls = require_tls();
        return tls.connect(options);
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getNodejsStreamFuncs, "getNodejsStreamFuncs");
    function getCloudflareStreamFuncs() {
      function getStream2(ssl) {
        const { CloudflareSocket } = require_dist2();
        return new CloudflareSocket(ssl);
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        options.socket.startTls(options);
        return options.socket;
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getCloudflareStreamFuncs, "getCloudflareStreamFuncs");
    function isCloudflareRuntime() {
      if (typeof navigator === "object" && navigator !== null && true) {
        return true;
      }
      if (typeof Response === "function") {
        const resp = new Response(null, { cf: { thing: true } });
        if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
          return true;
        }
      }
      return false;
    }
    __name(isCloudflareRuntime, "isCloudflareRuntime");
    function getStreamFuncs() {
      if (isCloudflareRuntime()) {
        return getCloudflareStreamFuncs();
      }
      return getNodejsStreamFuncs();
    }
    __name(getStreamFuncs, "getStreamFuncs");
  }
});

// node_modules/pg/lib/connection.js
var require_connection = __commonJS({
  "node_modules/pg/lib/connection.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var EventEmitter = require_events().EventEmitter;
    var { parse, serialize } = require_dist();
    var { getStream, getSecureStream } = require_stream();
    var flushBuffer = serialize.flush();
    var syncBuffer = serialize.sync();
    var endBuffer = serialize.end();
    var Connection2 = class extends EventEmitter {
      static {
        __name(this, "Connection");
      }
      constructor(config4) {
        super();
        config4 = config4 || {};
        this.stream = config4.stream || getStream(config4.ssl);
        if (typeof this.stream === "function") {
          this.stream = this.stream(config4);
        }
        this._keepAlive = config4.keepAlive;
        this._keepAliveInitialDelayMillis = config4.keepAliveInitialDelayMillis;
        this.parsedStatements = {};
        this.ssl = config4.ssl || false;
        this._ending = false;
        this._emitMessage = false;
        const self2 = this;
        this.on("newListener", function(eventName) {
          if (eventName === "message") {
            self2._emitMessage = true;
          }
        });
      }
      connect(port, host) {
        const self2 = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once("connect", function() {
          if (self2._keepAlive) {
            self2.stream.setKeepAlive(true, self2._keepAliveInitialDelayMillis);
          }
          self2.emit("connect");
        });
        const reportStreamError = /* @__PURE__ */ __name(function(error) {
          if (self2._ending && (error.code === "ECONNRESET" || error.code === "EPIPE")) {
            return;
          }
          self2.emit("error", error);
        }, "reportStreamError");
        this.stream.on("error", reportStreamError);
        this.stream.on("close", function() {
          self2.emit("end");
        });
        if (!this.ssl) {
          return this.attachListeners(this.stream);
        }
        this.stream.once("data", function(buffer) {
          const responseCode = buffer.toString("utf8");
          switch (responseCode) {
            case "S":
              break;
            case "N":
              self2.stream.end();
              return self2.emit("error", new Error("The server does not support SSL connections"));
            default:
              self2.stream.end();
              return self2.emit("error", new Error("There was an error establishing an SSL connection"));
          }
          const options = {
            socket: self2.stream
          };
          if (self2.ssl !== true) {
            Object.assign(options, self2.ssl);
            if ("key" in self2.ssl) {
              options.key = self2.ssl.key;
            }
          }
          const net = require_net();
          if (net.isIP && net.isIP(host) === 0) {
            options.servername = host;
          }
          try {
            self2.stream = getSecureStream(options);
          } catch (err) {
            return self2.emit("error", err);
          }
          self2.attachListeners(self2.stream);
          self2.stream.on("error", reportStreamError);
          self2.emit("sslconnect");
        });
      }
      attachListeners(stream) {
        parse(stream, (msg) => {
          const eventName = msg.name === "error" ? "errorMessage" : msg.name;
          if (this._emitMessage) {
            this.emit("message", msg);
          }
          this.emit(eventName, msg);
        });
      }
      requestSsl() {
        this.stream.write(serialize.requestSsl());
      }
      startup(config4) {
        this.stream.write(serialize.startup(config4));
      }
      cancel(processID, secretKey) {
        this._send(serialize.cancel(processID, secretKey));
      }
      password(password) {
        this._send(serialize.password(password));
      }
      sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
      }
      sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
      }
      _send(buffer) {
        if (!this.stream.writable) {
          return false;
        }
        return this.stream.write(buffer);
      }
      query(text) {
        this._send(serialize.query(text));
      }
      // send parse message
      parse(query) {
        this._send(serialize.parse(query));
      }
      // send bind message
      bind(config4) {
        this._send(serialize.bind(config4));
      }
      // send execute message
      execute(config4) {
        this._send(serialize.execute(config4));
      }
      flush() {
        if (this.stream.writable) {
          this.stream.write(flushBuffer);
        }
      }
      sync() {
        this._ending = true;
        this._send(syncBuffer);
      }
      ref() {
        this.stream.ref();
      }
      unref() {
        this.stream.unref();
      }
      end() {
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
          this.stream.end();
          return;
        }
        return this.stream.write(endBuffer, () => {
          this.stream.end();
        });
      }
      close(msg) {
        this._send(serialize.close(msg));
      }
      describe(msg) {
        this._send(serialize.describe(msg));
      }
      sendCopyFromChunk(chunk) {
        this._send(serialize.copyData(chunk));
      }
      endCopyFrom() {
        this._send(serialize.copyDone());
      }
      sendCopyFail(msg) {
        this._send(serialize.copyFail(msg));
      }
    };
    module.exports = Connection2;
  }
});

// node-built-in-modules:path
import libDefault8 from "path";
var require_path = __commonJS({
  "node-built-in-modules:path"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault8;
  }
});

// node-built-in-modules:stream
import libDefault9 from "stream";
var require_stream2 = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault9;
  }
});

// node-built-in-modules:string_decoder
import libDefault10 from "string_decoder";
var require_string_decoder = __commonJS({
  "node-built-in-modules:string_decoder"(exports, module) {
    init_modules_watch_stub();
    module.exports = libDefault10;
  }
});

// node_modules/split2/index.js
var require_split2 = __commonJS({
  "node_modules/split2/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var { Transform } = require_stream2();
    var { StringDecoder } = require_string_decoder();
    var kLast = /* @__PURE__ */ Symbol("last");
    var kDecoder = /* @__PURE__ */ Symbol("decoder");
    function transform(chunk, enc, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i = 0; i < list.length; i++) {
        try {
          push(this, this.mapper(list[i]));
        } catch (error) {
          return cb(error);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    __name(transform, "transform");
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push(this, this.mapper(this[kLast]));
        } catch (error) {
          return cb(error);
        }
      }
      cb();
    }
    __name(flush, "flush");
    function push(self2, val) {
      if (val !== void 0) {
        self2.push(val);
      }
    }
    __name(push, "push");
    function noop(incoming) {
      return incoming;
    }
    __name(noop, "noop");
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    __name(split, "split");
    module.exports = split;
  }
});

// node_modules/pgpass/lib/helper.js
var require_helper = __commonJS({
  "node_modules/pgpass/lib/helper.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var path = require_path();
    var Stream = require_stream2().Stream;
    var split = require_split2();
    var util = require_util();
    var defaultPort = 5432;
    var isWin = process.platform === "win32";
    var warnStream = process.stderr;
    var S_IRWXG = 56;
    var S_IRWXO = 7;
    var S_IFMT = 61440;
    var S_IFREG = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT) == S_IFREG;
    }
    __name(isRegFile, "isRegFile");
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn() {
      var isWritable = warnStream instanceof Stream && true === warnStream.writable;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
      }
    }
    __name(warn, "warn");
    Object.defineProperty(module.exports, "isWin", {
      get: /* @__PURE__ */ __name(function() {
        return isWin;
      }, "get"),
      set: /* @__PURE__ */ __name(function(val) {
        isWin = val;
      }, "set")
    });
    module.exports.warnTo = function(stream) {
      var old = warnStream;
      warnStream = stream;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env = rawEnv || process.env;
      var file = env.PGPASSFILE || (isWin ? path.join(env.APPDATA || "./", "postgresql", "pgpass.conf") : path.join(env.HOME || "./", ".pgpass"));
      return file;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG | S_IRWXO)) {
        warn('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
            return prev && true;
          }
        }
        return prev && (entry[field] === "*" || entry[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream, cb) {
      var pass;
      var lineStream = stream.pipe(split());
      function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
          pass = entry[passKey];
          lineStream.end();
        }
      }
      __name(onLine, "onLine");
      var onEnd = /* @__PURE__ */ __name(function() {
        stream.destroy();
        cb(pass);
      }, "onEnd");
      var onErr = /* @__PURE__ */ __name(function(err) {
        stream.destroy();
        warn("WARNING: error on reading file: %s", err);
        cb(void 0);
      }, "onErr");
      stream.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var endIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = /* @__PURE__ */ __name(function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      }, "addToObj");
      for (var i = 0; i < line.length - 1; i += 1) {
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i + 1);
          startIdx = i + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry) {
      var rules = {
        // host
        0: function(x4) {
          return x4.length > 0;
        },
        // port
        1: function(x4) {
          if (x4 === "*") {
            return true;
          }
          x4 = Number(x4);
          return isFinite(x4) && x4 > 0 && x4 < 9007199254740992 && Math.floor(x4) === x4;
        },
        // database
        2: function(x4) {
          return x4.length > 0;
        },
        // username
        3: function(x4) {
          return x4.length > 0;
        },
        // password
        4: function(x4) {
          return x4.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/pgpass/lib/index.js
var require_lib = __commonJS({
  "node_modules/pgpass/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var path = require_path();
    var fs2 = require_fs();
    var helper = require_helper();
    module.exports = function(connInfo, cb) {
      var file = helper.getFileName();
      fs2.stat(file, function(err, stat) {
        if (err || !helper.usePgPass(stat, file)) {
          return cb(void 0);
        }
        var st2 = fs2.createReadStream(file);
        helper.getPassword(connInfo, st2, cb);
      });
    };
    module.exports.warnTo = helper.warnTo;
  }
});

// node_modules/pg/lib/client.js
var require_client = __commonJS({
  "node_modules/pg/lib/client.js"(exports, module) {
    init_modules_watch_stub();
    var EventEmitter = require_events().EventEmitter;
    var utils = require_utils();
    var nodeUtils = require_util();
    var sasl = require_sasl();
    var TypeOverrides2 = require_type_overrides();
    var ConnectionParameters = require_connection_parameters();
    var Query2 = require_query();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var crypto2 = require_utils2();
    var activeQueryDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Client.activeQuery is deprecated and will be removed in pg@9.0"
    );
    var queryQueueDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Client.queryQueue is deprecated and will be removed in pg@9.0."
    );
    var pgPassDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "pgpass support is deprecated and will be removed in pg@9.0. You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code."
    );
    var byoPromiseDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0."
    );
    var queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
    );
    var Client2 = class extends EventEmitter {
      static {
        __name(this, "Client");
      }
      constructor(config4) {
        super();
        this.connectionParameters = new ConnectionParameters(config4);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        const c2 = config4 || {};
        if (c2.Promise) {
          byoPromiseDeprecationNotice();
        }
        this._Promise = c2.Promise || global.Promise;
        this._types = new TypeOverrides2(c2.types);
        this._ending = false;
        this._ended = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this._activeQuery = null;
        this.enableChannelBinding = Boolean(c2.enableChannelBinding);
        this.connection = c2.connection || new Connection2({
          stream: c2.stream,
          ssl: this.connectionParameters.ssl,
          keepAlive: c2.keepAlive || false,
          keepAliveInitialDelayMillis: c2.keepAliveInitialDelayMillis || 0,
          encoding: this.connectionParameters.client_encoding || "utf8"
        });
        this._queryQueue = [];
        this.binary = c2.binary || defaults2.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this._connectionTimeoutMillis = c2.connectionTimeoutMillis || 0;
      }
      get activeQuery() {
        activeQueryDeprecationNotice();
        return this._activeQuery;
      }
      set activeQuery(val) {
        activeQueryDeprecationNotice();
        this._activeQuery = val;
      }
      _getActiveQuery() {
        return this._activeQuery;
      }
      _errorAllQueries(err) {
        const enqueueError = /* @__PURE__ */ __name((query) => {
          process.nextTick(() => {
            query.handleError(err, this.connection);
          });
        }, "enqueueError");
        const activeQuery = this._getActiveQuery();
        if (activeQuery) {
          enqueueError(activeQuery);
          this._activeQuery = null;
        }
        this._queryQueue.forEach(enqueueError);
        this._queryQueue.length = 0;
      }
      _connect(callback) {
        const self2 = this;
        const con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
          const err = new Error("Client has already been connected. You cannot reuse a client.");
          process.nextTick(() => {
            callback(err);
          });
          return;
        }
        this._connecting = true;
        if (this._connectionTimeoutMillis > 0) {
          this.connectionTimeoutHandle = setTimeout(() => {
            con._ending = true;
            con.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis);
          if (this.connectionTimeoutHandle.unref) {
            this.connectionTimeoutHandle.unref();
          }
        }
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          if (self2.ssl) {
            con.requestSsl();
          } else {
            con.startup(self2.getStartupConf());
          }
        });
        con.on("sslconnect", function() {
          con.startup(self2.getStartupConf());
        });
        this._attachListeners(con);
        con.once("end", () => {
          const error = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
          clearTimeout(this.connectionTimeoutHandle);
          this._errorAllQueries(error);
          this._ended = true;
          if (!this._ending) {
            if (this._connecting && !this._connectionError) {
              if (this._connectionCallback) {
                this._connectionCallback(error);
              } else {
                this._handleErrorEvent(error);
              }
            } else if (!this._connectionError) {
              this._handleErrorEvent(error);
            }
          }
          process.nextTick(() => {
            this.emit("end");
          });
        });
      }
      connect(callback) {
        if (callback) {
          this._connect(callback);
          return;
        }
        return new this._Promise((resolve, reject) => {
          this._connect((error) => {
            if (error) {
              reject(error);
            } else {
              resolve(this);
            }
          });
        });
      }
      _attachListeners(con) {
        con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
        con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
        con.on("authenticationSASL", this._handleAuthSASL.bind(this));
        con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
        con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
        con.on("backendKeyData", this._handleBackendKeyData.bind(this));
        con.on("error", this._handleErrorEvent.bind(this));
        con.on("errorMessage", this._handleErrorMessage.bind(this));
        con.on("readyForQuery", this._handleReadyForQuery.bind(this));
        con.on("notice", this._handleNotice.bind(this));
        con.on("rowDescription", this._handleRowDescription.bind(this));
        con.on("dataRow", this._handleDataRow.bind(this));
        con.on("portalSuspended", this._handlePortalSuspended.bind(this));
        con.on("emptyQuery", this._handleEmptyQuery.bind(this));
        con.on("commandComplete", this._handleCommandComplete.bind(this));
        con.on("parseComplete", this._handleParseComplete.bind(this));
        con.on("copyInResponse", this._handleCopyInResponse.bind(this));
        con.on("copyData", this._handleCopyData.bind(this));
        con.on("notification", this._handleNotification.bind(this));
      }
      _getPassword(cb) {
        const con = this.connection;
        if (typeof this.password === "function") {
          this._Promise.resolve().then(() => this.password(this.connectionParameters)).then((pass) => {
            if (pass !== void 0) {
              if (typeof pass !== "string") {
                con.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = pass;
            } else {
              this.connectionParameters.password = this.password = null;
            }
            cb();
          }).catch((err) => {
            con.emit("error", err);
          });
        } else if (this.password !== null) {
          cb();
        } else {
          try {
            const pgPass = require_lib();
            pgPass(this.connectionParameters, (pass) => {
              if (void 0 !== pass) {
                pgPassDeprecationNotice();
                this.connectionParameters.password = this.password = pass;
              }
              cb();
            });
          } catch (e7) {
            this.emit("error", e7);
          }
        }
      }
      _handleAuthCleartextPassword(msg) {
        this._getPassword(() => {
          this.connection.password(this.password);
        });
      }
      _handleAuthMD5Password(msg) {
        this._getPassword(async () => {
          try {
            const hashedPassword = await crypto2.postgresMd5PasswordHash(this.user, this.password, msg.salt);
            this.connection.password(hashedPassword);
          } catch (e7) {
            this.emit("error", e7);
          }
        });
      }
      _handleAuthSASL(msg) {
        this._getPassword(() => {
          try {
            this.saslSession = sasl.startSession(msg.mechanisms, this.enableChannelBinding && this.connection.stream);
            this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
          } catch (err) {
            this.connection.emit("error", err);
          }
        });
      }
      async _handleAuthSASLContinue(msg) {
        try {
          await sasl.continueSession(
            this.saslSession,
            this.password,
            msg.data,
            this.enableChannelBinding && this.connection.stream
          );
          this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleAuthSASLFinal(msg) {
        try {
          sasl.finalizeSession(this.saslSession, msg.data);
          this.saslSession = null;
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
      }
      _handleReadyForQuery(msg) {
        if (this._connecting) {
          this._connecting = false;
          this._connected = true;
          clearTimeout(this.connectionTimeoutHandle);
          if (this._connectionCallback) {
            this._connectionCallback(null, this);
            this._connectionCallback = null;
          }
          this.emit("connect");
        }
        const activeQuery = this._getActiveQuery();
        this._activeQuery = null;
        this.readyForQuery = true;
        if (activeQuery) {
          activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
      }
      // if we receive an error event or error message
      // during the connection process we handle it here
      _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
          return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          return this._connectionCallback(err);
        }
        this.emit("error", err);
      }
      // if we're connected and we receive an error event from the connection
      // this means the socket is dead - do a hard abort of all queries and emit
      // the socket error on the client as well
      _handleErrorEvent(err) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit("error", err);
      }
      // handle error messages from the postgres backend
      _handleErrorMessage(msg) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this._getActiveQuery();
        if (!activeQuery) {
          this._handleErrorEvent(msg);
          return;
        }
        this._activeQuery = null;
        activeQuery.handleError(msg, this.connection);
      }
      _handleRowDescription(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected rowDescription message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        activeQuery.handleRowDescription(msg);
      }
      _handleDataRow(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected dataRow message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        activeQuery.handleDataRow(msg);
      }
      _handlePortalSuspended(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected portalSuspended message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        activeQuery.handlePortalSuspended(this.connection);
      }
      _handleEmptyQuery(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected emptyQuery message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        activeQuery.handleEmptyQuery(this.connection);
      }
      _handleCommandComplete(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected commandComplete message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        activeQuery.handleCommandComplete(msg, this.connection);
      }
      _handleParseComplete() {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected parseComplete message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        if (activeQuery.name) {
          this.connection.parsedStatements[activeQuery.name] = activeQuery.text;
        }
      }
      _handleCopyInResponse(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected copyInResponse message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        activeQuery.handleCopyInResponse(this.connection);
      }
      _handleCopyData(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error = new Error("Received unexpected copyData message from backend.");
          this._handleErrorEvent(error);
          return;
        }
        activeQuery.handleCopyData(msg, this.connection);
      }
      _handleNotification(msg) {
        this.emit("notification", msg);
      }
      _handleNotice(msg) {
        this.emit("notice", msg);
      }
      getStartupConf() {
        const params = this.connectionParameters;
        const data = {
          user: params.user,
          database: params.database
        };
        const appName = params.application_name || params.fallback_application_name;
        if (appName) {
          data.application_name = appName;
        }
        if (params.replication) {
          data.replication = "" + params.replication;
        }
        if (params.statement_timeout) {
          data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.lock_timeout) {
          data.lock_timeout = String(parseInt(params.lock_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
          data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
          data.options = params.options;
        }
        return data;
      }
      cancel(client, query) {
        if (client.activeQuery === query) {
          const con = this.connection;
          if (this.host && this.host.indexOf("/") === 0) {
            con.connect(this.host + "/.s.PGSQL." + this.port);
          } else {
            con.connect(this.port, this.host);
          }
          con.on("connect", function() {
            con.cancel(client.processID, client.secretKey);
          });
        } else if (client._queryQueue.indexOf(query) !== -1) {
          client._queryQueue.splice(client._queryQueue.indexOf(query), 1);
        }
      }
      setTypeParser(oid, format, parseFn) {
        return this._types.setTypeParser(oid, format, parseFn);
      }
      getTypeParser(oid, format) {
        return this._types.getTypeParser(oid, format);
      }
      // escapeIdentifier and escapeLiteral moved to utility functions & exported
      // on PG
      // re-exported here for backwards compatibility
      escapeIdentifier(str) {
        return utils.escapeIdentifier(str);
      }
      escapeLiteral(str) {
        return utils.escapeLiteral(str);
      }
      _pulseQueryQueue() {
        if (this.readyForQuery === true) {
          this._activeQuery = this._queryQueue.shift();
          const activeQuery = this._getActiveQuery();
          if (activeQuery) {
            this.readyForQuery = false;
            this.hasExecuted = true;
            const queryError = activeQuery.submit(this.connection);
            if (queryError) {
              process.nextTick(() => {
                activeQuery.handleError(queryError, this.connection);
                this.readyForQuery = true;
                this._pulseQueryQueue();
              });
            }
          } else if (this.hasExecuted) {
            this._activeQuery = null;
            this.emit("drain");
          }
        }
      }
      query(config4, values, callback) {
        let query;
        let result;
        let readTimeout;
        let readTimeoutTimer;
        let queryCallback;
        if (config4 === null || config4 === void 0) {
          throw new TypeError("Client was passed a null or undefined query");
        } else if (typeof config4.submit === "function") {
          readTimeout = config4.query_timeout || this.connectionParameters.query_timeout;
          result = query = config4;
          if (!query.callback) {
            if (typeof values === "function") {
              query.callback = values;
            } else if (callback) {
              query.callback = callback;
            }
          }
        } else {
          readTimeout = config4.query_timeout || this.connectionParameters.query_timeout;
          query = new Query2(config4, values, callback);
          if (!query.callback) {
            result = new this._Promise((resolve, reject) => {
              query.callback = (err, res) => err ? reject(err) : resolve(res);
            }).catch((err) => {
              Error.captureStackTrace(err);
              throw err;
            });
          }
        }
        if (readTimeout) {
          queryCallback = query.callback || (() => {
          });
          readTimeoutTimer = setTimeout(() => {
            const error = new Error("Query read timeout");
            process.nextTick(() => {
              query.handleError(error, this.connection);
            });
            queryCallback(error);
            query.callback = () => {
            };
            const index = this._queryQueue.indexOf(query);
            if (index > -1) {
              this._queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
          }, readTimeout);
          query.callback = (err, res) => {
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
          };
        }
        if (this.binary && !query.binary) {
          query.binary = true;
        }
        if (query._result && !query._result._types) {
          query._result._types = this._types;
        }
        if (!this._queryable) {
          process.nextTick(() => {
            query.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._ending) {
          process.nextTick(() => {
            query.handleError(new Error("Client was closed and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._queryQueue.length > 0) {
          queryQueueLengthDeprecationNotice();
        }
        this._queryQueue.push(query);
        this._pulseQueryQueue();
        return result;
      }
      ref() {
        this.connection.ref();
      }
      unref() {
        this.connection.unref();
      }
      end(cb) {
        this._ending = true;
        if (!this.connection._connecting || this._ended) {
          if (cb) {
            cb();
          } else {
            return this._Promise.resolve();
          }
        }
        if (this._getActiveQuery() || !this._queryable) {
          this.connection.stream.destroy();
        } else {
          this.connection.end();
        }
        if (cb) {
          this.connection.once("end", cb);
        } else {
          return new this._Promise((resolve) => {
            this.connection.once("end", resolve);
          });
        }
      }
      get queryQueue() {
        queryQueueDeprecationNotice();
        return this._queryQueue;
      }
    };
    Client2.Query = Query2;
    module.exports = Client2;
  }
});

// node_modules/pg-pool/index.js
var require_pg_pool = __commonJS({
  "node_modules/pg-pool/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var EventEmitter = require_events().EventEmitter;
    var NOOP = /* @__PURE__ */ __name(function() {
    }, "NOOP");
    var removeWhere = /* @__PURE__ */ __name((list, predicate) => {
      const i = list.findIndex(predicate);
      return i === -1 ? void 0 : list.splice(i, 1)[0];
    }, "removeWhere");
    var IdleItem = class {
      static {
        __name(this, "IdleItem");
      }
      constructor(client, idleListener, timeoutId) {
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
      }
    };
    var PendingItem = class {
      static {
        __name(this, "PendingItem");
      }
      constructor(callback) {
        this.callback = callback;
      }
    };
    function throwOnDoubleRelease() {
      throw new Error("Release called on client which has already been released to the pool.");
    }
    __name(throwOnDoubleRelease, "throwOnDoubleRelease");
    function promisify(Promise2, callback) {
      if (callback) {
        return { callback, result: void 0 };
      }
      let rej;
      let res;
      const cb = /* @__PURE__ */ __name(function(err, client) {
        err ? rej(err) : res(client);
      }, "cb");
      const result = new Promise2(function(resolve, reject) {
        res = resolve;
        rej = reject;
      }).catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });
      return { callback: cb, result };
    }
    __name(promisify, "promisify");
    function makeIdleListener(pool, client) {
      return /* @__PURE__ */ __name(function idleListener(err) {
        err.client = client;
        client.removeListener("error", idleListener);
        client.on("error", () => {
          pool.log("additional client error after disconnection due to error", err);
        });
        pool._remove(client);
        pool.emit("error", err, client);
      }, "idleListener");
    }
    __name(makeIdleListener, "makeIdleListener");
    var Pool2 = class extends EventEmitter {
      static {
        __name(this, "Pool");
      }
      constructor(options, Client2) {
        super();
        this.options = Object.assign({}, options);
        if (options != null && "password" in options) {
          Object.defineProperty(this.options, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: options.password
          });
        }
        if (options != null && options.ssl && options.ssl.key) {
          Object.defineProperty(this.options.ssl, "key", {
            enumerable: false
          });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.min = this.options.min || 0;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {
        };
        this.Client = this.options.Client || Client2 || require_lib2().Client;
        this.Promise = this.options.Promise || global.Promise;
        if (typeof this.options.idleTimeoutMillis === "undefined") {
          this.options.idleTimeoutMillis = 1e4;
        }
        this._clients = [];
        this._idle = [];
        this._expired = /* @__PURE__ */ new WeakSet();
        this._pendingQueue = [];
        this._endCallback = void 0;
        this.ending = false;
        this.ended = false;
      }
      _promiseTry(f3) {
        const Promise2 = this.Promise;
        if (typeof Promise2.try === "function") {
          return Promise2.try(f3);
        }
        return new Promise2((resolve) => resolve(f3()));
      }
      _isFull() {
        return this._clients.length >= this.options.max;
      }
      _isAboveMin() {
        return this._clients.length > this.options.min;
      }
      _pulseQueue() {
        this.log("pulse queue");
        if (this.ended) {
          this.log("pulse queue ended");
          return;
        }
        if (this.ending) {
          this.log("pulse queue on ending");
          if (this._idle.length) {
            this._idle.slice().map((item) => {
              this._remove(item.client);
            });
          }
          if (!this._clients.length) {
            this.ended = true;
            this._endCallback();
          }
          return;
        }
        if (!this._pendingQueue.length) {
          this.log("no queued requests");
          return;
        }
        if (!this._idle.length && this._isFull()) {
          return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
          const idleItem = this._idle.pop();
          clearTimeout(idleItem.timeoutId);
          const client = idleItem.client;
          client.ref && client.ref();
          const idleListener = idleItem.idleListener;
          return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
          return this.newClient(pendingItem);
        }
        throw new Error("unexpected condition");
      }
      _remove(client, callback) {
        const removed = removeWhere(this._idle, (item) => item.client === client);
        if (removed !== void 0) {
          clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c2) => c2 !== client);
        const context = this;
        client.end(() => {
          context.emit("remove", client);
          if (typeof callback === "function") {
            callback();
          }
        });
      }
      connect(cb) {
        if (this.ending) {
          const err = new Error("Cannot use a pool after calling end on the pool");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify(this.Promise, cb);
        const result = response.result;
        if (this._isFull() || this._idle.length) {
          if (this._idle.length) {
            process.nextTick(() => this._pulseQueue());
          }
          if (!this.options.connectionTimeoutMillis) {
            this._pendingQueue.push(new PendingItem(response.callback));
            return result;
          }
          const queueCallback = /* @__PURE__ */ __name((err, res, done) => {
            clearTimeout(tid);
            response.callback(err, res, done);
          }, "queueCallback");
          const pendingItem = new PendingItem(queueCallback);
          const tid = setTimeout(() => {
            removeWhere(this._pendingQueue, (i) => i.callback === queueCallback);
            pendingItem.timedOut = true;
            response.callback(new Error("timeout exceeded when trying to connect"));
          }, this.options.connectionTimeoutMillis);
          if (tid.unref) {
            tid.unref();
          }
          this._pendingQueue.push(pendingItem);
          return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
      }
      newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log("checking client timeout");
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
          tid = setTimeout(() => {
            if (client.connection) {
              this.log("ending client due to timeout");
              timeoutHit = true;
              client.connection.stream.destroy();
            } else if (!client.isConnected()) {
              this.log("ending client due to timeout");
              timeoutHit = true;
              client.end();
            }
          }, this.options.connectionTimeoutMillis);
        }
        this.log("connecting new client");
        client.connect((err) => {
          if (tid) {
            clearTimeout(tid);
          }
          client.on("error", idleListener);
          if (err) {
            this.log("client failed to connect", err);
            this._clients = this._clients.filter((c2) => c2 !== client);
            if (timeoutHit) {
              err = new Error("Connection terminated due to connection timeout", { cause: err });
            }
            this._pulseQueue();
            if (!pendingItem.timedOut) {
              pendingItem.callback(err, void 0, NOOP);
            }
          } else {
            this.log("new client connected");
            if (this.options.onConnect) {
              this._promiseTry(() => this.options.onConnect(client)).then(
                () => {
                  this._afterConnect(client, pendingItem, idleListener);
                },
                (hookErr) => {
                  this._clients = this._clients.filter((c2) => c2 !== client);
                  client.end(() => {
                    this._pulseQueue();
                    if (!pendingItem.timedOut) {
                      pendingItem.callback(hookErr, void 0, NOOP);
                    }
                  });
                }
              );
              return;
            }
            return this._afterConnect(client, pendingItem, idleListener);
          }
        });
      }
      _afterConnect(client, pendingItem, idleListener) {
        if (this.options.maxLifetimeSeconds !== 0) {
          const maxLifetimeTimeout = setTimeout(() => {
            this.log("ending client due to expired lifetime");
            this._expired.add(client);
            const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client);
            if (idleIndex !== -1) {
              this._acquireClient(
                client,
                new PendingItem((err, client2, clientRelease) => clientRelease()),
                idleListener,
                false
              );
            }
          }, this.options.maxLifetimeSeconds * 1e3);
          maxLifetimeTimeout.unref();
          client.once("end", () => clearTimeout(maxLifetimeTimeout));
        }
        return this._acquireClient(client, pendingItem, idleListener, true);
      }
      // acquire a client for a pending work item
      _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
          this.emit("connect", client);
        }
        this.emit("acquire", client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener("error", idleListener);
        if (!pendingItem.timedOut) {
          if (isNew && this.options.verify) {
            this.options.verify(client, (err) => {
              if (err) {
                client.release(err);
                return pendingItem.callback(err, void 0, NOOP);
              }
              pendingItem.callback(void 0, client, client.release);
            });
          } else {
            pendingItem.callback(void 0, client, client.release);
          }
        } else {
          if (isNew && this.options.verify) {
            this.options.verify(client, client.release);
          } else {
            client.release();
          }
        }
      }
      // returns a function that wraps _release and throws if called more than once
      _releaseOnce(client, idleListener) {
        let released = false;
        return (err) => {
          if (released) {
            throwOnDoubleRelease();
          }
          released = true;
          this._release(client, idleListener, err);
        };
      }
      // release a client back to the poll, include an error
      // to remove it from the pool
      _release(client, idleListener, err) {
        client.on("error", idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        this.emit("release", err, client);
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
          if (client._poolUseCount >= this.options.maxUses) {
            this.log("remove expended client");
          }
          return this._remove(client, this._pulseQueue.bind(this));
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
          this.log("remove expired client");
          this._expired.delete(client);
          return this._remove(client, this._pulseQueue.bind(this));
        }
        let tid;
        if (this.options.idleTimeoutMillis && this._isAboveMin()) {
          tid = setTimeout(() => {
            if (this._isAboveMin()) {
              this.log("remove idle client");
              this._remove(client, this._pulseQueue.bind(this));
            }
          }, this.options.idleTimeoutMillis);
          if (this.options.allowExitOnIdle) {
            tid.unref();
          }
        }
        if (this.options.allowExitOnIdle) {
          client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
      }
      query(text, values, cb) {
        if (typeof text === "function") {
          const response2 = promisify(this.Promise, text);
          setImmediate(function() {
            return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
          });
          return response2.result;
        }
        if (typeof values === "function") {
          cb = values;
          values = void 0;
        }
        const response = promisify(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client) => {
          if (err) {
            return cb(err);
          }
          let clientReleased = false;
          const onError = /* @__PURE__ */ __name((err2) => {
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client.release(err2);
            cb(err2);
          }, "onError");
          client.once("error", onError);
          this.log("dispatching query");
          try {
            client.query(text, values, (err2, res) => {
              this.log("query dispatched");
              client.removeListener("error", onError);
              if (clientReleased) {
                return;
              }
              clientReleased = true;
              client.release(err2);
              if (err2) {
                return cb(err2);
              }
              return cb(void 0, res);
            });
          } catch (err2) {
            client.release(err2);
            return cb(err2);
          }
        });
        return response.result;
      }
      end(cb) {
        this.log("ending");
        if (this.ending) {
          const err = new Error("Called end on pool more than once");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
      }
      get waitingCount() {
        return this._pendingQueue.length;
      }
      get idleCount() {
        return this._idle.length;
      }
      get expiredCount() {
        return this._clients.reduce((acc, client) => acc + (this._expired.has(client) ? 1 : 0), 0);
      }
      get totalCount() {
        return this._clients.length;
      }
    };
    module.exports = Pool2;
  }
});

// node_modules/pg/lib/native/query.js
var require_query2 = __commonJS({
  "node_modules/pg/lib/native/query.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var EventEmitter = require_events().EventEmitter;
    var util = require_util();
    var utils = require_utils();
    var NativeQuery = module.exports = function(config4, values, callback) {
      EventEmitter.call(this);
      config4 = utils.normalizeQueryConfig(config4, values, callback);
      this.text = config4.text;
      this.values = config4.values;
      this.name = config4.name;
      this.queryMode = config4.queryMode;
      this.callback = config4.callback;
      this.state = "new";
      this._arrayMode = config4.rowMode === "array";
      this._emitRowEvents = false;
      this.on(
        "newListener",
        function(event) {
          if (event === "row") this._emitRowEvents = true;
        }.bind(this)
      );
    };
    util.inherits(NativeQuery, EventEmitter);
    var errorFieldMap = {
      sqlState: "code",
      statementPosition: "position",
      messagePrimary: "message",
      context: "where",
      schemaName: "schema",
      tableName: "table",
      columnName: "column",
      dataTypeName: "dataType",
      constraintName: "constraint",
      sourceFile: "file",
      sourceLine: "line",
      sourceFunction: "routine"
    };
    NativeQuery.prototype.handleError = function(err) {
      const fields = this.native.pq.resultErrorFields();
      if (fields) {
        for (const key in fields) {
          const normalizedFieldName = errorFieldMap[key] || key;
          err[normalizedFieldName] = fields[key];
        }
      }
      if (this.callback) {
        this.callback(err);
      } else {
        this.emit("error", err);
      }
      this.state = "error";
    };
    NativeQuery.prototype.then = function(onSuccess, onFailure) {
      return this._getPromise().then(onSuccess, onFailure);
    };
    NativeQuery.prototype.catch = function(callback) {
      return this._getPromise().catch(callback);
    };
    NativeQuery.prototype._getPromise = function() {
      if (this._promise) return this._promise;
      this._promise = new Promise(
        function(resolve, reject) {
          this._once("end", resolve);
          this._once("error", reject);
        }.bind(this)
      );
      return this._promise;
    };
    NativeQuery.prototype.submit = function(client) {
      this.state = "running";
      const self2 = this;
      this.native = client.native;
      client.native.arrayMode = this._arrayMode;
      let after = /* @__PURE__ */ __name(function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
          self2.emit("_done");
        });
        if (err) {
          return self2.handleError(err);
        }
        if (self2._emitRowEvents) {
          if (results.length > 1) {
            rows.forEach((rowOfRows, i) => {
              rowOfRows.forEach((row) => {
                self2.emit("row", row, results[i]);
              });
            });
          } else {
            rows.forEach(function(row) {
              self2.emit("row", row, results);
            });
          }
        }
        self2.state = "end";
        self2.emit("end", results);
        if (self2.callback) {
          self2.callback(null, results);
        }
      }, "after");
      if (process.domain) {
        after = process.domain.bind(after);
      }
      if (this.name) {
        if (this.name.length > 63) {
          console.error("Warning! Postgres only supports 63 characters for query names.");
          console.error("You supplied %s (%s)", this.name, this.name.length);
          console.error("This can cause conflicts and silent errors executing queries");
        }
        const values = (this.values || []).map(utils.prepareValue);
        if (client.namedQueries[this.name]) {
          if (this.text && client.namedQueries[this.name] !== this.text) {
            const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
            return after(err);
          }
          return client.native.execute(this.name, values, after);
        }
        return client.native.prepare(this.name, this.text, values.length, function(err) {
          if (err) return after(err);
          client.namedQueries[self2.name] = self2.text;
          return self2.native.execute(self2.name, values, after);
        });
      } else if (this.values) {
        if (!Array.isArray(this.values)) {
          const err = new Error("Query values must be an array");
          return after(err);
        }
        const vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
      } else if (this.queryMode === "extended") {
        client.native.query(this.text, [], after);
      } else {
        client.native.query(this.text, after);
      }
    };
  }
});

// node_modules/pg/lib/native/client.js
var require_client2 = __commonJS({
  "node_modules/pg/lib/native/client.js"(exports, module) {
    init_modules_watch_stub();
    var nodeUtils = require_util();
    var Native;
    try {
      Native = __require("pg-native");
    } catch (e7) {
      throw e7;
    }
    var TypeOverrides2 = require_type_overrides();
    var EventEmitter = require_events().EventEmitter;
    var util = require_util();
    var ConnectionParameters = require_connection_parameters();
    var NativeQuery = require_query2();
    var queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
    );
    var Client2 = module.exports = function(config4) {
      EventEmitter.call(this);
      config4 = config4 || {};
      this._Promise = config4.Promise || global.Promise;
      this._types = new TypeOverrides2(config4.types);
      this.native = new Native({
        types: this._types
      });
      this._queryQueue = [];
      this._ending = false;
      this._connecting = false;
      this._connected = false;
      this._queryable = true;
      const cp2 = this.connectionParameters = new ConnectionParameters(config4);
      if (config4.nativeConnectionString) cp2.nativeConnectionString = config4.nativeConnectionString;
      this.user = cp2.user;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp2.password
      });
      this.database = cp2.database;
      this.host = cp2.host;
      this.port = cp2.port;
      this.namedQueries = {};
    };
    Client2.Query = NativeQuery;
    util.inherits(Client2, EventEmitter);
    Client2.prototype._errorAllQueries = function(err) {
      const enqueueError = /* @__PURE__ */ __name((query) => {
        process.nextTick(() => {
          query.native = this.native;
          query.handleError(err);
        });
      }, "enqueueError");
      if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
      }
      this._queryQueue.forEach(enqueueError);
      this._queryQueue.length = 0;
    };
    Client2.prototype._connect = function(cb) {
      const self2 = this;
      if (this._connecting) {
        process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
        return;
      }
      this._connecting = true;
      this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (self2.connectionParameters.nativeConnectionString) conString = self2.connectionParameters.nativeConnectionString;
        if (err) return cb(err);
        self2.native.connect(conString, function(err2) {
          if (err2) {
            self2.native.end();
            return cb(err2);
          }
          self2._connected = true;
          self2.native.on("error", function(err3) {
            self2._queryable = false;
            self2._errorAllQueries(err3);
            self2.emit("error", err3);
          });
          self2.native.on("notification", function(msg) {
            self2.emit("notification", {
              channel: msg.relname,
              payload: msg.extra
            });
          });
          self2.emit("connect");
          self2._pulseQueryQueue(true);
          cb(null, this);
        });
      });
    };
    Client2.prototype.connect = function(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve, reject) => {
        this._connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve(this);
          }
        });
      });
    };
    Client2.prototype.query = function(config4, values, callback) {
      let query;
      let result;
      let readTimeout;
      let readTimeoutTimer;
      let queryCallback;
      if (config4 === null || config4 === void 0) {
        throw new TypeError("Client was passed a null or undefined query");
      } else if (typeof config4.submit === "function") {
        readTimeout = config4.query_timeout || this.connectionParameters.query_timeout;
        result = query = config4;
        if (typeof values === "function") {
          config4.callback = values;
        }
      } else {
        readTimeout = config4.query_timeout || this.connectionParameters.query_timeout;
        query = new NativeQuery(config4, values, callback);
        if (!query.callback) {
          let resolveOut, rejectOut;
          result = new this._Promise((resolve, reject) => {
            resolveOut = resolve;
            rejectOut = reject;
          }).catch((err) => {
            Error.captureStackTrace(err);
            throw err;
          });
          query.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
        }
      }
      if (readTimeout) {
        queryCallback = query.callback || (() => {
        });
        readTimeoutTimer = setTimeout(() => {
          const error = new Error("Query read timeout");
          process.nextTick(() => {
            query.handleError(error, this.connection);
          });
          queryCallback(error);
          query.callback = () => {
          };
          const index = this._queryQueue.indexOf(query);
          if (index > -1) {
            this._queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (!this._queryable) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client has encountered a connection error and is not queryable"));
        });
        return result;
      }
      if (this._ending) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client was closed and is not queryable"));
        });
        return result;
      }
      if (this._queryQueue.length > 0) {
        queryQueueLengthDeprecationNotice();
      }
      this._queryQueue.push(query);
      this._pulseQueryQueue();
      return result;
    };
    Client2.prototype.end = function(cb) {
      const self2 = this;
      this._ending = true;
      if (!this._connected) {
        this.once("connect", this.end.bind(this, cb));
      }
      let result;
      if (!cb) {
        result = new this._Promise(function(resolve, reject) {
          cb = /* @__PURE__ */ __name((err) => err ? reject(err) : resolve(), "cb");
        });
      }
      this.native.end(function() {
        self2._connected = false;
        self2._errorAllQueries(new Error("Connection terminated"));
        process.nextTick(() => {
          self2.emit("end");
          if (cb) cb();
        });
      });
      return result;
    };
    Client2.prototype._hasActiveQuery = function() {
      return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
    };
    Client2.prototype._pulseQueryQueue = function(initialConnection) {
      if (!this._connected) {
        return;
      }
      if (this._hasActiveQuery()) {
        return;
      }
      const query = this._queryQueue.shift();
      if (!query) {
        if (!initialConnection) {
          this.emit("drain");
        }
        return;
      }
      this._activeQuery = query;
      query.submit(this);
      const self2 = this;
      query.once("_done", function() {
        self2._pulseQueryQueue();
      });
    };
    Client2.prototype.cancel = function(query) {
      if (this._activeQuery === query) {
        this.native.cancel(function() {
        });
      } else if (this._queryQueue.indexOf(query) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query), 1);
      }
    };
    Client2.prototype.ref = function() {
    };
    Client2.prototype.unref = function() {
    };
    Client2.prototype.setTypeParser = function(oid, format, parseFn) {
      return this._types.setTypeParser(oid, format, parseFn);
    };
    Client2.prototype.getTypeParser = function(oid, format) {
      return this._types.getTypeParser(oid, format);
    };
    Client2.prototype.isConnected = function() {
      return this._connected;
    };
  }
});

// node_modules/pg/lib/native/index.js
var require_native = __commonJS({
  "node_modules/pg/lib/native/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    module.exports = require_client2();
  }
});

// node_modules/pg/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/pg/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Client2 = require_client();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var Result2 = require_result();
    var utils = require_utils();
    var Pool2 = require_pg_pool();
    var TypeOverrides2 = require_type_overrides();
    var { DatabaseError: DatabaseError2 } = require_dist();
    var { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = require_utils();
    var poolFactory = /* @__PURE__ */ __name((Client3) => {
      return class BoundPool extends Pool2 {
        static {
          __name(this, "BoundPool");
        }
        constructor(options) {
          super(options, Client3);
        }
      };
    }, "poolFactory");
    var PG = /* @__PURE__ */ __name(function(clientConstructor2) {
      this.defaults = defaults2;
      this.Client = clientConstructor2;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection2;
      this.types = require_pg_types();
      this.DatabaseError = DatabaseError2;
      this.TypeOverrides = TypeOverrides2;
      this.escapeIdentifier = escapeIdentifier2;
      this.escapeLiteral = escapeLiteral2;
      this.Result = Result2;
      this.utils = utils;
    }, "PG");
    var clientConstructor = Client2;
    var forceNative = false;
    try {
      forceNative = !!process.env.NODE_PG_FORCE_NATIVE;
    } catch {
    }
    if (forceNative) {
      clientConstructor = require_native();
    }
    module.exports = new PG(clientConstructor);
    Object.defineProperty(module.exports, "native", {
      configurable: true,
      enumerable: false,
      get() {
        let native = null;
        try {
          native = new PG(require_native());
        } catch (err) {
          if (err.code !== "MODULE_NOT_FOUND") {
            throw err;
          }
        }
        Object.defineProperty(module.exports, "native", {
          value: native
        });
        return native;
      }
    });
  }
});

// node_modules/postgres-array/index.js
var require_postgres_array2 = __commonJS({
  "node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    var BACKSLASH = "\\";
    var DQUOT = '"';
    var LBRACE = "{";
    var RBRACE = "}";
    var LBRACKET = "[";
    var EQUALS = "=";
    var COMMA = ",";
    var NULL_STRING = "NULL";
    function makeParseArrayWithTransform(transform) {
      const haveTransform = transform != null;
      return /* @__PURE__ */ __name(function parseArray3(str) {
        const rbraceIndex = str.length - 1;
        if (rbraceIndex === 1) {
          return [];
        }
        if (str[rbraceIndex] !== RBRACE) {
          throw new Error("Invalid array text - must end with }");
        }
        let position = 0;
        if (str[position] === LBRACKET) {
          position = str.indexOf(EQUALS) + 1;
        }
        if (str[position++] !== LBRACE) {
          throw new Error("Invalid array text - must start with {");
        }
        const output = [];
        let current = output;
        const stack = [];
        let currentStringStart = position;
        let currentString = "";
        let expectValue = true;
        for (; position < rbraceIndex; ++position) {
          let char = str[position];
          if (char === DQUOT) {
            currentStringStart = ++position;
            let dquot = str.indexOf(DQUOT, currentStringStart);
            let backSlash = str.indexOf(BACKSLASH, currentStringStart);
            while (backSlash !== -1 && backSlash < dquot) {
              position = backSlash;
              const part2 = str.slice(currentStringStart, position);
              currentString += part2;
              currentStringStart = ++position;
              if (dquot === position++) {
                dquot = str.indexOf(DQUOT, position);
              }
              backSlash = str.indexOf(BACKSLASH, position);
            }
            position = dquot;
            const part = str.slice(currentStringStart, position);
            currentString += part;
            current.push(haveTransform ? transform(currentString) : currentString);
            currentString = "";
            expectValue = false;
          } else if (char === LBRACE) {
            const newArray = [];
            current.push(newArray);
            stack.push(current);
            current = newArray;
            currentStringStart = position + 1;
            expectValue = true;
          } else if (char === COMMA) {
            expectValue = true;
          } else if (char === RBRACE) {
            expectValue = false;
            const arr = stack.pop();
            if (arr === void 0) {
              throw new Error("Invalid array text - too many '}'");
            }
            current = arr;
          } else if (expectValue) {
            currentStringStart = position;
            while ((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex) {
              ++position;
            }
            const part = str.slice(currentStringStart, position--);
            current.push(
              part === NULL_STRING ? null : haveTransform ? transform(part) : part
            );
            expectValue = false;
          } else {
            throw new Error("Was expecting delimeter");
          }
        }
        return output;
      }, "parseArray");
    }
    __name(makeParseArrayWithTransform, "makeParseArrayWithTransform");
    var parseArray2 = makeParseArrayWithTransform();
    exports.parse = (source, transform) => transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray2(source);
  }
});

// generated/prisma/internal/query_compiler_fast_bg.js
var query_compiler_fast_bg_exports = {};
__export(query_compiler_fast_bg_exports, {
  QueryCompiler: () => F,
  __wbg_Error_e83987f665cf5504: () => O,
  __wbg_Number_bb48ca12f395cd08: () => B,
  __wbg_String_8f0eb39a4a4c2f66: () => N,
  __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: () => U2,
  __wbg___wbindgen_debug_string_df47ffb5e35e6763: () => R,
  __wbg___wbindgen_in_bb933bd9e1b3bc0f: () => $3,
  __wbg___wbindgen_is_object_c818261d21f283a4: () => q,
  __wbg___wbindgen_is_string_fbb76cb2940daafd: () => C2,
  __wbg___wbindgen_is_undefined_2d472862bd29a478: () => k2,
  __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: () => W2,
  __wbg___wbindgen_number_get_a20bf9b85341449d: () => V2,
  __wbg___wbindgen_string_get_e4f06c90489ad01b: () => z2,
  __wbg___wbindgen_throw_b855445ff6a94295: () => L2,
  __wbg_entries_e171b586f8f6bdbf: () => P2,
  __wbg_getTime_14776bfb48a1bff9: () => Q,
  __wbg_get_7bed016f185add81: () => Y2,
  __wbg_get_with_ref_key_1dc361bd10053bfe: () => G2,
  __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: () => J,
  __wbg_instanceof_Uint8Array_20c8e73002f7af98: () => X2,
  __wbg_isSafeInteger_d216eda7911dde36: () => H2,
  __wbg_length_69bca3cb64fc8748: () => K2,
  __wbg_length_cdd215e10d9dd507: () => Z2,
  __wbg_new_0_f9740686d739025c: () => v,
  __wbg_new_1acc0b6eea89d040: () => ee2,
  __wbg_new_5a79be3ab53b8aa5: () => te2,
  __wbg_new_68651c719dcda04e: () => ne2,
  __wbg_new_e17d9f43105b08be: () => re,
  __wbg_prototypesetcall_2a6620b6922694b2: () => _e,
  __wbg_set_3f1d0b984ed272ed: () => oe2,
  __wbg_set_907fb406c34a251d: () => ce2,
  __wbg_set_c213c871859d6500: () => ie2,
  __wbg_set_message_82ae475bb413aa5c: () => se2,
  __wbg_set_wasm: () => D,
  __wbindgen_cast_2241b6af4c4b2941: () => ue2,
  __wbindgen_cast_4625c577ab2ec9ee: () => fe2,
  __wbindgen_cast_9ae0607507abb057: () => be2,
  __wbindgen_cast_d6cd19b81560fd6e: () => de,
  __wbindgen_init_externref_table: () => ae2
});
function D(e7) {
  o = e7;
}
function a() {
  return (p2 === null || p2.byteLength === 0) && (p2 = new Uint8Array(o.memory.buffer)), p2;
}
function T(e7, t) {
  return A += t, A >= E && (y2 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), y2.decode(), A = t), y2.decode(a().subarray(e7, e7 + t));
}
function m(e7, t) {
  return e7 = e7 >>> 0, T(e7, t);
}
function l2(e7, t, n) {
  if (n === void 0) {
    const i = g2.encode(e7), d2 = t(i.length, 1) >>> 0;
    return a().subarray(d2, d2 + i.length).set(i), f = i.length, d2;
  }
  let _2 = e7.length, r = t(_2, 1) >>> 0;
  const s = a();
  let c2 = 0;
  for (; c2 < _2; c2++) {
    const i = e7.charCodeAt(c2);
    if (i > 127) break;
    s[r + c2] = i;
  }
  if (c2 !== _2) {
    c2 !== 0 && (e7 = e7.slice(c2)), r = n(r, _2, _2 = c2 + e7.length * 3, 1) >>> 0;
    const i = a().subarray(r + c2, r + _2), d2 = g2.encodeInto(e7, i);
    c2 += d2.written, r = n(r, _2, c2, 1) >>> 0;
  }
  return f = c2, r;
}
function u2() {
  return (b2 === null || b2.buffer.detached === true || b2.buffer.detached === void 0 && b2.buffer !== o.memory.buffer) && (b2 = new DataView(o.memory.buffer)), b2;
}
function x2(e7) {
  return e7 == null;
}
function S(e7) {
  const t = typeof e7;
  if (t == "number" || t == "boolean" || e7 == null) return `${e7}`;
  if (t == "string") return `"${e7}"`;
  if (t == "symbol") {
    const r = e7.description;
    return r == null ? "Symbol" : `Symbol(${r})`;
  }
  if (t == "function") {
    const r = e7.name;
    return typeof r == "string" && r.length > 0 ? `Function(${r})` : "Function";
  }
  if (Array.isArray(e7)) {
    const r = e7.length;
    let s = "[";
    r > 0 && (s += S(e7[0]));
    for (let c2 = 1; c2 < r; c2++) s += ", " + S(e7[c2]);
    return s += "]", s;
  }
  const n = /\[object ([^\]]+)\]/.exec(toString.call(e7));
  let _2;
  if (n && n.length > 1) _2 = n[1];
  else return toString.call(e7);
  if (_2 == "Object") try {
    return "Object(" + JSON.stringify(e7) + ")";
  } catch {
    return "Object";
  }
  return e7 instanceof Error ? `${e7.name}: ${e7.message}
${e7.stack}` : _2;
}
function M2(e7, t) {
  return e7 = e7 >>> 0, a().subarray(e7 / 1, e7 / 1 + t);
}
function w2(e7) {
  const t = o.__wbindgen_externrefs.get(e7);
  return o.__externref_table_dealloc(e7), t;
}
function O(e7, t) {
  return Error(m(e7, t));
}
function B(e7) {
  return Number(e7);
}
function N(e7, t) {
  const n = String(t), _2 = l2(n, o.__wbindgen_malloc, o.__wbindgen_realloc), r = f;
  u2().setInt32(e7 + 4 * 1, r, true), u2().setInt32(e7 + 4 * 0, _2, true);
}
function U2(e7) {
  const t = e7, n = typeof t == "boolean" ? t : void 0;
  return x2(n) ? 16777215 : n ? 1 : 0;
}
function R(e7, t) {
  const n = S(t), _2 = l2(n, o.__wbindgen_malloc, o.__wbindgen_realloc), r = f;
  u2().setInt32(e7 + 4 * 1, r, true), u2().setInt32(e7 + 4 * 0, _2, true);
}
function $3(e7, t) {
  return e7 in t;
}
function q(e7) {
  const t = e7;
  return typeof t == "object" && t !== null;
}
function C2(e7) {
  return typeof e7 == "string";
}
function k2(e7) {
  return e7 === void 0;
}
function W2(e7, t) {
  return e7 == t;
}
function V2(e7, t) {
  const n = t, _2 = typeof n == "number" ? n : void 0;
  u2().setFloat64(e7 + 8 * 1, x2(_2) ? 0 : _2, true), u2().setInt32(e7 + 4 * 0, !x2(_2), true);
}
function z2(e7, t) {
  const n = t, _2 = typeof n == "string" ? n : void 0;
  var r = x2(_2) ? 0 : l2(_2, o.__wbindgen_malloc, o.__wbindgen_realloc), s = f;
  u2().setInt32(e7 + 4 * 1, s, true), u2().setInt32(e7 + 4 * 0, r, true);
}
function L2(e7, t) {
  throw new Error(m(e7, t));
}
function P2(e7) {
  return Object.entries(e7);
}
function Q(e7) {
  return e7.getTime();
}
function Y2(e7, t) {
  return e7[t >>> 0];
}
function G2(e7, t) {
  return e7[t];
}
function J(e7) {
  let t;
  try {
    t = e7 instanceof ArrayBuffer;
  } catch {
    t = false;
  }
  return t;
}
function X2(e7) {
  let t;
  try {
    t = e7 instanceof Uint8Array;
  } catch {
    t = false;
  }
  return t;
}
function H2(e7) {
  return Number.isSafeInteger(e7);
}
function K2(e7) {
  return e7.length;
}
function Z2(e7) {
  return e7.length;
}
function v() {
  return /* @__PURE__ */ new Date();
}
function ee2() {
  return new Object();
}
function te2(e7) {
  return new Uint8Array(e7);
}
function ne2() {
  return /* @__PURE__ */ new Map();
}
function re() {
  return new Array();
}
function _e(e7, t, n) {
  Uint8Array.prototype.set.call(M2(e7, t), n);
}
function oe2(e7, t, n) {
  e7[t] = n;
}
function ce2(e7, t, n) {
  return e7.set(t, n);
}
function ie2(e7, t, n) {
  e7[t >>> 0] = n;
}
function se2(e7, t) {
  global.PRISMA_WASM_PANIC_REGISTRY.set_message(m(e7, t));
}
function ue2(e7, t) {
  return m(e7, t);
}
function fe2(e7) {
  return BigInt.asUintN(64, e7);
}
function be2(e7) {
  return e7;
}
function de(e7) {
  return e7;
}
function ae2() {
  const e7 = o.__wbindgen_externrefs, t = e7.grow(4);
  e7.set(0, void 0), e7.set(t + 0, void 0), e7.set(t + 1, null), e7.set(t + 2, true), e7.set(t + 3, false);
}
var h2, o, p2, y2, E, A, f, g2, b2, I, F;
var init_query_compiler_fast_bg = __esm({
  "generated/prisma/internal/query_compiler_fast_bg.js"() {
    "use strict";
    init_modules_watch_stub();
    h2 = /* @__PURE__ */ __name(() => {
    }, "h");
    h2.prototype = h2;
    __name(D, "D");
    p2 = null;
    __name(a, "a");
    y2 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    y2.decode();
    E = 2146435072;
    A = 0;
    __name(T, "T");
    __name(m, "m");
    f = 0;
    g2 = new TextEncoder();
    "encodeInto" in g2 || (g2.encodeInto = function(e7, t) {
      const n = g2.encode(e7);
      return t.set(n), { read: e7.length, written: n.length };
    });
    __name(l2, "l");
    b2 = null;
    __name(u2, "u");
    __name(x2, "x");
    __name(S, "S");
    __name(M2, "M");
    __name(w2, "w");
    I = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e7) => o.__wbg_querycompiler_free(e7 >>> 0, 1));
    F = class {
      static {
        __name(this, "F");
      }
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, I.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        o.__wbg_querycompiler_free(t, 0);
      }
      compileBatch(t) {
        const n = l2(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _2 = f, r = o.querycompiler_compileBatch(this.__wbg_ptr, n, _2);
        if (r[2]) throw w2(r[1]);
        return w2(r[0]);
      }
      constructor(t) {
        const n = o.querycompiler_new(t);
        if (n[2]) throw w2(n[1]);
        return this.__wbg_ptr = n[0] >>> 0, I.register(this, this.__wbg_ptr, this), this;
      }
      compile(t) {
        const n = l2(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _2 = f, r = o.querycompiler_compile(this.__wbg_ptr, n, _2);
        if (r[2]) throw w2(r[1]);
        return w2(r[0]);
      }
    };
    Symbol.dispose && (F.prototype[Symbol.dispose] = F.prototype.free);
    __name(O, "O");
    __name(B, "B");
    __name(N, "N");
    __name(U2, "U");
    __name(R, "R");
    __name($3, "$");
    __name(q, "q");
    __name(C2, "C");
    __name(k2, "k");
    __name(W2, "W");
    __name(V2, "V");
    __name(z2, "z");
    __name(L2, "L");
    __name(P2, "P");
    __name(Q, "Q");
    __name(Y2, "Y");
    __name(G2, "G");
    __name(J, "J");
    __name(X2, "X");
    __name(H2, "H");
    __name(K2, "K");
    __name(Z2, "Z");
    __name(v, "v");
    __name(ee2, "ee");
    __name(te2, "te");
    __name(ne2, "ne");
    __name(re, "re");
    __name(_e, "_e");
    __name(oe2, "oe");
    __name(ce2, "ce");
    __name(ie2, "ie");
    __name(se2, "se");
    __name(ue2, "ue");
    __name(fe2, "fe");
    __name(be2, "be");
    __name(de, "de");
    __name(ae2, "ae");
  }
});

// generated/prisma-supabase/internal/query_compiler_fast_bg.js
var query_compiler_fast_bg_exports2 = {};
__export(query_compiler_fast_bg_exports2, {
  QueryCompiler: () => F2,
  __wbg_Error_e83987f665cf5504: () => O2,
  __wbg_Number_bb48ca12f395cd08: () => B2,
  __wbg_String_8f0eb39a4a4c2f66: () => N2,
  __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: () => U3,
  __wbg___wbindgen_debug_string_df47ffb5e35e6763: () => R2,
  __wbg___wbindgen_in_bb933bd9e1b3bc0f: () => $4,
  __wbg___wbindgen_is_object_c818261d21f283a4: () => q2,
  __wbg___wbindgen_is_string_fbb76cb2940daafd: () => C3,
  __wbg___wbindgen_is_undefined_2d472862bd29a478: () => k3,
  __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: () => W3,
  __wbg___wbindgen_number_get_a20bf9b85341449d: () => V3,
  __wbg___wbindgen_string_get_e4f06c90489ad01b: () => z3,
  __wbg___wbindgen_throw_b855445ff6a94295: () => L3,
  __wbg_entries_e171b586f8f6bdbf: () => P3,
  __wbg_getTime_14776bfb48a1bff9: () => Q2,
  __wbg_get_7bed016f185add81: () => Y3,
  __wbg_get_with_ref_key_1dc361bd10053bfe: () => G3,
  __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: () => J2,
  __wbg_instanceof_Uint8Array_20c8e73002f7af98: () => X3,
  __wbg_isSafeInteger_d216eda7911dde36: () => H3,
  __wbg_length_69bca3cb64fc8748: () => K3,
  __wbg_length_cdd215e10d9dd507: () => Z3,
  __wbg_new_0_f9740686d739025c: () => v2,
  __wbg_new_1acc0b6eea89d040: () => ee3,
  __wbg_new_5a79be3ab53b8aa5: () => te3,
  __wbg_new_68651c719dcda04e: () => ne3,
  __wbg_new_e17d9f43105b08be: () => re2,
  __wbg_prototypesetcall_2a6620b6922694b2: () => _e2,
  __wbg_set_3f1d0b984ed272ed: () => oe3,
  __wbg_set_907fb406c34a251d: () => ce3,
  __wbg_set_c213c871859d6500: () => ie3,
  __wbg_set_message_82ae475bb413aa5c: () => se3,
  __wbg_set_wasm: () => D2,
  __wbindgen_cast_2241b6af4c4b2941: () => ue3,
  __wbindgen_cast_4625c577ab2ec9ee: () => fe3,
  __wbindgen_cast_9ae0607507abb057: () => be3,
  __wbindgen_cast_d6cd19b81560fd6e: () => de2,
  __wbindgen_init_externref_table: () => ae3
});
function D2(e7) {
  o2 = e7;
}
function a2() {
  return (p3 === null || p3.byteLength === 0) && (p3 = new Uint8Array(o2.memory.buffer)), p3;
}
function T2(e7, t) {
  return A2 += t, A2 >= E2 && (y3 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), y3.decode(), A2 = t), y3.decode(a2().subarray(e7, e7 + t));
}
function m2(e7, t) {
  return e7 = e7 >>> 0, T2(e7, t);
}
function l3(e7, t, n) {
  if (n === void 0) {
    const i = g3.encode(e7), d2 = t(i.length, 1) >>> 0;
    return a2().subarray(d2, d2 + i.length).set(i), f2 = i.length, d2;
  }
  let _2 = e7.length, r = t(_2, 1) >>> 0;
  const s = a2();
  let c2 = 0;
  for (; c2 < _2; c2++) {
    const i = e7.charCodeAt(c2);
    if (i > 127) break;
    s[r + c2] = i;
  }
  if (c2 !== _2) {
    c2 !== 0 && (e7 = e7.slice(c2)), r = n(r, _2, _2 = c2 + e7.length * 3, 1) >>> 0;
    const i = a2().subarray(r + c2, r + _2), d2 = g3.encodeInto(e7, i);
    c2 += d2.written, r = n(r, _2, c2, 1) >>> 0;
  }
  return f2 = c2, r;
}
function u3() {
  return (b3 === null || b3.buffer.detached === true || b3.buffer.detached === void 0 && b3.buffer !== o2.memory.buffer) && (b3 = new DataView(o2.memory.buffer)), b3;
}
function x3(e7) {
  return e7 == null;
}
function S2(e7) {
  const t = typeof e7;
  if (t == "number" || t == "boolean" || e7 == null) return `${e7}`;
  if (t == "string") return `"${e7}"`;
  if (t == "symbol") {
    const r = e7.description;
    return r == null ? "Symbol" : `Symbol(${r})`;
  }
  if (t == "function") {
    const r = e7.name;
    return typeof r == "string" && r.length > 0 ? `Function(${r})` : "Function";
  }
  if (Array.isArray(e7)) {
    const r = e7.length;
    let s = "[";
    r > 0 && (s += S2(e7[0]));
    for (let c2 = 1; c2 < r; c2++) s += ", " + S2(e7[c2]);
    return s += "]", s;
  }
  const n = /\[object ([^\]]+)\]/.exec(toString.call(e7));
  let _2;
  if (n && n.length > 1) _2 = n[1];
  else return toString.call(e7);
  if (_2 == "Object") try {
    return "Object(" + JSON.stringify(e7) + ")";
  } catch {
    return "Object";
  }
  return e7 instanceof Error ? `${e7.name}: ${e7.message}
${e7.stack}` : _2;
}
function M3(e7, t) {
  return e7 = e7 >>> 0, a2().subarray(e7 / 1, e7 / 1 + t);
}
function w3(e7) {
  const t = o2.__wbindgen_externrefs.get(e7);
  return o2.__externref_table_dealloc(e7), t;
}
function O2(e7, t) {
  return Error(m2(e7, t));
}
function B2(e7) {
  return Number(e7);
}
function N2(e7, t) {
  const n = String(t), _2 = l3(n, o2.__wbindgen_malloc, o2.__wbindgen_realloc), r = f2;
  u3().setInt32(e7 + 4 * 1, r, true), u3().setInt32(e7 + 4 * 0, _2, true);
}
function U3(e7) {
  const t = e7, n = typeof t == "boolean" ? t : void 0;
  return x3(n) ? 16777215 : n ? 1 : 0;
}
function R2(e7, t) {
  const n = S2(t), _2 = l3(n, o2.__wbindgen_malloc, o2.__wbindgen_realloc), r = f2;
  u3().setInt32(e7 + 4 * 1, r, true), u3().setInt32(e7 + 4 * 0, _2, true);
}
function $4(e7, t) {
  return e7 in t;
}
function q2(e7) {
  const t = e7;
  return typeof t == "object" && t !== null;
}
function C3(e7) {
  return typeof e7 == "string";
}
function k3(e7) {
  return e7 === void 0;
}
function W3(e7, t) {
  return e7 == t;
}
function V3(e7, t) {
  const n = t, _2 = typeof n == "number" ? n : void 0;
  u3().setFloat64(e7 + 8 * 1, x3(_2) ? 0 : _2, true), u3().setInt32(e7 + 4 * 0, !x3(_2), true);
}
function z3(e7, t) {
  const n = t, _2 = typeof n == "string" ? n : void 0;
  var r = x3(_2) ? 0 : l3(_2, o2.__wbindgen_malloc, o2.__wbindgen_realloc), s = f2;
  u3().setInt32(e7 + 4 * 1, s, true), u3().setInt32(e7 + 4 * 0, r, true);
}
function L3(e7, t) {
  throw new Error(m2(e7, t));
}
function P3(e7) {
  return Object.entries(e7);
}
function Q2(e7) {
  return e7.getTime();
}
function Y3(e7, t) {
  return e7[t >>> 0];
}
function G3(e7, t) {
  return e7[t];
}
function J2(e7) {
  let t;
  try {
    t = e7 instanceof ArrayBuffer;
  } catch {
    t = false;
  }
  return t;
}
function X3(e7) {
  let t;
  try {
    t = e7 instanceof Uint8Array;
  } catch {
    t = false;
  }
  return t;
}
function H3(e7) {
  return Number.isSafeInteger(e7);
}
function K3(e7) {
  return e7.length;
}
function Z3(e7) {
  return e7.length;
}
function v2() {
  return /* @__PURE__ */ new Date();
}
function ee3() {
  return new Object();
}
function te3(e7) {
  return new Uint8Array(e7);
}
function ne3() {
  return /* @__PURE__ */ new Map();
}
function re2() {
  return new Array();
}
function _e2(e7, t, n) {
  Uint8Array.prototype.set.call(M3(e7, t), n);
}
function oe3(e7, t, n) {
  e7[t] = n;
}
function ce3(e7, t, n) {
  return e7.set(t, n);
}
function ie3(e7, t, n) {
  e7[t >>> 0] = n;
}
function se3(e7, t) {
  global.PRISMA_WASM_PANIC_REGISTRY.set_message(m2(e7, t));
}
function ue3(e7, t) {
  return m2(e7, t);
}
function fe3(e7) {
  return BigInt.asUintN(64, e7);
}
function be3(e7) {
  return e7;
}
function de2(e7) {
  return e7;
}
function ae3() {
  const e7 = o2.__wbindgen_externrefs, t = e7.grow(4);
  e7.set(0, void 0), e7.set(t + 0, void 0), e7.set(t + 1, null), e7.set(t + 2, true), e7.set(t + 3, false);
}
var h3, o2, p3, y3, E2, A2, f2, g3, b3, I2, F2;
var init_query_compiler_fast_bg2 = __esm({
  "generated/prisma-supabase/internal/query_compiler_fast_bg.js"() {
    "use strict";
    init_modules_watch_stub();
    h3 = /* @__PURE__ */ __name(() => {
    }, "h");
    h3.prototype = h3;
    __name(D2, "D");
    p3 = null;
    __name(a2, "a");
    y3 = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    y3.decode();
    E2 = 2146435072;
    A2 = 0;
    __name(T2, "T");
    __name(m2, "m");
    f2 = 0;
    g3 = new TextEncoder();
    "encodeInto" in g3 || (g3.encodeInto = function(e7, t) {
      const n = g3.encode(e7);
      return t.set(n), { read: e7.length, written: n.length };
    });
    __name(l3, "l");
    b3 = null;
    __name(u3, "u");
    __name(x3, "x");
    __name(S2, "S");
    __name(M3, "M");
    __name(w3, "w");
    I2 = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e7) => o2.__wbg_querycompiler_free(e7 >>> 0, 1));
    F2 = class {
      static {
        __name(this, "F");
      }
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, I2.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        o2.__wbg_querycompiler_free(t, 0);
      }
      compileBatch(t) {
        const n = l3(t, o2.__wbindgen_malloc, o2.__wbindgen_realloc), _2 = f2, r = o2.querycompiler_compileBatch(this.__wbg_ptr, n, _2);
        if (r[2]) throw w3(r[1]);
        return w3(r[0]);
      }
      constructor(t) {
        const n = o2.querycompiler_new(t);
        if (n[2]) throw w3(n[1]);
        return this.__wbg_ptr = n[0] >>> 0, I2.register(this, this.__wbg_ptr, this), this;
      }
      compile(t) {
        const n = l3(t, o2.__wbindgen_malloc, o2.__wbindgen_realloc), _2 = f2, r = o2.querycompiler_compile(this.__wbg_ptr, n, _2);
        if (r[2]) throw w3(r[1]);
        return w3(r[0]);
      }
    };
    Symbol.dispose && (F2.prototype[Symbol.dispose] = F2.prototype.free);
    __name(O2, "O");
    __name(B2, "B");
    __name(N2, "N");
    __name(U3, "U");
    __name(R2, "R");
    __name($4, "$");
    __name(q2, "q");
    __name(C3, "C");
    __name(k3, "k");
    __name(W3, "W");
    __name(V3, "V");
    __name(z3, "z");
    __name(L3, "L");
    __name(P3, "P");
    __name(Q2, "Q");
    __name(Y3, "Y");
    __name(G3, "G");
    __name(J2, "J");
    __name(X3, "X");
    __name(H3, "H");
    __name(K3, "K");
    __name(Z3, "Z");
    __name(v2, "v");
    __name(ee3, "ee");
    __name(te3, "te");
    __name(ne3, "ne");
    __name(re2, "re");
    __name(_e2, "_e");
    __name(oe3, "oe");
    __name(ce3, "ce");
    __name(ie3, "ie");
    __name(se3, "se");
    __name(ue3, "ue");
    __name(fe3, "fe");
    __name(be3, "be");
    __name(de2, "de");
    __name(ae3, "ae");
  }
});

// .wrangler/tmp/bundle-hmuRP4/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-hmuRP4/middleware-insertion-facade.js
init_modules_watch_stub();

// src/index.ts
init_modules_watch_stub();

// node_modules/hono/dist/index.js
init_modules_watch_stub();

// node_modules/hono/dist/hono.js
init_modules_watch_stub();

// node_modules/hono/dist/hono-base.js
init_modules_watch_stub();

// node_modules/hono/dist/compose.js
init_modules_watch_stub();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_modules_watch_stub();

// node_modules/hono/dist/request.js
init_modules_watch_stub();

// node_modules/hono/dist/http-exception.js
init_modules_watch_stub();

// node_modules/hono/dist/request/constants.js
init_modules_watch_stub();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
init_modules_watch_stub();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_modules_watch_stub();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j2 = paths.length - 1; j2 >= 0; j2--) {
      if (paths[j2].includes(mark)) {
        paths[j2] = paths[j2].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub2, ...rest) => {
  if (rest.length) {
    sub2 = mergePath(sub2, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub2 === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub2?.[0] === "/" ? sub2.slice(1) : sub2}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v3, i, a3) => a3.indexOf(v3) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name2 = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name2 = _decodeURI(name2);
    }
    keyIndex = nextKeyIndex;
    if (name2 === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name2] && Array.isArray(results[name2]))) {
        results[name2] = [];
      }
      ;
      results[name2].push(value);
    } else {
      results[name2] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name2) {
    if (name2) {
      return this.raw.headers.get(name2) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw3 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw3[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c2) => c2({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init2) => new Response(body, init2), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k4, v3] of this.#res.headers.entries()) {
        if (k4 === "content-type") {
          continue;
        }
        if (k4 === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k4, v3);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name2, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name2);
    } else if (options?.append) {
      headers.append(name2, value);
    } else {
      headers.set(name2, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k4, v3] of Object.entries(headers)) {
        if (typeof v3 === "string") {
          responseHeaders.set(k4, v3);
        } else {
          responseHeaders.delete(k4);
          for (const v22 of v3) {
            responseHeaders.append(k4, v22);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
init_modules_watch_stub();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c2) => {
  return c2.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c2) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c2.newResponse(res.body, res);
  }
  console.error(err);
  return c2.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p4 of [path].flat()) {
        this.#path = p4;
        for (const m3 of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m3.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone2 = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone2.errorHandler = this.errorHandler;
    clone2.#notFoundHandler = this.#notFoundHandler;
    clone2.routes = this.routes;
    return clone2;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c2, next) => (await compose([], app2.errorHandler)(c2, () => r.handler(c2, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c2) => {
      const options2 = optionHandler(c2);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c2) => {
      let executionContext = void 0;
      try {
        executionContext = c2.executionCtx;
      } catch {
      }
      return [c2.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c2, next) => {
      const res = await applicationHandler(replaceRequest(c2.req.raw), ...getOptions(c2));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c2) {
    if (err instanceof Error) {
      return this.errorHandler(err, c2);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c2 = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c2, async () => {
          c2.res = await this.#notFoundHandler(c2);
        });
      } catch (err) {
        return this.#handleError(err, c2);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c2.finalized ? c2.res : this.#notFoundHandler(c2))
      ).catch((err) => this.#handleError(err, c2)) : res ?? this.#notFoundHandler(c2);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c2);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c2);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/index.js
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_modules_watch_stub();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a3, b4) {
  if (a3.length === 1) {
    return b4.length === 1 ? a3 < b4 ? -1 : 1 : -1;
  }
  if (b4.length === 1) {
    return 1;
  }
  if (a3 === ONLY_WILDCARD_REG_EXP_STR || a3 === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b4 === ONLY_WILDCARD_REG_EXP_STR || b4 === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a3 === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b4 === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a3.length === b4.length ? a3 < b4 ? -1 : 1 : b4.length - a3.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name2 = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name2 && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k4) => k4 !== ONLY_WILDCARD_REG_EXP_STR && k4 !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name2 !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name2 !== "") {
        paramMap.push([name2, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k4) => k4.length > 1 && k4 !== ONLY_WILDCARD_REG_EXP_STR && k4 !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k4) => {
      const c2 = this.#children[k4];
      return (typeof c2.#varIndex === "number" ? `(${k4})@${c2.#varIndex}` : regExpMetaChars.has(k4) ? `\\${k4}` : k4) + c2.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_modules_watch_stub();
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m3) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m3];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j2 = tokens.length - 1; j2 >= 0; j2--) {
        if (tokens[j2].indexOf(mark) !== -1) {
          tokens[j2] = tokens[j2].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_2, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_2, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j2 = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h4]) => [h4, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j2++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j2, pathErrorCheckOnly);
    } catch (e7) {
      throw e7 === PATH_ERROR ? new UnsupportedPathError(path) : e7;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j2] = handlers.map(([h4, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h4, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j2 = 0, len2 = handlerData[i].length; j2 < len2; j2++) {
      const map = handlerData[i][j2]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k4 = 0, len3 = keys.length; k4 < len3; k4++) {
        map[keys[k4]] = paramReplacementMap[map[keys[k4]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k4 of Object.keys(middleware).sort((a3, b4) => b4.length - a3.length)) {
    if (buildWildcardRegExp(k4).test(path)) {
      return [...middleware[k4]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p4) => {
          handlerMap[method][p4] = [...handlerMap[METHOD_NAME_ALL][p4]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re3 = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m3) => {
          middleware[m3][path] ||= findMiddleware(middleware[m3], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          Object.keys(middleware[m3]).forEach((p4) => {
            re3.test(p4) && middleware[m3][p4].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          Object.keys(routes[m3]).forEach(
            (p4) => re3.test(p4) && routes[m3][p4].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          routes[m3][path2] ||= [
            ...findMiddleware(middleware[m3], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m3][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/index.js
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/router.js
init_modules_watch_stub();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e7) {
        if (e7 instanceof UnsupportedPathError) {
          continue;
        }
        throw e7;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/index.js
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/router.js
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/node.js
init_modules_watch_stub();
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _2 in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m3 = /* @__PURE__ */ Object.create(null);
      m3[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m3];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p4 = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p4, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p4;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v3, i, a3) => a3.indexOf(v3) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m3 = node.#methods[i];
      const handlerSet = m3[method] || m3[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j2 = 0, len2 = curNodes.length; j2 < len2; j2++) {
        const node = curNodes[j2];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k4 = 0, len3 = node.#patterns.length; k4 < len3; k4++) {
          const pattern = node.#patterns[k4];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name2, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p4 = 0; p4 < len; p4++) {
                partOffsets[p4] = offset;
                offset += parts[p4].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m3 = matcher.exec(restPathString);
            if (m3) {
              params[name2] = m3[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m3[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name2] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a3, b4) => {
        return a3.score - b4.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
init_modules_watch_stub();
var cors = /* @__PURE__ */ __name((options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        if (opts.credentials) {
          return (origin) => origin || null;
        }
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c2, next) {
    function set(key, value) {
      c2.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c2.req.header("origin") || "", c2);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c2.req.method === "OPTIONS") {
      if (opts.origin !== "*" || opts.credentials) {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c2.req.header("origin") || "", c2);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c2.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c2.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c2.res.headers.delete("Content-Length");
      c2.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c2.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*" || opts.credentials) {
      c2.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// routes/api/post/importPost.ts
init_modules_watch_stub();

// lib/utils/prismaConnection.ts
init_modules_watch_stub();

// node_modules/@prisma/adapter-pg/dist/index.mjs
init_modules_watch_stub();

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_modules_watch_stub();

// node_modules/@prisma/driver-adapter-utils/node_modules/@prisma/debug/dist/index.mjs
init_modules_watch_stub();
var __defProp2 = Object.defineProperty;
var __export2 = /* @__PURE__ */ __name((target, all) => {
  for (var name2 in all)
    __defProp2(target, name2, { get: all[name2], enumerable: true });
}, "__export");
var colors_exports = {};
__export2(colors_exports, {
  $: /* @__PURE__ */ __name(() => $, "$"),
  bgBlack: /* @__PURE__ */ __name(() => bgBlack, "bgBlack"),
  bgBlue: /* @__PURE__ */ __name(() => bgBlue, "bgBlue"),
  bgCyan: /* @__PURE__ */ __name(() => bgCyan, "bgCyan"),
  bgGreen: /* @__PURE__ */ __name(() => bgGreen, "bgGreen"),
  bgMagenta: /* @__PURE__ */ __name(() => bgMagenta, "bgMagenta"),
  bgRed: /* @__PURE__ */ __name(() => bgRed, "bgRed"),
  bgWhite: /* @__PURE__ */ __name(() => bgWhite, "bgWhite"),
  bgYellow: /* @__PURE__ */ __name(() => bgYellow, "bgYellow"),
  black: /* @__PURE__ */ __name(() => black, "black"),
  blue: /* @__PURE__ */ __name(() => blue, "blue"),
  bold: /* @__PURE__ */ __name(() => bold, "bold"),
  cyan: /* @__PURE__ */ __name(() => cyan, "cyan"),
  dim: /* @__PURE__ */ __name(() => dim, "dim"),
  gray: /* @__PURE__ */ __name(() => gray, "gray"),
  green: /* @__PURE__ */ __name(() => green, "green"),
  grey: /* @__PURE__ */ __name(() => grey, "grey"),
  hidden: /* @__PURE__ */ __name(() => hidden, "hidden"),
  inverse: /* @__PURE__ */ __name(() => inverse, "inverse"),
  italic: /* @__PURE__ */ __name(() => italic, "italic"),
  magenta: /* @__PURE__ */ __name(() => magenta, "magenta"),
  red: /* @__PURE__ */ __name(() => red, "red"),
  reset: /* @__PURE__ */ __name(() => reset, "reset"),
  strikethrough: /* @__PURE__ */ __name(() => strikethrough, "strikethrough"),
  underline: /* @__PURE__ */ __name(() => underline, "underline"),
  white: /* @__PURE__ */ __name(() => white, "white"),
  yellow: /* @__PURE__ */ __name(() => yellow, "yellow")
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x4, y4) {
  let rgx = new RegExp(`\\x1b\\[${y4}m`, "g");
  let open = `\x1B[${x4}m`, close = `\x1B[${y4}m`;
  return function(txt) {
    if (!$.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
__name(init, "init");
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var MAX_ARGS_HISTORY = 100;
var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
  enable(namespace) {
    if (typeof namespace === "string") {
      globalThis.DEBUG = namespace;
    }
  },
  disable() {
    const prev = globalThis.DEBUG;
    globalThis.DEBUG = "";
    return prev;
  },
  // this is the core logic to check if logging should happen or not
  enabled(namespace) {
    const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
      return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    });
    const isListened = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
      return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
    });
    const isExcluded = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
      return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
    });
    return isListened && !isExcluded;
  },
  log: /* @__PURE__ */ __name((...args) => {
    const [namespace, format, ...rest] = args;
    const logWithFormatting = console.warn ?? console.log;
    logWithFormatting(`${namespace} ${format}`, ...rest);
  }, "log"),
  formatters: {}
  // not implemented
};
function debugCreate(namespace) {
  const instanceProps = {
    color: COLORS[lastColor++ % COLORS.length],
    enabled: topProps.enabled(namespace),
    namespace,
    log: topProps.log,
    extend: /* @__PURE__ */ __name(() => {
    }, "extend")
    // not implemented
  };
  const debugCall = /* @__PURE__ */ __name((...args) => {
    const { enabled, namespace: namespace2, color, log: log3 } = instanceProps;
    if (args.length !== 0) {
      argsHistory.push([namespace2, ...args]);
    }
    if (argsHistory.length > MAX_ARGS_HISTORY) {
      argsHistory.shift();
    }
    if (topProps.enabled(namespace2) || enabled) {
      const stringArgs = args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        return safeStringify(arg);
      });
      const ms2 = `+${Date.now() - lastTimestamp}ms`;
      lastTimestamp = Date.now();
      if (globalThis.DEBUG_COLORS) {
        log3(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms2));
      } else {
        log3(namespace2, ...stringArgs, ms2);
      }
    }
  }, "debugCall");
  return new Proxy(debugCall, {
    get: /* @__PURE__ */ __name((_2, prop) => instanceProps[prop], "get"),
    set: /* @__PURE__ */ __name((_2, prop, value) => instanceProps[prop] = value, "set")
  });
}
__name(debugCreate, "debugCreate");
var Debug = new Proxy(debugCreate, {
  get: /* @__PURE__ */ __name((_2, prop) => topProps[prop], "get"),
  set: /* @__PURE__ */ __name((_2, prop, value) => topProps[prop] = value, "set")
});
function safeStringify(value, indent = 2) {
  const cache = /* @__PURE__ */ new Set();
  return JSON.stringify(
    value,
    (key, value2) => {
      if (typeof value2 === "object" && value2 !== null) {
        if (cache.has(value2)) {
          return `[Circular *]`;
        }
        cache.add(value2);
      } else if (typeof value2 === "bigint") {
        return value2.toString();
      }
      return value2;
    },
    indent
  );
}
__name(safeStringify, "safeStringify");

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var DriverAdapterError = class extends Error {
  static {
    __name(this, "DriverAdapterError");
  }
  name = "DriverAdapterError";
  cause;
  constructor(payload) {
    super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
    this.cause = payload;
  }
};
var debug = Debug("driver-adapter-utils");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};
var mockAdapterErrors = {
  queryRaw: new Error("Not implemented: queryRaw"),
  executeRaw: new Error("Not implemented: executeRaw"),
  startTransaction: new Error("Not implemented: startTransaction"),
  executeScript: new Error("Not implemented: executeScript"),
  dispose: new Error("Not implemented: dispose")
};

// node_modules/pg/esm/index.mjs
init_modules_watch_stub();
var import_lib = __toESM(require_lib2(), 1);
var Client = import_lib.default.Client;
var Pool = import_lib.default.Pool;
var Connection = import_lib.default.Connection;
var types = import_lib.default.types;
var Query = import_lib.default.Query;
var DatabaseError = import_lib.default.DatabaseError;
var escapeIdentifier = import_lib.default.escapeIdentifier;
var escapeLiteral = import_lib.default.escapeLiteral;
var Result = import_lib.default.Result;
var TypeOverrides = import_lib.default.TypeOverrides;
var defaults = import_lib.default.defaults;
var esm_default = import_lib.default;

// node_modules/@prisma/adapter-pg/dist/index.mjs
var import_postgres_array = __toESM(require_postgres_array2(), 1);
var name = "@prisma/adapter-pg";
var FIRST_NORMAL_OBJECT_ID = 16384;
var { types: types2 } = esm_default;
var { builtins: ScalarColumnType, getTypeParser } = types2;
var AdditionalScalarColumnType = {
  NAME: 19
};
var ArrayColumnType = {
  BIT_ARRAY: 1561,
  BOOL_ARRAY: 1e3,
  BYTEA_ARRAY: 1001,
  BPCHAR_ARRAY: 1014,
  CHAR_ARRAY: 1002,
  CIDR_ARRAY: 651,
  DATE_ARRAY: 1182,
  FLOAT4_ARRAY: 1021,
  FLOAT8_ARRAY: 1022,
  INET_ARRAY: 1041,
  INT2_ARRAY: 1005,
  INT4_ARRAY: 1007,
  INT8_ARRAY: 1016,
  JSONB_ARRAY: 3807,
  JSON_ARRAY: 199,
  MONEY_ARRAY: 791,
  NUMERIC_ARRAY: 1231,
  OID_ARRAY: 1028,
  TEXT_ARRAY: 1009,
  TIMESTAMP_ARRAY: 1115,
  TIMESTAMPTZ_ARRAY: 1185,
  TIME_ARRAY: 1183,
  UUID_ARRAY: 2951,
  VARBIT_ARRAY: 1563,
  VARCHAR_ARRAY: 1015,
  XML_ARRAY: 143
};
var UnsupportedNativeDataType = class _UnsupportedNativeDataType extends Error {
  static {
    __name(this, "_UnsupportedNativeDataType");
  }
  // map of type codes to type names
  static typeNames = {
    16: "bool",
    17: "bytea",
    18: "char",
    19: "name",
    20: "int8",
    21: "int2",
    22: "int2vector",
    23: "int4",
    24: "regproc",
    25: "text",
    26: "oid",
    27: "tid",
    28: "xid",
    29: "cid",
    30: "oidvector",
    32: "pg_ddl_command",
    71: "pg_type",
    75: "pg_attribute",
    81: "pg_proc",
    83: "pg_class",
    114: "json",
    142: "xml",
    194: "pg_node_tree",
    269: "table_am_handler",
    325: "index_am_handler",
    600: "point",
    601: "lseg",
    602: "path",
    603: "box",
    604: "polygon",
    628: "line",
    650: "cidr",
    700: "float4",
    701: "float8",
    705: "unknown",
    718: "circle",
    774: "macaddr8",
    790: "money",
    829: "macaddr",
    869: "inet",
    1033: "aclitem",
    1042: "bpchar",
    1043: "varchar",
    1082: "date",
    1083: "time",
    1114: "timestamp",
    1184: "timestamptz",
    1186: "interval",
    1266: "timetz",
    1560: "bit",
    1562: "varbit",
    1700: "numeric",
    1790: "refcursor",
    2202: "regprocedure",
    2203: "regoper",
    2204: "regoperator",
    2205: "regclass",
    2206: "regtype",
    2249: "record",
    2275: "cstring",
    2276: "any",
    2277: "anyarray",
    2278: "void",
    2279: "trigger",
    2280: "language_handler",
    2281: "internal",
    2283: "anyelement",
    2287: "_record",
    2776: "anynonarray",
    2950: "uuid",
    2970: "txid_snapshot",
    3115: "fdw_handler",
    3220: "pg_lsn",
    3310: "tsm_handler",
    3361: "pg_ndistinct",
    3402: "pg_dependencies",
    3500: "anyenum",
    3614: "tsvector",
    3615: "tsquery",
    3642: "gtsvector",
    3734: "regconfig",
    3769: "regdictionary",
    3802: "jsonb",
    3831: "anyrange",
    3838: "event_trigger",
    3904: "int4range",
    3906: "numrange",
    3908: "tsrange",
    3910: "tstzrange",
    3912: "daterange",
    3926: "int8range",
    4072: "jsonpath",
    4089: "regnamespace",
    4096: "regrole",
    4191: "regcollation",
    4451: "int4multirange",
    4532: "nummultirange",
    4533: "tsmultirange",
    4534: "tstzmultirange",
    4535: "datemultirange",
    4536: "int8multirange",
    4537: "anymultirange",
    4538: "anycompatiblemultirange",
    4600: "pg_brin_bloom_summary",
    4601: "pg_brin_minmax_multi_summary",
    5017: "pg_mcv_list",
    5038: "pg_snapshot",
    5069: "xid8",
    5077: "anycompatible",
    5078: "anycompatiblearray",
    5079: "anycompatiblenonarray",
    5080: "anycompatiblerange"
  };
  type;
  constructor(code) {
    super();
    this.type = _UnsupportedNativeDataType.typeNames[code] || "Unknown";
    this.message = `Unsupported column type ${this.type}`;
  }
};
function fieldToColumnType(fieldTypeId) {
  switch (fieldTypeId) {
    case ScalarColumnType.INT2:
    case ScalarColumnType.INT4:
      return ColumnTypeEnum.Int32;
    case ScalarColumnType.INT8:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.FLOAT4:
      return ColumnTypeEnum.Float;
    case ScalarColumnType.FLOAT8:
      return ColumnTypeEnum.Double;
    case ScalarColumnType.BOOL:
      return ColumnTypeEnum.Boolean;
    case ScalarColumnType.DATE:
      return ColumnTypeEnum.Date;
    case ScalarColumnType.TIME:
    case ScalarColumnType.TIMETZ:
      return ColumnTypeEnum.Time;
    case ScalarColumnType.TIMESTAMP:
    case ScalarColumnType.TIMESTAMPTZ:
      return ColumnTypeEnum.DateTime;
    case ScalarColumnType.NUMERIC:
    case ScalarColumnType.MONEY:
      return ColumnTypeEnum.Numeric;
    case ScalarColumnType.JSON:
    case ScalarColumnType.JSONB:
      return ColumnTypeEnum.Json;
    case ScalarColumnType.UUID:
      return ColumnTypeEnum.Uuid;
    case ScalarColumnType.OID:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.BPCHAR:
    case ScalarColumnType.TEXT:
    case ScalarColumnType.VARCHAR:
    case ScalarColumnType.BIT:
    case ScalarColumnType.VARBIT:
    case ScalarColumnType.INET:
    case ScalarColumnType.CIDR:
    case ScalarColumnType.XML:
    case AdditionalScalarColumnType.NAME:
      return ColumnTypeEnum.Text;
    case ScalarColumnType.BYTEA:
      return ColumnTypeEnum.Bytes;
    case ArrayColumnType.INT2_ARRAY:
    case ArrayColumnType.INT4_ARRAY:
      return ColumnTypeEnum.Int32Array;
    case ArrayColumnType.FLOAT4_ARRAY:
      return ColumnTypeEnum.FloatArray;
    case ArrayColumnType.FLOAT8_ARRAY:
      return ColumnTypeEnum.DoubleArray;
    case ArrayColumnType.NUMERIC_ARRAY:
    case ArrayColumnType.MONEY_ARRAY:
      return ColumnTypeEnum.NumericArray;
    case ArrayColumnType.BOOL_ARRAY:
      return ColumnTypeEnum.BooleanArray;
    case ArrayColumnType.CHAR_ARRAY:
      return ColumnTypeEnum.CharacterArray;
    case ArrayColumnType.BPCHAR_ARRAY:
    case ArrayColumnType.TEXT_ARRAY:
    case ArrayColumnType.VARCHAR_ARRAY:
    case ArrayColumnType.VARBIT_ARRAY:
    case ArrayColumnType.BIT_ARRAY:
    case ArrayColumnType.INET_ARRAY:
    case ArrayColumnType.CIDR_ARRAY:
    case ArrayColumnType.XML_ARRAY:
      return ColumnTypeEnum.TextArray;
    case ArrayColumnType.DATE_ARRAY:
      return ColumnTypeEnum.DateArray;
    case ArrayColumnType.TIME_ARRAY:
      return ColumnTypeEnum.TimeArray;
    case ArrayColumnType.TIMESTAMP_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.TIMESTAMPTZ_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.JSON_ARRAY:
    case ArrayColumnType.JSONB_ARRAY:
      return ColumnTypeEnum.JsonArray;
    case ArrayColumnType.BYTEA_ARRAY:
      return ColumnTypeEnum.BytesArray;
    case ArrayColumnType.UUID_ARRAY:
      return ColumnTypeEnum.UuidArray;
    case ArrayColumnType.INT8_ARRAY:
    case ArrayColumnType.OID_ARRAY:
      return ColumnTypeEnum.Int64Array;
    default:
      if (fieldTypeId >= FIRST_NORMAL_OBJECT_ID) {
        return ColumnTypeEnum.Text;
      }
      throw new UnsupportedNativeDataType(fieldTypeId);
  }
}
__name(fieldToColumnType, "fieldToColumnType");
function normalize_array(element_normalizer) {
  return (str) => (0, import_postgres_array.parse)(str, element_normalizer);
}
__name(normalize_array, "normalize_array");
function normalize_numeric(numeric) {
  return numeric;
}
__name(normalize_numeric, "normalize_numeric");
function normalize_date(date) {
  return date;
}
__name(normalize_date, "normalize_date");
function normalize_timestamp(time) {
  return `${time.replace(" ", "T")}+00:00`;
}
__name(normalize_timestamp, "normalize_timestamp");
function normalize_timestamptz(time) {
  return time.replace(" ", "T").replace(/[+-]\d{2}(:\d{2})?$/, "+00:00");
}
__name(normalize_timestamptz, "normalize_timestamptz");
function normalize_time(time) {
  return time;
}
__name(normalize_time, "normalize_time");
function normalize_timez(time) {
  return time.replace(/[+-]\d{2}(:\d{2})?$/, "");
}
__name(normalize_timez, "normalize_timez");
function normalize_money(money) {
  return money.slice(1);
}
__name(normalize_money, "normalize_money");
function normalize_xml(xml) {
  return xml;
}
__name(normalize_xml, "normalize_xml");
function toJson(json) {
  return json;
}
__name(toJson, "toJson");
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var normalizeByteaArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function convertBytes(serializedBytes) {
  return parsePgBytes(serializedBytes);
}
__name(convertBytes, "convertBytes");
function normalizeBit(bit) {
  return bit;
}
__name(normalizeBit, "normalizeBit");
var customParsers = {
  [ScalarColumnType.NUMERIC]: normalize_numeric,
  [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
  [ScalarColumnType.TIME]: normalize_time,
  [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
  [ScalarColumnType.TIMETZ]: normalize_timez,
  [ScalarColumnType.DATE]: normalize_date,
  [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
  [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
  [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
  [ScalarColumnType.TIMESTAMPTZ]: normalize_timestamptz,
  [ArrayColumnType.TIMESTAMPTZ_ARRAY]: normalize_array(normalize_timestamptz),
  [ScalarColumnType.MONEY]: normalize_money,
  [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
  [ScalarColumnType.JSON]: toJson,
  [ArrayColumnType.JSON_ARRAY]: normalize_array(toJson),
  [ScalarColumnType.JSONB]: toJson,
  [ArrayColumnType.JSONB_ARRAY]: normalize_array(toJson),
  [ScalarColumnType.BYTEA]: convertBytes,
  [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
  [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function mapArg(arg, argType) {
  if (arg === null) {
    return null;
  }
  if (Array.isArray(arg) && argType.arity === "list") {
    return arg.map((value) => mapArg(value, argType));
  }
  if (typeof arg === "string" && argType.scalarType === "datetime") {
    arg = new Date(arg);
  }
  if (arg instanceof Date) {
    switch (argType.dbType) {
      case "TIME":
      case "TIMETZ":
        return formatTime(arg);
      case "DATE":
        return formatDate(arg);
      default:
        return formatDateTime(arg);
    }
  }
  if (typeof arg === "string" && argType.scalarType === "bytes") {
    return Buffer.from(arg, "base64");
  }
  if (ArrayBuffer.isView(arg)) {
    return new Uint8Array(arg.buffer, arg.byteOffset, arg.byteLength);
  }
  return arg;
}
__name(mapArg, "mapArg");
function formatDateTime(date) {
  const pad = /* @__PURE__ */ __name((n, z4 = 2) => String(n).padStart(z4, "0"), "pad");
  const ms2 = date.getUTCMilliseconds();
  return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms2 ? "." + String(ms2).padStart(3, "0") : "");
}
__name(formatDateTime, "formatDateTime");
function formatDate(date) {
  const pad = /* @__PURE__ */ __name((n, z4 = 2) => String(n).padStart(z4, "0"), "pad");
  return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
}
__name(formatDate, "formatDate");
function formatTime(date) {
  const pad = /* @__PURE__ */ __name((n, z4 = 2) => String(n).padStart(z4, "0"), "pad");
  const ms2 = date.getUTCMilliseconds();
  return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms2 ? "." + String(ms2).padStart(3, "0") : "");
}
__name(formatTime, "formatTime");
var TLS_ERRORS = /* @__PURE__ */ new Set([
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_CRL",
  "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
  "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
  "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
  "CERT_SIGNATURE_FAILURE",
  "CRL_SIGNATURE_FAILURE",
  "CERT_NOT_YET_VALID",
  "CERT_HAS_EXPIRED",
  "CRL_NOT_YET_VALID",
  "CRL_HAS_EXPIRED",
  "ERROR_IN_CERT_NOT_BEFORE_FIELD",
  "ERROR_IN_CERT_NOT_AFTER_FIELD",
  "ERROR_IN_CRL_LAST_UPDATE_FIELD",
  "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "CERT_CHAIN_TOO_LONG",
  "CERT_REVOKED",
  "INVALID_CA",
  "INVALID_PURPOSE",
  "CERT_UNTRUSTED",
  "CERT_REJECTED",
  "HOSTNAME_MISMATCH",
  "ERR_TLS_CERT_ALTNAME_FORMAT",
  "ERR_TLS_CERT_ALTNAME_INVALID"
]);
var SOCKET_ERRORS = /* @__PURE__ */ new Set(["ENOTFOUND", "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT"]);
function convertDriverError(error) {
  if (isSocketError(error)) {
    return mapSocketError(error);
  }
  if (isTlsError(error)) {
    return {
      kind: "TlsConnectionError",
      reason: error.message
    };
  }
  if (isDriverError(error)) {
    return {
      originalCode: error.code,
      originalMessage: error.message,
      ...mapDriverError(error)
    };
  }
  throw error;
}
__name(convertDriverError, "convertDriverError");
function mapDriverError(error) {
  switch (error.code) {
    case "22001":
      return {
        kind: "LengthMismatch",
        column: error.column
      };
    case "22003":
      return {
        kind: "ValueOutOfRange",
        cause: error.message
      };
    case "22P02":
      return {
        kind: "InvalidInputValue",
        message: error.message
      };
    case "23505": {
      const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
      let constraint;
      if (error.constraint) {
        constraint = { index: error.constraint };
      } else if (fields !== void 0) {
        constraint = { fields };
      }
      let table = error.table;
      if (table === void 0 && fields !== void 0 && fields.length > 0) {
        const suffix = `_${fields.join("_")}_key`;
        if (error.constraint?.endsWith(suffix)) {
          table = error.constraint.slice(0, -suffix.length);
        }
      }
      return {
        kind: "UniqueConstraintViolation",
        constraint,
        table
      };
    }
    case "23502": {
      const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
      return {
        kind: "NullConstraintViolation",
        constraint: fields !== void 0 ? { fields } : void 0
      };
    }
    case "23503": {
      let constraint;
      if (error.column) {
        constraint = { fields: [error.column] };
      } else if (error.constraint) {
        constraint = { index: error.constraint };
      }
      return {
        kind: "ForeignKeyConstraintViolation",
        constraint
      };
    }
    case "23001": {
      let constraint;
      if (error.column) {
        constraint = { fields: [error.column] };
      } else if (error.constraint) {
        constraint = { index: error.constraint };
      }
      return {
        kind: "RestrictViolation",
        constraint
      };
    }
    case "3D000":
      return {
        kind: "DatabaseDoesNotExist",
        db: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "28000":
      return {
        kind: "DatabaseAccessDenied",
        db: error.message.split(",").find((s) => s.startsWith(" database"))?.split('"').at(1)
      };
    case "28P01":
      return {
        kind: "AuthenticationFailed",
        user: error.message.split(" ").pop()?.split('"').at(1)
      };
    case "40001":
    case "40P01":
      return {
        kind: "TransactionWriteConflict"
      };
    case "42P01":
      return {
        kind: "TableDoesNotExist",
        table: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "42703": {
      const rawColumn = error.message.match(/^column (.+) does not exist$/)?.at(1);
      return {
        kind: "ColumnNotFound",
        column: rawColumn?.replace(/"((?:""|[^"])*)"/g, (_2, id) => id.replaceAll('""', '"'))
      };
    }
    case "42P04":
      return {
        kind: "DatabaseAlreadyExists",
        db: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "53300":
      return {
        kind: "TooManyConnections",
        cause: error.message
      };
    default:
      return {
        kind: "postgres",
        code: error.code ?? "N/A",
        severity: error.severity ?? "N/A",
        message: error.message,
        detail: error.detail,
        column: error.column,
        hint: error.hint
      };
  }
}
__name(mapDriverError, "mapDriverError");
function isDriverError(error) {
  return typeof error.code === "string" && typeof error.message === "string" && typeof error.severity === "string" && (typeof error.detail === "string" || error.detail === void 0) && (typeof error.column === "string" || error.column === void 0) && (typeof error.hint === "string" || error.hint === void 0);
}
__name(isDriverError, "isDriverError");
function mapSocketError(error) {
  switch (error.code) {
    case "ENOTFOUND":
    case "ECONNREFUSED":
      return {
        kind: "DatabaseNotReachable",
        host: error.address ?? error.hostname,
        port: error.port
      };
    case "ECONNRESET":
      return {
        kind: "ConnectionClosed"
      };
    case "ETIMEDOUT":
      return {
        kind: "SocketTimeout"
      };
  }
}
__name(mapSocketError, "mapSocketError");
function isSocketError(error) {
  return typeof error.code === "string" && typeof error.syscall === "string" && typeof error.errno === "number" && SOCKET_ERRORS.has(error.code);
}
__name(isSocketError, "isSocketError");
function isTlsError(error) {
  if (typeof error.code === "string") {
    return TLS_ERRORS.has(error.code);
  }
  switch (error.message) {
    case "The server does not support SSL connections":
    case "There was an error establishing an SSL connection":
      return true;
  }
  return false;
}
__name(isTlsError, "isTlsError");
var types22 = esm_default.types;
var debug2 = Debug("prisma:driver-adapter:pg");
var PgQueryable = class {
  static {
    __name(this, "PgQueryable");
  }
  constructor(client, pgOptions) {
    this.client = client;
    this.pgOptions = pgOptions;
  }
  provider = "postgres";
  adapterName = name;
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag2 = "[js::query_raw]";
    debug2(`${tag2} %O`, query);
    const { fields, rows } = await this.performIO(query);
    const columnNames = fields.map((field) => field.name);
    let columnTypes = [];
    try {
      columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
    } catch (e7) {
      if (e7 instanceof UnsupportedNativeDataType) {
        throw new DriverAdapterError({
          kind: "UnsupportedNativeDataType",
          type: e7.type
        });
      }
      throw e7;
    }
    const udtParser = this.pgOptions?.userDefinedTypeParser;
    if (udtParser) {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.dataTypeID >= FIRST_NORMAL_OBJECT_ID && !Object.hasOwn(customParsers, field.dataTypeID)) {
          for (let j2 = 0; j2 < rows.length; j2++) {
            rows[j2][i] = await udtParser(field.dataTypeID, rows[j2][i], this);
          }
        }
      }
    }
    return {
      columnNames,
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag2 = "[js::execute_raw]";
    debug2(`${tag2} %O`, query);
    return (await this.performIO(query)).rowCount ?? 0;
  }
  /**
   * Run a query against the database, returning the result set.
   * Should the query fail due to a connection error, the connection is
   * marked as unhealthy.
   */
  async performIO(query) {
    const { sql: sql2, args } = query;
    const values = args.map((arg, i) => mapArg(arg, query.argTypes[i]));
    try {
      const result = await this.client.query({
        name: this.pgOptions?.statementNameGenerator?.(query),
        text: sql2,
        values,
        rowMode: "array",
        types: {
          getTypeParser: /* @__PURE__ */ __name((oid, format) => {
            if (format === "text" && customParsers[oid]) {
              return customParsers[oid];
            }
            return types22.getTypeParser(oid, format);
          }, "getTypeParser")
        }
      });
      return result;
    } catch (e7) {
      this.onError(e7);
    }
  }
  onError(error) {
    debug2("Error in performIO: %O", error);
    throw new DriverAdapterError(convertDriverError(error));
  }
};
var PgTransaction = class extends PgQueryable {
  static {
    __name(this, "PgTransaction");
  }
  constructor(client, options, pgOptions, cleanup) {
    super(client, pgOptions);
    this.options = options;
    this.pgOptions = pgOptions;
    this.cleanup = cleanup;
  }
  async commit() {
    debug2(`[js::commit]`);
    this.cleanup?.();
    this.client.release();
  }
  async rollback() {
    debug2(`[js::rollback]`);
    this.cleanup?.();
    this.client.release();
  }
  async createSavepoint(name2) {
    await this.executeRaw({ sql: `SAVEPOINT ${name2}`, args: [], argTypes: [] });
  }
  async rollbackToSavepoint(name2) {
    await this.executeRaw({ sql: `ROLLBACK TO SAVEPOINT ${name2}`, args: [], argTypes: [] });
  }
  async releaseSavepoint(name2) {
    await this.executeRaw({ sql: `RELEASE SAVEPOINT ${name2}`, args: [], argTypes: [] });
  }
};
var PrismaPgAdapter = class extends PgQueryable {
  static {
    __name(this, "PrismaPgAdapter");
  }
  constructor(client, pgOptions, release) {
    super(client);
    this.pgOptions = pgOptions;
    this.release = release;
  }
  async startTransaction(isolationLevel) {
    const options = {
      usePhantomQuery: false
    };
    const tag2 = "[js::startTransaction]";
    debug2("%s options: %O", tag2, options);
    const conn = await this.client.connect().catch((error) => this.onError(error));
    const onError = /* @__PURE__ */ __name((err) => {
      debug2(`Error from pool connection: ${err.message} %O`, err);
      this.pgOptions?.onConnectionError?.(err);
    }, "onError");
    conn.on("error", onError);
    const cleanup = /* @__PURE__ */ __name(() => {
      conn.removeListener("error", onError);
    }, "cleanup");
    try {
      const tx = new PgTransaction(conn, options, this.pgOptions, cleanup);
      await tx.executeRaw({ sql: "BEGIN", args: [], argTypes: [] });
      if (isolationLevel) {
        await tx.executeRaw({
          sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
          args: [],
          argTypes: []
        });
      }
      return tx;
    } catch (error) {
      cleanup();
      conn.release(error);
      this.onError(error);
    }
  }
  async executeScript(script) {
    const statements = script.split(";").map((stmt) => stmt.trim()).filter((stmt) => stmt.length > 0);
    for (const stmt of statements) {
      try {
        await this.client.query(stmt);
      } catch (error) {
        this.onError(error);
      }
    }
  }
  getConnectionInfo() {
    return {
      schemaName: this.pgOptions?.schema,
      supportsRelationJoins: true
    };
  }
  async dispose() {
    return this.release?.();
  }
  underlyingDriver() {
    return this.client;
  }
};
var PrismaPgAdapterFactory = class {
  static {
    __name(this, "PrismaPgAdapterFactory");
  }
  constructor(poolOrConfig, options) {
    this.options = options;
    if (poolOrConfig instanceof esm_default.Pool) {
      this.externalPool = poolOrConfig;
      this.config = poolOrConfig.options;
    } else if (typeof poolOrConfig === "string") {
      this.externalPool = null;
      this.config = { connectionString: poolOrConfig };
    } else {
      this.externalPool = null;
      this.config = poolOrConfig;
    }
  }
  provider = "postgres";
  adapterName = name;
  config;
  externalPool;
  async connect() {
    const client = this.externalPool ?? new esm_default.Pool(this.config);
    const onIdleClientError = /* @__PURE__ */ __name((err) => {
      debug2(`Error from idle pool client: ${err.message} %O`, err);
      this.options?.onPoolError?.(err);
    }, "onIdleClientError");
    client.on("error", onIdleClientError);
    return new PrismaPgAdapter(client, this.options, async () => {
      if (this.externalPool) {
        if (this.options?.disposeExternalPool) {
          await this.externalPool.end();
          this.externalPool = null;
        } else {
          this.externalPool.removeListener("error", onIdleClientError);
        }
      } else {
        await client.end();
      }
    });
  }
  async connectToShadowDb() {
    const conn = await this.connect();
    const database = `prisma_migrate_shadow_db_${globalThis.crypto.randomUUID()}`;
    await conn.executeScript(`CREATE DATABASE "${database}"`);
    const client = new esm_default.Pool({ ...this.config, database });
    return new PrismaPgAdapter(client, void 0, async () => {
      await conn.executeScript(`DROP DATABASE "${database}"`);
      await client.end();
    });
  }
};

// generated/prisma/client.ts
init_modules_watch_stub();

// generated/prisma/internal/class.ts
init_modules_watch_stub();

// node_modules/@prisma/client/runtime/wasm-compiler-edge.mjs
init_modules_watch_stub();

// node_modules/@prisma/client-runtime-utils/dist/index.mjs
init_modules_watch_stub();
function hasBatchIndex(value) {
  return typeof value["batchRequestIdx"] === "number";
}
__name(hasBatchIndex, "hasBatchIndex");
function setClassName(classObject, name2) {
  Object.defineProperty(classObject, "name", {
    value: name2,
    configurable: true
  });
}
__name(setClassName, "setClassName");
var PrismaClientInitializationError = class _PrismaClientInitializationError extends Error {
  static {
    __name(this, "_PrismaClientInitializationError");
  }
  clientVersion;
  errorCode;
  retryable;
  constructor(message, clientVersion, errorCode) {
    super(message);
    this.name = "PrismaClientInitializationError";
    this.clientVersion = clientVersion;
    this.errorCode = errorCode;
    Error.captureStackTrace(_PrismaClientInitializationError);
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientInitializationError";
  }
};
setClassName(PrismaClientInitializationError, "PrismaClientInitializationError");
var PrismaClientKnownRequestError = class extends Error {
  static {
    __name(this, "PrismaClientKnownRequestError");
  }
  code;
  meta;
  clientVersion;
  batchRequestIdx;
  constructor(message, { code, clientVersion, meta, batchRequestIdx }) {
    super(message);
    this.name = "PrismaClientKnownRequestError";
    this.code = code;
    this.clientVersion = clientVersion;
    this.meta = meta;
    Object.defineProperty(this, "batchRequestIdx", {
      value: batchRequestIdx,
      enumerable: false,
      writable: true
    });
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientKnownRequestError";
  }
};
setClassName(PrismaClientKnownRequestError, "PrismaClientKnownRequestError");
function getBacktrace(log3) {
  if (log3.fields?.message) {
    let str = log3.fields?.message;
    if (log3.fields?.file) {
      str += ` in ${log3.fields.file}`;
      if (log3.fields?.line) {
        str += `:${log3.fields.line}`;
      }
      if (log3.fields?.column) {
        str += `:${log3.fields.column}`;
      }
    }
    if (log3.fields?.reason) {
      str += `
${log3.fields?.reason}`;
    }
    return str;
  }
  return "Unknown error";
}
__name(getBacktrace, "getBacktrace");
function isPanic(err) {
  return err.fields?.message === "PANIC";
}
__name(isPanic, "isPanic");
var PrismaClientRustError = class extends Error {
  static {
    __name(this, "PrismaClientRustError");
  }
  clientVersion;
  _isPanic;
  constructor({ clientVersion, error }) {
    const backtrace = getBacktrace(error);
    super(backtrace ?? "Unknown error");
    this._isPanic = isPanic(error);
    this.clientVersion = clientVersion;
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientRustError";
  }
  isPanic() {
    return this._isPanic;
  }
};
setClassName(PrismaClientRustError, "PrismaClientRustError");
var PrismaClientRustPanicError = class extends Error {
  static {
    __name(this, "PrismaClientRustPanicError");
  }
  clientVersion;
  constructor(message, clientVersion) {
    super(message);
    this.name = "PrismaClientRustPanicError";
    this.clientVersion = clientVersion;
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientRustPanicError";
  }
};
setClassName(PrismaClientRustPanicError, "PrismaClientRustPanicError");
var PrismaClientUnknownRequestError = class extends Error {
  static {
    __name(this, "PrismaClientUnknownRequestError");
  }
  clientVersion;
  batchRequestIdx;
  constructor(message, { clientVersion, batchRequestIdx }) {
    super(message);
    this.name = "PrismaClientUnknownRequestError";
    this.clientVersion = clientVersion;
    Object.defineProperty(this, "batchRequestIdx", {
      value: batchRequestIdx,
      writable: true,
      enumerable: false
    });
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientUnknownRequestError";
  }
};
setClassName(PrismaClientUnknownRequestError, "PrismaClientUnknownRequestError");
var PrismaClientValidationError = class extends Error {
  static {
    __name(this, "PrismaClientValidationError");
  }
  name = "PrismaClientValidationError";
  clientVersion;
  constructor(message, { clientVersion }) {
    super(message);
    this.clientVersion = clientVersion;
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientValidationError";
  }
};
setClassName(PrismaClientValidationError, "PrismaClientValidationError");
var secret = /* @__PURE__ */ Symbol();
var PRISMA_OBJECT_ENUM_VALUE = /* @__PURE__ */ Symbol.for("prisma.objectEnumValue");
var ObjectEnumValue = class {
  static {
    __name(this, "ObjectEnumValue");
  }
  [PRISMA_OBJECT_ENUM_VALUE] = true;
  #representation;
  constructor(arg) {
    if (arg === secret) {
      this.#representation = `Prisma.${this._getName()}`;
    } else {
      this.#representation = `new Prisma.${this._getNamespace()}.${this._getName()}()`;
    }
  }
  _getName() {
    return this.constructor.name;
  }
  toString() {
    return this.#representation;
  }
};
function setClassName2(classObject, name2) {
  Object.defineProperty(classObject, "name", {
    value: name2,
    configurable: true
  });
}
__name(setClassName2, "setClassName2");
var NullTypesEnumValue = class extends ObjectEnumValue {
  static {
    __name(this, "NullTypesEnumValue");
  }
  _getNamespace() {
    return "NullTypes";
  }
};
var DbNullClass = class extends NullTypesEnumValue {
  static {
    __name(this, "DbNullClass");
  }
  // Phantom private property to prevent structural type equality
  // eslint-disable-next-line no-unused-private-class-members
  #_brand_DbNull;
};
setClassName2(DbNullClass, "DbNull");
var JsonNullClass = class extends NullTypesEnumValue {
  static {
    __name(this, "JsonNullClass");
  }
  // Phantom private property to prevent structural type equality
  // eslint-disable-next-line no-unused-private-class-members
  #_brand_JsonNull;
};
setClassName2(JsonNullClass, "JsonNull");
var AnyNullClass = class extends NullTypesEnumValue {
  static {
    __name(this, "AnyNullClass");
  }
  // Phantom private property to prevent structural type equality
  // eslint-disable-next-line no-unused-private-class-members
  #_brand_AnyNull;
};
setClassName2(AnyNullClass, "AnyNull");
var NullTypes = {
  DbNull: DbNullClass,
  JsonNull: JsonNullClass,
  AnyNull: AnyNullClass
};
var DbNull = new DbNullClass(secret);
var JsonNull = new JsonNullClass(secret);
var AnyNull = new AnyNullClass(secret);
function isObjectEnumValue(value) {
  return typeof value === "object" && value !== null && value[PRISMA_OBJECT_ENUM_VALUE] === true;
}
__name(isObjectEnumValue, "isObjectEnumValue");
var EXP_LIMIT = 9e15;
var MAX_DIGITS = 1e9;
var NUMERALS = "0123456789abcdef";
var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var DEFAULTS = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -EXP_LIMIT,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: EXP_LIMIT,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: false
  // true/false
};
var inexact;
var quadrant;
var external = true;
var decimalError = "[DecimalError] ";
var invalidArgument = decimalError + "Invalid argument: ";
var precisionLimitExceeded = decimalError + "Precision limit exceeded";
var cryptoUnavailable = decimalError + "crypto unavailable";
var tag = "[object Decimal]";
var mathfloor = Math.floor;
var mathpow = Math.pow;
var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var BASE = 1e7;
var LOG_BASE = 7;
var MAX_SAFE_INTEGER = 9007199254740991;
var LN10_PRECISION = LN10.length - 1;
var PI_PRECISION = PI.length - 1;
var P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x4 = new this.constructor(this);
  if (x4.s < 0) x4.s = 1;
  return finalise(x4);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
  var k4, x4 = this, Ctor = x4.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s) return new Ctor(NaN);
  if (min2.gt(max2)) throw Error(invalidArgument + max2);
  k4 = x4.cmp(min2);
  return k4 < 0 ? min2 : x4.cmp(max2) > 0 ? max2 : new Ctor(x4);
};
P.comparedTo = P.cmp = function(y4) {
  var i, j2, xdL, ydL, x4 = this, xd = x4.d, yd = (y4 = new x4.constructor(y4)).d, xs2 = x4.s, ys2 = y4.s;
  if (!xd || !yd) {
    return !xs2 || !ys2 ? NaN : xs2 !== ys2 ? xs2 : xd === yd ? 0 : !xd ^ xs2 < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0]) return xd[0] ? xs2 : yd[0] ? -ys2 : 0;
  if (xs2 !== ys2) return xs2;
  if (x4.e !== y4.e) return x4.e > y4.e ^ xs2 < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j2 = xdL < ydL ? xdL : ydL; i < j2; ++i) {
    if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs2 < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs2 < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm2, x4 = this, Ctor = x4.constructor;
  if (!x4.d) return new Ctor(NaN);
  if (!x4.d[0]) return new Ctor(1);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + Math.max(x4.e, x4.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x4 = cosine(Ctor, toLessThanHalfPi(Ctor, x4));
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return finalise(quadrant == 2 || quadrant == 3 ? x4.neg() : x4, pr, rm2, true);
};
P.cubeRoot = P.cbrt = function() {
  var e7, m3, n, r, rep, s, sd, t, t3, t3plusx, x4 = this, Ctor = x4.constructor;
  if (!x4.isFinite() || x4.isZero()) return new Ctor(x4);
  external = false;
  s = x4.s * mathpow(x4.s * x4, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x4.d);
    e7 = x4.e;
    if (s = (e7 - n.length + 1) % 3) n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e7 = mathfloor((e7 + 1) / 3) - (e7 % 3 == (e7 < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e7;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e7;
    }
    r = new Ctor(n);
    r.s = x4.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e7 = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x4);
    r = divide(t3plusx.plus(x4).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e7 + 1, 0);
          if (t.times(t).times(t).eq(x4)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e7 + 1, 1);
          m3 = !r.times(r).times(r).eq(x4);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e7, Ctor.rounding, m3);
};
P.decimalPlaces = P.dp = function() {
  var w4, d2 = this.d, n = NaN;
  if (d2) {
    w4 = d2.length - 1;
    n = (w4 - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w4 = d2[w4];
    if (w4) for (; w4 % 10 == 0; w4 /= 10) n--;
    if (n < 0) n = 0;
  }
  return n;
};
P.dividedBy = P.div = function(y4) {
  return divide(this, new this.constructor(y4));
};
P.dividedToIntegerBy = P.divToInt = function(y4) {
  var x4 = this, Ctor = x4.constructor;
  return finalise(divide(x4, new Ctor(y4), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y4) {
  return this.cmp(y4) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y4) {
  return this.cmp(y4) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y4) {
  var k4 = this.cmp(y4);
  return k4 == 1 || k4 === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k4, n, pr, rm2, len, x4 = this, Ctor = x4.constructor, one = new Ctor(1);
  if (!x4.isFinite()) return new Ctor(x4.s ? 1 / 0 : NaN);
  if (x4.isZero()) return one;
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + Math.max(x4.e, x4.sd()) + 4;
  Ctor.rounding = 1;
  len = x4.d.length;
  if (len < 32) {
    k4 = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k4)).toString();
  } else {
    k4 = 16;
    n = "2.3283064365386962890625e-10";
  }
  x4 = taylorSeries(Ctor, 1, x4.times(n), new Ctor(1), true);
  var cosh2_x, i = k4, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x4.times(x4);
    x4 = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x4, Ctor.precision = pr, Ctor.rounding = rm2, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k4, pr, rm2, len, x4 = this, Ctor = x4.constructor;
  if (!x4.isFinite() || x4.isZero()) return new Ctor(x4);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + Math.max(x4.e, x4.sd()) + 4;
  Ctor.rounding = 1;
  len = x4.d.length;
  if (len < 3) {
    x4 = taylorSeries(Ctor, 2, x4, x4, true);
  } else {
    k4 = 1.4 * Math.sqrt(len);
    k4 = k4 > 16 ? 16 : k4 | 0;
    x4 = x4.times(1 / tinyPow(5, k4));
    x4 = taylorSeries(Ctor, 2, x4, x4, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k4--; ) {
      sinh2_x = x4.times(x4);
      x4 = x4.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return finalise(x4, pr, rm2, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm2, x4 = this, Ctor = x4.constructor;
  if (!x4.isFinite()) return new Ctor(x4.s);
  if (x4.isZero()) return new Ctor(x4);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x4.sinh(), x4.cosh(), Ctor.precision = pr, Ctor.rounding = rm2);
};
P.inverseCosine = P.acos = function() {
  var x4 = this, Ctor = x4.constructor, k4 = x4.abs().cmp(1), pr = Ctor.precision, rm2 = Ctor.rounding;
  if (k4 !== -1) {
    return k4 === 0 ? x4.isNeg() ? getPi(Ctor, pr, rm2) : new Ctor(0) : new Ctor(NaN);
  }
  if (x4.isZero()) return getPi(Ctor, pr + 4, rm2).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x4 = new Ctor(1).minus(x4).div(x4.plus(1)).sqrt().atan();
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return x4.times(2);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm2, x4 = this, Ctor = x4.constructor;
  if (x4.lte(1)) return new Ctor(x4.eq(1) ? 0 : NaN);
  if (!x4.isFinite()) return new Ctor(x4);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x4.e), x4.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x4 = x4.times(x4).minus(1).sqrt().plus(x4);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return x4.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm2, x4 = this, Ctor = x4.constructor;
  if (!x4.isFinite() || x4.isZero()) return new Ctor(x4);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x4.e), x4.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x4 = x4.times(x4).plus(1).sqrt().plus(x4);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return x4.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm2, wpr, xsd, x4 = this, Ctor = x4.constructor;
  if (!x4.isFinite()) return new Ctor(NaN);
  if (x4.e >= 0) return new Ctor(x4.abs().eq(1) ? x4.s / 0 : x4.isZero() ? x4 : NaN);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  xsd = x4.sd();
  if (Math.max(xsd, pr) < 2 * -x4.e - 1) return finalise(new Ctor(x4), pr, rm2, true);
  Ctor.precision = wpr = xsd - x4.e;
  x4 = divide(x4.plus(1), new Ctor(1).minus(x4), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x4 = x4.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return x4.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k4, pr, rm2, x4 = this, Ctor = x4.constructor;
  if (x4.isZero()) return new Ctor(x4);
  k4 = x4.abs().cmp(1);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  if (k4 !== -1) {
    if (k4 === 0) {
      halfPi = getPi(Ctor, pr + 4, rm2).times(0.5);
      halfPi.s = x4.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x4 = x4.div(new Ctor(1).minus(x4.times(x4)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return x4.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j2, k4, n, px, t, r, wpr, x22, x4 = this, Ctor = x4.constructor, pr = Ctor.precision, rm2 = Ctor.rounding;
  if (!x4.isFinite()) {
    if (!x4.s) return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm2).times(0.5);
      r.s = x4.s;
      return r;
    }
  } else if (x4.isZero()) {
    return new Ctor(x4);
  } else if (x4.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm2).times(0.25);
    r.s = x4.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k4 = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k4; i; --i) x4 = x4.div(x4.times(x4).plus(1).sqrt().plus(1));
  external = false;
  j2 = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x22 = x4.times(x4);
  r = new Ctor(x4);
  px = x4;
  for (; i !== -1; ) {
    px = px.times(x22);
    t = r.minus(px.div(n += 2));
    px = px.times(x22);
    r = t.plus(px.div(n += 2));
    if (r.d[j2] !== void 0) for (i = j2; r.d[i] === t.d[i] && i--; ) ;
  }
  if (k4) r = r.times(2 << k4 - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm2, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y4) {
  return this.cmp(y4) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y4) {
  return this.cmp(y4) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d2, denominator, k4, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm2 = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d2 = base.d;
    if (base.s < 0 || !d2 || !d2[0] || base.eq(1)) return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d2 = arg.d;
  if (arg.s < 0 || !d2 || !d2[0] || arg.eq(1)) {
    return new Ctor(d2 && !d2[0] ? -1 / 0 : arg.s != 1 ? NaN : d2 ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d2.length > 1) {
      inf = true;
    } else {
      for (k4 = d2[0]; k4 % 10 === 0; ) k4 /= 10;
      inf = k4 !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k4 = pr, rm2)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k4 + 1, k4 + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k4 += 10, rm2));
  }
  external = true;
  return finalise(r, pr, rm2);
};
P.minus = P.sub = function(y4) {
  var d2, e7, i, j2, k4, len, pr, rm2, xd, xe2, xLTy, yd, x4 = this, Ctor = x4.constructor;
  y4 = new Ctor(y4);
  if (!x4.d || !y4.d) {
    if (!x4.s || !y4.s) y4 = new Ctor(NaN);
    else if (x4.d) y4.s = -y4.s;
    else y4 = new Ctor(y4.d || x4.s !== y4.s ? x4 : NaN);
    return y4;
  }
  if (x4.s != y4.s) {
    y4.s = -y4.s;
    return x4.plus(y4);
  }
  xd = x4.d;
  yd = y4.d;
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0]) y4.s = -y4.s;
    else if (xd[0]) y4 = new Ctor(x4);
    else return new Ctor(rm2 === 3 ? -0 : 0);
    return external ? finalise(y4, pr, rm2) : y4;
  }
  e7 = mathfloor(y4.e / LOG_BASE);
  xe2 = mathfloor(x4.e / LOG_BASE);
  xd = xd.slice();
  k4 = xe2 - e7;
  if (k4) {
    xLTy = k4 < 0;
    if (xLTy) {
      d2 = xd;
      k4 = -k4;
      len = yd.length;
    } else {
      d2 = yd;
      e7 = xe2;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k4 > i) {
      k4 = i;
      d2.length = 1;
    }
    d2.reverse();
    for (i = k4; i--; ) d2.push(0);
    d2.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k4 = 0;
  }
  if (xLTy) {
    d2 = xd;
    xd = yd;
    yd = d2;
    y4.s = -y4.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
  for (i = yd.length; i > k4; ) {
    if (xd[--i] < yd[i]) {
      for (j2 = i; j2 && xd[--j2] === 0; ) xd[j2] = BASE - 1;
      --xd[j2];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; ) xd.pop();
  for (; xd[0] === 0; xd.shift()) --e7;
  if (!xd[0]) return new Ctor(rm2 === 3 ? -0 : 0);
  y4.d = xd;
  y4.e = getBase10Exponent(xd, e7);
  return external ? finalise(y4, pr, rm2) : y4;
};
P.modulo = P.mod = function(y4) {
  var q3, x4 = this, Ctor = x4.constructor;
  y4 = new Ctor(y4);
  if (!x4.d || !y4.s || y4.d && !y4.d[0]) return new Ctor(NaN);
  if (!y4.d || x4.d && !x4.d[0]) {
    return finalise(new Ctor(x4), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q3 = divide(x4, y4.abs(), 0, 3, 1);
    q3.s *= y4.s;
  } else {
    q3 = divide(x4, y4, 0, Ctor.modulo, 1);
  }
  q3 = q3.times(y4);
  external = true;
  return x4.minus(q3);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x4 = new this.constructor(this);
  x4.s = -x4.s;
  return finalise(x4);
};
P.plus = P.add = function(y4) {
  var carry, d2, e7, i, k4, len, pr, rm2, xd, yd, x4 = this, Ctor = x4.constructor;
  y4 = new Ctor(y4);
  if (!x4.d || !y4.d) {
    if (!x4.s || !y4.s) y4 = new Ctor(NaN);
    else if (!x4.d) y4 = new Ctor(y4.d || x4.s === y4.s ? x4 : NaN);
    return y4;
  }
  if (x4.s != y4.s) {
    y4.s = -y4.s;
    return x4.minus(y4);
  }
  xd = x4.d;
  yd = y4.d;
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0]) y4 = new Ctor(x4);
    return external ? finalise(y4, pr, rm2) : y4;
  }
  k4 = mathfloor(x4.e / LOG_BASE);
  e7 = mathfloor(y4.e / LOG_BASE);
  xd = xd.slice();
  i = k4 - e7;
  if (i) {
    if (i < 0) {
      d2 = xd;
      i = -i;
      len = yd.length;
    } else {
      d2 = yd;
      e7 = k4;
      len = xd.length;
    }
    k4 = Math.ceil(pr / LOG_BASE);
    len = k4 > len ? k4 + 1 : len + 1;
    if (i > len) {
      i = len;
      d2.length = 1;
    }
    d2.reverse();
    for (; i--; ) d2.push(0);
    d2.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d2 = yd;
    yd = xd;
    xd = d2;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e7;
  }
  for (len = xd.length; xd[--len] == 0; ) xd.pop();
  y4.d = xd;
  y4.e = getBase10Exponent(xd, e7);
  return external ? finalise(y4, pr, rm2) : y4;
};
P.precision = P.sd = function(z4) {
  var k4, x4 = this;
  if (z4 !== void 0 && z4 !== !!z4 && z4 !== 1 && z4 !== 0) throw Error(invalidArgument + z4);
  if (x4.d) {
    k4 = getPrecision(x4.d);
    if (z4 && x4.e + 1 > k4) k4 = x4.e + 1;
  } else {
    k4 = NaN;
  }
  return k4;
};
P.round = function() {
  var x4 = this, Ctor = x4.constructor;
  return finalise(new Ctor(x4), x4.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm2, x4 = this, Ctor = x4.constructor;
  if (!x4.isFinite()) return new Ctor(NaN);
  if (x4.isZero()) return new Ctor(x4);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + Math.max(x4.e, x4.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x4 = sine(Ctor, toLessThanHalfPi(Ctor, x4));
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return finalise(quadrant > 2 ? x4.neg() : x4, pr, rm2, true);
};
P.squareRoot = P.sqrt = function() {
  var m3, n, sd, r, rep, t, x4 = this, d2 = x4.d, e7 = x4.e, s = x4.s, Ctor = x4.constructor;
  if (s !== 1 || !d2 || !d2[0]) {
    return new Ctor(!s || s < 0 && (!d2 || d2[0]) ? NaN : d2 ? x4 : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x4);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d2);
    if ((n.length + e7) % 2 == 0) n += "0";
    s = Math.sqrt(n);
    e7 = mathfloor((e7 + 1) / 2) - (e7 < 0 || e7 % 2);
    if (s == 1 / 0) {
      n = "5e" + e7;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e7;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e7 = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x4, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e7 + 1, 0);
          if (t.times(t).eq(x4)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e7 + 1, 1);
          m3 = !r.times(r).eq(x4);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e7, Ctor.rounding, m3);
};
P.tangent = P.tan = function() {
  var pr, rm2, x4 = this, Ctor = x4.constructor;
  if (!x4.isFinite()) return new Ctor(NaN);
  if (x4.isZero()) return new Ctor(x4);
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x4 = x4.sin();
  x4.s = 1;
  x4 = divide(x4, new Ctor(1).minus(x4.times(x4)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm2;
  return finalise(quadrant == 2 || quadrant == 4 ? x4.neg() : x4, pr, rm2, true);
};
P.times = P.mul = function(y4) {
  var carry, e7, i, k4, r, rL, t, xdL, ydL, x4 = this, Ctor = x4.constructor, xd = x4.d, yd = (y4 = new Ctor(y4)).d;
  y4.s *= x4.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y4.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y4.s / 0 : y4.s * 0);
  }
  e7 = mathfloor(x4.e / LOG_BASE) + mathfloor(y4.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; ) r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k4 = xdL + i; k4 > i; ) {
      t = r[k4] + yd[i] * xd[k4 - i - 1] + carry;
      r[k4--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k4] = (r[k4] + carry) % BASE | 0;
  }
  for (; !r[--rL]; ) r.pop();
  if (carry) ++e7;
  else r.shift();
  y4.d = r;
  y4.e = getBase10Exponent(r, e7);
  return external ? finalise(y4, Ctor.precision, Ctor.rounding) : y4;
};
P.toBinary = function(sd, rm2) {
  return toStringBinary(this, 2, sd, rm2);
};
P.toDecimalPlaces = P.toDP = function(dp2, rm2) {
  var x4 = this, Ctor = x4.constructor;
  x4 = new Ctor(x4);
  if (dp2 === void 0) return x4;
  checkInt32(dp2, 0, MAX_DIGITS);
  if (rm2 === void 0) rm2 = Ctor.rounding;
  else checkInt32(rm2, 0, 8);
  return finalise(x4, dp2 + x4.e + 1, rm2);
};
P.toExponential = function(dp2, rm2) {
  var str, x4 = this, Ctor = x4.constructor;
  if (dp2 === void 0) {
    str = finiteToString(x4, true);
  } else {
    checkInt32(dp2, 0, MAX_DIGITS);
    if (rm2 === void 0) rm2 = Ctor.rounding;
    else checkInt32(rm2, 0, 8);
    x4 = finalise(new Ctor(x4), dp2 + 1, rm2);
    str = finiteToString(x4, true, dp2 + 1);
  }
  return x4.isNeg() && !x4.isZero() ? "-" + str : str;
};
P.toFixed = function(dp2, rm2) {
  var str, y4, x4 = this, Ctor = x4.constructor;
  if (dp2 === void 0) {
    str = finiteToString(x4);
  } else {
    checkInt32(dp2, 0, MAX_DIGITS);
    if (rm2 === void 0) rm2 = Ctor.rounding;
    else checkInt32(rm2, 0, 8);
    y4 = finalise(new Ctor(x4), dp2 + x4.e + 1, rm2);
    str = finiteToString(y4, false, dp2 + y4.e + 1);
  }
  return x4.isNeg() && !x4.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d2, d0, d1, d22, e7, k4, n, n0, n1, pr, q3, r, x4 = this, xd = x4.d, Ctor = x4.constructor;
  if (!xd) return new Ctor(x4);
  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d2 = new Ctor(d1);
  e7 = d2.e = getPrecision(xd) - x4.e - 1;
  k4 = e7 % LOG_BASE;
  d2.d[0] = mathpow(10, k4 < 0 ? LOG_BASE + k4 : k4);
  if (maxD == null) {
    maxD = e7 > 0 ? d2 : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
    maxD = n.gt(d2) ? e7 > 0 ? d2 : n1 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e7 = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q3 = divide(n, d2, 0, 1, 1);
    d22 = d0.plus(q3.times(d1));
    if (d22.cmp(maxD) == 1) break;
    d0 = d1;
    d1 = d22;
    d22 = n1;
    n1 = n0.plus(q3.times(d22));
    n0 = d22;
    d22 = d2;
    d2 = n.minus(q3.times(d22));
    n = d22;
  }
  d22 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d22.times(n1));
  d0 = d0.plus(d22.times(d1));
  n0.s = n1.s = x4.s;
  r = divide(n1, d1, e7, 1).minus(x4).abs().cmp(divide(n0, d0, e7, 1).minus(x4).abs()) < 1 ? [n1, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm2) {
  return toStringBinary(this, 16, sd, rm2);
};
P.toNearest = function(y4, rm2) {
  var x4 = this, Ctor = x4.constructor;
  x4 = new Ctor(x4);
  if (y4 == null) {
    if (!x4.d) return x4;
    y4 = new Ctor(1);
    rm2 = Ctor.rounding;
  } else {
    y4 = new Ctor(y4);
    if (rm2 === void 0) {
      rm2 = Ctor.rounding;
    } else {
      checkInt32(rm2, 0, 8);
    }
    if (!x4.d) return y4.s ? x4 : y4;
    if (!y4.d) {
      if (y4.s) y4.s = x4.s;
      return y4;
    }
  }
  if (y4.d[0]) {
    external = false;
    x4 = divide(x4, y4, 0, rm2, 1).times(y4);
    external = true;
    finalise(x4);
  } else {
    y4.s = x4.s;
    x4 = y4;
  }
  return x4;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm2) {
  return toStringBinary(this, 8, sd, rm2);
};
P.toPower = P.pow = function(y4) {
  var e7, k4, pr, r, rm2, s, x4 = this, Ctor = x4.constructor, yn2 = +(y4 = new Ctor(y4));
  if (!x4.d || !y4.d || !x4.d[0] || !y4.d[0]) return new Ctor(mathpow(+x4, yn2));
  x4 = new Ctor(x4);
  if (x4.eq(1)) return x4;
  pr = Ctor.precision;
  rm2 = Ctor.rounding;
  if (y4.eq(1)) return finalise(x4, pr, rm2);
  e7 = mathfloor(y4.e / LOG_BASE);
  if (e7 >= y4.d.length - 1 && (k4 = yn2 < 0 ? -yn2 : yn2) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x4, k4, pr);
    return y4.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm2);
  }
  s = x4.s;
  if (s < 0) {
    if (e7 < y4.d.length - 1) return new Ctor(NaN);
    if ((y4.d[e7] & 1) == 0) s = 1;
    if (x4.e == 0 && x4.d[0] == 1 && x4.d.length == 1) {
      x4.s = s;
      return x4;
    }
  }
  k4 = mathpow(+x4, yn2);
  e7 = k4 == 0 || !isFinite(k4) ? mathfloor(yn2 * (Math.log("0." + digitsToString(x4.d)) / Math.LN10 + x4.e + 1)) : new Ctor(k4 + "").e;
  if (e7 > Ctor.maxE + 1 || e7 < Ctor.minE - 1) return new Ctor(e7 > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x4.s = 1;
  k4 = Math.min(12, (e7 + "").length);
  r = naturalExponential(y4.times(naturalLogarithm(x4, pr + k4)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm2)) {
      e7 = pr + 10;
      r = finalise(naturalExponential(y4.times(naturalLogarithm(x4, e7 + k4)), e7), e7 + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm2;
  return finalise(r, pr, rm2);
};
P.toPrecision = function(sd, rm2) {
  var str, x4 = this, Ctor = x4.constructor;
  if (sd === void 0) {
    str = finiteToString(x4, x4.e <= Ctor.toExpNeg || x4.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm2 === void 0) rm2 = Ctor.rounding;
    else checkInt32(rm2, 0, 8);
    x4 = finalise(new Ctor(x4), sd, rm2);
    str = finiteToString(x4, sd <= x4.e || x4.e <= Ctor.toExpNeg, sd);
  }
  return x4.isNeg() && !x4.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm2) {
  var x4 = this, Ctor = x4.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm2 = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm2 === void 0) rm2 = Ctor.rounding;
    else checkInt32(rm2, 0, 8);
  }
  return finalise(new Ctor(x4), sd, rm2);
};
P.toString = function() {
  var x4 = this, Ctor = x4.constructor, str = finiteToString(x4, x4.e <= Ctor.toExpNeg || x4.e >= Ctor.toExpPos);
  return x4.isNeg() && !x4.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x4 = this, Ctor = x4.constructor, str = finiteToString(x4, x4.e <= Ctor.toExpNeg || x4.e >= Ctor.toExpPos);
  return x4.isNeg() ? "-" + str : str;
};
function digitsToString(d2) {
  var i, k4, ws2, indexOfLastWord = d2.length - 1, str = "", w4 = d2[0];
  if (indexOfLastWord > 0) {
    str += w4;
    for (i = 1; i < indexOfLastWord; i++) {
      ws2 = d2[i] + "";
      k4 = LOG_BASE - ws2.length;
      if (k4) str += getZeroString(k4);
      str += ws2;
    }
    w4 = d2[i];
    ws2 = w4 + "";
    k4 = LOG_BASE - ws2.length;
    if (k4) str += getZeroString(k4);
  } else if (w4 === 0) {
    return "0";
  }
  for (; w4 % 10 === 0; ) w4 /= 10;
  return str + w4;
}
__name(digitsToString, "digitsToString");
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
__name(checkInt32, "checkInt32");
function checkRoundingDigits(d2, i, rm2, repeating) {
  var di2, k4, r, rd;
  for (k4 = d2[0]; k4 >= 10; k4 /= 10) --i;
  if (--i < 0) {
    i += LOG_BASE;
    di2 = 0;
  } else {
    di2 = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k4 = mathpow(10, LOG_BASE - i);
  rd = d2[di2] % k4 | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0) rd = rd / 100 | 0;
      else if (i == 1) rd = rd / 10 | 0;
      r = rm2 < 4 && rd == 99999 || rm2 > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm2 < 4 && rd + 1 == k4 || rm2 > 3 && rd + 1 == k4 / 2) && (d2[di2 + 1] / k4 / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k4 / 2 || rd == 0) && (d2[di2 + 1] / k4 / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0) rd = rd / 1e3 | 0;
      else if (i == 1) rd = rd / 100 | 0;
      else if (i == 2) rd = rd / 10 | 0;
      r = (repeating || rm2 < 4) && rd == 9999 || !repeating && rm2 > 3 && rd == 4999;
    } else {
      r = ((repeating || rm2 < 4) && rd + 1 == k4 || !repeating && rm2 > 3 && rd + 1 == k4 / 2) && (d2[di2 + 1] / k4 / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
__name(checkRoundingDigits, "checkRoundingDigits");
function convertBase(str, baseIn, baseOut) {
  var j2, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; ) arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j2 = 0; j2 < arr.length; j2++) {
      if (arr[j2] > baseOut - 1) {
        if (arr[j2 + 1] === void 0) arr[j2 + 1] = 0;
        arr[j2 + 1] += arr[j2] / baseOut | 0;
        arr[j2] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
__name(convertBase, "convertBase");
function cosine(Ctor, x4) {
  var k4, len, y4;
  if (x4.isZero()) return x4;
  len = x4.d.length;
  if (len < 32) {
    k4 = Math.ceil(len / 3);
    y4 = (1 / tinyPow(4, k4)).toString();
  } else {
    k4 = 16;
    y4 = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k4;
  x4 = taylorSeries(Ctor, 1, x4.times(y4), new Ctor(1));
  for (var i = k4; i--; ) {
    var cos2x = x4.times(x4);
    x4 = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k4;
  return x4;
}
__name(cosine, "cosine");
var divide = /* @__PURE__ */ (function() {
  function multiplyInteger(x4, k4, base) {
    var temp, carry = 0, i = x4.length;
    for (x4 = x4.slice(); i--; ) {
      temp = x4[i] * k4 + carry;
      x4[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry) x4.unshift(carry);
    return x4;
  }
  __name(multiplyInteger, "multiplyInteger");
  function compare(a3, b4, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a3[i] != b4[i]) {
          r = a3[i] > b4[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  __name(compare, "compare");
  function subtract(a3, b4, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a3[aL] -= i;
      i = a3[aL] < b4[aL] ? 1 : 0;
      a3[aL] = i * base + a3[aL] - b4[aL];
    }
    for (; !a3[0] && a3.length > 1; ) a3.shift();
  }
  __name(subtract, "subtract");
  return function(x4, y4, pr, rm2, dp2, base) {
    var cmp, e7, i, k4, logBase, more, prod, prodL, q3, qd2, rem, remL, rem0, sd, t, xi2, xL, yd0, yL, yz, Ctor = x4.constructor, sign2 = x4.s == y4.s ? 1 : -1, xd = x4.d, yd = y4.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        // Return NaN if either NaN, or both Infinity or 0.
        !x4.s || !y4.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
        )
      );
    }
    if (base) {
      logBase = 1;
      e7 = x4.e - y4.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e7 = mathfloor(x4.e / logBase) - mathfloor(y4.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q3 = new Ctor(sign2);
    qd2 = q3.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++) ;
    if (yd[i] > (xd[i] || 0)) e7--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm2 = Ctor.rounding;
    } else if (dp2) {
      sd = pr + (x4.e - y4.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd2.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k4 = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k4) && sd--; i++) {
          t = k4 * base + (xd[i] || 0);
          qd2[i] = t / yd | 0;
          k4 = t % yd | 0;
        }
        more = k4 || i < xL;
      } else {
        k4 = base / (yd[0] + 1) | 0;
        if (k4 > 1) {
          yd = multiplyInteger(yd, k4, base);
          xd = multiplyInteger(xd, k4, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi2 = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; ) rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2) ++yd0;
        do {
          k4 = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
            k4 = rem0 / yd0 | 0;
            if (k4 > 1) {
              if (k4 >= base) k4 = base - 1;
              prod = multiplyInteger(yd, k4, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k4--;
                subtract(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k4 == 0) cmp = k4 = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL) prod.unshift(0);
            subtract(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k4++;
                subtract(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k4++;
            rem = [0];
          }
          qd2[i++] = k4;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi2] || 0;
          } else {
            rem = [xd[xi2]];
            remL = 1;
          }
        } while ((xi2++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd2[0]) qd2.shift();
    }
    if (logBase == 1) {
      q3.e = e7;
      inexact = more;
    } else {
      for (i = 1, k4 = qd2[0]; k4 >= 10; k4 /= 10) i++;
      q3.e = i + e7 * logBase - 1;
      finalise(q3, dp2 ? pr + q3.e + 1 : pr, rm2, more);
    }
    return q3;
  };
})();
function finalise(x4, sd, rm2, isTruncated) {
  var digits, i, j2, k4, rd, roundUp, w4, xd, xdi, Ctor = x4.constructor;
  out: if (sd != null) {
    xd = x4.d;
    if (!xd) return x4;
    for (digits = 1, k4 = xd[0]; k4 >= 10; k4 /= 10) digits++;
    i = sd - digits;
    if (i < 0) {
      i += LOG_BASE;
      j2 = sd;
      w4 = xd[xdi = 0];
      rd = w4 / mathpow(10, digits - j2 - 1) % 10 | 0;
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k4 = xd.length;
      if (xdi >= k4) {
        if (isTruncated) {
          for (; k4++ <= xdi; ) xd.push(0);
          w4 = rd = 0;
          digits = 1;
          i %= LOG_BASE;
          j2 = i - LOG_BASE + 1;
        } else {
          break out;
        }
      } else {
        w4 = k4 = xd[xdi];
        for (digits = 1; k4 >= 10; k4 /= 10) digits++;
        i %= LOG_BASE;
        j2 = i - LOG_BASE + digits;
        rd = j2 < 0 ? 0 : w4 / mathpow(10, digits - j2 - 1) % 10 | 0;
      }
    }
    isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j2 < 0 ? w4 : w4 % mathpow(10, digits - j2 - 1));
    roundUp = rm2 < 4 ? (rd || isTruncated) && (rm2 == 0 || rm2 == (x4.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm2 == 4 || isTruncated || rm2 == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? j2 > 0 ? w4 / mathpow(10, digits - j2) : 0 : xd[xdi - 1]) % 10 & 1 || rm2 == (x4.s < 0 ? 8 : 7));
    if (sd < 1 || !xd[0]) {
      xd.length = 0;
      if (roundUp) {
        sd -= x4.e + 1;
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x4.e = -sd || 0;
      } else {
        xd[0] = x4.e = 0;
      }
      return x4;
    }
    if (i == 0) {
      xd.length = xdi;
      k4 = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k4 = mathpow(10, LOG_BASE - i);
      xd[xdi] = j2 > 0 ? (w4 / mathpow(10, digits - j2) % mathpow(10, j2) | 0) * k4 : 0;
    }
    if (roundUp) {
      for (; ; ) {
        if (xdi == 0) {
          for (i = 1, j2 = xd[0]; j2 >= 10; j2 /= 10) i++;
          j2 = xd[0] += k4;
          for (k4 = 1; j2 >= 10; j2 /= 10) k4++;
          if (i != k4) {
            x4.e++;
            if (xd[0] == BASE) xd[0] = 1;
          }
          break;
        } else {
          xd[xdi] += k4;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k4 = 1;
        }
      }
    }
    for (i = xd.length; xd[--i] === 0; ) xd.pop();
  }
  if (external) {
    if (x4.e > Ctor.maxE) {
      x4.d = null;
      x4.e = NaN;
    } else if (x4.e < Ctor.minE) {
      x4.e = 0;
      x4.d = [0];
    }
  }
  return x4;
}
__name(finalise, "finalise");
function finiteToString(x4, isExp, sd) {
  if (!x4.isFinite()) return nonFiniteToString(x4);
  var k4, e7 = x4.e, str = digitsToString(x4.d), len = str.length;
  if (isExp) {
    if (sd && (k4 = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k4);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x4.e < 0 ? "e" : "e+") + x4.e;
  } else if (e7 < 0) {
    str = "0." + getZeroString(-e7 - 1) + str;
    if (sd && (k4 = sd - len) > 0) str += getZeroString(k4);
  } else if (e7 >= len) {
    str += getZeroString(e7 + 1 - len);
    if (sd && (k4 = sd - e7 - 1) > 0) str = str + "." + getZeroString(k4);
  } else {
    if ((k4 = e7 + 1) < len) str = str.slice(0, k4) + "." + str.slice(k4);
    if (sd && (k4 = sd - len) > 0) {
      if (e7 + 1 === len) str += ".";
      str += getZeroString(k4);
    }
  }
  return str;
}
__name(finiteToString, "finiteToString");
function getBase10Exponent(digits, e7) {
  var w4 = digits[0];
  for (e7 *= LOG_BASE; w4 >= 10; w4 /= 10) e7++;
  return e7;
}
__name(getBase10Exponent, "getBase10Exponent");
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
__name(getLn10, "getLn10");
function getPi(Ctor, sd, rm2) {
  if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm2, true);
}
__name(getPi, "getPi");
function getPrecision(digits) {
  var w4 = digits.length - 1, len = w4 * LOG_BASE + 1;
  w4 = digits[w4];
  if (w4) {
    for (; w4 % 10 == 0; w4 /= 10) len--;
    for (w4 = digits[0]; w4 >= 10; w4 /= 10) len++;
  }
  return len;
}
__name(getPrecision, "getPrecision");
function getZeroString(k4) {
  var zs2 = "";
  for (; k4--; ) zs2 += "0";
  return zs2;
}
__name(getZeroString, "getZeroString");
function intPow(Ctor, x4, n, pr) {
  var isTruncated, r = new Ctor(1), k4 = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x4);
      if (truncate(r.d, k4)) isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0) ++r.d[n];
      break;
    }
    x4 = x4.times(x4);
    truncate(x4.d, k4);
  }
  external = true;
  return r;
}
__name(intPow, "intPow");
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
__name(isOdd, "isOdd");
function maxOrMin(Ctor, args, n) {
  var k4, y4, x4 = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y4 = new Ctor(args[i]);
    if (!y4.s) {
      x4 = y4;
      break;
    }
    k4 = x4.cmp(y4);
    if (k4 === n || k4 === 0 && x4.s === n) {
      x4 = y4;
    }
  }
  return x4;
}
__name(maxOrMin, "maxOrMin");
function naturalExponential(x4, sd) {
  var denominator, guard, j2, pow2, sum2, t, wpr, rep = 0, i = 0, k4 = 0, Ctor = x4.constructor, rm2 = Ctor.rounding, pr = Ctor.precision;
  if (!x4.d || !x4.d[0] || x4.e > 17) {
    return new Ctor(x4.d ? !x4.d[0] ? 1 : x4.s < 0 ? 0 : 1 / 0 : x4.s ? x4.s < 0 ? 0 : x4 : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x4.e > -2) {
    x4 = x4.times(t);
    k4 += 5;
  }
  guard = Math.log(mathpow(2, k4)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x4), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j2 = k4;
      while (j2--) sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm2, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm2, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
__name(naturalExponential, "naturalExponential");
function naturalLogarithm(y4, sd) {
  var c2, c0, denominator, e7, numerator, rep, sum2, t, wpr, x1, x22, n = 1, guard = 10, x4 = y4, xd = x4.d, Ctor = x4.constructor, rm2 = Ctor.rounding, pr = Ctor.precision;
  if (x4.s < 0 || !xd || !xd[0] || !x4.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x4.s != 1 ? NaN : xd ? 0 : x4);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c2 = digitsToString(xd);
  c0 = c2.charAt(0);
  if (Math.abs(e7 = x4.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c2.charAt(1) > 3) {
      x4 = x4.times(y4);
      c2 = digitsToString(x4.d);
      c0 = c2.charAt(0);
      n++;
    }
    e7 = x4.e;
    if (c0 > 1) {
      x4 = new Ctor("0." + c2);
      e7++;
    } else {
      x4 = new Ctor(c0 + "." + c2.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e7 + "");
    x4 = naturalLogarithm(new Ctor(c0 + "." + c2.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x4, pr, rm2, external = true) : x4;
  }
  x1 = x4;
  sum2 = numerator = x4 = divide(x4.minus(1), x4.plus(1), wpr, 1);
  x22 = finalise(x4.times(x4), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x22), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e7 !== 0) sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e7 + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm2, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x4 = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x22 = finalise(x4.times(x4), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm2, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
__name(naturalLogarithm, "naturalLogarithm");
function nonFiniteToString(x4) {
  return String(x4.s * x4.s / 0);
}
__name(nonFiniteToString, "nonFiniteToString");
function parseDecimal(x4, str) {
  var e7, i, len;
  if ((e7 = str.indexOf(".")) > -1) str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e7 < 0) e7 = i;
    e7 += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e7 < 0) {
    e7 = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++) ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len) ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x4.e = e7 = e7 - i - 1;
    x4.d = [];
    i = (e7 + 1) % LOG_BASE;
    if (e7 < 0) i += LOG_BASE;
    if (i < len) {
      if (i) x4.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; ) x4.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; ) str += "0";
    x4.d.push(+str);
    if (external) {
      if (x4.e > x4.constructor.maxE) {
        x4.d = null;
        x4.e = NaN;
      } else if (x4.e < x4.constructor.minE) {
        x4.e = 0;
        x4.d = [0];
      }
    }
  } else {
    x4.e = 0;
    x4.d = [0];
  }
  return x4;
}
__name(parseDecimal, "parseDecimal");
function parseOther(x4, str) {
  var base, Ctor, divisor, i, isFloat, len, p4, xd, xe2;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str)) return parseDecimal(x4, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str) x4.s = NaN;
    x4.e = NaN;
    x4.d = null;
    return x4;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p4 = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x4.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe2 = xd.length - 1;
  for (i = xe2; xd[i] === 0; --i) xd.pop();
  if (i < 0) return new Ctor(x4.s * 0);
  x4.e = getBase10Exponent(xd, xe2);
  x4.d = xd;
  external = false;
  if (isFloat) x4 = divide(x4, divisor, len * 4);
  if (p4) x4 = x4.times(Math.abs(p4) < 54 ? mathpow(2, p4) : Decimal.pow(2, p4));
  external = true;
  return x4;
}
__name(parseOther, "parseOther");
function sine(Ctor, x4) {
  var k4, len = x4.d.length;
  if (len < 3) {
    return x4.isZero() ? x4 : taylorSeries(Ctor, 2, x4, x4);
  }
  k4 = 1.4 * Math.sqrt(len);
  k4 = k4 > 16 ? 16 : k4 | 0;
  x4 = x4.times(1 / tinyPow(5, k4));
  x4 = taylorSeries(Ctor, 2, x4, x4);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k4--; ) {
    sin2_x = x4.times(x4);
    x4 = x4.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x4;
}
__name(sine, "sine");
function taylorSeries(Ctor, n, x4, y4, isHyperbolic) {
  var j2, t, u4, x22, i = 1, pr = Ctor.precision, k4 = Math.ceil(pr / LOG_BASE);
  external = false;
  x22 = x4.times(x4);
  u4 = new Ctor(y4);
  for (; ; ) {
    t = divide(u4.times(x22), new Ctor(n++ * n++), pr, 1);
    u4 = isHyperbolic ? y4.plus(t) : y4.minus(t);
    y4 = divide(t.times(x22), new Ctor(n++ * n++), pr, 1);
    t = u4.plus(y4);
    if (t.d[k4] !== void 0) {
      for (j2 = k4; t.d[j2] === u4.d[j2] && j2--; ) ;
      if (j2 == -1) break;
    }
    j2 = u4;
    u4 = y4;
    y4 = t;
    t = j2;
    i++;
  }
  external = true;
  t.d.length = k4 + 1;
  return t;
}
__name(taylorSeries, "taylorSeries");
function tinyPow(b4, e7) {
  var n = b4;
  while (--e7) n *= b4;
  return n;
}
__name(tinyPow, "tinyPow");
function toLessThanHalfPi(Ctor, x4) {
  var t, isNeg = x4.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x4 = x4.abs();
  if (x4.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x4;
  }
  t = x4.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x4 = x4.minus(t.times(pi));
    if (x4.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x4;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x4.minus(pi).abs();
}
__name(toLessThanHalfPi, "toLessThanHalfPi");
function toStringBinary(x4, baseOut, sd, rm2) {
  var base, e7, i, k4, len, roundUp, str, xd, y4, Ctor = x4.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm2 === void 0) rm2 = Ctor.rounding;
    else checkInt32(rm2, 0, 8);
  } else {
    sd = Ctor.precision;
    rm2 = Ctor.rounding;
  }
  if (!x4.isFinite()) {
    str = nonFiniteToString(x4);
  } else {
    str = finiteToString(x4);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y4 = new Ctor(1);
      y4.e = str.length - i;
      y4.d = convertBase(finiteToString(y4), 10, base);
      y4.e = y4.d.length;
    }
    xd = convertBase(str, 10, base);
    e7 = len = xd.length;
    for (; xd[--len] == 0; ) xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e7--;
      } else {
        x4 = new Ctor(x4);
        x4.d = xd;
        x4.e = e7;
        x4 = divide(x4, y4, sd, rm2, 0, base);
        xd = x4.d;
        e7 = x4.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k4 = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm2 < 4 ? (i !== void 0 || roundUp) && (rm2 === 0 || rm2 === (x4.s < 0 ? 3 : 2)) : i > k4 || i === k4 && (rm2 === 4 || roundUp || rm2 === 6 && xd[sd - 1] & 1 || rm2 === (x4.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e7;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len) ;
      for (i = 0, str = ""; i < len; i++) str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++) str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len) ;
            for (i = 1, str = "1."; i < len; i++) str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e7 < 0 ? "p" : "p+") + e7;
      } else if (e7 < 0) {
        for (; ++e7; ) str = "0" + str;
        str = "0." + str;
      } else {
        if (++e7 > len) for (e7 -= len; e7--; ) str += "0";
        else if (e7 < len) str = str.slice(0, e7) + "." + str.slice(e7);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x4.s < 0 ? "-" + str : str;
}
__name(toStringBinary, "toStringBinary");
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
__name(truncate, "truncate");
function abs(x4) {
  return new this(x4).abs();
}
__name(abs, "abs");
function acos(x4) {
  return new this(x4).acos();
}
__name(acos, "acos");
function acosh(x4) {
  return new this(x4).acosh();
}
__name(acosh, "acosh");
function add(x4, y4) {
  return new this(x4).plus(y4);
}
__name(add, "add");
function asin(x4) {
  return new this(x4).asin();
}
__name(asin, "asin");
function asinh(x4) {
  return new this(x4).asinh();
}
__name(asinh, "asinh");
function atan(x4) {
  return new this(x4).atan();
}
__name(atan, "atan");
function atanh(x4) {
  return new this(x4).atanh();
}
__name(atanh, "atanh");
function atan2(y4, x4) {
  y4 = new this(y4);
  x4 = new this(x4);
  var r, pr = this.precision, rm2 = this.rounding, wpr = pr + 4;
  if (!y4.s || !x4.s) {
    r = new this(NaN);
  } else if (!y4.d && !x4.d) {
    r = getPi(this, wpr, 1).times(x4.s > 0 ? 0.25 : 0.75);
    r.s = y4.s;
  } else if (!x4.d || y4.isZero()) {
    r = x4.s < 0 ? getPi(this, pr, rm2) : new this(0);
    r.s = y4.s;
  } else if (!y4.d || x4.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y4.s;
  } else if (x4.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y4, x4, wpr, 1));
    x4 = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm2;
    r = y4.s < 0 ? r.minus(x4) : r.plus(x4);
  } else {
    r = this.atan(divide(y4, x4, wpr, 1));
  }
  return r;
}
__name(atan2, "atan2");
function cbrt(x4) {
  return new this(x4).cbrt();
}
__name(cbrt, "cbrt");
function ceil(x4) {
  return finalise(x4 = new this(x4), x4.e + 1, 2);
}
__name(ceil, "ceil");
function clamp(x4, min2, max2) {
  return new this(x4).clamp(min2, max2);
}
__name(clamp, "clamp");
function config(obj) {
  if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
  var i, p4, v3, useDefaults = obj.defaults === true, ps2 = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps2.length; i += 3) {
    if (p4 = ps2[i], useDefaults) this[p4] = DEFAULTS[p4];
    if ((v3 = obj[p4]) !== void 0) {
      if (mathfloor(v3) === v3 && v3 >= ps2[i + 1] && v3 <= ps2[i + 2]) this[p4] = v3;
      else throw Error(invalidArgument + p4 + ": " + v3);
    }
  }
  if (p4 = "crypto", useDefaults) this[p4] = DEFAULTS[p4];
  if ((v3 = obj[p4]) !== void 0) {
    if (v3 === true || v3 === false || v3 === 0 || v3 === 1) {
      if (v3) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p4] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p4] = false;
      }
    } else {
      throw Error(invalidArgument + p4 + ": " + v3);
    }
  }
  return this;
}
__name(config, "config");
function cos(x4) {
  return new this(x4).cos();
}
__name(cos, "cos");
function cosh(x4) {
  return new this(x4).cosh();
}
__name(cosh, "cosh");
function clone(obj) {
  var i, p4, ps2;
  function Decimal2(v3) {
    var e7, i2, t, x4 = this;
    if (!(x4 instanceof Decimal2)) return new Decimal2(v3);
    x4.constructor = Decimal2;
    if (isDecimalInstance(v3)) {
      x4.s = v3.s;
      if (external) {
        if (!v3.d || v3.e > Decimal2.maxE) {
          x4.e = NaN;
          x4.d = null;
        } else if (v3.e < Decimal2.minE) {
          x4.e = 0;
          x4.d = [0];
        } else {
          x4.e = v3.e;
          x4.d = v3.d.slice();
        }
      } else {
        x4.e = v3.e;
        x4.d = v3.d ? v3.d.slice() : v3.d;
      }
      return;
    }
    t = typeof v3;
    if (t === "number") {
      if (v3 === 0) {
        x4.s = 1 / v3 < 0 ? -1 : 1;
        x4.e = 0;
        x4.d = [0];
        return;
      }
      if (v3 < 0) {
        v3 = -v3;
        x4.s = -1;
      } else {
        x4.s = 1;
      }
      if (v3 === ~~v3 && v3 < 1e7) {
        for (e7 = 0, i2 = v3; i2 >= 10; i2 /= 10) e7++;
        if (external) {
          if (e7 > Decimal2.maxE) {
            x4.e = NaN;
            x4.d = null;
          } else if (e7 < Decimal2.minE) {
            x4.e = 0;
            x4.d = [0];
          } else {
            x4.e = e7;
            x4.d = [v3];
          }
        } else {
          x4.e = e7;
          x4.d = [v3];
        }
        return;
      }
      if (v3 * 0 !== 0) {
        if (!v3) x4.s = NaN;
        x4.e = NaN;
        x4.d = null;
        return;
      }
      return parseDecimal(x4, v3.toString());
    }
    if (t === "string") {
      if ((i2 = v3.charCodeAt(0)) === 45) {
        v3 = v3.slice(1);
        x4.s = -1;
      } else {
        if (i2 === 43) v3 = v3.slice(1);
        x4.s = 1;
      }
      return isDecimal.test(v3) ? parseDecimal(x4, v3) : parseOther(x4, v3);
    }
    if (t === "bigint") {
      if (v3 < 0) {
        v3 = -v3;
        x4.s = -1;
      } else {
        x4.s = 1;
      }
      return parseDecimal(x4, v3.toString());
    }
    throw Error(invalidArgument + v3);
  }
  __name(Decimal2, "Decimal2");
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config;
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0) obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps2 = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps2.length; ) if (!obj.hasOwnProperty(p4 = ps2[i++])) obj[p4] = this[p4];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
__name(clone, "clone");
function div(x4, y4) {
  return new this(x4).div(y4);
}
__name(div, "div");
function exp(x4) {
  return new this(x4).exp();
}
__name(exp, "exp");
function floor(x4) {
  return finalise(x4 = new this(x4), x4.e + 1, 3);
}
__name(floor, "floor");
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
__name(hypot, "hypot");
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
__name(isDecimalInstance, "isDecimalInstance");
function ln(x4) {
  return new this(x4).ln();
}
__name(ln, "ln");
function log(x4, y4) {
  return new this(x4).log(y4);
}
__name(log, "log");
function log2(x4) {
  return new this(x4).log(2);
}
__name(log2, "log2");
function log10(x4) {
  return new this(x4).log(10);
}
__name(log10, "log10");
function max() {
  return maxOrMin(this, arguments, -1);
}
__name(max, "max");
function min() {
  return maxOrMin(this, arguments, 1);
}
__name(min, "min");
function mod(x4, y4) {
  return new this(x4).mod(y4);
}
__name(mod, "mod");
function mul(x4, y4) {
  return new this(x4).mul(y4);
}
__name(mul, "mul");
function pow(x4, y4) {
  return new this(x4).pow(y4);
}
__name(pow, "pow");
function random(sd) {
  var d2, e7, k4, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0) sd = this.precision;
  else checkInt32(sd, 1, MAX_DIGITS);
  k4 = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k4; ) rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d2 = crypto.getRandomValues(new Uint32Array(k4));
    for (; i < k4; ) {
      n = d2[i];
      if (n >= 429e7) {
        d2[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d2 = crypto.randomBytes(k4 *= 4);
    for (; i < k4; ) {
      n = d2[i] + (d2[i + 1] << 8) + (d2[i + 2] << 16) + ((d2[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d2, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k4 / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k4 = rd[--i];
  sd %= LOG_BASE;
  if (k4 && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k4 / n | 0) * n;
  }
  for (; rd[i] === 0; i--) rd.pop();
  if (i < 0) {
    e7 = 0;
    rd = [0];
  } else {
    e7 = -1;
    for (; rd[0] === 0; e7 -= LOG_BASE) rd.shift();
    for (k4 = 1, n = rd[0]; n >= 10; n /= 10) k4++;
    if (k4 < LOG_BASE) e7 -= LOG_BASE - k4;
  }
  r.e = e7;
  r.d = rd;
  return r;
}
__name(random, "random");
function round(x4) {
  return finalise(x4 = new this(x4), x4.e + 1, this.rounding);
}
__name(round, "round");
function sign(x4) {
  x4 = new this(x4);
  return x4.d ? x4.d[0] ? x4.s : 0 * x4.s : x4.s || NaN;
}
__name(sign, "sign");
function sin(x4) {
  return new this(x4).sin();
}
__name(sin, "sin");
function sinh(x4) {
  return new this(x4).sinh();
}
__name(sinh, "sinh");
function sqrt(x4) {
  return new this(x4).sqrt();
}
__name(sqrt, "sqrt");
function sub(x4, y4) {
  return new this(x4).sub(y4);
}
__name(sub, "sub");
function sum() {
  var i = 0, args = arguments, x4 = new this(args[i]);
  external = false;
  for (; x4.s && ++i < args.length; ) x4 = x4.plus(args[i]);
  external = true;
  return finalise(x4, this.precision, this.rounding);
}
__name(sum, "sum");
function tan(x4) {
  return new this(x4).tan();
}
__name(tan, "tan");
function tanh(x4) {
  return new this(x4).tanh();
}
__name(tanh, "tanh");
function trunc(x4) {
  return finalise(x4 = new this(x4), x4.e + 1, 1);
}
__name(trunc, "trunc");
P[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
var Sql = class _Sql {
  static {
    __name(this, "_Sql");
  }
  constructor(rawStrings, rawValues) {
    if (rawStrings.length - 1 !== rawValues.length) {
      if (rawStrings.length === 0) {
        throw new TypeError("Expected at least 1 string");
      }
      throw new TypeError(`Expected ${rawStrings.length} strings to have ${rawStrings.length - 1} values`);
    }
    const valuesLength = rawValues.reduce((len, value) => len + (value instanceof _Sql ? value.values.length : 1), 0);
    this.values = new Array(valuesLength);
    this.strings = new Array(valuesLength + 1);
    this.strings[0] = rawStrings[0];
    let i = 0, pos = 0;
    while (i < rawValues.length) {
      const child = rawValues[i++];
      const rawString = rawStrings[i];
      if (child instanceof _Sql) {
        this.strings[pos] += child.strings[0];
        let childIndex = 0;
        while (childIndex < child.values.length) {
          this.values[pos++] = child.values[childIndex++];
          this.strings[pos] = child.strings[childIndex];
        }
        this.strings[pos] += rawString;
      } else {
        this.values[pos++] = child;
        this.strings[pos] = rawString;
      }
    }
  }
  get sql() {
    const len = this.strings.length;
    let i = 1;
    let value = this.strings[0];
    while (i < len)
      value += `?${this.strings[i++]}`;
    return value;
  }
  get statement() {
    const len = this.strings.length;
    let i = 1;
    let value = this.strings[0];
    while (i < len)
      value += `:${i}${this.strings[i++]}`;
    return value;
  }
  get text() {
    const len = this.strings.length;
    let i = 1;
    let value = this.strings[0];
    while (i < len)
      value += `$${i}${this.strings[i++]}`;
    return value;
  }
  inspect() {
    return {
      sql: this.sql,
      statement: this.statement,
      text: this.text,
      values: this.values
    };
  }
};
function raw2(value) {
  return new Sql([value], []);
}
__name(raw2, "raw");
var empty = raw2("");

// node_modules/@prisma/client/runtime/wasm-compiler-edge.mjs
var Tl = Object.create;
var mr = Object.defineProperty;
var Pl = Object.getOwnPropertyDescriptor;
var Sl = Object.getOwnPropertyNames;
var vl = Object.getPrototypeOf;
var Al = Object.prototype.hasOwnProperty;
var ye = /* @__PURE__ */ __name((e7, t) => () => (e7 && (t = e7(e7 = 0)), t), "ye");
var oe = /* @__PURE__ */ __name((e7, t) => () => (t || e7((t = { exports: {} }).exports, t), t.exports), "oe");
var kt = /* @__PURE__ */ __name((e7, t) => {
  for (var r in t) mr(e7, r, { get: t[r], enumerable: true });
}, "kt");
var Zi = /* @__PURE__ */ __name((e7, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (let i of Sl(t)) !Al.call(e7, i) && i !== r && mr(e7, i, { get: /* @__PURE__ */ __name(() => t[i], "get"), enumerable: !(n = Pl(t, i)) || n.enumerable });
  return e7;
}, "Zi");
var qe = /* @__PURE__ */ __name((e7, t, r) => (r = e7 != null ? Tl(vl(e7)) : {}, Zi(t || !e7 || !e7.__esModule ? mr(r, "default", { value: e7, enumerable: true }) : r, e7)), "qe");
var Cl = /* @__PURE__ */ __name((e7) => Zi(mr({}, "__esModule", { value: true }), e7), "Cl");
function Sn(e7, t) {
  if (t = t.toLowerCase(), t === "utf8" || t === "utf-8") return new h(Ol.encode(e7));
  if (t === "base64" || t === "base64url") return e7 = e7.replace(/-/g, "+").replace(/_/g, "/"), e7 = e7.replace(/[^A-Za-z0-9+/]/g, ""), new h([...atob(e7)].map((r) => r.charCodeAt(0)));
  if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1") return new h([...e7].map((r) => r.charCodeAt(0)));
  if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
    let r = new h(e7.length * 2), n = new DataView(r.buffer);
    for (let i = 0; i < e7.length; i++) n.setUint16(i * 2, e7.charCodeAt(i), true);
    return r;
  }
  if (t === "hex") {
    let r = new h(e7.length / 2);
    for (let n = 0, i = 0; i < e7.length; i += 2, n++) r[n] = parseInt(e7.slice(i, i + 2), 16);
    return r;
  }
  Xi(`encoding "${t}"`);
}
__name(Sn, "Sn");
function Rl(e7) {
  let r = Object.getOwnPropertyNames(DataView.prototype).filter((a3) => a3.startsWith("get") || a3.startsWith("set")), n = r.map((a3) => a3.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a3, m3) => function(f3 = 0) {
    return H(f3, "offset"), ne(f3, "offset"), z(f3, "offset", this.length - 1), new DataView(this.buffer)[r[a3]](f3, m3);
  }, "i"), o3 = /* @__PURE__ */ __name((a3, m3) => function(f3, T3 = 0) {
    let S3 = r[a3].match(/set(\w+\d+)/)[1].toLowerCase(), v3 = kl[S3];
    return H(T3, "offset"), ne(T3, "offset"), z(T3, "offset", this.length - 1), Il(f3, "value", v3[0], v3[1]), new DataView(this.buffer)[r[a3]](T3, f3, m3), T3 + parseInt(r[a3].match(/\d+/)[0]) / 8;
  }, "o"), s = /* @__PURE__ */ __name((a3) => {
    a3.forEach((m3) => {
      m3.includes("Uint") && (e7[m3.replace("Uint", "UInt")] = e7[m3]), m3.includes("Float64") && (e7[m3.replace("Float64", "Double")] = e7[m3]), m3.includes("Float32") && (e7[m3.replace("Float32", "Float")] = e7[m3]);
    });
  }, "s");
  n.forEach((a3, m3) => {
    a3.startsWith("read") && (e7[a3] = i(m3, false), e7[a3 + "LE"] = i(m3, true), e7[a3 + "BE"] = i(m3, false)), a3.startsWith("write") && (e7[a3] = o3(m3, false), e7[a3 + "LE"] = o3(m3, true), e7[a3 + "BE"] = o3(m3, false)), s([a3, a3 + "LE", a3 + "BE"]);
  });
}
__name(Rl, "Rl");
function Xi(e7) {
  throw new Error(`Buffer polyfill does not implement "${e7}"`);
}
__name(Xi, "Xi");
function fr(e7, t) {
  if (!(e7 instanceof Uint8Array)) throw new TypeError(`The "${t}" argument must be an instance of Buffer or Uint8Array`);
}
__name(fr, "fr");
function z(e7, t, r = Ml + 1) {
  if (e7 < 0 || e7 > r) {
    let n = new RangeError(`The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e7}`);
    throw n.code = "ERR_OUT_OF_RANGE", n;
  }
}
__name(z, "z");
function H(e7, t) {
  if (typeof e7 != "number") {
    let r = new TypeError(`The "${t}" argument must be of type number. Received type ${typeof e7}.`);
    throw r.code = "ERR_INVALID_ARG_TYPE", r;
  }
}
__name(H, "H");
function ne(e7, t) {
  if (!Number.isInteger(e7) || Number.isNaN(e7)) {
    let r = new RangeError(`The value of "${t}" is out of range. It must be an integer. Received ${e7}`);
    throw r.code = "ERR_OUT_OF_RANGE", r;
  }
}
__name(ne, "ne");
function Il(e7, t, r, n) {
  if (e7 < r || e7 > n) {
    let i = new RangeError(`The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e7}`);
    throw i.code = "ERR_OUT_OF_RANGE", i;
  }
}
__name(Il, "Il");
function Yi(e7, t) {
  if (typeof e7 != "string") {
    let r = new TypeError(`The "${t}" argument must be of type string. Received type ${typeof e7}`);
    throw r.code = "ERR_INVALID_ARG_TYPE", r;
  }
}
__name(Yi, "Yi");
function Ll(e7, t = "utf8") {
  return h.from(e7, t);
}
__name(Ll, "Ll");
var h;
var kl;
var Ol;
var Nl;
var Dl;
var Ml;
var g;
var vn;
var u = ye(() => {
  "use strict";
  h = class e7 extends Uint8Array {
    static {
      __name(this, "e");
    }
    _isBuffer = true;
    get offset() {
      return this.byteOffset;
    }
    static alloc(t, r = 0, n = "utf8") {
      return Yi(n, "encoding"), e7.allocUnsafe(t).fill(r, n);
    }
    static allocUnsafe(t) {
      return e7.from(t);
    }
    static allocUnsafeSlow(t) {
      return e7.from(t);
    }
    static isBuffer(t) {
      return t && !!t._isBuffer;
    }
    static byteLength(t, r = "utf8") {
      if (typeof t == "string") return Sn(t, r).byteLength;
      if (t && t.byteLength) return t.byteLength;
      let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
      throw n.code = "ERR_INVALID_ARG_TYPE", n;
    }
    static isEncoding(t) {
      return Dl.includes(t);
    }
    static compare(t, r) {
      fr(t, "buff1"), fr(r, "buff2");
      for (let n = 0; n < t.length; n++) {
        if (t[n] < r[n]) return -1;
        if (t[n] > r[n]) return 1;
      }
      return t.length === r.length ? 0 : t.length > r.length ? 1 : -1;
    }
    static from(t, r = "utf8") {
      if (t && typeof t == "object" && t.type === "Buffer") return new e7(t.data);
      if (typeof t == "number") return new e7(new Uint8Array(t));
      if (typeof t == "string") return Sn(t, r);
      if (ArrayBuffer.isView(t)) {
        let { byteOffset: n, byteLength: i, buffer: o3 } = t;
        return "map" in t && typeof t.map == "function" ? new e7(t.map((s) => s % 256), n, i) : new e7(o3, n, i);
      }
      if (t && typeof t == "object" && ("length" in t || "byteLength" in t || "buffer" in t)) return new e7(t);
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }
    static concat(t, r) {
      if (t.length === 0) return e7.alloc(0);
      let n = [].concat(...t.map((o3) => [...o3])), i = e7.alloc(r !== void 0 ? r : n.length);
      return i.set(r !== void 0 ? n.slice(0, r) : n), i;
    }
    slice(t = 0, r = this.length) {
      return this.subarray(t, r);
    }
    subarray(t = 0, r = this.length) {
      return Object.setPrototypeOf(super.subarray(t, r), e7.prototype);
    }
    reverse() {
      return super.reverse(), this;
    }
    readIntBE(t, r) {
      H(t, "offset"), ne(t, "offset"), z(t, "offset", this.length - 1), H(r, "byteLength"), ne(r, "byteLength");
      let n = new DataView(this.buffer, t, r), i = 0;
      for (let o3 = 0; o3 < r; o3++) i = i * 256 + n.getUint8(o3);
      return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
    }
    readIntLE(t, r) {
      H(t, "offset"), ne(t, "offset"), z(t, "offset", this.length - 1), H(r, "byteLength"), ne(r, "byteLength");
      let n = new DataView(this.buffer, t, r), i = 0;
      for (let o3 = 0; o3 < r; o3++) i += n.getUint8(o3) * Math.pow(256, o3);
      return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
    }
    readUIntBE(t, r) {
      H(t, "offset"), ne(t, "offset"), z(t, "offset", this.length - 1), H(r, "byteLength"), ne(r, "byteLength");
      let n = new DataView(this.buffer, t, r), i = 0;
      for (let o3 = 0; o3 < r; o3++) i = i * 256 + n.getUint8(o3);
      return i;
    }
    readUintBE(t, r) {
      return this.readUIntBE(t, r);
    }
    readUIntLE(t, r) {
      H(t, "offset"), ne(t, "offset"), z(t, "offset", this.length - 1), H(r, "byteLength"), ne(r, "byteLength");
      let n = new DataView(this.buffer, t, r), i = 0;
      for (let o3 = 0; o3 < r; o3++) i += n.getUint8(o3) * Math.pow(256, o3);
      return i;
    }
    readUintLE(t, r) {
      return this.readUIntLE(t, r);
    }
    writeIntBE(t, r, n) {
      return t = t < 0 ? t + Math.pow(256, n) : t, this.writeUIntBE(t, r, n);
    }
    writeIntLE(t, r, n) {
      return t = t < 0 ? t + Math.pow(256, n) : t, this.writeUIntLE(t, r, n);
    }
    writeUIntBE(t, r, n) {
      H(r, "offset"), ne(r, "offset"), z(r, "offset", this.length - 1), H(n, "byteLength"), ne(n, "byteLength");
      let i = new DataView(this.buffer, r, n);
      for (let o3 = n - 1; o3 >= 0; o3--) i.setUint8(o3, t & 255), t = t / 256;
      return r + n;
    }
    writeUintBE(t, r, n) {
      return this.writeUIntBE(t, r, n);
    }
    writeUIntLE(t, r, n) {
      H(r, "offset"), ne(r, "offset"), z(r, "offset", this.length - 1), H(n, "byteLength"), ne(n, "byteLength");
      let i = new DataView(this.buffer, r, n);
      for (let o3 = 0; o3 < n; o3++) i.setUint8(o3, t & 255), t = t / 256;
      return r + n;
    }
    writeUintLE(t, r, n) {
      return this.writeUIntLE(t, r, n);
    }
    toJSON() {
      return { type: "Buffer", data: Array.from(this) };
    }
    swap16() {
      let t = new DataView(this.buffer, this.byteOffset, this.byteLength);
      for (let r = 0; r < this.length; r += 2) t.setUint16(r, t.getUint16(r, true), false);
      return this;
    }
    swap32() {
      let t = new DataView(this.buffer, this.byteOffset, this.byteLength);
      for (let r = 0; r < this.length; r += 4) t.setUint32(r, t.getUint32(r, true), false);
      return this;
    }
    swap64() {
      let t = new DataView(this.buffer, this.byteOffset, this.byteLength);
      for (let r = 0; r < this.length; r += 8) t.setBigUint64(r, t.getBigUint64(r, true), false);
      return this;
    }
    compare(t, r = 0, n = t.length, i = 0, o3 = this.length) {
      return fr(t, "target"), H(r, "targetStart"), H(n, "targetEnd"), H(i, "sourceStart"), H(o3, "sourceEnd"), z(r, "targetStart"), z(n, "targetEnd", t.length), z(i, "sourceStart"), z(o3, "sourceEnd", this.length), e7.compare(this.slice(i, o3), t.slice(r, n));
    }
    equals(t) {
      return fr(t, "otherBuffer"), this.length === t.length && this.every((r, n) => r === t[n]);
    }
    copy(t, r = 0, n = 0, i = this.length) {
      z(r, "targetStart"), z(n, "sourceStart", this.length), z(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
      let o3 = 0;
      for (; n < i && !(this[n] === void 0 || t[r] === void 0); ) t[r] = this[n], o3++, n++, r++;
      return o3;
    }
    write(t, r, n, i = "utf8") {
      let o3 = typeof r == "string" ? 0 : r ?? 0, s = typeof n == "string" ? this.length - o3 : n ?? this.length - o3;
      return i = typeof r == "string" ? r : typeof n == "string" ? n : i, H(o3, "offset"), H(s, "length"), z(o3, "offset", this.length), z(s, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s = s - s % 2), Sn(t, i).copy(this, o3, 0, s);
    }
    fill(t = 0, r = 0, n = this.length, i = "utf-8") {
      let o3 = typeof r == "string" ? 0 : r, s = typeof n == "string" ? this.length : n;
      if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, t = e7.from(typeof t == "number" ? [t] : t ?? [], i), Yi(i, "encoding"), z(o3, "offset", this.length), z(s, "end", this.length), t.length !== 0) for (let a3 = o3; a3 < s; a3 += t.length) super.set(t.slice(0, t.length + a3 >= this.length ? this.length - a3 : t.length), a3);
      return this;
    }
    includes(t, r = null, n = "utf-8") {
      return this.indexOf(t, r, n) !== -1;
    }
    lastIndexOf(t, r = null, n = "utf-8") {
      return this.indexOf(t, r, n, true);
    }
    indexOf(t, r = null, n = "utf-8", i = false) {
      let o3 = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
      n = typeof r == "string" ? r : n;
      let s = e7.from(typeof t == "number" ? [t] : t, n), a3 = typeof r == "string" ? 0 : r;
      return a3 = typeof r == "number" ? a3 : null, a3 = Number.isNaN(a3) ? null : a3, a3 ??= i ? this.length : 0, a3 = a3 < 0 ? this.length + a3 : a3, s.length === 0 && i === false ? a3 >= this.length ? this.length : a3 : s.length === 0 && i === true ? (a3 >= this.length ? this.length : a3) || this.length : o3((m3, f3) => (i ? f3 <= a3 : f3 >= a3) && this[f3] === s[0] && s.every((S3, v3) => this[f3 + v3] === S3));
    }
    toString(t = "utf8", r = 0, n = this.length) {
      if (r = r < 0 ? 0 : r, t = t.toString().toLowerCase(), n <= 0) return "";
      if (t === "utf8" || t === "utf-8") return Nl.decode(this.slice(r, n));
      if (t === "base64" || t === "base64url") {
        let i = btoa(this.reduce((o3, s) => o3 + vn(s), ""));
        return t === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
      }
      if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1") return this.slice(r, n).reduce((i, o3) => i + vn(o3 & (t === "ascii" ? 127 : 255)), "");
      if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
        let i = new DataView(this.buffer.slice(r, n));
        return Array.from({ length: i.byteLength / 2 }, (o3, s) => s * 2 + 1 < i.byteLength ? vn(i.getUint16(s * 2, true)) : "").join("");
      }
      if (t === "hex") return this.slice(r, n).reduce((i, o3) => i + o3.toString(16).padStart(2, "0"), "");
      Xi(`encoding "${t}"`);
    }
    toLocaleString() {
      return this.toString();
    }
    inspect() {
      return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
    }
  };
  kl = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, Ol = new TextEncoder(), Nl = new TextDecoder(), Dl = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], Ml = 4294967295;
  Rl(h.prototype);
  g = new Proxy(Ll, { construct(e7, [t, r]) {
    return h.from(t, r);
  }, get(e7, t) {
    return h[t];
  } }), vn = String.fromCodePoint;
});
var y;
var x;
var l = ye(() => {
  "use strict";
  y = { nextTick: /* @__PURE__ */ __name((e7, ...t) => {
    setTimeout(() => {
      e7(...t);
    }, 0);
  }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: x } = y;
});
var w;
var c = ye(() => {
  "use strict";
  w = globalThis.performance ?? (() => {
    let e7 = Date.now();
    return { now: /* @__PURE__ */ __name(() => Date.now() - e7, "now") };
  })();
});
var b;
var p = ye(() => {
  "use strict";
  b = /* @__PURE__ */ __name(() => {
  }, "b");
  b.prototype = b;
});
function no(e7, t) {
  var r, n, i, o3, s, a3, m3, f3, T3 = e7.constructor, S3 = T3.precision;
  if (!e7.s || !t.s) return t.s || (t = new T3(e7)), j ? L(t, S3) : t;
  if (m3 = e7.d, f3 = t.d, s = e7.e, i = t.e, m3 = m3.slice(), o3 = s - i, o3) {
    for (o3 < 0 ? (n = m3, o3 = -o3, a3 = f3.length) : (n = f3, i = s, a3 = m3.length), s = Math.ceil(S3 / V), a3 = s > a3 ? s + 1 : a3 + 1, o3 > a3 && (o3 = a3, n.length = 1), n.reverse(); o3--; ) n.push(0);
    n.reverse();
  }
  for (a3 = m3.length, o3 = f3.length, a3 - o3 < 0 && (o3 = a3, n = f3, f3 = m3, m3 = n), r = 0; o3; ) r = (m3[--o3] = m3[o3] + f3[o3] + r) / W | 0, m3[o3] %= W;
  for (r && (m3.unshift(r), ++i), a3 = m3.length; m3[--a3] == 0; ) m3.pop();
  return t.d = m3, t.e = i, j ? L(t, S3) : t;
}
__name(no, "no");
function we(e7, t, r) {
  if (e7 !== ~~e7 || e7 < t || e7 > r) throw Error(je + e7);
}
__name(we, "we");
function he(e7) {
  var t, r, n, i = e7.length - 1, o3 = "", s = e7[0];
  if (i > 0) {
    for (o3 += s, t = 1; t < i; t++) n = e7[t] + "", r = V - n.length, r && (o3 += Ne(r)), o3 += n;
    s = e7[t], n = s + "", r = V - n.length, r && (o3 += Ne(r));
  } else if (s === 0) return "0";
  for (; s % 10 === 0; ) s /= 10;
  return o3 + s;
}
__name(he, "he");
function io(e7, t) {
  var r, n, i, o3, s, a3, m3 = 0, f3 = 0, T3 = e7.constructor, S3 = T3.precision;
  if (G(e7) > 16) throw Error(Cn + G(e7));
  if (!e7.s) return new T3(se);
  for (t == null ? (j = false, a3 = S3) : a3 = t, s = new T3(0.03125); e7.abs().gte(0.1); ) e7 = e7.times(s), f3 += 5;
  for (n = Math.log(Be(2, f3)) / Math.LN10 * 2 + 5 | 0, a3 += n, r = i = o3 = new T3(se), T3.precision = a3; ; ) {
    if (i = L(i.times(e7), a3), r = r.times(++m3), s = o3.plus(Ce(i, r, a3)), he(s.d).slice(0, a3) === he(o3.d).slice(0, a3)) {
      for (; f3--; ) o3 = L(o3.times(o3), a3);
      return T3.precision = S3, t == null ? (j = true, L(o3, S3)) : o3;
    }
    o3 = s;
  }
}
__name(io, "io");
function G(e7) {
  for (var t = e7.e * V, r = e7.d[0]; r >= 10; r /= 10) t++;
  return t;
}
__name(G, "G");
function An(e7, t, r) {
  if (t > e7.LN10.sd()) throw j = true, r && (e7.precision = r), Error(ue + "LN10 precision limit exceeded");
  return L(new e7(e7.LN10), t);
}
__name(An, "An");
function Ne(e7) {
  for (var t = ""; e7--; ) t += "0";
  return t;
}
__name(Ne, "Ne");
function Ot(e7, t) {
  var r, n, i, o3, s, a3, m3, f3, T3, S3 = 1, v3 = 10, A3 = e7, N3 = A3.d, R3 = A3.constructor, I3 = R3.precision;
  if (A3.s < 1) throw Error(ue + (A3.s ? "NaN" : "-Infinity"));
  if (A3.eq(se)) return new R3(0);
  if (t == null ? (j = false, f3 = I3) : f3 = t, A3.eq(10)) return t == null && (j = true), An(R3, f3);
  if (f3 += v3, R3.precision = f3, r = he(N3), n = r.charAt(0), o3 = G(A3), Math.abs(o3) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) A3 = A3.times(e7), r = he(A3.d), n = r.charAt(0), S3++;
    o3 = G(A3), n > 1 ? (A3 = new R3("0." + r), o3++) : A3 = new R3(n + "." + r.slice(1));
  } else return m3 = An(R3, f3 + 2, I3).times(o3 + ""), A3 = Ot(new R3(n + "." + r.slice(1)), f3 - v3).plus(m3), R3.precision = I3, t == null ? (j = true, L(A3, I3)) : A3;
  for (a3 = s = A3 = Ce(A3.minus(se), A3.plus(se), f3), T3 = L(A3.times(A3), f3), i = 3; ; ) {
    if (s = L(s.times(T3), f3), m3 = a3.plus(Ce(s, new R3(i), f3)), he(m3.d).slice(0, f3) === he(a3.d).slice(0, f3)) return a3 = a3.times(2), o3 !== 0 && (a3 = a3.plus(An(R3, f3 + 2, I3).times(o3 + ""))), a3 = Ce(a3, new R3(S3), f3), R3.precision = I3, t == null ? (j = true, L(a3, I3)) : a3;
    a3 = m3, i += 2;
  }
}
__name(Ot, "Ot");
function eo(e7, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e7.e = nt(r / V), e7.d = [], n = (r + 1) % V, r < 0 && (n += V), n < i) {
      for (n && e7.d.push(+t.slice(0, n)), i -= V; n < i; ) e7.d.push(+t.slice(n, n += V));
      t = t.slice(n), n = V - t.length;
    } else n -= i;
    for (; n--; ) t += "0";
    if (e7.d.push(+t), j && (e7.e > gr || e7.e < -gr)) throw Error(Cn + r);
  } else e7.s = 0, e7.e = 0, e7.d = [0];
  return e7;
}
__name(eo, "eo");
function L(e7, t, r) {
  var n, i, o3, s, a3, m3, f3, T3, S3 = e7.d;
  for (s = 1, o3 = S3[0]; o3 >= 10; o3 /= 10) s++;
  if (n = t - s, n < 0) n += V, i = t, f3 = S3[T3 = 0];
  else {
    if (T3 = Math.ceil((n + 1) / V), o3 = S3.length, T3 >= o3) return e7;
    for (f3 = o3 = S3[T3], s = 1; o3 >= 10; o3 /= 10) s++;
    n %= V, i = n - V + s;
  }
  if (r !== void 0 && (o3 = Be(10, s - i - 1), a3 = f3 / o3 % 10 | 0, m3 = t < 0 || S3[T3 + 1] !== void 0 || f3 % o3, m3 = r < 4 ? (a3 || m3) && (r == 0 || r == (e7.s < 0 ? 3 : 2)) : a3 > 5 || a3 == 5 && (r == 4 || m3 || r == 6 && (n > 0 ? i > 0 ? f3 / Be(10, s - i) : 0 : S3[T3 - 1]) % 10 & 1 || r == (e7.s < 0 ? 8 : 7))), t < 1 || !S3[0]) return m3 ? (o3 = G(e7), S3.length = 1, t = t - o3 - 1, S3[0] = Be(10, (V - t % V) % V), e7.e = nt(-t / V) || 0) : (S3.length = 1, S3[0] = e7.e = e7.s = 0), e7;
  if (n == 0 ? (S3.length = T3, o3 = 1, T3--) : (S3.length = T3 + 1, o3 = Be(10, V - n), S3[T3] = i > 0 ? (f3 / Be(10, s - i) % Be(10, i) | 0) * o3 : 0), m3) for (; ; ) if (T3 == 0) {
    (S3[0] += o3) == W && (S3[0] = 1, ++e7.e);
    break;
  } else {
    if (S3[T3] += o3, S3[T3] != W) break;
    S3[T3--] = 0, o3 = 1;
  }
  for (n = S3.length; S3[--n] === 0; ) S3.pop();
  if (j && (e7.e > gr || e7.e < -gr)) throw Error(Cn + G(e7));
  return e7;
}
__name(L, "L");
function oo(e7, t) {
  var r, n, i, o3, s, a3, m3, f3, T3, S3, v3 = e7.constructor, A3 = v3.precision;
  if (!e7.s || !t.s) return t.s ? t.s = -t.s : t = new v3(e7), j ? L(t, A3) : t;
  if (m3 = e7.d, S3 = t.d, n = t.e, f3 = e7.e, m3 = m3.slice(), s = f3 - n, s) {
    for (T3 = s < 0, T3 ? (r = m3, s = -s, a3 = S3.length) : (r = S3, n = f3, a3 = m3.length), i = Math.max(Math.ceil(A3 / V), a3) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = m3.length, a3 = S3.length, T3 = i < a3, T3 && (a3 = i), i = 0; i < a3; i++) if (m3[i] != S3[i]) {
      T3 = m3[i] < S3[i];
      break;
    }
    s = 0;
  }
  for (T3 && (r = m3, m3 = S3, S3 = r, t.s = -t.s), a3 = m3.length, i = S3.length - a3; i > 0; --i) m3[a3++] = 0;
  for (i = S3.length; i > s; ) {
    if (m3[--i] < S3[i]) {
      for (o3 = i; o3 && m3[--o3] === 0; ) m3[o3] = W - 1;
      --m3[o3], m3[i] += W;
    }
    m3[i] -= S3[i];
  }
  for (; m3[--a3] === 0; ) m3.pop();
  for (; m3[0] === 0; m3.shift()) --n;
  return m3[0] ? (t.d = m3, t.e = n, j ? L(t, A3) : t) : new v3(0);
}
__name(oo, "oo");
function Qe(e7, t, r) {
  var n, i = G(e7), o3 = he(e7.d), s = o3.length;
  return t ? (r && (n = r - s) > 0 ? o3 = o3.charAt(0) + "." + o3.slice(1) + Ne(n) : s > 1 && (o3 = o3.charAt(0) + "." + o3.slice(1)), o3 = o3 + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o3 = "0." + Ne(-i - 1) + o3, r && (n = r - s) > 0 && (o3 += Ne(n))) : i >= s ? (o3 += Ne(i + 1 - s), r && (n = r - i - 1) > 0 && (o3 = o3 + "." + Ne(n))) : ((n = i + 1) < s && (o3 = o3.slice(0, n) + "." + o3.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o3 += "."), o3 += Ne(n))), e7.s < 0 ? "-" + o3 : o3;
}
__name(Qe, "Qe");
function to(e7, t) {
  if (e7.length > t) return e7.length = t, true;
}
__name(to, "to");
function so(e7) {
  var t, r, n;
  function i(o3) {
    var s = this;
    if (!(s instanceof i)) return new i(o3);
    if (s.constructor = i, o3 instanceof i) {
      s.s = o3.s, s.e = o3.e, s.d = (o3 = o3.d) ? o3.slice() : o3;
      return;
    }
    if (typeof o3 == "number") {
      if (o3 * 0 !== 0) throw Error(je + o3);
      if (o3 > 0) s.s = 1;
      else if (o3 < 0) o3 = -o3, s.s = -1;
      else {
        s.s = 0, s.e = 0, s.d = [0];
        return;
      }
      if (o3 === ~~o3 && o3 < 1e7) {
        s.e = 0, s.d = [o3];
        return;
      }
      return eo(s, o3.toString());
    } else if (typeof o3 != "string") throw Error(je + o3);
    if (o3.charCodeAt(0) === 45 ? (o3 = o3.slice(1), s.s = -1) : s.s = 1, Fl.test(o3)) eo(s, o3);
    else throw Error(je + o3);
  }
  __name(i, "i");
  if (i.prototype = C, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = so, i.config = i.set = $l, e7 === void 0 && (e7 = {}), e7) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e7.hasOwnProperty(r = n[t++]) || (e7[r] = this[r]);
  return i.config(e7), i;
}
__name(so, "so");
function $l(e7) {
  if (!e7 || typeof e7 != "object") throw Error(ue + "Object expected");
  var t, r, n, i = ["precision", 1, rt, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
  for (t = 0; t < i.length; t += 3) if ((n = e7[r = i[t]]) !== void 0) if (nt(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
  else throw Error(je + r + ": " + n);
  if ((n = e7[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
  else throw Error(je + r + ": " + n);
  return this;
}
__name($l, "$l");
var rt;
var _l;
var ao;
var j;
var ue;
var je;
var Cn;
var nt;
var Be;
var Fl;
var se;
var W;
var V;
var ro;
var gr;
var C;
var Ce;
var ao;
var uo = ye(() => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  rt = 1e9, _l = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, j = true, ue = "[DecimalError] ", je = ue + "Invalid argument: ", Cn = ue + "Exponent out of range: ", nt = Math.floor, Be = Math.pow, Fl = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, W = 1e7, V = 7, ro = 9007199254740991, gr = nt(ro / V), C = {};
  C.absoluteValue = C.abs = function() {
    var e7 = new this.constructor(this);
    return e7.s && (e7.s = 1), e7;
  };
  C.comparedTo = C.cmp = function(e7) {
    var t, r, n, i, o3 = this;
    if (e7 = new o3.constructor(e7), o3.s !== e7.s) return o3.s || -e7.s;
    if (o3.e !== e7.e) return o3.e > e7.e ^ o3.s < 0 ? 1 : -1;
    for (n = o3.d.length, i = e7.d.length, t = 0, r = n < i ? n : i; t < r; ++t) if (o3.d[t] !== e7.d[t]) return o3.d[t] > e7.d[t] ^ o3.s < 0 ? 1 : -1;
    return n === i ? 0 : n > i ^ o3.s < 0 ? 1 : -1;
  };
  C.decimalPlaces = C.dp = function() {
    var e7 = this, t = e7.d.length - 1, r = (t - e7.e) * V;
    if (t = e7.d[t], t) for (; t % 10 == 0; t /= 10) r--;
    return r < 0 ? 0 : r;
  };
  C.dividedBy = C.div = function(e7) {
    return Ce(this, new this.constructor(e7));
  };
  C.dividedToIntegerBy = C.idiv = function(e7) {
    var t = this, r = t.constructor;
    return L(Ce(t, new r(e7), 0, 1), r.precision);
  };
  C.equals = C.eq = function(e7) {
    return !this.cmp(e7);
  };
  C.exponent = function() {
    return G(this);
  };
  C.greaterThan = C.gt = function(e7) {
    return this.cmp(e7) > 0;
  };
  C.greaterThanOrEqualTo = C.gte = function(e7) {
    return this.cmp(e7) >= 0;
  };
  C.isInteger = C.isint = function() {
    return this.e > this.d.length - 2;
  };
  C.isNegative = C.isneg = function() {
    return this.s < 0;
  };
  C.isPositive = C.ispos = function() {
    return this.s > 0;
  };
  C.isZero = function() {
    return this.s === 0;
  };
  C.lessThan = C.lt = function(e7) {
    return this.cmp(e7) < 0;
  };
  C.lessThanOrEqualTo = C.lte = function(e7) {
    return this.cmp(e7) < 1;
  };
  C.logarithm = C.log = function(e7) {
    var t, r = this, n = r.constructor, i = n.precision, o3 = i + 5;
    if (e7 === void 0) e7 = new n(10);
    else if (e7 = new n(e7), e7.s < 1 || e7.eq(se)) throw Error(ue + "NaN");
    if (r.s < 1) throw Error(ue + (r.s ? "NaN" : "-Infinity"));
    return r.eq(se) ? new n(0) : (j = false, t = Ce(Ot(r, o3), Ot(e7, o3), o3), j = true, L(t, i));
  };
  C.minus = C.sub = function(e7) {
    var t = this;
    return e7 = new t.constructor(e7), t.s == e7.s ? oo(t, e7) : no(t, (e7.s = -e7.s, e7));
  };
  C.modulo = C.mod = function(e7) {
    var t, r = this, n = r.constructor, i = n.precision;
    if (e7 = new n(e7), !e7.s) throw Error(ue + "NaN");
    return r.s ? (j = false, t = Ce(r, e7, 0, 1).times(e7), j = true, r.minus(t)) : L(new n(r), i);
  };
  C.naturalExponential = C.exp = function() {
    return io(this);
  };
  C.naturalLogarithm = C.ln = function() {
    return Ot(this);
  };
  C.negated = C.neg = function() {
    var e7 = new this.constructor(this);
    return e7.s = -e7.s || 0, e7;
  };
  C.plus = C.add = function(e7) {
    var t = this;
    return e7 = new t.constructor(e7), t.s == e7.s ? no(t, e7) : oo(t, (e7.s = -e7.s, e7));
  };
  C.precision = C.sd = function(e7) {
    var t, r, n, i = this;
    if (e7 !== void 0 && e7 !== !!e7 && e7 !== 1 && e7 !== 0) throw Error(je + e7);
    if (t = G(i) + 1, n = i.d.length - 1, r = n * V + 1, n = i.d[n], n) {
      for (; n % 10 == 0; n /= 10) r--;
      for (n = i.d[0]; n >= 10; n /= 10) r++;
    }
    return e7 && t > r ? t : r;
  };
  C.squareRoot = C.sqrt = function() {
    var e7, t, r, n, i, o3, s, a3 = this, m3 = a3.constructor;
    if (a3.s < 1) {
      if (!a3.s) return new m3(0);
      throw Error(ue + "NaN");
    }
    for (e7 = G(a3), j = false, i = Math.sqrt(+a3), i == 0 || i == 1 / 0 ? (t = he(a3.d), (t.length + e7) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e7 = nt((e7 + 1) / 2) - (e7 < 0 || e7 % 2), i == 1 / 0 ? t = "5e" + e7 : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e7), n = new m3(t)) : n = new m3(i.toString()), r = m3.precision, i = s = r + 3; ; ) if (o3 = n, n = o3.plus(Ce(a3, o3, s + 2)).times(0.5), he(o3.d).slice(0, s) === (t = he(n.d)).slice(0, s)) {
      if (t = t.slice(s - 3, s + 1), i == s && t == "4999") {
        if (L(o3, r + 1, 0), o3.times(o3).eq(a3)) {
          n = o3;
          break;
        }
      } else if (t != "9999") break;
      s += 4;
    }
    return j = true, L(n, r);
  };
  C.times = C.mul = function(e7) {
    var t, r, n, i, o3, s, a3, m3, f3, T3 = this, S3 = T3.constructor, v3 = T3.d, A3 = (e7 = new S3(e7)).d;
    if (!T3.s || !e7.s) return new S3(0);
    for (e7.s *= T3.s, r = T3.e + e7.e, m3 = v3.length, f3 = A3.length, m3 < f3 && (o3 = v3, v3 = A3, A3 = o3, s = m3, m3 = f3, f3 = s), o3 = [], s = m3 + f3, n = s; n--; ) o3.push(0);
    for (n = f3; --n >= 0; ) {
      for (t = 0, i = m3 + n; i > n; ) a3 = o3[i] + A3[n] * v3[i - n - 1] + t, o3[i--] = a3 % W | 0, t = a3 / W | 0;
      o3[i] = (o3[i] + t) % W | 0;
    }
    for (; !o3[--s]; ) o3.pop();
    return t ? ++r : o3.shift(), e7.d = o3, e7.e = r, j ? L(e7, S3.precision) : e7;
  };
  C.toDecimalPlaces = C.todp = function(e7, t) {
    var r = this, n = r.constructor;
    return r = new n(r), e7 === void 0 ? r : (we(e7, 0, rt), t === void 0 ? t = n.rounding : we(t, 0, 8), L(r, e7 + G(r) + 1, t));
  };
  C.toExponential = function(e7, t) {
    var r, n = this, i = n.constructor;
    return e7 === void 0 ? r = Qe(n, true) : (we(e7, 0, rt), t === void 0 ? t = i.rounding : we(t, 0, 8), n = L(new i(n), e7 + 1, t), r = Qe(n, true, e7 + 1)), r;
  };
  C.toFixed = function(e7, t) {
    var r, n, i = this, o3 = i.constructor;
    return e7 === void 0 ? Qe(i) : (we(e7, 0, rt), t === void 0 ? t = o3.rounding : we(t, 0, 8), n = L(new o3(i), e7 + G(i) + 1, t), r = Qe(n.abs(), false, e7 + G(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
  };
  C.toInteger = C.toint = function() {
    var e7 = this, t = e7.constructor;
    return L(new t(e7), G(e7) + 1, t.rounding);
  };
  C.toNumber = function() {
    return +this;
  };
  C.toPower = C.pow = function(e7) {
    var t, r, n, i, o3, s, a3 = this, m3 = a3.constructor, f3 = 12, T3 = +(e7 = new m3(e7));
    if (!e7.s) return new m3(se);
    if (a3 = new m3(a3), !a3.s) {
      if (e7.s < 1) throw Error(ue + "Infinity");
      return a3;
    }
    if (a3.eq(se)) return a3;
    if (n = m3.precision, e7.eq(se)) return L(a3, n);
    if (t = e7.e, r = e7.d.length - 1, s = t >= r, o3 = a3.s, s) {
      if ((r = T3 < 0 ? -T3 : T3) <= ro) {
        for (i = new m3(se), t = Math.ceil(n / V + 4), j = false; r % 2 && (i = i.times(a3), to(i.d, t)), r = nt(r / 2), r !== 0; ) a3 = a3.times(a3), to(a3.d, t);
        return j = true, e7.s < 0 ? new m3(se).div(i) : L(i, n);
      }
    } else if (o3 < 0) throw Error(ue + "NaN");
    return o3 = o3 < 0 && e7.d[Math.max(t, r)] & 1 ? -1 : 1, a3.s = 1, j = false, i = e7.times(Ot(a3, n + f3)), j = true, i = io(i), i.s = o3, i;
  };
  C.toPrecision = function(e7, t) {
    var r, n, i = this, o3 = i.constructor;
    return e7 === void 0 ? (r = G(i), n = Qe(i, r <= o3.toExpNeg || r >= o3.toExpPos)) : (we(e7, 1, rt), t === void 0 ? t = o3.rounding : we(t, 0, 8), i = L(new o3(i), e7, t), r = G(i), n = Qe(i, e7 <= r || r <= o3.toExpNeg, e7)), n;
  };
  C.toSignificantDigits = C.tosd = function(e7, t) {
    var r = this, n = r.constructor;
    return e7 === void 0 ? (e7 = n.precision, t = n.rounding) : (we(e7, 1, rt), t === void 0 ? t = n.rounding : we(t, 0, 8)), L(new n(r), e7, t);
  };
  C.toString = C.valueOf = C.val = C.toJSON = C[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
    var e7 = this, t = G(e7), r = e7.constructor;
    return Qe(e7, t <= r.toExpNeg || t >= r.toExpPos);
  };
  Ce = /* @__PURE__ */ (function() {
    function e7(n, i) {
      var o3, s = 0, a3 = n.length;
      for (n = n.slice(); a3--; ) o3 = n[a3] * i + s, n[a3] = o3 % W | 0, s = o3 / W | 0;
      return s && n.unshift(s), n;
    }
    __name(e7, "e");
    function t(n, i, o3, s) {
      var a3, m3;
      if (o3 != s) m3 = o3 > s ? 1 : -1;
      else for (a3 = m3 = 0; a3 < o3; a3++) if (n[a3] != i[a3]) {
        m3 = n[a3] > i[a3] ? 1 : -1;
        break;
      }
      return m3;
    }
    __name(t, "t");
    function r(n, i, o3) {
      for (var s = 0; o3--; ) n[o3] -= s, s = n[o3] < i[o3] ? 1 : 0, n[o3] = s * W + n[o3] - i[o3];
      for (; !n[0] && n.length > 1; ) n.shift();
    }
    __name(r, "r");
    return function(n, i, o3, s) {
      var a3, m3, f3, T3, S3, v3, A3, N3, R3, I3, Q3, B3, F3, re3, Ue, Pn, de3, pr, dr = n.constructor, El = n.s == i.s ? 1 : -1, ge = n.d, J3 = i.d;
      if (!n.s) return new dr(n);
      if (!i.s) throw Error(ue + "Division by zero");
      for (m3 = n.e - i.e, de3 = J3.length, Ue = ge.length, A3 = new dr(El), N3 = A3.d = [], f3 = 0; J3[f3] == (ge[f3] || 0); ) ++f3;
      if (J3[f3] > (ge[f3] || 0) && --m3, o3 == null ? B3 = o3 = dr.precision : s ? B3 = o3 + (G(n) - G(i)) + 1 : B3 = o3, B3 < 0) return new dr(0);
      if (B3 = B3 / V + 2 | 0, f3 = 0, de3 == 1) for (T3 = 0, J3 = J3[0], B3++; (f3 < Ue || T3) && B3--; f3++) F3 = T3 * W + (ge[f3] || 0), N3[f3] = F3 / J3 | 0, T3 = F3 % J3 | 0;
      else {
        for (T3 = W / (J3[0] + 1) | 0, T3 > 1 && (J3 = e7(J3, T3), ge = e7(ge, T3), de3 = J3.length, Ue = ge.length), re3 = de3, R3 = ge.slice(0, de3), I3 = R3.length; I3 < de3; ) R3[I3++] = 0;
        pr = J3.slice(), pr.unshift(0), Pn = J3[0], J3[1] >= W / 2 && ++Pn;
        do
          T3 = 0, a3 = t(J3, R3, de3, I3), a3 < 0 ? (Q3 = R3[0], de3 != I3 && (Q3 = Q3 * W + (R3[1] || 0)), T3 = Q3 / Pn | 0, T3 > 1 ? (T3 >= W && (T3 = W - 1), S3 = e7(J3, T3), v3 = S3.length, I3 = R3.length, a3 = t(S3, R3, v3, I3), a3 == 1 && (T3--, r(S3, de3 < v3 ? pr : J3, v3))) : (T3 == 0 && (a3 = T3 = 1), S3 = J3.slice()), v3 = S3.length, v3 < I3 && S3.unshift(0), r(R3, S3, I3), a3 == -1 && (I3 = R3.length, a3 = t(J3, R3, de3, I3), a3 < 1 && (T3++, r(R3, de3 < I3 ? pr : J3, I3))), I3 = R3.length) : a3 === 0 && (T3++, R3 = [0]), N3[f3++] = T3, a3 && R3[0] ? R3[I3++] = ge[re3] || 0 : (R3 = [ge[re3]], I3 = 1);
        while ((re3++ < Ue || R3[0] !== void 0) && B3--);
      }
      return N3[0] || N3.shift(), A3.e = m3, L(A3, s ? o3 + G(A3) + 1 : o3);
    };
  })();
  ao = so(_l);
  se = new ao(1);
});
var d = ye(() => {
  "use strict";
  uo();
});
var On = {};
kt(On, { Hash: /* @__PURE__ */ __name(() => Lt, "Hash"), createHash: /* @__PURE__ */ __name(() => Io, "createHash"), default: /* @__PURE__ */ __name(() => ot, "default"), randomFillSync: /* @__PURE__ */ __name(() => xr, "randomFillSync"), randomUUID: /* @__PURE__ */ __name(() => br, "randomUUID"), webcrypto: /* @__PURE__ */ __name(() => _t, "webcrypto") });
function br() {
  return globalThis.crypto.randomUUID();
}
__name(br, "br");
function xr(e7, t, r) {
  return t !== void 0 && (r !== void 0 ? e7 = e7.subarray(t, t + r) : e7 = e7.subarray(t)), globalThis.crypto.getRandomValues(e7);
}
__name(xr, "xr");
function Io(e7) {
  return new Lt(e7);
}
__name(Io, "Io");
var _t;
var Lt;
var ot;
var Je = ye(() => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  _t = globalThis.crypto;
  Lt = class {
    static {
      __name(this, "Lt");
    }
    #e = [];
    #t;
    constructor(t) {
      this.#t = t;
    }
    update(t) {
      this.#e.push(t);
    }
    async digest() {
      let t = new Uint8Array(this.#e.reduce((i, o3) => i + o3.length, 0)), r = 0;
      for (let i of this.#e) t.set(i, r), r += i.length;
      let n = await globalThis.crypto.subtle.digest(this.#t, t);
      return new Uint8Array(n);
    }
  }, ot = { webcrypto: _t, randomUUID: br, randomFillSync: xr, createHash: Io, Hash: Lt };
});
var ko = oe(() => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
});
var Oo = oe((th, Jl) => {
  Jl.exports = { name: "@prisma/engines-version", version: "7.8.0-6.3c6e192761c0362d496ed980de936e2f3cebcd3a", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "3c6e192761c0362d496ed980de936e2f3cebcd3a" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
});
var No = oe((Er) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Object.defineProperty(Er, "__esModule", { value: true });
  Er.enginesVersion = void 0;
  Er.enginesVersion = Oo().prisma.enginesVersion;
});
var _o = oe((fh, Lo) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Lo.exports = (e7, t = 1, r) => {
    if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e7 != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e7}\``);
    if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
    if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
    if (t === 0) return e7;
    let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return e7.replace(n, r.indent.repeat(t));
  };
});
var $o = oe((Vh, Pr) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Pr.exports = (e7 = {}) => {
    let t;
    if (e7.repoUrl) t = e7.repoUrl;
    else if (e7.user && e7.repo) t = `https://github.com/${e7.user}/${e7.repo}`;
    else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
    let r = new URL(`${t}/issues/new`), n = ["body", "title", "labels", "template", "milestone", "assignee", "projects"];
    for (let i of n) {
      let o3 = e7[i];
      if (o3 !== void 0) {
        if (i === "labels" || i === "projects") {
          if (!Array.isArray(o3)) throw new TypeError(`The \`${i}\` option should be an array`);
          o3 = o3.join(",");
        }
        r.searchParams.set(i, o3);
      }
    }
    return r.toString();
  };
  Pr.exports.default = Pr.exports;
});
var Fn = oe((Rb, qo) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  qo.exports = /* @__PURE__ */ (function() {
    function e7(t, r, n, i, o3) {
      return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o3 ? r : r + 1;
    }
    __name(e7, "e");
    return function(t, r) {
      if (t === r) return 0;
      if (t.length > r.length) {
        var n = t;
        t = r, r = n;
      }
      for (var i = t.length, o3 = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o3 - 1); ) i--, o3--;
      for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
      if (i -= s, o3 -= s, i === 0 || o3 < 3) return o3;
      var a3 = 0, m3, f3, T3, S3, v3, A3, N3, R3, I3, Q3, B3, F3, re3 = [];
      for (m3 = 0; m3 < i; m3++) re3.push(m3 + 1), re3.push(t.charCodeAt(s + m3));
      for (var Ue = re3.length - 1; a3 < o3 - 3; ) for (I3 = r.charCodeAt(s + (f3 = a3)), Q3 = r.charCodeAt(s + (T3 = a3 + 1)), B3 = r.charCodeAt(s + (S3 = a3 + 2)), F3 = r.charCodeAt(s + (v3 = a3 + 3)), A3 = a3 += 4, m3 = 0; m3 < Ue; m3 += 2) N3 = re3[m3], R3 = re3[m3 + 1], f3 = e7(N3, f3, T3, I3, R3), T3 = e7(f3, T3, S3, Q3, R3), S3 = e7(T3, S3, v3, B3, R3), A3 = e7(S3, v3, A3, F3, R3), re3[m3] = A3, v3 = S3, S3 = T3, T3 = f3, f3 = N3;
      for (; a3 < o3; ) for (I3 = r.charCodeAt(s + (f3 = a3)), A3 = ++a3, m3 = 0; m3 < Ue; m3 += 2) N3 = re3[m3], re3[m3] = A3 = e7(N3, f3, A3, I3, re3[m3 + 1]), f3 = N3;
      return A3;
    };
  })();
});
var Ho = ye(() => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
});
var Go = ye(() => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
});
var Ur;
var ms = ye(() => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Ur = class {
    static {
      __name(this, "Ur");
    }
    events = {};
    on(t, r) {
      return this.events[t] || (this.events[t] = []), this.events[t].push(r), this;
    }
    emit(t, ...r) {
      return this.events[t] ? (this.events[t].forEach((n) => {
        n(...r);
      }), true) : false;
    }
  };
});
var oi = oe((ze) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Object.defineProperty(ze, "__esModule", { value: true });
  ze.anumber = ii;
  ze.abytes = ia;
  ze.ahash = qp;
  ze.aexists = Bp;
  ze.aoutput = jp;
  function ii(e7) {
    if (!Number.isSafeInteger(e7) || e7 < 0) throw new Error("positive integer expected, got " + e7);
  }
  __name(ii, "ii");
  function Up(e7) {
    return e7 instanceof Uint8Array || ArrayBuffer.isView(e7) && e7.constructor.name === "Uint8Array";
  }
  __name(Up, "Up");
  function ia(e7, ...t) {
    if (!Up(e7)) throw new Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e7.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e7.length);
  }
  __name(ia, "ia");
  function qp(e7) {
    if (typeof e7 != "function" || typeof e7.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
    ii(e7.outputLen), ii(e7.blockLen);
  }
  __name(qp, "qp");
  function Bp(e7, t = true) {
    if (e7.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e7.finished) throw new Error("Hash#digest() has already been called");
  }
  __name(Bp, "Bp");
  function jp(e7, t) {
    ia(e7);
    let r = t.outputLen;
    if (e7.length < r) throw new Error("digestInto() expects output buffer of length at least " + r);
  }
  __name(jp, "jp");
});
var Aa = oe((O3) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Object.defineProperty(O3, "__esModule", { value: true });
  O3.add5L = O3.add5H = O3.add4H = O3.add4L = O3.add3H = O3.add3L = O3.rotlBL = O3.rotlBH = O3.rotlSL = O3.rotlSH = O3.rotr32L = O3.rotr32H = O3.rotrBL = O3.rotrBH = O3.rotrSL = O3.rotrSH = O3.shrSL = O3.shrSH = O3.toBig = void 0;
  O3.fromBig = ai;
  O3.split = oa;
  O3.add = ba;
  var Kr = BigInt(2 ** 32 - 1), si = BigInt(32);
  function ai(e7, t = false) {
    return t ? { h: Number(e7 & Kr), l: Number(e7 >> si & Kr) } : { h: Number(e7 >> si & Kr) | 0, l: Number(e7 & Kr) | 0 };
  }
  __name(ai, "ai");
  function oa(e7, t = false) {
    let r = new Uint32Array(e7.length), n = new Uint32Array(e7.length);
    for (let i = 0; i < e7.length; i++) {
      let { h: o3, l: s } = ai(e7[i], t);
      [r[i], n[i]] = [o3, s];
    }
    return [r, n];
  }
  __name(oa, "oa");
  var sa = /* @__PURE__ */ __name((e7, t) => BigInt(e7 >>> 0) << si | BigInt(t >>> 0), "sa");
  O3.toBig = sa;
  var aa = /* @__PURE__ */ __name((e7, t, r) => e7 >>> r, "aa");
  O3.shrSH = aa;
  var ua = /* @__PURE__ */ __name((e7, t, r) => e7 << 32 - r | t >>> r, "ua");
  O3.shrSL = ua;
  var la = /* @__PURE__ */ __name((e7, t, r) => e7 >>> r | t << 32 - r, "la");
  O3.rotrSH = la;
  var ca = /* @__PURE__ */ __name((e7, t, r) => e7 << 32 - r | t >>> r, "ca");
  O3.rotrSL = ca;
  var pa = /* @__PURE__ */ __name((e7, t, r) => e7 << 64 - r | t >>> r - 32, "pa");
  O3.rotrBH = pa;
  var da = /* @__PURE__ */ __name((e7, t, r) => e7 >>> r - 32 | t << 64 - r, "da");
  O3.rotrBL = da;
  var ma = /* @__PURE__ */ __name((e7, t) => t, "ma");
  O3.rotr32H = ma;
  var fa = /* @__PURE__ */ __name((e7, t) => e7, "fa");
  O3.rotr32L = fa;
  var ga = /* @__PURE__ */ __name((e7, t, r) => e7 << r | t >>> 32 - r, "ga");
  O3.rotlSH = ga;
  var ya = /* @__PURE__ */ __name((e7, t, r) => t << r | e7 >>> 32 - r, "ya");
  O3.rotlSL = ya;
  var ha = /* @__PURE__ */ __name((e7, t, r) => t << r - 32 | e7 >>> 64 - r, "ha");
  O3.rotlBH = ha;
  var wa = /* @__PURE__ */ __name((e7, t, r) => e7 << r - 32 | t >>> 64 - r, "wa");
  O3.rotlBL = wa;
  function ba(e7, t, r, n) {
    let i = (t >>> 0) + (n >>> 0);
    return { h: e7 + r + (i / 2 ** 32 | 0) | 0, l: i | 0 };
  }
  __name(ba, "ba");
  var xa = /* @__PURE__ */ __name((e7, t, r) => (e7 >>> 0) + (t >>> 0) + (r >>> 0), "xa");
  O3.add3L = xa;
  var Ea = /* @__PURE__ */ __name((e7, t, r, n) => t + r + n + (e7 / 2 ** 32 | 0) | 0, "Ea");
  O3.add3H = Ea;
  var Ta = /* @__PURE__ */ __name((e7, t, r, n) => (e7 >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), "Ta");
  O3.add4L = Ta;
  var Pa = /* @__PURE__ */ __name((e7, t, r, n, i) => t + r + n + i + (e7 / 2 ** 32 | 0) | 0, "Pa");
  O3.add4H = Pa;
  var Sa = /* @__PURE__ */ __name((e7, t, r, n, i) => (e7 >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0), "Sa");
  O3.add5L = Sa;
  var va = /* @__PURE__ */ __name((e7, t, r, n, i, o3) => t + r + n + i + o3 + (e7 / 2 ** 32 | 0) | 0, "va");
  O3.add5H = va;
  var Qp = { fromBig: ai, split: oa, toBig: sa, shrSH: aa, shrSL: ua, rotrSH: la, rotrSL: ca, rotrBH: pa, rotrBL: da, rotr32H: ma, rotr32L: fa, rotlSH: ga, rotlSL: ya, rotlBH: ha, rotlBL: wa, add: ba, add3L: xa, add3H: Ea, add4L: Ta, add4H: Pa, add5H: va, add5L: Sa };
  O3.default = Qp;
});
var Ca = oe((Zr) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Object.defineProperty(Zr, "__esModule", { value: true });
  Zr.crypto = void 0;
  var _e3 = (Je(), Cl(On));
  Zr.crypto = _e3 && typeof _e3 == "object" && "webcrypto" in _e3 ? _e3.webcrypto : _e3 && typeof _e3 == "object" && "randomBytes" in _e3 ? _e3 : void 0;
});
var ka = oe((D3) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Object.defineProperty(D3, "__esModule", { value: true });
  D3.Hash = D3.nextTick = D3.byteSwapIfBE = D3.isLE = void 0;
  D3.isBytes = Jp;
  D3.u8 = Hp;
  D3.u32 = Gp;
  D3.createView = zp;
  D3.rotr = Wp;
  D3.rotl = Kp;
  D3.byteSwap = ci;
  D3.byteSwap32 = Zp;
  D3.bytesToHex = Xp;
  D3.hexToBytes = ed;
  D3.asyncLoop = rd;
  D3.utf8ToBytes = Ia;
  D3.toBytes = Yr;
  D3.concatBytes = nd;
  D3.checkOpts = id;
  D3.wrapConstructor = od;
  D3.wrapConstructorWithOpts = sd;
  D3.wrapXOFConstructorWithOpts = ad;
  D3.randomBytes = ud;
  var Et = Ca(), li = oi();
  function Jp(e7) {
    return e7 instanceof Uint8Array || ArrayBuffer.isView(e7) && e7.constructor.name === "Uint8Array";
  }
  __name(Jp, "Jp");
  function Hp(e7) {
    return new Uint8Array(e7.buffer, e7.byteOffset, e7.byteLength);
  }
  __name(Hp, "Hp");
  function Gp(e7) {
    return new Uint32Array(e7.buffer, e7.byteOffset, Math.floor(e7.byteLength / 4));
  }
  __name(Gp, "Gp");
  function zp(e7) {
    return new DataView(e7.buffer, e7.byteOffset, e7.byteLength);
  }
  __name(zp, "zp");
  function Wp(e7, t) {
    return e7 << 32 - t | e7 >>> t;
  }
  __name(Wp, "Wp");
  function Kp(e7, t) {
    return e7 << t | e7 >>> 32 - t >>> 0;
  }
  __name(Kp, "Kp");
  D3.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  function ci(e7) {
    return e7 << 24 & 4278190080 | e7 << 8 & 16711680 | e7 >>> 8 & 65280 | e7 >>> 24 & 255;
  }
  __name(ci, "ci");
  D3.byteSwapIfBE = D3.isLE ? (e7) => e7 : (e7) => ci(e7);
  function Zp(e7) {
    for (let t = 0; t < e7.length; t++) e7[t] = ci(e7[t]);
  }
  __name(Zp, "Zp");
  var Yp = Array.from({ length: 256 }, (e7, t) => t.toString(16).padStart(2, "0"));
  function Xp(e7) {
    (0, li.abytes)(e7);
    let t = "";
    for (let r = 0; r < e7.length; r++) t += Yp[e7[r]];
    return t;
  }
  __name(Xp, "Xp");
  var Ie = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function Ra(e7) {
    if (e7 >= Ie._0 && e7 <= Ie._9) return e7 - Ie._0;
    if (e7 >= Ie.A && e7 <= Ie.F) return e7 - (Ie.A - 10);
    if (e7 >= Ie.a && e7 <= Ie.f) return e7 - (Ie.a - 10);
  }
  __name(Ra, "Ra");
  function ed(e7) {
    if (typeof e7 != "string") throw new Error("hex string expected, got " + typeof e7);
    let t = e7.length, r = t / 2;
    if (t % 2) throw new Error("hex string expected, got unpadded hex of length " + t);
    let n = new Uint8Array(r);
    for (let i = 0, o3 = 0; i < r; i++, o3 += 2) {
      let s = Ra(e7.charCodeAt(o3)), a3 = Ra(e7.charCodeAt(o3 + 1));
      if (s === void 0 || a3 === void 0) {
        let m3 = e7[o3] + e7[o3 + 1];
        throw new Error('hex string expected, got non-hex character "' + m3 + '" at index ' + o3);
      }
      n[i] = s * 16 + a3;
    }
    return n;
  }
  __name(ed, "ed");
  var td = /* @__PURE__ */ __name(async () => {
  }, "td");
  D3.nextTick = td;
  async function rd(e7, t, r) {
    let n = Date.now();
    for (let i = 0; i < e7; i++) {
      r(i);
      let o3 = Date.now() - n;
      o3 >= 0 && o3 < t || (await (0, D3.nextTick)(), n += o3);
    }
  }
  __name(rd, "rd");
  function Ia(e7) {
    if (typeof e7 != "string") throw new Error("utf8ToBytes expected string, got " + typeof e7);
    return new Uint8Array(new TextEncoder().encode(e7));
  }
  __name(Ia, "Ia");
  function Yr(e7) {
    return typeof e7 == "string" && (e7 = Ia(e7)), (0, li.abytes)(e7), e7;
  }
  __name(Yr, "Yr");
  function nd(...e7) {
    let t = 0;
    for (let n = 0; n < e7.length; n++) {
      let i = e7[n];
      (0, li.abytes)(i), t += i.length;
    }
    let r = new Uint8Array(t);
    for (let n = 0, i = 0; n < e7.length; n++) {
      let o3 = e7[n];
      r.set(o3, i), i += o3.length;
    }
    return r;
  }
  __name(nd, "nd");
  var ui = class {
    static {
      __name(this, "ui");
    }
    clone() {
      return this._cloneInto();
    }
  };
  D3.Hash = ui;
  function id(e7, t) {
    if (t !== void 0 && {}.toString.call(t) !== "[object Object]") throw new Error("Options should be object or undefined");
    return Object.assign(e7, t);
  }
  __name(id, "id");
  function od(e7) {
    let t = /* @__PURE__ */ __name((n) => e7().update(Yr(n)).digest(), "t"), r = e7();
    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e7(), t;
  }
  __name(od, "od");
  function sd(e7) {
    let t = /* @__PURE__ */ __name((n, i) => e7(i).update(Yr(n)).digest(), "t"), r = e7({});
    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = (n) => e7(n), t;
  }
  __name(sd, "sd");
  function ad(e7) {
    let t = /* @__PURE__ */ __name((n, i) => e7(i).update(Yr(n)).digest(), "t"), r = e7({});
    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = (n) => e7(n), t;
  }
  __name(ad, "ad");
  function ud(e7 = 32) {
    if (Et.crypto && typeof Et.crypto.getRandomValues == "function") return Et.crypto.getRandomValues(new Uint8Array(e7));
    if (Et.crypto && typeof Et.crypto.randomBytes == "function") return Et.crypto.randomBytes(e7);
    throw new Error("crypto.getRandomValues must be defined");
  }
  __name(ud, "ud");
});
var $a = oe((q3) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  Object.defineProperty(q3, "__esModule", { value: true });
  q3.shake256 = q3.shake128 = q3.keccak_512 = q3.keccak_384 = q3.keccak_256 = q3.keccak_224 = q3.sha3_512 = q3.sha3_384 = q3.sha3_256 = q3.sha3_224 = q3.Keccak = void 0;
  q3.keccakP = _a;
  var Tt = oi(), Yt = Aa(), ke = ka(), Da = [], Ma = [], La = [], ld = BigInt(0), Zt = BigInt(1), cd = BigInt(2), pd = BigInt(7), dd = BigInt(256), md = BigInt(113);
  for (let e7 = 0, t = Zt, r = 1, n = 0; e7 < 24; e7++) {
    [r, n] = [n, (2 * r + 3 * n) % 5], Da.push(2 * (5 * n + r)), Ma.push((e7 + 1) * (e7 + 2) / 2 % 64);
    let i = ld;
    for (let o3 = 0; o3 < 7; o3++) t = (t << Zt ^ (t >> pd) * md) % dd, t & cd && (i ^= Zt << (Zt << BigInt(o3)) - Zt);
    La.push(i);
  }
  var [fd, gd] = (0, Yt.split)(La, true), Oa = /* @__PURE__ */ __name((e7, t, r) => r > 32 ? (0, Yt.rotlBH)(e7, t, r) : (0, Yt.rotlSH)(e7, t, r), "Oa"), Na = /* @__PURE__ */ __name((e7, t, r) => r > 32 ? (0, Yt.rotlBL)(e7, t, r) : (0, Yt.rotlSL)(e7, t, r), "Na");
  function _a(e7, t = 24) {
    let r = new Uint32Array(10);
    for (let n = 24 - t; n < 24; n++) {
      for (let s = 0; s < 10; s++) r[s] = e7[s] ^ e7[s + 10] ^ e7[s + 20] ^ e7[s + 30] ^ e7[s + 40];
      for (let s = 0; s < 10; s += 2) {
        let a3 = (s + 8) % 10, m3 = (s + 2) % 10, f3 = r[m3], T3 = r[m3 + 1], S3 = Oa(f3, T3, 1) ^ r[a3], v3 = Na(f3, T3, 1) ^ r[a3 + 1];
        for (let A3 = 0; A3 < 50; A3 += 10) e7[s + A3] ^= S3, e7[s + A3 + 1] ^= v3;
      }
      let i = e7[2], o3 = e7[3];
      for (let s = 0; s < 24; s++) {
        let a3 = Ma[s], m3 = Oa(i, o3, a3), f3 = Na(i, o3, a3), T3 = Da[s];
        i = e7[T3], o3 = e7[T3 + 1], e7[T3] = m3, e7[T3 + 1] = f3;
      }
      for (let s = 0; s < 50; s += 10) {
        for (let a3 = 0; a3 < 10; a3++) r[a3] = e7[s + a3];
        for (let a3 = 0; a3 < 10; a3++) e7[s + a3] ^= ~r[(a3 + 2) % 10] & r[(a3 + 4) % 10];
      }
      e7[0] ^= fd[n], e7[1] ^= gd[n];
    }
    r.fill(0);
  }
  __name(_a, "_a");
  var Xt = class e7 extends ke.Hash {
    static {
      __name(this, "e");
    }
    constructor(t, r, n, i = false, o3 = 24) {
      if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = i, this.rounds = o3, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, (0, Tt.anumber)(n), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200), this.state32 = (0, ke.u32)(this.state);
    }
    keccak() {
      ke.isLE || (0, ke.byteSwap32)(this.state32), _a(this.state32, this.rounds), ke.isLE || (0, ke.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(t) {
      (0, Tt.aexists)(this);
      let { blockLen: r, state: n } = this;
      t = (0, ke.toBytes)(t);
      let i = t.length;
      for (let o3 = 0; o3 < i; ) {
        let s = Math.min(r - this.pos, i - o3);
        for (let a3 = 0; a3 < s; a3++) n[this.pos++] ^= t[o3++];
        this.pos === r && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = true;
      let { state: t, suffix: r, pos: n, blockLen: i } = this;
      t[n] ^= r, (r & 128) !== 0 && n === i - 1 && this.keccak(), t[i - 1] ^= 128, this.keccak();
    }
    writeInto(t) {
      (0, Tt.aexists)(this, false), (0, Tt.abytes)(t), this.finish();
      let r = this.state, { blockLen: n } = this;
      for (let i = 0, o3 = t.length; i < o3; ) {
        this.posOut >= n && this.keccak();
        let s = Math.min(n - this.posOut, o3 - i);
        t.set(r.subarray(this.posOut, this.posOut + s), i), this.posOut += s, i += s;
      }
      return t;
    }
    xofInto(t) {
      if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
      return this.writeInto(t);
    }
    xof(t) {
      return (0, Tt.anumber)(t), this.xofInto(new Uint8Array(t));
    }
    digestInto(t) {
      if ((0, Tt.aoutput)(t, this), this.finished) throw new Error("digest() was already called");
      return this.writeInto(t), this.destroy(), t;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true, this.state.fill(0);
    }
    _cloneInto(t) {
      let { blockLen: r, suffix: n, outputLen: i, rounds: o3, enableXOF: s } = this;
      return t || (t = new e7(r, n, i, s, o3)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = o3, t.suffix = n, t.outputLen = i, t.enableXOF = s, t.destroyed = this.destroyed, t;
    }
  };
  q3.Keccak = Xt;
  var Fe = /* @__PURE__ */ __name((e7, t, r) => (0, ke.wrapConstructor)(() => new Xt(t, e7, r)), "Fe");
  q3.sha3_224 = Fe(6, 144, 224 / 8);
  q3.sha3_256 = Fe(6, 136, 256 / 8);
  q3.sha3_384 = Fe(6, 104, 384 / 8);
  q3.sha3_512 = Fe(6, 72, 512 / 8);
  q3.keccak_224 = Fe(1, 144, 224 / 8);
  q3.keccak_256 = Fe(1, 136, 256 / 8);
  q3.keccak_384 = Fe(1, 104, 384 / 8);
  q3.keccak_512 = Fe(1, 72, 512 / 8);
  var Fa = /* @__PURE__ */ __name((e7, t, r) => (0, ke.wrapXOFConstructorWithOpts)((n = {}) => new Xt(t, e7, n.dkLen === void 0 ? r : n.dkLen, true)), "Fa");
  q3.shake128 = Fa(31, 168, 128 / 8);
  q3.shake256 = Fa(31, 136, 256 / 8);
});
var Ha = oe((pO, $e) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  var { sha3_512: yd } = $a(), Ua = 24, er = 32, pi = /* @__PURE__ */ __name((e7 = 4, t = Math.random) => {
    let r = "";
    for (; r.length < e7; ) r = r + Math.floor(t() * 36).toString(36);
    return r;
  }, "pi");
  function qa(e7) {
    let t = 8n, r = 0n;
    for (let n of e7.values()) {
      let i = BigInt(n);
      r = (r << t) + i;
    }
    return r;
  }
  __name(qa, "qa");
  var Ba = /* @__PURE__ */ __name((e7 = "") => qa(yd(e7)).toString(36).slice(1), "Ba"), Va = Array.from({ length: 26 }, (e7, t) => String.fromCharCode(t + 97)), hd = /* @__PURE__ */ __name((e7) => Va[Math.floor(e7() * Va.length)], "hd"), ja = /* @__PURE__ */ __name(({ globalObj: e7 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {}, random: t = Math.random } = {}) => {
    let r = Object.keys(e7).toString(), n = r.length ? r + pi(er, t) : pi(er, t);
    return Ba(n).substring(0, er);
  }, "ja"), Qa = /* @__PURE__ */ __name((e7) => () => e7++, "Qa"), wd = 476782367, Ja = /* @__PURE__ */ __name(({ random: e7 = Math.random, counter: t = Qa(Math.floor(e7() * wd)), length: r = Ua, fingerprint: n = ja({ random: e7 }) } = {}) => function() {
    let o3 = hd(e7), s = Date.now().toString(36), a3 = t().toString(36), m3 = pi(r, e7), f3 = `${s + m3 + a3 + n}`;
    return `${o3 + Ba(f3).substring(1, r)}`;
  }, "Ja"), bd = Ja(), xd = /* @__PURE__ */ __name((e7, { minLength: t = 2, maxLength: r = er } = {}) => {
    let n = e7.length, i = /^[0-9a-z]+$/;
    try {
      if (typeof e7 == "string" && n >= t && n <= r && i.test(e7)) return true;
    } finally {
    }
    return false;
  }, "xd");
  $e.exports.getConstants = () => ({ defaultLength: Ua, bigLength: er });
  $e.exports.init = Ja;
  $e.exports.createId = bd;
  $e.exports.bufToBigInt = qa;
  $e.exports.createCounter = Qa;
  $e.exports.createFingerprint = ja;
  $e.exports.isCuid = xd;
});
var Ga = oe((hO, tr) => {
  "use strict";
  u();
  l();
  c();
  p();
  d();
  var { createId: Ed, init: Td, getConstants: Pd, isCuid: Sd } = Ha();
  tr.exports.createId = Ed;
  tr.exports.init = Td;
  tr.exports.getConstants = Pd;
  tr.exports.isCuid = Sd;
});
u();
l();
c();
p();
d();
var po = {};
kt(po, { defineExtension: /* @__PURE__ */ __name(() => lo, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => co, "getExtensionContext") });
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function lo(e7) {
  return typeof e7 == "function" ? e7 : (t) => t.$extends(e7);
}
__name(lo, "lo");
u();
l();
c();
p();
d();
function co(e7) {
  return e7;
}
__name(co, "co");
var fo = {};
kt(fo, { validator: /* @__PURE__ */ __name(() => mo, "validator") });
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function mo(...e7) {
  return (t) => t;
}
__name(mo, "mo");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var be = class {
  static {
    __name(this, "be");
  }
  _map = /* @__PURE__ */ new Map();
  get(t) {
    return this._map.get(t)?.value;
  }
  set(t, r) {
    this._map.set(t, { value: r });
  }
  getOrCreate(t, r) {
    let n = this._map.get(t);
    if (n) return n.value;
    let i = r();
    return this.set(t, i), i;
  }
};
u();
l();
c();
p();
d();
function De(e7) {
  return e7.substring(0, 1).toLowerCase() + e7.substring(1);
}
__name(De, "De");
u();
l();
c();
p();
d();
function go(e7, t) {
  let r = {};
  for (let n of e7) {
    let i = n[t];
    r[i] = n;
  }
  return r;
}
__name(go, "go");
u();
l();
c();
p();
d();
function Nt(e7) {
  let t;
  return { get() {
    return t || (t = { value: e7() }), t.value;
  } };
}
__name(Nt, "Nt");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var In;
var yo;
var ho;
var wo;
var bo = true;
typeof y < "u" && ({ FORCE_COLOR: In, NODE_DISABLE_COLORS: yo, NO_COLOR: ho, TERM: wo } = y.env || {}, bo = y.stdout && y.stdout.isTTY);
var Ul = { enabled: !yo && ho == null && wo !== "dumb" && (In != null && In !== "0" || bo) };
function $2(e7, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e7}m`, i = `\x1B[${t}m`;
  return function(o3) {
    return !Ul.enabled || o3 == null ? o3 : n + (~("" + o3).indexOf(i) ? o3.replace(r, i + n) : o3) + i;
  };
}
__name($2, "$");
var Yg = $2(0, 0);
var yr = $2(1, 22);
var hr = $2(2, 22);
var Xg = $2(3, 23);
var wr = $2(4, 24);
var ey = $2(7, 27);
var ty = $2(8, 28);
var ry = $2(9, 29);
var ny = $2(30, 39);
var it = $2(31, 39);
var xo = $2(32, 39);
var Eo = $2(33, 39);
var To = $2(34, 39);
var iy = $2(35, 39);
var Po = $2(36, 39);
var oy = $2(37, 39);
var So = $2(90, 39);
var sy = $2(90, 39);
var ay = $2(40, 49);
var uy = $2(41, 49);
var ly = $2(42, 49);
var cy = $2(43, 49);
var py = $2(44, 49);
var dy = $2(45, 49);
var my = $2(46, 49);
var fy = $2(47, 49);
u();
l();
c();
p();
d();
var ql = 100;
var vo = ["green", "yellow", "blue", "magenta", "cyan", "red"];
var Dt = [];
var Ao = Date.now();
var Bl = 0;
var kn = typeof y < "u" ? y.env : {};
globalThis.DEBUG ??= kn.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= kn.DEBUG_COLORS ? kn.DEBUG_COLORS === "true" : true;
var Mt = { enable(e7) {
  typeof e7 == "string" && (globalThis.DEBUG = e7);
}, disable() {
  let e7 = globalThis.DEBUG;
  return globalThis.DEBUG = "", e7;
}, enabled(e7) {
  let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e7.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e7.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
  return r && !n;
}, log: /* @__PURE__ */ __name((...e7) => {
  let [t, r, ...n] = e7;
  (console.warn ?? console.log)(`${t} ${r}`, ...n);
}, "log"), formatters: {} };
function jl(e7) {
  let t = { color: vo[Bl++ % vo.length], enabled: Mt.enabled(e7), namespace: e7, log: Mt.log, extend: /* @__PURE__ */ __name(() => {
  }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
    let { enabled: i, namespace: o3, color: s, log: a3 } = t;
    if (n.length !== 0 && Dt.push([o3, ...n]), Dt.length > ql && Dt.shift(), Mt.enabled(o3) || i) {
      let m3 = n.map((T3) => typeof T3 == "string" ? T3 : Ql(T3)), f3 = `+${Date.now() - Ao}ms`;
      Ao = Date.now(), a3(o3, ...m3, f3);
    }
  }, "r");
  return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => t[i], "get"), set: /* @__PURE__ */ __name((n, i, o3) => t[i] = o3, "set") });
}
__name(jl, "jl");
var ee = new Proxy(jl, { get: /* @__PURE__ */ __name((e7, t) => Mt[t], "get"), set: /* @__PURE__ */ __name((e7, t, r) => Mt[t] = r, "set") });
function Ql(e7, t = 2) {
  let r = /* @__PURE__ */ new Set();
  return JSON.stringify(e7, (n, i) => {
    if (typeof i == "object" && i !== null) {
      if (r.has(i)) return "[Circular *]";
      r.add(i);
    } else if (typeof i == "bigint") return i.toString();
    return i;
  }, t);
}
__name(Ql, "Ql");
function Co(e7 = 7500) {
  let t = Dt.map(([r, ...n]) => `${r} ${n.map((i) => typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
  return t.length < e7 ? t : t.slice(-e7);
}
__name(Co, "Co");
function Ro() {
  Dt.length = 0;
}
__name(Ro, "Ro");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Re(e7, t) {
  throw new Error(t);
}
__name(Re, "Re");
u();
l();
c();
p();
d();
var Do = "prisma+postgres";
var Tr = `${Do}:`;
function Mo(e7) {
  return e7?.toString().startsWith(`${Tr}//`) ?? false;
}
__name(Mo, "Mo");
function Nn(e7) {
  if (!Mo(e7)) return false;
  let { host: t } = new URL(e7);
  return t.includes("localhost") || t.includes("127.0.0.1") || t.includes("[::1]");
}
__name(Nn, "Nn");
var $t = {};
kt($t, { error: /* @__PURE__ */ __name(() => zl, "error"), info: /* @__PURE__ */ __name(() => Gl, "info"), log: /* @__PURE__ */ __name(() => Hl, "log"), query: /* @__PURE__ */ __name(() => Wl, "query"), should: /* @__PURE__ */ __name(() => Fo, "should"), tags: /* @__PURE__ */ __name(() => Ft, "tags"), warn: /* @__PURE__ */ __name(() => Dn, "warn") });
u();
l();
c();
p();
d();
var Ft = { error: it("prisma:error"), warn: Eo("prisma:warn"), info: Po("prisma:info"), query: To("prisma:query") };
var Fo = { warn: /* @__PURE__ */ __name(() => !y.env.PRISMA_DISABLE_WARNINGS, "warn") };
function Hl(...e7) {
  console.log(...e7);
}
__name(Hl, "Hl");
function Dn(e7, ...t) {
  Fo.warn() && console.warn(`${Ft.warn} ${e7}`, ...t);
}
__name(Dn, "Dn");
function Gl(e7, ...t) {
  console.info(`${Ft.info} ${e7}`, ...t);
}
__name(Gl, "Gl");
function zl(e7, ...t) {
  console.error(`${Ft.error} ${e7}`, ...t);
}
__name(zl, "zl");
function Wl(e7, ...t) {
  console.log(`${Ft.query} ${e7}`, ...t);
}
__name(Wl, "Wl");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Mn({ onlyFirst: e7 = false } = {}) {
  let r = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(r, e7 ? void 0 : "g");
}
__name(Mn, "Mn");
var Kl = Mn();
function st(e7) {
  if (typeof e7 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e7}\``);
  return e7.replace(Kl, "");
}
__name(st, "st");
u();
l();
c();
p();
d();
function Ln(e7, t) {
  return Object.prototype.hasOwnProperty.call(e7, t);
}
__name(Ln, "Ln");
u();
l();
c();
p();
d();
function Sr(e7, t) {
  let r = {};
  for (let n of Object.keys(e7)) r[n] = t(e7[n], n);
  return r;
}
__name(Sr, "Sr");
u();
l();
c();
p();
d();
function _n(e7, t) {
  if (e7.length === 0) return;
  let r = e7[0];
  for (let n = 1; n < e7.length; n++) t(r, e7[n]) < 0 && (r = e7[n]);
  return r;
}
__name(_n, "_n");
u();
l();
c();
p();
d();
function Vt(e7, t) {
  Object.defineProperty(e7, "name", { value: t, configurable: true });
}
__name(Vt, "Vt");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function at(e7) {
  return e7 instanceof Date || Object.prototype.toString.call(e7) === "[object Date]";
}
__name(at, "at");
function vr(e7) {
  return e7.toString() !== "Invalid Date";
}
__name(vr, "vr");
u();
l();
c();
p();
d();
function ut(e7) {
  return Decimal.isDecimal(e7) ? true : e7 !== null && typeof e7 == "object" && typeof e7.s == "number" && typeof e7.e == "number" && typeof e7.toFixed == "function" && Array.isArray(e7.d);
}
__name(ut, "ut");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var Ar = {};
kt(Ar, { ModelAction: /* @__PURE__ */ __name(() => Ut, "ModelAction"), datamodelEnumToSchemaEnum: /* @__PURE__ */ __name(() => Yl, "datamodelEnumToSchemaEnum") });
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Yl(e7) {
  return { name: e7.name, values: e7.values.map((t) => t.name) };
}
__name(Yl, "Yl");
u();
l();
c();
p();
d();
var Ut = ((F3) => (F3.findUnique = "findUnique", F3.findUniqueOrThrow = "findUniqueOrThrow", F3.findFirst = "findFirst", F3.findFirstOrThrow = "findFirstOrThrow", F3.findMany = "findMany", F3.create = "create", F3.createMany = "createMany", F3.createManyAndReturn = "createManyAndReturn", F3.update = "update", F3.updateMany = "updateMany", F3.updateManyAndReturn = "updateManyAndReturn", F3.upsert = "upsert", F3.delete = "delete", F3.deleteMany = "deleteMany", F3.groupBy = "groupBy", F3.count = "count", F3.aggregate = "aggregate", F3.findRaw = "findRaw", F3.aggregateRaw = "aggregateRaw", F3))(Ut || {});
var Xl = qe(_o());
var ec = { red: it, gray: So, dim: hr, bold: yr, underline: wr, highlightSource: /* @__PURE__ */ __name((e7) => e7.highlight(), "highlightSource") };
var tc = { red: /* @__PURE__ */ __name((e7) => e7, "red"), gray: /* @__PURE__ */ __name((e7) => e7, "gray"), dim: /* @__PURE__ */ __name((e7) => e7, "dim"), bold: /* @__PURE__ */ __name((e7) => e7, "bold"), underline: /* @__PURE__ */ __name((e7) => e7, "underline"), highlightSource: /* @__PURE__ */ __name((e7) => e7, "highlightSource") };
function rc({ message: e7, originalMethod: t, isPanic: r, callArguments: n }) {
  return { functionName: `prisma.${t}()`, message: e7, isPanic: r ?? false, callArguments: n };
}
__name(rc, "rc");
function nc({ functionName: e7, location: t, message: r, isPanic: n, contextLines: i, callArguments: o3 }, s) {
  let a3 = [""], m3 = t ? " in" : ":";
  if (n ? (a3.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a3.push(s.red(`It occurred in the ${s.bold(`\`${e7}\``)} invocation${m3}`))) : a3.push(s.red(`Invalid ${s.bold(`\`${e7}\``)} invocation${m3}`)), t && a3.push(s.underline(ic(t))), i) {
    a3.push("");
    let f3 = [i.toString()];
    o3 && (f3.push(o3), f3.push(s.dim(")"))), a3.push(f3.join("")), o3 && a3.push("");
  } else a3.push(""), o3 && a3.push(o3), a3.push("");
  return a3.push(r), a3.join(`
`);
}
__name(nc, "nc");
function ic(e7) {
  let t = [e7.fileName];
  return e7.lineNumber && t.push(String(e7.lineNumber)), e7.columnNumber && t.push(String(e7.columnNumber)), t.join(":");
}
__name(ic, "ic");
function Cr(e7) {
  let t = e7.showColors ? ec : tc, r;
  return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(e7, t) : r = rc(e7), nc(r, t);
}
__name(Cr, "Cr");
u();
l();
c();
p();
d();
var Wo = qe(Fn());
u();
l();
c();
p();
d();
function Qo(e7, t, r) {
  let n = Jo(e7), i = oc(n), o3 = ac(i);
  o3 ? Rr(o3, t, r) : t.addErrorMessage(() => "Unknown error");
}
__name(Qo, "Qo");
function Jo(e7) {
  return e7.errors.flatMap((t) => t.kind === "Union" ? Jo(t) : [t]);
}
__name(Jo, "Jo");
function oc(e7) {
  let t = /* @__PURE__ */ new Map(), r = [];
  for (let n of e7) {
    if (n.kind !== "InvalidArgumentType") {
      r.push(n);
      continue;
    }
    let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o3 = t.get(i);
    o3 ? t.set(i, { ...n, argument: { ...n.argument, typeNames: sc(o3.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
  }
  return r.push(...t.values()), r;
}
__name(oc, "oc");
function sc(e7, t) {
  return [...new Set(e7.concat(t))];
}
__name(sc, "sc");
function ac(e7) {
  return _n(e7, (t, r) => {
    let n = Bo(t), i = Bo(r);
    return n !== i ? n - i : jo(t) - jo(r);
  });
}
__name(ac, "ac");
function Bo(e7) {
  let t = 0;
  return Array.isArray(e7.selectionPath) && (t += e7.selectionPath.length), Array.isArray(e7.argumentPath) && (t += e7.argumentPath.length), t;
}
__name(Bo, "Bo");
function jo(e7) {
  switch (e7.kind) {
    case "InvalidArgumentValue":
    case "ValueTooLarge":
      return 20;
    case "InvalidArgumentType":
      return 10;
    case "RequiredArgumentMissing":
      return -10;
    default:
      return 0;
  }
}
__name(jo, "jo");
u();
l();
c();
p();
d();
var ae = class {
  static {
    __name(this, "ae");
  }
  constructor(t, r) {
    this.name = t;
    this.value = r;
  }
  isRequired = false;
  makeRequired() {
    return this.isRequired = true, this;
  }
  write(t) {
    let { colors: { green: r } } = t.context;
    t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
  }
};
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
Go();
u();
l();
c();
p();
d();
var lt = class {
  static {
    __name(this, "lt");
  }
  constructor(t = 0, r) {
    this.context = r;
    this.currentIndent = t;
  }
  lines = [];
  currentLine = "";
  currentIndent = 0;
  marginSymbol;
  afterNextNewLineCallback;
  write(t) {
    return typeof t == "string" ? this.currentLine += t : t.write(this), this;
  }
  writeJoined(t, r, n = (i, o3) => o3.write(i)) {
    let i = r.length - 1;
    for (let o3 = 0; o3 < r.length; o3++) n(r[o3], this), o3 !== i && this.write(t);
    return this;
  }
  writeLine(t) {
    return this.write(t).newLine();
  }
  newLine() {
    this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
    let t = this.afterNextNewLineCallback;
    return this.afterNextNewLineCallback = void 0, t?.(), this;
  }
  withIndent(t) {
    return this.indent(), t(this), this.unindent(), this;
  }
  afterNextNewline(t) {
    return this.afterNextNewLineCallback = t, this;
  }
  indent() {
    return this.currentIndent++, this;
  }
  unindent() {
    return this.currentIndent > 0 && this.currentIndent--, this;
  }
  addMarginSymbol(t) {
    return this.marginSymbol = t, this;
  }
  toString() {
    return this.lines.concat(this.indentedCurrentLine()).join(`
`);
  }
  getCurrentLineLength() {
    return this.currentLine.length;
  }
  indentedCurrentLine() {
    let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
    return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
  }
};
Ho();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var Ir = class {
  static {
    __name(this, "Ir");
  }
  constructor(t) {
    this.value = t;
  }
  write(t) {
    t.write(this.value);
  }
  markAsError() {
    this.value.markAsError();
  }
};
u();
l();
c();
p();
d();
var kr = /* @__PURE__ */ __name((e7) => e7, "kr");
var Or = { bold: kr, red: kr, green: kr, dim: kr, enabled: false };
var zo = { bold: yr, red: it, green: xo, dim: hr, enabled: true };
var ct = { write(e7) {
  e7.writeLine(",");
} };
u();
l();
c();
p();
d();
var xe = class {
  static {
    __name(this, "xe");
  }
  constructor(t) {
    this.contents = t;
  }
  isUnderlined = false;
  color = /* @__PURE__ */ __name((t) => t, "color");
  underline() {
    return this.isUnderlined = true, this;
  }
  setColor(t) {
    return this.color = t, this;
  }
  write(t) {
    let r = t.getCurrentLineLength();
    t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
      t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
    });
  }
};
u();
l();
c();
p();
d();
var Me = class {
  static {
    __name(this, "Me");
  }
  hasError = false;
  markAsError() {
    return this.hasError = true, this;
  }
};
var pt = class extends Me {
  static {
    __name(this, "pt");
  }
  items = [];
  addItem(t) {
    return this.items.push(new Ir(t)), this;
  }
  getField(t) {
    return this.items[t];
  }
  getPrintWidth() {
    return this.items.length === 0 ? 2 : Math.max(...this.items.map((r) => r.value.getPrintWidth())) + 2;
  }
  write(t) {
    if (this.items.length === 0) {
      this.writeEmpty(t);
      return;
    }
    this.writeWithItems(t);
  }
  writeEmpty(t) {
    let r = new xe("[]");
    this.hasError && r.setColor(t.context.colors.red).underline(), t.write(r);
  }
  writeWithItems(t) {
    let { colors: r } = t.context;
    t.writeLine("[").withIndent(() => t.writeJoined(ct, this.items).newLine()).write("]"), this.hasError && t.afterNextNewline(() => {
      t.writeLine(r.red("~".repeat(this.getPrintWidth())));
    });
  }
  asObject() {
  }
};
var dt = class e extends Me {
  static {
    __name(this, "e");
  }
  fields = {};
  suggestions = [];
  addField(t) {
    this.fields[t.name] = t;
  }
  addSuggestion(t) {
    this.suggestions.push(t);
  }
  getField(t) {
    return this.fields[t];
  }
  getDeepField(t) {
    let [r, ...n] = t, i = this.getField(r);
    if (!i) return;
    let o3 = i;
    for (let s of n) {
      let a3;
      if (o3.value instanceof e ? a3 = o3.value.getField(s) : o3.value instanceof pt && (a3 = o3.value.getField(Number(s))), !a3) return;
      o3 = a3;
    }
    return o3;
  }
  getDeepFieldValue(t) {
    return t.length === 0 ? this : this.getDeepField(t)?.value;
  }
  hasField(t) {
    return !!this.getField(t);
  }
  removeAllFields() {
    this.fields = {};
  }
  removeField(t) {
    delete this.fields[t];
  }
  getFields() {
    return this.fields;
  }
  isEmpty() {
    return Object.keys(this.fields).length === 0;
  }
  getFieldValue(t) {
    return this.getField(t)?.value;
  }
  getDeepSubSelectionValue(t) {
    let r = this;
    for (let n of t) {
      if (!(r instanceof e)) return;
      let i = r.getSubSelectionValue(n);
      if (!i) return;
      r = i;
    }
    return r;
  }
  getDeepSelectionParent(t) {
    let r = this.getSelectionParent();
    if (!r) return;
    let n = r;
    for (let i of t) {
      let o3 = n.value.getFieldValue(i);
      if (!o3 || !(o3 instanceof e)) return;
      let s = o3.getSelectionParent();
      if (!s) return;
      n = s;
    }
    return n;
  }
  getSelectionParent() {
    let t = this.getField("select")?.value.asObject();
    if (t) return { kind: "select", value: t };
    let r = this.getField("include")?.value.asObject();
    if (r) return { kind: "include", value: r };
  }
  getSubSelectionValue(t) {
    return this.getSelectionParent()?.value.fields[t].value;
  }
  getPrintWidth() {
    let t = Object.values(this.fields);
    return t.length == 0 ? 2 : Math.max(...t.map((n) => n.getPrintWidth())) + 2;
  }
  write(t) {
    let r = Object.values(this.fields);
    if (r.length === 0 && this.suggestions.length === 0) {
      this.writeEmpty(t);
      return;
    }
    this.writeWithContents(t, r);
  }
  asObject() {
    return this;
  }
  writeEmpty(t) {
    let r = new xe("{}");
    this.hasError && r.setColor(t.context.colors.red).underline(), t.write(r);
  }
  writeWithContents(t, r) {
    t.writeLine("{").withIndent(() => {
      t.writeJoined(ct, [...r, ...this.suggestions]).newLine();
    }), t.write("}"), this.hasError && t.afterNextNewline(() => {
      t.writeLine(t.context.colors.red("~".repeat(this.getPrintWidth())));
    });
  }
};
u();
l();
c();
p();
d();
var K = class extends Me {
  static {
    __name(this, "K");
  }
  constructor(r) {
    super();
    this.text = r;
  }
  getPrintWidth() {
    return this.text.length;
  }
  write(r) {
    let n = new xe(this.text);
    this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
  }
  asObject() {
  }
};
u();
l();
c();
p();
d();
var qt = class {
  static {
    __name(this, "qt");
  }
  fields = [];
  addField(t, r) {
    return this.fields.push({ write(n) {
      let { green: i, dim: o3 } = n.context.colors;
      n.write(i(o3(`${t}: ${r}`))).addMarginSymbol(i(o3("+")));
    } }), this;
  }
  write(t) {
    let { colors: { green: r } } = t.context;
    t.writeLine(r("{")).withIndent(() => {
      t.writeJoined(ct, this.fields).newLine();
    }).write(r("}")).addMarginSymbol(r("+"));
  }
};
function Rr(e7, t, r) {
  switch (e7.kind) {
    case "MutuallyExclusiveFields":
      uc(e7, t);
      break;
    case "IncludeOnScalar":
      lc(e7, t);
      break;
    case "EmptySelection":
      cc(e7, t, r);
      break;
    case "UnknownSelectionField":
      fc(e7, t);
      break;
    case "InvalidSelectionValue":
      gc(e7, t);
      break;
    case "UnknownArgument":
      yc(e7, t);
      break;
    case "UnknownInputField":
      hc(e7, t);
      break;
    case "RequiredArgumentMissing":
      wc(e7, t);
      break;
    case "InvalidArgumentType":
      bc(e7, t);
      break;
    case "InvalidArgumentValue":
      xc(e7, t);
      break;
    case "ValueTooLarge":
      Ec(e7, t);
      break;
    case "SomeFieldsMissing":
      Tc(e7, t);
      break;
    case "TooManyFieldsGiven":
      Pc(e7, t);
      break;
    case "Union":
      Qo(e7, t, r);
      break;
    default:
      throw new Error("not implemented: " + e7.kind);
  }
}
__name(Rr, "Rr");
function uc(e7, t) {
  let r = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  r && (r.getField(e7.firstField)?.markAsError(), r.getField(e7.secondField)?.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e7.firstField}\``)} or ${n.green(`\`${e7.secondField}\``)}, but ${n.red("not both")} at the same time.`);
}
__name(uc, "uc");
function lc(e7, t) {
  let [r, n] = mt(e7.selectionPath), i = e7.outputType, o3 = t.arguments.getDeepSelectionParent(r)?.value;
  if (o3 && (o3.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o3.addSuggestion(new ae(s.name, "true"));
  t.addErrorMessage((s) => {
    let a3 = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
    return i ? a3 += ` on model ${s.bold(i.name)}. ${Bt(s)}` : a3 += ".", a3 += `
Note that ${s.bold("include")} statements only accept relation fields.`, a3;
  });
}
__name(lc, "lc");
function cc(e7, t, r) {
  let n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  if (n) {
    let i = n.getField("omit")?.value.asObject();
    if (i) {
      pc(e7, t, i);
      return;
    }
    if (n.hasField("select")) {
      dc(e7, t);
      return;
    }
  }
  if (r?.[De(e7.outputType.name)]) {
    mc(e7, t);
    return;
  }
  t.addErrorMessage(() => `Unknown field at "${e7.selectionPath.join(".")} selection"`);
}
__name(cc, "cc");
function pc(e7, t, r) {
  r.removeAllFields();
  for (let n of e7.outputType.fields) r.addSuggestion(new ae(n.name, "false"));
  t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e7.outputType.name)}. At least one field must be included in the result`);
}
__name(pc, "pc");
function dc(e7, t) {
  let r = e7.outputType, n = t.arguments.getDeepSelectionParent(e7.selectionPath)?.value, i = n?.isEmpty() ?? false;
  n && (n.removeAllFields(), Yo(n, r)), t.addErrorMessage((o3) => i ? `The ${o3.red("`select`")} statement for type ${o3.bold(r.name)} must not be empty. ${Bt(o3)}` : `The ${o3.red("`select`")} statement for type ${o3.bold(r.name)} needs ${o3.bold("at least one truthy value")}.`);
}
__name(dc, "dc");
function mc(e7, t) {
  let r = new qt();
  for (let i of e7.outputType.fields) i.isRelation || r.addField(i.name, "false");
  let n = new ae("omit", r).makeRequired();
  if (e7.selectionPath.length === 0) t.arguments.addSuggestion(n);
  else {
    let [i, o3] = mt(e7.selectionPath), a3 = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o3);
    if (a3) {
      let m3 = a3?.value.asObject() ?? new dt();
      m3.addSuggestion(n), a3.value = m3;
    }
  }
  t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e7.outputType.name)}. At least one field must be included in the result`);
}
__name(mc, "mc");
function fc(e7, t) {
  let r = Xo(e7.selectionPath, t);
  if (r.parentKind !== "unknown") {
    r.field.markAsError();
    let n = r.parent;
    switch (r.parentKind) {
      case "select":
        Yo(n, e7.outputType);
        break;
      case "include":
        Sc(n, e7.outputType);
        break;
      case "omit":
        vc(n, e7.outputType);
        break;
    }
  }
  t.addErrorMessage((n) => {
    let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
    return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e7.outputType.name}\``)}.`), i.push(Bt(n)), i.join(" ");
  });
}
__name(fc, "fc");
function gc(e7, t) {
  let r = Xo(e7.selectionPath, t);
  r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e7.underlyingError}`);
}
__name(gc, "gc");
function yc(e7, t) {
  let r = e7.argumentPath[0], n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  n && (n.getField(r)?.markAsError(), Ac(n, e7.arguments)), t.addErrorMessage((i) => Ko(i, r, e7.arguments.map((o3) => o3.name)));
}
__name(yc, "yc");
function hc(e7, t) {
  let [r, n] = mt(e7.argumentPath), i = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  if (i) {
    i.getDeepField(e7.argumentPath)?.markAsError();
    let o3 = i.getDeepFieldValue(r)?.asObject();
    o3 && es(o3, e7.inputType);
  }
  t.addErrorMessage((o3) => Ko(o3, n, e7.inputType.fields.map((s) => s.name)));
}
__name(hc, "hc");
function Ko(e7, t, r) {
  let n = [`Unknown argument \`${e7.red(t)}\`.`], i = Rc(t, r);
  return i && n.push(`Did you mean \`${e7.green(i)}\`?`), r.length > 0 && n.push(Bt(e7)), n.join(" ");
}
__name(Ko, "Ko");
function wc(e7, t) {
  let r;
  t.addErrorMessage((m3) => r?.value instanceof K && r.value.text === "null" ? `Argument \`${m3.green(o3)}\` must not be ${m3.red("null")}.` : `Argument \`${m3.green(o3)}\` is missing.`);
  let n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  if (!n) return;
  let [i, o3] = mt(e7.argumentPath), s = new qt(), a3 = n.getDeepFieldValue(i)?.asObject();
  if (a3) {
    if (r = a3.getField(o3), r && a3.removeField(o3), e7.inputTypes.length === 1 && e7.inputTypes[0].kind === "object") {
      for (let m3 of e7.inputTypes[0].fields) s.addField(m3.name, m3.typeNames.join(" | "));
      a3.addSuggestion(new ae(o3, s).makeRequired());
    } else {
      let m3 = e7.inputTypes.map(Zo).join(" | ");
      a3.addSuggestion(new ae(o3, m3).makeRequired());
    }
    if (e7.dependentArgumentPath) {
      n.getDeepField(e7.dependentArgumentPath)?.markAsError();
      let [, m3] = mt(e7.dependentArgumentPath);
      t.addErrorMessage((f3) => `Argument \`${f3.green(o3)}\` is required because argument \`${f3.green(m3)}\` was provided.`);
    }
  }
}
__name(wc, "wc");
function Zo(e7) {
  return e7.kind === "list" ? `${Zo(e7.elementType)}[]` : e7.name;
}
__name(Zo, "Zo");
function bc(e7, t) {
  let r = e7.argument.name, n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  n && n.getDeepFieldValue(e7.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
    let o3 = Nr("or", e7.argument.typeNames.map((s) => i.green(s)));
    return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o3}, provided ${i.red(e7.inferredType)}.`;
  });
}
__name(bc, "bc");
function xc(e7, t) {
  let r = e7.argument.name, n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  n && n.getDeepFieldValue(e7.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
    let o3 = [`Invalid value for argument \`${i.bold(r)}\``];
    if (e7.underlyingError && o3.push(`: ${e7.underlyingError}`), o3.push("."), e7.argument.typeNames.length > 0) {
      let s = Nr("or", e7.argument.typeNames.map((a3) => i.green(a3)));
      o3.push(` Expected ${s}.`);
    }
    return o3.join("");
  });
}
__name(xc, "xc");
function Ec(e7, t) {
  let r = e7.argument.name, n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject(), i;
  if (n) {
    let s = n.getDeepField(e7.argumentPath)?.value;
    s?.markAsError(), s instanceof K && (i = s.text);
  }
  t.addErrorMessage((o3) => {
    let s = ["Unable to fit value"];
    return i && s.push(o3.red(i)), s.push(`into a 64-bit signed integer for field \`${o3.bold(r)}\``), s.join(" ");
  });
}
__name(Ec, "Ec");
function Tc(e7, t) {
  let r = e7.argumentPath[e7.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject();
  if (n) {
    let i = n.getDeepFieldValue(e7.argumentPath)?.asObject();
    i && es(i, e7.inputType);
  }
  t.addErrorMessage((i) => {
    let o3 = [`Argument \`${i.bold(r)}\` of type ${i.bold(e7.inputType.name)} needs`];
    return e7.constraints.minFieldCount === 1 ? e7.constraints.requiredFields ? o3.push(`${i.green("at least one of")} ${Nr("or", e7.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o3.push(`${i.green("at least one")} argument.`) : o3.push(`${i.green(`at least ${e7.constraints.minFieldCount}`)} arguments.`), o3.push(Bt(i)), o3.join(" ");
  });
}
__name(Tc, "Tc");
function Pc(e7, t) {
  let r = e7.argumentPath[e7.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e7.selectionPath)?.asObject(), i = [];
  if (n) {
    let o3 = n.getDeepFieldValue(e7.argumentPath)?.asObject();
    o3 && (o3.markAsError(), i = Object.keys(o3.getFields()));
  }
  t.addErrorMessage((o3) => {
    let s = [`Argument \`${o3.bold(r)}\` of type ${o3.bold(e7.inputType.name)} needs`];
    return e7.constraints.minFieldCount === 1 && e7.constraints.maxFieldCount == 1 ? s.push(`${o3.green("exactly one")} argument,`) : e7.constraints.maxFieldCount == 1 ? s.push(`${o3.green("at most one")} argument,`) : s.push(`${o3.green(`at most ${e7.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Nr("and", i.map((a3) => o3.red(a3)))}. Please choose`), e7.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e7.constraints.maxFieldCount}.`), s.join(" ");
  });
}
__name(Pc, "Pc");
function Yo(e7, t) {
  for (let r of t.fields) e7.hasField(r.name) || e7.addSuggestion(new ae(r.name, "true"));
}
__name(Yo, "Yo");
function Sc(e7, t) {
  for (let r of t.fields) r.isRelation && !e7.hasField(r.name) && e7.addSuggestion(new ae(r.name, "true"));
}
__name(Sc, "Sc");
function vc(e7, t) {
  for (let r of t.fields) !e7.hasField(r.name) && !r.isRelation && e7.addSuggestion(new ae(r.name, "true"));
}
__name(vc, "vc");
function Ac(e7, t) {
  for (let r of t) e7.hasField(r.name) || e7.addSuggestion(new ae(r.name, r.typeNames.join(" | ")));
}
__name(Ac, "Ac");
function Xo(e7, t) {
  let [r, n] = mt(e7), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
  if (!i) return { parentKind: "unknown", fieldName: n };
  let o3 = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a3 = i.getFieldValue("omit")?.asObject(), m3 = o3?.getField(n);
  return o3 && m3 ? { parentKind: "select", parent: o3, field: m3, fieldName: n } : (m3 = s?.getField(n), s && m3 ? { parentKind: "include", field: m3, parent: s, fieldName: n } : (m3 = a3?.getField(n), a3 && m3 ? { parentKind: "omit", field: m3, parent: a3, fieldName: n } : { parentKind: "unknown", fieldName: n }));
}
__name(Xo, "Xo");
function es(e7, t) {
  if (t.kind === "object") for (let r of t.fields) e7.hasField(r.name) || e7.addSuggestion(new ae(r.name, r.typeNames.join(" | ")));
}
__name(es, "es");
function mt(e7) {
  let t = [...e7], r = t.pop();
  if (!r) throw new Error("unexpected empty path");
  return [t, r];
}
__name(mt, "mt");
function Bt({ green: e7, enabled: t }) {
  return "Available options are " + (t ? `listed in ${e7("green")}` : "marked with ?") + ".";
}
__name(Bt, "Bt");
function Nr(e7, t) {
  if (t.length === 1) return t[0];
  let r = [...t], n = r.pop();
  return `${r.join(", ")} ${e7} ${n}`;
}
__name(Nr, "Nr");
var Cc = 3;
function Rc(e7, t) {
  let r = 1 / 0, n;
  for (let i of t) {
    let o3 = (0, Wo.default)(e7, i);
    o3 > Cc || o3 < r && (r = o3, n = i);
  }
  return n;
}
__name(Rc, "Rc");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var jt = class {
  static {
    __name(this, "jt");
  }
  modelName;
  name;
  typeName;
  isList;
  isEnum;
  constructor(t, r, n, i, o3) {
    this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o3;
  }
  _toGraphQLInputType() {
    let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
    return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
  }
};
function ft(e7) {
  return e7 instanceof jt;
}
__name(ft, "ft");
u();
l();
c();
p();
d();
var ts = ": ";
var Dr = class {
  static {
    __name(this, "Dr");
  }
  constructor(t, r) {
    this.name = t;
    this.value = r;
  }
  hasError = false;
  markAsError() {
    this.hasError = true;
  }
  getPrintWidth() {
    return this.name.length + this.value.getPrintWidth() + ts.length;
  }
  write(t) {
    let r = new xe(this.name);
    this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(ts).write(this.value);
  }
};
var Vn = class {
  static {
    __name(this, "Vn");
  }
  arguments;
  errorMessages = [];
  constructor(t) {
    this.arguments = t;
  }
  write(t) {
    t.write(this.arguments);
  }
  addErrorMessage(t) {
    this.errorMessages.push(t);
  }
  renderAllMessages(t) {
    return this.errorMessages.map((r) => r(t)).join(`
`);
  }
};
function gt(e7) {
  return new Vn(rs(e7));
}
__name(gt, "gt");
function rs(e7) {
  let t = new dt();
  for (let [r, n] of Object.entries(e7)) {
    let i = new Dr(r, ns(n));
    t.addField(i);
  }
  return t;
}
__name(rs, "rs");
function ns(e7) {
  if (typeof e7 == "string") return new K(JSON.stringify(e7));
  if (typeof e7 == "number" || typeof e7 == "boolean") return new K(String(e7));
  if (typeof e7 == "bigint") return new K(`${e7}n`);
  if (e7 === null) return new K("null");
  if (e7 === void 0) return new K("undefined");
  if (ut(e7)) return new K(`new Prisma.Decimal("${e7.toFixed()}")`);
  if (e7 instanceof Uint8Array) return g.isBuffer(e7) ? new K(`Buffer.alloc(${e7.byteLength})`) : new K(`new Uint8Array(${e7.byteLength})`);
  if (e7 instanceof Date) {
    let t = vr(e7) ? e7.toISOString() : "Invalid Date";
    return new K(`new Date("${t}")`);
  }
  return isObjectEnumValue(e7) ? new K(`Prisma.${e7._getName()}`) : ft(e7) ? new K(`prisma.${De(e7.modelName)}.$fields.${e7.name}`) : Array.isArray(e7) ? kc(e7) : typeof e7 == "object" ? rs(e7) : new K(Object.prototype.toString.call(e7));
}
__name(ns, "ns");
function kc(e7) {
  let t = new pt();
  for (let r of e7) t.addItem(ns(r));
  return t;
}
__name(kc, "kc");
function Mr(e7, t) {
  let r = t === "pretty" ? zo : Or, n = e7.renderAllMessages(r), i = new lt(0, { colors: r }).write(e7).toString();
  return { message: n, args: i };
}
__name(Mr, "Mr");
function Lr({ args: e7, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o3, globalOmit: s }) {
  let a3 = gt(e7);
  for (let S3 of t) Rr(S3, a3, s);
  let { message: m3, args: f3 } = Mr(a3, r), T3 = Cr({ message: m3, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: f3 });
  throw new PrismaClientValidationError(T3, { clientVersion: o3 });
}
__name(Lr, "Lr");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Ee(e7) {
  return e7.replace(/^./, (t) => t.toLowerCase());
}
__name(Ee, "Ee");
u();
l();
c();
p();
d();
function os(e7, t, r) {
  let n = Ee(r);
  return !t.result || !(t.result.$allModels || t.result[n]) ? e7 : Nc({ ...e7, ...is(t.name, e7, t.result.$allModels), ...is(t.name, e7, t.result[n]) });
}
__name(os, "os");
function Nc(e7) {
  let t = new be(), r = /* @__PURE__ */ __name((n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e7[n] ? e7[n].needs.flatMap((o3) => r(o3, i)) : [n])), "r");
  return Sr(e7, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
}
__name(Nc, "Nc");
function is(e7, t, r) {
  return r ? Sr(r, ({ needs: n, compute: i }, o3) => ({ name: o3, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: Dc(t, o3, i) })) : {};
}
__name(is, "is");
function Dc(e7, t, r) {
  let n = e7?.[t]?.compute;
  return n ? (i) => r({ ...i, [t]: n(i) }) : r;
}
__name(Dc, "Dc");
function ss(e7, t) {
  if (!t) return e7;
  let r = { ...e7 };
  for (let n of Object.values(t)) if (e7[n.name]) for (let i of n.needs) r[i] = true;
  return r;
}
__name(ss, "ss");
function as(e7, t) {
  if (!t) return e7;
  let r = { ...e7 };
  for (let n of Object.values(t)) if (!e7[n.name]) for (let i of n.needs) delete r[i];
  return r;
}
__name(as, "as");
var _r = class {
  static {
    __name(this, "_r");
  }
  constructor(t, r) {
    this.extension = t;
    this.previous = r;
  }
  computedFieldsCache = new be();
  modelExtensionsCache = new be();
  queryCallbacksCache = new be();
  clientExtensions = Nt(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
  batchCallbacks = Nt(() => {
    let t = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
    return r ? t.concat(r) : t;
  });
  getAllComputedFields(t) {
    return this.computedFieldsCache.getOrCreate(t, () => os(this.previous?.getAllComputedFields(t), this.extension, t));
  }
  getAllClientExtensions() {
    return this.clientExtensions.get();
  }
  getAllModelExtensions(t) {
    return this.modelExtensionsCache.getOrCreate(t, () => {
      let r = Ee(t);
      return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(t) : { ...this.previous?.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
    });
  }
  getAllQueryCallbacks(t, r) {
    return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
      let n = this.previous?.getAllQueryCallbacks(t, r) ?? [], i = [], o3 = this.extension.query;
      return !o3 || !(o3[t] || o3.$allModels || o3[r] || o3.$allOperations) ? n : (o3[t] !== void 0 && (o3[t][r] !== void 0 && i.push(o3[t][r]), o3[t].$allOperations !== void 0 && i.push(o3[t].$allOperations)), t !== "$none" && o3.$allModels !== void 0 && (o3.$allModels[r] !== void 0 && i.push(o3.$allModels[r]), o3.$allModels.$allOperations !== void 0 && i.push(o3.$allModels.$allOperations)), o3[r] !== void 0 && i.push(o3[r]), o3.$allOperations !== void 0 && i.push(o3.$allOperations), n.concat(i));
    });
  }
  getAllBatchQueryCallbacks() {
    return this.batchCallbacks.get();
  }
};
var yt = class e2 {
  static {
    __name(this, "e");
  }
  constructor(t) {
    this.head = t;
  }
  static empty() {
    return new e2();
  }
  static single(t) {
    return new e2(new _r(t));
  }
  isEmpty() {
    return this.head === void 0;
  }
  append(t) {
    return new e2(new _r(t, this.head));
  }
  getAllComputedFields(t) {
    return this.head?.getAllComputedFields(t);
  }
  getAllClientExtensions() {
    return this.head?.getAllClientExtensions();
  }
  getAllModelExtensions(t) {
    return this.head?.getAllModelExtensions(t);
  }
  getAllQueryCallbacks(t, r) {
    return this.head?.getAllQueryCallbacks(t, r) ?? [];
  }
  getAllBatchQueryCallbacks() {
    return this.head?.getAllBatchQueryCallbacks() ?? [];
  }
};
u();
l();
c();
p();
d();
var Fr = class {
  static {
    __name(this, "Fr");
  }
  constructor(t) {
    this.name = t;
  }
};
function us(e7) {
  return e7 instanceof Fr;
}
__name(us, "us");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var ls = /* @__PURE__ */ Symbol();
var Qt = class {
  static {
    __name(this, "Qt");
  }
  constructor(t) {
    if (t !== ls) throw new Error("Skip instance can not be constructed directly");
  }
  ifUndefined(t) {
    return t === void 0 ? Un : t;
  }
};
var Un = new Qt(ls);
function le(e7) {
  return e7 instanceof Qt;
}
__name(le, "le");
var _c = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
var cs = "explicitly `undefined` values are not allowed";
function Bn({ modelName: e7, action: t, args: r, runtimeDataModel: n, extensions: i = yt.empty(), callsite: o3, clientMethod: s, errorFormat: a3, clientVersion: m3, previewFeatures: f3, globalOmit: T3, wrapRawValues: S3 }) {
  let v3 = new qn({ runtimeDataModel: n, modelName: e7, action: t, rootArgs: r, callsite: o3, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a3, clientVersion: m3, previewFeatures: f3, globalOmit: T3, wrapRawValues: S3 });
  return { modelName: e7, action: _c[t], query: Jt(r, v3) };
}
__name(Bn, "Bn");
function Jt({ select: e7, include: t, ...r } = {}, n) {
  let i = r.omit;
  return delete r.omit, { arguments: ds(r, n), selection: Fc(e7, t, i, n) };
}
__name(Jt, "Jt");
function Fc(e7, t, r, n) {
  return e7 ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), qc(e7, n)) : $c(n, t, r);
}
__name(Fc, "Fc");
function $c(e7, t, r) {
  let n = {};
  return e7.modelOrType && !e7.isRawAction() && (n.$composites = true, n.$scalars = true), t && Vc(n, t, e7), Uc(n, r, e7), n;
}
__name($c, "$c");
function Vc(e7, t, r) {
  for (let [n, i] of Object.entries(t)) {
    if (le(i)) continue;
    let o3 = r.nestSelection(n);
    if (jn(i, o3), i === false || i === void 0) {
      e7[n] = false;
      continue;
    }
    let s = r.findField(n);
    if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
      e7[n] = Jt(i === true ? {} : i, o3);
      continue;
    }
    if (i === true) {
      e7[n] = true;
      continue;
    }
    e7[n] = Jt(i, o3);
  }
}
__name(Vc, "Vc");
function Uc(e7, t, r) {
  let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o3 = as(i, n);
  for (let [s, a3] of Object.entries(o3)) {
    if (le(a3)) continue;
    jn(a3, r.nestSelection(s));
    let m3 = r.findField(s);
    n?.[s] && !m3 || (e7[s] = !a3);
  }
}
__name(Uc, "Uc");
function qc(e7, t) {
  let r = {}, n = t.getComputedFields(), i = ss(e7, n);
  for (let [o3, s] of Object.entries(i)) {
    if (le(s)) continue;
    let a3 = t.nestSelection(o3);
    jn(s, a3);
    let m3 = t.findField(o3);
    if (!(n?.[o3] && !m3)) {
      if (s === false || s === void 0 || le(s)) {
        r[o3] = false;
        continue;
      }
      if (s === true) {
        m3?.kind === "object" ? r[o3] = Jt({}, a3) : r[o3] = true;
        continue;
      }
      r[o3] = Jt(s, a3);
    }
  }
  return r;
}
__name(qc, "qc");
function ps(e7, t) {
  if (e7 === null) return null;
  if (typeof e7 == "string" || typeof e7 == "number" || typeof e7 == "boolean") return e7;
  if (typeof e7 == "bigint") return { $type: "BigInt", value: String(e7) };
  if (at(e7)) {
    if (vr(e7)) return { $type: "DateTime", value: e7.toISOString() };
    t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
  }
  if (us(e7)) return { $type: "Param", value: e7.name };
  if (ft(e7)) return { $type: "FieldRef", value: { _ref: e7.name, _container: e7.modelName } };
  if (Array.isArray(e7)) return Bc(e7, t);
  if (ArrayBuffer.isView(e7)) {
    let { buffer: r, byteOffset: n, byteLength: i } = e7;
    return { $type: "Bytes", value: g.from(r, n, i).toString("base64") };
  }
  if (jc(e7)) return e7.values;
  if (ut(e7)) return { $type: "Decimal", value: e7.toFixed() };
  if (isObjectEnumValue(e7)) {
    let r = e7._getName();
    if (r !== "DbNull" && r !== "JsonNull" && r !== "AnyNull") throw new Error(`Invalid ObjectEnumValue: expected DbNull, JsonNull, or AnyNull, got ${r}`);
    return { $type: "Enum", value: r };
  }
  if (Qc(e7)) return e7.toJSON();
  if (typeof e7 == "object") return ds(e7, t);
  t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e7)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
}
__name(ps, "ps");
function ds(e7, t) {
  if (t.shouldWrapRawValues() && e7.$type) return { $type: "Raw", value: e7 };
  let r = {};
  for (let n in e7) {
    let i = e7[n], o3 = t.nestArgument(n);
    le(i) || (i !== void 0 ? r[n] = ps(i, o3) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o3.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: cs }));
  }
  return r;
}
__name(ds, "ds");
function Bc(e7, t) {
  let r = [];
  for (let n = 0; n < e7.length; n++) {
    let i = t.nestArgument(String(n)), o3 = e7[n];
    if (o3 === void 0 || le(o3)) {
      let s = o3 === void 0 ? "undefined" : "Prisma.skip";
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
    }
    r.push(ps(o3, i));
  }
  return r;
}
__name(Bc, "Bc");
function jc(e7) {
  return typeof e7 == "object" && e7 !== null && e7.__prismaRawParameters__ === true;
}
__name(jc, "jc");
function Qc(e7) {
  return typeof e7 == "object" && e7 !== null && typeof e7.toJSON == "function";
}
__name(Qc, "Qc");
function jn(e7, t) {
  e7 === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: cs });
}
__name(jn, "jn");
var qn = class e3 {
  static {
    __name(this, "e");
  }
  constructor(t) {
    this.params = t;
    this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
  }
  modelOrType;
  throwValidationError(t) {
    Lr({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
  }
  getSelectionPath() {
    return this.params.selectionPath;
  }
  getArgumentPath() {
    return this.params.argumentPath;
  }
  getArgumentName() {
    return this.params.argumentPath[this.params.argumentPath.length - 1];
  }
  getOutputTypeDescription() {
    if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
  }
  isRawAction() {
    return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
  }
  isPreviewFeatureOn(t) {
    return this.params.previewFeatures.includes(t);
  }
  shouldWrapRawValues() {
    return this.params.wrapRawValues ?? true;
  }
  getComputedFields() {
    if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
  }
  findField(t) {
    return this.modelOrType?.fields.find((r) => r.name === t);
  }
  nestSelection(t) {
    let r = this.findField(t), n = r?.kind === "object" ? r.type : void 0;
    return new e3({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
  }
  getGlobalOmit() {
    return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[De(this.params.modelName)] ?? {} : {};
  }
  shouldApplyGlobalOmit() {
    switch (this.params.action) {
      case "findFirst":
      case "findFirstOrThrow":
      case "findUniqueOrThrow":
      case "findMany":
      case "upsert":
      case "findUnique":
      case "createManyAndReturn":
      case "create":
      case "update":
      case "updateManyAndReturn":
      case "delete":
        return true;
      case "executeRaw":
      case "aggregateRaw":
      case "runCommandRaw":
      case "findRaw":
      case "createMany":
      case "deleteMany":
      case "groupBy":
      case "updateMany":
      case "count":
      case "aggregate":
      case "queryRaw":
        return false;
      default:
        Re(this.params.action, "Unknown action");
    }
  }
  nestArgument(t) {
    return new e3({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
  }
};
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var Jn = /* @__PURE__ */ new WeakMap();
var $r = "$$PrismaTypedSql";
var Ht = class {
  static {
    __name(this, "Ht");
  }
  constructor(t, r) {
    Jn.set(this, { sql: t, values: r }), Object.defineProperty(this, $r, { value: $r });
  }
  get sql() {
    return Jn.get(this).sql;
  }
  get values() {
    return Jn.get(this).values;
  }
};
function Vr(e7) {
  return e7 != null && e7[$r] === $r;
}
__name(Vr, "Vr");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
ms();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Gt(e7) {
  return { getKeys() {
    return Object.keys(e7);
  }, getPropertyValue(t) {
    return e7[t];
  } };
}
__name(Gt, "Gt");
u();
l();
c();
p();
d();
function te(e7, t) {
  return { getKeys() {
    return [e7];
  }, getPropertyValue() {
    return t();
  } };
}
__name(te, "te");
u();
l();
c();
p();
d();
function He(e7) {
  let t = new be();
  return { getKeys() {
    return e7.getKeys();
  }, getPropertyValue(r) {
    return t.getOrCreate(r, () => e7.getPropertyValue(r));
  }, getPropertyDescriptor(r) {
    return e7.getPropertyDescriptor?.(r);
  } };
}
__name(He, "He");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var qr = { enumerable: true, configurable: true, writable: true };
function Br(e7) {
  let t = new Set(e7);
  return { getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf"), getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => qr, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => t.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => t.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...t], "ownKeys") };
}
__name(Br, "Br");
var fs = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
function me(e7, t) {
  let r = zc(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e7, { get(o3, s) {
    if (n.has(s)) return o3[s];
    let a3 = r.get(s);
    return a3 ? a3.getPropertyValue(s) : o3[s];
  }, has(o3, s) {
    if (n.has(s)) return true;
    let a3 = r.get(s);
    return a3 ? a3.has?.(s) ?? true : Reflect.has(o3, s);
  }, ownKeys(o3) {
    let s = gs(Reflect.ownKeys(o3), r), a3 = gs(Array.from(r.keys()), r);
    return [.../* @__PURE__ */ new Set([...s, ...a3, ...n])];
  }, set(o3, s, a3) {
    return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o3, s, a3));
  }, getOwnPropertyDescriptor(o3, s) {
    let a3 = Reflect.getOwnPropertyDescriptor(o3, s);
    if (a3 && !a3.configurable) return a3;
    let m3 = r.get(s);
    return m3 ? m3.getPropertyDescriptor ? { ...qr, ...m3?.getPropertyDescriptor(s) } : qr : a3;
  }, defineProperty(o3, s, a3) {
    return n.add(s), Reflect.defineProperty(o3, s, a3);
  }, getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf") });
  return i[fs] = function() {
    let o3 = { ...this };
    return delete o3[fs], o3;
  }, i;
}
__name(me, "me");
function zc(e7) {
  let t = /* @__PURE__ */ new Map();
  for (let r of e7) {
    let n = r.getKeys();
    for (let i of n) t.set(i, r);
  }
  return t;
}
__name(zc, "zc");
function gs(e7, t) {
  return e7.filter((r) => t.get(r)?.has?.(r) ?? true);
}
__name(gs, "gs");
u();
l();
c();
p();
d();
function ht(e7) {
  return { getKeys() {
    return e7;
  }, has() {
    return false;
  }, getPropertyValue() {
  } };
}
__name(ht, "ht");
u();
l();
c();
p();
d();
function ys(e7) {
  if (e7 === void 0) return "";
  let t = gt(e7);
  return new lt(0, { colors: Or }).write(t).toString();
}
__name(ys, "ys");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var Hn = class {
  static {
    __name(this, "Hn");
  }
  getLocation() {
    return null;
  }
};
function Le(e7) {
  return typeof $EnabledCallSite == "function" && e7 !== "minimal" ? new $EnabledCallSite() : new Hn();
}
__name(Le, "Le");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var hs = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
function wt(e7 = {}) {
  let t = Kc(e7);
  return Object.entries(t).reduce((n, [i, o3]) => (hs[i] !== void 0 ? n.select[i] = { select: o3 } : n[i] = o3, n), { select: {} });
}
__name(wt, "wt");
function Kc(e7 = {}) {
  return typeof e7._count == "boolean" ? { ...e7, _count: { _all: e7._count } } : e7;
}
__name(Kc, "Kc");
function jr(e7 = {}) {
  return (t) => (typeof e7._count == "boolean" && (t._count = t._count._all), t);
}
__name(jr, "jr");
function ws(e7, t) {
  let r = jr(e7);
  return t({ action: "aggregate", unpacker: r, argsMapper: wt })(e7);
}
__name(ws, "ws");
u();
l();
c();
p();
d();
function Zc(e7 = {}) {
  let { select: t, ...r } = e7;
  return typeof t == "object" ? wt({ ...r, _count: t }) : wt({ ...r, _count: { _all: true } });
}
__name(Zc, "Zc");
function Yc(e7 = {}) {
  return typeof e7.select == "object" ? (t) => jr(e7)(t)._count : (t) => jr(e7)(t)._count._all;
}
__name(Yc, "Yc");
function bs(e7, t) {
  return t({ action: "count", unpacker: Yc(e7), argsMapper: Zc })(e7);
}
__name(bs, "bs");
u();
l();
c();
p();
d();
function Xc(e7 = {}) {
  let t = wt(e7);
  if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
  else typeof t.by == "string" && (t.select[t.by] = true);
  return t;
}
__name(Xc, "Xc");
function ep(e7 = {}) {
  return (t) => (typeof e7?._count == "boolean" && t.forEach((r) => {
    r._count = r._count._all;
  }), t);
}
__name(ep, "ep");
function xs(e7, t) {
  return t({ action: "groupBy", unpacker: ep(e7), argsMapper: Xc })(e7);
}
__name(xs, "xs");
function Es(e7, t, r) {
  if (t === "aggregate") return (n) => ws(n, r);
  if (t === "count") return (n) => bs(n, r);
  if (t === "groupBy") return (n) => xs(n, r);
}
__name(Es, "Es");
u();
l();
c();
p();
d();
function Ts(e7, t) {
  let r = t.fields.filter((i) => !i.relationName), n = go(r, "name");
  return new Proxy({}, { get(i, o3) {
    if (o3 in i || typeof o3 == "symbol") return i[o3];
    let s = n[o3];
    if (s) return new jt(e7, o3, s.type, s.isList, s.kind === "enum");
  }, ...Br(Object.keys(n)) });
}
__name(Ts, "Ts");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var Ps = /* @__PURE__ */ __name((e7) => Array.isArray(e7) ? e7 : e7.split("."), "Ps");
var Gn = /* @__PURE__ */ __name((e7, t) => Ps(t).reduce((r, n) => r && r[n], e7), "Gn");
var Ss = /* @__PURE__ */ __name((e7, t, r) => Ps(t).reduceRight((n, i, o3, s) => Object.assign({}, Gn(e7, s.slice(0, o3)), { [i]: n }), r), "Ss");
function tp(e7, t) {
  return e7 === void 0 || t === void 0 ? [] : [...t, "select", e7];
}
__name(tp, "tp");
function rp(e7, t, r) {
  return t === void 0 ? e7 ?? {} : Ss(t, r, e7 || true);
}
__name(rp, "rp");
function zn(e7, t, r, n, i, o3) {
  let a3 = e7._runtimeDataModel.models[t].fields.reduce((m3, f3) => ({ ...m3, [f3.name]: f3 }), {});
  return (m3) => {
    let f3 = Le(e7._errorFormat), T3 = tp(n, i), S3 = rp(m3, o3, T3), v3 = r({ dataPath: T3, callsite: f3 })(S3), A3 = np(e7, t);
    return new Proxy(v3, { get(N3, R3) {
      if (!A3.includes(R3)) return N3[R3];
      let Q3 = [a3[R3].type, r, R3], B3 = [T3, S3];
      return zn(e7, ...Q3, ...B3);
    }, ...Br([...A3, ...Object.getOwnPropertyNames(v3)]) });
  };
}
__name(zn, "zn");
function np(e7, t) {
  return e7._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
}
__name(np, "np");
var ip = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
var op = ["aggregate", "count", "groupBy"];
function Wn(e7, t) {
  let r = e7._extensions.getAllModelExtensions(t) ?? {}, n = [sp(e7, t), up(e7, t), Gt(r), te("name", () => t), te("$name", () => t), te("$parent", () => e7._appliedParent)];
  return me({}, n);
}
__name(Wn, "Wn");
function sp(e7, t) {
  let r = Ee(t), n = Object.keys(Ut).concat("count");
  return { getKeys() {
    return n;
  }, getPropertyValue(i) {
    let o3 = i, s = /* @__PURE__ */ __name((a3) => (m3) => {
      let f3 = Le(e7._errorFormat);
      return e7._createPrismaPromise((T3) => {
        let S3 = { args: m3, dataPath: [], action: o3, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: T3, callsite: f3 };
        return e7._request({ ...S3, ...a3 });
      }, { action: o3, args: m3, model: t });
    }, "s");
    return ip.includes(o3) ? zn(e7, t, s) : ap(i) ? Es(e7, i, s) : s({});
  } };
}
__name(sp, "sp");
function ap(e7) {
  return op.includes(e7);
}
__name(ap, "ap");
function up(e7, t) {
  return He(te("fields", () => {
    let r = e7._runtimeDataModel.models[t];
    return Ts(t, r);
  }));
}
__name(up, "up");
u();
l();
c();
p();
d();
function vs(e7) {
  return e7.replace(/^./, (t) => t.toUpperCase());
}
__name(vs, "vs");
var Kn = /* @__PURE__ */ Symbol();
function zt(e7) {
  let t = [lp(e7), cp(e7), te(Kn, () => e7), te("$parent", () => e7._appliedParent)], r = e7._extensions.getAllClientExtensions();
  return r && t.push(Gt(r)), me(e7, t);
}
__name(zt, "zt");
function lp(e7) {
  let t = Object.getPrototypeOf(e7._originalClient), r = [...new Set(Object.getOwnPropertyNames(t))];
  return { getKeys() {
    return r;
  }, getPropertyValue(n) {
    return e7[n];
  } };
}
__name(lp, "lp");
function cp(e7) {
  let t = Object.keys(e7._runtimeDataModel.models), r = t.map(Ee), n = [...new Set(t.concat(r))];
  return He({ getKeys() {
    return n;
  }, getPropertyValue(i) {
    let o3 = vs(i);
    if (e7._runtimeDataModel.models[o3] !== void 0) return Wn(e7, o3);
    if (e7._runtimeDataModel.models[i] !== void 0) return Wn(e7, i);
  }, getPropertyDescriptor(i) {
    if (!r.includes(i)) return { enumerable: false };
  } });
}
__name(cp, "cp");
function As(e7) {
  return e7[Kn] ? e7[Kn] : e7;
}
__name(As, "As");
function Cs(e7) {
  if (typeof e7 == "function") return e7(this);
  let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e7) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } });
  return zt(t);
}
__name(Cs, "Cs");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Rs({ result: e7, modelName: t, select: r, omit: n, extensions: i }) {
  let o3 = i.getAllComputedFields(t);
  if (!o3) return e7;
  let s = [], a3 = [];
  for (let m3 of Object.values(o3)) {
    if (n) {
      if (n[m3.name]) continue;
      let f3 = m3.needs.filter((T3) => n[T3]);
      f3.length > 0 && a3.push(ht(f3));
    } else if (r) {
      if (!r[m3.name]) continue;
      let f3 = m3.needs.filter((T3) => !r[T3]);
      f3.length > 0 && a3.push(ht(f3));
    }
    pp(e7, m3.needs) && s.push(dp(m3, me(e7, s)));
  }
  return s.length > 0 || a3.length > 0 ? me(e7, [...s, ...a3]) : e7;
}
__name(Rs, "Rs");
function pp(e7, t) {
  return t.every((r) => Ln(e7, r));
}
__name(pp, "pp");
function dp(e7, t) {
  return He(te(e7.name, () => e7.compute(t)));
}
__name(dp, "dp");
u();
l();
c();
p();
d();
function Qr({ visitor: e7, result: t, args: r, runtimeDataModel: n, modelName: i }) {
  if (Array.isArray(t)) {
    for (let s = 0; s < t.length; s++) t[s] = Qr({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e7 });
    return t;
  }
  let o3 = e7(t, i, r) ?? t;
  return r.include && Is({ includeOrSelect: r.include, result: o3, parentModelName: i, runtimeDataModel: n, visitor: e7 }), r.select && Is({ includeOrSelect: r.select, result: o3, parentModelName: i, runtimeDataModel: n, visitor: e7 }), o3;
}
__name(Qr, "Qr");
function Is({ includeOrSelect: e7, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
  for (let [o3, s] of Object.entries(e7)) {
    if (!s || t[o3] == null || le(s)) continue;
    let m3 = n.models[r].fields.find((T3) => T3.name === o3);
    if (!m3 || m3.kind !== "object" || !m3.relationName) continue;
    let f3 = typeof s == "object" ? s : {};
    t[o3] = Qr({ visitor: i, result: t[o3], args: f3, modelName: m3.type, runtimeDataModel: n });
  }
}
__name(Is, "Is");
function ks({ result: e7, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o3 }) {
  return n.isEmpty() || e7 == null || typeof e7 != "object" || !i.models[t] ? e7 : Qr({ result: e7, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a3, m3, f3) => {
    let T3 = Ee(m3);
    return Rs({ result: a3, modelName: T3, select: f3.select, omit: f3.select ? void 0 : { ...o3?.[T3], ...f3.omit }, extensions: n });
  }, "visitor") });
}
__name(ks, "ks");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var mp = ["$connect", "$disconnect", "$on", "$use", "$extends"];
var Os = mp;
function Ds(e7) {
  if (e7 instanceof Sql) return yp(e7);
  if (Vr(e7)) return hp(e7);
  if (Array.isArray(e7)) {
    let r = [e7[0]];
    for (let n = 1; n < e7.length; n++) r[n] = Wt(e7[n]);
    return r;
  }
  let t = {};
  for (let r in e7) t[r] = Wt(e7[r]);
  return t;
}
__name(Ds, "Ds");
function yp(e7) {
  return new Sql(e7.strings, e7.values);
}
__name(yp, "yp");
function hp(e7) {
  return new Ht(e7.sql, e7.values);
}
__name(hp, "hp");
function Wt(e7) {
  if (typeof e7 != "object" || e7 == null || isObjectEnumValue(e7) || ft(e7) || le(e7)) return e7;
  if (ut(e7)) return new Decimal(e7.toFixed());
  if (at(e7)) return /* @__PURE__ */ new Date(+e7);
  if (ArrayBuffer.isView(e7)) return e7.slice(0);
  if (Array.isArray(e7)) {
    let t = e7.length, r;
    for (r = Array(t); t--; ) r[t] = Wt(e7[t]);
    return r;
  }
  if (typeof e7 == "object") {
    let t = {};
    for (let r in e7) r === "__proto__" ? Object.defineProperty(t, r, { value: Wt(e7[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Wt(e7[r]);
    return t;
  }
  Re(e7, "Unknown value");
}
__name(Wt, "Wt");
function Ls(e7, t, r, n = 0) {
  return e7._createPrismaPromise((i) => {
    let o3 = t.customDataProxyFetch;
    return "transaction" in t && i !== void 0 && (t.transaction?.kind === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e7._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: Ds(t.args ?? {}), __internalParams: t, query: /* @__PURE__ */ __name((s, a3 = t) => {
      let m3 = a3.customDataProxyFetch;
      return a3.customDataProxyFetch = Vs(o3, m3), a3.args = s, Ls(e7, a3, r, n + 1);
    }, "query") });
  });
}
__name(Ls, "Ls");
function _s(e7, t) {
  let { jsModelName: r, action: n, clientMethod: i } = t, o3 = r ? n : i;
  if (e7._extensions.isEmpty()) return e7._executeRequest(t);
  let s = e7._extensions.getAllQueryCallbacks(r ?? "$none", o3);
  return Ls(e7, t, s);
}
__name(_s, "_s");
function Fs(e7) {
  return (t) => {
    let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
    return n.length ? $s(r, n, 0, e7) : e7(r);
  };
}
__name(Fs, "Fs");
function $s(e7, t, r, n) {
  if (r === t.length) return n(e7);
  let i = e7.customDataProxyFetch, o3 = e7.requests[0].transaction;
  return t[r]({ args: { queries: e7.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o3 ? { isolationLevel: o3.kind === "batch" ? o3.isolationLevel : void 0 } : void 0 }, __internalParams: e7, query(s, a3 = e7) {
    let m3 = a3.customDataProxyFetch;
    return a3.customDataProxyFetch = Vs(i, m3), $s(a3, t, r + 1, n);
  } });
}
__name($s, "$s");
var Ms = /* @__PURE__ */ __name((e7) => e7, "Ms");
function Vs(e7 = Ms, t = Ms) {
  return (r) => e7(t(r));
}
__name(Vs, "Vs");
u();
l();
c();
p();
d();
function qs({ dataPath: e7, modelName: t, args: r, runtimeDataModel: n }) {
  let i = { modelName: t, args: r ?? {} }, o3 = wp(e7);
  if (!o3 || o3.length === 0) return i;
  let s = t, a3 = r ?? {};
  for (let m3 of o3) {
    let f3 = n.models[s];
    if (!f3) return i;
    let T3 = f3.fields.find((S3) => S3.name === m3);
    if (!T3) throw new Error(`Could not resolve relation field "${m3}" on model "${s}" from dataPath "${e7.join(".")}"`);
    if (T3.kind !== "object" || !T3.relationName) return i;
    s = T3.type, a3 = bp(a3, m3);
  }
  return { modelName: s, args: a3 };
}
__name(qs, "qs");
function wp(e7) {
  let t = [];
  for (let r = 0; r < e7.length; r += 2) {
    let n = e7[r], i = e7[r + 1];
    if (n !== "select" && n !== "include" || i === void 0) return;
    t.push(i);
  }
  return t;
}
__name(wp, "wp");
function bp(e7, t) {
  let r = e7.select?.[t];
  if (Us(r)) return r;
  let n = e7.include?.[t];
  return Us(n) ? n : {};
}
__name(bp, "bp");
function Us(e7) {
  return !!e7 && typeof e7 == "object" && !Array.isArray(e7);
}
__name(Us, "Us");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function M(e7, t) {
  throw new Error(t);
}
__name(M, "M");
function Zn(e7, t) {
  return e7 === t || e7 !== null && t !== null && typeof e7 == "object" && typeof t == "object" && Object.keys(e7).length === Object.keys(t).length && Object.keys(e7).every((r) => Zn(e7[r], t[r]));
}
__name(Zn, "Zn");
function bt(e7, t) {
  let r = Object.keys(e7), n = Object.keys(t);
  return (r.length < n.length ? r : n).every((o3) => {
    if (typeof e7[o3] == typeof t[o3] && typeof e7[o3] != "object") return e7[o3] === t[o3];
    if (Decimal.isDecimal(e7[o3]) || Decimal.isDecimal(t[o3])) {
      let s = Bs(e7[o3]), a3 = Bs(t[o3]);
      return s && a3 && s.equals(a3);
    } else if (e7[o3] instanceof Uint8Array || t[o3] instanceof Uint8Array) {
      let s = js(e7[o3]), a3 = js(t[o3]);
      return s && a3 && s.equals(a3);
    } else {
      if (e7[o3] instanceof Date || t[o3] instanceof Date) return Qs(e7[o3])?.getTime() === Qs(t[o3])?.getTime();
      if (typeof e7[o3] == "bigint" || typeof t[o3] == "bigint") return Js(e7[o3]) === Js(t[o3]);
      if (typeof e7[o3] == "number" || typeof t[o3] == "number") return Hs(e7[o3]) === Hs(t[o3]);
    }
    return Zn(e7[o3], t[o3]);
  });
}
__name(bt, "bt");
function Bs(e7) {
  return Decimal.isDecimal(e7) ? e7 : typeof e7 == "number" || typeof e7 == "string" ? new Decimal(e7) : void 0;
}
__name(Bs, "Bs");
function js(e7) {
  return g.isBuffer(e7) ? e7 : e7 instanceof Uint8Array ? g.from(e7.buffer, e7.byteOffset, e7.byteLength) : typeof e7 == "string" ? g.from(e7, "base64") : void 0;
}
__name(js, "js");
function Qs(e7) {
  return e7 instanceof Date ? e7 : typeof e7 == "string" || typeof e7 == "number" ? new Date(e7) : void 0;
}
__name(Qs, "Qs");
function Js(e7) {
  return typeof e7 == "bigint" ? e7 : typeof e7 == "number" || typeof e7 == "string" ? BigInt(e7) : void 0;
}
__name(Js, "Js");
function Hs(e7) {
  return typeof e7 == "number" ? e7 : typeof e7 == "string" ? Number(e7) : void 0;
}
__name(Hs, "Hs");
function fe(e7) {
  return JSON.stringify(e7, (t, r) => typeof r == "bigint" ? r.toString() : ArrayBuffer.isView(r) ? g.from(r.buffer, r.byteOffset, r.byteLength).toString("base64") : r);
}
__name(fe, "fe");
function Ep(e7) {
  return e7 !== null && typeof e7 == "object" && typeof e7.$type == "string";
}
__name(Ep, "Ep");
function Tp(e7, t) {
  let r = {};
  for (let n of Object.keys(e7)) r[n] = t(e7[n], n);
  return r;
}
__name(Tp, "Tp");
function Te(e7) {
  return e7 === null ? e7 : Array.isArray(e7) ? e7.map(Te) : typeof e7 == "object" ? Ep(e7) ? Pp(e7) : e7.constructor !== null && e7.constructor.name !== "Object" ? e7 : Tp(e7, Te) : e7;
}
__name(Te, "Te");
function Pp({ $type: e7, value: t }) {
  switch (e7) {
    case "BigInt":
      return BigInt(t);
    case "Bytes": {
      let { buffer: r, byteOffset: n, byteLength: i } = g.from(t, "base64");
      return new Uint8Array(r, n, i);
    }
    case "DateTime":
      return new Date(t);
    case "Decimal":
      return new Decimal(t);
    case "Json":
      return JSON.parse(t);
    case "Raw":
      return t;
    case "FieldRef":
      throw new Error("FieldRef tagged values cannot be deserialized to JavaScript values");
    case "Enum":
      return t;
    default:
      M(t, "Unknown tagged value");
  }
}
__name(Pp, "Pp");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Hr(e7) {
  return e7.name === "DriverAdapterError" && typeof e7.cause == "object";
}
__name(Hr, "Hr");
u();
l();
c();
p();
d();
var k = { Int32: 0, Int64: 1, Float: 2, Double: 3, Numeric: 4, Boolean: 5, Character: 6, Text: 7, Date: 8, Time: 9, DateTime: 10, Json: 11, Enum: 12, Bytes: 13, Set: 14, Uuid: 15, Int32Array: 64, Int64Array: 65, FloatArray: 66, DoubleArray: 67, NumericArray: 68, BooleanArray: 69, CharacterArray: 70, TextArray: 71, DateArray: 72, TimeArray: 73, DateTimeArray: 74, JsonArray: 75, EnumArray: 76, BytesArray: 77, UuidArray: 78, UnknownNumber: 128 };
var Z = class extends Error {
  static {
    __name(this, "Z");
  }
  name = "UserFacingError";
  code;
  meta;
  constructor(t, r, n) {
    super(t), this.code = r, this.meta = n ?? {};
  }
  toQueryResponseErrorObject() {
    return { error: this.message, user_facing_error: { is_panic: false, message: this.message, meta: this.meta, error_code: this.code } };
  }
};
function xt(e7) {
  if (!Hr(e7)) throw e7;
  let t = Sp(e7), r = Gs(e7);
  throw !t || !r ? e7 : new Z(r, t, { driverAdapterError: e7 });
}
__name(xt, "xt");
function Xn(e7) {
  throw Hr(e7) ? new Z(`Raw query failed. Code: \`${e7.cause.originalCode ?? "N/A"}\`. Message: \`${e7.cause.originalMessage ?? Gs(e7)}\``, "P2010", { driverAdapterError: e7 }) : e7;
}
__name(Xn, "Xn");
function Sp(e7) {
  switch (e7.cause.kind) {
    case "AuthenticationFailed":
      return "P1000";
    case "DatabaseNotReachable":
      return "P1001";
    case "DatabaseDoesNotExist":
      return "P1003";
    case "SocketTimeout":
      return "P1008";
    case "DatabaseAlreadyExists":
      return "P1009";
    case "DatabaseAccessDenied":
      return "P1010";
    case "TlsConnectionError":
      return "P1011";
    case "ConnectionClosed":
      return "P1017";
    case "TransactionAlreadyClosed":
      return "P1018";
    case "LengthMismatch":
      return "P2000";
    case "UniqueConstraintViolation":
      return "P2002";
    case "ForeignKeyConstraintViolation":
      return "P2003";
    case "InvalidInputValue":
      return "P2007";
    case "UnsupportedNativeDataType":
      return "P2010";
    case "NullConstraintViolation":
      return "P2011";
    case "ValueOutOfRange":
      return "P2020";
    case "TableDoesNotExist":
      return "P2021";
    case "ColumnNotFound":
      return "P2022";
    case "InvalidIsolationLevel":
    case "InconsistentColumnData":
      return "P2023";
    case "MissingFullTextSearchIndex":
      return "P2030";
    case "TransactionWriteConflict":
      return "P2034";
    case "GenericJs":
      return "P2036";
    case "TooManyConnections":
      return "P2037";
    case "postgres":
    case "sqlite":
    case "mysql":
    case "mssql":
      return;
    default:
      M(e7.cause, `Unknown error: ${fe(e7.cause)}`);
  }
}
__name(Sp, "Sp");
function Gs(e7) {
  switch (e7.cause.kind) {
    case "AuthenticationFailed":
      return `Authentication failed against the database server, the provided database credentials for \`${e7.cause.user ?? "(not available)"}\` are not valid`;
    case "DatabaseNotReachable": {
      let t = e7.cause.host && e7.cause.port ? `${e7.cause.host}:${e7.cause.port}` : e7.cause.host;
      return `Can't reach database server${t ? ` at ${t}` : ""}`;
    }
    case "DatabaseDoesNotExist":
      return `Database \`${e7.cause.db ?? "(not available)"}\` does not exist on the database server`;
    case "SocketTimeout":
      return "Operation has timed out";
    case "DatabaseAlreadyExists":
      return `Database \`${e7.cause.db ?? "(not available)"}\` already exists on the database server`;
    case "DatabaseAccessDenied":
      return `User was denied access on the database \`${e7.cause.db ?? "(not available)"}\``;
    case "TlsConnectionError":
      return `Error opening a TLS connection: ${e7.cause.reason}`;
    case "ConnectionClosed":
      return "Server has closed the connection.";
    case "TransactionAlreadyClosed":
      return e7.cause.cause;
    case "LengthMismatch":
      return `The provided value for the column is too long for the column's type. Column: ${e7.cause.column ?? "(not available)"}`;
    case "UniqueConstraintViolation":
      return `Unique constraint failed on the ${Yn(e7.cause.constraint)}`;
    case "ForeignKeyConstraintViolation":
      return `Foreign key constraint violated on the ${Yn(e7.cause.constraint)}`;
    case "UnsupportedNativeDataType":
      return `Failed to deserialize column of type '${e7.cause.type}'. If you're using $queryRaw and this column is explicitly marked as \`Unsupported\` in your Prisma schema, try casting this column to any supported Prisma type such as \`String\`.`;
    case "NullConstraintViolation":
      return `Null constraint violation on the ${Yn(e7.cause.constraint)}`;
    case "ValueOutOfRange":
      return `Value out of range for the type: ${e7.cause.cause}`;
    case "TableDoesNotExist":
      return `The table \`${e7.cause.table ?? "(not available)"}\` does not exist in the current database.`;
    case "ColumnNotFound":
      return `The column \`${e7.cause.column ?? "(not available)"}\` does not exist in the current database.`;
    case "InvalidIsolationLevel":
      return `Error in connector: Conversion error: ${e7.cause.level}`;
    case "InconsistentColumnData":
      return `Inconsistent column data: ${e7.cause.cause}`;
    case "MissingFullTextSearchIndex":
      return "Cannot find a fulltext index to use for the native search, try adding a @@fulltext([Fields...]) to your schema";
    case "TransactionWriteConflict":
      return "Transaction failed due to a write conflict or a deadlock. Please retry your transaction";
    case "GenericJs":
      return `Error in external connector (id ${e7.cause.id})`;
    case "TooManyConnections":
      return `Too many database connections opened: ${e7.cause.cause}`;
    case "InvalidInputValue":
      return `Invalid input value: ${e7.cause.message}`;
    case "sqlite":
    case "postgres":
    case "mysql":
    case "mssql":
      return;
    default:
      M(e7.cause, `Unknown error: ${fe(e7.cause)}`);
  }
}
__name(Gs, "Gs");
function Yn(e7) {
  return e7 && "fields" in e7 ? `fields: (${e7.fields.map((t) => `\`${t}\``).join(", ")})` : e7 && "index" in e7 ? `constraint: \`${e7.index}\`` : e7 && "foreignKey" in e7 ? "foreign key" : "(not available)";
}
__name(Yn, "Yn");
function vp(e7) {
  if (typeof e7 != "object" || e7 === null) return false;
  let t = e7;
  return "$type" in t && t.$type === "Param" || "prisma__type" in t && t.prisma__type === "param";
}
__name(vp, "vp");
function Ap(e7) {
  return "prisma__type" in e7 ? e7.prisma__value?.name : e7.value.name;
}
__name(Ap, "Ap");
function Cp(e7, t) {
  let r = {};
  for (let [n, i] of Object.entries(e7)) if (r[n] = i, vp(i)) {
    let o3 = Ap(i);
    o3 && o3 in t && (r[n] = t[o3]);
  }
  return r;
}
__name(Cp, "Cp");
function zs(e7, t, r = {}) {
  let n = e7.map((o3) => t.keys.reduce((s, a3) => (s[a3] = Te(o3[a3]), s), {})), i = new Set(t.nestedSelection);
  return t.arguments.map((o3) => {
    let s = Cp(o3, r), a3 = n.findIndex((m3) => bt(m3, s));
    if (a3 === -1) return t.expectNonEmpty ? new Z("An operation failed because it depends on one or more records that were required but not found", "P2025") : null;
    {
      let m3 = Object.entries(e7[a3]).filter(([f3]) => i.has(f3));
      return Object.fromEntries(m3);
    }
  });
}
__name(zs, "zs");
u();
l();
c();
p();
d();
var U = class extends Z {
  static {
    __name(this, "U");
  }
  name = "DataMapperError";
  constructor(t, r) {
    super(t, "P2023", r);
  }
};
var Ws = /* @__PURE__ */ new WeakMap();
function Ip(e7) {
  let t = Ws.get(e7);
  return t || (t = Object.entries(e7), Ws.set(e7, t)), t;
}
__name(Ip, "Ip");
function Zs(e7, t, r) {
  switch (t.type) {
    case "affectedRows":
      if (typeof e7 != "number") throw new U(`Expected an affected rows count, got: ${typeof e7} (${e7})`);
      return { count: e7 };
    case "object":
      return ti(e7, t.fields, r, t.skipNulls);
    case "field":
      return ei(e7, "<result>", t.fieldType, r);
    default:
      M(t, `Invalid data mapping type: '${t.type}'`);
  }
}
__name(Zs, "Zs");
function ti(e7, t, r, n) {
  if (e7 === null) return null;
  if (Array.isArray(e7)) {
    let i = e7;
    return n && (i = i.filter((o3) => o3 !== null)), i.map((o3) => Ks(o3, t, r));
  }
  if (typeof e7 == "object") return Ks(e7, t, r);
  if (typeof e7 == "string") {
    let i;
    try {
      i = JSON.parse(e7);
    } catch (o3) {
      throw new U("Expected an array or object, got a string that is not valid JSON", { cause: o3 });
    }
    return ti(i, t, r, n);
  }
  throw new U(`Expected an array or an object, got: ${typeof e7}`);
}
__name(ti, "ti");
function Ks(e7, t, r) {
  if (typeof e7 != "object") throw new U(`Expected an object, but got '${typeof e7}'`);
  let n = {};
  for (let [i, o3] of Ip(t)) switch (o3.type) {
    case "affectedRows":
      throw new U(`Unexpected 'AffectedRows' node in data mapping for field '${i}'`);
    case "object": {
      let { serializedName: s, fields: a3, skipNulls: m3 } = o3;
      if (s !== null && !Object.hasOwn(e7, s)) throw new U(`Missing data field (Object): '${i}'; node: ${JSON.stringify(o3)}; data: ${JSON.stringify(e7)}`);
      let f3 = s !== null ? e7[s] : e7;
      n[i] = ti(f3, a3, r, m3);
      break;
    }
    case "field":
      {
        let s = o3.dbName;
        if (Object.hasOwn(e7, s)) n[i] = kp(e7[s], s, o3.fieldType, r);
        else throw new U(`Missing data field (Value): '${s}'; node: ${JSON.stringify(o3)}; data: ${JSON.stringify(e7)}`);
      }
      break;
    default:
      M(o3, `DataMapper: Invalid data mapping node type: '${o3.type}'`);
  }
  return n;
}
__name(Ks, "Ks");
function kp(e7, t, r, n) {
  return e7 === null ? r.arity === "list" ? [] : null : r.arity === "list" ? e7.map((o3, s) => ei(o3, `${t}[${s}]`, r, n)) : ei(e7, t, r, n);
}
__name(kp, "kp");
function ei(e7, t, r, n) {
  switch (r.type) {
    case "unsupported":
      return e7;
    case "string": {
      if (typeof e7 != "string") throw new U(`Expected a string in column '${t}', got ${typeof e7}: ${e7}`);
      return e7;
    }
    case "int":
      switch (typeof e7) {
        case "number":
          return Math.trunc(e7);
        case "string": {
          let i = Math.trunc(Number(e7));
          if (Number.isNaN(i) || !Number.isFinite(i)) throw new U(`Expected an integer in column '${t}', got string: ${e7}`);
          if (!Number.isSafeInteger(i)) throw new U(`Integer value in column '${t}' is too large to represent as a JavaScript number without loss of precision, got: ${e7}. Consider using BigInt type.`);
          return i;
        }
        default:
          throw new U(`Expected an integer in column '${t}', got ${typeof e7}: ${e7}`);
      }
    case "bigint": {
      if (typeof e7 != "number" && typeof e7 != "string") throw new U(`Expected a bigint in column '${t}', got ${typeof e7}: ${e7}`);
      return { $type: "BigInt", value: e7 };
    }
    case "float": {
      if (typeof e7 == "number") return e7;
      if (typeof e7 == "string") {
        let i = Number(e7);
        if (Number.isNaN(i) && !/^[-+]?nan$/.test(e7.toLowerCase())) throw new U(`Expected a float in column '${t}', got string: ${e7}`);
        return i;
      }
      throw new U(`Expected a float in column '${t}', got ${typeof e7}: ${e7}`);
    }
    case "boolean": {
      if (typeof e7 == "boolean") return e7;
      if (typeof e7 == "number") return e7 === 1;
      if (typeof e7 == "string") {
        if (e7 === "true" || e7 === "TRUE" || e7 === "1") return true;
        if (e7 === "false" || e7 === "FALSE" || e7 === "0") return false;
        throw new U(`Expected a boolean in column '${t}', got ${typeof e7}: ${e7}`);
      }
      if (Array.isArray(e7) || e7 instanceof Uint8Array) {
        for (let i of e7) if (i !== 0) return true;
        return false;
      }
      throw new U(`Expected a boolean in column '${t}', got ${typeof e7}: ${e7}`);
    }
    case "decimal":
      if (typeof e7 != "number" && typeof e7 != "string" && !Decimal.isDecimal(e7)) throw new U(`Expected a decimal in column '${t}', got ${typeof e7}: ${e7}`);
      return { $type: "Decimal", value: e7 };
    case "datetime": {
      if (typeof e7 == "string") return { $type: "DateTime", value: Np(e7) };
      if (typeof e7 == "number" || e7 instanceof Date) return { $type: "DateTime", value: e7 };
      throw new U(`Expected a date in column '${t}', got ${typeof e7}: ${e7}`);
    }
    case "object":
      return { $type: "Json", value: fe(e7) };
    case "json":
      return { $type: "Json", value: `${e7}` };
    case "bytes": {
      switch (r.encoding) {
        case "base64":
          if (typeof e7 != "string") throw new U(`Expected a base64-encoded byte array in column '${t}', got ${typeof e7}: ${e7}`);
          return { $type: "Bytes", value: e7 };
        case "hex":
          if (typeof e7 != "string" || !e7.startsWith("\\x")) throw new U(`Expected a hex-encoded byte array in column '${t}', got ${typeof e7}: ${e7}`);
          return { $type: "Bytes", value: g.from(e7.slice(2), "hex").toString("base64") };
        case "array":
          if (Array.isArray(e7)) return { $type: "Bytes", value: g.from(e7).toString("base64") };
          if (e7 instanceof Uint8Array) return { $type: "Bytes", value: g.from(e7).toString("base64") };
          throw new U(`Expected a byte array in column '${t}', got ${typeof e7}: ${e7}`);
        default:
          M(r.encoding, `DataMapper: Unknown bytes encoding: ${r.encoding}`);
      }
      break;
    }
    case "enum": {
      let i = n[r.name];
      if (i === void 0) throw new U(`Unknown enum '${r.name}'`);
      let o3 = i[`${e7}`];
      if (o3 === void 0) throw new U(`Value '${e7}' not found in enum '${r.name}'`);
      return o3;
    }
    default:
      M(r, `DataMapper: Unknown result type: ${r.type}`);
  }
}
__name(ei, "ei");
var Op = /\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[+-]\d{2}(:?\d{2})?)?$/;
function Np(e7) {
  let t = Op.exec(e7);
  if (t === null) return `${e7}T00:00:00Z`;
  let r = e7, [n, i, o3] = t;
  if (i !== void 0 && i !== "Z" && o3 === void 0 ? r = `${e7}:00` : i === void 0 && (r = `${e7}Z`), n.length === e7.length) return `1970-01-01T${r}`;
  let s = t.index - 1;
  return r[s] === " " && (r = `${r.slice(0, s)}T${r.slice(s + 1)}`), r;
}
__name(Np, "Np");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function ce(e7) {
  if (typeof e7 != "object") return e7;
  var t, r, n = Object.prototype.toString.call(e7);
  if (n === "[object Object]") {
    if (e7.constructor !== Object && typeof e7.constructor == "function") {
      r = new e7.constructor();
      for (t in e7) e7.hasOwnProperty(t) && r[t] !== e7[t] && (r[t] = ce(e7[t]));
    } else {
      r = {};
      for (t in e7) t === "__proto__" ? Object.defineProperty(r, t, { value: ce(e7[t]), configurable: true, enumerable: true, writable: true }) : r[t] = ce(e7[t]);
    }
    return r;
  }
  if (n === "[object Array]") {
    for (t = e7.length, r = Array(t); t--; ) r[t] = ce(e7[t]);
    return r;
  }
  return n === "[object Set]" ? (r = /* @__PURE__ */ new Set(), e7.forEach(function(i) {
    r.add(ce(i));
  }), r) : n === "[object Map]" ? (r = /* @__PURE__ */ new Map(), e7.forEach(function(i, o3) {
    r.set(ce(o3), ce(i));
  }), r) : n === "[object Date]" ? /* @__PURE__ */ new Date(+e7) : n === "[object RegExp]" ? (r = new RegExp(e7.source, e7.flags), r.lastIndex = e7.lastIndex, r) : n === "[object DataView]" ? new e7.constructor(ce(e7.buffer)) : n === "[object ArrayBuffer]" ? e7.slice(0) : n.slice(-6) === "Array]" ? new e7.constructor(e7) : e7;
}
__name(ce, "ce");
u();
l();
c();
p();
d();
function Dp(e7) {
  let t = Object.entries(e7);
  return t.length === 0 ? "" : (t.sort(([n], [i]) => n.localeCompare(i)), `/*${t.map(([n, i]) => {
    let o3 = encodeURIComponent(n), s = encodeURIComponent(i).replace(/'/g, "\\'");
    return `${o3}='${s}'`;
  }).join(",")}*/`);
}
__name(Dp, "Dp");
function Gr(e7, t) {
  let r = {};
  for (let n of e7) {
    let i = n(ce(t));
    for (let [o3, s] of Object.entries(i)) s !== void 0 && (r[o3] = s);
  }
  return r;
}
__name(Gr, "Gr");
function Ys(e7, t) {
  let r = Gr(e7, t);
  return Dp(r);
}
__name(Ys, "Ys");
function Xs(e7, t) {
  return t ? `${e7} ${t}` : e7;
}
__name(Xs, "Xs");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var Kt;
(function(e7) {
  e7[e7.INTERNAL = 0] = "INTERNAL", e7[e7.SERVER = 1] = "SERVER", e7[e7.CLIENT = 2] = "CLIENT", e7[e7.PRODUCER = 3] = "PRODUCER", e7[e7.CONSUMER = 4] = "CONSUMER";
})(Kt || (Kt = {}));
function Mp(e7) {
  switch (e7) {
    case "postgresql":
    case "postgres":
    case "prisma+postgres":
      return "postgresql";
    case "sqlserver":
      return "mssql";
    case "mysql":
    case "sqlite":
    case "cockroachdb":
    case "mongodb":
      return e7;
    default:
      M(e7, `Unknown provider: ${e7}`);
  }
}
__name(Mp, "Mp");
async function zr({ query: e7, tracingHelper: t, provider: r, onQuery: n, execute: i }) {
  let o3 = n === void 0 ? i : async () => {
    let s = /* @__PURE__ */ new Date(), a3 = w.now(), m3 = await i(), f3 = w.now();
    return n({ timestamp: s, duration: f3 - a3, query: e7.sql, params: e7.args }), m3;
  };
  return t.isEnabled() ? await t.runInChildSpan({ name: "db_query", kind: Kt.CLIENT, attributes: { "db.query.text": e7.sql, "db.system.name": Mp(r) } }, o3) : o3();
}
__name(zr, "zr");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Ge(e7, t) {
  var r = "000000000" + e7;
  return r.substr(r.length - t);
}
__name(Ge, "Ge");
var ea = qe(ko(), 1);
function Lp() {
  try {
    return ea.default.hostname();
  } catch {
    return y.env._CLUSTER_NETWORK_NAME_ || y.env.COMPUTERNAME || "hostname";
  }
}
__name(Lp, "Lp");
var ta = 2;
var _p = Ge(y.pid.toString(36), ta);
var ra = Lp();
var Fp = ra.length;
var $p = Ge(ra.split("").reduce(function(e7, t) {
  return +e7 + t.charCodeAt(0);
}, +Fp + 36).toString(36), ta);
function ri() {
  return _p + $p;
}
__name(ri, "ri");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Wr(e7) {
  return typeof e7 == "string" && /^c[a-z0-9]{20,32}$/.test(e7);
}
__name(Wr, "Wr");
function ni(e7) {
  let n = Math.pow(36, 4), i = 0;
  function o3() {
    return Ge((Math.random() * n << 0).toString(36), 4);
  }
  __name(o3, "o");
  function s() {
    return i = i < n ? i : 0, i++, i - 1;
  }
  __name(s, "s");
  function a3() {
    var m3 = "c", f3 = (/* @__PURE__ */ new Date()).getTime().toString(36), T3 = Ge(s().toString(36), 4), S3 = e7(), v3 = o3() + o3();
    return m3 + f3 + T3 + S3 + v3;
  }
  __name(a3, "a");
  return a3.fingerprint = e7, a3.isCuid = Wr, a3;
}
__name(ni, "ni");
var Vp = ni(ri);
var na = Vp;
var eu = qe(Ga());
u();
l();
c();
p();
d();
Je();
u();
l();
c();
p();
d();
var za = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var vd = 128;
var We;
var Pt;
function Ad(e7) {
  !We || We.length < e7 ? (We = g.allocUnsafe(e7 * vd), _t.getRandomValues(We), Pt = 0) : Pt + e7 > We.length && (_t.getRandomValues(We), Pt = 0), Pt += e7;
}
__name(Ad, "Ad");
function di(e7 = 21) {
  Ad(e7 |= 0);
  let t = "";
  for (let r = Pt - e7; r < Pt; r++) t += za[We[r] & 63];
  return t;
}
__name(di, "di");
u();
l();
c();
p();
d();
Je();
var Ka = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var rr = 32;
var Cd = 16;
var Za = 10;
var Wa = 281474976710655;
var Ke;
(function(e7) {
  e7.Base32IncorrectEncoding = "B32_ENC_INVALID", e7.DecodeTimeInvalidCharacter = "DEC_TIME_CHAR", e7.DecodeTimeValueMalformed = "DEC_TIME_MALFORMED", e7.EncodeTimeNegative = "ENC_TIME_NEG", e7.EncodeTimeSizeExceeded = "ENC_TIME_SIZE_EXCEED", e7.EncodeTimeValueMalformed = "ENC_TIME_MALFORMED", e7.PRNGDetectFailure = "PRNG_DETECT", e7.ULIDInvalid = "ULID_INVALID", e7.Unexpected = "UNEXPECTED", e7.UUIDInvalid = "UUID_INVALID";
})(Ke || (Ke = {}));
var Ze = class extends Error {
  static {
    __name(this, "Ze");
  }
  constructor(t, r) {
    super(`${r} (${t})`), this.name = "ULIDError", this.code = t;
  }
};
function Rd(e7) {
  let t = Math.floor(e7() * rr);
  return t === rr && (t = rr - 1), Ka.charAt(t);
}
__name(Rd, "Rd");
function Id(e7) {
  let t = kd(), r = t && (t.crypto || t.msCrypto) || (typeof ot < "u" ? ot : null);
  if (typeof r?.getRandomValues == "function") return () => {
    let n = new Uint8Array(1);
    return r.getRandomValues(n), n[0] / 255;
  };
  if (typeof r?.randomBytes == "function") return () => r.randomBytes(1).readUInt8() / 255;
  if (ot?.randomBytes) return () => ot.randomBytes(1).readUInt8() / 255;
  throw new Ze(Ke.PRNGDetectFailure, "Failed to find a reliable PRNG");
}
__name(Id, "Id");
function kd() {
  return Dd() ? self : typeof window < "u" ? window : typeof globalThis < "u" || typeof globalThis < "u" ? globalThis : null;
}
__name(kd, "kd");
function Od(e7, t) {
  let r = "";
  for (; e7 > 0; e7--) r = Rd(t) + r;
  return r;
}
__name(Od, "Od");
function Nd(e7, t = Za) {
  if (isNaN(e7)) throw new Ze(Ke.EncodeTimeValueMalformed, `Time must be a number: ${e7}`);
  if (e7 > Wa) throw new Ze(Ke.EncodeTimeSizeExceeded, `Cannot encode a time larger than ${Wa}: ${e7}`);
  if (e7 < 0) throw new Ze(Ke.EncodeTimeNegative, `Time must be positive: ${e7}`);
  if (Number.isInteger(e7) === false) throw new Ze(Ke.EncodeTimeValueMalformed, `Time must be an integer: ${e7}`);
  let r, n = "";
  for (let i = t; i > 0; i--) r = e7 % rr, n = Ka.charAt(r) + n, e7 = (e7 - r) / rr;
  return n;
}
__name(Nd, "Nd");
function Dd() {
  return typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope;
}
__name(Dd, "Dd");
function Ya(e7, t) {
  let r = t || Id(), n = !e7 || isNaN(e7) ? Date.now() : e7;
  return Nd(n, Za) + Od(Cd, r);
}
__name(Ya, "Ya");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var Y = [];
for (let e7 = 0; e7 < 256; ++e7) Y.push((e7 + 256).toString(16).slice(1));
function Xr(e7, t = 0) {
  return (Y[e7[t + 0]] + Y[e7[t + 1]] + Y[e7[t + 2]] + Y[e7[t + 3]] + "-" + Y[e7[t + 4]] + Y[e7[t + 5]] + "-" + Y[e7[t + 6]] + Y[e7[t + 7]] + "-" + Y[e7[t + 8]] + Y[e7[t + 9]] + "-" + Y[e7[t + 10]] + Y[e7[t + 11]] + Y[e7[t + 12]] + Y[e7[t + 13]] + Y[e7[t + 14]] + Y[e7[t + 15]]).toLowerCase();
}
__name(Xr, "Xr");
u();
l();
c();
p();
d();
Je();
var tn = new Uint8Array(256);
var en = tn.length;
function St() {
  return en > tn.length - 16 && (xr(tn), en = 0), tn.slice(en, en += 16);
}
__name(St, "St");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
Je();
var mi = { randomUUID: br };
function Md(e7, t, r) {
  if (mi.randomUUID && !t && !e7) return mi.randomUUID();
  e7 = e7 || {};
  let n = e7.random ?? e7.rng?.() ?? St();
  if (n.length < 16) throw new Error("Random bytes length must be >= 16");
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t) {
    if (r = r || 0, r < 0 || r + 16 > t.length) throw new RangeError(`UUID byte range ${r}:${r + 15} is out of buffer bounds`);
    for (let i = 0; i < 16; ++i) t[r + i] = n[i];
    return t;
  }
  return Xr(n);
}
__name(Md, "Md");
var fi = Md;
u();
l();
c();
p();
d();
var gi = {};
function Ld(e7, t, r) {
  let n;
  if (e7) n = Xa(e7.random ?? e7.rng?.() ?? St(), e7.msecs, e7.seq, t, r);
  else {
    let i = Date.now(), o3 = St();
    _d(gi, i, o3), n = Xa(o3, gi.msecs, gi.seq, t, r);
  }
  return t ?? Xr(n);
}
__name(Ld, "Ld");
function _d(e7, t, r) {
  return e7.msecs ??= -1 / 0, e7.seq ??= 0, t > e7.msecs ? (e7.seq = r[6] << 23 | r[7] << 16 | r[8] << 8 | r[9], e7.msecs = t) : (e7.seq = e7.seq + 1 | 0, e7.seq === 0 && e7.msecs++), e7;
}
__name(_d, "_d");
function Xa(e7, t, r, n, i = 0) {
  if (e7.length < 16) throw new Error("Random bytes length must be >= 16");
  if (!n) n = new Uint8Array(16), i = 0;
  else if (i < 0 || i + 16 > n.length) throw new RangeError(`UUID byte range ${i}:${i + 15} is out of buffer bounds`);
  return t ??= Date.now(), r ??= e7[6] * 127 << 24 | e7[7] << 16 | e7[8] << 8 | e7[9], n[i++] = t / 1099511627776 & 255, n[i++] = t / 4294967296 & 255, n[i++] = t / 16777216 & 255, n[i++] = t / 65536 & 255, n[i++] = t / 256 & 255, n[i++] = t & 255, n[i++] = 112 | r >>> 28 & 15, n[i++] = r >>> 20 & 255, n[i++] = 128 | r >>> 14 & 63, n[i++] = r >>> 6 & 255, n[i++] = r << 2 & 255 | e7[10] & 3, n[i++] = e7[11], n[i++] = e7[12], n[i++] = e7[13], n[i++] = e7[14], n[i++] = e7[15], n;
}
__name(Xa, "Xa");
var yi = Ld;
var rn = class {
  static {
    __name(this, "rn");
  }
  #e = {};
  constructor() {
    this.register("uuid", new wi()), this.register("cuid", new bi()), this.register("ulid", new xi()), this.register("nanoid", new Ei()), this.register("product", new Ti());
  }
  snapshot() {
    return Object.create(this.#e, { now: { value: new hi() } });
  }
  register(t, r) {
    this.#e[t] = r;
  }
};
var hi = class {
  static {
    __name(this, "hi");
  }
  #e;
  generate() {
    return this.#e === void 0 && (this.#e = /* @__PURE__ */ new Date()), this.#e.toISOString();
  }
};
var wi = class {
  static {
    __name(this, "wi");
  }
  generate(t) {
    if (t === 4) return fi();
    if (t === 7) return yi();
    throw new Error("Invalid UUID generator arguments");
  }
};
var bi = class {
  static {
    __name(this, "bi");
  }
  generate(t) {
    if (t === 1) return na();
    if (t === 2) return (0, eu.createId)();
    throw new Error("Invalid CUID generator arguments");
  }
};
var xi = class {
  static {
    __name(this, "xi");
  }
  generate() {
    return Ya();
  }
};
var Ei = class {
  static {
    __name(this, "Ei");
  }
  generate(t) {
    if (typeof t == "number") return di(t);
    if (t === void 0) return di();
    throw new Error("Invalid Nanoid generator arguments");
  }
};
var Ti = class {
  static {
    __name(this, "Ti");
  }
  generate(t, r) {
    if (t === void 0 || r === void 0) throw new Error("Invalid Product generator arguments");
    return Array.isArray(t) && Array.isArray(r) ? t.flatMap((n) => r.map((i) => [n, i])) : Array.isArray(t) ? t.map((n) => [n, r]) : Array.isArray(r) ? r.map((n) => [t, n]) : [[t, r]];
  }
};
u();
l();
c();
p();
d();
function nn(e7, t) {
  return e7 == null ? e7 : typeof e7 == "string" ? nn(JSON.parse(e7), t) : Array.isArray(e7) ? $d(e7, t) : Fd(e7, t);
}
__name(nn, "nn");
function Fd(e7, t) {
  if (t.pagination) {
    let { skip: r, take: n, cursor: i } = t.pagination;
    if (r !== null && r > 0 || n === 0 || i !== null && !bt(e7, i)) return null;
  }
  return ru(e7, t.nested);
}
__name(Fd, "Fd");
function ru(e7, t) {
  for (let [r, n] of Object.entries(t)) e7[r] = nn(e7[r], n);
  return e7;
}
__name(ru, "ru");
function $d(e7, t) {
  if (t.distinct !== null) {
    let r = t.linkingFields !== null ? [...t.distinct, ...t.linkingFields] : t.distinct;
    e7 = Vd(e7, r);
  }
  return t.pagination && (e7 = Ud(e7, t.pagination, t.linkingFields)), t.reverse && e7.reverse(), Object.keys(t.nested).length === 0 ? e7 : e7.map((r) => ru(r, t.nested));
}
__name($d, "$d");
function Vd(e7, t) {
  let r = /* @__PURE__ */ new Set(), n = [];
  for (let i of e7) {
    let o3 = vt(i, t);
    r.has(o3) || (r.add(o3), n.push(i));
  }
  return n;
}
__name(Vd, "Vd");
function Ud(e7, t, r) {
  if (r === null) return tu(e7, t);
  let n = /* @__PURE__ */ new Map();
  for (let o3 of e7) {
    let s = vt(o3, r);
    n.has(s) || n.set(s, []), n.get(s).push(o3);
  }
  let i = Array.from(n.entries());
  return i.sort(([o3], [s]) => o3 < s ? -1 : o3 > s ? 1 : 0), i.flatMap(([, o3]) => tu(o3, t));
}
__name(Ud, "Ud");
function tu(e7, { cursor: t, skip: r, take: n }) {
  let i = t !== null ? e7.findIndex((a3) => bt(a3, t)) : 0;
  if (i === -1) return [];
  let o3 = i + (r ?? 0), s = n !== null ? o3 + n : e7.length;
  return e7.slice(o3, s);
}
__name(tu, "tu");
function vt(e7, t, r) {
  let n = t.map((i, o3) => r?.[o3] ? e7[i] !== null ? r[o3](e7[i]) : null : e7[i]);
  return JSON.stringify(n);
}
__name(vt, "vt");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Pi(e7) {
  return typeof e7 == "object" && e7 !== null && e7.prisma__type === "param";
}
__name(Pi, "Pi");
function Si(e7) {
  return typeof e7 == "object" && e7 !== null && e7.prisma__type === "generatorCall";
}
__name(Si, "Si");
function Ci(e7, t, r, n) {
  let i = e7.args.map((o3) => pe(o3, t, r));
  switch (e7.type) {
    case "rawSql":
      return [jd(e7.sql, i, e7.argTypes)];
    case "templateSql":
      return (e7.chunkable ? Jd(e7.fragments, i, n) : [i]).map((s) => {
        let a3 = qd(e7.fragments, e7.placeholderFormat, s, e7.argTypes);
        if (n !== void 0 && a3.args.length > n) throw new Z("The query parameter limit supported by your database is exceeded.", "P2029");
        return a3;
      });
    default:
      M(e7.type, "Invalid query type");
  }
}
__name(Ci, "Ci");
function pe(e7, t, r) {
  for (; Qd(e7); ) if (Pi(e7)) {
    let n = t[e7.prisma__value.name];
    if (n === void 0) throw new Error(`Missing value for query variable ${e7.prisma__value.name}`);
    e7.prisma__value.type === "DateTime" && typeof n == "string" ? e7 = new Date(n) : e7 = n;
  } else if (Si(e7)) {
    let { name: n, args: i } = e7.prisma__value, o3 = r[n];
    if (!o3) throw new Error(`Encountered an unknown generator '${n}'`);
    e7 = o3.generate(...i.map((s) => pe(s, t, r)));
  } else M(e7, `Unexpected unevaluated value type: ${e7}`);
  return Array.isArray(e7) && (e7 = e7.map((n) => pe(n, t, r))), e7;
}
__name(pe, "pe");
function qd(e7, t, r, n) {
  let i = "", o3 = { placeholderNumber: 1 }, s = [], a3 = [];
  for (let m3 of Ai(e7, r, n)) {
    if (i += Bd(m3, t, o3), m3.type === "stringChunk") continue;
    let f3 = s.length, T3 = s.push(...nu(m3)) - f3;
    if (m3.argType.arity === "tuple") {
      if (T3 % m3.argType.elements.length !== 0) throw new Error(`Malformed query template. Expected the number of parameters to match the tuple arity, but got ${T3} parameters for a tuple of arity ${m3.argType.elements.length}.`);
      for (let S3 = 0; S3 < T3 / m3.argType.elements.length; S3++) a3.push(...m3.argType.elements);
    } else for (let S3 = 0; S3 < T3; S3++) a3.push(m3.argType);
  }
  return { sql: i, args: s, argTypes: a3 };
}
__name(qd, "qd");
function Bd(e7, t, r) {
  let n = e7.type;
  switch (n) {
    case "parameter":
      return vi(t, r.placeholderNumber++);
    case "stringChunk":
      return e7.chunk;
    case "parameterTuple":
      return `(${e7.value.length == 0 ? "NULL" : e7.value.map(() => {
        let o3 = vi(t, r.placeholderNumber++);
        return `${e7.itemPrefix}${o3}${e7.itemSuffix}`;
      }).join(e7.itemSeparator)})`;
    case "parameterTupleList":
      return e7.value.map((i) => {
        let o3 = i.map(() => vi(t, r.placeholderNumber++)).join(e7.itemSeparator);
        return `${e7.itemPrefix}${o3}${e7.itemSuffix}`;
      }).join(e7.groupSeparator);
    default:
      M(n, "Invalid fragment type");
  }
}
__name(Bd, "Bd");
function vi(e7, t) {
  return e7.hasNumbering ? `${e7.prefix}${t}` : e7.prefix;
}
__name(vi, "vi");
function jd(e7, t, r) {
  return { sql: e7, args: t, argTypes: r };
}
__name(jd, "jd");
function Qd(e7) {
  return Pi(e7) || Si(e7);
}
__name(Qd, "Qd");
function* Ai(e7, t, r) {
  let n = 0;
  for (let i of e7) switch (i.type) {
    case "parameter": {
      if (n >= t.length) throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);
      yield { ...i, value: t[n], argType: r?.[n] }, n++;
      break;
    }
    case "stringChunk": {
      yield i;
      break;
    }
    case "parameterTuple": {
      if (n >= t.length) throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);
      let o3 = t[n];
      yield { ...i, value: Array.isArray(o3) ? o3 : [o3], argType: r?.[n] }, n++;
      break;
    }
    case "parameterTupleList": {
      if (n >= t.length) throw new Error(`Malformed query template. Fragments attempt to read over ${t.length} parameters.`);
      let o3 = t[n];
      if (!Array.isArray(o3)) throw new Error("Malformed query template. Tuple list expected.");
      if (o3.length === 0) throw new Error("Malformed query template. Tuple list cannot be empty.");
      for (let s of o3) if (!Array.isArray(s)) throw new Error("Malformed query template. Tuple expected.");
      yield { ...i, value: o3, argType: r?.[n] }, n++;
      break;
    }
  }
}
__name(Ai, "Ai");
function* nu(e7) {
  switch (e7.type) {
    case "parameter":
      yield e7.value;
      break;
    case "stringChunk":
      break;
    case "parameterTuple":
      yield* e7.value;
      break;
    case "parameterTupleList":
      for (let t of e7.value) yield* t;
      break;
  }
}
__name(nu, "nu");
function Jd(e7, t, r) {
  let n = 0, i = 0;
  for (let s of Ai(e7, t, void 0)) {
    let a3 = 0;
    for (let m3 of nu(s)) a3++;
    i = Math.max(i, a3), n += a3;
  }
  let o3 = [[]];
  for (let s of Ai(e7, t, void 0)) switch (s.type) {
    case "parameter": {
      for (let a3 of o3) a3.push(s.value);
      break;
    }
    case "stringChunk":
      break;
    case "parameterTuple": {
      let a3 = s.value.length, m3 = [];
      if (r && o3.length === 1 && a3 === i && n > r && n - a3 < r) {
        let f3 = r - (n - a3);
        m3 = Hd(s.value, f3);
      } else m3 = [s.value];
      o3 = o3.flatMap((f3) => m3.map((T3) => [...f3, T3]));
      break;
    }
    case "parameterTupleList": {
      let a3 = s.value.reduce((S3, v3) => S3 + v3.length, 0), m3 = [], f3 = [], T3 = 0;
      for (let S3 of s.value) r && o3.length === 1 && a3 === i && f3.length > 0 && n - a3 + T3 + S3.length > r && (m3.push(f3), f3 = [], T3 = 0), f3.push(S3), T3 += S3.length;
      f3.length > 0 && m3.push(f3), o3 = o3.flatMap((S3) => m3.map((v3) => [...S3, v3]));
      break;
    }
  }
  return o3;
}
__name(Jd, "Jd");
function Hd(e7, t) {
  let r = [];
  for (let n = 0; n < e7.length; n += t) r.push(e7.slice(n, n + t));
  return r;
}
__name(Hd, "Hd");
u();
l();
c();
p();
d();
function iu(e7) {
  return e7.rows.map((t) => t.reduce((r, n, i) => (r[e7.columnNames[i]] = n, r), {}));
}
__name(iu, "iu");
function ou(e7) {
  return { columns: e7.columnNames, types: e7.columnTypes.map((t) => Gd(t)), rows: e7.rows.map((t) => t.map((r, n) => nr(r, e7.columnTypes[n]))) };
}
__name(ou, "ou");
function nr(e7, t) {
  if (e7 === null) return null;
  switch (t) {
    case k.Int32:
      switch (typeof e7) {
        case "number":
          return Math.trunc(e7);
        case "string":
          return Math.trunc(Number(e7));
        default:
          throw new Error(`Cannot serialize value of type ${typeof e7} as Int32`);
      }
    case k.Int32Array:
      if (!Array.isArray(e7)) throw new Error(`Cannot serialize value of type ${typeof e7} as Int32Array`);
      return e7.map((r) => nr(r, k.Int32));
    case k.Int64:
      switch (typeof e7) {
        case "number":
          return BigInt(Math.trunc(e7));
        case "string":
          return e7;
        default:
          throw new Error(`Cannot serialize value of type ${typeof e7} as Int64`);
      }
    case k.Int64Array:
      if (!Array.isArray(e7)) throw new Error(`Cannot serialize value of type ${typeof e7} as Int64Array`);
      return e7.map((r) => nr(r, k.Int64));
    case k.Json:
      switch (typeof e7) {
        case "string":
          return JSON.parse(e7);
        default:
          throw new Error(`Cannot serialize value of type ${typeof e7} as Json`);
      }
    case k.JsonArray:
      if (!Array.isArray(e7)) throw new Error(`Cannot serialize value of type ${typeof e7} as JsonArray`);
      return e7.map((r) => nr(r, k.Json));
    case k.Boolean:
      switch (typeof e7) {
        case "boolean":
          return e7;
        case "string":
          return e7 === "true" || e7 === "1";
        case "number":
          return e7 === 1;
        default:
          throw new Error(`Cannot serialize value of type ${typeof e7} as Boolean`);
      }
    case k.BooleanArray:
      if (!Array.isArray(e7)) throw new Error(`Cannot serialize value of type ${typeof e7} as BooleanArray`);
      return e7.map((r) => nr(r, k.Boolean));
    default:
      return e7;
  }
}
__name(nr, "nr");
function Gd(e7) {
  switch (e7) {
    case k.Int32:
      return "int";
    case k.Int64:
      return "bigint";
    case k.Float:
      return "float";
    case k.Double:
      return "double";
    case k.Text:
      return "string";
    case k.Enum:
      return "enum";
    case k.Bytes:
      return "bytes";
    case k.Boolean:
      return "bool";
    case k.Character:
      return "char";
    case k.Numeric:
      return "decimal";
    case k.Json:
      return "json";
    case k.Uuid:
      return "uuid";
    case k.DateTime:
      return "datetime";
    case k.Date:
      return "date";
    case k.Time:
      return "time";
    case k.Int32Array:
      return "int-array";
    case k.Int64Array:
      return "bigint-array";
    case k.FloatArray:
      return "float-array";
    case k.DoubleArray:
      return "double-array";
    case k.TextArray:
      return "string-array";
    case k.EnumArray:
      return "string-array";
    case k.BytesArray:
      return "bytes-array";
    case k.BooleanArray:
      return "bool-array";
    case k.CharacterArray:
      return "char-array";
    case k.NumericArray:
      return "decimal-array";
    case k.JsonArray:
      return "json-array";
    case k.UuidArray:
      return "uuid-array";
    case k.DateTimeArray:
      return "datetime-array";
    case k.DateArray:
      return "date-array";
    case k.TimeArray:
      return "time-array";
    case k.UnknownNumber:
      return "unknown";
    case k.Set:
      return "string";
    default:
      M(e7, `Unexpected column type: ${e7}`);
  }
}
__name(Gd, "Gd");
u();
l();
c();
p();
d();
function su(e7, t, r) {
  if (!t.every((n) => Ri(e7, n))) {
    let n = zd(e7, r), i = Wd(r);
    throw new Z(n, i, r.context);
  }
}
__name(su, "su");
function Ri(e7, t) {
  switch (t.type) {
    case "rowCountEq":
      return Array.isArray(e7) ? e7.length === t.args : e7 === null ? t.args === 0 : t.args === 1;
    case "rowCountNeq":
      return Array.isArray(e7) ? e7.length !== t.args : e7 === null ? t.args !== 0 : t.args !== 1;
    case "affectedRowCountEq":
      return e7 === t.args;
    case "never":
      return false;
    default:
      M(t, `Unknown rule type: ${t.type}`);
  }
}
__name(Ri, "Ri");
function zd(e7, t) {
  switch (t.errorIdentifier) {
    case "RELATION_VIOLATION":
      return `The change you are trying to make would violate the required relation '${t.context.relation}' between the \`${t.context.modelA}\` and \`${t.context.modelB}\` models.`;
    case "MISSING_RECORD":
      return `An operation failed because it depends on one or more records that were required but not found. No record was found for ${t.context.operation}.`;
    case "MISSING_RELATED_RECORD": {
      let r = t.context.neededFor ? ` (needed to ${t.context.neededFor})` : "";
      return `An operation failed because it depends on one or more records that were required but not found. No '${t.context.model}' record${r} was found for ${t.context.operation} on ${t.context.relationType} relation '${t.context.relation}'.`;
    }
    case "INCOMPLETE_CONNECT_INPUT":
      return `An operation failed because it depends on one or more records that were required but not found. Expected ${t.context.expectedRows} records to be connected, found only ${Array.isArray(e7) ? e7.length : e7}.`;
    case "INCOMPLETE_CONNECT_OUTPUT":
      return `The required connected records were not found. Expected ${t.context.expectedRows} records to be connected after connect operation on ${t.context.relationType} relation '${t.context.relation}', found ${Array.isArray(e7) ? e7.length : e7}.`;
    case "RECORDS_NOT_CONNECTED":
      return `The records for relation \`${t.context.relation}\` between the \`${t.context.parent}\` and \`${t.context.child}\` models are not connected.`;
    default:
      M(t, `Unknown error identifier: ${t}`);
  }
}
__name(zd, "zd");
function Wd(e7) {
  switch (e7.errorIdentifier) {
    case "RELATION_VIOLATION":
      return "P2014";
    case "RECORDS_NOT_CONNECTED":
      return "P2017";
    case "INCOMPLETE_CONNECT_OUTPUT":
      return "P2018";
    case "MISSING_RECORD":
    case "MISSING_RELATED_RECORD":
    case "INCOMPLETE_CONNECT_INPUT":
      return "P2025";
    default:
      M(e7, `Unknown error identifier: ${e7}`);
  }
}
__name(Wd, "Wd");
var ir = class e4 {
  static {
    __name(this, "e");
  }
  #e;
  #t = new rn();
  #r;
  #n;
  #i;
  #o;
  #s;
  constructor({ onQuery: t, tracingHelper: r, serializer: n, rawSerializer: i, provider: o3, connectionInfo: s }) {
    this.#e = t, this.#r = r, this.#n = n, this.#i = i ?? n, this.#o = o3, this.#s = s;
  }
  static forSql(t) {
    return new e4({ onQuery: t.onQuery, tracingHelper: t.tracingHelper, serializer: iu, rawSerializer: ou, provider: t.provider, connectionInfo: t.connectionInfo });
  }
  async run(t, r) {
    let { value: n } = await this.interpretNode(t, { ...r, generators: this.#t.snapshot() }).catch((i) => xt(i));
    return n;
  }
  async interpretNode(t, r) {
    switch (t.type) {
      case "value":
        return { value: pe(t.args, r.scope, r.generators) };
      case "seq": {
        let n;
        for (let i of t.args) n = await this.interpretNode(i, r);
        return n ?? { value: void 0 };
      }
      case "get":
        return { value: r.scope[t.args.name] };
      case "let": {
        let n = Object.create(r.scope);
        for (let i of t.args.bindings) {
          let { value: o3 } = await this.interpretNode(i.expr, { ...r, scope: n });
          n[i.name] = o3;
        }
        return this.interpretNode(t.args.expr, { ...r, scope: n });
      }
      case "getFirstNonEmpty": {
        for (let n of t.args.names) {
          let i = r.scope[n];
          if (!au(i)) return { value: i };
        }
        return { value: [] };
      }
      case "concat": {
        let n = await Promise.all(t.args.map((i) => this.interpretNode(i, r).then((o3) => o3.value)));
        return { value: n.length > 0 ? n.reduce((i, o3) => i.concat(Ii(o3)), []) : [] };
      }
      case "sum": {
        let n = await Promise.all(t.args.map((i) => this.interpretNode(i, r).then((o3) => o3.value)));
        return { value: n.length > 0 ? n.reduce((i, o3) => Pe(i) + Pe(o3)) : 0 };
      }
      case "execute": {
        let n = Ci(t.args, r.scope, r.generators, this.#a()), i = 0;
        for (let o3 of n) {
          let s = uu(o3, r.sqlCommenter);
          i += await this.#l(s, r.queryable, () => r.queryable.executeRaw(ki(s)).catch((a3) => t.args.type === "rawSql" ? Xn(a3) : xt(a3)));
        }
        return { value: i };
      }
      case "query": {
        let n = Ci(t.args, r.scope, r.generators, this.#a()), i;
        for (let o3 of n) {
          let s = uu(o3, r.sqlCommenter), a3 = await this.#l(s, r.queryable, () => r.queryable.queryRaw(ki(s)).catch((m3) => t.args.type === "rawSql" ? Xn(m3) : xt(m3)));
          i === void 0 ? i = a3 : (i.rows.push(...a3.rows), i.lastInsertId = a3.lastInsertId);
        }
        return { value: t.args.type === "rawSql" ? this.#i(i) : this.#n(i), lastInsertId: i?.lastInsertId };
      }
      case "reverse": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args, r);
        return { value: Array.isArray(n) ? n.reverse() : n, lastInsertId: i };
      }
      case "unique": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args, r);
        if (!Array.isArray(n)) return { value: n, lastInsertId: i };
        if (n.length > 1) throw new Error(`Expected zero or one element, got ${n.length}`);
        return { value: n[0] ?? null, lastInsertId: i };
      }
      case "required": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args, r);
        if (au(n)) throw new Error("Required value is empty");
        return { value: n, lastInsertId: i };
      }
      case "mapField": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args.records, r);
        return { value: lu(n, t.args.field), lastInsertId: i };
      }
      case "join": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args.parent, r);
        if (n === null) return { value: null, lastInsertId: i };
        let o3 = await Promise.all(t.args.children.map(async (s) => ({ joinExpr: s, childRecords: (await this.interpretNode(s.child, r)).value })));
        return { value: Kd(n, o3, t.args.canAssumeStrictEquality), lastInsertId: i };
      }
      case "transaction": {
        if (!r.transactionManager.enabled) return this.interpretNode(t.args, r);
        let n = r.transactionManager.manager, i = await n.startInternalTransaction(), o3 = await n.getTransaction(i, "query");
        try {
          let s = await this.interpretNode(t.args, { ...r, queryable: o3 });
          return await n.commitTransaction(i.id), s;
        } catch (s) {
          throw await n.rollbackTransaction(i.id), s;
        }
      }
      case "dataMap": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r);
        return { value: Zs(n, t.args.structure, t.args.enums), lastInsertId: i };
      }
      case "validate": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r);
        return su(n, t.args.rules, t.args), { value: n, lastInsertId: i };
      }
      case "if": {
        let { value: n } = await this.interpretNode(t.args.value, r);
        return Ri(n, t.args.rule) ? await this.interpretNode(t.args.then, r) : await this.interpretNode(t.args.else, r);
      }
      case "unit":
        return { value: void 0 };
      case "diff": {
        let { value: n } = await this.interpretNode(t.args.from, r), { value: i } = await this.interpretNode(t.args.to, r), o3 = /* @__PURE__ */ __name((a3) => a3 !== null ? vt(or(a3), t.args.fields) : null, "o"), s = new Set(Ii(i).map(o3));
        return { value: Ii(n).filter((a3) => !s.has(o3(a3))) };
      }
      case "process": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r), o3 = ki(t.args.operations);
        return cu(o3, r.scope, r.generators), { value: nn(n, o3), lastInsertId: i };
      }
      case "initializeRecord": {
        let { lastInsertId: n } = await this.interpretNode(t.args.expr, r), i = {};
        for (let [o3, s] of Object.entries(t.args.fields)) i[o3] = Yd(s, n, r.scope, r.generators);
        return { value: i, lastInsertId: n };
      }
      case "mapRecord": {
        let { value: n, lastInsertId: i } = await this.interpretNode(t.args.expr, r), o3 = n === null ? {} : or(n);
        for (let [s, a3] of Object.entries(t.args.fields)) o3[s] = Xd(a3, o3[s], r.scope, r.generators);
        return { value: o3, lastInsertId: i };
      }
      default:
        M(t, `Unexpected node type: ${t.type}`);
    }
  }
  #a() {
    return this.#s?.maxBindValues !== void 0 ? this.#s.maxBindValues : this.#u();
  }
  #u() {
    if (this.#o !== void 0) switch (this.#o) {
      case "cockroachdb":
      case "postgres":
      case "postgresql":
      case "prisma+postgres":
        return 32766;
      case "mysql":
        return 65535;
      case "sqlite":
        return 999;
      case "sqlserver":
        return 2098;
      case "mongodb":
        return;
      default:
        M(this.#o, `Unexpected provider: ${this.#o}`);
    }
  }
  #l(t, r, n) {
    return zr({ query: t, execute: n, provider: this.#o ?? r.provider, tracingHelper: this.#r, onQuery: this.#e });
  }
};
function au(e7) {
  return Array.isArray(e7) ? e7.length === 0 : e7 == null;
}
__name(au, "au");
function Ii(e7) {
  return Array.isArray(e7) ? e7 : [e7];
}
__name(Ii, "Ii");
function Pe(e7) {
  if (typeof e7 == "number") return e7;
  if (typeof e7 == "string") return Number(e7);
  throw new Error(`Expected number, got ${typeof e7}`);
}
__name(Pe, "Pe");
function or(e7) {
  if (typeof e7 == "object" && e7 !== null) return e7;
  throw new Error(`Expected object, got ${typeof e7}`);
}
__name(or, "or");
function lu(e7, t) {
  return Array.isArray(e7) ? e7.map((r) => lu(r, t)) : typeof e7 == "object" && e7 !== null ? e7[t] ?? null : e7;
}
__name(lu, "lu");
function Kd(e7, t, r) {
  for (let { joinExpr: n, childRecords: i } of t) {
    let o3 = n.on.map(([T3]) => T3), s = n.on.map(([, T3]) => T3), a3 = {}, m3 = Array.isArray(e7) ? e7 : [e7];
    for (let T3 of m3) {
      let S3 = or(T3), v3 = vt(S3, o3);
      a3[v3] || (a3[v3] = []), a3[v3].push(S3), n.isRelationUnique ? S3[n.parentField] = null : S3[n.parentField] = [];
    }
    let f3 = r ? void 0 : Zd(m3, o3);
    for (let T3 of Array.isArray(i) ? i : [i]) {
      if (T3 === null) continue;
      let S3 = vt(or(T3), s, f3);
      for (let v3 of a3[S3] ?? []) n.isRelationUnique ? v3[n.parentField] = T3 : v3[n.parentField].push(T3);
    }
  }
  return e7;
}
__name(Kd, "Kd");
function Zd(e7, t) {
  function r(o3) {
    switch (o3) {
      case "number":
        return Number;
      case "string":
        return String;
      case "boolean":
        return Boolean;
      case "bigint":
        return BigInt;
      default:
        return;
    }
  }
  __name(r, "r");
  let n = Array.from({ length: t.length }), i = 0;
  for (let o3 of e7) {
    let s = or(o3);
    for (let [a3, m3] of t.entries()) if (s[m3] !== null && n[a3] === void 0) {
      let f3 = r(typeof s[m3]);
      f3 !== void 0 && (n[a3] = f3), i++;
    }
    if (i === t.length) break;
  }
  return n;
}
__name(Zd, "Zd");
function Yd(e7, t, r, n) {
  switch (e7.type) {
    case "value":
      return pe(e7.value, r, n);
    case "lastInsertId":
      return t;
    default:
      M(e7, `Unexpected field initializer type: ${e7.type}`);
  }
}
__name(Yd, "Yd");
function Xd(e7, t, r, n) {
  switch (e7.type) {
    case "set":
      return pe(e7.value, r, n);
    case "add":
      return Pe(t) + Pe(pe(e7.value, r, n));
    case "subtract":
      return Pe(t) - Pe(pe(e7.value, r, n));
    case "multiply":
      return Pe(t) * Pe(pe(e7.value, r, n));
    case "divide": {
      let i = Pe(t), o3 = Pe(pe(e7.value, r, n));
      return o3 === 0 ? null : i / o3;
    }
    default:
      M(e7, `Unexpected field operation type: ${e7.type}`);
  }
}
__name(Xd, "Xd");
function uu(e7, t) {
  if (!t || t.plugins.length === 0) return e7;
  let r = Ys(t.plugins, { query: t.queryInfo, sql: e7.sql });
  return r ? { ...e7, sql: Xs(e7.sql, r) } : e7;
}
__name(uu, "uu");
function cu(e7, t, r) {
  let n = e7.pagination?.cursor;
  if (n) for (let [i, o3] of Object.entries(n)) n[i] = pe(o3, t, r);
  for (let i of Object.values(e7.nested)) cu(i, t, r);
}
__name(cu, "cu");
function ki(e7) {
  return ce(e7);
}
__name(ki, "ki");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function pu(e7) {
  return new Oi(e7).deserialize();
}
__name(pu, "pu");
function em(e7) {
  return g.from(e7, "base64url");
}
__name(em, "em");
var Oi = class {
  static {
    __name(this, "Oi");
  }
  #e;
  #t;
  #r = 0;
  constructor(t) {
    this.#e = t;
    let r = em(t.graph);
    this.#t = new DataView(r.buffer, r.byteOffset, r.byteLength);
  }
  deserialize() {
    let { inputNodeCount: t, outputNodeCount: r, rootCount: n } = this.#a(), i = this.#u(t), o3 = this.#l(r), s = this.#p(n);
    return { strings: this.#e.strings, inputNodes: i, outputNodes: o3, roots: s };
  }
  #n() {
    let t = 0, r = 0, n;
    do
      n = this.#t.getUint8(this.#r++), t |= (n & 127) << r, r += 7;
    while (n >= 128);
    return t;
  }
  #i() {
    let t = this.#n();
    return t === 0 ? void 0 : t - 1;
  }
  #o() {
    let t = this.#t.getUint8(this.#r);
    return this.#r += 1, t;
  }
  #s() {
    let t = this.#t.getUint16(this.#r, true);
    return this.#r += 2, t;
  }
  #a() {
    let t = this.#n(), r = this.#n(), n = this.#n();
    return { inputNodeCount: t, outputNodeCount: r, rootCount: n };
  }
  #u(t) {
    let r = [];
    for (let n = 0; n < t; n++) {
      let i = this.#n(), o3 = {};
      for (let s = 0; s < i; s++) {
        let a3 = this.#n(), m3 = this.#s(), f3 = this.#i(), T3 = this.#i(), v3 = { flags: this.#o() };
        m3 !== 0 && (v3.scalarMask = m3), f3 !== void 0 && (v3.childNodeId = f3), T3 !== void 0 && (v3.enumNameIndex = T3), o3[a3] = v3;
      }
      r.push({ edges: o3 });
    }
    return r;
  }
  #l(t) {
    let r = [];
    for (let n = 0; n < t; n++) {
      let i = this.#n(), o3 = {};
      for (let s = 0; s < i; s++) {
        let a3 = this.#n(), m3 = this.#i(), f3 = this.#i(), T3 = {};
        m3 !== void 0 && (T3.argsNodeId = m3), f3 !== void 0 && (T3.outputNodeId = f3), o3[a3] = T3;
      }
      r.push({ edges: o3 });
    }
    return r;
  }
  #p(t) {
    let r = {};
    for (let n = 0; n < t; n++) {
      let i = this.#n(), o3 = this.#i(), s = this.#i(), a3 = this.#e.strings[i], m3 = {};
      o3 !== void 0 && (m3.argsNodeId = o3), s !== void 0 && (m3.outputNodeId = s), r[a3] = m3;
    }
    return r;
  }
};
var sr = class e5 {
  static {
    __name(this, "e");
  }
  #e;
  #t;
  #r;
  constructor(t, r) {
    this.#e = t, this.#r = r, this.#t = /* @__PURE__ */ new Map();
    for (let n = 0; n < t.strings.length; n++) this.#t.set(t.strings[n], n);
  }
  static deserialize(t, r) {
    let n = pu(t);
    return new e5(n, r);
  }
  static fromData(t, r) {
    return new e5(t, r);
  }
  root(t) {
    let r = this.#e.roots[t];
    if (r) return { argsNodeId: r.argsNodeId, outputNodeId: r.outputNodeId };
  }
  inputNode(t) {
    if (!(t === void 0 || t < 0 || t >= this.#e.inputNodes.length)) return { id: t };
  }
  outputNode(t) {
    if (!(t === void 0 || t < 0 || t >= this.#e.outputNodes.length)) return { id: t };
  }
  inputEdge(t, r) {
    if (!t) return;
    let n = this.#e.inputNodes[t.id];
    if (!n) return;
    let i = this.#t.get(r);
    if (i === void 0) return;
    let o3 = n.edges[i];
    if (o3) return { flags: o3.flags, childNodeId: o3.childNodeId, scalarMask: o3.scalarMask ?? 0, enumNameIndex: o3.enumNameIndex };
  }
  outputEdge(t, r) {
    if (!t) return;
    let n = this.#e.outputNodes[t.id];
    if (!n) return;
    let i = this.#t.get(r);
    if (i === void 0) return;
    let o3 = n.edges[i];
    if (o3) return { argsNodeId: o3.argsNodeId, outputNodeId: o3.outputNodeId };
  }
  enumValues(t) {
    if (t?.enumNameIndex === void 0) return;
    let r = this.#e.strings[t.enumNameIndex];
    if (r) return this.#r(r);
  }
  getString(t) {
    return this.#e.strings[t];
  }
};
var Se = { ParamScalar: 1, ParamEnum: 2, ParamListScalar: 4, ParamListEnum: 8, ListObject: 16, Object: 32 };
var X = { String: 1, Int: 2, BigInt: 4, Float: 8, Decimal: 16, Boolean: 32, DateTime: 64, Json: 128, Bytes: 256 };
function ve(e7, t) {
  return (e7.flags & t) !== 0;
}
__name(ve, "ve");
function Ve(e7) {
  return e7.scalarMask;
}
__name(Ve, "Ve");
u();
l();
c();
p();
d();
var tm = /* @__PURE__ */ new Set(["DateTime", "Decimal", "BigInt", "Bytes", "Json", "Raw"]);
function on(e7) {
  if (e7 == null) return { kind: "null" };
  if (typeof e7 == "string") return { kind: "primitive", value: e7 };
  if (typeof e7 == "number") return { kind: "primitive", value: e7 };
  if (typeof e7 == "boolean") return { kind: "primitive", value: e7 };
  if (Array.isArray(e7)) return { kind: "array", items: e7 };
  if (typeof e7 == "object") {
    let t = e7;
    if ("$type" in t && typeof t.$type == "string") {
      let r = t.$type;
      return tm.has(r) ? { kind: "taggedScalar", tag: r, value: t.value } : { kind: "structural", value: t.value };
    }
    return { kind: "object", entries: t };
  }
  return { kind: "structural", value: e7 };
}
__name(on, "on");
function du(e7) {
  return typeof e7 == "object" && e7 !== null && !Array.isArray(e7) && !("$type" in e7);
}
__name(du, "du");
function mu(e7) {
  return typeof e7 == "object" && e7 !== null && "$type" in e7 && typeof e7.$type == "string";
}
__name(mu, "mu");
function Ni(e7, t) {
  let r = new sn(t), n = e7.modelName ? `${e7.modelName}.${e7.action}` : e7.action, i = t.root(n);
  return { parameterizedQuery: { ...e7, query: r.parameterizeFieldSelection(e7.query, i?.argsNodeId, i?.outputNodeId) }, placeholderValues: r.getPlaceholderValues() };
}
__name(Ni, "Ni");
function Di(e7, t) {
  let r = new sn(t), n = [];
  for (let i = 0; i < e7.batch.length; i++) {
    let o3 = e7.batch[i], s = o3.modelName ? `${o3.modelName}.${o3.action}` : o3.action, a3 = t.root(s);
    n.push({ ...o3, query: r.parameterizeFieldSelection(o3.query, a3?.argsNodeId, a3?.outputNodeId) });
  }
  return { parameterizedBatch: { ...e7, batch: n }, placeholderValues: r.getPlaceholderValues() };
}
__name(Di, "Di");
var sn = class {
  static {
    __name(this, "sn");
  }
  #e;
  #t = /* @__PURE__ */ new Map();
  #r = /* @__PURE__ */ new Map();
  #n = 1;
  constructor(t) {
    this.#e = t;
  }
  getPlaceholderValues() {
    return Object.fromEntries(this.#t);
  }
  #i(t, r) {
    let n = nm(t, r), i = this.#r.get(n);
    if (i !== void 0) return fu(i, r);
    let o3 = `%${this.#n++}`;
    return this.#r.set(n, o3), this.#t.set(o3, t), fu(o3, r);
  }
  parameterizeFieldSelection(t, r, n) {
    let i = this.#e.inputNode(r), o3 = this.#e.outputNode(n), s = { ...t };
    return t.arguments && t.arguments.$type !== "Raw" && (s.arguments = this.#o(t.arguments, i)), t.selection && (s.selection = this.#c(t.selection, o3)), s;
  }
  #o(t, r) {
    if (!r) return t;
    let n = {};
    for (let [i, o3] of Object.entries(t)) {
      let s = this.#e.inputEdge(r, i);
      s ? n[i] = this.#s(o3, s) : n[i] = o3;
    }
    return n;
  }
  #s(t, r) {
    let n = on(t);
    switch (n.kind) {
      case "null":
        return t;
      case "structural":
        return t;
      case "primitive":
        return this.#a(n.value, r);
      case "taggedScalar":
        return this.#u(t, n.tag, r);
      case "array":
        return this.#l(n.items, t, r);
      case "object":
        return this.#p(n.entries, r);
      default:
        throw new Error(`Unknown value kind ${n.kind}`);
    }
  }
  #a(t, r) {
    if (ve(r, Se.ParamEnum) && r.enumNameIndex !== void 0 && typeof t == "string") {
      let o3 = this.#e.enumValues(r);
      if (o3 && Object.hasOwn(o3, t)) {
        let s = { type: "Enum" };
        return this.#i(o3[t], s);
      }
    }
    if (!ve(r, Se.ParamScalar)) return t;
    let n = Ve(r);
    if (n === 0) return t;
    let i = Mi(t);
    return yu(i, n) ? (n & X.Json && (t = JSON.stringify(t)), this.#i(t, i)) : t;
  }
  #u(t, r, n) {
    if (!ve(n, Se.ParamScalar)) return t;
    let i = Ve(n);
    if (i === 0 || !wu(r, i)) return t;
    let o3 = hu(t.$type), s = bu(t);
    return this.#i(s, o3);
  }
  #l(t, r, n) {
    if (ve(n, Se.ParamScalar) && Ve(n) & X.Json) {
      let i = fe(Te(t)), o3 = { type: "Json" };
      return this.#i(i, o3);
    }
    if (ve(n, Se.ParamEnum)) {
      let i = this.#e.enumValues(n);
      if (i && t.every((o3) => typeof o3 == "string" && Object.hasOwn(i, o3))) {
        let o3 = { type: "List", inner: { type: "Enum" } };
        return this.#i(t, o3);
      }
    }
    if (ve(n, Se.ParamListScalar) && t.every((o3) => um(o3, n)) && t.length > 0) {
      let o3 = t.map((m3) => lm(m3)), a3 = { type: "List", inner: sm(t) };
      return this.#i(o3, a3);
    }
    if (ve(n, Se.ListObject)) {
      let i = this.#e.inputNode(n.childNodeId);
      if (i) return t.map((o3) => du(o3) ? this.#o(o3, i) : o3);
    }
    return r;
  }
  #p(t, r) {
    if (ve(r, Se.Object)) {
      let i = this.#e.inputNode(r.childNodeId);
      if (i) return this.#o(t, i);
    }
    if (Ve(r) & X.Json) {
      let i = fe(Te(t)), o3 = { type: "Json" };
      return this.#i(i, o3);
    }
    return t;
  }
  #c(t, r) {
    if (!t || !r) return t;
    let n = {};
    for (let [i, o3] of Object.entries(t)) {
      if (i === "$scalars" || i === "$composites" || typeof o3 == "boolean") {
        n[i] = o3;
        continue;
      }
      let s = this.#e.outputEdge(r, i);
      if (s) {
        let a3 = o3, m3 = this.#e.inputNode(s.argsNodeId), f3 = this.#e.outputNode(s.outputNodeId), T3 = { selection: a3.selection ? this.#c(a3.selection, f3) : {} };
        a3.arguments && (T3.arguments = this.#o(a3.arguments, m3)), n[i] = T3;
      } else n[i] = o3;
    }
    return n;
  }
};
function fu(e7, t) {
  return { $type: "Param", value: { name: e7, ...t } };
}
__name(fu, "fu");
function gu(e7) {
  return e7.type === "List" ? `List<${gu(e7.inner)}>` : e7.type;
}
__name(gu, "gu");
function rm(e7) {
  return ArrayBuffer.isView(e7) ? g.from(e7.buffer, e7.byteOffset, e7.byteLength).toString("base64") : JSON.stringify(e7);
}
__name(rm, "rm");
function nm(e7, t) {
  let r = gu(t), n = rm(e7);
  return `${r}:${n}`;
}
__name(nm, "nm");
var im = 2 ** 31 - 1;
var om = -(2 ** 31);
function Mi(e7) {
  switch (typeof e7) {
    case "boolean":
      return { type: "Boolean" };
    case "number":
      return Number.isInteger(e7) ? om <= e7 && e7 <= im ? { type: "Int" } : { type: "BigInt" } : { type: "Float" };
    case "string":
      return { type: "String" };
    default:
      throw new Error("unreachable");
  }
}
__name(Mi, "Mi");
function yu({ type: e7 }, t) {
  switch (e7) {
    case "Boolean":
      return (t & X.Boolean) !== 0;
    case "Int":
      return (t & (X.Int | X.BigInt | X.Float)) !== 0;
    case "BigInt":
      return (t & X.BigInt) !== 0;
    case "Float":
      return (t & X.Float) !== 0;
    case "String":
      return (t & X.String) !== 0;
    default:
      return false;
  }
}
__name(yu, "yu");
function hu(e7) {
  switch (e7) {
    case "BigInt":
    case "Bytes":
    case "DateTime":
    case "Json":
      return { type: e7 };
    case "Decimal":
      return { type: "Float" };
    default:
      return;
  }
}
__name(hu, "hu");
function sm(e7) {
  let t = { type: "Any" };
  for (let r of e7) {
    let n = on(r), i;
    switch (n.kind) {
      case "primitive":
        i = Mi(n.value);
        break;
      case "taggedScalar":
        i = hu(n.tag) ?? { type: "Any" };
        break;
      default:
        return { type: "Any" };
    }
    t = am(t, i);
  }
  return t;
}
__name(sm, "sm");
function am(e7, t) {
  if (e7.type === "Any") return t;
  if (t.type === "Any" || e7.type === t.type) return e7;
  let r = { Int: 0, BigInt: 1, Float: 2 }, n = r[e7.type], i = r[t.type];
  return n !== void 0 && i !== void 0 ? n >= i ? e7 : t : { type: "Any" };
}
__name(am, "am");
function wu(e7, t) {
  switch (e7) {
    case "DateTime":
      return (t & X.DateTime) !== 0;
    case "Decimal":
      return (t & X.Decimal) !== 0;
    case "BigInt":
      return (t & X.BigInt) !== 0;
    case "Bytes":
      return (t & X.Bytes) !== 0;
    case "Json":
      return (t & X.Json) !== 0;
    default:
      return false;
  }
}
__name(wu, "wu");
function um(e7, t) {
  let r = on(e7);
  switch (r.kind) {
    case "structural":
      return false;
    case "null":
      return false;
    case "primitive": {
      let n = Mi(r.value), i = Ve(t);
      return i !== 0 && yu(n, i);
    }
    case "taggedScalar": {
      let n = Ve(t);
      return n !== 0 && wu(r.tag, n);
    }
    default:
      return false;
  }
}
__name(um, "um");
function lm(e7) {
  return mu(e7) ? bu(e7) : e7;
}
__name(lm, "lm");
function bu(e7) {
  return e7.value;
}
__name(bu, "bu");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
async function cm() {
  return globalThis.crypto ?? await Promise.resolve().then(() => (Je(), On));
}
__name(cm, "cm");
async function xu() {
  return (await cm()).randomUUID();
}
__name(xu, "xu");
u();
l();
c();
p();
d();
async function Eu(e7, t) {
  return new Promise((r) => {
    e7.addEventListener(t, r, { once: true });
  });
}
__name(Eu, "Eu");
u();
l();
c();
p();
d();
var ie = class extends Z {
  static {
    __name(this, "ie");
  }
  name = "TransactionManagerError";
  constructor(t, r) {
    super("Transaction API error: " + t, "P2028", r);
  }
};
var Ye = class extends ie {
  static {
    __name(this, "Ye");
  }
  constructor() {
    super("Transaction not found. Transaction ID is invalid, refers to an old closed transaction Prisma doesn't have information about anymore, or was obtained before disconnecting.");
  }
};
var an = class extends ie {
  static {
    __name(this, "an");
  }
  constructor(t) {
    super(`Transaction already closed: A ${t} cannot be executed on a committed transaction.`);
  }
};
var un = class extends ie {
  static {
    __name(this, "un");
  }
  constructor(t) {
    super(`Transaction already closed: A ${t} cannot be executed on a transaction that was rolled back.`);
  }
};
var ln2 = class extends ie {
  static {
    __name(this, "ln");
  }
  constructor() {
    super("Unable to start a transaction in the given time.");
  }
};
var cn = class extends ie {
  static {
    __name(this, "cn");
  }
  constructor(t, { timeout: r, timeTaken: n }) {
    super(`A ${t} cannot be executed on an expired transaction. The timeout for this transaction was ${r} ms, however ${n} ms passed since the start of the transaction. Consider increasing the interactive transaction timeout or doing less work in the transaction.`, { operation: t, timeout: r, timeTaken: n });
  }
};
var Ae = class extends ie {
  static {
    __name(this, "Ae");
  }
  constructor(t) {
    super(`Internal Consistency Error: ${t}`);
  }
};
var pn = class extends ie {
  static {
    __name(this, "pn");
  }
  constructor(t) {
    super(`Invalid isolation level: ${t}`, { isolationLevel: t });
  }
};
var pm = 100;
var At = ee("prisma:client:transactionManager");
var dm = /* @__PURE__ */ __name(() => ({ sql: "COMMIT", args: [], argTypes: [] }), "dm");
var mm = /* @__PURE__ */ __name(() => ({ sql: "ROLLBACK", args: [], argTypes: [] }), "mm");
var fm = /* @__PURE__ */ __name(() => ({ sql: '-- Implicit "COMMIT" query via underlying driver', args: [], argTypes: [] }), "fm");
var gm = /* @__PURE__ */ __name(() => ({ sql: '-- Implicit "ROLLBACK" query via underlying driver', args: [], argTypes: [] }), "gm");
var ar = class {
  static {
    __name(this, "ar");
  }
  transactions = /* @__PURE__ */ new Map();
  closedTransactions = [];
  driverAdapter;
  transactionOptions;
  tracingHelper;
  #e;
  #t;
  constructor({ driverAdapter: t, transactionOptions: r, tracingHelper: n, onQuery: i, provider: o3 }) {
    this.driverAdapter = t, this.transactionOptions = r, this.tracingHelper = n, this.#e = i, this.#t = o3;
  }
  async startInternalTransaction(t) {
    let r = t !== void 0 ? this.#m(t) : {};
    return await this.tracingHelper.runInChildSpan("start_transaction", () => this.#r(r));
  }
  async startTransaction(t) {
    let r = t !== void 0 ? this.#m(t) : this.transactionOptions;
    return await this.tracingHelper.runInChildSpan("start_transaction", () => this.#r(r));
  }
  async #r(t) {
    if (t.newTxId) return await this.#p(t.newTxId, "start", async (s) => {
      if (s.status !== "running") throw new Ae(`Transaction in invalid state ${s.status} when starting a nested transaction.`);
      if (!s.transaction) throw new Ae("Transaction missing underlying driver transaction when starting a nested transaction.");
      s.depth += 1;
      let a3 = this.#i(s);
      s.savepoints.push(a3);
      try {
        await this.#o(s.transaction)(a3);
      } catch (m3) {
        throw s.depth -= 1, s.savepoints.pop(), m3;
      }
      return { id: s.id };
    });
    let r = { id: await xu(), status: "waiting", timer: void 0, timeout: t.timeout, startedAt: Date.now(), transaction: void 0, operationQueue: Promise.resolve(), depth: 1, savepoints: [], savepointCounter: 0 }, n = new AbortController(), i = Tu(() => n.abort(), t.maxWait);
    i?.unref?.();
    let o3 = this.driverAdapter.startTransaction(t.isolationLevel).catch(xt);
    switch (r.transaction = await Promise.race([o3.finally(() => clearTimeout(i)), Eu(n.signal, "abort").then(() => {
    })]), this.transactions.set(r.id, r), r.status) {
      case "waiting":
        if (n.signal.aborted) throw o3.then((s) => s.rollback()).catch((s) => At("error in discarded transaction:", s)), await this.#d(r, "timed_out"), new ln2();
        return r.status = "running", r.timer = this.#l(r.id, t.timeout), { id: r.id };
      case "timed_out":
      case "running":
      case "committed":
      case "rolled_back":
        throw new Ae(`Transaction in invalid state ${r.status} although it just finished startup.`);
      default:
        M(r.status, "Unknown transaction status.");
    }
  }
  async commitTransaction(t) {
    return await this.tracingHelper.runInChildSpan("commit_transaction", async () => {
      await this.#p(t, "commit", async (r) => {
        if (r.depth > 1) {
          if (!r.transaction) throw new Ye();
          let n = r.savepoints.at(-1);
          if (!n) throw new Ae(`Missing savepoint for nested commit. Depth: ${r.depth}, transactionId: ${r.id}`);
          try {
            await this.#a(r.transaction, n);
          } finally {
            r.savepoints.pop(), r.depth -= 1;
          }
          return;
        }
        await this.#d(r, "committed");
      });
    });
  }
  async rollbackTransaction(t) {
    return await this.tracingHelper.runInChildSpan("rollback_transaction", async () => {
      await this.#p(t, "rollback", async (r) => {
        if (r.depth > 1) {
          if (!r.transaction) throw new Ye();
          let n = r.savepoints.at(-1);
          if (!n) throw new Ae(`Missing savepoint for nested rollback. Depth: ${r.depth}, transactionId: ${r.id}`);
          try {
            await this.#s(r.transaction)(n), await this.#a(r.transaction, n);
          } finally {
            r.savepoints.pop(), r.depth -= 1;
          }
          return;
        }
        await this.#d(r, "rolled_back");
      });
    });
  }
  async getTransaction(t, r) {
    let n = this.#n(t.id, r);
    if (n.status === "closing" && (await n.closing, n = this.#n(t.id, r)), !n.transaction) throw new Ye();
    return n.transaction;
  }
  #n(t, r) {
    let n = this.transactions.get(t);
    if (!n) {
      let i = this.closedTransactions.find((o3) => o3.id === t);
      if (i) switch (At("Transaction already closed.", { transactionId: t, status: i.status }), i.status) {
        case "closing":
        case "waiting":
        case "running":
          throw new Ae("Active transaction found in closed transactions list.");
        case "committed":
          throw new an(r);
        case "rolled_back":
          throw new un(r);
        case "timed_out":
          throw new cn(r, { timeout: i.timeout, timeTaken: Date.now() - i.startedAt });
      }
      else throw At("Transaction not found.", t), new Ye();
    }
    if (["committed", "rolled_back", "timed_out"].includes(n.status)) throw new Ae("Closed transaction found in active transactions map.");
    return n;
  }
  async cancelAllTransactions() {
    await Promise.allSettled([...this.transactions.values()].map((t) => this.#c(t, async () => {
      let r = this.transactions.get(t.id);
      r && await this.#d(r, "rolled_back");
    })));
  }
  #i(t) {
    return `prisma_sp_${t.savepointCounter++}`;
  }
  #o(t) {
    if (t.createSavepoint) return t.createSavepoint.bind(t);
    throw new ie(`Nested transactions are not supported by adapter "${t.adapterName}" (${t.provider}): createSavepoint is not implemented.`);
  }
  #s(t) {
    if (t.rollbackToSavepoint) return t.rollbackToSavepoint.bind(t);
    throw new ie(`Nested transactions are not supported by adapter "${t.adapterName}" (${t.provider}): rollbackToSavepoint is not implemented.`);
  }
  async #a(t, r) {
    t.releaseSavepoint && await t.releaseSavepoint(r);
  }
  #u(t) {
    At("Transaction already committed or rolled back when timeout happened.", t);
  }
  #l(t, r) {
    let n = Date.now(), i = Tu(async () => {
      At("Transaction timed out.", { transactionId: t, timeoutStartedAt: n, timeout: r });
      let o3 = this.transactions.get(t);
      if (!o3) {
        this.#u(t);
        return;
      }
      await this.#c(o3, async () => {
        let s = this.transactions.get(t);
        s && ["running", "waiting"].includes(s.status) ? await this.#d(s, "timed_out") : this.#u(t);
      });
    }, r);
    return i?.unref?.(), i;
  }
  async #p(t, r, n) {
    let i = this.#n(t, r);
    return await this.#c(i, async () => {
      let o3 = this.#n(t, r);
      return await n(o3);
    });
  }
  async #c(t, r) {
    let n = t.operationQueue, i;
    t.operationQueue = new Promise((o3) => {
      i = o3;
    }), await n;
    try {
      return await r();
    } finally {
      i();
    }
  }
  async #d(t, r) {
    let n = /* @__PURE__ */ __name(async () => {
      At("Closing transaction.", { transactionId: t.id, status: r });
      try {
        if (t.transaction && r === "committed") if (t.transaction.options.usePhantomQuery) await this.#f(fm(), t.transaction, () => t.transaction.commit());
        else {
          let i = dm();
          await this.#f(i, t.transaction, () => t.transaction.executeRaw(i)).then(() => t.transaction.commit(), (o3) => {
            let s = /* @__PURE__ */ __name(() => Promise.reject(o3), "s");
            return t.transaction.rollback().then(s, s);
          });
        }
        else if (t.transaction) if (t.transaction.options.usePhantomQuery) await this.#f(gm(), t.transaction, () => t.transaction.rollback());
        else {
          let i = mm();
          try {
            await this.#f(i, t.transaction, () => t.transaction.executeRaw(i));
          } finally {
            await t.transaction.rollback();
          }
        }
      } finally {
        t.status = r, clearTimeout(t.timer), t.timer = void 0, this.transactions.delete(t.id), this.closedTransactions.push(t), this.closedTransactions.length > pm && this.closedTransactions.shift();
      }
    }, "n");
    t.status === "closing" ? (await t.closing, this.#n(t.id, r === "committed" ? "commit" : "rollback")) : await Object.assign(t, { status: "closing", reason: r, closing: n() }).closing;
  }
  #m(t) {
    if (!t.timeout) throw new ie("timeout is required");
    if (!t.maxWait) throw new ie("maxWait is required");
    if (t.isolationLevel === "SNAPSHOT") throw new pn(t.isolationLevel);
    return { ...t, timeout: t.timeout, maxWait: t.maxWait };
  }
  #f(t, r, n) {
    return zr({ query: t, execute: n, provider: this.#t ?? r.provider, tracingHelper: this.tracingHelper, onQuery: this.#e });
  }
};
function Tu(e7, t) {
  return t !== void 0 ? setTimeout(e7, t) : void 0;
}
__name(Tu, "Tu");
var dn = "7.8.0";
u();
l();
c();
p();
d();
var Pu = { bigint: "bigint", date: "datetime", decimal: "decimal", bytes: "bytes" };
function vu(e7) {
  let t;
  try {
    t = JSON.parse(e7);
  } catch (i) {
    throw new Error(`Received invalid serialized parameters: ${i.message}`);
  }
  if (!Array.isArray(t)) throw new Error("Received invalid serialized parameters: expected an array");
  let r = t.map((i) => Au(i)), n = t.map((i) => hm(i));
  return { args: r, argTypes: n };
}
__name(vu, "vu");
function Au(e7) {
  if (Array.isArray(e7)) return e7.map((t) => Au(t));
  if (typeof e7 == "object" && e7 !== null && "prisma__value" in e7) {
    if (!("prisma__type" in e7)) throw new Error("Invalid serialized parameter, prisma__type should be present when prisma__value is present");
    return `${e7.prisma__value}`;
  }
  return typeof e7 == "object" && e7 !== null ? JSON.stringify(e7) : e7;
}
__name(Au, "Au");
function hm(e7) {
  return Array.isArray(e7) ? { scalarType: e7.length > 0 ? Su(e7[0]) : "unknown", arity: "list" } : { scalarType: Su(e7), arity: "scalar" };
}
__name(hm, "hm");
function Su(e7) {
  return typeof e7 == "object" && e7 !== null && "prisma__type" in e7 && typeof e7.prisma__type == "string" && e7.prisma__type in Pu ? Pu[e7.prisma__type] : typeof e7 == "number" ? "decimal" : typeof e7 == "string" ? "string" : "unknown";
}
__name(Su, "Su");
u();
l();
c();
p();
d();
function Cu(e7, t) {
  return { batch: e7, transaction: t?.kind === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
}
__name(Cu, "Cu");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Ru(e7) {
  return e7 ? e7.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`) : "";
}
__name(Ru, "Ru");
u();
l();
c();
p();
d();
function Iu(e7) {
  return e7.split(`
`).map((t) => t.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
}
__name(Iu, "Iu");
u();
l();
c();
p();
d();
var ku = qe($o());
function Ou({ title: e7, user: t = "prisma", repo: r = "prisma", template: n = "bug_report.yml", body: i }) {
  return (0, ku.default)({ user: t, repo: r, template: n, title: e7, body: i });
}
__name(Ou, "Ou");
function Nu({ version: e7, binaryTarget: t, title: r, description: n, engineVersion: i, database: o3, query: s }) {
  let a3 = Co(6e3 - (s?.length ?? 0)), m3 = Iu(st(a3)), f3 = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", T3 = st(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${y.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e7?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o3?.padEnd(19)}|

${f3}

## Logs
\`\`\`
${m3}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? Ru(s) : ""}
\`\`\`
`), S3 = Ou({ title: r, body: T3 });
  return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${wr(S3)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
}
__name(Nu, "Nu");
u();
l();
c();
p();
d();
var mn = class e6 {
  static {
    __name(this, "e");
  }
  #e;
  #t;
  #r;
  #n;
  #i;
  constructor(t, r, n) {
    this.#e = t, this.#t = r, this.#r = n, this.#n = r.getConnectionInfo?.(), this.#i = ir.forSql({ onQuery: this.#e.onQuery, tracingHelper: this.#e.tracingHelper, provider: this.#e.provider, connectionInfo: this.#n });
  }
  static async connect(t) {
    let r, n;
    try {
      r = await t.driverAdapterFactory.connect(), n = new ar({ driverAdapter: r, transactionOptions: t.transactionOptions, tracingHelper: t.tracingHelper, onQuery: t.onQuery, provider: t.provider });
    } catch (i) {
      throw await r?.dispose(), i;
    }
    return new e6(t, r, n);
  }
  getConnectionInfo() {
    let t = this.#n ?? { supportsRelationJoins: false };
    return Promise.resolve({ provider: this.#t.provider, connectionInfo: t });
  }
  async execute({ plan: t, placeholderValues: r, transaction: n, batchIndex: i, queryInfo: o3 }) {
    let s = n ? await this.#r.getTransaction(n, i !== void 0 ? "batch query" : "query") : this.#t;
    return await this.#i.run(t, { queryable: s, transactionManager: n ? { enabled: false } : { enabled: true, manager: this.#r }, scope: r, sqlCommenter: this.#e.sqlCommenters && { plugins: this.#e.sqlCommenters, queryInfo: o3 } });
  }
  async startTransaction(t) {
    return { ...await this.#r.startTransaction(t), payload: void 0 };
  }
  async commitTransaction(t) {
    await this.#r.commitTransaction(t.id);
  }
  async rollbackTransaction(t) {
    await this.#r.rollbackTransaction(t.id);
  }
  async disconnect() {
    try {
      await this.#r.cancelAllTransactions();
    } finally {
      await this.#t.dispose();
    }
  }
  apiKey() {
    return null;
  }
};
u();
l();
c();
p();
d();
var fn = class {
  static {
    __name(this, "fn");
  }
  #e;
  #t;
  #r;
  constructor(t = 1e3) {
    this.#e = /* @__PURE__ */ new Map(), this.#t = /* @__PURE__ */ new Map(), this.#r = t;
  }
  getSingle(t) {
    let r = this.#e.get(t);
    return r && (this.#e.delete(t), this.#e.set(t, r)), r;
  }
  setSingle(t, r) {
    if (this.#e.has(t)) {
      this.#e.delete(t), this.#e.set(t, r);
      return;
    }
    if (this.#e.size >= this.#r) {
      let n = this.#e.keys().next().value;
      n !== void 0 && this.#e.delete(n);
    }
    this.#e.set(t, r);
  }
  getBatch(t) {
    let r = this.#t.get(t);
    return r && (this.#t.delete(t), this.#t.set(t, r)), r;
  }
  setBatch(t, r) {
    if (this.#t.has(t)) {
      this.#t.delete(t), this.#t.set(t, r);
      return;
    }
    if (this.#t.size >= this.#r) {
      let n = this.#t.keys().next().value;
      n !== void 0 && this.#t.delete(n);
    }
    this.#t.set(t, r);
  }
  clear() {
    this.#e.clear(), this.#t.clear();
  }
  get size() {
    return this.#e.size + this.#t.size;
  }
  get singleCacheSize() {
    return this.#e.size;
  }
  get batchCacheSize() {
    return this.#t.size;
  }
};
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var gn = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function Du(e7, t, r) {
  let n = r || {}, i = n.encode || encodeURIComponent;
  if (typeof i != "function") throw new TypeError("option encode is invalid");
  if (!gn.test(e7)) throw new TypeError("argument name is invalid");
  let o3 = i(t);
  if (o3 && !gn.test(o3)) throw new TypeError("argument val is invalid");
  let s = e7 + "=" + o3;
  if (n.maxAge !== void 0 && n.maxAge !== null) {
    let a3 = n.maxAge - 0;
    if (Number.isNaN(a3) || !Number.isFinite(a3)) throw new TypeError("option maxAge is invalid");
    s += "; Max-Age=" + Math.floor(a3);
  }
  if (n.domain) {
    if (!gn.test(n.domain)) throw new TypeError("option domain is invalid");
    s += "; Domain=" + n.domain;
  }
  if (n.path) {
    if (!gn.test(n.path)) throw new TypeError("option path is invalid");
    s += "; Path=" + n.path;
  }
  if (n.expires) {
    if (!wm(n.expires) || Number.isNaN(n.expires.valueOf())) throw new TypeError("option expires is invalid");
    s += "; Expires=" + n.expires.toUTCString();
  }
  if (n.httpOnly && (s += "; HttpOnly"), n.secure && (s += "; Secure"), n.priority) switch (typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority) {
    case "low": {
      s += "; Priority=Low";
      break;
    }
    case "medium": {
      s += "; Priority=Medium";
      break;
    }
    case "high": {
      s += "; Priority=High";
      break;
    }
    default:
      throw new TypeError("option priority is invalid");
  }
  if (n.sameSite) switch (typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite) {
    case true: {
      s += "; SameSite=Strict";
      break;
    }
    case "lax": {
      s += "; SameSite=Lax";
      break;
    }
    case "strict": {
      s += "; SameSite=Strict";
      break;
    }
    case "none": {
      s += "; SameSite=None";
      break;
    }
    default:
      throw new TypeError("option sameSite is invalid");
  }
  return n.partitioned && (s += "; Partitioned"), s;
}
__name(Du, "Du");
function wm(e7) {
  return Object.prototype.toString.call(e7) === "[object Date]" || e7 instanceof Date;
}
__name(wm, "wm");
function Mu(e7, t) {
  let r = (e7 || "").split(";").filter((m3) => typeof m3 == "string" && !!m3.trim()), n = r.shift() || "", i = bm(n), o3 = i.name, s = i.value;
  try {
    s = t?.decode === false ? s : (t?.decode || decodeURIComponent)(s);
  } catch {
  }
  let a3 = { name: o3, value: s };
  for (let m3 of r) {
    let f3 = m3.split("="), T3 = (f3.shift() || "").trimStart().toLowerCase(), S3 = f3.join("=");
    switch (T3) {
      case "expires": {
        a3.expires = new Date(S3);
        break;
      }
      case "max-age": {
        a3.maxAge = Number.parseInt(S3, 10);
        break;
      }
      case "secure": {
        a3.secure = true;
        break;
      }
      case "httponly": {
        a3.httpOnly = true;
        break;
      }
      case "samesite": {
        a3.sameSite = S3;
        break;
      }
      default:
        a3[T3] = S3;
    }
  }
  return a3;
}
__name(Mu, "Mu");
function bm(e7) {
  let t = "", r = "", n = e7.split("=");
  return n.length > 1 ? (t = n.shift(), r = n.join("=")) : r = e7, { name: t, value: r };
}
__name(bm, "bm");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var yn = class extends Error {
  static {
    __name(this, "yn");
  }
  clientVersion;
  cause;
  constructor(t, r) {
    super(t), this.clientVersion = r.clientVersion, this.cause = r.cause;
  }
  get [Symbol.toStringTag]() {
    return this.name;
  }
};
var hn = class extends yn {
  static {
    __name(this, "hn");
  }
  isRetryable;
  constructor(t, r) {
    super(t, r), this.isRetryable = r.isRetryable ?? true;
  }
};
u();
l();
c();
p();
d();
function Lu(e7, t) {
  return { ...e7, isRetryable: t };
}
__name(Lu, "Lu");
var Xe = class extends hn {
  static {
    __name(this, "Xe");
  }
  name = "InvalidDatasourceError";
  code = "P6001";
  constructor(t, r) {
    super(t, Lu(r, false));
  }
};
Vt(Xe, "InvalidDatasourceError");
function _u(e7) {
  let t = { clientVersion: e7.clientVersion }, r;
  try {
    r = new URL(e7.accelerateUrl);
  } catch (m3) {
    let f3 = m3.message;
    throw new Xe(`Error validating \`accelerateUrl\`, the URL cannot be parsed, reason: ${f3}`, t);
  }
  let { protocol: n, searchParams: i } = r;
  if (n !== "prisma:" && n !== Tr) throw new Xe("Error validating `accelerateUrl`: the URL must start with the protocol `prisma://` or `prisma+postgres://`", t);
  let o3 = i.get("api_key");
  if (o3 === null || o3.length < 1) throw new Xe("Error validating `accelerateUrl`: the URL must contain a valid API key", t);
  let s = Nn(r) ? "http:" : "https:";
  y.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && r.searchParams.has("use_http") && (s = "http:");
  let a3 = new URL(r.href.replace(n, s));
  return { apiKey: o3, url: a3 };
}
__name(_u, "_u");
u();
l();
c();
p();
d();
var Fu = qe(No());
var wn = class {
  static {
    __name(this, "wn");
  }
  apiKey;
  tracingHelper;
  logLevel;
  logQueries;
  engineHash;
  constructor({ apiKey: t, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o3 }) {
    this.apiKey = t, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o3;
  }
  build({ traceparent: t, transactionId: r } = {}) {
    let n = { Accept: "application/json", Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json", "Prisma-Engine-Hash": this.engineHash, "Prisma-Engine-Version": Fu.enginesVersion };
    this.tracingHelper.isEnabled() && (n.traceparent = t ?? this.tracingHelper.getTraceParent()), r && (n["X-Transaction-Id"] = r);
    let i = this.#e();
    return i.length > 0 && (n["X-Capture-Telemetry"] = i.join(", ")), n;
  }
  #e() {
    let t = [];
    return this.tracingHelper.isEnabled() && t.push("tracing"), this.logLevel && t.push(this.logLevel), this.logQueries && t.push("query"), t;
  }
};
u();
l();
c();
p();
d();
function xm(e7) {
  return e7[0] * 1e3 + e7[1] / 1e6;
}
__name(xm, "xm");
function Li(e7) {
  return new Date(xm(e7));
}
__name(Li, "Li");
var $u = ee("prisma:client:clientEngine:remoteExecutor");
var bn = class {
  static {
    __name(this, "bn");
  }
  #e;
  #t;
  #r;
  #n;
  #i;
  #o;
  constructor(t) {
    this.#e = t.clientVersion, this.#n = t.logEmitter, this.#i = t.tracingHelper, this.#o = t.sqlCommenters;
    let { url: r, apiKey: n } = _u({ clientVersion: t.clientVersion, accelerateUrl: t.accelerateUrl });
    this.#r = new _i(r), this.#t = new wn({ apiKey: n, engineHash: t.clientVersion, logLevel: t.logLevel, logQueries: t.logQueries, tracingHelper: t.tracingHelper });
  }
  async getConnectionInfo() {
    return await this.#s({ path: "/connection-info", method: "GET" });
  }
  async execute({ plan: t, placeholderValues: r, batchIndex: n, model: i, operation: o3, transaction: s, customFetch: a3, queryInfo: m3 }) {
    let f3 = m3 && this.#o?.length ? Gr(this.#o, { query: m3 }) : void 0;
    return (await this.#s({ path: s ? `/transaction/${s.id}/query` : "/query", method: "POST", body: { model: i, operation: o3, plan: t, params: r, comments: f3 && Object.keys(f3).length > 0 ? f3 : void 0 }, batchRequestIdx: n, fetch: a3 })).data;
  }
  async startTransaction(t) {
    return { ...await this.#s({ path: "/transaction/start", method: "POST", body: t }), payload: void 0 };
  }
  async commitTransaction(t) {
    await this.#s({ path: `/transaction/${t.id}/commit`, method: "POST" });
  }
  async rollbackTransaction(t) {
    await this.#s({ path: `/transaction/${t.id}/rollback`, method: "POST" });
  }
  disconnect() {
    return Promise.resolve();
  }
  apiKey() {
    return this.#t.apiKey;
  }
  async #s({ path: t, method: r, body: n, fetch: i = globalThis.fetch, batchRequestIdx: o3 }) {
    let s = await this.#r.request({ method: r, path: t, headers: this.#t.build(), body: n, fetch: i });
    s.ok || await this.#a(s, o3);
    let a3 = await s.json();
    return typeof a3.extensions == "object" && a3.extensions !== null && this.#u(a3.extensions), a3;
  }
  async #a(t, r) {
    let n = t.headers.get("Prisma-Error-Code"), i = await t.text(), o3, s = i;
    try {
      o3 = JSON.parse(i);
    } catch {
      o3 = {};
    }
    typeof o3.code == "string" && (n = o3.code), typeof o3.error == "string" ? s = o3.error : typeof o3.message == "string" ? s = o3.message : typeof o3.InvalidRequestError == "object" && o3.InvalidRequestError !== null && typeof o3.InvalidRequestError.reason == "string" && (s = o3.InvalidRequestError.reason), s = s || `HTTP ${t.status}: ${t.statusText}`;
    let a3 = typeof o3.meta == "object" && o3.meta !== null ? o3.meta : o3;
    throw new PrismaClientKnownRequestError(s, { clientVersion: this.#e, code: n ?? "P6000", batchRequestIdx: r, meta: a3 });
  }
  #u(t) {
    if (t.logs) for (let r of t.logs) this.#l(r);
    t.spans && this.#i.dispatchEngineSpans(t.spans);
  }
  #l(t) {
    switch (t.level) {
      case "debug":
      case "trace":
        $u(t);
        break;
      case "error":
      case "warn":
      case "info": {
        this.#n.emit(t.level, { timestamp: Li(t.timestamp), message: t.attributes.message ?? "", target: t.target ?? "RemoteExecutor" });
        break;
      }
      case "query": {
        this.#n.emit("query", { query: t.attributes.query ?? "", timestamp: Li(t.timestamp), duration: t.attributes.duration_ms ?? 0, params: t.attributes.params ?? "", target: t.target ?? "RemoteExecutor" });
        break;
      }
      default:
        throw new Error(`Unexpected log level: ${t.level}`);
    }
  }
};
var _i = class {
  static {
    __name(this, "_i");
  }
  #e;
  #t;
  #r;
  constructor(t) {
    this.#e = t, this.#t = /* @__PURE__ */ new Map();
  }
  async request({ method: t, path: r, headers: n, body: i, fetch: o3 }) {
    let s = new URL(r, this.#e), a3 = this.#n(s);
    a3 && (n.Cookie = a3), this.#r && (n["Accelerate-Query-Engine-Jwt"] = this.#r);
    let m3 = await o3(s.href, { method: t, body: i !== void 0 ? JSON.stringify(i) : void 0, headers: n });
    return $u(t, s, m3.status, m3.statusText), this.#r = m3.headers.get("Accelerate-Query-Engine-Jwt") ?? void 0, this.#i(s, m3), m3;
  }
  #n(t) {
    let r = [], n = /* @__PURE__ */ new Date();
    for (let [i, o3] of this.#t) {
      if (o3.expires && o3.expires < n) {
        this.#t.delete(i);
        continue;
      }
      let s = o3.domain ?? t.hostname, a3 = o3.path ?? "/";
      t.hostname.endsWith(s) && t.pathname.startsWith(a3) && r.push(Du(o3.name, o3.value));
    }
    return r.length > 0 ? r.join("; ") : void 0;
  }
  #i(t, r) {
    let n = r.headers.getSetCookie?.() || [];
    if (n.length === 0) {
      let i = r.headers.get("Set-Cookie");
      i && n.push(i);
    }
    for (let i of n) {
      let o3 = Mu(i), s = o3.domain ?? t.hostname, a3 = o3.path ?? "/", m3 = `${s}:${a3}:${o3.name}`;
      this.#t.set(m3, { name: o3.name, value: o3.value, domain: s, path: a3, expires: o3.expires });
    }
  }
};
u();
l();
c();
p();
d();
var Fi = {};
var Uu = { async loadQueryCompiler(e7) {
  let { clientVersion: t, compilerWasm: r } = e7;
  if (r === void 0) throw new PrismaClientInitializationError("WASM query compiler was unexpectedly `undefined`", t);
  let n;
  return e7.activeProvider === void 0 || Fi[e7.activeProvider] === void 0 ? (n = (async () => {
    let i = await r.getRuntime(), o3 = await r.getQueryCompilerWasmModule();
    if (o3 == null) throw new PrismaClientInitializationError("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
    let s = { [r.importName]: i }, a3 = new WebAssembly.Instance(o3, s), m3 = a3.exports.__wbindgen_start;
    return i.__wbg_set_wasm(a3.exports), m3(), i.QueryCompiler;
  })(), e7.activeProvider !== void 0 && (Fi[e7.activeProvider] = n)) : n = Fi[e7.activeProvider], await n;
} };
var Tm = "P2038";
var Oe = ee("prisma:client:clientEngine");
var Ju = globalThis;
Ju.PRISMA_WASM_PANIC_REGISTRY = { set_message(e7) {
  throw new PrismaClientRustPanicError(e7, dn);
} };
var lr = class {
  static {
    __name(this, "lr");
  }
  name = "ClientEngine";
  #e;
  #t = { type: "disconnected" };
  #r;
  #n;
  #i;
  #o;
  config;
  datamodel;
  logEmitter;
  logQueries;
  logLevel;
  tracingHelper;
  #s;
  constructor(t, r) {
    if (t.accelerateUrl !== void 0) this.#n = { remote: true, accelerateUrl: t.accelerateUrl };
    else if (t.adapter) this.#n = { remote: false, driverAdapterFactory: t.adapter }, Oe("Using driver adapter: %O", t.adapter);
    else throw new PrismaClientInitializationError("Missing configured driver adapter. Engine type `client` requires an active driver adapter. Please check your PrismaClient initialization code.", t.clientVersion, Tm);
    this.#r = r ?? Uu, this.config = t, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, this.tracingHelper = t.tracingHelper, this.#i = t.queryPlanCacheMaxSize === 0 ? void 0 : new fn(t.queryPlanCacheMaxSize), this.#o = sr.deserialize(t.parameterizationSchema, (n) => {
      if (!Object.hasOwn(t.runtimeDataModel.enums, n)) return;
      let i = {};
      for (let o3 of t.runtimeDataModel.enums[n].values) i[o3.name] = o3.dbName ?? o3.name;
      return i;
    }), t.enableDebugLogs && (this.logLevel = "debug"), this.logQueries && (this.#s = (n) => {
      this.logEmitter.emit("query", { ...n, params: fe(n.params), target: "ClientEngine" });
    });
  }
  async #a() {
    switch (this.#t.type) {
      case "disconnected": {
        let t = this.tracingHelper.runInChildSpan("connect", async () => {
          let r, n;
          try {
            r = await this.#u(), n = await this.#l(r);
          } catch (o3) {
            throw this.#t = { type: "disconnected" }, n?.free(), await r?.disconnect(), o3;
          }
          let i = { executor: r, queryCompiler: n };
          return this.#t = { type: "connected", engine: i }, i;
        });
        return this.#t = { type: "connecting", promise: t }, await t;
      }
      case "connecting":
        return await this.#t.promise;
      case "connected":
        return this.#t.engine;
      case "disconnecting":
        return await this.#t.promise, await this.#a();
    }
  }
  async #u() {
    return this.#n.remote ? new bn({ clientVersion: this.config.clientVersion, accelerateUrl: this.#n.accelerateUrl, logEmitter: this.logEmitter, logLevel: this.logLevel, logQueries: this.logQueries, tracingHelper: this.tracingHelper, sqlCommenters: this.config.sqlCommenters }) : await mn.connect({ driverAdapterFactory: this.#n.driverAdapterFactory, tracingHelper: this.tracingHelper, transactionOptions: { ...this.config.transactionOptions, isolationLevel: this.#y(this.config.transactionOptions.isolationLevel) }, onQuery: this.#s, provider: this.config.activeProvider, sqlCommenters: this.config.sqlCommenters });
  }
  async #l(t) {
    let r = this.#e;
    r === void 0 && (r = await this.#r.loadQueryCompiler(this.config), this.#e = r);
    let { provider: n, connectionInfo: i } = await t.getConnectionInfo();
    try {
      return this.#m(() => new r({ datamodel: this.datamodel, provider: n, connectionInfo: i }), void 0, false);
    } catch (o3) {
      throw this.#p(o3);
    }
  }
  #p(t) {
    if (t instanceof PrismaClientRustPanicError) return t;
    try {
      let r = JSON.parse(t.message);
      return new PrismaClientInitializationError(r.message, this.config.clientVersion, r.error_code);
    } catch {
      return t;
    }
  }
  #c(t, r) {
    if (t instanceof PrismaClientInitializationError) return t;
    if (t.code === "GenericFailure" && t.message?.startsWith("PANIC:")) return new PrismaClientRustPanicError(Bu(this, t.message, r), this.config.clientVersion);
    if (t instanceof Z) return new PrismaClientKnownRequestError(t.message, { code: t.code, meta: t.meta, clientVersion: this.config.clientVersion });
    try {
      let n = JSON.parse(t);
      return new PrismaClientUnknownRequestError(`${n.message}
${n.backtrace}`, { clientVersion: this.config.clientVersion });
    } catch {
      return t;
    }
  }
  #d(t) {
    return t instanceof PrismaClientRustPanicError ? t : typeof t.message == "string" && typeof t.code == "string" ? new PrismaClientKnownRequestError(t.message, { code: t.code, meta: t.meta, clientVersion: this.config.clientVersion }) : typeof t.message == "string" ? new PrismaClientUnknownRequestError(t.message, { clientVersion: this.config.clientVersion }) : t;
  }
  #m(t, r, n = true) {
    let i = Ju.PRISMA_WASM_PANIC_REGISTRY.set_message, o3;
    globalThis.PRISMA_WASM_PANIC_REGISTRY.set_message = (s) => {
      o3 = s;
    };
    try {
      return t();
    } finally {
      if (globalThis.PRISMA_WASM_PANIC_REGISTRY.set_message = i, o3) throw this.#e = void 0, n && this.stop().catch((s) => Oe("failed to disconnect:", s)), new PrismaClientRustPanicError(Bu(this, o3, r), this.config.clientVersion);
    }
  }
  onBeforeExit() {
    throw new Error('"beforeExit" hook is not applicable to the client engine, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
  }
  async start() {
    await this.#a();
  }
  async stop() {
    switch (this.#t.type) {
      case "disconnected":
        return;
      case "connecting":
        return await this.#t.promise, await this.stop();
      case "connected": {
        let t = this.#t.engine, r = this.tracingHelper.runInChildSpan("disconnect", async () => {
          try {
            await t.executor.disconnect(), t.queryCompiler.free();
          } finally {
            this.#t = { type: "disconnected" };
          }
        });
        return this.#t = { type: "disconnecting", promise: r }, await r;
      }
      case "disconnecting":
        return await this.#t.promise;
    }
  }
  version() {
    return "unknown";
  }
  async transaction(t, r, n) {
    let i, { executor: o3 } = await this.#a();
    try {
      if (t === "start") {
        let s = n;
        i = await o3.startTransaction({ ...s, isolationLevel: this.#y(s.isolationLevel) });
      } else if (t === "commit") {
        let s = n;
        await o3.commitTransaction(s);
      } else if (t === "rollback") {
        let s = n;
        await o3.rollbackTransaction(s);
      } else Re(t, "Invalid transaction action.");
    } catch (s) {
      throw this.#c(s);
    }
    return i ? { id: i.id, payload: void 0 } : void 0;
  }
  async request(t, { interactiveTransaction: r, customDataProxyFetch: n }) {
    Oe("sending request");
    let { executor: i, queryCompiler: o3 } = await this.#a().catch((m3) => {
      throw this.#c(m3, JSON.stringify(t));
    }), s, a3 = {};
    if (ju(t)) s = Qu(t);
    else {
      let { parameterizedQuery: m3, placeholderValues: f3 } = Ni(t, this.#o), T3 = JSON.stringify(m3);
      a3 = f3;
      let S3 = t.action !== "createMany" && t.action !== "createManyAndReturn", v3 = S3 ? this.#i?.getSingle(T3) : void 0;
      v3 ? (Oe("query plan cache hit"), s = v3) : (Oe("query plan cache miss"), s = this.#f(m3, T3, o3), S3 && this.#i?.setSingle(T3, s));
    }
    try {
      Oe("query plan created", s);
      let m3 = await i.execute({ plan: s, model: t.modelName, operation: t.action, placeholderValues: a3, transaction: r, batchIndex: void 0, customFetch: n?.(globalThis.fetch), queryInfo: { type: "single", modelName: t.modelName, action: t.action, query: t.query } });
      return Oe("query plan executed"), { data: { [t.action]: m3 } };
    } catch (m3) {
      throw this.#c(m3, JSON.stringify(t));
    }
  }
  async requestBatch(t, { transaction: r, customDataProxyFetch: n }) {
    if (t.length === 0) return [];
    let i = t[0].action, o3 = t[0].modelName, s = Cu(t, r), a3 = JSON.stringify(s), { executor: m3, queryCompiler: f3 } = await this.#a().catch((A3) => {
      throw this.#c(A3, a3);
    }), T3 = o3 === void 0, S3, v3 = {};
    if (T3) S3 = this.#g(t, a3, f3);
    else {
      let { parameterizedBatch: A3, placeholderValues: N3 } = Di(s, this.#o), R3 = JSON.stringify(A3);
      v3 = N3;
      let I3 = this.#i?.getBatch(R3);
      if (I3) Oe("batch query plan cache hit"), S3 = I3;
      else {
        Oe("batch query plan cache miss");
        try {
          S3 = this.#g(A3.batch, R3, f3), this.#i?.setBatch(R3, S3);
        } catch (Q3) {
          throw this.#d(Q3);
        }
      }
    }
    try {
      let A3;
      switch (r?.kind === "itx" && (A3 = r.options), S3.type) {
        case "multi": {
          if (r?.kind !== "itx") {
            let I3 = r?.options, Q3 = { maxWait: I3?.maxWait ?? this.config.transactionOptions.maxWait, timeout: I3?.timeout ?? this.config.transactionOptions.timeout, isolationLevel: I3?.isolationLevel ?? this.config.transactionOptions.isolationLevel };
            A3 = await this.transaction("start", {}, Q3);
          }
          let N3 = [], R3 = false;
          for (let [I3, Q3] of S3.plans.entries()) try {
            let B3 = await m3.execute({ plan: Q3, placeholderValues: v3, model: t[I3].modelName, operation: t[I3].action, batchIndex: I3, transaction: A3, customFetch: n?.(globalThis.fetch), queryInfo: { type: "single", ...t[I3] } });
            N3.push({ data: { [t[I3].action]: B3 } });
          } catch (B3) {
            N3.push(B3), R3 = true;
            break;
          }
          return A3 !== void 0 && r?.kind !== "itx" && (R3 ? await this.transaction("rollback", {}, A3) : await this.transaction("commit", {}, A3)), N3;
        }
        case "compacted": {
          if (!t.every((I3) => I3.action === i && I3.modelName === o3)) {
            let I3 = t.map((B3) => B3.action).join(", "), Q3 = t.map((B3) => B3.modelName).join(", ");
            throw new Error(`Internal error: All queries in a compacted batch must have the same action and model name, but received actions: [${I3}] and model names: [${Q3}]. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.`);
          }
          if (o3 === void 0) throw new Error("Internal error: A compacted batch cannot contain raw queries. This indicates a bug in the client. Please report this issue to the Prisma team with your query details.");
          let N3 = await m3.execute({ plan: S3.plan, placeholderValues: v3, model: o3, operation: i, batchIndex: void 0, transaction: A3, customFetch: n?.(globalThis.fetch), queryInfo: { type: "compacted", action: i, modelName: o3, queries: t } });
          return zs(N3, S3, v3).map((I3) => ({ data: { [i]: I3 } }));
        }
      }
    } catch (A3) {
      throw this.#c(A3, a3);
    }
  }
  async apiKey() {
    let { executor: t } = await this.#a();
    return t.apiKey();
  }
  #f(t, r, n) {
    try {
      return this.#m(() => this.#h({ queries: [t], execute: /* @__PURE__ */ __name(() => n.compile(r), "execute") }));
    } catch (i) {
      throw this.#d(i);
    }
  }
  #g(t, r, n) {
    if (t.every(ju)) return { type: "multi", plans: t.map((i) => Qu(i)) };
    try {
      return this.#m(() => this.#h({ queries: t, execute: /* @__PURE__ */ __name(() => n.compileBatch(r), "execute") }));
    } catch (i) {
      throw this.#d(i);
    }
  }
  #y(t) {
    switch (t) {
      case void 0:
        return;
      case "ReadUncommitted":
        return "READ UNCOMMITTED";
      case "ReadCommitted":
        return "READ COMMITTED";
      case "RepeatableRead":
        return "REPEATABLE READ";
      case "Serializable":
        return "SERIALIZABLE";
      case "Snapshot":
        return "SNAPSHOT";
      default:
        throw new PrismaClientKnownRequestError(`Inconsistent column data: Conversion failed: Invalid isolation level \`${t}\``, { code: "P2023", clientVersion: this.config.clientVersion, meta: { providedIsolationLevel: t } });
    }
  }
  #h({ queries: t, execute: r }) {
    return this.tracingHelper.runInChildSpan({ name: "compile", attributes: { models: t.map((n) => n.modelName).filter((n) => n !== void 0), actions: t.map((n) => n.action) } }, r);
  }
};
function Bu(e7, t, r) {
  return Nu({ binaryTarget: void 0, title: t, version: e7.config.clientVersion, engineVersion: "unknown", database: e7.config.activeProvider, query: r });
}
__name(Bu, "Bu");
function ju(e7) {
  return e7.action === "queryRaw" || e7.action === "executeRaw";
}
__name(ju, "ju");
function Qu(e7) {
  let t = e7.query.arguments.query, { args: r, argTypes: n } = vu(e7.query.arguments.parameters);
  return { type: e7.action === "queryRaw" ? "query" : "execute", args: { type: "rawSql", sql: t, args: r, argTypes: n } };
}
__name(Qu, "Qu");
function Hu(e7) {
  return new lr(e7);
}
__name(Hu, "Hu");
u();
l();
c();
p();
d();
var Gu = /* @__PURE__ */ __name((e7) => ({ command: e7 }), "Gu");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var zu = /* @__PURE__ */ __name((e7) => e7.strings.reduce((t, r, n) => `${t}@P${n}${r}`), "zu");
u();
l();
c();
p();
d();
function Ct(e7) {
  try {
    return Wu(e7, "fast");
  } catch {
    return Wu(e7, "slow");
  }
}
__name(Ct, "Ct");
function Wu(e7, t) {
  return JSON.stringify(e7.map((r) => Zu(r, t)));
}
__name(Wu, "Wu");
function Zu(e7, t) {
  if (Array.isArray(e7)) return e7.map((r) => Zu(r, t));
  if (typeof e7 == "bigint") return { prisma__type: "bigint", prisma__value: e7.toString() };
  if (at(e7)) return { prisma__type: "date", prisma__value: e7.toJSON() };
  if (Decimal.isDecimal(e7)) return { prisma__type: "decimal", prisma__value: e7.toJSON() };
  if (g.isBuffer(e7)) return { prisma__type: "bytes", prisma__value: e7.toString("base64") };
  if (Sm(e7)) return { prisma__type: "bytes", prisma__value: g.from(e7).toString("base64") };
  if (ArrayBuffer.isView(e7)) {
    let { buffer: r, byteOffset: n, byteLength: i } = e7;
    return { prisma__type: "bytes", prisma__value: g.from(r, n, i).toString("base64") };
  }
  return typeof e7 == "object" && t === "slow" ? Yu(e7) : e7;
}
__name(Zu, "Zu");
function Sm(e7) {
  return e7 instanceof ArrayBuffer || e7 instanceof SharedArrayBuffer ? true : typeof e7 == "object" && e7 !== null ? e7[Symbol.toStringTag] === "ArrayBuffer" || e7[Symbol.toStringTag] === "SharedArrayBuffer" : false;
}
__name(Sm, "Sm");
function Yu(e7) {
  if (typeof e7 != "object" || e7 === null) return e7;
  if (typeof e7.toJSON == "function") return e7.toJSON();
  if (Array.isArray(e7)) return e7.map(Ku);
  let t = {};
  for (let r of Object.keys(e7)) t[r] = Ku(e7[r]);
  return t;
}
__name(Yu, "Yu");
function Ku(e7) {
  return typeof e7 == "bigint" ? e7.toString() : Yu(e7);
}
__name(Ku, "Ku");
var Am = /^(\s*alter\s)/i;
var Xu = ee("prisma:client");
function Ui(e7, t, r, n) {
  if (!(e7 !== "postgresql" && e7 !== "cockroachdb") && r.length > 0 && Am.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
}
__name(Ui, "Ui");
var qi = /* @__PURE__ */ __name(({ clientMethod: e7, activeProvider: t }) => (r) => {
  let n = "", i;
  if (Vr(r)) n = r.sql, i = { values: Ct(r.values), __prismaRawParameters__: true };
  else if (Array.isArray(r)) {
    let [o3, ...s] = r;
    n = o3, i = { values: Ct(s || []), __prismaRawParameters__: true };
  } else switch (t) {
    case "sqlite":
    case "mysql": {
      n = r.sql, i = { values: Ct(r.values), __prismaRawParameters__: true };
      break;
    }
    case "cockroachdb":
    case "postgresql":
    case "postgres": {
      n = r.text, i = { values: Ct(r.values), __prismaRawParameters__: true };
      break;
    }
    case "sqlserver": {
      n = zu(r), i = { values: Ct(r.values), __prismaRawParameters__: true };
      break;
    }
    default:
      throw new Error(`The ${t} provider does not support ${e7}`);
  }
  return i?.values ? Xu(`prisma.${e7}(${n}, ${i.values})`) : Xu(`prisma.${e7}(${n})`), { query: n, parameters: i };
}, "qi");
var el = { requestArgsToMiddlewareArgs(e7) {
  return [e7.strings, ...e7.values];
}, middlewareArgsToRequestArgs(e7) {
  let [t, ...r] = e7;
  return new Sql(t, r);
} };
var tl = { requestArgsToMiddlewareArgs(e7) {
  return [e7];
}, middlewareArgsToRequestArgs(e7) {
  return e7[0];
} };
u();
l();
c();
p();
d();
function Bi(e7) {
  return function(r, n) {
    let i, o3 = /* @__PURE__ */ __name((s = e7) => {
      try {
        return s === void 0 || s?.kind === "itx" ? i ??= rl(r(s)) : rl(r(s));
      } catch (a3) {
        return Promise.reject(a3);
      }
    }, "o");
    return { get spec() {
      return n;
    }, then(s, a3) {
      return o3().then(s, a3);
    }, catch(s) {
      return o3().catch(s);
    }, finally(s) {
      return o3().finally(s);
    }, requestTransaction(s) {
      let a3 = o3(s);
      return a3.requestTransaction ? a3.requestTransaction(s) : a3;
    }, [Symbol.toStringTag]: "PrismaPromise" };
  };
}
__name(Bi, "Bi");
function rl(e7) {
  return typeof e7.then == "function" ? e7 : Promise.resolve(e7);
}
__name(rl, "rl");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
var nl = { name: "@prisma/instrumentation-contract", version: "7.8.0", description: "Shared types and utilities for Prisma instrumentation", main: "dist/index.js", module: "dist/index.mjs", types: "dist/index.d.ts", exports: { ".": { require: { types: "./dist/index.d.ts", default: "./dist/index.js" }, import: { types: "./dist/index.d.mts", default: "./dist/index.mjs" } } }, license: "Apache-2.0", homepage: "https://www.prisma.io", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/instrumentation-contract" }, bugs: "https://github.com/prisma/prisma/issues", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", prepublishOnly: "pnpm run build", test: "vitest run" }, files: ["dist"], sideEffects: false, devDependencies: { "@opentelemetry/api": "1.9.0" }, peerDependencies: { "@opentelemetry/api": "^1.8" } };
var Rm = nl.version.split(".")[0];
var Im = "PRISMA_INSTRUMENTATION";
var km = `V${Rm}_PRISMA_INSTRUMENTATION`;
var il = globalThis;
function ol() {
  let e7 = il[km];
  return e7?.helper ? e7.helper : il[Im]?.helper;
}
__name(ol, "ol");
var Om = { isEnabled() {
  return false;
}, getTraceParent() {
  return "00-10-10-00";
}, dispatchEngineSpans() {
}, getActiveContext() {
}, runInChildSpan(e7, t) {
  return t();
} };
var ji = class {
  static {
    __name(this, "ji");
  }
  isEnabled() {
    return this.getTracingHelper().isEnabled();
  }
  getTraceParent(t) {
    return this.getTracingHelper().getTraceParent(t);
  }
  dispatchEngineSpans(t) {
    return this.getTracingHelper().dispatchEngineSpans(t);
  }
  getActiveContext() {
    return this.getTracingHelper().getActiveContext();
  }
  runInChildSpan(t, r) {
    return this.getTracingHelper().runInChildSpan(t, r);
  }
  getTracingHelper() {
    return ol() ?? Om;
  }
};
function sl() {
  return new ji();
}
__name(sl, "sl");
u();
l();
c();
p();
d();
function al(e7, t = () => {
}) {
  let r, n = new Promise((i) => r = i);
  return { then(i) {
    return --e7 === 0 && r(t()), i?.(n);
  } };
}
__name(al, "al");
u();
l();
c();
p();
d();
function ul(e7) {
  return typeof e7 == "string" ? e7 : e7.reduce((t, r) => {
    let n = typeof r == "string" ? r : r.level;
    return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
  }, void 0);
}
__name(ul, "ul");
u();
l();
c();
p();
d();
u();
l();
c();
p();
d();
function Ji(e7) {
  if (e7.action !== "findUnique" && e7.action !== "findUniqueOrThrow") return;
  let t = [];
  return e7.modelName && t.push(e7.modelName), e7.query.arguments && t.push(Qi(e7.query.arguments)), t.push(Qi(e7.query.selection)), t.join("");
}
__name(Ji, "Ji");
function Qi(e7) {
  return `(${Object.keys(e7).sort().map((r) => {
    let n = e7[r];
    return typeof n == "object" && n !== null ? `(${r} ${Qi(n)})` : r;
  }).join(" ")})`;
}
__name(Qi, "Qi");
u();
l();
c();
p();
d();
var Nm = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
function Hi(e7) {
  return Nm[e7];
}
__name(Hi, "Hi");
u();
l();
c();
p();
d();
var xn = class {
  static {
    __name(this, "xn");
  }
  constructor(t) {
    this.options = t;
    this.batches = {};
  }
  batches;
  tickActive = false;
  request(t) {
    let r = this.options.batchBy(t);
    return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, y.nextTick(() => {
      this.dispatchBatches(), this.tickActive = false;
    }))), new Promise((n, i) => {
      this.batches[r].push({ request: t, resolve: n, reject: i });
    })) : this.options.singleLoader(t);
  }
  dispatchBatches() {
    for (let t in this.batches) {
      let r = this.batches[t];
      delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
        n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
      }).catch((n) => {
        r[0].reject(n);
      }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
        if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
        else for (let i = 0; i < r.length; i++) {
          let o3 = n[i];
          o3 instanceof Error ? r[i].reject(o3) : r[i].resolve(o3);
        }
      }).catch((n) => {
        for (let i = 0; i < r.length; i++) r[i].reject(n);
      }));
    }
  }
  get [Symbol.toStringTag]() {
    return "DataLoader";
  }
};
u();
l();
c();
p();
d();
function et(e7, t) {
  if (t === null) return t;
  switch (e7) {
    case "bigint":
      return BigInt(t);
    case "bytes": {
      let { buffer: r, byteOffset: n, byteLength: i } = g.from(t, "base64");
      return new Uint8Array(r, n, i);
    }
    case "decimal":
      return new Decimal(t);
    case "datetime":
    case "date":
      return new Date(t);
    case "time":
      return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
    case "bigint-array":
      return t.map((r) => et("bigint", r));
    case "bytes-array":
      return t.map((r) => et("bytes", r));
    case "decimal-array":
      return t.map((r) => et("decimal", r));
    case "datetime-array":
      return t.map((r) => et("datetime", r));
    case "date-array":
      return t.map((r) => et("date", r));
    case "time-array":
      return t.map((r) => et("time", r));
    default:
      return t;
  }
}
__name(et, "et");
function Gi(e7) {
  let t = [], r = Mm(e7);
  for (let n = 0; n < e7.rows.length; n++) {
    let i = e7.rows[n], o3 = { ...r };
    for (let s = 0; s < i.length; s++) o3[e7.columns[s]] = et(e7.types[s], i[s]);
    t.push(o3);
  }
  return t;
}
__name(Gi, "Gi");
function Mm(e7) {
  let t = {};
  for (let r = 0; r < e7.columns.length; r++) t[e7.columns[r]] = null;
  return t;
}
__name(Mm, "Mm");
var _m = ee("prisma:client:request_handler");
var Tn = class {
  static {
    __name(this, "Tn");
  }
  client;
  dataloader;
  logEmitter;
  constructor(t, r) {
    this.logEmitter = r, this.client = t, this.dataloader = new xn({ batchLoader: Fs(async ({ requests: n, customDataProxyFetch: i }) => {
      let { transaction: o3, otelParentCtx: s } = n[0], a3 = n.map((S3) => S3.protocolQuery), m3 = this.client._tracingHelper.getTraceParent(s), f3 = n.some((S3) => Hi(S3.protocolQuery.action));
      return (await this.client._engine.requestBatch(a3, { traceparent: m3, transaction: Fm(o3), containsWrite: f3, customDataProxyFetch: i })).map((S3, v3) => {
        if (S3 instanceof Error) return S3;
        try {
          return this.mapQueryEngineResult(n[v3], S3);
        } catch (A3) {
          return A3;
        }
      });
    }), singleLoader: /* @__PURE__ */ __name(async (n) => {
      let i = n.transaction?.kind === "itx" ? ll(n.transaction) : void 0, o3 = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: Hi(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
      return this.mapQueryEngineResult(n, o3);
    }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => {
      if (n.transaction?.kind === "itx") {
        let i = Ji(n.protocolQuery);
        return `itx-${n.transaction.id}${i ? `-${i}` : ""}`;
      }
      return n.transaction?.id ? `transaction-${n.transaction.id}` : Ji(n.protocolQuery);
    }, "batchBy"), batchOrder(n, i) {
      return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
    } });
  }
  async request(t) {
    try {
      return await this.dataloader.request(t);
    } catch (r) {
      let { clientMethod: n, callsite: i, transaction: o3, args: s, modelName: a3 } = t;
      this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o3, args: s, modelName: a3, globalOmit: t.globalOmit });
    }
  }
  mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
    let i = n?.data, o3 = this.unpack(i, t, r);
    return y.env.PRISMA_CLIENT_GET_TIME ? { data: o3 } : o3;
  }
  handleAndLogRequestError(t) {
    try {
      this.handleRequestError(t);
    } catch (r) {
      throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
    }
  }
  handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o3, modelName: s, globalOmit: a3 }) {
    if (_m(t), $m(t, i)) throw t;
    if (t instanceof PrismaClientKnownRequestError && Vm(t)) {
      let f3 = cl(t.meta);
      Lr({ args: o3, errors: [f3], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a3 });
    }
    let m3 = t.message;
    if (n && (m3 = Cr({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: m3 })), m3 = this.sanitizeMessage(m3), t.code) {
      let f3 = s ? { modelName: s, ...t.meta } : t.meta;
      throw new PrismaClientKnownRequestError(m3, { code: t.code, clientVersion: this.client._clientVersion, meta: f3, batchRequestIdx: t.batchRequestIdx });
    } else {
      if (t.isPanic) throw new PrismaClientRustPanicError(m3, this.client._clientVersion);
      if (t instanceof PrismaClientUnknownRequestError) throw new PrismaClientUnknownRequestError(m3, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
      if (t instanceof PrismaClientInitializationError) throw new PrismaClientInitializationError(m3, this.client._clientVersion);
      if (t instanceof PrismaClientRustPanicError) throw new PrismaClientRustPanicError(m3, this.client._clientVersion);
    }
    throw t.clientVersion = this.client._clientVersion, t;
  }
  sanitizeMessage(t) {
    return this.client._errorFormat && this.client._errorFormat !== "pretty" ? st(t) : t;
  }
  unpack(t, r, n) {
    if (!t || (t.data && (t = t.data), !t)) return t;
    let i = Object.keys(t)[0], o3 = Object.values(t)[0], s = r.filter((f3) => f3 !== "select" && f3 !== "include"), a3 = Gn(o3, s), m3 = i === "queryRaw" ? Gi(a3) : Te(a3);
    return n ? n(m3) : m3;
  }
  get [Symbol.toStringTag]() {
    return "RequestHandler";
  }
};
function Fm(e7) {
  if (e7) {
    if (e7.kind === "batch") return { kind: "batch", options: { isolationLevel: e7.isolationLevel, maxWait: e7.maxWait, timeout: e7.timeout } };
    if (e7.kind === "itx") return { kind: "itx", options: ll(e7) };
    Re(e7, "Unknown transaction kind");
  }
}
__name(Fm, "Fm");
function ll(e7) {
  return { id: e7.id, payload: e7.payload };
}
__name(ll, "ll");
function $m(e7, t) {
  return hasBatchIndex(e7) && t?.kind === "batch" && e7.batchRequestIdx !== t.index;
}
__name($m, "$m");
function Vm(e7) {
  return e7.code === "P2009" || e7.code === "P2012";
}
__name(Vm, "Vm");
function cl(e7) {
  if (e7.kind === "Union") return { kind: "Union", errors: e7.errors.map(cl) };
  if (Array.isArray(e7.selectionPath)) {
    let [, ...t] = e7.selectionPath;
    return { ...e7, selectionPath: t };
  }
  return e7;
}
__name(cl, "cl");
u();
l();
c();
p();
d();
var Ki = dn;
u();
l();
c();
p();
d();
var gl = qe(Fn());
u();
l();
c();
p();
d();
var _ = class extends Error {
  static {
    __name(this, "_");
  }
  constructor(t) {
    super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientConstructorValidationError";
  }
};
Vt(_, "PrismaClientConstructorValidationError");
var pl = ["errorFormat", "adapter", "accelerateUrl", "log", "transactionOptions", "omit", "comments", "queryPlanCacheMaxSize", "__internal"];
var dl = ["pretty", "colorless", "minimal"];
var ml = ["info", "query", "warn", "error"];
var Um = { adapter: /* @__PURE__ */ __name(() => {
}, "adapter"), accelerateUrl: /* @__PURE__ */ __name((e7) => {
  if (e7 !== void 0) {
    if (typeof e7 != "string") throw new _(`Invalid value ${JSON.stringify(e7)} for "accelerateUrl" provided to PrismaClient constructor.`);
    if (e7.trim().length === 0) throw new _('"accelerateUrl" provided to PrismaClient constructor must be a non-empty string.');
  }
}, "accelerateUrl"), errorFormat: /* @__PURE__ */ __name((e7) => {
  if (e7) {
    if (typeof e7 != "string") throw new _(`Invalid value ${JSON.stringify(e7)} for "errorFormat" provided to PrismaClient constructor.`);
    if (!dl.includes(e7)) {
      let t = cr(e7, dl);
      throw new _(`Invalid errorFormat ${e7} provided to PrismaClient constructor.${t}`);
    }
  }
}, "errorFormat"), log: /* @__PURE__ */ __name((e7) => {
  if (!e7) return;
  if (!Array.isArray(e7)) throw new _(`Invalid value ${JSON.stringify(e7)} for "log" provided to PrismaClient constructor.`);
  function t(r) {
    if (typeof r == "string" && !ml.includes(r)) {
      let n = cr(r, ml);
      throw new _(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
    }
  }
  __name(t, "t");
  for (let r of e7) {
    t(r);
    let n = { level: t, emit: /* @__PURE__ */ __name((i) => {
      let o3 = ["stdout", "event"];
      if (!o3.includes(i)) {
        let s = cr(i, o3);
        throw new _(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
      }
    }, "emit") };
    if (r && typeof r == "object") for (let [i, o3] of Object.entries(r)) if (n[i]) n[i](o3);
    else throw new _(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
  }
}, "log"), transactionOptions: /* @__PURE__ */ __name((e7) => {
  if (!e7) return;
  let t = e7.maxWait;
  if (t != null && t <= 0) throw new _(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
  let r = e7.timeout;
  if (r != null && r <= 0) throw new _(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
}, "transactionOptions"), omit: /* @__PURE__ */ __name((e7, t) => {
  if (typeof e7 != "object") throw new _('"omit" option is expected to be an object.');
  if (e7 === null) throw new _('"omit" option can not be `null`');
  let r = [];
  for (let [n, i] of Object.entries(e7)) {
    let o3 = jm(n, t.runtimeDataModel);
    if (!o3) {
      r.push({ kind: "UnknownModel", modelKey: n });
      continue;
    }
    for (let [s, a3] of Object.entries(i)) {
      let m3 = o3.fields.find((f3) => f3.name === s);
      if (!m3) {
        r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
        continue;
      }
      if (m3.relationName) {
        r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
        continue;
      }
      typeof a3 != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
    }
  }
  if (r.length > 0) throw new _(Qm(e7, r));
}, "omit"), queryPlanCacheMaxSize: /* @__PURE__ */ __name((e7) => {
  if (e7 !== void 0) {
    if (typeof e7 != "number") throw new _(`Invalid value ${JSON.stringify(e7)} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected a number.`);
    if (!Number.isInteger(e7)) throw new _(`Invalid value ${e7} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Expected an integer.`);
    if (e7 < 0) throw new _(`Invalid value ${e7} for "queryPlanCacheMaxSize" provided to PrismaClient constructor. Cache size needs to be greater or equal to 0.`);
  }
}, "queryPlanCacheMaxSize"), comments: /* @__PURE__ */ __name((e7) => {
  if (e7 !== void 0) {
    if (!Array.isArray(e7)) throw new _(`Invalid value ${JSON.stringify(e7)} for "comments" provided to PrismaClient constructor. Expected an array of SQL commenter plugins.`);
    for (let t = 0; t < e7.length; t++) if (typeof e7[t] != "function") throw new _(`Invalid value at index ${t} for "comments" provided to PrismaClient constructor. Each plugin must be a function.`);
  }
}, "comments"), __internal: /* @__PURE__ */ __name((e7) => {
  if (!e7) return;
  let t = ["debug", "engine", "configOverride"];
  if (typeof e7 != "object") throw new _(`Invalid value ${JSON.stringify(e7)} for "__internal" to PrismaClient constructor`);
  for (let [r] of Object.entries(e7)) if (!t.includes(r)) {
    let n = cr(r, t);
    throw new _(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
  }
}, "__internal") };
function qm(e7) {
  let t = e7.adapter !== void 0, r = e7.accelerateUrl !== void 0;
  if (t && r) throw new _('The "adapter" and "accelerateUrl" options are mutually exclusive. Please provide only one of them.');
  if (!t && !r) throw new _('Using engine type "client" requires either "adapter" or "accelerateUrl" to be provided to PrismaClient constructor.');
}
__name(qm, "qm");
function yl(e7, t) {
  for (let [r, n] of Object.entries(e7)) {
    if (!pl.includes(r)) {
      let i = cr(r, pl);
      throw new _(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
    }
    Um[r](n, t);
  }
  qm(e7);
}
__name(yl, "yl");
function cr(e7, t) {
  if (t.length === 0 || typeof e7 != "string") return "";
  let r = Bm(e7, t);
  return r ? ` Did you mean "${r}"?` : "";
}
__name(cr, "cr");
function Bm(e7, t) {
  if (t.length === 0) return null;
  let r = t.map((i) => ({ value: i, distance: (0, gl.default)(e7, i) }));
  r.sort((i, o3) => i.distance < o3.distance ? -1 : 1);
  let n = r[0];
  return n.distance < 3 ? n.value : null;
}
__name(Bm, "Bm");
function jm(e7, t) {
  return fl(t.models, e7) ?? fl(t.types, e7);
}
__name(jm, "jm");
function fl(e7, t) {
  let r = Object.keys(e7).find((n) => De(n) === t);
  if (r) return e7[r];
}
__name(fl, "fl");
function Qm(e7, t) {
  let r = gt(e7);
  for (let o3 of t) switch (o3.kind) {
    case "UnknownModel":
      r.arguments.getField(o3.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o3.modelKey}.`);
      break;
    case "UnknownField":
      r.arguments.getDeepField([o3.modelKey, o3.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o3.modelKey}" does not have a field named "${o3.fieldName}".`);
      break;
    case "RelationInOmit":
      r.arguments.getDeepField([o3.modelKey, o3.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
      break;
    case "InvalidFieldValue":
      r.arguments.getDeepFieldValue([o3.modelKey, o3.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
      break;
  }
  let { message: n, args: i } = Mr(r, "colorless");
  return `Error validating "omit" option:

${i}

${n}`;
}
__name(Qm, "Qm");
u();
l();
c();
p();
d();
function hl(e7) {
  return e7.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
    let n = new Array(e7.length), i = null, o3 = false, s = 0, a3 = /* @__PURE__ */ __name(() => {
      o3 || (s++, s === e7.length && (o3 = true, i ? r(i) : t(n)));
    }, "a"), m3 = /* @__PURE__ */ __name((f3) => {
      o3 || (o3 = true, r(f3));
    }, "m");
    for (let f3 = 0; f3 < e7.length; f3++) e7[f3].then((T3) => {
      n[f3] = T3, a3();
    }, (T3) => {
      if (!hasBatchIndex(T3)) {
        m3(T3);
        return;
      }
      T3.batchRequestIdx === f3 ? m3(T3) : (i || (i = T3), a3());
    });
  });
}
__name(hl, "hl");
var Rt = ee("prisma:client");
typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
var Gm = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((e7) => e7, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((e7) => e7, "middlewareArgsToRequestArgs") };
var xl = /* @__PURE__ */ Symbol.for("prisma.client.transaction.scope_context");
function wl(e7) {
  let r = e7[xl];
  if (r === void 0) return { kind: "top-level" };
  if (zm(r)) return r;
  throw new Error("Internal error: inconsistent transaction scope context.");
}
__name(wl, "wl");
function zm(e7) {
  if (typeof e7 != "object" || e7 === null) return false;
  let t = e7;
  return t.kind === "nested" && typeof t.txId == "string" && typeof t.scopeId == "string" && Wm(t.scopeState);
}
__name(zm, "zm");
function Wm(e7) {
  return typeof e7 != "object" || e7 === null ? false : Array.isArray(e7.stack);
}
__name(Wm, "Wm");
function Km() {
  return typeof globalThis.crypto?.randomUUID == "function" ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
__name(Km, "Km");
var Zm = { id: 0, nextId() {
  return ++this.id;
} };
function Ym(e7) {
  class t {
    static {
      __name(this, "t");
    }
    _originalClient = this;
    _runtimeDataModel;
    _requestHandler;
    _connectionPromise;
    _disconnectionPromise;
    _engineConfig;
    _accelerateEngineConfig;
    _clientVersion;
    _errorFormat;
    _tracingHelper;
    _previewFeatures;
    _activeProvider;
    _globalOmit;
    _extensions;
    _engine;
    _appliedParent;
    _createPrismaPromise = Bi();
    constructor(n) {
      if (!n) throw new PrismaClientInitializationError("`PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`:\n\n```\nnew PrismaClient({\n  ...\n})\n```\n\nor\n\n```\nconstructor() {\n  super({ ... });\n}\n```\n          ", Ki);
      e7 = n.__internal?.configOverride?.(e7) ?? e7, yl(n, e7);
      let i = new Ur().on("error", () => {
      });
      this._extensions = yt.empty(), this._previewFeatures = e7.previewFeatures, this._clientVersion = e7.clientVersion ?? Ki, this._activeProvider = e7.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = sl();
      let o3;
      if (n.adapter) {
        o3 = n.adapter;
        let s = e7.activeProvider === "postgresql" || e7.activeProvider === "cockroachdb" ? "postgres" : e7.activeProvider;
        if (o3.provider !== s) throw new PrismaClientInitializationError(`The Driver Adapter \`${o3.adapterName}\`, based on \`${o3.provider}\`, is not compatible with the provider \`${s}\` specified in the Prisma schema.`, this._clientVersion);
      }
      try {
        let s = n ?? {}, m3 = (s.__internal ?? {}).debug === true;
        if (m3 && ee.enable("prisma:client"), s.errorFormat ? this._errorFormat = s.errorFormat : y.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : y.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e7.runtimeDataModel, this._engineConfig = { enableDebugLogs: m3, logLevel: s.log && ul(s.log), logQueries: s.log && !!(typeof s.log == "string" ? s.log === "query" : s.log.find((f3) => typeof f3 == "string" ? f3 === "query" : f3.level === "query")), compilerWasm: e7.compilerWasm, clientVersion: e7.clientVersion, previewFeatures: this._previewFeatures, activeProvider: e7.activeProvider, inlineSchema: e7.inlineSchema, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: s.transactionOptions?.maxWait ?? 2e3, timeout: s.transactionOptions?.timeout ?? 5e3, isolationLevel: s.transactionOptions?.isolationLevel }, logEmitter: i, adapter: o3, accelerateUrl: s.accelerateUrl, sqlCommenters: s.comments, parameterizationSchema: e7.parameterizationSchema, runtimeDataModel: e7.runtimeDataModel, queryPlanCacheMaxSize: n.queryPlanCacheMaxSize }, this._accelerateEngineConfig = Object.create(this._engineConfig), this._accelerateEngineConfig.accelerateUtils = { resolveDatasourceUrl: /* @__PURE__ */ __name(() => {
          if (s.accelerateUrl) return s.accelerateUrl;
          throw new PrismaClientInitializationError(`\`accelerateUrl\` is required when using \`@prisma/extension-accelerate\`:

new PrismaClient({
  accelerateUrl: "prisma://...",
}).$extends(withAccelerate())
`, e7.clientVersion);
        }, "resolveDatasourceUrl") }, Rt("clientVersion", e7.clientVersion), this._engine = Hu(this._engineConfig), this._requestHandler = new Tn(this, i), s.log) for (let f3 of s.log) {
          let T3 = typeof f3 == "string" ? f3 : f3.emit === "stdout" ? f3.level : null;
          T3 && this.$on(T3, (S3) => {
            $t.log(`${$t.tags[T3] ?? ""}`, S3.message || S3.query);
          });
        }
      } catch (s) {
        throw s.clientVersion = this._clientVersion, s;
      }
      return this._appliedParent = zt(this);
    }
    get [Symbol.toStringTag]() {
      return "PrismaClient";
    }
    $on(n, i) {
      return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
    }
    $connect() {
      try {
        return this._engine.start();
      } catch (n) {
        throw n.clientVersion = this._clientVersion, n;
      }
    }
    async $disconnect() {
      try {
        await this._engine.stop();
      } catch (n) {
        throw n.clientVersion = this._clientVersion, n;
      } finally {
        Ro();
      }
    }
    $executeRawInternal(n, i, o3, s) {
      let a3 = this._activeProvider;
      return this._request({ action: "executeRaw", args: o3, transaction: n, clientMethod: i, argsMapper: qi({ clientMethod: i, activeProvider: a3 }), callsite: Le(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
    }
    $executeRaw(n, ...i) {
      return this._createPrismaPromise((o3) => {
        if (n.raw !== void 0 || n.sql !== void 0) {
          let [s, a3] = bl(n, i);
          return Ui(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o3, "$executeRaw", s, a3);
        }
        throw new PrismaClientValidationError("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
      });
    }
    $executeRawUnsafe(n, ...i) {
      return this._createPrismaPromise((o3) => (Ui(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o3, "$executeRawUnsafe", [n, ...i])));
    }
    $runCommandRaw(n) {
      if (e7.activeProvider !== "mongodb") throw new PrismaClientValidationError(`The ${e7.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
      return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: Gu, callsite: Le(this._errorFormat), transaction: i }));
    }
    async $queryRawInternal(n, i, o3, s) {
      let a3 = this._activeProvider;
      return this._request({ action: "queryRaw", args: o3, transaction: n, clientMethod: i, argsMapper: qi({ clientMethod: i, activeProvider: a3 }), callsite: Le(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
    }
    $queryRaw(n, ...i) {
      return this._createPrismaPromise((o3) => {
        if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o3, "$queryRaw", ...bl(n, i));
        throw new PrismaClientValidationError("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
      });
    }
    $queryRawTyped(n) {
      return this._createPrismaPromise((i) => {
        if (!this._hasPreviewFlag("typedSql")) throw new PrismaClientValidationError("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
        return this.$queryRawInternal(i, "$queryRawTyped", n);
      });
    }
    $queryRawUnsafe(n, ...i) {
      return this._createPrismaPromise((o3) => this.$queryRawInternal(o3, "$queryRawUnsafe", [n, ...i]));
    }
    _transactionWithArray({ promises: n, options: i }) {
      let o3 = Zm.nextId(), s = al(n.length), a3 = n.map((m3, f3) => {
        if (m3?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
        let T3 = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, S3 = { kind: "batch", id: o3, index: f3, isolationLevel: T3, maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, lock: s };
        return m3.requestTransaction?.(S3) ?? m3;
      });
      return hl(a3);
    }
    async _transactionWithCallback({ callback: n, options: i = {} }) {
      let o3 = wl(this), s = o3.kind === "nested", a3 = s ? o3.scopeState : { stack: [] }, m3 = a3.stack, f3 = Km();
      if (s) {
        if (m3.at(-1) !== o3.scopeId) throw new Error("Concurrent nested transactions are not supported");
        i.newTxId = o3.txId;
      }
      m3.push(f3);
      let T3 = { traceparent: this._tracingHelper.getTraceParent() }, S3 = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, newTxId: i.newTxId }, v3;
      try {
        v3 = await this._engine.transaction("start", T3, S3);
      } catch (N3) {
        throw m3.at(-1) === f3 && m3.pop(), N3;
      }
      let A3;
      try {
        let N3 = { kind: "itx", ...v3 };
        if (A3 = await n(this._createItxClient(N3, f3, a3)), s) {
          if (m3.at(-1) !== f3) throw new Error("Nested transactions must be closed in reverse order of creation.");
        } else if (m3.length !== 1) throw new Error("Cannot close transaction while a nested transaction is still active.");
        await this._engine.transaction("commit", T3, v3);
      } catch (N3) {
        let I3 = m3.at(-1) !== f3 ? Math.max(1, m3.length) : 1;
        for (let Q3 = 0; Q3 < I3; Q3++) await this._engine.transaction("rollback", T3, v3).catch((B3) => {
          Rt("rollback attempt %d/%d failed: %O", Q3 + 1, I3, B3);
        });
        throw N3;
      } finally {
        m3.at(-1) === f3 ? m3.pop() : m3.length = 0;
      }
      return A3;
    }
    _createItxClient(n, i, o3) {
      let s = { kind: "nested", txId: n.id, scopeId: i, scopeState: o3 };
      return me(zt(me(As(this), [te("_appliedParent", () => this._appliedParent._createItxClient(n, i, o3)), te("_createPrismaPromise", () => Bi(n)), te(xl, () => s)])), [ht(Os)]);
    }
    $transaction(n, i) {
      let o3;
      typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o3 = /* @__PURE__ */ __name(() => {
        throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
      }, "o") : e7.activeProvider === "mongodb" && wl(this).kind === "nested" ? o3 = /* @__PURE__ */ __name(() => {
        throw new PrismaClientValidationError(`The ${e7.activeProvider} provider does not support nested transactions`, { clientVersion: this._clientVersion });
      }, "o") : o3 = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o3 = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
      let s = { name: "transaction", attributes: { method: "$transaction" } };
      return this._tracingHelper.runInChildSpan(s, o3);
    }
    _request(n) {
      n.otelParentCtx = this._tracingHelper.getActiveContext();
      let i = n.middlewareArgsMapper ?? Gm, o3 = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { operation: { name: "operation", attributes: { method: o3.action, model: o3.model, name: o3.model ? `${o3.model}.${o3.action}` : o3.action } } }, a3 = /* @__PURE__ */ __name(async (m3) => {
        let { runInTransaction: f3, args: T3, ...S3 } = m3, v3 = { ...n, ...S3 };
        T3 && (v3.args = i.middlewareArgsToRequestArgs(T3)), n.transaction !== void 0 && f3 === false && delete v3.transaction;
        let A3 = await _s(this, v3);
        if (!v3.model) return A3;
        let N3 = qs({ dataPath: v3.dataPath, modelName: v3.model, args: v3.args, runtimeDataModel: this._runtimeDataModel });
        return ks({ result: A3, modelName: N3.modelName, args: N3.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit });
      }, "a");
      return this._tracingHelper.runInChildSpan(s.operation, () => a3(o3));
    }
    async _executeRequest({ args: n, clientMethod: i, dataPath: o3, callsite: s, action: a3, model: m3, argsMapper: f3, transaction: T3, unpacker: S3, otelParentCtx: v3, customDataProxyFetch: A3 }) {
      try {
        n = f3 ? f3(n) : n;
        let N3 = { name: "serialize" }, R3 = this._tracingHelper.runInChildSpan(N3, () => Bn({ modelName: m3, runtimeDataModel: this._runtimeDataModel, action: a3, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
        return ee.enabled("prisma:client") && (Rt("Prisma Client call:"), Rt(`prisma.${i}(${ys(n)})`), Rt("Generated request:"), Rt(JSON.stringify(R3, null, 2) + `
`)), T3?.kind === "batch" && await T3.lock, this._requestHandler.request({ protocolQuery: R3, modelName: m3, action: a3, clientMethod: i, dataPath: o3, callsite: s, args: n, extensions: this._extensions, transaction: T3, unpacker: S3, otelParentCtx: v3, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: A3 });
      } catch (N3) {
        throw N3.clientVersion = this._clientVersion, N3;
      }
    }
    _hasPreviewFlag(n) {
      return !!this._engineConfig.previewFeatures?.includes(n);
    }
    $extends = Cs;
  }
  return t;
}
__name(Ym, "Ym");
function bl(e7, t) {
  return Xm(e7) ? [new Sql(e7, t), el] : [e7, tl];
}
__name(bl, "bl");
function Xm(e7) {
  return Array.isArray(e7) && Array.isArray(e7.raw);
}
__name(Xm, "Xm");
u();
l();
c();
p();
d();
var ef = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
function tf(e7) {
  return new Proxy(e7, { get(t, r) {
    if (r in t) return t[r];
    if (!ef.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
  } });
}
__name(tf, "tf");
u();
l();
c();
p();
d();

// generated/prisma/internal/class.ts
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n  runtime  = "workerd"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Post {\n  id              Int                 @id @default(autoincrement())\n  slug            String              @unique\n  status          String\n  author          String              @default("Contenuti")\n  title           String\n  content         String\n  excerpt         String\n  metaDescription String?             @default("")\n  metaTitle       String?             @default("")\n  tags            String[]\n  dateCreated     DateTime            @default(now())\n  dateUpdated     DateTime            @default(now())\n  follow          Boolean?            @default(true)\n  featuredMedia   String?\n  thumbnail       String?\n  categories      CategoriesOnPosts[]\n\n  @@index([id])\n  @@index([slug])\n  @@map("posts")\n}\n\nmodel Category {\n  id       Int                 @id @default(autoincrement())\n  name     String?\n  parentId Int?\n  posts    CategoriesOnPosts[]\n  parent   Category?           @relation("parent", fields: [parentId], references: [id], onDelete: Cascade)\n  children Category[]          @relation("parent")\n\n  @@map("categories")\n}\n\nmodel CategoriesOnPosts {\n  postId     Int\n  categoryId Int\n  id         Int      @default(autoincrement())\n  category   Category @relation(fields: [categoryId], references: [id])\n  post       Post     @relation(fields: [postId], references: [id], onDelete: Cascade)\n\n  @@id([postId, categoryId])\n  @@index([postId])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Post":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"slug","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"author","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"dateCreated","kind":"scalar","type":"DateTime"},{"name":"dateUpdated","kind":"scalar","type":"DateTime"},{"name":"follow","kind":"scalar","type":"Boolean"},{"name":"featuredMedia","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"categories","kind":"object","type":"CategoriesOnPosts","relationName":"CategoriesOnPostsToPost"}],"dbName":"posts"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"parentId","kind":"scalar","type":"Int"},{"name":"posts","kind":"object","type":"CategoriesOnPosts","relationName":"CategoriesOnPostsToCategory"},{"name":"parent","kind":"object","type":"Category","relationName":"parent"},{"name":"children","kind":"object","type":"Category","relationName":"parent"}],"dbName":"categories"},"CategoriesOnPosts":{"fields":[{"name":"postId","kind":"scalar","type":"Int"},{"name":"categoryId","kind":"scalar","type":"Int"},{"name":"id","kind":"scalar","type":"Int"},{"name":"category","kind":"object","type":"Category","relationName":"CategoriesOnPostsToCategory"},{"name":"post","kind":"object","type":"Post","relationName":"CategoriesOnPostsToPost"}],"dbName":null}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","posts","parent","children","_count","category","post","categories","Post.findUnique","Post.findUniqueOrThrow","Post.findFirst","Post.findFirstOrThrow","Post.findMany","data","Post.createOne","Post.createMany","Post.createManyAndReturn","Post.updateOne","Post.updateMany","Post.updateManyAndReturn","create","update","Post.upsertOne","Post.deleteOne","Post.deleteMany","having","_avg","_sum","_min","_max","Post.groupBy","Post.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","CategoriesOnPosts.findUnique","CategoriesOnPosts.findUniqueOrThrow","CategoriesOnPosts.findFirst","CategoriesOnPosts.findFirstOrThrow","CategoriesOnPosts.findMany","CategoriesOnPosts.createOne","CategoriesOnPosts.createMany","CategoriesOnPosts.createManyAndReturn","CategoriesOnPosts.updateOne","CategoriesOnPosts.updateMany","CategoriesOnPosts.updateManyAndReturn","CategoriesOnPosts.upsertOne","CategoriesOnPosts.deleteOne","CategoriesOnPosts.deleteMany","CategoriesOnPosts.groupBy","CategoriesOnPosts.aggregate","AND","OR","NOT","postId","categoryId","id","equals","in","notIn","lt","lte","gt","gte","not","name","parentId","contains","startsWith","endsWith","slug","status","author","title","content","excerpt","metaDescription","metaTitle","tags","dateCreated","dateUpdated","follow","featuredMedia","thumbnail","has","hasEvery","hasSome","every","some","none","postId_categoryId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "1gEhMBMJAABzACBCAABtADBDAAARABBEAABtADBHAgAAAAFVAQAAAAFWAQBvACFXAQBvACFYAQBvACFZAQBvACFaAQBvACFbAQBwACFcAQBwACFdAABkACBeQABxACFfQABxACFgIAByACFhAQBwACFiAQBwACEBAAAAAQAgCAcAAHoAIAgAAHsAIEIAAHkAMEMAAAMAEEQAAHkAMEUCAG4AIUYCAG4AIUcCAG4AIQIHAADCAQAgCAAAxAEAIAkHAAB6ACAIAAB7ACBCAAB5ADBDAAADABBEAAB5ADBFAgBuACFGAgBuACFHAgBuACFpAAB4ACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAkDAABzACAEAAB2ACAFAAB3ACBCAAB0ADBDAAAIABBEAAB0ADBHAgBuACFQAQBwACFRAgB1ACEBAAAACAAgBQMAAMEBACAEAADCAQAgBQAAwwEAIFAAAIYBACBRAACGAQAgCQMAAHMAIAQAAHYAIAUAAHcAIEIAAHQAMEMAAAgAEEQAAHQAMEcCAAAAAVABAHAAIVECAHUAIQMAAAAIACABAAAKADACAAALACABAAAAAwAgAQAAAAgAIAEAAAADACABAAAAAQAgEwkAAHMAIEIAAG0AMEMAABEAEEQAAG0AMEcCAG4AIVUBAG8AIVYBAG8AIVcBAG8AIVgBAG8AIVkBAG8AIVoBAG8AIVsBAHAAIVwBAHAAIV0AAGQAIF5AAHEAIV9AAHEAIWAgAHIAIWEBAHAAIWIBAHAAIQYJAADBAQAgWwAAhgEAIFwAAIYBACBgAACGAQAgYQAAhgEAIGIAAIYBACADAAAAEQAgAQAAEgAwAgAAAQAgAwAAABEAIAEAABIAMAIAAAEAIAMAAAARACABAAASADACAAABACAQCQAAwAEAIEcCAAAAAVUBAAAAAVYBAAAAAVcBAAAAAVgBAAAAAVkBAAAAAVoBAAAAAVsBAAAAAVwBAAAAAV0AAL8BACBeQAAAAAFfQAAAAAFgIAAAAAFhAQAAAAFiAQAAAAEBDwAAFgAgD0cCAAAAAVUBAAAAAVYBAAAAAVcBAAAAAVgBAAAAAVkBAAAAAVoBAAAAAVsBAAAAAVwBAAAAAV0AAL8BACBeQAAAAAFfQAAAAAFgIAAAAAFhAQAAAAFiAQAAAAEBDwAAGAAwAQ8AABgAMBAJAAC1AQAgRwIAgQEAIVUBALEBACFWAQCxAQAhVwEAsQEAIVgBALEBACFZAQCxAQAhWgEAsQEAIVsBAIwBACFcAQCMAQAhXQAAsgEAIF5AALMBACFfQACzAQAhYCAAtAEAIWEBAIwBACFiAQCMAQAhAgAAAAEAIA8AABsAIA9HAgCBAQAhVQEAsQEAIVYBALEBACFXAQCxAQAhWAEAsQEAIVkBALEBACFaAQCxAQAhWwEAjAEAIVwBAIwBACFdAACyAQAgXkAAswEAIV9AALMBACFgIAC0AQAhYQEAjAEAIWIBAIwBACECAAAAEQAgDwAAHQAgAgAAABEAIA8AAB0AIAMAAAABACAWAAAWACAXAAAbACABAAAAAQAgAQAAABEAIAoGAACsAQAgHAAArQEAIB0AALABACAeAACvAQAgHwAArgEAIFsAAIYBACBcAACGAQAgYAAAhgEAIGEAAIYBACBiAACGAQAgEkIAAGIAMEMAACQAEEQAAGIAMEcCAFYAIVUBAGMAIVYBAGMAIVcBAGMAIVgBAGMAIVkBAGMAIVoBAGMAIVsBAFsAIVwBAFsAIV0AAGQAIF5AAGUAIV9AAGUAIWAgAGYAIWEBAFsAIWIBAFsAIQMAAAARACABAAAjADAbAAAkACADAAAAEQAgAQAAEgAwAgAAAQAgAQAAAAsAIAEAAAALACADAAAACAAgAQAACgAwAgAACwAgAwAAAAgAIAEAAAoAMAIAAAsAIAMAAAAIACABAAAKADACAAALACAGAwAAnQEAIAQAAKsBACAFAACeAQAgRwIAAAABUAEAAAABUQIAAAABAQ8AACwAIANHAgAAAAFQAQAAAAFRAgAAAAEBDwAALgAwAQ8AAC4AMAEAAAAIACAGAwAAjgEAIAQAAI8BACAFAACQAQAgRwIAgQEAIVABAIwBACFRAgCNAQAhAgAAAAsAIA8AADIAIANHAgCBAQAhUAEAjAEAIVECAI0BACECAAAACAAgDwAANAAgAgAAAAgAIA8AADQAIAEAAAAIACADAAAACwAgFgAALAAgFwAAMgAgAQAAAAsAIAEAAAAIACAHBgAAhwEAIBwAAIgBACAdAACLAQAgHgAAigEAIB8AAIkBACBQAACGAQAgUQAAhgEAIAZCAABaADBDAAA8ABBEAABaADBHAgBWACFQAQBbACFRAgBcACEDAAAACAAgAQAAOwAwGwAAPAAgAwAAAAgAIAEAAAoAMAIAAAsAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgBQcAAIQBACAIAACFAQAgRQIAAAABRgIAAAABRwIAAAABAQ8AAEQAIANFAgAAAAFGAgAAAAFHAgAAAAEBDwAARgAwAQ8AAEYAMAUHAACCAQAgCAAAgwEAIEUCAIEBACFGAgCBAQAhRwIAgQEAIQIAAAAFACAPAABJACADRQIAgQEAIUYCAIEBACFHAgCBAQAhAgAAAAMAIA8AAEsAIAIAAAADACAPAABLACADAAAABQAgFgAARAAgFwAASQAgAQAAAAUAIAEAAAADACAFBgAAfAAgHAAAfQAgHQAAgAEAIB4AAH8AIB8AAH4AIAZCAABVADBDAABSABBEAABVADBFAgBWACFGAgBWACFHAgBWACEDAAAAAwAgAQAAUQAwGwAAUgAgAwAAAAMAIAEAAAQAMAIAAAUAIAZCAABVADBDAABSABBEAABVADBFAgBWACFGAgBWACFHAgBWACENBgAAWAAgHAAAWQAgHQAAWAAgHgAAWAAgHwAAWAAgSAIAAAABSQIAAAAESgIAAAAESwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAVwAhDQYAAFgAIBwAAFkAIB0AAFgAIB4AAFgAIB8AAFgAIEgCAAAAAUkCAAAABEoCAAAABEsCAAAAAUwCAAAAAU0CAAAAAU4CAAAAAU8CAFcAIQhIAgAAAAFJAgAAAARKAgAAAARLAgAAAAFMAgAAAAFNAgAAAAFOAgAAAAFPAgBYACEISAgAAAABSQgAAAAESggAAAAESwgAAAABTAgAAAABTQgAAAABTggAAAABTwgAWQAhBkIAAFoAMEMAADwAEEQAAFoAMEcCAFYAIVABAFsAIVECAFwAIQ4GAABeACAeAABhACAfAABhACBIAQAAAAFJAQAAAAVKAQAAAAVLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBgACFSAQAAAAFTAQAAAAFUAQAAAAENBgAAXgAgHAAAXwAgHQAAXgAgHgAAXgAgHwAAXgAgSAIAAAABSQIAAAAFSgIAAAAFSwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAXQAhDQYAAF4AIBwAAF8AIB0AAF4AIB4AAF4AIB8AAF4AIEgCAAAAAUkCAAAABUoCAAAABUsCAAAAAUwCAAAAAU0CAAAAAU4CAAAAAU8CAF0AIQhIAgAAAAFJAgAAAAVKAgAAAAVLAgAAAAFMAgAAAAFNAgAAAAFOAgAAAAFPAgBeACEISAgAAAABSQgAAAAFSggAAAAFSwgAAAABTAgAAAABTQgAAAABTggAAAABTwgAXwAhDgYAAF4AIB4AAGEAIB8AAGEAIEgBAAAAAUkBAAAABUoBAAAABUsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGAAIVIBAAAAAVMBAAAAAVQBAAAAAQtIAQAAAAFJAQAAAAVKAQAAAAVLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBhACFSAQAAAAFTAQAAAAFUAQAAAAESQgAAYgAwQwAAJAAQRAAAYgAwRwIAVgAhVQEAYwAhVgEAYwAhVwEAYwAhWAEAYwAhWQEAYwAhWgEAYwAhWwEAWwAhXAEAWwAhXQAAZAAgXkAAZQAhX0AAZQAhYCAAZgAhYQEAWwAhYgEAWwAhDgYAAFgAIB4AAGwAIB8AAGwAIEgBAAAAAUkBAAAABEoBAAAABEsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGsAIVIBAAAAAVMBAAAAAVQBAAAAAQRIAQAAAAVjAQAAAAFkAQAAAARlAQAAAAQLBgAAWAAgHgAAagAgHwAAagAgSEAAAAABSUAAAAAESkAAAAAES0AAAAABTEAAAAABTUAAAAABTkAAAAABT0AAaQAhBQYAAF4AIB4AAGgAIB8AAGgAIEggAAAAAU8gAGcAIQUGAABeACAeAABoACAfAABoACBIIAAAAAFPIABnACECSCAAAAABTyAAaAAhCwYAAFgAIB4AAGoAIB8AAGoAIEhAAAAAAUlAAAAABEpAAAAABEtAAAAAAUxAAAAAAU1AAAAAAU5AAAAAAU9AAGkAIQhIQAAAAAFJQAAAAARKQAAAAARLQAAAAAFMQAAAAAFNQAAAAAFOQAAAAAFPQABqACEOBgAAWAAgHgAAbAAgHwAAbAAgSAEAAAABSQEAAAAESgEAAAAESwEAAAABTAEAAAABTQEAAAABTgEAAAABTwEAawAhUgEAAAABUwEAAAABVAEAAAABC0gBAAAAAUkBAAAABEoBAAAABEsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGwAIVIBAAAAAVMBAAAAAVQBAAAAARMJAABzACBCAABtADBDAAARABBEAABtADBHAgBuACFVAQBvACFWAQBvACFXAQBvACFYAQBvACFZAQBvACFaAQBvACFbAQBwACFcAQBwACFdAABkACBeQABxACFfQABxACFgIAByACFhAQBwACFiAQBwACEISAIAAAABSQIAAAAESgIAAAAESwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAWAAhC0gBAAAAAUkBAAAABEoBAAAABEsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGwAIVIBAAAAAVMBAAAAAVQBAAAAAQtIAQAAAAFJAQAAAAVKAQAAAAVLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBhACFSAQAAAAFTAQAAAAFUAQAAAAEISEAAAAABSUAAAAAESkAAAAAES0AAAAABTEAAAAABTUAAAAABTkAAAAABT0AAagAhAkggAAAAAU8gAGgAIQNmAAADACBnAAADACBoAAADACAJAwAAcwAgBAAAdgAgBQAAdwAgQgAAdAAwQwAACAAQRAAAdAAwRwIAbgAhUAEAcAAhUQIAdQAhCEgCAAAAAUkCAAAABUoCAAAABUsCAAAAAUwCAAAAAU0CAAAAAU4CAAAAAU8CAF4AIQsDAABzACAEAAB2ACAFAAB3ACBCAAB0ADBDAAAIABBEAAB0ADBHAgBuACFQAQBwACFRAgB1ACFqAAAIACBrAAAIACADZgAACAAgZwAACAAgaAAACAAgAkUCAAAAAUYCAAAAAQgHAAB6ACAIAAB7ACBCAAB5ADBDAAADABBEAAB5ADBFAgBuACFGAgBuACFHAgBuACELAwAAcwAgBAAAdgAgBQAAdwAgQgAAdAAwQwAACAAQRAAAdAAwRwIAbgAhUAEAcAAhUQIAdQAhagAACAAgawAACAAgFQkAAHMAIEIAAG0AMEMAABEAEEQAAG0AMEcCAG4AIVUBAG8AIVYBAG8AIVcBAG8AIVgBAG8AIVkBAG8AIVoBAG8AIVsBAHAAIVwBAHAAIV0AAGQAIF5AAHEAIV9AAHEAIWAgAHIAIWEBAHAAIWIBAHAAIWoAABEAIGsAABEAIAAAAAAABW8CAAAAAXYCAAAAAXcCAAAAAXgCAAAAAXkCAAAAAQUWAADPAQAgFwAA1QEAIGwAANABACBtAADUAQAgcgAACwAgBRYAAM0BACAXAADSAQAgbAAAzgEAIG0AANEBACByAAABACADFgAAzwEAIGwAANABACByAAALACADFgAAzQEAIGwAAM4BACByAAABACAAAAAAAAABbwEAAAABBW8CAAAAAXYCAAAAAXcCAAAAAXgCAAAAAXkCAAAAAQsWAACfAQAwFwAApQEAMGwAAKABADBtAACkAQAwbgAAoQEAIG8AAKIBADBwAACiAQAwcQAAogEAMHIAAKIBADBzAACmAQAwdAAApwEAMAcWAADGAQAgFwAAywEAIGwAAMcBACBtAADKAQAgcAAACAAgcQAACAAgcgAACwAgCxYAAJEBADAXAACWAQAwbAAAkgEAMG0AAJMBADBuAACUAQAgbwAAlQEAMHAAAJUBADBxAACVAQAwcgAAlQEAMHMAAJcBADB0AACYAQAwBAMAAJ0BACAFAACeAQAgRwIAAAABUAEAAAABAgAAAAsAIBYAAJwBACADAAAACwAgFgAAnAEAIBcAAJsBACABDwAAyQEAMAkDAABzACAEAAB2ACAFAAB3ACBCAAB0ADBDAAAIABBEAAB0ADBHAgAAAAFQAQBwACFRAgB1ACECAAAACwAgDwAAmwEAIAIAAACZAQAgDwAAmgEAIAZCAACYAQAwQwAAmQEAEEQAAJgBADBHAgBuACFQAQBwACFRAgB1ACEGQgAAmAEAMEMAAJkBABBEAACYAQAwRwIAbgAhUAEAcAAhUQIAdQAhAkcCAIEBACFQAQCMAQAhBAMAAI4BACAFAACQAQAgRwIAgQEAIVABAIwBACEEAwAAnQEAIAUAAJ4BACBHAgAAAAFQAQAAAAEEFgAAnwEAMGwAAKABADBuAAChAQAgcgAAogEAMAQWAACRAQAwbAAAkgEAMG4AAJQBACByAACVAQAwAwgAAIUBACBFAgAAAAFHAgAAAAECAAAABQAgFgAAowEAIAEPAADIAQAwCQcAAHoAIAgAAHsAIEIAAHkAMEMAAAMAEEQAAHkAMEUCAG4AIUYCAG4AIUcCAG4AIWkAAHgAIAMIAACFAQAgRQIAAAABRwIAAAABAwAAAAUAIBYAAKMBACAXAACqAQAgAgAAAAUAIA8AAKoBACACAAAAqAEAIA8AAKkBACAGQgAApwEAMEMAAKgBABBEAACnAQAwRQIAbgAhRgIAbgAhRwIAbgAhBkIAAKcBADBDAACoAQAQRAAApwEAMEUCAG4AIUYCAG4AIUcCAG4AIQJFAgCBAQAhRwIAgQEAIQMIAACDAQAgRQIAgQEAIUcCAIEBACEDFgAAxgEAIGwAAMcBACByAAALACAAAAAAAAFvAQAAAAECbwEAAAAEdQEAAAAFAW9AAAAAAQFvIAAAAAELFgAAtgEAMBcAALoBADBsAAC3AQAwbQAAuAEAMG4AALkBACBvAACiAQAwcAAAogEAMHEAAKIBADByAACiAQAwcwAAuwEAMHQAAKcBADADBwAAhAEAIEYCAAAAAUcCAAAAAQIAAAAFACAWAAC-AQAgAwAAAAUAIBYAAL4BACAXAAC9AQAgAQ8AAMUBADACAAAABQAgDwAAvQEAIAIAAACoAQAgDwAAvAEAIAJGAgCBAQAhRwIAgQEAIQMHAACCAQAgRgIAgQEAIUcCAIEBACEDBwAAhAEAIEYCAAAAAUcCAAAAAQFvAQAAAAQEFgAAtgEAMGwAALcBADBuAAC5AQAgcgAAogEAMAAFAwAAwQEAIAQAAMIBACAFAADDAQAgUAAAhgEAIFEAAIYBACAABgkAAMEBACBbAACGAQAgXAAAhgEAIGAAAIYBACBhAACGAQAgYgAAhgEAIAJGAgAAAAFHAgAAAAEFAwAAnQEAIAQAAKsBACBHAgAAAAFQAQAAAAFRAgAAAAECAAAACwAgFgAAxgEAIAJFAgAAAAFHAgAAAAECRwIAAAABUAEAAAABAwAAAAgAIBYAAMYBACAXAADMAQAgBwAAAAgAIAMAAI4BACAEAACPAQAgDwAAzAEAIEcCAIEBACFQAQCMAQAhUQIAjQEAIQUDAACOAQAgBAAAjwEAIEcCAIEBACFQAQCMAQAhUQIAjQEAIQ9HAgAAAAFVAQAAAAFWAQAAAAFXAQAAAAFYAQAAAAFZAQAAAAFaAQAAAAFbAQAAAAFcAQAAAAFdAAC_AQAgXkAAAAABX0AAAAABYCAAAAABYQEAAAABYgEAAAABAgAAAAEAIBYAAM0BACAFBAAAqwEAIAUAAJ4BACBHAgAAAAFQAQAAAAFRAgAAAAECAAAACwAgFgAAzwEAIAMAAAARACAWAADNAQAgFwAA0wEAIBEAAAARACAPAADTAQAgRwIAgQEAIVUBALEBACFWAQCxAQAhVwEAsQEAIVgBALEBACFZAQCxAQAhWgEAsQEAIVsBAIwBACFcAQCMAQAhXQAAsgEAIF5AALMBACFfQACzAQAhYCAAtAEAIWEBAIwBACFiAQCMAQAhD0cCAIEBACFVAQCxAQAhVgEAsQEAIVcBALEBACFYAQCxAQAhWQEAsQEAIVoBALEBACFbAQCMAQAhXAEAjAEAIV0AALIBACBeQACzAQAhX0AAswEAIWAgALQBACFhAQCMAQAhYgEAjAEAIQMAAAAIACAWAADPAQAgFwAA1gEAIAcAAAAIACAEAACPAQAgBQAAkAEAIA8AANYBACBHAgCBAQAhUAEAjAEAIVECAI0BACEFBAAAjwEAIAUAAJABACBHAgCBAQAhUAEAjAEAIVECAI0BACECBgAFCQYCAgcAAwgAAQQDBwIECQMFDAMGAAQCAw0ABQ4AAQkPAAAAAAUGAAocAAsdAAweAA0fAA4AAAAAAAUGAAocAAsdAAweAA0fAA4BBDEDAQQ3AwUGABMcABQdABUeABYfABcAAAAAAAUGABMcABQdABUeABYfABcCBwADCAABAgcAAwgAAQUGABwcAB0dAB4eAB8fACAAAAAAAAUGABwcAB0dAB4eAB8fACAKAgELEAEMEwENFAEOFQEQFwERGQYSGgcTHAEUHgYVHwgYIAEZIQEaIgYgJQkhJg8iJwMjKAMkKQMlKgMmKwMnLQMoLwYpMBAqMwMrNQYsNhEtOAMuOQMvOgYwPRIxPhgyPwIzQAI0QQI1QgI2QwI3RQI4RwY5SBk6SgI7TAY8TRo9TgI-TwI_UAZAUxtBVCE"
};
config2.compilerWasm = {
  getRuntime: /* @__PURE__ */ __name(async () => await Promise.resolve().then(() => (init_query_compiler_fast_bg(), query_compiler_fast_bg_exports)), "getRuntime"),
  getQueryCompilerWasmModule: /* @__PURE__ */ __name(async () => {
    const { default: module } = await import("./23f884361ad3033cf55010f971781b415e95947f-query_compiler_fast_bg.wasm");
    return module;
  }, "getQueryCompilerWasmModule"),
  importName: "./query_compiler_fast_bg.js"
};
if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
  ee.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
}
function getPrismaClientClass() {
  return Ym(config2);
}
__name(getPrismaClientClass, "getPrismaClientClass");

// generated/prisma/internal/prismaNamespace.ts
init_modules_watch_stub();
var getExtensionContext = po.getExtensionContext;
var NullTypes2 = {
  DbNull: NullTypes.DbNull,
  JsonNull: NullTypes.JsonNull,
  AnyNull: NullTypes.AnyNull
};
var TransactionIsolationLevel = tf({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = po.defineExtension;

// generated/prisma/enums.ts
init_modules_watch_stub();

// generated/prisma/client.ts
globalThis["__dirname"] = "/";
var PrismaClient = getPrismaClientClass();

// generated/prisma-supabase/client.ts
init_modules_watch_stub();

// generated/prisma-supabase/internal/class.ts
init_modules_watch_stub();
var config3 = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n  runtime  = "workerd"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Post {\n  id              Int                 @id @default(autoincrement())\n  slug            String              @unique\n  status          String\n  author          String              @default("Contenuti")\n  title           String\n  content         String\n  excerpt         String\n  metaDescription String?             @default("")\n  metaTitle       String?             @default("")\n  tags            String[]\n  dateCreated     DateTime            @default(now())\n  dateUpdated     DateTime            @default(now())\n  follow          Boolean?            @default(true)\n  featuredMedia   String?\n  thumbnail       String?\n  categories      CategoriesOnPosts[]\n\n  @@index([id])\n  @@index([slug])\n  @@map("posts")\n}\n\nmodel Category {\n  id       Int                 @id @default(autoincrement())\n  name     String?\n  parentId Int?\n  posts    CategoriesOnPosts[]\n  parent   Category?           @relation("parent", fields: [parentId], references: [id], onDelete: Cascade)\n  children Category[]          @relation("parent")\n\n  @@map("categories")\n}\n\nmodel CategoriesOnPosts {\n  postId     Int\n  categoryId Int\n  id         Int      @default(autoincrement())\n  category   Category @relation(fields: [categoryId], references: [id])\n  post       Post     @relation(fields: [postId], references: [id], onDelete: Cascade)\n\n  @@id([postId, categoryId])\n  @@index([postId])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config3.runtimeDataModel = JSON.parse('{"models":{"Post":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"slug","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"author","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"dateCreated","kind":"scalar","type":"DateTime"},{"name":"dateUpdated","kind":"scalar","type":"DateTime"},{"name":"follow","kind":"scalar","type":"Boolean"},{"name":"featuredMedia","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"categories","kind":"object","type":"CategoriesOnPosts","relationName":"CategoriesOnPostsToPost"}],"dbName":"posts"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"parentId","kind":"scalar","type":"Int"},{"name":"posts","kind":"object","type":"CategoriesOnPosts","relationName":"CategoriesOnPostsToCategory"},{"name":"parent","kind":"object","type":"Category","relationName":"parent"},{"name":"children","kind":"object","type":"Category","relationName":"parent"}],"dbName":"categories"},"CategoriesOnPosts":{"fields":[{"name":"postId","kind":"scalar","type":"Int"},{"name":"categoryId","kind":"scalar","type":"Int"},{"name":"id","kind":"scalar","type":"Int"},{"name":"category","kind":"object","type":"Category","relationName":"CategoriesOnPostsToCategory"},{"name":"post","kind":"object","type":"Post","relationName":"CategoriesOnPostsToPost"}],"dbName":null}},"enums":{},"types":{}}');
config3.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","posts","parent","children","_count","category","post","categories","Post.findUnique","Post.findUniqueOrThrow","Post.findFirst","Post.findFirstOrThrow","Post.findMany","data","Post.createOne","Post.createMany","Post.createManyAndReturn","Post.updateOne","Post.updateMany","Post.updateManyAndReturn","create","update","Post.upsertOne","Post.deleteOne","Post.deleteMany","having","_avg","_sum","_min","_max","Post.groupBy","Post.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","CategoriesOnPosts.findUnique","CategoriesOnPosts.findUniqueOrThrow","CategoriesOnPosts.findFirst","CategoriesOnPosts.findFirstOrThrow","CategoriesOnPosts.findMany","CategoriesOnPosts.createOne","CategoriesOnPosts.createMany","CategoriesOnPosts.createManyAndReturn","CategoriesOnPosts.updateOne","CategoriesOnPosts.updateMany","CategoriesOnPosts.updateManyAndReturn","CategoriesOnPosts.upsertOne","CategoriesOnPosts.deleteOne","CategoriesOnPosts.deleteMany","CategoriesOnPosts.groupBy","CategoriesOnPosts.aggregate","AND","OR","NOT","postId","categoryId","id","equals","in","notIn","lt","lte","gt","gte","not","name","parentId","contains","startsWith","endsWith","slug","status","author","title","content","excerpt","metaDescription","metaTitle","tags","dateCreated","dateUpdated","follow","featuredMedia","thumbnail","has","hasEvery","hasSome","every","some","none","postId_categoryId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "1gEhMBMJAABzACBCAABtADBDAAARABBEAABtADBHAgAAAAFVAQAAAAFWAQBvACFXAQBvACFYAQBvACFZAQBvACFaAQBvACFbAQBwACFcAQBwACFdAABkACBeQABxACFfQABxACFgIAByACFhAQBwACFiAQBwACEBAAAAAQAgCAcAAHoAIAgAAHsAIEIAAHkAMEMAAAMAEEQAAHkAMEUCAG4AIUYCAG4AIUcCAG4AIQIHAADCAQAgCAAAxAEAIAkHAAB6ACAIAAB7ACBCAAB5ADBDAAADABBEAAB5ADBFAgBuACFGAgBuACFHAgBuACFpAAB4ACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAkDAABzACAEAAB2ACAFAAB3ACBCAAB0ADBDAAAIABBEAAB0ADBHAgBuACFQAQBwACFRAgB1ACEBAAAACAAgBQMAAMEBACAEAADCAQAgBQAAwwEAIFAAAIYBACBRAACGAQAgCQMAAHMAIAQAAHYAIAUAAHcAIEIAAHQAMEMAAAgAEEQAAHQAMEcCAAAAAVABAHAAIVECAHUAIQMAAAAIACABAAAKADACAAALACABAAAAAwAgAQAAAAgAIAEAAAADACABAAAAAQAgEwkAAHMAIEIAAG0AMEMAABEAEEQAAG0AMEcCAG4AIVUBAG8AIVYBAG8AIVcBAG8AIVgBAG8AIVkBAG8AIVoBAG8AIVsBAHAAIVwBAHAAIV0AAGQAIF5AAHEAIV9AAHEAIWAgAHIAIWEBAHAAIWIBAHAAIQYJAADBAQAgWwAAhgEAIFwAAIYBACBgAACGAQAgYQAAhgEAIGIAAIYBACADAAAAEQAgAQAAEgAwAgAAAQAgAwAAABEAIAEAABIAMAIAAAEAIAMAAAARACABAAASADACAAABACAQCQAAwAEAIEcCAAAAAVUBAAAAAVYBAAAAAVcBAAAAAVgBAAAAAVkBAAAAAVoBAAAAAVsBAAAAAVwBAAAAAV0AAL8BACBeQAAAAAFfQAAAAAFgIAAAAAFhAQAAAAFiAQAAAAEBDwAAFgAgD0cCAAAAAVUBAAAAAVYBAAAAAVcBAAAAAVgBAAAAAVkBAAAAAVoBAAAAAVsBAAAAAVwBAAAAAV0AAL8BACBeQAAAAAFfQAAAAAFgIAAAAAFhAQAAAAFiAQAAAAEBDwAAGAAwAQ8AABgAMBAJAAC1AQAgRwIAgQEAIVUBALEBACFWAQCxAQAhVwEAsQEAIVgBALEBACFZAQCxAQAhWgEAsQEAIVsBAIwBACFcAQCMAQAhXQAAsgEAIF5AALMBACFfQACzAQAhYCAAtAEAIWEBAIwBACFiAQCMAQAhAgAAAAEAIA8AABsAIA9HAgCBAQAhVQEAsQEAIVYBALEBACFXAQCxAQAhWAEAsQEAIVkBALEBACFaAQCxAQAhWwEAjAEAIVwBAIwBACFdAACyAQAgXkAAswEAIV9AALMBACFgIAC0AQAhYQEAjAEAIWIBAIwBACECAAAAEQAgDwAAHQAgAgAAABEAIA8AAB0AIAMAAAABACAWAAAWACAXAAAbACABAAAAAQAgAQAAABEAIAoGAACsAQAgHAAArQEAIB0AALABACAeAACvAQAgHwAArgEAIFsAAIYBACBcAACGAQAgYAAAhgEAIGEAAIYBACBiAACGAQAgEkIAAGIAMEMAACQAEEQAAGIAMEcCAFYAIVUBAGMAIVYBAGMAIVcBAGMAIVgBAGMAIVkBAGMAIVoBAGMAIVsBAFsAIVwBAFsAIV0AAGQAIF5AAGUAIV9AAGUAIWAgAGYAIWEBAFsAIWIBAFsAIQMAAAARACABAAAjADAbAAAkACADAAAAEQAgAQAAEgAwAgAAAQAgAQAAAAsAIAEAAAALACADAAAACAAgAQAACgAwAgAACwAgAwAAAAgAIAEAAAoAMAIAAAsAIAMAAAAIACABAAAKADACAAALACAGAwAAnQEAIAQAAKsBACAFAACeAQAgRwIAAAABUAEAAAABUQIAAAABAQ8AACwAIANHAgAAAAFQAQAAAAFRAgAAAAEBDwAALgAwAQ8AAC4AMAEAAAAIACAGAwAAjgEAIAQAAI8BACAFAACQAQAgRwIAgQEAIVABAIwBACFRAgCNAQAhAgAAAAsAIA8AADIAIANHAgCBAQAhUAEAjAEAIVECAI0BACECAAAACAAgDwAANAAgAgAAAAgAIA8AADQAIAEAAAAIACADAAAACwAgFgAALAAgFwAAMgAgAQAAAAsAIAEAAAAIACAHBgAAhwEAIBwAAIgBACAdAACLAQAgHgAAigEAIB8AAIkBACBQAACGAQAgUQAAhgEAIAZCAABaADBDAAA8ABBEAABaADBHAgBWACFQAQBbACFRAgBcACEDAAAACAAgAQAAOwAwGwAAPAAgAwAAAAgAIAEAAAoAMAIAAAsAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgBQcAAIQBACAIAACFAQAgRQIAAAABRgIAAAABRwIAAAABAQ8AAEQAIANFAgAAAAFGAgAAAAFHAgAAAAEBDwAARgAwAQ8AAEYAMAUHAACCAQAgCAAAgwEAIEUCAIEBACFGAgCBAQAhRwIAgQEAIQIAAAAFACAPAABJACADRQIAgQEAIUYCAIEBACFHAgCBAQAhAgAAAAMAIA8AAEsAIAIAAAADACAPAABLACADAAAABQAgFgAARAAgFwAASQAgAQAAAAUAIAEAAAADACAFBgAAfAAgHAAAfQAgHQAAgAEAIB4AAH8AIB8AAH4AIAZCAABVADBDAABSABBEAABVADBFAgBWACFGAgBWACFHAgBWACEDAAAAAwAgAQAAUQAwGwAAUgAgAwAAAAMAIAEAAAQAMAIAAAUAIAZCAABVADBDAABSABBEAABVADBFAgBWACFGAgBWACFHAgBWACENBgAAWAAgHAAAWQAgHQAAWAAgHgAAWAAgHwAAWAAgSAIAAAABSQIAAAAESgIAAAAESwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAVwAhDQYAAFgAIBwAAFkAIB0AAFgAIB4AAFgAIB8AAFgAIEgCAAAAAUkCAAAABEoCAAAABEsCAAAAAUwCAAAAAU0CAAAAAU4CAAAAAU8CAFcAIQhIAgAAAAFJAgAAAARKAgAAAARLAgAAAAFMAgAAAAFNAgAAAAFOAgAAAAFPAgBYACEISAgAAAABSQgAAAAESggAAAAESwgAAAABTAgAAAABTQgAAAABTggAAAABTwgAWQAhBkIAAFoAMEMAADwAEEQAAFoAMEcCAFYAIVABAFsAIVECAFwAIQ4GAABeACAeAABhACAfAABhACBIAQAAAAFJAQAAAAVKAQAAAAVLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBgACFSAQAAAAFTAQAAAAFUAQAAAAENBgAAXgAgHAAAXwAgHQAAXgAgHgAAXgAgHwAAXgAgSAIAAAABSQIAAAAFSgIAAAAFSwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAXQAhDQYAAF4AIBwAAF8AIB0AAF4AIB4AAF4AIB8AAF4AIEgCAAAAAUkCAAAABUoCAAAABUsCAAAAAUwCAAAAAU0CAAAAAU4CAAAAAU8CAF0AIQhIAgAAAAFJAgAAAAVKAgAAAAVLAgAAAAFMAgAAAAFNAgAAAAFOAgAAAAFPAgBeACEISAgAAAABSQgAAAAFSggAAAAFSwgAAAABTAgAAAABTQgAAAABTggAAAABTwgAXwAhDgYAAF4AIB4AAGEAIB8AAGEAIEgBAAAAAUkBAAAABUoBAAAABUsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGAAIVIBAAAAAVMBAAAAAVQBAAAAAQtIAQAAAAFJAQAAAAVKAQAAAAVLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBhACFSAQAAAAFTAQAAAAFUAQAAAAESQgAAYgAwQwAAJAAQRAAAYgAwRwIAVgAhVQEAYwAhVgEAYwAhVwEAYwAhWAEAYwAhWQEAYwAhWgEAYwAhWwEAWwAhXAEAWwAhXQAAZAAgXkAAZQAhX0AAZQAhYCAAZgAhYQEAWwAhYgEAWwAhDgYAAFgAIB4AAGwAIB8AAGwAIEgBAAAAAUkBAAAABEoBAAAABEsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGsAIVIBAAAAAVMBAAAAAVQBAAAAAQRIAQAAAAVjAQAAAAFkAQAAAARlAQAAAAQLBgAAWAAgHgAAagAgHwAAagAgSEAAAAABSUAAAAAESkAAAAAES0AAAAABTEAAAAABTUAAAAABTkAAAAABT0AAaQAhBQYAAF4AIB4AAGgAIB8AAGgAIEggAAAAAU8gAGcAIQUGAABeACAeAABoACAfAABoACBIIAAAAAFPIABnACECSCAAAAABTyAAaAAhCwYAAFgAIB4AAGoAIB8AAGoAIEhAAAAAAUlAAAAABEpAAAAABEtAAAAAAUxAAAAAAU1AAAAAAU5AAAAAAU9AAGkAIQhIQAAAAAFJQAAAAARKQAAAAARLQAAAAAFMQAAAAAFNQAAAAAFOQAAAAAFPQABqACEOBgAAWAAgHgAAbAAgHwAAbAAgSAEAAAABSQEAAAAESgEAAAAESwEAAAABTAEAAAABTQEAAAABTgEAAAABTwEAawAhUgEAAAABUwEAAAABVAEAAAABC0gBAAAAAUkBAAAABEoBAAAABEsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGwAIVIBAAAAAVMBAAAAAVQBAAAAARMJAABzACBCAABtADBDAAARABBEAABtADBHAgBuACFVAQBvACFWAQBvACFXAQBvACFYAQBvACFZAQBvACFaAQBvACFbAQBwACFcAQBwACFdAABkACBeQABxACFfQABxACFgIAByACFhAQBwACFiAQBwACEISAIAAAABSQIAAAAESgIAAAAESwIAAAABTAIAAAABTQIAAAABTgIAAAABTwIAWAAhC0gBAAAAAUkBAAAABEoBAAAABEsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU8BAGwAIVIBAAAAAVMBAAAAAVQBAAAAAQtIAQAAAAFJAQAAAAVKAQAAAAVLAQAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQBhACFSAQAAAAFTAQAAAAFUAQAAAAEISEAAAAABSUAAAAAESkAAAAAES0AAAAABTEAAAAABTUAAAAABTkAAAAABT0AAagAhAkggAAAAAU8gAGgAIQNmAAADACBnAAADACBoAAADACAJAwAAcwAgBAAAdgAgBQAAdwAgQgAAdAAwQwAACAAQRAAAdAAwRwIAbgAhUAEAcAAhUQIAdQAhCEgCAAAAAUkCAAAABUoCAAAABUsCAAAAAUwCAAAAAU0CAAAAAU4CAAAAAU8CAF4AIQsDAABzACAEAAB2ACAFAAB3ACBCAAB0ADBDAAAIABBEAAB0ADBHAgBuACFQAQBwACFRAgB1ACFqAAAIACBrAAAIACADZgAACAAgZwAACAAgaAAACAAgAkUCAAAAAUYCAAAAAQgHAAB6ACAIAAB7ACBCAAB5ADBDAAADABBEAAB5ADBFAgBuACFGAgBuACFHAgBuACELAwAAcwAgBAAAdgAgBQAAdwAgQgAAdAAwQwAACAAQRAAAdAAwRwIAbgAhUAEAcAAhUQIAdQAhagAACAAgawAACAAgFQkAAHMAIEIAAG0AMEMAABEAEEQAAG0AMEcCAG4AIVUBAG8AIVYBAG8AIVcBAG8AIVgBAG8AIVkBAG8AIVoBAG8AIVsBAHAAIVwBAHAAIV0AAGQAIF5AAHEAIV9AAHEAIWAgAHIAIWEBAHAAIWIBAHAAIWoAABEAIGsAABEAIAAAAAAABW8CAAAAAXYCAAAAAXcCAAAAAXgCAAAAAXkCAAAAAQUWAADPAQAgFwAA1QEAIGwAANABACBtAADUAQAgcgAACwAgBRYAAM0BACAXAADSAQAgbAAAzgEAIG0AANEBACByAAABACADFgAAzwEAIGwAANABACByAAALACADFgAAzQEAIGwAAM4BACByAAABACAAAAAAAAABbwEAAAABBW8CAAAAAXYCAAAAAXcCAAAAAXgCAAAAAXkCAAAAAQsWAACfAQAwFwAApQEAMGwAAKABADBtAACkAQAwbgAAoQEAIG8AAKIBADBwAACiAQAwcQAAogEAMHIAAKIBADBzAACmAQAwdAAApwEAMAcWAADGAQAgFwAAywEAIGwAAMcBACBtAADKAQAgcAAACAAgcQAACAAgcgAACwAgCxYAAJEBADAXAACWAQAwbAAAkgEAMG0AAJMBADBuAACUAQAgbwAAlQEAMHAAAJUBADBxAACVAQAwcgAAlQEAMHMAAJcBADB0AACYAQAwBAMAAJ0BACAFAACeAQAgRwIAAAABUAEAAAABAgAAAAsAIBYAAJwBACADAAAACwAgFgAAnAEAIBcAAJsBACABDwAAyQEAMAkDAABzACAEAAB2ACAFAAB3ACBCAAB0ADBDAAAIABBEAAB0ADBHAgAAAAFQAQBwACFRAgB1ACECAAAACwAgDwAAmwEAIAIAAACZAQAgDwAAmgEAIAZCAACYAQAwQwAAmQEAEEQAAJgBADBHAgBuACFQAQBwACFRAgB1ACEGQgAAmAEAMEMAAJkBABBEAACYAQAwRwIAbgAhUAEAcAAhUQIAdQAhAkcCAIEBACFQAQCMAQAhBAMAAI4BACAFAACQAQAgRwIAgQEAIVABAIwBACEEAwAAnQEAIAUAAJ4BACBHAgAAAAFQAQAAAAEEFgAAnwEAMGwAAKABADBuAAChAQAgcgAAogEAMAQWAACRAQAwbAAAkgEAMG4AAJQBACByAACVAQAwAwgAAIUBACBFAgAAAAFHAgAAAAECAAAABQAgFgAAowEAIAEPAADIAQAwCQcAAHoAIAgAAHsAIEIAAHkAMEMAAAMAEEQAAHkAMEUCAG4AIUYCAG4AIUcCAG4AIWkAAHgAIAMIAACFAQAgRQIAAAABRwIAAAABAwAAAAUAIBYAAKMBACAXAACqAQAgAgAAAAUAIA8AAKoBACACAAAAqAEAIA8AAKkBACAGQgAApwEAMEMAAKgBABBEAACnAQAwRQIAbgAhRgIAbgAhRwIAbgAhBkIAAKcBADBDAACoAQAQRAAApwEAMEUCAG4AIUYCAG4AIUcCAG4AIQJFAgCBAQAhRwIAgQEAIQMIAACDAQAgRQIAgQEAIUcCAIEBACEDFgAAxgEAIGwAAMcBACByAAALACAAAAAAAAFvAQAAAAECbwEAAAAEdQEAAAAFAW9AAAAAAQFvIAAAAAELFgAAtgEAMBcAALoBADBsAAC3AQAwbQAAuAEAMG4AALkBACBvAACiAQAwcAAAogEAMHEAAKIBADByAACiAQAwcwAAuwEAMHQAAKcBADADBwAAhAEAIEYCAAAAAUcCAAAAAQIAAAAFACAWAAC-AQAgAwAAAAUAIBYAAL4BACAXAAC9AQAgAQ8AAMUBADACAAAABQAgDwAAvQEAIAIAAACoAQAgDwAAvAEAIAJGAgCBAQAhRwIAgQEAIQMHAACCAQAgRgIAgQEAIUcCAIEBACEDBwAAhAEAIEYCAAAAAUcCAAAAAQFvAQAAAAQEFgAAtgEAMGwAALcBADBuAAC5AQAgcgAAogEAMAAFAwAAwQEAIAQAAMIBACAFAADDAQAgUAAAhgEAIFEAAIYBACAABgkAAMEBACBbAACGAQAgXAAAhgEAIGAAAIYBACBhAACGAQAgYgAAhgEAIAJGAgAAAAFHAgAAAAEFAwAAnQEAIAQAAKsBACBHAgAAAAFQAQAAAAFRAgAAAAECAAAACwAgFgAAxgEAIAJFAgAAAAFHAgAAAAECRwIAAAABUAEAAAABAwAAAAgAIBYAAMYBACAXAADMAQAgBwAAAAgAIAMAAI4BACAEAACPAQAgDwAAzAEAIEcCAIEBACFQAQCMAQAhUQIAjQEAIQUDAACOAQAgBAAAjwEAIEcCAIEBACFQAQCMAQAhUQIAjQEAIQ9HAgAAAAFVAQAAAAFWAQAAAAFXAQAAAAFYAQAAAAFZAQAAAAFaAQAAAAFbAQAAAAFcAQAAAAFdAAC_AQAgXkAAAAABX0AAAAABYCAAAAABYQEAAAABYgEAAAABAgAAAAEAIBYAAM0BACAFBAAAqwEAIAUAAJ4BACBHAgAAAAFQAQAAAAFRAgAAAAECAAAACwAgFgAAzwEAIAMAAAARACAWAADNAQAgFwAA0wEAIBEAAAARACAPAADTAQAgRwIAgQEAIVUBALEBACFWAQCxAQAhVwEAsQEAIVgBALEBACFZAQCxAQAhWgEAsQEAIVsBAIwBACFcAQCMAQAhXQAAsgEAIF5AALMBACFfQACzAQAhYCAAtAEAIWEBAIwBACFiAQCMAQAhD0cCAIEBACFVAQCxAQAhVgEAsQEAIVcBALEBACFYAQCxAQAhWQEAsQEAIVoBALEBACFbAQCMAQAhXAEAjAEAIV0AALIBACBeQACzAQAhX0AAswEAIWAgALQBACFhAQCMAQAhYgEAjAEAIQMAAAAIACAWAADPAQAgFwAA1gEAIAcAAAAIACAEAACPAQAgBQAAkAEAIA8AANYBACBHAgCBAQAhUAEAjAEAIVECAI0BACEFBAAAjwEAIAUAAJABACBHAgCBAQAhUAEAjAEAIVECAI0BACECBgAFCQYCAgcAAwgAAQQDBwIECQMFDAMGAAQCAw0ABQ4AAQkPAAAAAAUGAAocAAsdAAweAA0fAA4AAAAAAAUGAAocAAsdAAweAA0fAA4BBDEDAQQ3AwUGABMcABQdABUeABYfABcAAAAAAAUGABMcABQdABUeABYfABcCBwADCAABAgcAAwgAAQUGABwcAB0dAB4eAB8fACAAAAAAAAUGABwcAB0dAB4eAB8fACAKAgELEAEMEwENFAEOFQEQFwERGQYSGgcTHAEUHgYVHwgYIAEZIQEaIgYgJQkhJg8iJwMjKAMkKQMlKgMmKwMnLQMoLwYpMBAqMwMrNQYsNhEtOAMuOQMvOgYwPRIxPhgyPwIzQAI0QQI1QgI2QwI3RQI4RwY5SBk6SgI7TAY8TRo9TgI-TwI_UAZAUxtBVCE"
};
config3.compilerWasm = {
  getRuntime: /* @__PURE__ */ __name(async () => await Promise.resolve().then(() => (init_query_compiler_fast_bg2(), query_compiler_fast_bg_exports2)), "getRuntime"),
  getQueryCompilerWasmModule: /* @__PURE__ */ __name(async () => {
    const { default: module } = await import("./23f884361ad3033cf55010f971781b415e95947f-query_compiler_fast_bg.wasm");
    return module;
  }, "getQueryCompilerWasmModule"),
  importName: "./query_compiler_fast_bg.js"
};
if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
  ee.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
}
function getPrismaClientClass2() {
  return Ym(config3);
}
__name(getPrismaClientClass2, "getPrismaClientClass");

// generated/prisma-supabase/internal/prismaNamespace.ts
init_modules_watch_stub();
var getExtensionContext2 = po.getExtensionContext;
var NullTypes3 = {
  DbNull: NullTypes.DbNull,
  JsonNull: NullTypes.JsonNull,
  AnyNull: NullTypes.AnyNull
};
var TransactionIsolationLevel2 = tf({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension2 = po.defineExtension;

// generated/prisma-supabase/enums.ts
init_modules_watch_stub();

// generated/prisma-supabase/client.ts
globalThis["__dirname"] = "/";
var PrismaClient2 = getPrismaClientClass2();

// lib/utils/prismaConnection.ts
function prismaConnection(c2) {
  const connectionString = `${c2.env.HYPERDRIVE.connectionString}`;
  const adapter = new PrismaPgAdapterFactory({ connectionString });
  const prisma = new PrismaClient({ adapter });
  return prisma;
}
__name(prismaConnection, "prismaConnection");
function prismaConnectionSupabase(c2) {
  const connectionString = `${c2.env.SUPABASE_DB_URL}`;
  const adapter = new PrismaPgAdapterFactory({ connectionString });
  const prisma = new PrismaClient2({ adapter });
  console.log("Switched to Supabase (remote) client");
  return prisma;
}
__name(prismaConnectionSupabase, "prismaConnectionSupabase");
async function choosePrismaConnection(c2) {
  try {
    const prismaLocal = prismaConnection(c2);
    const testQuery = await prismaLocal.post.findFirstOrThrow();
    console.log(testQuery);
    return prismaLocal;
  } catch (e7) {
    console.error("ERRORE CONNESSIONE SERVER LOCALE: ", e7);
    const prismaRemote = prismaConnectionSupabase(c2);
    const testQuery = await prismaRemote.post.findFirstOrThrow();
    console.log(testQuery);
    return prismaRemote;
  }
}
__name(choosePrismaConnection, "choosePrismaConnection");

// routes/api/sync/syncDatabases.ts
init_modules_watch_stub();
var MAX_REMOTE_ARTICLES = 50;
async function syncDatabasesRoute(c2) {
  try {
    await syncDatabases(c2.env);
    return c2.json({ message: "Databases Synced" }, 200);
  } catch (e7) {
    console.error("Failed Database Sync");
    return c2.json({ message: e7.message }, 500);
  }
}
__name(syncDatabasesRoute, "syncDatabasesRoute");
async function syncDatabases(env) {
  const { localDb, remoteDb } = getDbConnections(env);
  await syncCategories(env);
  const localArticles = await localDb.post.findMany({
    orderBy: {
      dateCreated: "desc"
    }
  });
  const remoteArticles = await remoteDb.post.findMany({
    orderBy: {
      dateCreated: "desc"
    }
  });
  for (let i = 0; i < MAX_REMOTE_ARTICLES; i++) {
    if (!remoteArticles.find((el2) => compareArticles(el2, localArticles[i]))) {
      await syncSinglePost(localArticles, i, env);
    }
  }
  const deletedFromBackup = cleanBackupDb(remoteArticles, remoteDb);
  await syncCategoriesPostRelation(env);
  console.log(`Local length: `, await localDb.post.count());
  console.log("DELETED FROM BACKUP: ", await deletedFromBackup);
  console.log(`REMOTE LENGTH: `, await remoteDb.post.count());
  console.log(`REMOTE LAST: `, remoteArticles[0].title);
}
__name(syncDatabases, "syncDatabases");
function getDbConnections(env) {
  const connectionStringLocal = `${env.HYPERDRIVE.connectionString}`;
  const connectionStringSupabase = `${env.SUPABASE_DB_URL}`;
  const adapterLocal = new PrismaPgAdapterFactory({ connectionString: connectionStringLocal });
  const localDb = new PrismaClient({ adapter: adapterLocal });
  const adapterSupabase = new PrismaPgAdapterFactory({ connectionString: connectionStringSupabase });
  const remoteDb = new PrismaClient2({ adapter: adapterSupabase });
  return { localDb, remoteDb };
}
__name(getDbConnections, "getDbConnections");
async function syncSinglePost(localArticles, index, env) {
  const { remoteDb } = getDbConnections(env);
  const res = await remoteDb.post.upsert({ where: { slug: localArticles[index].slug }, update: { ...localArticles[index] }, create: { ...localArticles[index] } });
  console.log(`DB RESPONSE:`, res);
}
__name(syncSinglePost, "syncSinglePost");
async function cleanBackupDb(remoteArticles, remoteDb) {
  const deletedFromBackup = [];
  while (remoteArticles.length > MAX_REMOTE_ARTICLES) {
    const toDelete = remoteArticles.pop();
    deletedFromBackup.push(toDelete?.slug);
    await remoteDb.post.delete({
      where: { id: toDelete?.id }
    });
  }
  return deletedFromBackup;
}
__name(cleanBackupDb, "cleanBackupDb");
function compareArticles(remoteArticle, localArticle) {
  return remoteArticle.slug === localArticle.slug && remoteArticle.title === localArticle.title && remoteArticle.content === localArticle.content && remoteArticle.tags.toString() === localArticle.tags.toString() && remoteArticle.thumbnail === localArticle.thumbnail && remoteArticle.featuredMedia === localArticle.featuredMedia;
}
__name(compareArticles, "compareArticles");
async function syncCategories(env) {
  const { localDb, remoteDb } = getDbConnections(env);
  const localCategories = await localDb.category.findMany({});
  await Promise.all(localCategories.map(async (localCat) => {
    const promise = await remoteDb.category.upsert({ where: { id: localCat.id }, update: { ...localCat }, create: { ...localCat } });
    return promise;
  }));
}
__name(syncCategories, "syncCategories");
async function syncCategoriesPostRelation(env) {
  const { localDb, remoteDb } = getDbConnections(env);
  const remoteArticles = await remoteDb.post.findMany();
  const localCategoriesOnPost = await localDb.categoriesOnPosts.findMany({});
  await Promise.all(remoteArticles.map(async (remoteArt) => {
    const localArtRelations = localCategoriesOnPost.filter((lRel) => lRel.postId === remoteArt.id);
    const promises = await Promise.all(
      localArtRelations.map(async (localRel) => {
        const promise = await remoteDb.categoriesOnPosts.upsert({ where: {
          postId_categoryId: {
            postId: remoteArt.id,
            categoryId: localRel.categoryId
          }
        }, update: { ...localRel }, create: { ...localRel } });
        return promise;
      })
    );
    return promises;
  }));
  console.log(`Category <-> Post RELATIONS: ${await remoteDb.categoriesOnPosts.count()}`);
  console.log(`* Remember that one article has multiple categories so Relations should be > ${MAX_REMOTE_ARTICLES}`);
}
__name(syncCategoriesPostRelation, "syncCategoriesPostRelation");

// routes/api/post/importPost.ts
var importPost = /* @__PURE__ */ __name(async (_c2) => {
  const body = await _c2.req.json();
  const dbpw = _c2.env.DB_PASSWORD;
  if (body.pw !== dbpw)
    return _c2.json({ error: "Access Denied", status: 500 });
  try {
    const prisma = await choosePrismaConnection(_c2);
    await Promise.all(body.articles.map(async (article) => {
      if (!article.slug)
        return;
      const categoriesConnection = article.categories.map(({ category: { id } }) => {
        return {
          category: { connect: { id } }
        };
      });
      await prisma.post.upsert({
        where: { slug: article.slug },
        //if article already exists, we just update it
        update: {
          ...article,
          categories: void 0
        },
        // Article comes already parsed, so we pass it as it is
        create: {
          ...article,
          // we need to connect every post with its categories due to many to
          // many relation, syntax is confusing, but we are creating a join table (CategoriesOnPost) that's why we use create with connect
          categories: {
            create: categoriesConnection
          }
        }
      });
    }));
    await syncDatabases(_c2);
    return _c2.json({ message: "Posts imported" }, 200);
  } catch (e7) {
    console.log(e7);
    return _c2.json({ message: `Error: ${e7.message}` }, 500);
  }
}, "importPost");
var importPost_default = importPost;

// routes/api/post/importCategories.ts
init_modules_watch_stub();
var importCategories = /* @__PURE__ */ __name(async (_c2) => {
  const body = await _c2.req.json();
  const dbpw = _c2.env.DB_PASSWORD;
  if (body.pw !== dbpw)
    return _c2.json({ error: "Access Denied", status: 500 });
  try {
    const prisma = await choosePrismaConnection(_c2);
    const newCatNoParents = body.categories.filter((el2) => {
      return !el2.parentId;
    });
    const newCatParents = body.categories.filter((el2) => {
      return el2.parentId;
    });
    await Promise.all(newCatNoParents.map(async (category) => {
      await prisma.category.upsert({
        where: { id: category.id || -1 },
        update: {
          name: category.name,
          parentId: category.parentId != 0 ? category.parentId : null
        },
        create: {
          id: category.id ? category.id : void 0,
          name: category.name,
          parentId: category.parentId != 0 ? category.parentId : void 0
        }
      });
    }));
    await Promise.all(newCatParents.map(async (category) => {
      await prisma.category.upsert({
        where: { id: category.id || -1 },
        update: {
          name: category.name,
          parentId: category.parentId != 0 ? category.parentId : null
        },
        create: {
          id: category.id ? category.id : void 0,
          name: category.name,
          parentId: category.parentId != 0 ? category.parentId : void 0
        }
      });
    }));
    await syncDatabases(_c2);
    return _c2.json({ message: "Categories imported" }, 200);
  } catch (e7) {
    return _c2.json({ message: `Error: ${e7.message}` }, 500);
  }
}, "importCategories");
var importCategories_default = importCategories;

// routes/api/post/postArticle.ts
init_modules_watch_stub();
var postArticle = /* @__PURE__ */ __name(async (_c2) => {
  const body = await _c2.req.json();
  const dbpw = _c2.env.DB_PASSWORD;
  if (body.pw != dbpw)
    return _c2.json({ error: "Access Denied", status: 500 });
  const categoriesConnection = body.article.categories.map(({ id }) => {
    return {
      category: { connect: { id } }
    };
  });
  try {
    const prisma = await choosePrismaConnection(_c2);
    await prisma.post.create({
      data: {
        ...body.article,
        categories: {
          create: categoriesConnection
        }
      }
    });
    await syncDatabases(_c2);
    return _c2.json({ message: "article added to database" }, 200);
  } catch (e7) {
    return _c2.json({ message: `Error: ${e7.message}` }, 500);
  }
}, "postArticle");
var postArticle_default = postArticle;

// routes/api/post/editArticle.ts
init_modules_watch_stub();
var postArticle2 = /* @__PURE__ */ __name(async (_c2) => {
  const body = await _c2.req.json();
  try {
    const dbpw = _c2.env.DB_PASSWORD;
    if (body.pw != dbpw)
      throw Error("Access Denied");
    const prisma = await choosePrismaConnection(_c2);
    console.log(body.article.categories);
    await prisma.post.update({
      where: {
        id: body.article.id
      },
      data: {
        categories: {
          deleteMany: {}
        }
      }
    });
    await prisma.post.update({
      where: { id: body.article.id },
      data: {
        ...body.article,
        categories: {
          create: body.article.categories.map((cat) => ({
            category: {
              connect: {
                id: cat.id,
                parentId: cat.parentId,
                name: cat.name
              }
            }
          }))
        }
      }
    });
    await syncDatabases(_c2);
    return _c2.json({ message: "article added to database" }, 200);
  } catch (e7) {
    return _c2.json({ message: `Error: ${e7.message}` }, 500);
  }
}, "postArticle");
var editArticle_default = postArticle2;

// routes/api/get/getArticles.ts
init_modules_watch_stub();
async function getArticles(c2) {
  const param = c2.req.param();
  const query = c2.req.query();
  let categoriesId;
  let tags;
  let per_page;
  let page = 1;
  if (query.categories)
    categoriesId = query.categories.split(",").map((i) => Number(i));
  if (query.tags)
    tags = query.tags.split(",");
  if (query.per_page)
    per_page = Number(query.per_page);
  if (query.page)
    page = Number(query.page);
  const idOrSlug = param["id-slug"];
  const prisma = await choosePrismaConnection(c2);
  try {
    if (!idOrSlug) {
      if (categoriesId && isNaN(Number(categoriesId[categoriesId.length - 1])))
        throw Error("Invalid Category");
      const categoriesMapping = categoriesId ? categoriesId.map((id) => ({ categoryId: id })) : [{ categoryId: void 0 }];
      const categoriesFilter = { some: { OR: categoriesMapping } };
      console.log(categoriesId);
      console.log(tags);
      const articles = await prisma.post.findMany({
        where: categoriesId || tags ? {
          categories: categoriesFilter,
          tags: tags ? { hasSome: tags } : void 0
        } : void 0,
        take: per_page,
        skip: per_page ? per_page * (page - 1) : 0,
        include: {
          categories: {
            select: { category: true }
          }
        },
        orderBy: { dateCreated: "desc" }
      });
      const count = await prisma.post.count({
        where: categoriesId || tags ? {
          categories: categoriesFilter,
          tags: tags ? { hasSome: tags } : void 0
        } : void 0
      });
      c2.header("X-WP-Total", String(count));
      c2.header("X-WP-TotalPages", String(Math.floor(count / (per_page ?? 1) + 0.5)));
      return c2.json(articles, 200);
    }
    let post;
    if (isNaN(Number(idOrSlug))) {
      post = await prisma.post.findUnique({
        where: {
          slug: idOrSlug
        },
        include: {
          categories: {
            select: { category: true }
          }
        }
      });
    } else {
      post = await prisma.post.findUnique({
        where: {
          id: Number(idOrSlug)
        },
        include: {
          categories: {
            select: { category: true }
          }
        }
      });
    }
    if (!post)
      throw Error("Not found");
    return c2.json(post);
  } catch (e7) {
    console.error(e7);
    return c2.json({ message: e7.message }, 500);
  }
}
__name(getArticles, "getArticles");

// routes/api/delete/deleteArticle.ts
init_modules_watch_stub();
async function deleteArticle(c2) {
  const idQuery = c2.req.param("id");
  try {
    if (!idQuery)
      throw Error("Invalid uri");
    const id = Number(idQuery);
    if (isNaN(id) || id < 0 || id > 999999)
      throw Error("Invalid post id");
    const prisma = await choosePrismaConnection(c2);
    const ret = await prisma.post.delete({ where: { id } });
    if (!ret)
      throw Error("Qualcosa \xE8 andato storto");
    return c2.text(`Post ${id} deleted`);
  } catch (e7) {
    if (e7.message.search("No record was found for a delete") > 0)
      e7.message = "Record not found";
    return c2.json({ message: `Error: ${e7.message}` }, 500);
  }
}
__name(deleteArticle, "deleteArticle");

// routes/api/get/getCategories.ts
init_modules_watch_stub();
async function getCategories(c2) {
  const prisma = await choosePrismaConnection(c2);
  try {
    const categories = await prisma.category.findMany({});
    return c2.json(categories);
  } catch (e7) {
    return c2.json({ message: e7.message }, 500);
  }
}
__name(getCategories, "getCategories");

// src/index.ts
var app = new Hono2();
app.use(
  "/api/*",
  cors({
    origin: ["https://rimborso.eu", "https://www.rimborso.eu", "https://gestionecreditipubblici.it", "http://localhost:3000", "https://dbapi.studiolegalefrisani.com", "http://localhost:8787"],
    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Set-Cookie", "Cookie"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision", "set-auth-token", "set-cookie"],
    maxAge: 600,
    credentials: true
  })
);
app.get("/api/articles/:id-slug?", getArticles);
app.get("/api/categories", getCategories);
app.post("/api/import/post", importPost_default);
app.post("/api/article", postArticle_default);
app.post("/api/article/:id-slug", editArticle_default);
app.post("/api/article/delete/:id", deleteArticle);
app.post("/api/import/categories", importCategories_default);
app.get("/api/sync", syncDatabasesRoute);
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e7) {
      console.error("Failed to drain the unused request body.", e7);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e7) {
  return {
    name: e7?.name,
    message: e7?.message ?? String(e7),
    stack: e7?.stack,
    cause: e7?.cause === void 0 ? void 0 : reduceError(e7.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e7) {
    const error = reduceError(e7);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-hmuRP4/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-hmuRP4/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@prisma/client-runtime-utils/dist/index.mjs:
  (*! Bundled license information:
  
  decimal.js/decimal.mjs:
    (*!
     *  decimal.js v10.5.0
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Licence
     *)
  *)
*/
//# sourceMappingURL=index.js.map
