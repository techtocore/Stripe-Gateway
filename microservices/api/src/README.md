# Node Stripe Example

Node + Express + Stripe

> Looking for a more complex example? [Node Stripe Charge](https://github.com/mjhea0/node-stripe-charge)

## Quick Start

1. Fork/Clone

1. Install dependencies:

    ```sh
    $ npm install
    ```

1. create a *.env* and add the following env variable:

    ```
    STRIPE_SECRET_KEY=ADD-YOUR-OWN-KEY
    ```

1. update *src/client/js/main.js* with your publishable key:

    ```javascript
    Stripe.setPublishableKey('UPDATE ME');
    ```

1. Fire up the app - `npm start`. Then, navigate to [http://localhost:3000/products/1](http://localhost:3000/products/1) in your browser of choice.
