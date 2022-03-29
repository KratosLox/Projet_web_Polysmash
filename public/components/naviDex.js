app.component('navi-dex', {
    template: 
    /*html*/
    `
    <div class="nav-bar">
        <form class="label" @submit.prevent="search">
            <input id='nav-bar-input' type="text"
            placeholder="Search profile"
            accesskey="t">
            <a href="/search" button></a>
          
        </form>
        
    </div>`,
    data() {
      return {
      }
    },
    methods: {
      search(){
        this.$emit('recherche')

      }

        
    },
    computed: {
        
    }
  })