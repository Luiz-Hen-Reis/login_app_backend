"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("users", {
      id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      location: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("users");
  },
};
