<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
     
       <el-form-item label="名称">
         <el-input v-model="model.name"> </el-input>
       </el-form-item>
       <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> 
       </el-form-item>
       <el-form-item>
         <el-button type="primary" native-type="submit">保存</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props:{
      id:{}
    },
    data() {
      return {
        model:{}
      }
    },
    methods:{
      afterUpload(res){
        //console.log(res);
        //显式赋值（vue提供的）
        this.$set(this.model,'icon',res.url)
       
        /**因为vue的数据绑定的一个问题，以下这种写法
         * （this.model.icon = res.url），会导致数据没办法响应式更新：这是因为model在声明的时候，没有声明子集，
         * 后面再动态添加的时候，有可能会出现这种问题，用显式赋值可以解决这个问题
         */
        
      },
      async save(){
        //let 
        let res;
        if(this.id){
          res = await this.$http.put(`rest/items/${this.id}`,this.model);
        }else{
          res = await this.$http.post('rest/items',this.model);
        }
        this.$router.push('/items/list');
        //element-ui 提供的方法
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/items/${this.id}`);
        this.model = res.data;
      }
    },
    created(){
      //id有值才执行这个方法
      this.id && this.fetch();
    }
  };
</script>
<style>

</style>
