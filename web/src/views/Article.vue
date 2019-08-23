<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
     <div class="iconfont icon-back text-blue"></div>
     <strong class="flex-1 text-ellipsis text-blue px-2">
       {{model.title}}
     </strong>
     <div class="text-grey fs-xs">
       {{model.createdAt | date}}
     </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-lianjie_icon"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
         class="py-1 d-flex"
         tag="div"
         :to="`/articles/${item._id}`"
         v-for="item in model.related" :key="item._id">
         <span class="flex-1 text-ellipsis pr-2">{{item.title}}</span> 
         <span class="text-grey fs-sm">{{item.createdAt |date}}</span>
        </router-link>
      </div>
    </div>
    
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  filters:{
     date(val){
       return dayjs(val).format('YYYY-MM-DD')
     }
  },
  props:{
    id:{required:true}
  },
  data(){
    return {
      model:null
    }
  },
  watch:{
    //监听什么数据重新去获取(fetch)
    //监听id
    id:'fetch',//简写
    
    // id(){
    //   this.fetch()
    // }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    } 
  },
  created(){
    this.fetch()
  }
}
</script>
<style lang="scss">
.page-article {
  .body{
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>