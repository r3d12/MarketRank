/* jshint indent: 2 */
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

//access .env file
dotenv.config();
const connection = new Sequelize(process.env.SQL_DB)

const BHAMockv3 = connection.define('BHAMockv3',{
    YEAR: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    MAKE: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    MODEL: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    BODYSTYLE: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    TRIM: {
      type: "BLOB",
      allowNull: true
    },
    STOCK_NUMBER: {
      type: Sequelize.TEXT,
      allowNull: true,
      primaryKey:true
    },
    PRICE: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    MSRP: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    PartyID: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    CUSTOMER_NAME: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    ASSOCIATED_STORE: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    BHA_CUSTOMER_ID: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    DISTANCE: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    DateInserted: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    },
{
  tableName: 'BHAMockv3',
  timestamps: false,

});

module.exports = BHAMockv3
