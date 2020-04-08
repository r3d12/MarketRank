const BHAMockv3 = require("../Models/BHAMockv3");
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

exports.GetDataByRank = (req, res, next)=>{
    distance = req.query.distance
    customer = req.query.customer
    BHAMockv3.sequelize.query(
        `SELECT
            CONCAT(MODEL, ' ',TRIM) as Model,
            MIN(PRICE)as PRICE,
            MIN(MSRP) as MSRP,
            CUSTOMER_NAME,
            BODYSTYLE,
            ROW_NUMBER() OVER (PARTITION BY MODEL, TRIM ORDER BY MIN(PRICE) ASC) AS Rank
            FROM [PageRank].[dbo].[BHAMockv3]
        WHERE PRICE IS NOT NULL and DISTANCE <= '${distance}' and ASSOCIATED_STORE like '${customer}' and DateInserted <= DATEADD(day, -5, GETDATE())
        GROUP BY MODEL, TRIM, CUSTOMER_NAME, BODYSTYLE
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