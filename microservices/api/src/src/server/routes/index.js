const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const products = [
  {
    uuid: 1,
    productName: 'Test product',
    productDescription: 'This will charge you 10 USD',
    productPrice: 10.00
  }
];

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
 // res.redirect('https://auth.archipelago35.hasura-app.io/ui')
});

//router.get('/products/:uuid', (req, res, next) => {
  router.get('/pay', (req, res, next) => {
 // const productID = req.params.uuid;
 const productID = 1;
  const product = products.filter((product) => {
    return parseInt(productID) === product.uuid;
  });
  if (product[0]) {
    return res.render('product', {productInfo: product[0]});
  }
  return res.send('Product does not exist.');
});

router.post('/charge', (req, res,next) => {
  const stripeToken = req.body.stripeToken;
  const price = req.body.price;
  const amount = req.body.price * 100;
  const productName = req.body.name;
  // ensure amount === actual product amount to avoid fraud
  const product = products.filter((product) => {
    return productName === product.productName && parseFloat(price) === parseFloat(product.productPrice);
  });

  if (product[0]) {
    stripe.charges.create({
      card: stripeToken,
      currency: 'usd',
      amount: amount
    }, (err, charge) => {
      if (err) {
        console.log('here');
        // console.log(err);
        res.send('error');
      } else {
        res.send('success');
      }

    });
  } else {
    console.log('Product name or price mismatch');
    res.send('error');
  }
});

module.exports = router;
