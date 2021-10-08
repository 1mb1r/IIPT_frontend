const bcrypt = require('bcryptjs');

const getHashedPassword = (password) => bcrypt.hashSync(password, 12);

export default getHashedPassword;
