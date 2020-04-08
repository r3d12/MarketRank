const BHAMockv3 = require("../Models/BHAMockv3");
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

exports.GetDoughnutData = (req, res, next)=>{
    let Model = req.query.Model
    let customer = req.query.customer
    let distance = req.query.distance


    BHAMockv3.sequelize.query(
        `SELECT
            COUNT(CONCAT(TopCount.MODEL, ' ',TopCount.TRIM)) as TopCount,
            TotalCount.TOTALCOUNT, 
            MIN(PRICE) as PRICE,
            CUSTOMER_NAME
            FROM [PageRank].[dbo].[BHAMockv3] TopCount JOIN

                (
                    SELECT
                        COUNT(CONCAT(MODEL, ' ',TRIM)) as TOTALCOUNT,
                        MODEL,
                        TRIM
                    FROM [PageRank].[dbo].[BHAMockv3]
                    WHERE PRICE IS NOT NULL and DISTANCE <= '${distance}'
                    GROUP BY MODEL, TRIM 
                ) TotalCount

            on TotalCount.MODEL = TopCount.MODEL AND TotalCount.TRIM = TopCount.TRIM
        WHERE PRICE IS NOT NULL and CONCAT(TopCount.MODEL, ' ',TopCount.TRIM) like '${Model}' and ASSOCIATED_STORE like '${customer}' and DISTANCE <= '${distance}' and DateInserted <= DATEADD(day, -5, GETDATE()) 
        GROUP BY TopCount.MODEL, TopCount.TRIM,TotalCount.TOTALCOUNT, CUSTOMER_NAME
        ORDER by TopCount DESC
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