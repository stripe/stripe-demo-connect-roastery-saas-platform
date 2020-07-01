import storage from '../../../../helpers/storage';
import stripe from '../../../../helpers/stripe';

export default async (req, res) => {
  let slug = req.query.slug;

  try {
    let platform = storage.get('platforms').find({slug: slug}).value();

    if (!platform) {
      throw new Error('platform not found');
    }

    let stripeUserId = platform.stripe.stripeUserId;

    let products = await stripe.products.list(
      {},
      {
        stripe_account: stripeUserId,
      },
    );

    if (products.data) {
      console.log('products.data', products.data);
      for (let index = 0; index < products.data.length; index++) {
        const product = products.data[index];
        let prices = await stripe.prices.list(
          {limit: 1, product: product.id},
          {
            stripe_account: stripeUserId,
          },
        );
        if (prices.data) {
          products.data[index].price = prices.data[0];
        }
      }
    }

    return res.status(200).json(products.data);
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({error: err.message});
  }
};
