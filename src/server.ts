'use strict';

import 'reflect-metadata';
import * as mongoose from 'mongoose';
import * as chalk from 'chalk';
import {enableProdMode} from "angular2/core";
import {expressApp} from "./server/core/express";
import {config} from "./server/core/config";

enableProdMode();

// 绑定数据库连接
const db = mongoose.connect(config['db'], function (err) {
  if (err) {
    console.error(chalk.red('Cannot connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});

// 加载 Express 配置
const app = expressApp(db);

// 监听 port
app.listen(config['port'], () => {
  console.log('Server listen on http://localhost:' + config['port']);
});

export {app};


