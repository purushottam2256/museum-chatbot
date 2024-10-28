const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  
  module.exports = withBundleAnalyzer({
    env: {
      PAYU_MERCHANT_KEY: process.env.PAYU_MERCHANT_KEY,
      PAYU_SALT: process.env.PAYU_SALT,
    },
  });