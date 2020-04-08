const BHAMockv3 = require("../Models/BHAMockv3");
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

exports.GetSaturation = (req, res, next)=>{
    customer = req.query.customer
    distance = req.query.distance
    BHAMockv3.sequelize.query(
        `SELECT
            COUNT(CONCAT(BHACount.MODEL, ' ',BHACount.TRIM)) as BHACOUNT,
            TotalCount.TOTALCOUNT, 
            CONCAT(BHACount.MODEL, ' ',BHACount.TRIM) as Model
            
            FROM [PageRank].[dbo].[BHAMockv3] BHACount JOIN
                (
                    SELECT
                        COUNT(CONCAT(MODEL, ' ',TRIM)) as TOTALCOUNT,
                        MODEL,
                        TRIM
                    FROM [PageRank].[dbo].[BHAMockv3]
                    WHERE PRICE IS NOT NULL and DISTANCE <= '${distance}' and DateInserted <= DATEADD(day, -5, GETDATE())
                    GROUP BY MODEL, TRIM
                ) TotalCount
            on TotalCount.MODEL = BHACount.MODEL AND TotalCount.TRIM = BHACount.TRIM
        WHERE PRICE IS NOT NULL AND BHA_CUSTOMER_ID NOT LIKE '' and ASSOCIATED_STORE like '${customer}'   
        GROUP BY BHACount.MODEL, BHACount.TRIM,TotalCount.TOTALCOUNT
        ORDER by BHACOUNT
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