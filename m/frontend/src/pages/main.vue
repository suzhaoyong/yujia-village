<template>
  <div class="main_wrap">
    <!-- 轮播图 -->
    <div class="bg_imgs-wrap">
      <div style="background:#8FCD71; height:64px;width:100%;"></div>
      <div style="background:#8FCD71; height:64px;width:100%;border-radius: 0 0 50% 50%;"></div>
      <div class="imgs_box">
        <van-swipe :autoplay="5000" style="height:100%;" indicator-color="white">
          <van-swipe-item v-for="(item, index) in main.banner" :key="index"><img :src="item" alt="商品"></van-swipe-item>
        </van-swipe>
      </div>
      
    </div>
    <!-- tab 导航 -->
    <div class="tab-wrap">
      <div class="tab-box">
        <div href="" @click="gotoPage('train')">
          <div class="tab_pic">
            <img :src="icon.zixun" alt="图标">
          </div>
          <div class="tab_tips">资讯</div>
        </div>
      </div>
      <div class="tab-box">
        <div href="" @click="gotoPage('information')">
          <div class="tab_pic">
            <img :src="icon.zishi" alt="图标">
          </div>
          <div class="tab_tips">知识</div>
        </div>
      </div>
      <div class="tab-box">
        <div href="" @click="gotoPage('club')">
          <div class="tab_pic">
            <img :src="icon.jigou" alt="图标">
          </div>
          <div class="tab_tips">机构</div>
        </div>
      </div>
      <div class="tab-box">
        <div href="" @click="gotoPage('teacher')">
          <div class="tab_pic">
            <img :src="icon.mingshi" alt="图标">
          </div>
          <div class="tab_tips">名师</div>
        </div>
      </div>
    </div>
    <!-- 培训信息 -->
    <div class="train-wrap" id="train">
      <div class="content_title">
        <div class="lf">
          <span class="zh">培训信息</span>
          <span class="en">Famous teacher</span>
        </div>
        <div class="rh" @click="gotoPage('train')">
          <span class="more">更多 ></span>
        </div>
      </div>
      <div class="content_box">
        <div class="train" @click="viewTrain(item)" v-for="(item, index) in main.hot" :key="index">
          <div class="pic">
            <img :src="item.cover" alt="培训信息">
          </div>
          <div class="info">
            <div class="title"><span class="tag">{{item.type}}</span> <span class="des">{{item.theme}}</span></div>
            <div class="address_time">
              <div class="address">{{item.custom_address}}</div>
              <div class="time">{{item.startTime}} / {{item.endTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 名师信息 -->
    <div class="teacher-wrap" id="teacher">
      <div class="content_title">
        <div class="lf">
          <span class="zh">瑜伽名师</span>
          <span class="en">Famous teacher</span>
        </div>
        <div class="rh" @click="gotoPage('teacher')">
          <span class="more">更多 ></span>
        </div>
      </div>
      <div class="content_box">
        <div class="info" @click="viewTeacher(item)" v-for="(item, index) in main.teachers" :key="index">
          <div class="pic">
            <img :src="item.first_img" alt="名师">
          </div>
          <div class="name_en">{{item.name}}</div>
          <div class="name_zh" v-if="false">{{item.info}}</div>
        </div>
      </div>
    </div>
    <!-- 机构推荐 -->
    <div class="club-wrap" id="club">
      <div class="content_title">
        <div class="lf">
          <span class="zh">机构推荐</span>
          <span class="en">Training Information</span>
        </div>
        <div class="rh" @click="gotoPage('club')">
          <span class="more">更多 ></span>
        </div>
      </div>
      <div class="content_box">
        <div class="club" @click="viewClub(item)" v-for="(item, index) in main.clubs" :key="index">
          <div class="club_pic">
            <img :src="item.logo" alt="机构">
          </div>
          <div class="name">{{item.club_name}}</div>
          <div class="address">{{item.custom_address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { getMainDetail } from '@/api/main.js'
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      icon: {
        zixun: require('@/assets/img/zixun.png'),
        zishi: require('@/assets/img/zishi.png'),
        jigou: require('@/assets/img/jigou.png'),
        mingshi: require('@/assets/img/mingshi.png'),
      },
      main: {
        banner: [],
        hot: [],
        teachers: [],
        clubs: []
      },
    }
  },
  mounted() {
    getMainDetail().then(response => {
      this.main = response
    })
  },
  methods: {
    gotoPage(type) {
      const path = {
        train: '/yagainformation',
        information: '/yogaknowledge',
        teacher: '/teacherClub/list?current=1',
        club: '/teacherClub/list?current=0',
      }
      path[type] && this.$router.push(path[type])
    },
    viewClub(item) {
      this.$router.push(`/teacherClub/clubhouseDetails?id=${item.id}`)
    },
    viewTeacher(item) {
      this.$router.push(`/teacherClub/teacherDetails?id=${item.id}`)
    },
    viewTrain(item) {
      this.$router.push(`/messagedetail/${item.id}`)
    } 
  }
}
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #2c2c2c;
}
img{
  width: 100%;
  height: 100%;
}
  .main_wrap{
    background: #fff;
    padding-bottom: 20px;
    .bg_imgs-wrap{
      .imgs_box{
        margin: 0 auto;
        margin-top: -64PX;
        width: 344px;
        height: 160px;
        border-radius: 10px;
        overflow: hidden;
        background: #e5e5e5;
        img{
          border-radius: 10px;
        }
      }
    }
    .tab-wrap{
      padding-top: 20px;
      margin: 0 auto;
      width: 340px;
      display: flex;
      justify-content: space-between;
      .tab-box{
        div{
          .tab_pic{
            width: 44px;
            height: 44px;
            // background: #e5e5e5;
          }
          .tab_tips{
            padding-top: 10px;
            text-align: center;
          }
        }
      }
    }
    .train-wrap, .teacher-wrap, .club-wrap{
      margin: 0 auto;
      padding-top: 30px;
      width: 340px;
      .content_title{
        display: flex;
        justify-content: space-between;
        .lf{
          .zh{
            position: relative;
            font-size: 16px;
            padding-left: 10px;
            &::before{
              content:'';
              display: block;
              position: absolute;
              left: 0px;
              top: 0;
              width: 5px;
              height: 100%;
              background: #72BC46;
            }
          }
          .en{
            margin-left: 15px;
            font-size: 10px;
          }
        }
        .rh{
          .more{
            display: flex;
            justify-content: center;
            color: #638C0B;
          }
        }
      }
    }
    .train-wrap{
      margin: 0 auto;
      padding-top: 30px;
      width: 340px;
      .content_box{
        .train{
          padding-top: 10px;
          display: flex;
          justify-content: space-between;
          .pic{
            flex-shrink: 0;
            width: 140px;
            height: 90px;
            background: #e5e5e5;
            border-radius: 4px;
            overflow: hidden;
          }
          .info{
            flex-grow: 1;
            padding-left: 25px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title{
              padding-top: 6px;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              .tag{
                background: #8FCD71;
                color:#fff;
                font-size: 10px;
                margin: 0 2px;
                margin-top: -2px;
                display: inline-block;
                padding: 0px 8px;
                border-radius: 10px;
              }
              .des{
                font-size: 13px;
                font-weight: 800;
              }
            }
            .address_time{
              font-size: 10px;
              .address{
                color:#999;
                font-size: 10px;
                margin-bottom: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              .time{
                color:#999;
                font-size: 10px;
              }
            }
          }
        }

      }
    }
    .teacher-wrap{
      .content_box{
        display: flex;
        flex-wrap: wrap;
        .info{
          padding-top: 16px;
          margin-right: 8px;
          width: 78px;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .pic{
            width: 78px;
            height: 78px;
            border-radius: 50%;
            overflow: hidden;
            background: #e5e5e5;
          }
          .name_en{
            font-size: 10PX;
            padding-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .name_zh{
            padding-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .club-wrap{
      .content_box{
        display: flex;
        flex-wrap: wrap;
        .club{
          padding-top: 10px;
          padding-bottom: 10px;
          width: 166px;
          &:nth-child(even){
            margin-left: 6px;
          }
          .club_pic{
            width: 166px;
            height: 122px;
            // background: #e5e5e5;
            overflow: hidden;
            border-radius: 4px;
          }
          .name{
            padding-top: 14px;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .address{
            color:#999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
</style>