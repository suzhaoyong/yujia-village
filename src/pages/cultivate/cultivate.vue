<template>
  <div style="padding-bottom:5rem;background:#F4F4F4;">
    <el-row>
      <el-col :span="24">
        <div class="cultivate-main">
          <template>
            <div class="bg_img2" v-if="cationbanner.length > 0">
                <el-carousel :height="bannerHeight+'px'" :interval="3000" arrow="hover" trigger="click" direction="horizontal" :autoplay="true">
                    <el-carousel-item v-for="(item,index) in cationbanner" :key="index">
                        <img :src="item.path" alt @click="cationclick(item)"/>
                        <div class="advertisement">广告</div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="bg_img" v-else>
                <img :src="banner" alt />
            </div>
          </template>
          <keep-alive>
          <div class="cultivate-count">
            <div class="cultivate-count-div1">
              <div class="cultivate1">
                <div class="cultivate1-one">
                  <span class="span">时间：</span>
                  <div type="text" class="butt" @click="removeTag('time')">全部</div>
                  <el-date-picker
                    v-model="time.range"
                    @change="changeTime"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
                <div class="cultivate1-two">
                  <span class="span">价格：</span>
                  <div type="text" class="butt" @click="removeTag('price')">全部</div>
                  <div class="button-price">
                    <div
                      type="text"
                      :class="isTagActive(item)"
                      v-for="item in priceList"
                      :key="item.name"
                      @click="selected(item)"
                    >{{item.name}}</div>
                    <el-input
                      v-model.lazy="priceInput.value.minPrice"
                      @change="priceChange('minPrice')"
                      placeholder="请输入金额"
                      class="price-input1"
                    ></el-input>—
                    <el-input
                      v-model.lazy="priceInput.value.maxPrice"
                      @change="priceChange('maxPrice')"
                      placeholder="请输入金额"
                      class="price-input2"
                    ></el-input>
                  </div>
                </div>
                <div class="cultivate1-three">
                  <span class="span">地区：</span>
                  <div type="text" class="butt" @click="removeTag('area')">全部</div>
                  <v-distpicker
                    :province="selectArea.province"
                    :city="selectArea.city"
                    :area="selectArea.area"
                    @selected="onSelected"
                  ></v-distpicker>
                </div>
                <div class="cultivate1-four">
                  <span class="span">难度：</span>
                  <div type="text" class="butt" @click="removeTag('diff')">全部</div>
                  <div class="button-text">
                    <div
                      type="text"
                      :class="isTagActive(item)"
                      v-for="item in wpList"
                      :key="item.name"
                      @click="selected(item)"
                    >{{item.name}}</div>
                  </div>
                </div>
                <div class="cultivate1-five" style="padding-top: 0.6rem;">
                  <span class="span">类别：</span>
                  <div type="text" class="butt" @click="removeTag('classfiy')">全部</div>
                  <div class="button-classfiy">
                    <div
                      type="text"
                      :class="isTagActive(item)"
                      v-for="item in classfiy"
                      :key="item.name"
                      @click="selected(item)"
                    >{{item.name}}</div>
                  </div>
                  <div class="more" v-if="moreClassfiy.length>0">
                    <div class="dropdown show">
                      <a
                        class="btn dropdown-toggle"
                        style="color: #7F8F58;"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >更多</a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a
                          v-for="(item, index) in moreClassfiy"
                          class="dropdown-item"
                          :key="index"
                          :class="['dropdown-item', {'active': false}]"
                        >{{item.name}}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cultivate1-six">
                  <span class="span">已选：</span>
                  <el-tag
                    color="#EFF5DE"
                    
                    v-for="tag in selectTags"
                    :key="tag.name"
                    closable
                    @close="handleClose(tag)"
                    :type="tag.type"
                    class="tag"
                  >{{tag.name}}</el-tag>
                  <el-button v-show="selectTags.length>0" 
                    @click="searchResult" class="search">搜索</el-button>
                </div>
              </div>
              <div class="fruit">
                <span :class="resultFw ? 'fw':'fw' ">找到下列结果</span>
                <span class="fruit-item" :class="defaultFw ? 'fw':'' " @click="defaultRank('default')">默认排序</span>
                <span class="fruit-item" :class="hostFw ? 'fw':'' " @click="hostRank('host')">热度</span>
                <span class="fruit-item" :class="priceFW ? 'fw':'' " @click="priceRank('price')">价格</span>
                <span>
                  <span v-if="priceFlag === ''" class="el-icon-sort"></span>
                  <div v-else style="display:inline-block;">
                    <span v-show="priceFlag" style="margin-top: -0.4rem;" class="trigon-top el-icon-sort-down"></span>
                    <span v-show="!priceFlag"  style="margin-top: -0.2rem;" class="trigon-bottom el-icon-sort-up"></span>
                  </div>
                </span>
              </div>
              <div class="fruit-list">
                <div
                  class="fruit-list-li"
                  v-for="(item,index) in fruit"
                  :key="index"
                >
                  <div>
                    <div class="fruit-list-li-img" :style="`backgroundImage: url(${item.teacher_img})`"  @click="selectItem(item)" >
                      <!-- <img :src="item.teacher_img" /> -->
                    </div>
                    <div class="fruit-list-li-text"  @click="selectItem(item)">
                      <a :href='`/cultivate/detail/${item.id}`' onclick="return false;" style="color:#2c2c2c;text-decoration:none">
                      <div>{{item.theme}}</div>
                      </a>
                    </div>
                    <div class="fruit-list-li-text2">
                      <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="item.diff"></el-rate>
                      <div class="fruit-price">￥{{item.price}}</div>
                    </div>
                    <div class="fruit-detail">{{item.address}}</div>
                  </div>
                  <div class="list-eye">
                    <a class="eye" href="javascript:;" :title="'点击率:'+(item.views||100)"></a>
                    <span class="span">{{item.views||100}}</span>
                    <span class="hand">
                      <a class="hd" href="javascript:;" :title="'想学:'+(item.follow||100)"></a>
                      <span>{{item.follow||100}}</span>
                    </span>
                    <a :href="`/cultivate/detail/${item.id}`" onclick="return false;">
                      <span class="study" @click="study(item.id)">我想学</span>
                    </a>
                  </div>
                </div>
                <not-found v-if="fruit.length === 0" type="not-fond" msg="暂无相关信息"></not-found>
              </div>
              <div class="pages">
                <el-pagination
                  background
                  :hide-on-single-page="true"
                  layout="total,prev, pager, next, jumper"
                  :page-size="per_page"
                  @current-change="changePage"
                  :current-page="current_page"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
            <session-title name="热门课程" brief="Sometimes beauty is so simple"></session-title>
            <div class="cultivate-count-div3">
              <div
                class="fruit-list-li"
                v-for="(item,index) in fruitclasslist"
                :key="index">
                <div>
                  <div class="fruit-list-li-img" :style="`backgroundImage: url(${item.teacher_img})`" @click="selectItem(item)">
                  <!-- <img :src="item.teacher_img" /> -->
                  </div>
                  <div class="fruit-list-li-text" @click="selectItem(item)">
                    <a :href='`/cultivate/detail/${item.id}`' onclick="return false;" style="color:#2c2c2c;text-decoration:none">
                    <div>{{item.theme}}</div>
                    </a>
                  </div>
                  <div class="fruit-list-li-text2">
                    <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="item.diff"></el-rate>
                    <div class="fruit-price">￥{{item.price}}</div>
                  </div>
                  <div class="fruit-detail">{{item.address}}</div>
                </div>
                <div class="list-eye">
                  <a class="eye" href="javascript:;" :title="'点击率:'+(item.views||100)"></a>
                  <span class="span">{{item.views||100}}</span>
                  <span class="hand">
                    <a class="hd" href="javascript:;" :title="'想学:'+(item.follow||100)"></a>
                    <span>{{item.follow||100}}</span>
                  </span>
                  <a :href="`/cultivate/detail/${item.id}`" onclick="return false;">
                    <span class="study" @click="study(item.id)">我想学</span>
                  </a>
                </div>
              </div>
              <not-found v-if="fruitclasslist.length === 0" type="not-fond" msg="暂无相关信息"></not-found>
            </div>
            <session-title name="最新发布" brief="Sometimes beauty is so simple"></session-title>
            <div
              v-for="(item, index) in newList"
              :key="index"
            >
              <a :class="['cultivate-count-div5',{left: index%2 == 1}]" :href="`/cultivate/detail/${item.id}`" onclick="return false;">
                <div class="news_bg_img" :style="`backgroundImage: url(${item.teacher_img})`" @click="selectItem(item)">
                  <!-- <img :src="item.teacher_img" /> -->
                </div>
                <div class="bian">
                  <div class="div5-list">
                    <div class="li-text">
                      <h4 @click="selectItem(item)">{{item.theme}}</h4>
                      <div class="list-eye">￥{{item.price}}</div>
                    </div>
                    <el-rate :value="item.diff" :colors="['#58B708','#58B708','#58B708']" disabled></el-rate>
                    <div class="li-text2">
                      适用人群：
                      <pre>{{item.crowd}}</pre>
                    </div>
                    <div class="li-text3">开课时间：{{item.startTime}}/{{item.endTime}}</div>
                    <div class="li-text4">地 址：{{item.address}}</div>
                  </div>
                  <img class="border-img" src="../../assets/image47.png" />
                </div>
                <div class="color-box"></div>
              </a>
            </div>
            <not-found v-if="newList.length === 0" type="not-fond" msg="暂无相关信息"></not-found>
          </div>
          </keep-alive>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Banner from "@/components/banner";
