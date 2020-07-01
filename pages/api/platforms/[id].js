import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import slug from 'slug';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;
  let id = req.query.id;

  if (req.method !== 'PUT') {
    return res.status(400).json();
  }

  try {
    let properties = {...req.body};
    properties.slug = slug(properties.name);

    let list = storage
      .get('platforms')
      .find({platformId: id, ownerUserId: authenticatedUserId})
      .assign(properties)
      .write();

    return res.status(200).json(list);
  } catch (err) {
    return res.status(400).json(err);
  }
});
