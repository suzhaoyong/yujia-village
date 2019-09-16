<template>
  <div style="background:#EAEAEA;">
    <div class="release">
      <div class="my lf">
        <div class="apply">
          <div class="header">
            <span>我的发布/My release</span>
          </div>
          <div class="result">
            <div class="club" v-for="item in 3">
              <div class="club_img"></div>
              <div class="club_info">
                <div class="club_name">艾扬格</div>
                <div class="club_price">￥480</div>
                <div class="club_rate">
                  <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="3"></el-rate>
                </div>
                <div class="club_address">成都市锦江区泰合国际财富中心 7 栋 302</div>
                <div class="time">发布于 2019.05.20</div>
              </div>
            </div>
            <div class="pages">
              <el-pagination
                background
                :hide-on-single-page="true"
                layout="prev, pager, next, jumper"
                :page-size="release.meta.limit"
                @current-change="changeReleasePage"
                :current-page="1"
                :total="release.meta.total"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div class="falied">
          <div class="header">
            <span>审核未通过课程/The audit failed</span>
          </div>
          <div class="result">
            <div class="club" v-for="item in 3">
              <div class="club_img"></div>
              <div class="club_info">
                <div class="club_name">艾扬格</div>
                <div class="club_price">￥480</div>
                <div class="club_rate">
                  <el-rate :colors="['#58B708','#58B708','#58B708']" disabled :value="3"></el-rate>
                </div>
                <div class="club_address">成都市锦江区泰合国际财富中心 7 栋 302</div>
                <div class="time">发布于 2019.05.20</div>
              </div>
            </div>
            <div class="pages">
              <el-pagination
                background
                :hide-on-single-page="true"
                layout="prev, pager, next, jumper"
                :page-size="release.meta.limit"
                @current-change="changeReleasePage"
                :current-page="1"
                :total="release.meta.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="my rh">
        <div class="fill">
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
                  <el-upload
                    action="#"
                    :class="{disabled:uploadExemptionDisabled('img_train_first')}"
                    :on-change="changeExemptionFile"
                    :on-remove="() => this.ruleForm['img_train_first'] = ''"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式</div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>
                <div class="upload-box">
                  <el-upload
                    action="#"
                    :class="{disabled:uploadExemptionDisabled('img_train_first')}"
                    :on-change="changeExemptionFile"
                    :on-remove="() => this.ruleForm['img_train_first'] = ''"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式</div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>
                <div class="upload-box">
                  <el-upload
                    action="#"
                    :class="{disabled:uploadExemptionDisabled('img_train_first')}"
                    :on-change="changeExemptionFile"
                    :on-remove="() => this.ruleForm['img_train_first'] = ''"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="false"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式</div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
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
              <el-input placeholder="请输入课程名称"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">难度选择</div>
              <div class="tips"></div>
            </div>
            <div class="rate-box">
              <el-rate :colors="['#58B708','#58B708','#58B708']" :value="3"></el-rate>
            </div>
          </div>
          <div class="class_price_address_detail">
            <div class="title_tips">
              <div class="title">课程价格</div>
              <div class="tips">*严禁虚标价格</div>
            </div>
            <div class="input-box">
              <el-input placeholder="请输入课程价格"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">课程价格</div>
              <div class="tips"></div>
            </div>
            <div class="select-box">
              <v-distpicker></v-distpicker>
            </div>
            <div class="title_tips">
              <div class="title">详细地址</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input placeholder="请输入详细地址"></el-input>
            </div>
          </div>
          <div class="class_teacher_photo_time">
            <div class="title_tips">
              <div class="title">授课老师姓名</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input placeholder="请输入授课老师姓名"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">授课教师图片</div>
              <div class="tips teacher">从名师库中搜索</div>
            </div>
            <div class="upload-box">
              <el-upload
                action="#"
                :class="{disabled:(uploadExemptionDisabled('img_train_first'))}"
                :on-change="changeExemptionFile"
                :on-remove="() => this.ruleForm['img_train_first'] = ''"
                list-type="picture-card"
                :limit="1"
                :auto-upload="false"
              >
                <i class="el-icon-plus"></i>
                <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
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
              <el-input placeholder="请输入报名联系人"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">联系电话</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input placeholder="请输入联系电话"></el-input>
            </div>
          </div>
          <div class="class_biref_group_detai">
            <div class="title_tips">
              <div class="title">课程大纲</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input type="textarea" placeholder="请输入课程大纲"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">适宜人群</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input placeholder="请输入适宜人群"></el-input>
            </div>
            <div class="title_tips">
              <div class="title">课程详细内容</div>
              <div class="tips"></div>
            </div>
            <div class="input-box">
              <el-input type="textarea" placeholder="请输入课程详细内容"></el-input>
            </div>
          </div>
          <div class="agreen-next">
            <div class="back">返回</div>
            <div class="next">完成</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="名师列表" :visible.sync="teacher_list.show">
      <div class="serach-wrap">
        <div class="header">授课教师名字</div>
        <div class="input-box">
          <el-autocomplete
            v-model.lazy="teacher_list.keyword"
            :trigger-on-focus="false"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="请输入授课教师名字"
          ></el-autocomplete>
        </div>
      </div>
      <span slot="footer">
        <el-button @click=" teacher_list.show = false ">取 消</el-button>
        <el-button type="primary" @click=" teacher_list.show = false ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  components: {
    VDistpicker
  },
  data() {
    return {
      teacher_list: {
        show: false,
        keyword: "",
        list: []
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
        list: [],
        count: 0,
        meta: {
          limit: 10, // 每页显示行数
          totalPage: 0, // 总页数
          currentPage: 0, // 当前页,
          total: 100
        }
      },
      ruleForm: {
        content: "", // 内容介绍
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
        diff: "",
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
    uploadExemptionDisabled() {
      return type => this.ruleForm[type];
    }
  },
  methods: {
    handleSelect(item) {
      // this.clubInfo = item;
      // this.getStaffListByClubId(item.Hsxx_Hsid);
    },

    async querySearchAsync(queryString, cb) {
      var clubLists = await this.searchClub(this.searchClubValue);
      var results = queryString
        ? clubLists.filter(this.createStateFilter(queryString))
        : clubLists;
      results = results.map(item => ({ ...item, value: item.Hsxx_Name_jch }));
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
        this.isSearch = false;
      }, 0);
    },
    searchClub() {
      // this.$request()
    },
    createStateFilter(queryString) {
      return state => {
        return state.Hsxx_Name;
      };
    },
    changeExemptionFile(file, fileList) {
      this.changeFile(file, fileList, "img_train_first");
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
}
</style>
<style lang="scss" scoped>
.agreen-next {
  display: flex;
  padding-top: 0.8rem;
  .next, .back {
    margin-right: 1rem;
    cursor: pointer;
    font-size: 0.7rem;
    padding: 0.5rem 1.18rem;
    border-radius: 0.25rem;
  }
  .next{
    background: #cde9b4;
  }
  .back{
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
        background: #fff;
        .header {
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
        .result {
          box-shadow: -1px 2px 15px 1px rgba(36, 36, 36, 0.2);
          border-radius: 5px;
          padding-top: 0.8rem;
          padding-bottom: 1.4rem;
          margin-bottom: 1.25rem;
          .club {
            display: flex;
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
            }
            .club_info {
              padding-left: 1rem;
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
          .input-box {
            padding-bottom: 1rem;
          }
        }
      }
    }
  }
}
</style>