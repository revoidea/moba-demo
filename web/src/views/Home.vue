
<template>
  <div>
    <!--swiper of start-->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/0b399d7b8cb8e6b3e7fd329a1b4e5314.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/03cf1a715e1d612c0d62961410554a2c.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/d01a1ed063fb9698c18c04c628d85b5c.jpeg"/>
      </swiper-slide>
       <div class="swiper-pagination pagination-home text-right px-3 pb-2"  slot="pagination"></div>
    </swiper>
     <!--swiper of end-->
     <!--start of nav icons-->
     <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
       <div class="d-flex flex-wrap">
          <div class="nav-item mb-3" v-for="n in 10" :key="n">
            <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div>
          </div>
       </div>
       <div class="bg-light py-2 fs-sm">
         <i class="sprite sprite-arrow mr-1"></i>
         <span>收起</span>
       </div>
     </div>
     <!--end of nav icons-->

   
     <m-list-card title="新闻资讯" icon="cc-menu-circle" :categories="newCats">
       <template #items="{category}">
          <div class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
            <span class="text-info">{{news.categoryName}}</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-grey fs-sm">{{news.createdAt | date}}</span>
          </div>
       </template>
     </m-list-card>

     <m-list-card title="英雄列表" icon="heroku" :categories="heroCats">
       <template #items="{category}">
          <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
            <div class="p-2 text-center" style="width:20%;" v-for="(hero,i) in category.heroList" :key="i">
              <img :src="hero.avatar" alt=""  class="w-100"/>
              <div>{{hero.name}}</div>
            </div>
          </div>
       </template>
     </m-list-card>
  </div>

</template>
<script>
import dayjs from "dayjs"
export default {
   
   //过滤器
   filters:{
     date(val){
       return dayjs(val).format('MM/DD')
     }
   },
   data (){
     return {
        swiperOption: {
          pagination: {
            el: '.pagination-home'
          }
        },
        newCats:[],
        heroCats:[]
     }
   },
   methods:{
     async fetchNewsCats(){
       const res = await this.$http.get('news/list')
       this.newCats = res.data
     },
     async fetchHeroCats(){
       const res = await this.$http.get('heroes/list')
       this.heroCats = res.data
     }
   },
   created(){
     //进来页面之后做什么事
     this.fetchNewsCats();
     this.fetchHeroCats();
   }

}
</script>
<style lang="scss">
@import '../assets/scss/variables';

.pagination-home {
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors,'white');
    &.swiper-pagination-bullet-active{
      background: map-get($colors,'info');
    }
  }
}

.nav-icons {
  border-top:1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n){//用序号或者倍数
      border-right: none;
    }
  }
}

</style>