<template>
    <!--start of nav m-card-->
    <div style="border:1px solid red;width:500px;">

       <div class="d-flex">
         <!--左边-->
          <div class="nav jc-start">
            <div class="nav-item" :class="{active:active===0}"   @click="$refs.list.swiper.slideTo(0)">
                 <div class="nav-link" >脚本生成</div>
            </div>
            <div class="nav-item" :class="{active:active===1}"  @click="$refs.list.swiper.slideTo(1)">
                 <div class="nav-link" >对象库</div>
            </div>
            <div class="nav-item" :class="{active:active===2}"  @click="$refs.list.swiper.slideTo(2)">
                 <div class="nav-link" >参数库</div>
            </div>
             <div class="nav-item" :class="{active:active===3}"  @click="$refs.list.swiper.slideTo(3)">
                 <div class="nav-link" >帮助</div>
            </div>
             <!-- <div class="nav-item" :class="{active:active===i}" v-for="(category,i) in categories" :key="i"
              @click="$refs.list.swiper.slideTo(i)" >
                <div class="nav-link" >{{category.name}}</div>
              </div> -->
          </div>
           <!--右边-->
          <div class="d-flex" >
            <div class="nav jc-end">
              <div class="nav-item" :class="{active:sub===0}"  @click="show()">
                  <div class="nav-link" >表格视图</div>
              </div>
              <div class="nav-item" :class="{active:sub===1}"  @click="$refs.jiaoben.swiper.slideTo(1)">
                  <div class="nav-link" >脚本视图</div>
              </div>
           </div> 
          
          </div>
       </div>
      
       <div class="pt-3">
          <!--ref 相当与id-->
          <swiper ref="list" :options="{autoHeight:true}"  @slide-change="() => active = $refs.list.swiper.realIndex">
            <swiper-slide >
                 <h1>脚本生成</h1>
                
                 <swiper ref="jiaoben" @slide-change="() => sub = $refs.jiaoben.swiper.realIndex">
                      <swiper-slide >脚本生成脚本生成脚本生成脚本生成脚本生成</swiper-slide>
                      <swiper-slide >脚本生1111111111成脚本生成脚本生成脚本生成脚本生成</swiper-slide>
                 </swiper>

            </swiper-slide>
            <swiper-slide >
                 <h1>对象库</h1>
                 <!-- <div class="d-flex">
                    <div class="nav jc-end">
                    <div class="nav-item"  @click="$refs.obj.swiper.slideTo(1)">
                        <div class="nav-link" >表格视图</div>
                    </div>
                    <div class="nav-item"  @click="$refs.obj.swiper.slideTo(2)">
                        <div class="nav-link" >脚本视图</div>
                    </div>
                  </div>
                 </div-->
                 <swiper ref="obj">
                      <swiper-slide >对象库11111111111111111111111111</swiper-slide>
                      <swiper-slide >对象库222222222222222222222222222</swiper-slide>
                 </swiper>
            </swiper-slide>
            <swiper-slide >
                  <h1>参数库</h1>
                  <!-- <div class="d-flex">
                    <div class="nav jc-end">
                    <div class="nav-item"  @click="$refs.canshu.swiper.slideTo(1)">
                        <div class="nav-link" >表格视图</div>
                    </div>
                    <div class="nav-item"  @click="$refs.canshu.swiper.slideTo(2)">
                        <div class="nav-link" >脚本视图</div>
                    </div>
                  </div>
                 </div>-->
                 <swiper ref="canshu">
                      <swiper-slide >参数库11111111111111111111111111</swiper-slide>
                      <swiper-slide >参数库222222222222222222222222222</swiper-slide>
                 </swiper> 
            </swiper-slide>
            <swiper-slide >
                  <h1>帮助</h1>
              
            </swiper-slide>
          </swiper>

      </div>
       


    </div>
        
   
     <!--end of nav m-card-->
</template>
<script>
export default {
    //接收参数，外面传进来
    props:{
      // title:{type:String,required:true},
      // icon:{type:String,required:true},
     // categories:{type:Array,required:true},
    },
    //局部变量
    data(){
      return {
        active:0,
        sub :0,
        categories:[
            {name:'脚本生成'},
            {name:'对象库'},
            {name:'参数库'},
            {name:'帮助'}
        ]
      }
    },
    methods : {
       show (){
         $refs.jiaoben.swiper.slideTo(0);
       }
    }



}
</script>
<style lang="scss">
    .display {
      display: block;
    }

    .right{
      .nav{
        display: none;
      }
      
    }
</style>