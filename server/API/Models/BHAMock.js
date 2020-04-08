/* jshint indent: 2 */
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

//access .env file
dotenv.config();
const connection = new Sequelize(process.env.SQL_DB)

const BHAMock = connection.define('BHAMock',{
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
  TRIM: {
    type: "BLOB",
    allowNull: true
  },
  STOCK: {
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
  CUSTOMERNAME: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  BHACUSTOMERID: {
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
  ID:{
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true
  }

  },{
  tableName: 'BHAMock',
  timestamps: false,

});

module.exports = BHAMock
