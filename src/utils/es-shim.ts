// es shim
require('object.values').shim();
require('object.entries').shim();
require('promise.prototype.finally').shim();

export default function verify() {
  console.info('Object.values()', typeof Object.values);
  console.info('Object.entries()', typeof Object.entries);
  console.info('Promise.prototype.finally()', typeof Promise.prototype.finally);
}