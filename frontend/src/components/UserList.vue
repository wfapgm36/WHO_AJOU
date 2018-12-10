<template>
  <div class="user-list">
    <h1 align-h="center">User List</h1>
     <b-table striped hover :items="items" :fields="['username','nickname', 'createAt', 'major']" outlined="true" ></b-table>
  </div>
</template>

<script>
export default {
  name: 'user-list',
  data () {
    return {
      items: []
    }
  },
  created () {
    this.$EventBus.$emit('removeTab', true)
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('/api/user/list')
        .then(res => {
          this.items = res.data
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].createAt = this.$moment(this.items[i].createAt).format('LLLL')
          }
        })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
