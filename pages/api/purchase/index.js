import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import getHost from '../../../utils/get-host';

export default async (req, res) => {
  if (req.method != 'POST') {
    return res.status(404);
  }

  let platformId = req.body.platformId;
  let productId = req.body.productId;

  try {
    let priceId;

    let platform = storage
      .get('platforms')
      .find({platformId: platformId})
      .value();

    if (!platform) {
      throw new Error('platform not found');
    }

    let stripeUserId = platform.stripe.stripeUserId;
    let platformFee = 0;

    let prices = await stripe.prices.list(
      {limit: 1, product: productId},
      {
        stripeAccount: stripeUserId,
      },
    );

    if (prices.data) {
      let price = prices.data[0];
      platformFee = price.unit_amount * 0.1;
      priceId = price.id;
    }

    const successUrl =
      getHost(req) +
      `/p/${platform.slug}/thank-you?sessionId={CHECKOUT_SESSION_ID}`;

    const cancelUrl = getHost(req) + `/p/${platform.slug}/products`;

    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: platformFee,
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
      },
      {
        stripeAccount: stripeUserId,
      },
    );

    return res.status(200).json(session);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
};
