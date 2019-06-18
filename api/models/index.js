// Imports
const User = require("./User");
const Course = require("./Course");

// Associations
User.hasMany(Course);
Course.belongsTo(User);

// Sync models
User.sync()
Course.sync();

// Exports
module.exports = {
    User,
    Course,
};
