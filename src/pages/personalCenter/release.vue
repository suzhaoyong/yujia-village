<template>
  <div style="background:#EAEAEA;">
    <div class="release">
      <div class="my lf">
        <div class="apply">
          <div class="header">
            <span>我的发布/My release</span>
          </div>
          <div class="result" v-if="release.data.length>0">
            <div class="club-wrap" v-for="(item, index) in release.data" :key="index">
              <div class="club">
                <div class="club_img">
                  <img :src="item.paht" alt />
                  <span class="item-actions"></span>
                  <span class="club_view" @click="selectItem(item)">查看</span>
                  <!-- <span class="club_edit" @click="reasonItem(item, index)">理由</span> -->
                  <span class="club_edit" @click="editItem(item)">编辑</span>
                </div>
                <div class="club_info">
                  <div class="club_name">{{item.theme}}</div>
                  <div class="club_price">￥{{item.price}}</div>
                  <div class="club_rate">
                    <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="item.diff"></el-rate>
                  </div>
                  <div class="club_address">{{item.address}}</div>
                  <div class="time">发布于 {{item.updated_at}}</div>
                </div>
              </div>
              <div class="reason-wrap" v-show="item.show">
                <div class="reason">
                  <div class="reason-input" v-show="false">
                    <el-input type="textarea" placeholder></el-input>
                  </div>
                  <div class="reason-text" v-show="true">
                    <p>未通过原因如下：</p>
                    <p>{{item.reason}}</p>
                  </div>
                </div>
                <div class="reason-op" v-show="false">重新编辑</div>
                <div class="reason-op" v-show="false">确认修改</div>
              </div>
            </div>

            <div class="pages">
              <el-pagination
                background
                :hide-on-single-page="true"
                layout="prev, pager, next, jumper"
                :page-size="release.per_page"
                @current-change="changePage"
                :current-page="release.current_page"
                :total="release.total"
              ></el-pagination>
            </div>
          </div>
          <div class="no_list" v-if="release.data.length === 0">暂无数据</div>
        </div>
        <div class="falied">
          <div class="header">
            <span>审核未通过课程/The audit failed</span>
          </div>
          <div v-if="release_failed.data.length>0" class="result">
            <div class="club-wrap" v-for="(item, index) in release_failed.data" :key="index">
              <div class="club">
                <div class="club_img">
                  <img :src="item.paht" alt />
                  <span class="item-actions"></span>
                  <!-- <span class="club_view" @click="selectItem(item)">查看</span> -->
                  <span class="club_view" @click="reasonItem(item, index)">理由</span>
                  <span class="club_edit" @click="editItem(item)">编辑</span>
                </div>
                <div class="club_info">
                  <div class="club_name">{{item.theme}}</div>
                  <div class="club_price">￥{{item.price}}</div>
                  <div class="club_rate">
                    <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="item.diff"></el-rate>
                  </div>
                  <div class="club_address">{{item.address}}</div>
                  <div class="time">发布于 {{item.updated_at}}</div>
                </div>
              </div>
              <div class="reason-wrap" v-show="item.show">
                <div class="reason">
                  <div class="reason-input" v-show="false">
                    <el-input type="textarea" placeholder></el-input>
                  </div>
                  <div class="reason-text" v-show="true">
                    <p>未通过原因如下：</p>
                    <p>{{item.reason}}</p>
                  </div>
                </div>
                <div class="reason-op" v-show="false">重新编辑</div>
                <div class="reason-op" v-show="false">确认修改</div>
              </div>
            </div>
            <!-- <div class="club" @click="selectItem(item)" v-for="item in release_failed.data">
              <div class="club_img">
                <img :src="item.paht" alt />
              </div>
              <div class="club_info">
                <div class="club_name">{{item.theme}}</div>
                <div class="club_price">￥{{item.price}}</div>
                <div class="club_rate">
                  <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="item.diff"></el-rate>
                </div>
                <div class="club_address">{{item.address}}</div>
                <div class="time">发布于 {{item.updated_at}}</div>
              </div>
            </div>-->
            <div class="pages">
              <el-pagination
                background
                :hide-on-single-page="true"
                layout="prev, pager, next, jumper"
                :page-size="release_failed.per_page"
                @current-change="changePageFailed"
                :current-page="release_failed.current_page"
                :total="release_failed.total"
              ></el-pagination>
            </div>
          </div>
          <div class="no_list" v-if="release_failed.data.length === 0">暂无数据</div>
        </div>
      </div>
      <div class="my rh">
        <div class="fill" v-if="!isSucc">
          <div class="class_img">
            <div class="header">
              <span>课程信息填写</span>
            </div>
            <div class="imgs">
              <div class="title_tips">
                <div class="title">课程图片</div>
                <div class="tips">
                  请上传≥1张真实图片信息或已获授权的图片
                  （禁止复制受版权保护的网络图片）
                </div>
              </div>
              <div class="upload-imgs">
                <div class="upload-box">
                  <div class="upload-img" v-if="select.first">
                    <img :src="select.first" alt />
                    <span class="item-actions"></span>
                    <i @click="select.first = ''" class="el-icon-delete"></i>
                  </div>
                  <el-upload
                    v-else
                    action="#"
                    accept="image/jpeg, image/gif, image/png"
                    :before-upload="onBeforeUpload"
                    :class="{disabled:uploadDisabled('img_train_first')}"
                    :on-change="changeTrainFirstFile"
                    :on-remove="() => this.ruleForm['img_train_first'] = ''"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式，图片大小限制在1M之内</div>
                  </el-upload>
                </div>
                <div class="upload-box">
                  <div class="upload-img" v-if="select.two">
                    <img :src="select.two" alt />
                    <span class="item-actions"></span>
                    <i @click="select.two = ''" class="el-icon-delete"></i>
                  </div>
                  <el-upload
                    v-else
                    action="#"
                    accept="image/jpeg, image/gif, image/png"
                    :before-upload="onBeforeUpload"
                    :class="{disabled:uploadDisabled('img_train_two')}"
                    :on-change="changeTrainTwoFile"
                    :on-remove="() => this.ruleForm['img_train_two'] = ''"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式，图片大小限制在1M之内</div>
                  </el-upload>
                </div>
                <div class="upload-box">
                  <div class="upload-img" v-if="select.three">
                    <img :src="select.three" alt />
                    <span class="item-actions"></span>
                    <i @click="select.three = ''" class="el-icon-delete"></i>
                  </div>
                  <el-upload
                    v-else
                    action="#"
                    accept="image/jpeg, image/gif, image/png"
                    :before-upload="onBeforeUpload"
                    :class="{disabled:uploadDisabled('img_train_three')}"
                    :on-change="changeTrainThreeFile"
                    :on-remove="() => this.ruleForm['img_train_three'] = ''"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式，图片大小限制在1M之内</div>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
          <div class="class_name_diff">
            <div class="title_tips">
              <div class="title">课程名称</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.theme" placeholder="请输入课程名称"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">难度选择</div>
              <div class="tips"></div>
            </div>
            <div class="rate-box">
              <el-rate v-model="ruleForm.diff" :colors="['#58B708','#58B708','#58B708']"></el-rate>
            </div>
          </div>
          <div class="class_price_address_detail">
            <div class="title_tips">
              <div class="title">课程价格</div>
              <div class="tips">*严禁虚标价格</div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.price" placeholder="请输入课程价格"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">发布地址</div>
              <div class="tips"></div>
            </div>
            <div class="select-box">
              <v-distpicker
                :province="ruleForm.province"
                :city="ruleForm.city"
                :area="ruleForm.area"
                @selected="onSelected"
              ></v-distpicker>
            </div>
            <div class="title_tips">
              <div class="title">详细地址</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
            </div>
          </div>
          <div class="class_teacher_photo_time">
            <div class="title_tips">
              <div class="title">授课老师姓名</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.name" placeholder="请输入授课老师姓名"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">授课教师图片</div>
              <div class="tips teacher" @click="teacher_list.show = true">从名师库中搜索</div>
            </div>
            <div class="upload-box" style="padding-bottom:1rem;">
              <div class="upload-img" v-if="select.path">
                <img :src="select.path" alt />
                <span class="item-actions"></span>
                <i @click="select.path = ''" class="el-icon-delete"></i>
              </div>
              <el-upload
                v-else
                action="#"
                :class="{disabled:(uploadDisabled('teacher_img'))}"
                :on-change="changeTeacherFile"
                :on-remove="() => this.ruleForm['teacher_img'] = ''"
                list-type="picture-card"
                :limit="1"
                :auto-upload="false"
              >
                <i class="el-icon-plus"></i>
                <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式</div>
              </el-upload>
            </div>
            <div class="title_tips">
              <div class="title">课程起止日期</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
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
          </div>
          <div class="class_person_tel">
            <div class="title_tips">
              <div class="title">报名联系人</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.linkman" placeholder="请输入报名联系人"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">联系电话</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.tel" placeholder="请输入联系电话"></el-input>
            </div>
          </div>
          <div class="class_biref_group_detai">
            <div class="title_tips">
              <div class="title">课程大纲</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.outline" type="textarea" placeholder="请输入课程大纲"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">适宜人群</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.crowd" placeholder="请输入适宜人群"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">课程详细内容</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input v-model="ruleForm.main" type="textarea" placeholder="请输入课程详细内容"></el-input>
            </div>
            <div class="form_tips">
              注：带
              <span style="color:#8CD15A;font-size:1.2rem;">*</span>为必填项，其余为选填
            </div>
          </div>
          <div class="agreen-next">
            <div class="back" @click="() => { this.$router.go(-1); }">返回</div>
            <div class="next" @click="sure">完成</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="名师列表" :visible.sync="teacher_list.show">
      <div class="serach-wrap">
        <!-- <div class="header">授课教师名字</div> -->
        <div class="input-box">
          <el-autocomplete
            style="width:100%;"
            v-model.lazy="teacher_list.keyword"
            :trigger-on-focus="false"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="请输入授课教师名字"
          ></el-autocomplete>
        </div>
        <div class="photo" v-if="teacher_list.select.path">
          <img :src="teacher_list.select.path" alt />
        </div>
      </div>
      <span slot="footer">
        <el-button @click="resetTeacher">取 消</el-button>
        <el-button type="primary" @click="selectTeacher">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import {
  getMyTrain,
  getMyTrainFailed,
  postMytrainInfoPut,
  postShowTeacherPic,
  getShowMyTrain,
  postTrainInfoUpdate
} from "@/api/personal";
export default {
  components: {
    VDistpicker
  },
  data() {
    return {
      origin_select: {
        path: "",
        first: "",
        two: "",
        three: ""
      },
      select: {
        path: "",
        first: "",
        two: "",
        three: ""
      },
      isSucc: false,
      teacher_list: {
        show: false,
        keyword: "",
        list: [],
        select: {}
      },
      dialogVisible: false,
      dialogImageUrl: "",
      time: {
        value: {
          startTime: "",
          endTime: ""
        },
        type: "time",
        range: []
      },
      release: {
        data: [],
        per_page: 6, // 每页显示行数
        totalPage: 0, // 总页数
        current_page: 0, // 当前页,
        total: 0
      },
      release_failed: {
        data: [],
        per_page: 6, // 每页显示行数
        totalPage: 0, // 总页数
        current_page: 0, // 当前页,
        total: 0
      },
      ruleForm: {
        main: "", // 内容介绍
        crowd: "", // 	适用人群
        outline: "", // 课程大纲
        tel: "", // 报名联系人电话
        linkman: "", // 报名联系人
        endTime: "",
        startTime: "",
        teacher_img: "",
        name: "",
        address: "",
        area: "",
        city: "",
        province: "",
        price: "",
        diff: 0,
        theme: "",
        img_train_three: "",
        img_train_two: "",
        img_train_first: ""
      }
      // {
      //   img_exemption: "",

      // }
    };
  },
  computed: {
    uploadDisabled() {
      return type => this.ruleForm[type];
    }
  },
  mounted() {
    this.getTrain();
    this.getTrainFailed();
  },
  methods: {
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isIMAGE && isLt1M;
    },
    reasonItem(item, index) {
      let type = "release_failed";
      // type = "release";
      this[type].data = this[type].data.map((item, r_index) => {
        item.show = false;
        if (r_index == index) {
          item.show = true;
        }
        return item;
      });
      // this.$set(
      //   this[type].data,
      //   index,
      //   Object.assign({}, this[type].data[index], { show: true })
      // );
    },
    editItem(item) {
      getShowMyTrain(item.id).then(data => {
        const {
          content,
          crowd,
          outline,
          tel,
          linkman,
          endTime,
          startTime,
          teacher_img,
          name,
          address,
          province,
          area,
          city,
          price,
          theme,
          diff,
          id,
          three,
          two,
          first
        } = data;
        this.ruleForm = {
          id: id || "",
          main: content || "", // 内容介绍
          crowd: crowd || "", // 	适用人群
          outline: outline || "", // 课程大纲
          tel: tel || "", // 报名联系人电话
          linkman: linkman || "", // 报名联系人
          endTime: endTime || "",
          startTime: startTime || "",
          teacher_img: "",
          name: name || "",
          address: address || "",
          area:  area || "" || '山海关区',
          city:  city || "" || '秦皇岛市',
          province: province || "" || '河北省',
          price: price || "",
          diff: diff || 0,
          theme: theme || "",
          img_train_three: "",
          img_train_two: "",
          img_train_first: ""
        };
        this.select = {
          path: teacher_img || "",
          first: first || "",
          two: two || "",
          three: three || ""
        };
        this.origin_select = {
          path: teacher_img || "",
          first: first || "",
          two: two || "",
          three: three || ""
        }
        this.time = {
          value: {
            startTime: startTime || "",
            endTime: endTime || ""
          },
          type: "time",
          range: [startTime, endTime]
        };
      });
    },
    selectItem(item) {
      this.$router.push({
        path: `/cultivate/detail/${item.id}`
      });
    },
    getTrain(page) {
      getMyTrain(page).then(res => {
        this.release = res;
      });
    },
    getTrainFailed(page) {
      getMyTrainFailed(page).then(res => {
        this.release_failed = res;
      });
    },
    onSelected(data) {
      const { province, city, area } = data;
      this.ruleForm = Object.assign({}, this.ruleForm, {
        province: province.value,
        city: city.value,
        area: area.value
      });
    },
    sure() {
      let params = Object.assign({}, this.ruleForm, { ...this.time.value });
      let { path, first, two, three } = this.select;
      path && (params.teacher_img = path);
      first && (params.img_train_first = first);
      two && (params.img_train_two = two);
      three && (params.img_train_three = three);

      const { img_train_three, img_train_two, img_train_first } = params;

      if (img_train_three || img_train_two || img_train_first) {
        for (let p of Object.keys(params)) {
          if (
            [
              "img_train_three",
              "img_train_two",
              "img_train_first",
              "teacher_img"
            ].indexOf(p) >= 0
          )
            continue;
          if (params[p] === "") {
            this.$message({ message: "请不要留空白", type: "warning" });
            return;
            break;
          }
        }
      } else {
        this.$message({ message: "请上传课程图片", type: "warning" });
        return;
      }
      console.log(JSON.stringify(this.ruleForm, null, 4));

      if (params.id) {
        postTrainInfoUpdate(params).then(res => {
          this.$message({ message: "发布成功", type: "success" });
          this.getTrain();
          this.isSucc = true;
          this.successResetData();
          setTimeout(() => {
            this.isSucc = false;
          }, 300);
        });
      } else {
        postMytrainInfoPut(params).then(res => {
          this.$message({ message: "发布成功", type: "success" });
          this.getTrain();
          this.isSucc = true;
          this.successResetData();
          setTimeout(() => {
            this.isSucc = false;
          }, 300);
        });
      }
    },
    successResetData() {
      this.select = {
        path: "",
        first: "",
        two: "",
        three: ""
      };
      this.time = {
        value: {
          startTime: "",
          endTime: ""
        },
        type: "time",
        range: []
      };
      this.ruleForm = {
        main: "", // 内容介绍
        crowd: "", // 	适用人群
        outline: "", // 课程大纲
        tel: "", // 报名联系人电话
        linkman: "", // 报名联系人
        endTime: "",
        startTime: "",
        teacher_img: "",
        name: "",
        address: "",
        area: "",
        city: "",
        province: "",
        price: "",
        diff: 0,
        theme: "",
        img_train_three: "",
        img_train_two: "",
        img_train_first: ""
      };
    },
    selectTeacher() {
      // this.ruleForm.teacher_img = this.teacher_list.select.path;
      this.select.path = this.teacher_list.select.path;
      this.resetTeacher();
    },
    resetTeacher() {
      this.teacher_list.select = {};
      this.teacher_list.keyword = "";
      this.teacher_list.show = false;
    },
    handleSelect(item) {
      this.teacher_list.select = item;
    },

    async querySearchAsync(queryString, cb) {
      var clubLists = await this.searchClub(this.searchClubValue);
      var results = queryString
        ? clubLists.filter(this.createStateFilter(queryString))
        : clubLists;
      results = results.map(item => ({ ...item, value: item.name }));
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
        this.isSearch = false;
      }, 0);
    },
    searchClub() {
      // this.$request()
      return postShowTeacherPic({ name: this.teacher_list.keyword });
    },
    createStateFilter(queryString) {
      return state => {
        return state.name;
      };
    },
    changeTeacherFile(file, fileList) {
      if(!this.onBeforeUpload(file)){
        this.ruleForm['teacher_img'] = this.origin_select.path
        return;
      }
      this.changeFile(file, fileList, "teacher_img");
    },
    changeTrainFirstFile(file, fileList) {
      if(!this.onBeforeUpload(file)){
        this.ruleForm['img_train_first'] = this.origin_select.first
        return;
      }
      this.changeFile(file, fileList, "img_train_first");
    },
    changeTrainTwoFile(file, fileList) {
      if(!this.onBeforeUpload(file)){
        this.ruleForm['img_train_two'] = this.origin_select.two
        return;
      }
      this.changeFile(file, fileList, "img_train_two");
    },
    changeTrainThreeFile(file, fileList) {
      if(!this.onBeforeUpload(file)){
        this.ruleForm['img_train_three'] = this.origin_select.three
        return;
      }
      this.changeFile(file, fileList, "img_train_three");
    },
    changeFile(file, fileList, name) {
      // this.ruleForm[name] = file;
      // return;
      let This = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        this.result; // 这个就是base64编码了
        This.ruleForm[name] = this.result;
      };
    },
    changeTime(e) {
      if (e.length > 1) {
        this.time.name = e[0] + "/" + e[1];
        this.time.value.startTime = e[0];
        this.time.value.endTime = e[1];
      } else {
      }
    },
    changePage(val) {
      this.getTrain(val);
    },
    changePageFailed(val) {
      this.getTrainFailed(val);
    },
    changeReleasePage(val) {
      this.release.meta.currentPage = val - 1;
      const { limit, currentPage } = this.release.meta;
      this.release.list = this.paginate(
        this.record.recharge,
        limit,
        currentPage
      );
    },
    paginate(arr, limit, currentPage) {
      // 返回指定条数的数组
      arr = arr.slice(limit * currentPage, limit * (currentPage + 1));
      if (arr.length != limit) {
        let emptyArry = Array(10 - arr.length).fill(0);
        arr = [...arr, ...emptyArry];
      }
      return arr;
    }
  }
};
</script>
<style scoped>
.release >>> .el-input__inner {
  height: 30px;
}
.release >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding: 0;
}
.release >>> .disabled .el-upload--picture-card {
  display: none;
}
.release >>> .el-pager li {
  margin: 0 2px !important;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 10px;
  border-radius: 2px;
}
.release >>> .el-pagination__jump {
  margin: 0;
}
.pages {
  padding-top: 1rem;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}
