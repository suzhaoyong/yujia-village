<template>
<div>
  <Header></Header>
  <div class="information">
    <div class="information-banner">
      <img :src="classifyLists.banner" />
    </div>
    <div class="information-nav">
      <ul class="information-nav-list">
        <li 
          v-for="(list, index) in classifyLists.classify" 
          :key="list.id"
          @click="changestyle(list.id, index)"
          :class="{'active':spanIndex == index}"
        >
          <img :src="list.img"><p>{{ list.classify }}</p>
        </li>
      </ul>
    </div>
    <main class="information-main">
      <div class="watefullbox" ref="box">
          <div class="information-main-count" v-for="(list, index) in informationLists" :key="index" @click="viewdetail(list.id)">
            <div class="information-main-count-img"><img :src="list.icon_url"></div>
            <div class="information-main-count-text">
              <p>{{ list.headline }}</p>
              <div>
                <span>{{ list.type }}</span>
                <span><img src="../../../static/img/eye.png" class="eyeimg"><span>{{ list.views }}</span></span>
              </div>
            </div>
          </div>
          

        <!-- <div class="information-main-count" v-for="list in informationLists" :key="list.id" ref="box1" @click="viewdetail(list.id)">
          <div class="information-main-count-img"><img :src="list.icon_url"></div>
          <div class="information-main-count-text">
            <p>{{ list.headline }}</p>
            <div>
              <span>{{ list.type }}</span>
              <span><img src="../../../static/img/eye.png" class="eyeimg"><span>{{ list.views }}</span></span>
            </div>
          </div>
        </div> -->
      </div>
      <div class="morebtn">
        <van-button round color="#7BBB62" type="primary" size="large" @click="loadmore">查看更多</van-button>
      </div>
    </main>
  </div>
  <Footer></Footer>
</div>

</template>
<script>
import Vue from 'vue';
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Button, Toast } from 'vant';

Vue.use(Button).use(Toast);
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      classifyLists: [],
      typeid: 0,
      typepage: 1,
      informationLists: [],
      spanIndex: 0,
      imgsArr: [],
      group: 0, // request param
      classifyImg: [
        {
          img: require('../../../static/img/mationclassfiy/recommend.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/all.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/mation.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/news.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/star.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/hot.png')
        },
      ]
    }
  },
  mounted () {
  },
  created() {
    this.InformationClassify()
    this.mationdata()
    
  },
  methods: {
    viewdetail (id) {
      this.$router.push('/informationdetail/' + id)
    },
    // li选中变色
    changestyle (id, index) {
      this.spanIndex = index
      this.typeid = id
      this.typepage = 1
      this.informationLists = []
      this.mationdata()
    },
    InformationClassify () {
      this.$request.get('InformationClassify').then((res) => {
        console.log(res)
        this.classifyLists = res
        // 将本地图片加入到data数组中
        this.classifyLists.classify.map((list, index) => {
          return list.img = this.classifyImg[index].img
        })
      })
    },
    // 加载更多
  loadmore () {
    this.typepage++
    this.mationdata()
  },
  mationdata(){
  let _this = this;
  this.$request(`/informationList/${_this.typeid}?page=${_this.typepage}`).then(res => {
    console.log(res)
    res.data.map((item) => {
      _this.informationLists.push(item)
    })
    if(res.current_page >= res.last_page) {
      Toast('没有了哦')
      _this.typepage = res.last_page
    }
  })
  .catch(error => {
      // let { response: { data: { errorCode, msg } } } = error;
      // if (errorCode != 0) {
      // this.$message({
      //     message: msg,
      //     type: "error"
      // });
      // return;
      // }
  });
},
  }
}
</script>
<style lang="scss" scoped>
html body {width: 100%; height: 100%;}
.active {
  color: #7BBB62;
}
.information {
  height: 530px;
  width: 100%;
  margin-top: 88px;
  &-banner {
    width: 100%;
    height: 170px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-nav {
    width: 100%;
    height: 49px;
    &-list::-webkit-scrollbar{
    display: none;
    }
    &-list {
      width: 100%;
      height: 49px;
      display: flex;
      overflow: auto;
      li {
        white-space: nowrap;
        height: 42px;
        text-align: center;
        font-size: 12px;
        margin-right: 30px;
        margin-left: 10px;
        img {
          width: 22px;
          height: 22px;
          margin-top: 5px;
        }
      }
    }
  }
  &-main {
    width: 100%;
    height: auto;
    .watefullbox {
      -moz-column-count:2; /* Firefox */
      -webkit-column-count:2; /* Safari 和 Chrome */
      column-count:2;
      -moz-column-gap: 10px;
      -webkit-column-gap: 10px;
      column-gap: 10px;
      padding: 12px;
      height: auto;
      margin-bottom: 50px;
      .information-main-count {
          padding: 6px;
          margin: 0 0 10px 0;
          -moz-page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
          break-inside: avoid;
        &-img {
          width: 100%;
          box-shadow: 0 0 5px #ccc;
        }
        &-text {
          height: 62px;
          padding: 0 8px;
          background: white;
          p {
            font-size: 16px;
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            .eyeimg {
              width: 15px;
              height: 11px;
            }
            span {
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }
    .morebtn {
      margin-bottom: 50px;
      position: relative;
      bottom: 1%;
      .van-button {
        height: 44px;
      }
    }
  }
}
</style>