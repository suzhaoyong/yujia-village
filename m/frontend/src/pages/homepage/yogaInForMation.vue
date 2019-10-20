<template>
<div class="mymation">
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
      </div>
      <div class="morebtn" @click="loadmore">
        {{  current_page >= last_page? informationLists.length > 0? "我也是有底线的": "没有这个哦！" : "点我加载更多"}}
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
import { setInterval } from 'timers';

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
      informationLists: [],
      spanIndex: 0,
      current_page: 1,
      last_page: 2,
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
    this.PullUpReload()
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
      this.current_page = 1
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
    // 上拉加载
    PullUpReload () {
      var _this = this
      var isScroll = false  // 函数截流
      document.querySelector('.information').onscroll = function() {
      if (isScroll) {
        setTimeout(() => {
          isScroll = false
        },100)
      } else {
        let innerHeight = document.querySelector('.information').clientHeight // 容器高度
        let outerHeight = document.querySelector('.watefullbox').clientHeight // 容器高+滚动高
        let scrollTop = document.querySelector('.information').scrollTop  // 滚动高
        if (innerHeight + scrollTop >= outerHeight + 219) {
          _this.current_page > _this.last_page? '': _this.current_page++
          _this.mationdata()
        }
        isScroll = true
      }
      }
    },
    // 加载更多
  loadmore () {
    this.current_page > this.last_page? '': this.current_page++
    console.log(this.current_page, this.last_page)
    this.mationdata()
  },
  mationdata(){
  let _this = this;
  this.$request(`/informationList/${_this.typeid}?page=${_this.current_page}`).then(res => {
    res.data.map((item) => {
      _this.informationLists.push(item)
    })
    _this.current_page = res.current_page
    _this.last_page = res.last_page
    if(_this.current_page > _this.last_page) {
      _this.current_page = res.last_page
      console.log()
      Toast('没有更多了哦')
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
html body {
  width: 100%; 
  height: 100%;
}
.active {
  color: #7BBB62;
}
.mymation {
  height: 100%;
  display: flex;
}
.information {
  flex: 1;
  width: 100%;
  margin-top: 88px;
  overflow: auto;
  margin-bottom: 50px;
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
      -moz-column-gap: 12px;
      -webkit-column-gap: 12px;
      column-gap: 12px;
      padding: 12px;
      height: auto;
      .information-main-count {
        padding: 0 0 12px 0;
        -moz-page-break-inside: avoid;
        -webkit-column-break-inside: avoid;
        break-inside: avoid;
        &-img {
          width: 100%;
          background: white;
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
      width: 100%;
      height: 25px;
      text-align: center;
      font-size: 12px;
      color: #999999;
      line-height: 25px;
    //   .van-button {
    //     height: 44px;
    //   }
    }
  }
}
</style>