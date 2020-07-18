import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import stripe from '../../../helpers/stripe';
import storage from '../../../helpers/storage';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let userPlatform = storage
      .get('platforms')
      .find({ownerUserId: authenticatedUserId})
      .value();

    let stripeUserId = userPlatform.stripe.stripeUserId;

    let products = await stripe.products.list(
      {},
      {
        stripeAccount: stripeUserId,
      },
    );

    if (products.data.length) {
      return res.status(200).json(products.data);
    } else {
      res.status(400).json([]);
    }
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
});
