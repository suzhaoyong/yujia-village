<template>
  <div class="information">
    <div class="information-banner">
      <img :src="classifyLists.banner" />
    </div>
    <div class="information-nav">
      <ul class="information-nav-list">
        <li v-for="list in classifyLists.classify" :key="list.id">
          <img :src="list.img"><p>{{ list.classify }}</p>
        </li>
      </ul>
    </div>
    <main class="information-main">
      <div class="watefullbox">

        <div class="information-main-count" v-for="list in informationLists" :key="list.id" ref="box1" @click="viewdetail(list.id)">
          <div class="information-main-count-img"><img :src="list.icon_url"></div>
          <div class="information-main-count-text">
            <p>{{ list.headline }}</p>
            <div>
              <span>{{ list.type }}</span>
              <span><span>tubiao</span><span>{{ list.views }}</span></span>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      classifyLists: [],
      informationLists: [],
      classifyImg: [
        {
          img: require('../../static/img/mationclassfiy/recommend.png')
        },
        {
          img: require('../../static/img/mationclassfiy/mation.png')
        },
        {
          img: require('../../static/img/mationclassfiy/news.png')
        },
        {
          img: require('../../static/img/mationclassfiy/star.png')
        },
        {
          img: require('../../static/img/mationclassfiy/hot.png')
        },
      ]
    }
  },
  mounted () {
   
  },
  created() {
    this.InformationClassify(),
    this.informationList()
  },
  methods: {
    viewdetail (id) {
      this.$router.push({
        path: '/informationdetail',
        name: 'informationdetail',
        params: {
          id: id
        }
      })
    },
    InformationClassify () {
      console.log(this.$refs.box1)
      this.$request.get('InformationClassify').then((res) => {
        this.classifyLists = res
        // 将本地图片加入到data数组中
        this.classifyLists.classify.map((list, index) => {
          return list.img = this.classifyImg[index].img
        })
      })
    },
    informationList () {
      this.$request.get('informationList/'+ 1).then((res) => {
        console.log(res)
        this.informationLists = res.data
        console.log(this.informationLists)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.information {
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
    .watefullbox {
      width: 335px;
      position: relative;
      margin: 8px auto;
      .information-main-count {
        width: 159px;
        border: 1px solid black;
        margin: 4px;
        height: auto;
        float: left;
        &-img {
          width: 100%;
          height: auto;
          box-shadow: 0 0 5px #ccc;
          .bigimg {
            height: 200px;
          }
        }
        &-text {
          height: 62px;
          padding: 0 8px;
          p {
            font-size: 16px;
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            display: flex;
            justify-content: space-between;
            span {
              font-size: 12px;
              color: #6d3d3d
            }
          }
        }
      }
    }
  }
}
</style>