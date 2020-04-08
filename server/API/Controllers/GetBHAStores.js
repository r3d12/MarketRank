const BHAMockv3 = require("../Models/BHAMockv3");
const sequelize = require('sequelize');
const Op = sequelize.Op;

exports.GetBHAStores = (req, res, next)=>{

    BHAMockv3.findAll({
        attributes: ['CUSTOMER_NAME'],
        group: ['CUSTOMER_NAME'],
    where:{
        BHA_CUSTOMER_ID:{
            [Op.not]: ''
            
        }
    },
})
.then(docs =>{
    res.status(200).json(docs)
})
.catch(err =>{ 
    res.status(500).json({error: err})
})
}