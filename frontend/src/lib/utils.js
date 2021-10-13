const bcrypt = require('bcryptjs');

export const getHashedPassword = (password) => bcrypt.hashSync(password, 12);

export const getImageUrl = (image, isGoogle = false) => (
  isGoogle ? image : (process.env.STATIC_URL + image));
