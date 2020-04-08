const BHAMockv3 = require("../Models/BHAMockv3");
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

exports.GetBubbleData = (req, res, next)=>{
    const Model = req.query.Model
    let customer = req.query.customer
    let distance = req.query.distance


    BHAMockv3.sequelize.query(
        `SELECT
            CUSTOMER_NAME
            ,[PRICE] as y
            ,10 AS r
            ,ROW_NUMBER() OVER (PARTITION BY MODEL, TRIM ORDER BY PRICE ASC) AS x
        FROM [PageRank].[dbo].[BHAMockv3]
        where CONCAT(MODEL, ' ',TRIM) like '${Model}' and PRICE IS NOT NULL and ASSOCIATED_STORE like '${customer}' and DISTANCE <= '${distance}' and DateInserted <= DATEADD(day, -5, GETDATE())
        `,
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