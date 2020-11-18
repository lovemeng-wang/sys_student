<template>
  <div class="home">
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item in imgs" :key="item">
        <h3 class="medium">
          <img :src="item" alt="" width="100%" />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imgs: [
        "https://uploadstatic.mihoyo.com/contentweb/20200113/2020011311461397057.jpg",
        "https://uploadstatic.mihoyo.com/contentweb/20200113/2020011311462187517.jpg",
        "https://uploadstatic.mihoyo.com/contentweb/20200113/2020011311463354982.jpg",
        "https://uploadstatic.mihoyo.com/contentweb/20200113/2020011311473147933.jpg",
        "https://uploadstatic.mihoyo.com/contentweb/20200113/2020011311494677355.jpg",
      ],
    };
  },
};
</script>

<style>

</style>