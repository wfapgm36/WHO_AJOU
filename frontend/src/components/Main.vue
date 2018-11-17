<template>
  <div class="main" >
<b-card no-body>
    <b-tabs card>
        <span class = "tab_context">
            <b-tab title="커리큘럼" active>
                <p>{{major}}</p>
                <b-container class="curriculum">
                <b-row align-v="center" class="height">
                <b-col>1-1</b-col>
                <b-col>1-2 </b-col>
                <b-col>2-1</b-col>
                <b-col>2-2</b-col>
                <b-col>3-1</b-col>
                <b-col>3-2</b-col>
                <b-col>4-1</b-col>
                <b-col>4-2</b-col>
            </b-row>
            <b-row align-v="center" class="height">
                <b-col>1-1</b-col>
                <b-col>1-2</b-col>
                <b-col>2-1</b-col>
                <b-col>2-2</b-col>
                <b-col>3-1</b-col>
                <b-col>3-2</b-col>
                <b-col>4-1</b-col>
                <b-col>4-2</b-col>
            </b-row>
            <b-row align-v="center" class="height">
                <b-col>1-1</b-col>
                <b-col>1-2</b-col>
                <b-col>2-1</b-col>
                <b-col>2-2</b-col>
                <b-col>3-1</b-col>
                <b-col>3-2</b-col>
                <b-col>4-1</b-col>
                <b-col>4-2</b-col>
            </b-row>
            <b-row align-v="center" class="height">
                <b-col>1-1</b-col>
                <b-col>1-2</b-col>
                <b-col>2-1</b-col>
                <b-col>2-2</b-col>
                <b-col>3-1</b-col>
                <b-col>3-2</b-col>
                <b-col>4-1</b-col>
                <b-col>4-2</b-col>
            </b-row>
            <b-row align-v="center" class="height">
                <b-col>1-1</b-col>
                <b-col>1-2</b-col>
                <b-col>2-1</b-col>
                <b-col>2-2</b-col>
                <b-col>3-1</b-col>
                <b-col>3-2</b-col>
                <b-col>4-1</b-col>
                <b-col>4-2</b-col>
            </b-row>0
            <b-row align-v="center" class="height">
                <b-col>1-1</b-col>
                <b-col>1-2</b-col>
                <b-col>2-1</b-col>
                <b-col>2-2</b-col>
                <b-col>3-1</b-col>
                <b-col>3-2</b-col>
                <b-col>4-1</b-col>
                <b-col>4-2</b-col>
            </b-row>
            </b-container>
            </b-tab>
            <b-tab title="강의평가">
              Tab Contents 2
            </b-tab>
          </span>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
      msg: 'This is Main Page!',
      major: '소프트웨어학과' 
    } 
  },
  created() {
      this.$EventBus.$emit('removeTab' , true)
  }
}
</script>

<style>
.main .card .tabs{
    height: 100vh;
}
.curriculum{
    margin-top:50px;
}

.height {
    height: 3rem;
}
.nav-tabs .nav-link{
    height: 7vh;
    padding-left:20vw;
    padding-right:20vw;
    margin-top:3vh;
    margin-left:5px;
}

.card-header{
    padding-top : 2vh;
    font-size:18px;
    font-weight: bold;
}

.card-header-tabs{
    width:max-content;
}
p{
    margin-top:2vh;
    font-weight: bold;
    font-size:18px;
    text-align: center;
}
.tab-pane{
    width:100%;
}
</style>