// Imports
const Sequelize = require("sequelize");
const sequelize = require("../dbConnection");
const User = require("./User");

// Model
class Course extends Sequelize.Model {}
Course.init({
    id: {
        // Data Type
        type: Sequelize.INTEGER,

        // Auto-increment ID
        autoIncrement: true,

        // Primary key (unique and non-null)
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING(127),
        allowNull: false,
        validate: {
            // Field mustn't be null
            notNull: {
                msg: "title is a required field.",
            },

            // Field mustn't be empty
            notEmpty: {
                msg: "title is a required field",
            },
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            // Field mustn't be null
            notNull: {
                msg: "description is a required field.",
            },

            // Field mustn't be empty
            notEmpty: {
                msg: "description is a required field",
            },
        },
    },
    estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            // Field mustn't be empty
            notEmpty: {
                msg: "estimated time must not be empty",
            },
        },
    },
    materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            // Field mustn't be empty
            notEmpty: {
                msg: "materials needed must not be empty",
            },
        },
    },
}, {
    sequelize,
    modelName: "course",
});

// Export
module.exports = Course;