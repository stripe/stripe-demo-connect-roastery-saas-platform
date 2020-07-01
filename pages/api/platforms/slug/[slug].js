import storage from '../../../../helpers/storage';

export default async (req, res) => {
  let slug = req.query.slug;

  console.log('slug', slug);

  try {
    let item = storage
      .get('platforms')
      .find({slug: slug})
      .pick(
        'platformId',
        'name',
        'address',
        'city',
        'state',
        'zip',
        'phone',
        'email',
        'slug',
        'description',
        'stripe',
      )
      .value();

    return res.status(200).json(item);
  } catch (err) {
    console.log('err', err);
    return res.status(400).json(err);
  }
};
