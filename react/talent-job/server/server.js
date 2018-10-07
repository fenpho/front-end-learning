import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import csshook from 'css-modules-require-hook/preset'; // import hook before routes，注意引用位置要在所有css之前
import assethook from 'asset-require-hook';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import manifest from '../build/asset-manifest.json';

import App from '../src/app';
import reducer from '../src/reducer';

import userRouter from './user';
import model from './model';

assethook({
  extensions: ['png']
});
const Chat = model.getModel('chat');

// Chat.remove({chatid:'5b9a5987ec008f0ed81f44af_'}, function(e, d){});

// 新建app
const app = express();

// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('user login');
  socket.on('sendmsg', function(data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc));
    });
  });
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();
  }
  const store = createStore(reducer, compose(applyMiddleware(thunk)));
  let context = {};
  // const markup = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={req.url} context={context}>
  //       <App />
  //     </StaticRouter>
  //   </Provider>
  // );
  const titleObj = {
    '/msg': '聊天消息列表',
    '/boss': '牛人列表'
  };
  //   const pageHtml = `
  //   <!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  //     <meta name="theme-color" content="#000000">
  //     <link rel="stylesheet" href="/${manifest['main.css']}">
  //     <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  //     <meta name="keywords" content="key1, key2, key3">
  //     <meta name="description" content="${titleObj[req.url]}">
  //     <meta name="author" content="Fenpho">
  //     <title>React App</title>
  //   </head>
  //   <body>
  //     <noscript>
  //       You need to enable JavaScript to run this app.
  //     </noscript>
  //     <div id="root">${markup}</div>
  //     <script src="/${manifest['main.js']}"></script>
  //   </body>
  // </html>
  //   `;
  //   return res.send(pageHtml);
  res.write(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link rel="stylesheet" href="/${manifest['main.css']}">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      <meta name="keywords" content="key1, key2, key3">
      <meta name="description" content="${titleObj[req.url]}">
      <meta name="author" content="Fenpho">
      <title>React App</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">`);

  const markupStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  markupStream.pipe(
    res,
    { end: false }
  );
  markupStream.on('end', () => {
    res.write(`</div>
    <script src="/${manifest['main.js']}"></script>
  </body>
</html>`);
    res.end();
  });
});

app.use('/', express.static(path.resolve('build')));

server.listen(8888, function() {
  console.log('Node app is start at port 8888');
});
