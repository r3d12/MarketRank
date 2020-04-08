<template>
    <div class='wrapper'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" style="display: none;">
            <symbol id="wave">
                <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
                <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
                <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
                <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
            </symbol>
        </svg>
        <div class="box">
            <div class="percent">
                <div class="percentNum" id="count" >{{Saturation}}</div>
                <div class="percentB">%</div>
            </div>
            <div id="water" :style="style" class="water">
                <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
                <use xlink:href="#wave"></use>
                </svg>
                <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
                <use xlink:href="#wave"></use>
                </svg>
            </div>
        </div>

    </div>
</template>

<script>


    export default {
        props:['ClickedModel', 'Saturation'],
        computed: {
            style () {
                return{transform: 'translate(0'+','+(100-this.Saturation)+'%)'}  
            }
          }
    }
</script>

<style scoped>


.container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

body {
  background: rgba(0, 0, 0, 0);
  font: 14px/1 'Open Sans', helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.box {
  height: 40px;
  width: 40px;

  -webkit-transform: translate(-10%, -10%);
          transform: translate(-10%, -10%);
  background: #020438;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
}
.box .percent {
  z-index: 3;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  color: #fff;
  font-size: 16px;
}
.box .water {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  -webkit-transform: translate(0, 100%);
          transform: translate(0, 100%);
  background: #f9690e;
  -webkit-transition: all 1.5s;
  transition: all 1.5s;
}
.box .water_wave {
  width: 200%;
  position: absolute;
  bottom: 100%;
}
.box .water_wave_back {
  right: 0;
  fill: #f9b180;
  -webkit-animation: wave-back 1.4s infinite linear;
          animation: wave-back 1.4s infinite linear;
}
.box .water_wave_front {
  left: 0;
  fill: #f9690e;
  margin-bottom: -1px;
  -webkit-animation: wave-front .7s infinite linear;
          animation: wave-front .7s infinite linear;
}

@-webkit-keyframes wave-front {
  100% {
    -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
  }
}

@keyframes wave-front {
  100% {
    -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
  }
}
@-webkit-keyframes wave-back {
  100% {
    -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
  }
}
@keyframes wave-back {
  100% {
    -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
  }
}

</style>