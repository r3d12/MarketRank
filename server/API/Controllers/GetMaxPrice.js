const BHAMockv3 = require("../Models/BHAMockv3");
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

exports.GetMaxPrice = (req, res, next)=>{
    customer = req.query.customer
    distance = req.query.distance
    BHAMockv3.sequelize.query(
        `SELECT
            MAX(PRICE)as MaxPrice,
            CONCAT(MODEL, ' ',TRIM) as Model
            FROM [PageRank].[dbo].[BHAMockv3]
        WHERE PRICE IS NOT NULL and ASSOCIATED_STORE like '${customer}' and DISTANCE <= '${distance}' and DateInserted <= DATEADD(day, -5, GETDATE())
        GROUP BY MODEL, TRIM
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