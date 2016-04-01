'use strict';

/**
 * 依赖模块
 */
import * as _ from 'lodash';
import * as glob from 'glob';

import {all} from './env/all';
import {development} from './env/development';

/**
 * 加载app配置
 */
const config = _.extend(all, development);

/**
 * 用glob patterns匹配文件
 */
const getGlobbedFiles = (globPatterns, removeRoot) => {
  // For context switching
  let self = this;

  // URL paths regex
  const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  let output = [];

  // If glob pattern is array so we use each pattern in a recursive way,
  // otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output = _.union(output, self.getGlobbedFiles(globPattern, removeRoot));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      glob(globPatterns, {
        sync: true
      }, (err, files) => {
        if (removeRoot) {
          files = files.map((file) => {
            return file.replace(removeRoot, '');
          });
        }

        output = _.union(output, files);
      });
    }
  }

  return output;
};

export {config};
export {getGlobbedFiles};