import VDistpicker from "v-distpicker";
import Bus from "@/utils/Bus";
import {
  getTrains,
  postTrainsList,
  getOrderByTrains,
  postTrains,
  getTrainsById,
  postTrainsRank,
  followTrain
} from "@/api/trains";
import {
  getFollowTrain
} from "@/api/personal";
import { mapGetters } from "vuex";
export default {
  metaInfo: {
    title: '培训信息-瑜伽培训课程-中国瑜伽村培训日程表', // set a title
    meta: [{       // set meta
      name: 'keyWords',
      content: '瑜伽培训，瑜伽培训课程，中国瑜伽村培训课程'
    },{
      name: 'description',
      content: '很多人都不了解瑜伽培训和瑜伽培训的具体课程都有哪些，中国瑜伽村专门整合了各大商家和导师的瑜伽培训日程表和详细介绍，可根据需求和爱好报名。'
    }]
  },
  components: {
    Banner,
    VDistpicker
  },
  data() {
    return {
      classfiyIds: '',
      banner: "",
      moreClassfiy: [],
      bannerHeight:542,
      screenWidth :0,
      value2: "",
      value3: "",
      cationbanner:[],
      selectArea: {
        province: "",
        city: "",
        area: ""
      },
      input: "",
      input2: "",
      active: "",
      active2: "",
      active3: "",
      value1: "",
      rate: 2,
      wpList: [
        {
          value: 1,
          type: "diff",
          isArray: false,
          name: "1星"
        },
        {
          value: 2,
          type: "diff",
          isArray: false,
          name: "2星"
        },
        {
          value: 3,
          type: "diff",
          isArray: false,
          name: "3星"
        },
        {
          value: 4,
          type: "diff",
          isArray: false,
          name: "4星"
        },
        {
          value: 5,
          type: "diff",
          isArray: false,
          name: "5星"
        }
      ],
      classfiy: [],
      time: {
        value: {
          startTime: "",
          endTime: ""
        },
        type: "time",
        range: [],
        isArray: false,
        name: ""
      },
      priceInput: {
        value: {
          minPrice: "",
          maxPrice: ""
        },
        type: "price",
        isArray: false,
        name: ""
      },
      priceList: [
        {
          value: {
            minPrice: 1500,
            maxPrice: 3000
          },
          type: "price",
          isArray: false,
          name: "1500-3000"
        },
        {
          value: {
            minPrice: 3100,
            maxPrice: 4000
          },
          type: "price",
          isArray: false,
          name: "3001-4000"
        },
        {
          value: {
            minPrice: 4100,
            maxPrice: 5000
          },
          type: "price",
          isArray: false,
          name: "4001-5000"
        }
      ],
      selectTags: [],
      fruit: {
        // data: []
      },
      per_page:0,
      current_page:1,
      total:0,
      fruitclasslist: [],
      newList: [],
      // 添加 fw 类 的判定状态
      resultFw: false,
      defaultFw: false,
      hostFw: false,
      priceFW: false,
      // 排序关键字
      keyWord: '',
      // 控制价格排序的 flag
      priceFlag: '',
      position:'',
    };
  },
  computed: {
    ...mapGetters(["info"]),
    isTagActive() {
      return item => {
        const select = this.selectTags.filter(tag => tag.name == item.name)[0];
        return { active: select };
      };
    },
  },
  created(){
    const { ids = '' } = this.$route.query
    this.classfiyIds = ids
    this.maintype();
    this.classification();
  },
  mounted() {
    if(this.classfiyIds === '') {
      this.getTrainsList();
    }
    getOrderByTrains().then(data => {
      this.newList = data.new;
      this.fruitclasslist = data.hot;
    });

    // 首次加载时,需要调用一次
    this.screenWidth =  window.innerWidth;
    this.setSize();
    // 窗口大小发生改变时,调用一次
    window.onresize = () =>{
    this.screenWidth =  window.innerWidth;
    this.setSize();
    }
  },
  methods: {
    setSize:function () {
            this.bannerHeight = 542 / 1920 * this.screenWidth;
          },
      //根据页面查广告数据
    classification(){
      this.$request.get(`/advertisement/data/6`).then(data => {
          for(let i = 0; i < data.length; i++){
            if(data[i].position == 0){
              this.cationbanner = data[i].advertisement;
            }
          }
      });
    },
     cationclick(item){
        switch(item.mold){
            case 1:
                this.$router.push({
                    path: "/subjects",
                    query: {
                    id: item.relation_id
                    }
                });
                break;
            case 2:
                this.$router.push({
                    path: "/joinclubhouse/joinclubhousedetails",
                    query: {
                    id: item.relation_id
                    }
                });
                break;
            case 3:
                this.$router.push({
                    path: "/yogoteacher/yogoteacherdetails",
                    query: {
                    id: item.relation_id
                    }
                });
                break;
            case 4:
               this.$router.push({
                        path: `/cultivate/detail/${item.relation_id}`,
                    });
                break;
            case 5:
                this.$router.push({
                    path: "/goods/detail",
                    params: {
                    id: item.relation_id
                    }
                });
                break;
            case 6:
                this.$router.push({
                    path: "/cultivate/index",
                });
                break;
            case 7:
                this.$router.push({
                    path: "/market/detail",
                });
                break;
        }
      },
    wantStudy(id) {
      getFollowTrain(id)
        .then(data => {
          this.$message({type:'success', message: '已为您收藏至个人中心'})
        })
    },
    //类型和banner
    maintype(){
      this.$request.get(`/trains/type`).then(res => {
            const mapClassfiy = array =>
              array.map(item => {
                item.type = "classfiy";
                item.value = item.id;
                item.isArray = true;
                return item;
              });
            this.classfiy = mapClassfiy(res.course_types);
            // this.classfiy = res.course_types;
            this.banner = res.banner;
            return this.classfiy;
        })
        .then(classfiy => {
          const selectIds = this.classfiyIds.split(',').map(item => parseInt(item))
          const selectClassfiy = classfiy.filter(item => selectIds.indexOf(parseInt(item.id)) >= 0)
          this.selectTags = [...this.selectTags, ...selectClassfiy]
        })
        .then(() => {
          this.searchResult()
        })
    },
    getFiltersParams(params = {}) {
      this.selectTags.map(item => {
        if (
          item.type == "time" ||
          item.type == "price" ||
          item.type == "area"
        ) {
          params = Object.assign({}, params, item.value);
        } else if (item.type == "classfiy") {
          let course_type_id = params.course_type_id || [];
          course_type_id.push(item.id);
          params = Object.assign({}, params, {
            course_type_id: course_type_id
          });
        } else {
          params = Object.assign({}, params, { [item.type]: item.value });
        }
      });
      return params;
    },
    searchResult(page = 1) {
      page = parseInt(page) || 1
      
      postTrains(page, this.getFiltersParams()).then(data => {
        this.fruit = data.data;
        this.per_page = data.per_page;
        this.current_page = data.current_page;
        this.total = data.total;
        // this.getTrainsList();
      });
      this.hostFw = false;
      this.priceFW = false;
    },
    postGetTrainsList(page = this.current_page, params) {
      postTrainsList(page, params).then(data => {
        this.fruit = data.data;
        this.per_page = data.per_page;
        this.current_page = data.current_page;
        this.total = data.total;
      });
    },
    getTrainsList(page = this.current_page) {
      getTrains(page).then(data => {
        this.fruit = data.data;
        this.per_page = data.per_page;
        this.current_page = data.current_page;
        this.total = data.total;
        if (page > 1) return;
      });
    },
    getRankParams(keyWord, params = {}) {
      if(keyWord === 'default') {
        params = Object.assign({}, params, { time: true });
      } else if(keyWord === 'host') {
        params = Object.assign({}, params, { follow: true });
      } else {
        if(this.priceFlag) {
          params = Object.assign({}, params, { money: true });
        } else {
          params = Object.assign({}, params, { money: false });
        }
      }
      return params;
    },
    changePage(val){
      this.current_page = val;
      if(this.selectTags.length > 0) {
        // this.searchResult(val);
        this.getRank(this.getRankParams(this.keyWord, this.getFiltersParams()), val)
      } else {
        this.getRank(this.getRankParams(this.keyWord, this.getFiltersParams()), val)
        // this.getTrainsList();
      }
    },
    // 排序请求
    getRank(params, page = 1) {
      postTrains(page, params).then(data => {
        this.fruit = data.data;
        this.per_page = data.per_page;
        this.current_page = data.current_page;
        this.total = data.total;       
      })
    },
    postGetRank(page=this.current_page, params) {
      postTrainsRank(page, params).then(data => {
        this.fruit = data.data;
        this.per_page = data.per_page;
        this.current_page = data.current_page;
        this.total = data.total; 
      })
    },
    // 默认排序
    defaultRank(keyWord) {
      this.defaultFw = true;
      this.hostFw = false;
      this.priceFW = false;
      this.priceFlag = '';
      this.resultFw = false;
      this.keyWord = keyWord;
      this.getRank(this.getRankParams(keyWord, this.getFiltersParams()))
      // if(this.selectTags.length > 0) {
      //   this.searchResult();
      // } else {
      //   this.getTrainsList();
      // }
    },
    // 热度排序
    hostRank(keyWord) {
      this.hostFw = true
      this.defaultFw = false;
      this.priceFW = false;
      this.resultFw = false;
      this.priceFlag = '';
      this.keyWord = keyWord;
      this.getRank(this.getRankParams(keyWord, this.getFiltersParams()))
    },
    // 价格排序
    priceRank(keyWord) {
      this.priceFlag = !this.priceFlag;
      this.priceFW = true;
      this.defaultFw = false;
      this.hostFw = false;
      this.resultFw = false;
      this.keyWord = keyWord;
      this.getRank(this.getRankParams(keyWord, this.getFiltersParams()))
      // this.priceFlag = !this.priceFlag
    },
    study(id) {
      if (!this.info.user.name) {
        Bus.$emit("login", true);
        return;
      }
      this.wantStudy(id)
    },

    changeTime(e) {
      if (e.length > 1) {
        this.time.name = e[0] + "/" + e[1];
        this.time.value.startTime = e[0];
        this.time.value.endTime = e[1];
        this.selected(this.time);
      } else {
        this.resetTime();
      }
    },
    priceChange(price) {
      let {
        value: { minPrice, maxPrice },
        name
      } = this.priceInput;
      if (minPrice && maxPrice) {
        if (minPrice > maxPrice) {
          this.$message({
            type: "warning",
            message: "输入的范围不正确"
          });
          return;
        }
        if (maxPrice > 100000) {
          this.$message({
            type: "warning",
            message: "输入的0-100000范围之内"
          });
          return;
        }
        name = `${minPrice} - ${maxPrice}`;
        this.priceInput.name = name;
        this.selected(this.priceInput);
      }
    },
    onSelected(data) {
      const { province, city, area } = data;
      this.selectArea = {
        province: province.value,
        city: city.value,
        area: area.value
      };
      const tag = {
        value: {
          province: province.value,
          city: city.value,
          area: area.value
        },
        type: "area",
        isArray: false,
        name: `${province.value} ${city.value} ${area.value}`
      };
      area.value.length > 1 && this.selected(tag);
    },
    resetArea() {
      this.selectArea.province = "";
      this.selectArea.city = "";
      this.selectArea.area = "";
      this.getTrainsList();
    },
    resetTime() {
      this.time = {
        value: {
          startTime: "",
          endTime: ""
        },
        type: "time",
        range: [],
        isArray: false,
        name: ""
      };
      this.getTrainsList();
    },
    resetPrice() {
      this.priceInput = {
        value: {
          minPrice: "",
          maxPrice: ""
        },
        type: "price",
        isArray: false,
        name: ""
      };
    },
    removeTag(type) {
      if (type == "area") {
        this.resetArea();
      }
      if (type === "time") {
        this.resetTime();
      }
      if (type == "price") {
        this.priceInput.name && this.resetPrice();
      }
      this.selectTags = this.selectTags.filter(item => item.type !== type);
    },
    selected(item) {
      console.log(item)
      if (item.isArray) {
        this.selectTags.push(item);
        return;
      }
      // if (item.type == "price") {
      //   this.priceInput.name && this.resetPrice();
      // }
      const hasIndex = this.selectTags
        .map((tag, index) => {
          if (tag.type == item.type) {
            return index + "";
          }
        })
        .filter(item => item)[0];
      hasIndex && this.selectTags.splice(hasIndex, 1);
      this.selectTags.push(item);
    },
    handleClose(tag) {
      if (tag.type === "area") {
        this.resetArea();
      }
      if (tag.type === "time") {
        this.resetTime();
      }
      if (tag.type == "price") {
        this.priceInput.name && this.resetPrice();
      }
      this.selectTags.splice(this.selectTags.indexOf(tag), 1);
      if (this.selectTags.length === 0) {
        this.getTrainsList();
        this.priceFW = false;
        this.defaultFw = false;
        this.hostFw = false;
        this.resultFw = false;
      }
    },
    selected3(name) {
      this.active3 = name;
    },
    selectItem(item) {
      this.$router.push({
        path: `/cultivate/detail/${item.id}`,
      });
    },
    goMarketDetail() {
      this.$router.push("/cultivate/detail");
    }
  }
};
</script>
<style scoped>
a:hover{
  color: inherit;
  text-decoration:none;
}
a {
  color: inherit;
}
.cultivate-main >>> .el-date-table td.available.in-range.start-date {
}
.cultivate-main >>> .el-pager li:not(.disabled).active {
  background: #e8f4db;
  color: #2c2c2c;
}
.cultivate-main
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  color: #2c2c2c;
}
.cultivate-main >>> .el-icon-close:hover {
  background: #fff;
  color: #2c2c2c;
}
.cultivate-main >>> .el-icon-close {
  color: inherit;
}
.cultivate-main >>> .el-input__inner {
  height: 30px;
}
.cultivate-main >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding: 0;
}
.cultivate-main >>> .el-rate__icon {
  font-size: 0.7rem !important;
  -webkit-text-stroke: 1px #22cc22;
}
.cultivate-main >>> .el-button:hover {
  border-color: #22cc22;
  color: #2c2c2c;
}
.cultivate-main >>> .el-button:focus {
  outline: none;
}
.cultivate-main >>> .el-button--text {
  border: none !important;
}
.cultivate-main >>> .el-button--text:active {
  border: none !important;
  background: #000;
}
.cultivate-main >>>.el-date-editor .el-range__icon{
    line-height: 22px !important;
  }
 .cultivate-main >>>.el-date-editor .el-range-separator{
   line-height: 22px !important;
 }