</style>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.serach-wrap {
  position: relative;
  min-height: 8rem;
  .input-box {
    width: 20em;
  }
  .photo {
    position: absolute;
    left: 22em;
    top: 0;
    width: 6rem;
    height: 6rem;
  }
}
.agreen-next {
  display: flex;
  padding-top: 0.8rem;
  .next,
  .back {
    margin-right: 1rem;
    cursor: pointer;
    font-size: 0.7rem;
    padding: 0.5rem 1.18rem;
    border-radius: 0.25rem;
  }
  .next {
    background: #cde9b4;
  }
  .back {
    background: #fff;
  }
}
.release {
  color: #2c2c2c;
  font-size: 0.7rem;
  width: 60rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  margin: 0 auto;
  display: flex;
  .my {
    &.lf {
      width: 21rem;
      .apply,
      .falied {
        .header {
          background: #fff;
          height: 3.65rem;
          box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
          border-radius: 5px;
          display: flex;
          align-items: center;
          margin-bottom: 0.45rem;
          span {
            width: 100%;
            display: inline-block;
            background: #d3daae;
            font-weight: bold;
            font-size: 1rem;
            padding: 0.4rem 0 0.2rem 1rem;
          }
        }
        .no_list {
          background: #fff;
          box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
          border-radius: 5px;
          padding-top: 0.8rem;
          padding-bottom: 1.4rem;
          margin-bottom: 1.25rem;
          text-align: center;
        }
        .result {
          background: #fff;
          box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
          border-radius: 5px;
          padding-top: 0.8rem;
          padding-bottom: 1.4rem;
          margin-bottom: 1.25rem;
          min-height: 52rem;
          position: relative;
          .club-wrap {
            padding-bottom: 0rem;
            // border-bottom: 1px solid #e5e5e5;
          }
          .club {
            display: flex;
            flex-wrap: wrap;
            padding: 0.7rem 1.4rem 0.7rem 1rem;
            position: relative;
            border-bottom: 1px solid #e5e5e5;
            &:last-child {
              border: none;
            }
            .club_img {
              flex-shrink: 0;
              width: 4.15rem;
              height: 4.3rem;
              border-radius: 5px;
              position: relative;
              &:hover .item-actions {
                display: block;
              }
              &:hover .club_edit {
                display: block;
              }
              &:hover .club_view {
                display: block;
              }
              .club_view,
              .club_edit {
                color: rgb(88, 183, 8);
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                background: #fff;
                width: 3em;
                font-size: 0.7rem;
                text-align: center;
                border-radius: 5px;
                top: 30%;
                left: 50%;
                transform: translate(-50%, -50%);
                cursor: pointer;
              }
              .club_edit {
                margin-top: 2em;
              }
              .item-actions {
                display: none;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 1;
                font-size: 20px;
                background-color: rgba(0, 0, 0, 0.5);
                -webkit-transition: opacity 0.3s;
                transition: opacity 0.3s;
              }
            }
            .club_info {
              padding-left: 1rem;
              width: 14rem;
              .club_name {
                font-weight: bold;
                padding-bottom: 0.65rem;
              }
              .club_price {
              }
              .club_rate {
              }
              .club_address {
                padding-top: 0.75rem;
              }
              .time {
                position: absolute;
                right: 1.4rem;
                top: 0.7rem;
              }
            }
          }
          .reason-wrap {
            margin: 0.5rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem 1rem;
            background: #d3daae;
            .reason {
              padding-right: 1rem;
              flex-grow: 1;
              .reason-input {
                width: 100%;
              }
              .reason-text {
              }
            }
            .reason-op {
              cursor: pointer;
              width: 5em;
              flex-shrink: 0;
              text-decoration: underline;
            }
          }
        }
      }
    }
    &.rh {
      flex-grow: 1;
      .fill {
        margin-left: 2.4rem;
        .class_img {
          box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
          border-radius: 5px;
          padding: 1rem 0;
          margin-bottom: 0.3rem;
          background: #fff;
          .header {
            display: flex;
            align-items: center;
            span {
              width: 100%;
              display: inline-block;
              background: #d3daae;
              font-weight: bold;
              font-size: 1rem;
              padding: 0.4rem 0 0.2rem 1rem;
            }
          }
          .imgs {
            padding-left: 3rem;
            padding-right: 3rem;
            padding-top: 1.7rem;
            .title_tips {
              display: flex;
              align-items: center;
              padding: 0.4rem 0;
              padding-bottom: 1rem;
              .title {
                position: relative;
                &::after {
                  content: "*";
                  color: #8cd15a;
                  display: block;
                  position: absolute;
                  top: 50%;
                  left: -0.7em;
                  font-size: 1.2rem;
                  transform: translateY(-40%);
                }
              }
              .tips {
                padding-left: 0.6rem;
                font-size: 0.6rem;
                color: #c8c8c8;
              }
            }
            .upload-imgs {
              display: flex;
              justify-content: space-between;
              .upload-img {
                width: 148px;
                height: 148px;
                position: relative;
                .el-icon-delete {
                  display: none;
                }
                &:hover .item-actions {
                  display: block;
                }
                .item-actions {
                  display: none;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  cursor: default;
                  text-align: center;
                  color: #fff;
                  opacity: 1;
                  font-size: 20px;
                  background-color: rgba(0, 0, 0, 0.5);
                  -webkit-transition: opacity 0.3s;
                  transition: opacity 0.3s;
                }
                &:hover .el-icon-delete {
                  color: #fff;
                  display: block;
                  position: absolute;
                  font-size: 30px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .upload-box {
              }
            }
          }
        }
        .class_name_diff,
        .class_price_address_detail,
        .class_teacher_photo_time,
        .class_person_tel,
        .class_biref_group_detai {
          background: #fff;
          box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
          border-radius: 5px;
          padding: 1rem 0;
          margin-bottom: 0.3rem;
          padding-left: 3rem;
          padding-right: 3rem;
          .title_tips {
            display: flex;
            align-items: center;
            padding: 0.4rem 0;
            .title {
              position: relative;
              &::after {
                content: "*";
                color: #8cd15a;
                display: block;
                position: absolute;
                top: 50%;
                left: -0.7em;
                font-size: 1.2rem;
                transform: translateY(-40%);
              }
            }
            .tips {
              padding-left: 0.6rem;
              font-size: 0.6rem;
              color: #c8c8c8;
              &.teacher {
                color: #759e64;
                cursor: pointer;
              }
            }
          }
          .upload-img {
            width: 148px;
            height: 148px;
            position: relative;
            .el-icon-delete {
              display: none;
            }
            &:hover .item-actions {
              display: block;
            }
            .item-actions {
              display: none;
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              cursor: default;
              text-align: center;
              color: #fff;
              opacity: 1;
              font-size: 20px;
              background-color: rgba(0, 0, 0, 0.5);
              -webkit-transition: opacity 0.3s;
              transition: opacity 0.3s;
            }
            &:hover .el-icon-delete {
              color: #fff;
              display: block;
              position: absolute;
              font-size: 30px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .input-box {
            padding-bottom: 1rem;
          }
        }
        .form_tips {
          color: #999;
        }
      }
    }
  }
}
</style>