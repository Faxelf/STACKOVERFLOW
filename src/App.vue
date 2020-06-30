<template>
  <div id="app">
    <!-- CONTAINER BY BOOTSTRAP -->
    <div class="container mt-4" ref="container" id="stage-parent">
      <!-- STAGE  -->
      <v-stage :config="configKonva" ref="stage">
        <!-- LAYER  -->
        <v-layer ref="layer">
          <!-- SHAPE GROUP: CIRCLE+TEXT, LOOP ITEM FROM LINKS ARRAY-->
          <v-group :config="{draggable: true}" v-for="item in links" :key="item.id">
            <v-circle
              :config="{
          x: item.x,
          y: item.y,
          radius: 15,
          fill: '#05b2dd',
          stroke: '#05b2dd',
          strokeWidth: 2
        }"
            ></v-circle>
            <v-text
              :config="{
          x: item.x - 50,
          y: 60,
          text: item.titleUrl,
          width: 100,
          fill: 'black',
          shadowBlur: 10,
          align: 'center',
          shadowColor: '#05b2dd'
        }"
            />
          </v-group>
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // PUSH DATA IN THIS ARRAY FROM DB
      links: [],
      configKonva: {
        //I PICK UP WIDTH FROM PARENT (CONTAINER) BELLOW
        width: null,
        height: 1000,
        draggable: true
      }
    };
  },
  methods: {
    //MATCH PARENT WIDTH TO STAGE WIDTH
    matchWidth() {
      this.configKonva.width = this.$refs.container.clientWidth;
    }
  },

  mounted() {
    this.matchWidth();
    //EXAMPLE DATA FROM DB (INCREASE)
    var dataFromDB = [
      { item: "A1", title: "A1 title" },
      { item: "A2", title: "A2 title" },
      { item: "A3", title: "A3 title" },
      { item: "A4", title: "A4 title" },
      { item: "A5", title: "A5 title" },
      { item: "A6", title: "A6 title" },
      { item: "A7", title: "A7 title" },
      { item: "A8", title: "A8 title" },
      { item: "A9", title: "A9 title" },
      { item: "A10", title: "A10 title" },
      { item: "A11", title: "A11 title" },
      { item: "A12", title: "A12 title" },
      { item: "A13", title: "A13 title" }
    ];
    // I PUSH IN THIS ARRAY DATA FROM DB
    const snapData = [];
    //INDEX FOR FOREACH BELLOW
    var index = 0;
    //INDEX TO INCREMENT LEFT SIDE, FROM CENTEX X AXIS
    var n = 0;
    // START LOOP
    dataFromDB.forEach(doc => {
      snapData.push({
        linkUrl: doc.item,
        titleUrl: doc.title,
        // HERE I'M TRIYING TO START DRAWING FROM xCENTER axis TO RIGHT at the beginning
        x: this.configKonva.width / 2 + 100 * index,
        y: 50
      });
      //HERE I CHECK IF CURRENT ITEM Exceeds WIDTH (-70 BECAUSE I HAVE MARGIN see STYLE)
      if (snapData[index].x > this.configKonva.width - 70) {
        console.log(snapData[index].x);
        // START DRAWIN LEFT SIDE FROM xCenter
        snapData[index].x = this.configKonva.width / 2 - 100 * ++n;
      }
      // I CKECK IF SOME NODE IS NEGATIVE AND EXEEDS WIDTH TO START ZOOMING OUT THE STAGE
      if (snapData[index].x < 0) {
        console.log("Negative node x axis:", snapData[index]);
        var scaleBy = 1.2;
        var rStage = this.$refs.stage;
        var stage = rStage.getStage();
        console.log(stage);
        var oldScale = stage.scaleX();
        console.log(oldScale);
        var newScale = oldScale / scaleBy;
        console.log(newScale);
        stage.scale({ x: newScale, y: newScale });
        stage.batchDraw();
      }
      index += 1;
    });
    // push result to LINKS ARRAY ABOVE
    this.links = snapData;
  }
};
</script>
<style>
#stage-parent {
  margin-right: auto;
  margin-left: auto;
  max-width: 1140px;
}
</style>