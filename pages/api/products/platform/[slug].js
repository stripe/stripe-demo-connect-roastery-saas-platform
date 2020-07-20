import storage from '../../../../helpers/storage';
import stripe from '../../../../helpers/stripe';

export default async (req, res) => {
  let slug = req.query.slug;

  try {
    let platform = storage.get('platforms').find({slug: slug}).value();

    if (!platform) {
      throw new Error('platform not found');
    }

    let stripeUserId = platform.stripe ? platform.stripe.stripeUserId : null;

    if (!stripeUserId) {
      throw new Error('No stripe account found');
    }

    let products = await stripe.products.list(
      {},
      {
        stripeAccount: stripeUserId,
      },
    );

    if (products.data) {
      for (let index = 0; index < products.data.length; index++) {
        const product = products.data[index];
        let prices = await stripe.prices.list(
          {limit: 1, product: product.id},
          {
            stripeAccount: stripeUserId,
          },
        );
        if (prices.data) {
          products.data[index].price = prices.data[0];
        }
      }
    } else {
      throw new Error('No products found');
    }

    return res.status(200).json(products.data);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
};
