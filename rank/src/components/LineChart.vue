<script>
import { Line } from "vue-chartjs";

export default {
  props:['LineChartLowest', 'LineChartBHALowest'],
  extends: Line,
  data(){
    return{
      chartData:{
          //dummy data
          labels: ['03-06-2020','03-06-2020','03-06-2020','03-06-2020','03-06-2020','03-06-2020','03-06-2020'],
          datasets: [
            {
              label: "Your Price",
              //dummy data
              data: [12,13,14,11,8,12,55],
              backgroundColor: "rgba(247, 202, 24, .50)",
              borderColor: "rgb(37, 37, 37, .8)",
              pointBackgroundColor: "rgba(249, 105, 14, 1)"
            },
            {
              label: "Lowest Price",
              //dummy data
              data: [5,5,8,18,20,21,25,26],
              backgroundColor: "rgba(63, 195, 128, .80)",
              borderColor: "rgb(37, 37, 37, .8)",
              pointBackgroundColor: "rgba(128, 0, 0, .50)"
            }
          ]
      },

      options:{
          title:{
            display:true,
            text:'Lowest Price Over Time',
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
                    beginAtZero: false
                }
            }],
                
            xAxes: [{
              scaleLabel: {
                      display: true,
                      labelString: 'Date',
                      fontStyle: 'bold',
                      fontColor: "#226089"
                  },
                ticks: {
                    fontColor: "#226089",
                    fontSize: 12,
                }
            }]
          }

      }
    }
  },
  mounted(){
        this.renderChart(this.chartData, this.options)
    },
    watch: {
        LineChartLowest () {

            //labels
            this.chartData.labels =  this.LineChartBHALowest.map(data => data.DATE)
            //data set 2 "Lowest Price"
            this.chartData.datasets[1].data =  this.LineChartLowest.map(data => data.LowestPrice)
            //data set 1 "Your Price"
            this.chartData.datasets[0].data =  this.LineChartBHALowest.map(data => data.LowestPrice)

            //re-render chart
            this.renderChart(this.chartData, this.options)
        }
    }
};
</script>