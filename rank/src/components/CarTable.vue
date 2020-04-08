/* eslint-disable */

<template>
<div class="container">
    <div id="table-wrapper" class="card card-cascade narrower table-wrapper-scroll-y my-custom-scrollbar shadow bg-white rounded">
        <!--Table-->
        <table id="tablePreview" class="table table-hover table-striped table-borderless table-sm mb-1">
            <!--Table Title -->
            <thead id="title-car">
                <tr>
                    <th class="navIcon">
                        <font-awesome-icon :icon="VehicleType" /> 
                            <span class='VehicleTypeP' v-if="VehicleType === 'truck'">Truck</span>
                            <span class='VehicleTypeP' v-else-if="VehicleType === 'bus'">SUV/Van</span>
                            <span class='VehicleTypeP' v-else>Cars</span>
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th class="saturation">Based On Lowest Prices</th>
                </tr>
            </thead>
            <!-- Table Ttitle End -->
     
            <!--Table head-->
            <thead class="Tableheader">
                <tr>
                <th>Model</th>
                <th>Your Price</th>
                <th>MSRP</th>
                <th>Rank</th>
                <th>Lowest Price</th>
                <th>Avg Price</th>
                <th>Highest Price</th>
                <th>Saturation</th>
                </tr>
            </thead>
            <!--Table head-->
            
            <!--Table body-->
            <tbody>
                <tr 
                    
                    v-for="(DatabyStore, index) in DatabyVehicleType"
                    :key="index" 
                >
                    <a href="#ScrollToChart" 
                    v-smooth-scroll="{ duration: 1000, updateHistory: false }">
                        <th 
                        v-on:click="ClickedModel = DatabyStore.Model, GetChartData()" 
                        scope="row" class="Model" >
                            {{DatabyStore.Model}}
                        </th>
                    </a>
                    <td>${{DatabyStore.PRICE}}</td>
                    <td>${{DatabyStore.MSRP}}</td>
                    <td>{{DatabyStore.Rank}}</td>
                    <td
                    v-for="(LowestPrice, index) in filterLowestPrice(DatabyStore.Model)" :key="index+1*18"
                    >${{LowestPrice.LowestPrice}}</td>
                    <td
                    v-for="(AvgPrice, index) in filterAvgPrice(DatabyStore.Model)" :key="index+1*26"
                    >${{Math.round(AvgPrice.AvgPrice)}}</td>
                    <td
                    v-for="(MaxPrice, index) in filterMaxPrice(DatabyStore.Model)" :key="index+1*55"
                    >${{MaxPrice.MaxPrice}}</td>
                    <td class="saturation"
                    v-for="(Saturation, index) in filterSaturation(DatabyStore.Model)" :key='index+1*128'
                    >
                        <div class="bar">
                            <div class="progress">
                                <div class="progress-bar">%{{Math.round(SaturationMath(Saturation.BHACOUNT, Saturation.TOTALCOUNT))}}</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            <!--Table body-->
        </table>
    </div>
</div>
</template>



