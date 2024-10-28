export const payuConfig = {
    merchantKey: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_SALT,
  };
  
  export async function getPayuConfig() {
    return payuConfig;
  }