</style>
<style lang="scss" scoped>
.search {
  color: #2c2c2c;
  background-color: #fff;
  height: 2em;
  line-height: 2em;
  padding: 0;
  width: 4em;
  margin-left: 1em;
}
.pages {
  display: flex;
  justify-content: center;
}
.bg_img {
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.bg_img2{
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
   .advertisement{
        width: 40px;
        height: 20px;
        line-height: 20px;
        background-color: #351D27;
        opacity: 0.5;
        color: #fff;
        font-size: 12px;
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 0;
    }
  img{
      width: 100%;
      height: 100%;
  }
}
.cultivate-main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  font-size: 0.7rem;
  background:#fff;
  .cultivate-count {
    width: 60rem;
    margin: 0 auto;
    margin-top: -24.4rem;
    height: 100%;
    padding-bottom: 3rem;
    // display: inline-block;
    position: relative;
    z-index: 10;
    .cultivate-count-div1 {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: inline-block;
      .cultivate1 {
        // width: 90vw;
        // height: 24.6rem;
        margin: 0 auto;
        background-color: #ffffff;
        box-shadow: 2px 3px 20px 1px #a4a4a4;
        border-radius: 0.3rem;
        margin-top: 1.3rem;

        .cultivate1-one {
          // width: 100%;
          height: 4.1rem;
          line-height: 4.1rem;
          padding-left: 3rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dcdcdc;
          .span {
            width: 4em;
            display: inline-block;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            cursor: pointer;
            width: 3rem;
            text-align: center;
          }
          .el-range-editor.el-input__inner {
            // margin-left: 2rem;
            // margin-top: 0.8rem;
            width: 50%;
          }
        }
        .cultivate1-two {
          // width: 100%;
          height: 4.1rem;
          line-height: 4.1rem;
          padding-left: 3rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            width: 4em;
            flex-shrink: 0;
            flex-shrink: 0;

            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            cursor: pointer;
            width: 3rem;
            text-align: center;
          }
          .button-price {
            div {
              display: inline-block;
              cursor: pointer;
              padding-right: 2rem;
            }
            .el-button--text {
              display: inline-block;
              color: #2c2c2c;
              margin-left: 2rem;
            }
            .active {
              display: inline-block;
              color: #00bc71;

              border: none;
            }
            .price-input1 {
              margin-left: 2rem;
              padding: 0;
              width: 10em;
            }
            .price-input2 {
              padding: 0;
              width: 10em;
            }
          }
        }
        .cultivate1-three {
          // width: 100%;
          height: 4.1rem;
          padding-left: 3rem;
          line-height: 4.1rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            width: 4em;
            flex-shrink: 0;
            display: inline-block;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            cursor: pointer;
            width: 3rem;
            text-align: center;
          }
          .distpicker-address-wrapper {
            // margin-left: 2rem;
          }
        }
        .cultivate1-four {
          // width: 100%;
          height: 4.1rem;
          padding-left: 3rem;
          line-height: 4.1rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          .span {
            width: 4em;
            flex-shrink: 0;
            display: inline-block;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            cursor: pointer;
            width: 3rem;
            text-align: center;
          }
          .button-text {
            div {
              display: inline-block;
              cursor: pointer;
              padding-right: 1.5rem;
            }
            .el-button--text {
              color: #2c2c2c;
              margin-left: 2rem;
            }
            .active {
              color: #00bc71;

              border: none;
            }
          }
        }
        .cultivate1-five {
          // width: 100%;
          min-height: 3.1rem;
          line-height: 3.1rem;
          padding-left: 3rem;
          display: flex;
          border-bottom: 1px solid #dcdcdc;
          position: relative;
          .span {
            width: 4em;
            flex-shrink: 0;
            display: inline-block;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .butt {
            color: #2c2c2c;
            width: 3rem;
            cursor: pointer;
            text-align: center;
          }
          .button-classfiy {
            div {
              display: inline-block;
              cursor: pointer;
              padding-right: 1.5rem;
            }
            .el-button--text {
              color: #2c2c2c;
              margin-left: 2rem;
            }
            .active {
              color: #00bc71;

              border: none;
            }
          }
          .more {
            position: absolute;
            right: 0;
          }
        }
        .cultivate1-six {
          // width: 100%;
          min-height: 4.1rem;
          line-height: 4.1rem;
          padding-left: 3rem;
          padding-bottom: 2em;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .span {
            width: 4em;
            flex-shrink: 0;
            display: inline-block;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #2c2c2c;
          }
          .tag {
            margin-left: 1.5rem;
            color: inherit;
            border: none;
          }
        }
      }
      .fruit {
        position: relative;
        width: 100%;
        margin: 0 auto;
        margin-top: 2rem;
        font-family: MicrosoftYaHei;
        color: #2c2c2c;
        .fruit-item {
          margin-left: 0.5rem;
          cursor: pointer;
        }
        .fw {
          font-weight: 700;
          cursor: pointer;
        }
        .trigon-top,
        .trigon-bottom {
          position: absolute;
        }
        .trigon-bottom {
          top: 6px;
        }
      }
      .fruit-list {
        width: 62.22rem;
        // height: 77rem;
        padding-bottom: 2rem;
        overflow: hidden;
        margin: 0 auto;
        .fruit-list-li {
          width: 19.2rem;
          height: 29rem;
          // height: 100%;
          // padding-bottom: 1rem;
          background-color: #ffffff;
          border-radius: 0.3rem;
          float: left;
          margin-right: 1.11rem;
          margin-top: 1rem;
          box-shadow:3px 1px 6px 1px rgba(0, 0, 0, 0.16);
          font-size: 0.7rem;
          &:hover {
            box-shadow: 0.1rem 0.2rem 1.3rem 0.1rem rgba(164, 164, 164, 0.39);
            transition: box-shadow 0.75s;
          }
          .fruit-list-li-img {
            width: 100%;
            height: 17.7rem;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top center;
            background: #eee;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .fruit-list-li-text {
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            width: 90%;
            margin: 0 auto;
            // margin-top: 1.5rem;
            padding-top: 0.8rem;
            
            height: 4em;
            cursor: pointer;
            div {
              font-size: 1.3rem;
              overflow: hidden !important;
              -webkit-line-clamp: 1 !important;
              text-overflow: ellipsis !important;
              display: -webkit-box !important;
              -webkit-box-orient: vertical;
              color: #2c2c2c;
            }
          }
          .fruit-list-li-text2 {
            display: flex;
            justify-content: space-between;
            // align-items: center;
            width: 90%;
            margin: 0 auto;
            margin-top: 0.5rem;
            h4 {
              font-size: 1.3rem;
              color: #2c2c2c;
            }
          }
          .fruit-detail {
            width: 90%;
            height: 57px;
            margin: 0 auto;
            margin-top: 1rem;
          }
          .list-eye {
            position: relative;
            width: 90%;
            height: 1.6rem;
            padding: 10px 5px;
            margin: 0 auto;
            border-top: 1px solid rgba(229, 229, 229, 1);
            .eye {
              background-image: url("../../assets/trains/eye.png");
              background-size: 100% 100%;
              width: 20px;
              height: 20px;
              position: absolute;
              top: 10px;
              left: 0;
            }
            img {
              width: 1.6rem;
              height: 1.5rem;
              margin-top: -3px;
            }
            .span {
              padding-left: 20px;
              font-size: 0.77rem;
              color: #2c2c2c;
            }
            .hand {
              position: relative;
              height: 2.7rem;
              .hd {
                background-image: url("../../assets/trains/hand.png");
                // background-size: 100% 100%;
                background-repeat: no-repeat;
                width: 20px;
                height: 20px;
                position: absolute;
                left: 15px;
              }
              span {
                padding-left: 30px;
                font-size: 0.77rem;
                color: #2c2c2c;
              }
            }
            .study {
              float: right;
              color: #fff;
              width: 70px;
              background: #8FCD71;
              height: 27px;
              border-radius: 20px;
              text-align: center;
              line-height: 27px;
              font-weight: bold;
              cursor: pointer;
            }
          }
        }
      }
      .market_often-btn {
        margin-top: 2rem;
        margin-bottom: 5rem;
        .goods-detail-btn {
          cursor: pointer;
          width: 13rem;
          margin: 0 auto;
          padding: 0.4rem 0.55rem 1.5rem 6.7rem;
          background: url(../../assets/market/btn-bg.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .cultivate-count-div2 {
      width: 100%;
      height: 9.4rem;
      text-align: center;
      display: inline-block;
      position: relative;
      .border-left {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        top: 45%;
        left: 22%;
      }
      .border-right {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        right: 22%;
        top: 45%;
      }
      .nav-text {
        color: #999999;
        font-size: 14px;
        margin-top: -8px;
      }
      h2 {
        color: #2c2c2c;
        font-size: 24px;
        margin-top: 40px;
        img {
          width: 28px;
          height: 28px;
          position: absolute;
          left: 44%;
        }
      }
    }
    .cultivate-count-div3 {
      width: 62.22rem;
      height: 37rem;
      margin: 0 auto;
      .fruit-list-li {
        width: 19.2rem;
        height: 29rem;
        // height: 100%;
        // padding-bottom: 1rem;
        background-color: #ffffff;
        border-radius: 0.3rem;
        float: left;
        margin-right: 1.11rem;
        margin-top: 1rem;
        font-size: 0.7rem;
        box-shadow:3px 1px 6px 1px rgba(0, 0, 0, 0.16);
        &:hover {
          box-shadow: 0.1rem 0.2rem 1.3rem 0.1rem rgba(164, 164, 164, 0.39);
          transition: box-shadow 0.75s;
        }
        .fruit-list-li-img {
          width: 100%;
          height: 17.7rem;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: top center;
          background: #eee;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .fruit-list-li-text {
          // display: flex;
          // justify-content: space-between;
          // align-items: center;
          width: 90%;
          margin: 0 auto;
          height: 3em;
          margin-top: 1rem;
          cursor: pointer;
          padding-top: 0.4rem;
          div {
            font-size: 1.3rem;
            overflow: hidden !important;
            -webkit-line-clamp: 1 !important;
            text-overflow: ellipsis !important;
            display: -webkit-box !important;
            -webkit-box-orient: vertical;
            color: #2c2c2c;
          }
          .list-eye {
            img {
              width: 1.6rem;
              height: 1.5rem;
              margin-top: -3px;
            }
            .span {
              font-size: 1.1rem;
              color: #2c2c2c;
            }
          }
        }
        .fruit-list-li-text2 {
          display: flex;
          justify-content: space-between;
          // align-items: center;
          width: 90%;
          margin: 0 auto;
          margin-top: 0.5rem;
          h4 {
            font-size: 1.3rem;
            color: #2c2c2c;
          }
          .list-eye {
            img {
              width: 1.6rem;
              height: 1.5rem;
              margin-top: -3px;
            }
            .span {
              font-size: 1.1rem;
              color: #2c2c2c;
            }
          }
        }
        .fruit-detail {
          width: 90%;
          height: 57px;
          margin: 0 auto;
          margin-top: 1rem;
        }
        .list-eye {
            position: relative;
            width: 90%;
            height: 3rem;
            padding: 10px 5px;
            margin: 0 auto;
            border-top: 1px solid rgba(229, 229, 229, 1);
            .eye {
              background-image: url("../../assets/trains/eye.png");
              background-size: 100% 100%;
              width: 20px;
              height: 20px;
              position: absolute;
              top: 10px;
              left: 0;
            }
            img {
              width: 1.6rem;
              height: 1.5rem;
              margin-top: -3px;
            }
            .span {
              padding-left: 20px;
              font-size: 0.77rem;
              color: #2c2c2c;
            }
            .hand {
              position: relative;
              height: 2.7rem;
              .hd {
                background-image: url("../../assets/trains/hand.png");
                // background-size: 100% 100%;
                background-repeat: no-repeat;
                width: 20px;
                height: 20px;
                position: absolute;
                left: 15px;
              }
              span {
                padding-left: 30px;
                font-size: 0.77rem;
                color: #2c2c2c;
              }
            }
            .study {
              float: right;
              color: #fff;
              width: 70px;
              background: #8FCD71;
              height: 27px;
              border-radius: 20px;
              text-align: center;
              line-height: 27px;
              font-weight: bold;
              cursor: pointer;
            }
          }
      }
    }
    .cultivate-count-div4 {
      width: 100%;
      height: 9.4rem;
      text-align: center;
      display: inline-block;
      position: relative;
      .border-left {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        top: 45%;
        left: 22%;
      }
      .border-right {
        width: 20%;
        height: 1px;
        background-color: #dcdcdc;
        position: absolute;
        right: 22%;
        top: 45%;
      }
      .nav-text {
        color: #999999;
        font-size: 14px;
        margin-top: -8px;
      }
      h2 {
        color: #2c2c2c;
        font-size: 24px;
        margin-top: 40px;
        img {
          width: 28px;
          height: 28px;
          position: absolute;
          left: 44%;
        }
      }
    }
    .cultivate-count-div5.left {
      justify-content: flex-end;
      .news_bg_img {
        order: 3;
        cursor: pointer;
        margin: 0 auto;
        margin-left: 4rem;
      }
      .news_bg_img2{
        position:absolute;
        top: 6%;
        transform: rotate(180deg);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .bian {
        // background: linear-gradient(
        //   to right,
        //   #F4F4F4 0%,
        //   #F4F4F4 50%,
        //   #eef5dd 50%,
        //   #eef5dd 100%
        // );
        &::after {
          left: 0;
          right: 100%;
        }
        .border-img {
          margin-left: 0;
          left: -7.6rem;
        }
      }
      .color-box {
        width: 8.4rem;
        height: 15.47rem;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #EEF5DD;
      }
      .div5-list {
        margin-left: 8rem;
      }
      .li-text4 {
        &::after {
          left: 0;
          right: 100%;
          transform: rotate(180deg);
        }
      }
    }
    .cultivate-count-div5 {
      width: 100%;
      margin: 0 auto;
      height: 26rem;
      display: flex;
      align-items: flex-end;
      position: relative;
      margin-bottom: 5rem;
      .news_bg_img {
        width: 19.2rem;
        height: 17.7rem;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top center;
        background: #eee;
        cursor: pointer;
        margin: 0 auto;
        margin-right: 4rem;
      }
      .news_bg_img2{
        position:absolute;
        top: 6%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .bian {
        width: 22rem;
        height: 21rem;
        // padding: 3rem 4rem;
        // background-color: #cce198;
        // background: linear-gradient(
        //   to right,
        //   #eef5dd 0%,
        //   #eef5dd 50%,
        //   #F4F4F4 50%,
        //   #F4F4F4 100%
        // );
        z-index: 1;
        position: relative;
        // opacity: 0.33;
        // &::after {
        //   display: block;
        //   position: absolute;
        //   right: 0;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   content: "";
        //   width: 1px;
        //   height: 11rem;
        //   background: #bfbfbf;
        // }
      }
      .color-box {
        width: 8.4rem;
        height: 15.47rem;
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: #EEF5DD;
      }
      .div5-list {
        // position: absolute;
        // left: 51%;
        // top: 24%;
        // margin: 2rem 4rem;
        width: 20em;
        .li-text {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          margin-top: 0.6rem;
          h4 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-size: 1rem;
            color: #2c2c2c;
          }
        }
        .list-but{
          width:82px;
          height:24px;
          background:rgba(49,49,49,1);
          border-radius:12px;
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 24px;
          margin-top: 5px;
          cursor: pointer;
        }
        .list-eye {
            font-size: 1.1rem;
            color: #2c2c2c;
            font-family:FZChaoCuHei-M10S;
            font-weight:bold;
            margin-top: 1rem;
            .rmby{
              color: #2c2c2c;
              font-size: 14px;
              padding-left: 5px;
            }
          }
        .rate-text{
          color: #999;
          font-size: 0.8rem;
          display: flex;
          border-bottom: 2px solid #BFBFBF;
          padding-bottom: 5px;
        }
        .li-text2 {
          font-size: 0.7rem;
          color: #2c2c2c;
          margin-top: 1rem;
          height: 3.5rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .li-text3 {
          font-size: 0.7rem;
          color: #2c2c2c;
          margin-top: 4rem;
        }
        .li-text4 {
          font-size: 0.7rem;
          color: #2c2c2c;
          margin-top: 1rem;
          position: relative;
          &::after {
            position: absolute;
            content: "";
            height: 1.5rem;
            width: 0.8rem;
            bottom: -4rem;
            left: 0;
            z-index: 112;
            background-repeat: no-repeat;
            background-image: url("../../assets/image-jiao.png");
          }
        }
        .li-text5 {
          width: 1rem;
          height: 1.3rem;
          position: absolute;
          left: 93%;
          bottom: -18%;
        }
      }
      .border-img {
        width: 5.1rem;
        height: 5.1rem;
        margin-left: 2.5rem;
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        right: 0;
      }
    }
    .cultivate-count-div6 {
      width: 100%;
      margin: 0 auto;
      height: 26rem;
      display: flex;
      position: relative;
      img {
        width: 31.2rem;
        height: 21.7rem;
      }
      .bian {
        width: 15.7rem;
        height: 17rem;
        background-color: #eef5dd;
        // opacity: 0.33;
        margin-top: 4.7rem;
      }  
      .div5-list {
        // position: absolute;
        // left: 51%;
        // top: 24%;
        margin: 3rem 4rem;
        width: 20em;
        .li-text {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          h4 {
            font-size: 1.3rem;
            color: #2c2c2c;
          }
          .list-eye {
            font-size: 1.1rem;
            color: #2c2c2c;
          }
        }
        .li-text2 {
          color: #2c2c2c;
          margin-top: 2rem;
        }
        .li-text3 {
          color: #2c2c2c;
          margin-top: 1.8rem;
        }
        .li-text4 {
          color: #2c2c2c;
          margin-top: 0.5rem;
        }
        .li-text5 {
          width: 1rem;
          height: 1.3rem;
          position: absolute;
          left: 93%;
          bottom: -18%;
        }
      }
      .border-bo {
        background-color: #bfbfbf;
        width: 0.1rem;
        height: 13.9rem;
        position: absolute;
        right: 20%;
        top: 20%;
      }
      .border-img {
        width: 5.1rem;
        height: 5.1rem;
        position: absolute;
        right: 10%;
        top: 34%;
      }
    }
  }
}
</style>
