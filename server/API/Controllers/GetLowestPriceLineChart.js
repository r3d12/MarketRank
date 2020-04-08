const BHAMockv3 = require("../Models/BHAMockv3");
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

exports.GetLowestLineChart = (req, res, next)=>{
    let customer = req.query.customer
    let distance = req.query.distance
    let Model = req.query.Model
    BHAMockv3.sequelize.query(
        `SELECT
            MIN(PRICE)as LowestPrice,
            CONCAT(MODEL, ' ',TRIM) as Model,
            FORMAT(DateInserted, 'yyyy-MM-dd') as DATE
            FROM [PageRank].[dbo].[BHAMockv3]
        WHERE PRICE IS NOT NULL 
        and ASSOCIATED_STORE like '${customer}' 
        and DISTANCE <= '${distance}' 
        and CONCAT(MODEL, ' ',TRIM) like '${Model}'
        GROUP BY MODEL, TRIM, DateInserted
        ORDER by MODEL`,
    {
      
        // The type of query you are executing. The query type affects how results are formatted before they are passed back.
        type: QueryTypes.SELECT
      })
    .then(docs =>{
        res.status(200).json(docs)
    })
    .catch(err =>{ 
        res.status(500).json({error: err})
    })
}