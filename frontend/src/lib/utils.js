const bcrypt = require('bcryptjs');

export const getHashedPassword = (password) => bcrypt.hashSync(password, 12);

export const getImageUrl = (image, isLocalStatic = true) => (
  isLocalStatic ? (`http://localhost:3000${image}`) : image);
