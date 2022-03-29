app.component('card-smash', {

    props:{
      nom:{
        type: String,
        required : true,
      }
    },

  data(){
    return{
      image: '',
      id: null,
      types: [],
    }
  },
  created(){
      P.getProfileByName(this.nom)
        .then( res =>{
          this.pseudo = res.pseudo;
      })
    },
    methods:{
      selected(id){
        this.$parent.$parent.selection = id
        this.$emit('sel')
      }
      
    },
  template: 
  /*html*/
  `
    <div class="profilecard" v-on:click='selected(this.id)'>
      <div class="info">
        <span class="pseudo">Loxy</span>
      </div>
      <h3 class="nom">{{nom[0].toUpperCase()+nom.slice(1)}}</h3>
      
    </div>
  </div>
  `,
  
})