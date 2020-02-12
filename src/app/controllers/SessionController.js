import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const validation = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Error on Validation' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.key, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
