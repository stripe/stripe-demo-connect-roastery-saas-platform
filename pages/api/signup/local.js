import bcrypt from 'bcrypt';
import shortid from 'shortid';
import slug from 'slug';
import storage from '../../../helpers/storage';
import gravatar from 'gravatar';
import {generateToken} from '../../../utils/authToken';

export default async (req, res) => {
  const {firstName, lastName, email, password, platformName} = req.body;

  let hashedPassword = await bcrypt.hash(password, 10);
  let normalizedEmail = email.toLowerCase();

  const user = {
    userId: shortid.generate(),
    firstName: firstName,
    lastName: lastName,
    email: normalizedEmail,
    password: hashedPassword,
    avatar: gravatar.url(normalizedEmail, {s: '400'}),
  };
  await storage.get('users').push(user).write();

  let platform = {
    platformId: shortid.generate(),
    ownerUserId: user.userId,
    name: platformName,
    slug: slug(platformName),
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    description: '',
  };
  await storage.get('platforms').push(platform).write();

  const token = generateToken({
    userId: user.userId,
  });

  res.send({token: token});
};
