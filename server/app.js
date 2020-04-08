
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//controllers
const BHAStoresListController = require('./API/Controllers/GetBHAStores')
const DataByRankController = require('./API/Controllers/GetByRank')
const LowestPriceController = require('./API/Controllers/GetLowestPrice')
const AvgPriceController = require('./API/Controllers/GetAvgPrice')
const MaxPriceController = require('./API/Controllers/GetMaxPrice')
const SaturationController = require('./API/Controllers/GetSaturation')
const BubbleChartCompetitionController = require('./API/Controllers/GetBubbleForCompetition')
const DoughnutChartController = require('./API/Controllers/GetDoughnutChart')
const LineChartController = require('./API/Controllers/GetLowestPriceLineChart')
const LineCharBHAtController = require('./API/Controllers/GetLowestBHAPriceLineChart')

console.log('I am a Server')

const app = express()
app.use(cors())
app.use(bodyParser.json())

//http://localhost:8081/


app.get('/BHAStoreList', BHAStoresListController.GetBHAStores)

app.get('/Rank', DataByRankController.GetDataByRank)

app.get('/Lowestprice', LowestPriceController.GetModelRank)

app.get('/AvgPrice', AvgPriceController.GetAvgPrice)

app.get('/MaxPrice', MaxPriceController.GetMaxPrice)

app.get('/Saturation', SaturationController.GetSaturation)

app.get('/BubbleDataCompetition', BubbleChartCompetitionController.GetBubbleData)

app.get('/DoughnutData', DoughnutChartController.GetDoughnutData)

app.get('/LineDataLowest', LineChartController.GetLowestLineChart)

app.get('/LineDataLowestBHA', LineCharBHAtController.GetLowestBHALineChart)



app.listen(process.env.PORT || 8081);