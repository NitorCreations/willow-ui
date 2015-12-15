/**
 * Creates a pseudo-UUID (rfc4122 version 4) from random characters.
 * @see https://en.wikipedia.org/wiki/Universally_unique_identifier
 * @see http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @returns {string} a random string in the UUID format
 */
export default function createUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0;
    var v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}