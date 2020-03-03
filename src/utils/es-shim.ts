// es shim
require('object.values').shim();
require('object.entries').shim();
require('promise.prototype.finally').shim();
import { logger } from '@zhuyin/common';

export default function verify() {
  logger.info('Object.values()', typeof Object.values);
  logger.info('Object.entries()', typeof Object.entries);
  logger.info('Promise.prototype.finally()', typeof Promise.prototype.finally);
};