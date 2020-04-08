<template>
    <div>
        <h6>Competitor Breakdown</h6>
        <div class="card card-cascade narrower table-wrapper-scroll-y my-custom-scrollbar shadow rounded" style="width: 18rem;">
        <ul class="list-group list-group-flush"
        v-for="(DoughnutChartRawData, index) in DoughnutChartRawData " :key="index"
        >
            <li  v-if="DoughnutChartRawData.CUSTOMER_NAME != Store"  class="list-group-item"><CompetitiorSaturation
                :Saturation='Math.round(Saturation(DoughnutChartRawData.TopCount, DoughnutChartRawData.TOTALCOUNT))'/>
                <p>{{DoughnutChartRawData.CUSTOMER_NAME}} </p>
                <p class="price"> ${{DoughnutChartRawData.PRICE}}</p>
             </li>
        </ul>
        </div>
    </div>
</template>

<script>
import CompetitiorSaturation from '@/components/CompetitorSaturation.vue'
    export default {
        props:['Store', 'DoughnutChartRawData'],
        data() {
            return{
            }
        },
        components:{
            CompetitiorSaturation
        },
        methods:{
              Saturation: function(TopCount, TOTALCOUNT){
                return parseInt(TopCount) / parseInt(TOTALCOUNT) * 100
            },
        },
    }
</script>

<style scoped>
h6{
    font-weight: 600;
    margin-bottom: 20px;
}
.my-custom-scrollbar {
    position: relative;
    max-height: 300px;
    overflow-x: none;
    overflow-y: auto;
}
.table-wrapper-scroll-y {
    display: block;
}

.list-group-item{
    color: #226089;
    display: flex;
    font-size: 13px;
    font-weight:600;
}
.list-group-item p{
    margin: 0 auto;
}
.card, .list-group-item{
    background-color: rgba(0,0,0,0);
}
.price{
    padding: 5px;
    color: rgba(249, 105, 14, 1);
}
/* scroll-bar */

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0,0,0,0); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(249, 105, 14, .8); 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(249, 105, 14, 1); 
}
</style>