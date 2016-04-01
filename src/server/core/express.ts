import 'reflect-metadata';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import * as helmet from 'helmet';
import * as config from './config';
import * as path from 'path';

import {routes} from './routes';

import {expressEngine} from 'angular2-universal-preview';

const expressApp = (db) => {
  let app = express();
  let root = path.join(path.resolve(__dirname, '..', '..', '..'));
  let views = path.join(path.resolve(__dirname, '..', 'views'));

  // 自动加载所有数据模型
  // config.getGlobbedFiles('./app/models/**/*.js').forEach(function (modelPath) {
  //   require(path.resolve(modelPath));
  // });

  // 压缩静态文件，需要放在express.static之前
  app.use(compression({
    filter: function (req, res) {
      return (/json|text|javascript|css|html/)
        .test(res.getHeader('Content-Type'));
    }
  }));

  // 显示堆栈错误
  app.set('showStackError', true);

  // Express View
  app.engine('.html', expressEngine);
  app.set('views', views);
  app.set('view engine', 'html');

  // 根据环境设置中间件
  if (process.env.NODE_ENV === 'development') {
    // 启动 morgan logger
    app.use(morgan('dev'));

    // 关闭 views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // bodyParser 需要在 methodOverride 之前加载
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // 使用 helmet 保护 Express headers
  app.use(helmet());

  // Serve static files
  app.use(express.static(root));

// 自动加载服务器路由
  routes(app);
//   config
//     .getGlobbedFiles('./app/routes/**/*.js', null)
//     .forEach(function (routePath) {
//       require(path.resolve(routePath))(app);
//     });

  // 没被处理的请求都是 404
  app.use((req, res) => {
    res['status'](404).render('404', {
      url: req['originalUrl'],
      error: 'Not Found'
    });
  });
  return app;
}

export {expressApp};
