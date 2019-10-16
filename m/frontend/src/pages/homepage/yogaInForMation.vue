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
    </main>
  </div>
  <Footer></Footer>
</div>

</template>
<script>
import Header from '../../components/header'
import Footer from '../../components/footer'
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      classifyLists: [],
      informationLists: [],
      spanIndex: 0,
      imgsArr: [],
      group: 0, // request param
      classifyImg: [
        {
          img: require('../../../static/img/mationclassfiy/recommend.png')
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
    this.informationList()
  },
  methods: {
    viewdetail (id) {
      this.$router.push({
        name: 'informationdetail',
        params: {
          id
        }
      })
    },
    // li选中变色
    changestyle (id, index) {
      this.spanIndex = index
      console.log(id)
      this.informationList(id)
    },
    InformationClassify () {
      this.$request.get('InformationClassify').then((res) => {
        this.classifyLists = res
        // 将本地图片加入到data数组中
        this.classifyLists.classify.map((list, index) => {
          return list.img = this.classifyImg[index].img
        })
      })
    },
    informationList (id = 0) {
      this.$request.get('informationList/'+ id).then((res) => {
        console.log(res)
        this.informationLists = res.data
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.active {
  color: #7BBB62;
}
.information {
  height: 530px;
  width: 100%;
  overflow: auto;
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
    &-list {
      height: 49px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        height: 42px;
        text-align: center;
        font-size: 12px;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  &-main {
    width: 100%;
    height: auto;
    .watefullbox {
      // width: 335px;
      // height: auto;
      // position: relative;
      // margin: 8px auto;
      -moz-column-count:2; /* Firefox */
      -webkit-column-count:2; /* Safari 和 Chrome */
      column-count:2;
      -moz-column-gap: 10px;
      -webkit-column-gap: 10px;
      column-gap: 10px;
      padding: 12px;
      .information-main-count {
        // width: 159px;
        // margin: 4px;
        // height: auto;
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
  }
}
</style>