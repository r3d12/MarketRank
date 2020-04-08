<template>


<div class="container">

  <!-- Waves Container -->
  <div class="header">
    <h1>Price Check</h1>
    
        <div class="form-group">
          <h3>Last Pulled: 24hrs | Radius </h3>
          <select v-model="Distance" @change="GetAnalytics()" class="form-control" id="exampleFormControlSelect1">
            <option>50</option>
            <option>100</option>
            <option>150</option>
            <option>200</option>
          </select>
          <h3>Miles</h3>
        </div>

    
    <hr>
      <!-- Default dropright button -->
    <div class="btn-group dropdown">

        <button type="button" class="btn btn-primary dropdown-toggle StoreSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span>{{Store}}</span>
        </button>

        <div class="dropdown-menu"
            v-for="(BHAStores, index) in BHAStores" 
            :key="index">
            <!-- Dropdown menu links -->
            <span @click="Store = BHAStores.CUSTOMER_NAME, GetDatabyStore(), GetAnalytics()">
                {{BHAStores.CUSTOMER_NAME}}
                <hr>
            </span>

        </div>
    </div>      
  
  <!--Content before waves-->
    <div class="inner-header">
      <div class="tables">
        <CarTable 
          :Saturation="Saturation"
          :HighestPrice="HighestPrice"
          :AvgPrice="AvgPrice"
          :LowestPrice="LowestPrice"
          :Distance="Distance" 
          :DatabyStore="DatabyStore" 
          :Store="Store" 
          :VehicleType="'car'"
          v-on:DoughnutChartRawDataFromChild="onChildClickDougnut"
          v-on:ClickedModelFromChild="onChildClickModel"
          v-on:BubbleChartDataCompetitionFromChild="onChildClickBubbleChartDataCompetition"
          v-on:BubbleChartDataStoreFromChild="onChildClickBubbleChartDataStore"
          v-on:LineChartLowestFromChild="onChildClickLineChartLowest"
          v-on:LineChartBHALowestFromChild="onChildClickLineChartBHALowest"
          />
          <CarTable 
          :Saturation="Saturation"
          :HighestPrice="HighestPrice"
          :AvgPrice="AvgPrice"
          :LowestPrice="LowestPrice" 
          :Distance="Distance"
          :DatabyStore="DatabyStore"
          :Store="Store" 
          :VehicleType="'truck'"
          v-on:DoughnutChartRawDataFromChild="onChildClickDougnut"
          v-on:ClickedModelFromChild="onChildClickModel"
          v-on:BubbleChartDataCompetitionFromChild="onChildClickBubbleChartDataCompetition"
          v-on:BubbleChartDataStoreFromChild="onChildClickBubbleChartDataStore"
          v-on:LineChartLowestFromChild="onChildClickLineChartLowest"
          v-on:LineChartBHALowestFromChild="onChildClickLineChartBHALowest"
          />
          <CarTable 
          :Saturation="Saturation"
          :HighestPrice="HighestPrice"
          :AvgPrice="AvgPrice"
          :LowestPrice="LowestPrice"
          :Distance="Distance" 
          :DatabyStore="DatabyStore" 
          :Store="Store" 
          :VehicleType="'bus'"
          v-on:DoughnutChartRawDataFromChild="onChildClickDougnut"
          v-on:ClickedModelFromChild="onChildClickModel"
          v-on:BubbleChartDataCompetitionFromChild="onChildClickBubbleChartDataCompetition"
          v-on:BubbleChartDataStoreFromChild="onChildClickBubbleChartDataStore"
          v-on:LineChartLowestFromChild="onChildClickLineChartLowest"
          v-on:LineChartBHALowestFromChild="onChildClickLineChartBHALowest"
          />
        </div>
    <!-- Chart column -->
    <div class="ChartRow">
        <section class="ChartHeader">
            <h3>{{ClickedModel}}</h3>
            <h5>{{Distance}} Mile Radius</h5>
            <hr>
        </section>
        <section class="chart-container" id="ScrollToChart">
          <div class="CompetitorBreakdown"> 
              <CompetitorBreakdown 
                :Store="Store"
                :DoughnutChartRawData="DoughnutChartRawData"
                /> 
          </div>
          <Doughnut :DoughnutChartRawData="DoughnutChartRawData" class="Donutchart-body"/>
          <LineChart :LineChartLowest="LineChartLowest" :LineChartBHALowest="LineChartBHALowest"/>
          <Scatter :BubbleChartDataCompetition="BubbleChartDataCompetition"  :BubbleChartDataStore="BubbleChartDataStore"/> 
        </section>
    </div>
    <!-- Chart column -->
      

    </div>


    <!--Waves Container-->
    <div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(34,96,137,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(34,96,137,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(34,96,137,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(34,96,137,1)" />
        </g>
      </svg>
    </div>
    <!--Waves end-->

  </div>



</div>
</template>

// JS
<script>

import axios from '../../node_modules/axios'
import CarTable from '@/components/CarTable.vue';
import Doughnut from '@/components/DoughnutChart.vue';
import Scatter from '@/components/ScatterChart.vue';
import LineChart from '@/components/LineChart.vue';
import CompetitorBreakdown from '@/components/CompetitorBreakdown.vue'

export default {
  data(){
    return{
        BubbleChartDataCompetition:[],
        BubbleChartDataStore:[],
        DoughnutChartRawData:[],
        LineChartLowest:[],
        LineChartBHALowest:[],
        ClickedModel:'Model',
        Store:'Store',
        Ranks:{},
        DatabyStore:{},
        BHAStores:'',
        Distance:'50',
        LowestPrice:'',
        HighestPrice:'',
        AvgPrice:'',
        Saturation:''

    }
  },
    created () {
      axios
      .get('http://localhost:8081/BHAStoreList')
      .then(response => (this.BHAStores = response.data))

      axios
      .get(`http://localhost:8081/Rank?distance=${this.Distance}&customer=${this.Store}`)
      .then(response => (this.Ranks = response.data))  
      
      
    },
    components:{
        CarTable,
        Doughnut,
        Scatter,
        LineChart,
        CompetitorBreakdown

    },
    methods:{
      onChildClickDougnut (value) {
        this.DoughnutChartRawData = value
      },
      onChildClickModel (value) {
        this.ClickedModel = value
      },
      onChildClickBubbleChartDataStore (value) {
        this.BubbleChartDataStore = value
      },
      onChildClickBubbleChartDataCompetition (value) {
        this.BubbleChartDataCompetition = value
      },
      onChildClickLineChartLowest (value) {
        this.LineChartLowest = value
      },
      onChildClickLineChartBHALowest (value) {
        this.LineChartBHALowest = value
      },
      GetDatabyStore: function(){
          let Store = this.Store
          //filter data by store name
          return this.DatabyStore = this.Ranks.filter(function(data) {
              return data.CUSTOMER_NAME === Store
          });
      },
      GetAnalytics: function(){
          axios
          .get(`http://localhost:8081/Rank?distance=${this.Distance}&customer=${this.Store}`)
          .then(response => (this.Ranks = response.data))
      }
    },
    watch:{
      Ranks(){
          let Store = this.Store
          //filter data by store name
          return this.DatabyStore = this.Ranks.filter(function(data) {
              return data.CUSTOMER_NAME === Store
          })
      }
    }
}

</script>

<style>

@import url(//fonts.googleapis.com/css?family=Amatic+SC|Cabin+Sketch|Lato|Montserrat&display=swap);

body {
  margin:0;
}


.header h1 {
  font-family: 'Lato', sans-serif;
  font-weight:700;
  letter-spacing: 2px;
  font-size:48px;
  margin-top: 10px;
  text-shadow: 1px 2px 2px #000;
}
.header hr{
  width: 500px;
	border-top: 2px solid #f8f8f8;
	border-bottom: 2px solid rgba(255, 0, 0, 0.2);
}
.header h3, h5 {
  font-family: 'Lato', sans-serif;
  text-shadow: 1px 2px 2px #e3c4a8;

}
.header {
  position: absolute;
  top:0;
  left: 0;
  width:100%;
  text-align:center;
  background: whitesmoke;
  color:#226089;
}

.waves {
  position:relative;
  width: 100%;
  height:14vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}
.form-group{
  display: flex;
  justify-content: center;
}
.form-group .form-control{
  width:80px;
  margin-left: 8px;
  margin-right: 8px;

}
.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: #226089;
}
/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}

/* Chart */
.chart-container{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
}
.ChartHeader h5{
  color: rgba(249, 105, 14, 1);
}
.ChartHeader hr{
  width: 300px;
	border-top: 1px solid #f8f8f8;
	border-bottom: 1px solid rgb(0,0,0,0.2);
}
.ChartRow{
  margin:0;
  padding: 0;
}

.CompetitorBreakdown{
  margin-top:15px;
}
/* Chart */


/* NAV */
.dropdown{
    max-width: 325px;
}
.dropdown-menu{
    width:100%;
    overflow-y: scroll;
    text-align: center;
}

.dropdown-menu span:hover{
    cursor: pointer;
    color: rgb(90, 0, 0);
}

.dropdown-menu span{
    margin-left: 25px;
}

.dropdown-menu span hr{
    width: 70%;
    margin:0 auto;
}

.dropdown{
    width: 100%;
}
.StoreSelect span{
  font-weight: 600;
}
.dropdown .btn-primary, .dropdown .btn-primary:hover{
    background-color: rgba(249, 105, 14, 1);
    /* background: #F9690E; */
    box-shadow:  2px 2px 3px #d4590c, 
             -2px -2px 3px #ff7910;
    margin: 25px;
    border:none;
}
/* scroll-bar */

/* width */
::-webkit-scrollbar {
  width: 11px;
}

/* Track */
::-webkit-scrollbar-track {
  background-color: rgba(34,96,137,1); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(249, 105, 14, 1); 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(223, 93, 0); 
}

</style>