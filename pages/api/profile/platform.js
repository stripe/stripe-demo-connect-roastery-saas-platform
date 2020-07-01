import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let platform = storage
      .get('platforms')
      .find({ownerUserId: authenticatedUserId})
      .value();

    return res.status(200).json(platform);
  } catch (err) {
    return res.status(400).json(err);
  }
});
