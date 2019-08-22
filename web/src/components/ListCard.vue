<template>
    <!--start of nav m-card-->
     <m-card :title="title" :icon="icon">
        <div class="nav jc-between">
          <div class="nav-item" :class="{active:active===i}" v-for="(category,i) in categories" :key="i"
          @click="$refs.list.swiper.slideTo(i)" >
            <div class="nav-link" >{{category.name}}</div>
          </div>
        </div>
        <div class="pt-3">
          <!--ref 相当与id-->
          <swiper ref="list" :options="{autoHeight:true}"  @slide-change="() => active = $refs.list.swiper.realIndex">
            <swiper-slide v-for="(category,i) in categories" :key="i">
              <slot name="items" :category="category"></slot>
            </swiper-slide>
          </swiper>
        </div>
     </m-card>
     <!--end of nav m-card-->
</template>
<script>
export default {
    //接收参数，外面传进来
    props:{
      title:{type:String,required:true},
      icon:{type:String,required:true},
      categories:{type:Array,required:true},
    },
    //局部变量
    data(){
      return {
        active:0
      }
    }
}
</script>
<style lang="scss">

</style>