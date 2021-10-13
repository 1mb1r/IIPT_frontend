const bcrypt = require('bcryptjs');

export const getHashedPassword = (password) => bcrypt.hashSync(password, 12);

export const getImageUrl = (image, isLocalStatic = true) => (
  isLocalStatic ? (process.env.STATIC_URL + image) : image);
