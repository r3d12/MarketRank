<script>
//Competitor Saturation

//random colors for chart

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props:['DoughnutChartRawData'],
  data(){
    return{
      chartData:{
        labels: ["San Tan VW", "VW North ScottsDale", "Camelback VW"],
          datasets: [
            {
              backgroundColor: ['#581b98','#9c1de7','#f3558e','#faee1c'],
              borderColor: "rgb(37, 37, 37, .8)",
              data: [8,40,22,18]
            }
          ]
      },
      options:{
        title:{
                display:true,
                text:'Daily Saturation',
                fontColor:'#226089',
                fontSize:13
            },
        legend: {
          display: false,
              labels: {
                
                fontColor: '#226089',
                fontSize:14
              }
          },
          responsive: true, maintainAspectRatio: false  
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch:{
    DoughnutChartRawData(){
          //get saturation -- percentage of market share for specific model
          const DoughnutData =  this.DoughnutChartRawData.map(data =>
           Math.round(parseInt(data.TopCount, 10) / parseInt(data.TOTALCOUNT, 10) * 100))

          const DoughnutLabels =  this.DoughnutChartRawData.map(data => 
          data.CUSTOMER_NAME + ': ' + Math.round(parseInt(data.TopCount, 10) / parseInt(data.TOTALCOUNT, 10) * 100) +'%')

          this.chartData.labels = DoughnutLabels
          this.chartData.datasets[0].data = DoughnutData
          this.chartData.datasets[0].backgroundColor = DoughnutLabels.map(() => getRandomColor())
          this.renderChart(this.chartData, this.options);
         
            

    }
  }
};
</script>
<style scoped>
/* canvas{
  margin-top: 50px;

} */
</style>