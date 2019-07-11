<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="yogo-main">
                    <template>
                       <Nav></Nav>
                    </template>
                    <div class="yogo-count">
                        <div class="yogo-search">
                            <div class="search-left">
                                <el-select v-model="value" placeholder="瑜伽会所">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-select v-model="value2" placeholder="擅长类型">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-select v-model="value3" placeholder="工作资历">
                                    <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                            <div class="search-right">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.user" placeholder="名师姓名/会馆名称/瑜伽类型"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="text" @click="onSubmit" style="color:#2c2c2c">查询</el-button>
                                </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div class="yogo-cont-div1">
                            <h2><img src="../assets/yujia.png"/>馆内名师</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       <div class="yogo-cont-div2">
                           <div class="yogocontunt"></div>
                       </div>
                       <div class="yogo-cont-div1">
                            <h2><img src="../assets/yujia.png"/>瑜伽名师展</h2>
                            <p class="nav-text">Sometimes beauty is so simple</p>
                            <div class="border-left"></div>
                            <div class="border-right"></div>
                       </div>
                       <div class="yogo-cont-div3">
                           <div class="yogocontunt2">
                               <div class="yogocontunt2-list" v-for="(item, index) in yogolist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" @mouseenter="onMouseOver(index)" @click="selectItem(item)">
                                   <h4>{{item.text}}</h4>
                               </div>
                               <div class="block">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                                    :page-size="pagesize"
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="yogolist.length">
                                </el-pagination>
                            </div>
                           </div>
                       </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Nav from "../components/nav";
export default {
    components:{
        Nav
    },
  data() {
    return {
         formInline: {
          user: '',
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        currentPage:1,
        pagesize: 12,
        value: '',
        value2: '',
        value3: '',
        yogolist:[
            {id:1,text:'内容'},
            {id:2,text:'内容'},
            {id:3,text:'内容'},
            {id:4,text:'内容'},
            {id:5,text:'内容'},
            {id:6,text:'内容'},
            {id:7,text:'内容'},
            {id:8,text:'内容'},
            {id:9,text:'内容'},
            {id:10,text:'内容'},
            {id:11,text:'内容'},
            {id:12,text:'内容'},
            {id:13,text:'内容'},
            ],
    };
  },
  methods:{
      onSubmit() {
        console.log('submit!');
      },
      selectItem(item){
      },
      onMouseOver(index){
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      }
  }
};
</script>
<style lang="scss" scope>
.el-select-dropdown__item.selected {
    color: #8fc31f;
    font-weight: 700;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #E2DBC8;
}
.yogo-main{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .yogo-search{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        .search-left{
            line-height: 68px;
            padding-left:16px;
            .el-select{
                width: 140px;
            }
            .el-input--suffix .el-input__inner{
                background-color: #fff;
            }
        }
        .search-right{
             padding-top: 15px;
             padding-right: 10px;
             .el-input{
                 width: 333px;
             }
        }
    }
    .yogo-count{
        width: 100%;
        margin: 0 auto;
        border: 1px solid;
        height: 100%;
        display: inline-block;
        .yogo-cont-div1{
            width: 100%;
            height: 150px;
            text-align: center;
            border: 1px solid;
            position: relative;
            .border-left{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                left:22%;
                top: 45%;
            }
            .border-right{
                width: 20%;
                height: 1px;
                background-color: #dcdcdc;
                position: absolute;
                right: 22%;
                top: 45%;
            }
            .nav-text{
                color: #999999;
                font-size: 14px;
                margin-top: -8px;
            }
            h2{
                color: #2c2c2c;
                font-size: 24px;
                margin-top: 40px;
                img{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 44%;
                }
            }
        }
        .yogo-cont-div2{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            margin-top: 40px;
            .yogocontunt{
                width: 75%;
                height: 600px;
                border: 1px solid;
                margin: 0 auto;
                margin-bottom: 50px;
            }
        }
        .yogo-cont-div3{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            margin-top: 40px;
            .yogocontunt2{
                width: 75%;
                height: 100%;
                border: 1px solid;
                margin: 0 auto;
                margin-bottom: 50px;
                .yogocontunt2-list{
                    width: 262px;
                    height: 270px;
                    border:1px solid;
                    background-color: #E2DBC8;
                    margin: 10px;
                    float: left;
                }
                .block{
                    text-align: center;
                    margin: 0 auto;
                    width: 100%;
                    margin-top: 20px;
                    display: inline-block;
                    .el-pagination {
                        white-space: nowrap;
                        padding: 30px 5px;
                        color: #303133;
                        font-weight: 700;
                    }
                    .el-pagination.is-background .el-pager li:not(.disabled).active {
                        background-color: #CCE198;
                        color: #fff;
                    }
                    
                }
            }
        }
    }
}
</style>