
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
          <div class="py-2" v-for="(news,i) in category.newsList" :key="i">
            <span>{{news.categoryName}}</span>
            <span>|</span>
            <span>{{news.title}}</span>
            <span>{{news.date}}</span>
          </div>
       </template>
      
     </m-list-card>
  </div>

</template>
<script>
export default {
   data (){
     return {
        swiperOption: {
          pagination: {
            el: '.pagination-home'
          }
        },
        newCats:[
          {
            name:'热门',
            newsList:new Array(5).fill({}).map(v => ({
                //表示把该对象重复5遍，fill:填充
                categoryName:'热门',
                title:'审判系统信誉经验恢复速率调整公告',
                date:'06/10'
            }))
          },
          {
            name:'新闻',
            newsList:new Array(5).fill({}).map(v => ({
                //表示把该对象重复5遍，fill:填充
                categoryName:'新闻',
                title:'审判系统信誉经验恢复速率调整公告',
                date:'06/10'
            }))
          },
          {
            name:'公告',
            newsList:new Array(5).fill({}).map(v => ({
                //表示把该对象重复5遍，fill:填充
                categoryName:'公告',
                title:'审判系统信誉经验恢复速率调整公告',
                date:'06/10'
            }))
          },
          {
            name:'活动',
            newsList:new Array(5).fill({}).map(v => ({
                //表示把该对象重复5遍，fill:填充
                categoryName:'活动',
                title:'审判系统信誉经验恢复速率调整公告',
                date:'06/10'
            }))
          },
          {
            name:'赛事',
            newsList:new Array(5).fill({}).map(v => ({
                //表示把该对象重复5遍，fill:填充
                categoryName:'赛事',
                title:'审判系统信誉经验恢复速率调整公告',
                date:'06/10'
            }))
          },

        ]
     }
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