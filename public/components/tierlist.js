app.component("tierlist", {
    // Aurait servi pour sauvegarder les tierslist en fonction des personnes connectées et aurait pu permettre de voir celle des gens
    /*html*/
    template:
    `
    <div>
    <div id='row' class='drop-zone' @drop="onDrop($event, 1)" @dragover.prevent
    @dragenter.prevent>
      <div class="labelTL" style="background-color:green">S</div>
      <div v-for='item in listS' :key='item.url' id='row' class='drag-el'  draggable="True" @dragstart="startDrag($event, item)">
       <img class="card" :id='i'  :src="'../assets/images/smashicon/'+item.id+'.png'" alt="Character Picture">
      </div>
    </div>
    <div id='row' class='drop-zone' @drop="onDrop($event, 2)" @dragover.prevent
    @dragenter.prevent>
      <div class="labelTL" style="background-color:aqua">A</div>
      <div v-for='item in listA' :key='item.url' id='row' class='drag-el'  draggable="True" @dragstart="startDrag($event, item)">
       <img class="card" :id='i'  :src="'../assets/images/smashicon/'+item.id+'.png'" alt="Character Picture">
      </div>
    </div>
    <div id='row' class='drop-zone' @drop="onDrop($event, 3)" @dragover.prevent
    @dragenter.prevent>
      <div class="labelTL" style="background-color:orange">B</div>
      <div v-for='item in listB' :key='item.url' id='row' class='drag-el'  draggable="True" @dragstart="startDrag($event, item)">
        <img class="card" :id='i'  :src="'../assets/images/smashicon/'+item.id+'.png'" alt="Character Picture">
      </div>
    </div>
    <div id='row' class='drop-zone' @drop="onDrop($event, 4)" @dragover.prevent
    @dragenter.prevent>
      <div class="labelTL" style="background-color:orangered">C</div>
      <div v-for='item in listC' :key='item.url' class='drag-el'  draggable="True" @dragstart="startDrag($event, item)">
        <img class="card" :id='i'  :src="'../assets/images/smashicon/'+item.id+'.png'" alt="Character Picture">
      </div>
    </div>
    <div id='row' class='drop-zone' @drop="onDrop($event, 5)" @dragover.prevent
    @dragenter.prevent>
      <div class="labelTL" style="background-color:red">D</div>
      <div v-for='item in listD' :key='item.url' class='drag-el'  draggable="True" @dragstart="startDrag($event, item)">
        <img class="card" :id='i'  :src="'../assets/images/smashicon/'+item.id+'.png'" alt="Character Picture">
      </div>
    </div>
    <div id="bank" class='drop-zone' @drop="onDrop($event, 6)" @dragover.prevent
    @dragenter.prevent>
      <div v-for='item in listBank' :key='item.url' class='drag-el' draggable="True" @dragstart="startDrag($event, item)">
        <img class="card" :id='i'  :src="'../assets/images/smashicon/'+item.id+'.png'" alt="Character Picture">
      </div>
    </div>
  </div>
    `,


    data() {
      return {
        items: []
      }
    },
    created(){
       for(i of Array(86).keys()){
         i += 1
         this.items.push({
           id: i,
           list: 6,
         })
       }
    },
    computed: {
      listS () {
        return this.items.filter(item => item.list === 1)
      },
      listA () {
        return this.items.filter(item => item.list === 2)
      },
      listB () {
        return this.items.filter(item => item.list === 3)
      },
      listC () {
        return this.items.filter(item => item.list === 4)
      },
      listD () {
        return this.items.filter(item => item.list === 5)
      },
      listBank () {
        return this.items.filter(item => item.list === 6)
      }
  	},
    methods: {
  		startDrag (evt, item) {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item.id)
  		},
  		onDrop (evt, list) {
  			const itemID = evt.dataTransfer.getData('itemID')
  			const item = this.items.find(item => item.id == itemID)
  			item.list = list
  		}
  	}
  })