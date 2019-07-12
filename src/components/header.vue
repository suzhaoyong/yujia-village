<template>
    <div>
        <el-col :span="24">
            <div class="header-main">
                <div class="head-quan">
                    <div class="head-left"><img src="../assets/logo.png"/></div>
                    <div class="head-right">
                        <span class="span1">已购课程</span>
                        <span class="span1">登录</span>
                        <span class="span1">注册</span>
                        <span><img class="img" src="../assets/cart.png"/></span>
                    </div>
                </div>
                <div class="head">
                    <el-col :span="24">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="main">首页</el-menu-item>
                    <el-menu-item index="joinclubhouse">加盟会馆</el-menu-item>
                    <el-menu-item index="yogoteacher">瑜伽名师</el-menu-item>
                    <el-menu-item index="home">培训信息</el-menu-item>
                    <el-menu-item index="home">瑜伽知识</el-menu-item>
                    <el-menu-item index="home">瑜伽资讯</el-menu-item>
                    <el-menu-item index="home">商城</el-menu-item>
                    <el-menu-item index="home">关于我们</el-menu-item>
                    <el-menu-item index="home">个人中心</el-menu-item> 
                    </el-menu>

                    <!-- <el-menu :default-active="$router.path" class="el-menu-demo" router mode="horizontal" @select="handleSelect">
                        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                         {{ item.navItem }}
                        </el-menu-item>
                    </el-menu> -->
                    </el-col>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
  data() {
    return {
        activeIndex:"main",
        //  navList:[
        //     {name:'/main',navItem:'首页'},
        //     {name:'/joinclubhouse',navItem:'加盟会馆'},
        //     {name:'/home/main',navItem:'瑜伽名师'},
        //     {name:'/home/main',navItem:'培训信息'},
        //     {name:'/home/main',navItem:'瑜伽知识'},
        //     {name:'/home/main',navItem:'瑜伽资讯'},
        //     {name:'/home/main',navItem:'商城'},
        //     {name:'/home/main',navItem:'关于我们'},
        //     {name:'/home/main',navItem:'个人中心'},
        //     ]
    };
  },
  watch:{
      "$route":"fetchData"
  },
  mounted(){
      this.changenav();
  },
  created(){
      this.fetchData();
  },
  beforeUpdate(){
       this.changenav();
  },
  methods: {
      //路由改变时的导航对应高亮
      changenav(){
          let path = this.$route.path;
          let endIndex = path.lastIndexOf('\/');
          let currNav = path.substring(endIndex+1,path.length);
          this.activeIndex = currNav;
      },
      fetchData(){
          if(this.$route.name == 'main'){
              this.activeIndex = 'main';
          }else if(this.$route.name == 'joinclubhouse'){
              this.activeIndex = 'joinclubhouse';
          }else if(this.$route.name == 'yogoteacher'){
              this.activeIndex = 'yogoteacher';
          }
      },
      handleSelect(key, keyPath) {
          if('main' === key){
              this.$router.push('/main');
          }else if('joinclubhouse' === key){
              this.$router.push('/joinclubhouse');
          }else if('yogoteacher' === key){
              this.$router.push('/yogoteacher');
          }
      }
    }
};
</script>
<style lang="scss" scoped>
.el-menu{
    width: 60%;
    margin: 0 auto;
    background: #E8F5DB;
    height:99px;
}
.el-menu.el-menu--horizontal {
    border-bottom: solid 1px #E8F5DB;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 1px solid #E8F5DB;
    color: #2c2c2c;
    text-align: center;
    margin: 0 auto;
    font-weight: bold;
    height: 100px;
    background: #fff;
}
.el-menu-item {
    height: 100px;
    font-size: 16px;
    color: #2c2c2c;
    padding: 0 20px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.el-menu--horizontal>.el-menu-item {
    float: left;
    height: 100px;
    line-height: 100px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #2c2c2c;
}
.el-menu-item.is-active {
    color: #2c2c2c;
}
.header-main{
    width: 100%;
    height: 100%;
    padding: 0;
    .head-quan{
        height: 60px;
        display: flex;
        background: #FCFBF1;
        .head-left{
            width: 50%;
            text-align: center;
            margin-top: 8px;
            img{
                width: 163px;
                height: 40px;
                margin-left: -20%;
            }
        }
        .head-right{
            width: 50%;
             text-align: center;
             margin-top: 18px;
             position: relative;
            .img{
                width: 30px;
                height: 28px;
                display: inline-block;
                position: absolute;
                top: -4px;
                right: 32%;
            }
            .span1{
                padding-right: 17px;
                color: #2c2c2c;
            }
        }
    }
    .head{
       height: 100px;
       background: #E8F5DB;
    }
}
</style>