<script>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  Javascript/Vue.js  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from '../../node_modules/axios'

    export default {
        props:[
            'VehicleType', 
            'Store', 
            'DatabyStore', 
            'Distance'
            ],
        data() {
            return {
                ClickedModel:'',
                BubbleChartDataCompetition:[],
                BubbleChartDataStore:[],
                DoughnutChartRawData:[],
                DatabyVehicleType:[],
                LowestPriceByModel:[],
                LineChartLowest:[],
                LineChartBHALowest:[],
                AvgPrice:'',
                HighestPrice:'',
                LowestPrice:'',
                Saturation:''
            }
        },
        methods: {
           
            filterLowestPrice: function(Models) {
               return this.LowestPrice.filter(function(data) {
                    return data.Model == Models;
                })
            },
            filterAvgPrice: function(Models) {
               return this.AvgPrice.filter(function(data) {
                    return data.Model == Models;
                })
            },
            filterMaxPrice: function(Models) {
               return this.HighestPrice.filter(function(data) {
                    return data.Model == Models;
                })
            },
            filterSaturation: function(Models) {
               return this.Saturation.filter(function(data) {
                    return data.Model == Models;
                })
            },

            SaturationMath: function(BHACOUNT, TOTALCOUNT){
                return parseInt(BHACOUNT) / parseInt(TOTALCOUNT) * 100
            },
            GetChartData: function(){
                axios
                .get(`http://localhost:8081/BubbleDataCompetition?Model=${this.ClickedModel}&customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.BubbleChartDataCompetition = response.data))

                axios
                .get(`http://localhost:8081/DoughnutData?Model=${this.ClickedModel}&customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.DoughnutChartRawData = response.data))

                axios
                .get(`http://localhost:8081/LineDataLowest?Model=${this.ClickedModel}&customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.LineChartLowest = response.data))

                axios
                .get(`http://localhost:8081/LineDataLowestBHA?Model=${this.ClickedModel}&customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.LineChartBHALowest = response.data))
            },
   
        },
        watch: {
            //update bubblecharDataStore on change 
            BubbleChartDataCompetition () {
                let Store = this.Store
                 return this.BubbleChartDataStore = this.BubbleChartDataCompetition.filter(function(data) {
                    return data.CUSTOMER_NAME == Store;
                })
            },
            DatabyStore(){
                axios
                .get(`http://localhost:8081/Lowestprice?customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.LowestPrice = response.data))

                axios
                .get(`http://localhost:8081/AvgPrice?customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.AvgPrice = response.data))

                axios
                .get(`http://localhost:8081/MaxPrice?customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.HighestPrice = response.data))

                axios
                .get(`http://localhost:8081/Saturation?customer=${this.Store}&distance=${this.Distance}`)
                .then(response => (this.Saturation = response.data))

                //filter data based on vehicle type when distance is changed.. data is delayed if you watch the actual "Distance" prop, so i placed it in here
                // vehicletype is passed as a prop for each table component
                if(this.VehicleType==='car'){    
                    return this.DatabyVehicleType = this.DatabyStore.filter(data=>{
                        return data.BODYSTYLE == 'Convertible' || data.BODYSTYLE == 'Hatchback' || data.BODYSTYLE == 'Sedan' || data.BODYSTYLE == 'Coupe'
                    })
                }else if(this.VehicleType==='truck'){
                    return this.DatabyVehicleType = this.DatabyStore.filter(data=>{
                        return data.BODYSTYLE == 'Extended Cab Pickup' || data.BODYSTYLE == 'Regular Cab Pickup' || data.BODYSTYLE == 'Crew Cab Pickup'
                    })
                }else {
                    return this.DatabyVehicleType = this.DatabyStore.filter(data=>{
                        return data.BODYSTYLE == 'SUV' || data.BODYSTYLE == 'Wagon' || data.BODYSTYLE == 'Passenger Van' || data.BODYSTYLE == 'Cargo Van' || data.BODYSTYLE == 'Minivan' 
                    })
                }
        

            },
            Store(){
                //filter data based on vehicle type, vehicxletype is passed as a prop for each table component
                if(this.VehicleType==='car'){    
                    return this.DatabyVehicleType = this.DatabyStore.filter(data=>{
                        return data.BODYSTYLE == 'Convertible' || data.BODYSTYLE == 'Hatchback' || data.BODYSTYLE == 'Sedan' || data.BODYSTYLE == 'Coupe'
                    })
                }else if(this.VehicleType==='truck'){
                    return this.DatabyVehicleType = this.DatabyStore.filter(data=>{
                        return data.BODYSTYLE == 'Extended Cab Pickup' || data.BODYSTYLE == 'Regular Cab Pickup' || data.BODYSTYLE == 'Crew Cab Pickup'
                    })
                }else {
                    return this.DatabyVehicleType = this.DatabyStore.filter(data=>{
                        return data.BODYSTYLE == 'SUV' || data.BODYSTYLE == 'Wagon' || data.BODYSTYLE == 'Passenger Van' || data.BODYSTYLE == 'Cargo Van' || data.BODYSTYLE == 'Minivan' 
                    })
                }
            },
            //watch component for change then push prop up to parent
           DoughnutChartRawData(){
                this.$emit('DoughnutChartRawDataFromChild', this.DoughnutChartRawData)
                this.$emit('BubbleChartDataStoreFromChild', this.BubbleChartDataStore)
                this.$emit('BubbleChartDataCompetitionFromChild', this.BubbleChartDataCompetition)
                this.$emit('LineChartLowestFromChild', this.LineChartLowest)
                this.$emit('LineChartBHALowestFromChild', this.LineChartBHALowest)
                this.$emit('ClickedModelFromChild', this.ClickedModel)
           }
        },

    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  CSS   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
</script>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Amatic+SC|Cabin+Sketch|Lato|Montserrat&display=swap);

/* global */
a{
    color: black
}

html {
  scroll-behavior: smooth;
}

* {
  margin : 0;
  padding : 0;
  font-family: 'Lato', sans-serif;
}

/* global */


/* Table */
.VehicleTypeP{
    margin-left:5px; 
}

.my-custom-scrollbar {
    position: relative;
    height: 300px;
    overflow-x: none;
    overflow-y: auto;
}
.table-wrapper-scroll-y {
    display: block;
}


#title-car{
    /* background: #0092ff; */
    background: #226089;
    
}

#title-car th{
    color: white;
}

.navIcon:hover{
    cursor: context-menu;
}

a, .Model{
    min-width: 150px;
}
.saturation{
   min-width: 150px; 
}
.Tableheader th:first-of-type{
    min-width: 150px;
}

table {
  text-align : center;
}
#table-wrapper{
    width: 100%;
    margin-bottom: 100px;
}

thead {
  font-weight : bold;
}

tfoot {
  font-weight : bold;
}

th, td {
  width : 5vw;
}

/* Table */







/* progress bar */
.container .progress {
  margin: 0 auto;
  width: 120px;
  height: 20px;
}

.progress {
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar {
  height: 16px;
  color: rgb(255, 255, 255);
  font-weight: 600;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
}

/*
add id to element based on saturation
 */

.bar .progress > .progress-bar {
  background-color: #f63a0f;
}

/* progress bar end */
/* .container{
    margin:0;
} */
</style>