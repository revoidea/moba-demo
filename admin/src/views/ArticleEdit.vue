<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
       <el-form-item label="所属分类">
         <el-select v-model="model.categories" multiple >
           <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="标题">
         <el-input v-model="model.title"> </el-input>
       </el-form-item>
      <el-form-item label="详情">
         <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" native-type="submit">保存</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { VueEditor } from "vue2-editor";//{xxx} 结构化的写法，表示只取‘vue2-editor’里的VueEditor

  export default {
    props:{
      id:{}
    },
    components: {
      VueEditor
    },
    data() {
      return {
        model:{},
        categories:[]
      }
    },
    methods:{
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    
        const formData = new FormData();//一个类，是html的一个类，提交表单数据时
        formData.append("file", file);
        const res= await this.$http.post('upload',formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();

      },
     async save(){
        //let 
        let res;
        if(this.id){
          res = await this.$http.put(`rest/articles/${this.id}`,this.model);
        }else{
          res = await this.$http.post('rest/articles',this.model);
        }
        this.$router.push('/articles/list');
        //element-ui 提供的方法
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/articles/${this.id}`);
        this.model = res.data;
      },
      async fetchCategories(){
        const res = await this.$http.get('rest/categories');
        this.categories = res.data;
      }
    },

    created(){
      this.fetchCategories();
      //id有值才执行这个方法
      this.id && this.fetch();
    }
  };
</script>
