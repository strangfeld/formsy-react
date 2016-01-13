module.exports = {
  arraysDiffer: function (a, b) {
    var isDifferent = false;
    if (a.length !== b.length) {
      isDifferent = true;
    } else {
      a.forEach(function (item, index) {
        if (!this.isSame(item, b[index])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  objectsDiffer: function (a, b) {
    var isDifferent = false;
    if (Object.keys(a).length !== Object.keys(b).length) {
      isDifferent = true;
    } else {
      Object.keys(a).forEach(function (key) {
        if (!this.isSame(a[key], b[key])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  isSame: function (a, b) {
    if (typeof a !== typeof b) {
      return false;
    } else if (Array.isArray(a)) {
      return !this.arraysDiffer(a, b);
    } else if (typeof a === 'object' && a !== null && b !== null) {
      return !this.objectsDiffer(a, b);
    }

    return a === b;
  },

  find: function (collection, fn) {
    for (var i = 0, l = collection.length; i < l; i++) {
      var item = collection[i];
      if (fn(item)) {
        return item;
      }
    }
    return null;
  },

  convertValidationsToObject: function (validations) {

    if (typeof validations === 'string') {

      return validations.split(/\,(?![^{\[]*[}\]])/g).reduce(function (validations, validation) {
        var args = validation.split(':');
        var validateMethod = args.shift();

        args = args.map(function (arg) {
          try {
            return JSON.parse(arg);
          } catch (e) {
            return arg; // It is a string if it can not parse it
          }
        });

        if (args.length > 1) {
          throw new Error('Formsy does not support multiple args on string validations. Use object format of validations instead.');
        }

        validations[validateMethod] = args.length ? args[0] : true;
        return validations;
      }, {});

    }

    return validations || {};
  }
};
