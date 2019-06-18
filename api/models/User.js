// Imports
const Sequelize = require("sequelize");
const sequelize = require("../dbConnection");
const bcrypt = require("bcryptjs");

// Model
class User extends Sequelize.Model {}
User.init({
    id: {
        // Data Type
        type: Sequelize.INTEGER,

        // Auto-increment ID
        autoIncrement: true,

        // Primary key (unique and non-null)
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING(96),
        
        // Do not allow null values
        allowNull: false,

        validate: {
            // Field mustn't be null
            notNull: {
                msg: "first name is a required field.",
            },

            // Field must only include letters, numbers, and certain punctuation
            is: {
                args: [/^[A-Za-z0-9.,' ]+$/],
                msg: "first name must only consist of alphanumeric characters and punctuation",
            },
        },
    },
    lastName: {
        type: Sequelize.STRING(96),
        allowNull: false,

        validate: {
            // Field mustn't be null
            notNull: {
                msg: "last name is a required field.",
            },

            // Field must only include letters, numbers, and certain punctuation
            is: {
                args: [/^[A-Za-z0-9., ']+$/],
                msg: "last name must only consist of alphanumeric characters and punctuation",
            },
        },
    },
    emailAddress: {
        type: Sequelize.STRING(127),
        allowNull: false,
        // Ensure that each email is unique
        unique: true,
        validate: {
            // Field mustn't be null
            notNull: {
                msg: "email address is a required field.",
            },

            // Field must be in the form of an email address
            isEmail: {
                msg: "email address must be in the form of an email address",
            },
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            // Field mustn't be null
            notNull: {
                msg: "password is a required field.",
            },
        },
    },
}, {
    sequelize,
    modelName: "user",
});

// Model hooks
User.beforeCreate((user, options) => {
    // Generate salt
    const salt = bcrypt.genSaltSync(10);

    // Generate hash
    const hash = bcrypt.hashSync(user.password, salt);

    // Set user password to hash
    user.password = hash;
});

// Export
module.exports = User;
