/* jshint indent: 2 */
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

//access .env file
dotenv.config();
const connection = new Sequelize(process.env.SQL_DB)

const BHAMockv2 = connection.define('210891',{
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
    STOCKNUMBER: {
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
    CUSTOMERNAME: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    BHACUSTOMERID: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    DateInserted: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    },
{
  tableName: '210891',
  timestamps: false,

});

module.exports = BHAMockv2
