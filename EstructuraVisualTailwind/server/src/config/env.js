const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("El puerto no está definido");
}

module.exports = { PORT };
