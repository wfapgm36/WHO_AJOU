<template>
<div>
  <v-carousel height="850" hide-controls="true" hide-delimiters="true">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      class="carousel"
    ></v-carousel-item>
  </v-carousel>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      title
    >
      <v-card-title class="grey darken-2">
        <strong class="subheading">Ajou Community site with TEAM6 ! Merry Christmas !!</strong>

        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 김치헌 | 박찬영 | 이소연 | 이아연 — <strong> Ajou Univ.</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</div>
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
