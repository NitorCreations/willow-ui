
export default function addMatchers(chai) {
  // Add custom matchers here using chai.Assertion.addMethod
  // See http://chaijs.com/api/plugins/
  chai.Assertion.addMethod('matchRegex', function(regex) {
    var obj = this._obj;

    var msg = 'expected #{this} to match ' + regex;
    var notMsg = 'expected #{this} not to match ' + regex;

    var match = !!regex.exec(obj);

    this.assert(match, msg, notMsg, 'a string matching ' + regex, obj);
  });
}