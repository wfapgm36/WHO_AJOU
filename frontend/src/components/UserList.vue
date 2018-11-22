<template>
  <div class="user-list">
    <h1 align-h="center">This is User List Page!</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.username }}
        </li>
        </ul>
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
