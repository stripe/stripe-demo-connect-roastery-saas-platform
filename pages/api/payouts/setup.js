import fetch from 'isomorphic-unfetch';
import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

const env = require('dotenv').config({path: './.env'});

let makeStripeConnectRequest = async (code) => {
  let clientId = process.env.STRIPE_CLIENT_ID;
  let secretKey = process.env.STRIPE_SECRET_KEY;

  let params = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: secretKey,
    code: code,
  };

  let url = 'https://connect.stripe.com/oauth/token';
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {'Content-Type': 'application/json'},
  }).then((res) => res.json());
};

let updatePlatform = async (authenticatedUserId, stripeUserId) => {
  let stripeObject = {
    stripeUserId: stripeUserId,
  };

  return storage
    .get('platforms')
    .find({ownerUserId: authenticatedUserId})
    .assign({
      stripe: stripeObject,
    })
    .write();
};

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    const {code} = req.body;

    // 1) Post the authorization code to Stripe to complete the Express onboarding flow
    let stripeConnectRequest = await makeStripeConnectRequest(code);

    // 2) Update the users platform  with StripeUserId
    let stripeUserId = stripeConnectRequest.stripe_user_id;

    if (!stripeUserId) {
      return res.status(400).json({msg: 'Connect request to Stripe failed'});
    }

    updatePlatform(authenticatedUserId, stripeUserId);

    return res.status(200).json({status: 'ok'});
  } catch (err) {
    return res.status(400).json(err);
  }
});
