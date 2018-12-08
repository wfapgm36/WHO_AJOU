<template>
  <v-carousel height="850">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      class="carousel"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://images.unsplash.com/photo-1500189001820-d65835a662d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80'
        },
        {
          src: 'https://images.unsplash.com/photo-1482242248426-c4e9fe3a559a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        },
        {
          src: 'https://images.unsplash.com/photo-1512101147095-d05249ea9a04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60'
        },
        {
          src: 'https://images.unsplash.com/photo-1479740030693-66ad10f3a7b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        }
      ]
    }
  }
}
</script>

<style>
 .carousel{
  height: 1000px;
}
</style>
