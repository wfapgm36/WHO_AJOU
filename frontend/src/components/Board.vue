<template>
  <div class="board">
    <h1 align-h="center">This is Board Page!</h1>
    <div v-for="item in boards" v-bind:data="item" v-bind:key="item.id">
      <b-row>
        <b-col>{{item.number}}</b-col>
        <b-col>{{item.title}}</b-col>
        <b-col>{{item.writer}}</b-col>
        <b-col>{{item.date}}</b-col>
        <b-col>{{item.cnt}}</b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      boards: {
        number: '',
        title: '',
        writer: '',
        date: '',
        cnt: '',
      }
    }
  },
  methods: {
    getBoards() {
      this.$http.get('/boards')
      .then((res) => {
        this.boards.number = res.number
        this.boards.title = res.title
        this.boards.writer = res.writer
        this.boards.date = res.createdAt
        this.boards.cnt = res.count
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
