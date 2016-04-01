'use strict';

const all = {
  app: {
    title: 'Chronicles CMS',
    description: 'Generalized CMS',
    keywords: 'Chronicles'
  },
  port: process.env.PORT || 3000,
  publicAssets: './public',
  userAssets: './assets',
  templateEngine: 'swig',
};

export {all};
