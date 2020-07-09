import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import stripe from '../../../helpers/stripe';
import API from '../../../helpers/api';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let userPlatform = await API.makeRequest('get', '/api/profile/platform');
    let stripeUserId = userPlatform.stripe.stripeUserId;

    let products = await stripe.products.list(
      {},
      {
        stripeAccount: stripeUserId,
      },
    );

    if (products.data.length) {
      return res.status(200).json(products.data);
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
});
