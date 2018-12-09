<template>
  <div class="user-list">
    <h1 align-h="center">User List</h1>
     <b-table striped hover :items="items" :fields="['username']" outlined="true" small="true" ></b-table>
  </div>
</template>

<script>
export default {
  name: 'user-list',
  data(){
    return{
    items: []
}
},
  created(){
    this.$EventBus.$emit('removeTab', true)
    this.fetchData()
  },
  methods:{
    fetchData(){
      this.$http.get("/api/user/list")
      .then(res => {
        this.items = res.data
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
