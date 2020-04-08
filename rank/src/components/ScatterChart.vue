
<script>
//Rank/Price position
import { Bubble } from "vue-chartjs"
export default {
     extends: Bubble,
    props:['BubbleChartDataCompetition','BubbleChartDataStore'],
    data(){
        return{
            chartData:{
                datasets: [
                    {
                    label: 'Your Listings',
                    fill: true,
                    borderColor: 'rgb(37, 37, 37, .8)',
                    backgroundColor: 'rgba(63, 195, 128, 1)',
                    //x = MSRP  y=Price r=rank%10  
                    data:[
                        {
                        r:10,
                        x:22,
                        y:15
                        },
                        {
                        r:10,
                        x:18,
                        y:33
                        },
                        {
                        r:10,
                        x:33,
                        y:18
                        },
                        {
                        r:10,
                        x:12,
                        y:20
                        }
                    ]
                    },
                    {
                    label: 'Competitors',
                    fill: true,
                    borderColor: 'rgb(37, 37, 37, .8)',
                    backgroundColor: 'rgba(217, 30, 24, .8)',
                    //x = MSRP  y=Price r=rank%10
                    data:[
                        {
                        r:10,
                        x:28,
                        y:26
                        },
                        {
                        r:10,
                        x:14,
                        y:13
                        },
                        {
                        r:10,
                        x:23,
                        y:15
                        },
                        {
                        r:10,
                        x:16,
                        y:17
                        }
                    ]
                    }
                ],
            },
            options:{
                    title:{
                        display:true,
                        text:'Daily Position | Based On All Prices',
                        fontColor:'#226089',
                         fontSize:13
                    },
                    legend: {
                        onHover: function(e) {
                            e.target.style.cursor = 'pointer';
                        },
                        onLeave: function (e) {
                            e.target.style.cursor = 'default'
                        },
                        labels: {
                            fontColor: '#226089',
                            fontSize:18
                        }
                    },
                    scales: {
                        yAxes: [{
                             scaleLabel: {
                                display: true,
                                labelString: 'Price',
                                fontStyle: 'bold',
                                fontColor: "#226089"
                            },
                            ticks: {
                                fontColor: "#226089",
                                fontSize: 14,
                                stepSize: 1000,
                                beginAtZero: false
                            }
                        }],
                        xAxes: [{

                            scaleLabel: {
                                display: true,
                                labelString: 'Rank',
                                fontStyle: 'bold',
                                fontColor: "#226089"
                            },
                            ticks: {
                                fontColor: "#226089",
                                fontSize: 12,
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }]
                    },
                    tooltips: {
                            enabled: true,
                            mode: 'single',
                            callbacks: {
                                label: function(tooltipItems) {
                                    return 'Rank:' + tooltipItems.xLabel + ' ' + 'Price:' + tooltipItems.yLabel;
                                }
                            }
                        },
                },
                    responsive: true, maintainAspectRatio: false
        }
            
    },
    mounted(){
        this.renderChart(this.chartData, this.options)
    },
    watch: {
        BubbleChartDataCompetition () {
            this.chartData.datasets[0].data = this.BubbleChartDataStore
            this.chartData.datasets[1].data = this.BubbleChartDataCompetition
            this.renderChart(this.chartData, this.options)
        }
    }
}

</script>
<style scoped>
canvas{
  margin-bottom: 50px;
    margin-top: 0;
}
</style>