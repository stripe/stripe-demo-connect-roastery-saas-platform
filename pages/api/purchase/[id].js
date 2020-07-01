import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';

export default async (req, res) => {
  let sessionId = req.query.id;
  let platformId = req.query.platformId;

  try {
    let platform = storage
      .get('platforms')
      .find({platformId: platformId})
      .value();

    if (!platform) {
      throw new Error('platform not found');
    }

    let stripeUserId = platform.stripe.stripeUserId;

    let session = await stripe.checkout.sessions.retrieve(sessionId, {
      stripeAccount: stripeUserId,
    });

    return res.status(200).json(session);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
};
