if (process.env.NODE_ENV === "production") {
  module.exports = require("./keysConfig");
} else {
  module.exports = require("./developmentConfig");
}
