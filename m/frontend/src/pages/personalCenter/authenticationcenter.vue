<template>
    <div>
        <van-nav-bar title="认证中心" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="notice">注：普通用户无须认证，该认证仅面向机构负责人、教练等专业群体</div>
        <div class="swiper-picture">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="../../assets/img/hunker1.png" alt="">
                        <div class="identity-box">我是机构负责人</div>
                    </div>
                    <div class="swiper-slide">
                        <img src="../../assets/img/hunker2.png" alt="">
                        <div class="identity-box">我是教练</div>
                    </div>
                    <div class="swiper-slide">
                        <img src="../../assets/img/hunker3.png" alt="">
                        <div class="identity-box">机构负责人&教练</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rz-content">
            <div class="owner" v-if="slideIndex==0">
                <van-field v-model="ownerDataList.real_name" clearable input-align="right" label="真实姓名" placeholder="只能是中文或者英文" @blur="onBlur"/>
                <van-field v-model="ownerDataList.club_name" clearable input-align="right" label="机构名称" placeholder="由中文、字母、数字组成" @blur="onBlur"/>
                <van-field v-model="ownerDataList.club_tel" type="tel" clearable input-align="right" label="机构电话" placeholder="电话" @blur="onBlur"/>
                <van-field v-model="region_a" readonly input-align="right" label="机构地区" placeholder="选择省/市/区" @focus="focus"/>
                <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
                </van-popup>
                <van-field v-model="ownerDataList.address" clearable input-align="right" label="详细地址" placeholder="街道门牌等" />
                <div class="upload-license">
                    <div class="license">请上传营业执照</div>
                    <div class="upload">
                        <van-uploader v-model="fileList1" :after-read="afterRead" :max-count="1"
                        :max-size="4096000" accept="image/gif, image/jpeg ,image/png" @oversize="overSize" @delete="onDel"/>
                    </div>
                </div>
            </div>
            <div class="coach" v-if="slideIndex==1">
                <van-field v-model="coachDataList.real_name" clearable input-align="right" label="真实姓名" placeholder="只能是中文或者英文" @blur="onBlur"/>
                <van-field v-model="coachDataList.club_name" clearable input-align="right" label="机构名称" placeholder="由中文、字母、数字组成" @blur="onBlur"/>
                <van-field v-model="coachDataList.club_tel" type="tel" clearable input-align="right" label="机构电话" placeholder="电话" @blur="onBlur"/>
                <van-field v-model="region_b" readonly input-align="right" label="机构地区" placeholder="选择省/市/区" @focus="focus"/>
                <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
                </van-popup>
                <van-field v-model="coachDataList.address" clearable input-align="right" label="详细地址" placeholder="街道门牌等" />
                <div class="upload-license">
                    <div class="license">请上传瑜伽毕业证书</div>
                    <div class="upload">
                        <van-uploader v-model="fileList2" :after-read="afterRead" :max-count="1"
                        :max-size="4096000" accept="image/gif, image/jpeg ,image/png" @oversize="overSize" @delete="onDel"/>
                    </div>
                </div>
            </div>
            <div class="owner-coach" v-if="slideIndex==2">
                <van-field v-model="ownerAndCoachList.real_name" clearable input-align="right" label="真实姓名" placeholder="只能是中文或者英文" @blur="onBlur"/>
                <van-field v-model="ownerAndCoachList.club_name" clearable input-align="right" label="机构名称" placeholder="由中文、字母、数字组成" @blur="onBlur"/>
                <van-field v-model="ownerAndCoachList.club_tel" type="tel" clearable input-align="right" label="机构电话" placeholder="电话" @blur="onBlur"/>
                <van-field v-model="region_c" readonly input-align="right" label="机构地区" placeholder="选择省/市/区" @focus="focus"/>
                <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
                </van-popup>
                <van-field v-model="ownerAndCoachList.address" clearable input-align="right" label="详细地址" placeholder="街道门牌等" />
                <div class="upload-license">
                    <div class="license">请上传营业执照以及瑜伽毕业证书</div>
                    <div class="upload">
                        <van-uploader v-model="fileList3" :after-read="afterRead" :max-count="2" multiple
                        :max-size="4096000" accept="image/gif, image/jpeg ,image/png" @oversize="overSize" @delete="onDel"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- <van-dialog v-model="isshowFile" title="瑜伽村平台认证服务协议">
            <div style="height:400px;overflow: scroll;">
                <div id="pdf"></div>
            </div>
        </van-dialog> -->
        <!-- <div class="dialog" v-if="isshowFile">
            <div id="pdf"></div>
        </div> -->
        <van-button class="submit" :disabled="isDisabled" @click="submit(slideIndex)">
            {{isDisabled ? '您已提交认证，不能再次认证...' : '提交认证'}}
        </van-button>
        <div class="agreement">
            <van-checkbox v-model="checked" checked-color="#CCE198"></van-checkbox>
            <div>
                <span class="agreed">同意</span>
                <span @click="showFile">《瑜伽村平台认证服务协议》</span>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import Pdfh5 from "pdfh5";
import "pdfh5/css/pdfh5.css";

import areaList from "../../assets/js/area.js";
export default {
    data() {
        return {
            areaList,
            show: false,
            fileList1: [],
            fileList2: [],
            fileList3: [],
            checked: true,
            // 是否显示 协议 pdf
            isshowFile: false,
            pdfh5: null,
            // 认证机构负责人需要提交的 数据列表
            ownerDataList: {
                identity_auth: '',
                real_name:'',
                club_name: '',
                club_tel: '',
                province: '',
                city: '',
                area: '',
                address: '',
                img_work: '',
                img_license: ''
            },
            coachDataList: {
                identity_auth: '',
                real_name:'',
                club_name: '',
                club_tel: '',
                province: '',
                city: '',
                area: '',
                address: '',
                img_work: '',
                img_license: ''
            },
            ownerAndCoachList: {
                identity_auth: '',
                real_name:'',
                club_name: '',
                club_tel: '',
                province: '',
                city: '',
                area: '',
                address: '',
                img_work: '',
                img_license: ''
            },
            // 渲染地区数据
            region_a: '',
            region_b: '',
            region_c: '',
            // slide的索引
            slideIndex: '',
            // 多选图片时，图片名保存的数组
            picNameArr: [],
        }
    },
    created() {
        this.loadProtocolFile();
    },
    mounted() {
        const that = this;
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            on: {
                slideChangeTransitionEnd: function() {
                    // console.log(this.realIndex);  //切换结束时，告诉我现在是第几个slide, loop模式下用 realIndex
                    that.slideIndex = this.realIndex;
                    console.log(that.slideIndex)
                },
            },
        });
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 输入款失去焦点时，校验
        onBlur() {
            const name = /^([\u4e00-\u9fa5]{2,16}|[\u4E00-\u9FA5\·]{2,16}|[a-zA-Z.·\s]{2,16})$/;
            const hallName =  /^[\u4e00-\u9fa5a-zA-Z0-9]{2,16}$/;
            const tel = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
            if(this.slideIndex == 0) {
                this.validationRules(this.ownerDataList, name, hallName, tel);
            } else if(this.slideIndex == 1) {
                this.validationRules(this.coachDataList, name, hallName, tel);
            } else {
                this.validationRules(this.ownerAndCoachList, name, hallName, tel);
            }
        },
        // 验证规则
        validationRules(identity,name,hallName,tel) {
            if(identity.real_name) {
                if(!name.test(identity.real_name)) {
                    this.$toast({
                        message: '姓名格式输入错误！，长度为2~16位',
                    });
                }
            }
            if(identity.club_name) {
                if(!hallName.test(identity.club_name)) {
                    this.$toast({
                        message: '会馆名称格式错误！长度为2~16位',
                    });
                }
            }
            if(identity.club_tel) {
                if(!tel.test(identity.club_tel)) {
                    this.$toast({
                        message: '电话号码输入错误！',
                    });
                }
            }
        },
        focus() {
            this.show = true;
        },
        // 点解确认，处理地区的显示
        onConfirm(area) {
            if(this.slideIndex == 0) {
                this.region_a = this.showArea(this.region_a, this.ownerDataList, area);   
            } else if(this.slideIndex == 1) {
                this.region_b = this.showArea(this.region_b, this.coachDataList, area); 
            } else {
                this.region_c = this.showArea(this.region_c, this.ownerAndCoachList, area);
            }
            this.show = false;
        },
        // 渲染地区
        showArea(provinces, identity, area) {
            if(area[0].name === area[1].name) {
                provinces = area[0].name + '/' + area[2].name;
            } else {
                provinces = area[0].name + '/' + area[1].name + '/' + area[2].name;
            }
            identity.province = area[0].name;
            identity.city = area[1].name;
            identity.area = area[2].name;
            return provinces;  // 把地区数据 返回给 双向绑定的数据，不然双向绑定的数据为空
        },
        // 取消
        onCancel() {
            this.show = false;
        },
        // 图片上传之后的 回掉函数
        afterRead(fileInfo, name) {
            console.log(fileInfo,name);
            let that = this;
            // const nameArr = [];
            if(fileInfo.length == 2) {
                // nameArr.push(fileInfo[0].file.name);
                // nameArr.push(fileInfo[1].file.name);
                // this.picNameArr = nameArr;
                // console.log(nameArr);
                
                lrz(fileInfo[0].file).then(rst => {
                    that.ownerAndCoachList.img_work = rst.base64;
                })
                .catch(function (err) {
                    alert(err);
                });
                lrz(fileInfo[1].file).then(rst => {
                    that.ownerAndCoachList.img_license = rst.base64;
                })
                .catch(function (err) {
                    alert(err);
                })
            } else {
                lrz(fileInfo.file).then(rst => {
                // console.log(rst.file); 压缩之后的 文件信息
                // console.log(rst.base64); 压缩之后的 base64
                    if(that.slideIndex == 0) {
                        that.ownerDataList.img_work = rst.base64
                    } else if (that.slideIndex == 1) {
                        that.coachDataList.img_license = rst.base64
                    } else {
                        if(that.ownerAndCoachList.img_work === '') {
                            that.ownerAndCoachList.img_work = rst.base64
                        } else {
                            that.ownerAndCoachList.img_license = rst.base64
                        } 
                        
                    }
                })
                .catch(function (err) {
                    alert(err);
                })
            }
            
        },
        onDel(fileInfo,detail) {
            // console.log(fileInfo, detail);
            if(this.slideIndex == 0) {
                this.ownerDataList.img_work = ''
            } else if(this.slideIndex == 1) {
                this.coachDataList.img_license = ''
            } else {
                
                if(detail.index == 0 && this.ownerAndCoachList.img_work !== '') {
                    this.ownerAndCoachList.img_work = '';
                } else {
                    this.ownerAndCoachList.img_license = ''
                }
            }
            
        },
        // 文件超过限制大小 
        overSize(file) {
            this.$toast({
                message: '图片大小不能超过4M',
            });
        },
        showFile() {
            this.isshowFile = true;
        },
        // 展示 协议文件
        loadProtocolFile() {
            // this.pdfh5 = new Pdfh5('#pdf',{
            //     pdfurl:  "../../../static/doc/瑜伽村平台认证服务协议.pdf"
            // })
            // this.pdfh5.on("complete", function(status, msg, time) {
            //     console.log(
            //     "状态：" +
            //         status +
            //         "，信息：" +
            //         msg +
            //         "，耗时：" +
            //         time +
            //         "毫秒，总页数：" +
            //         this.totalNum
            //     );
            // });
        },
        submit() {
            
            if(this.checked) {
                if(this.slideIndex == 0) {
                    this.ownerDataList.identity_auth = 2;
                     console.log(this.ownerDataList);
                } else if(this.slideIndex == 1) {
                    this.coachDataList.identity_auth = 4;
                } else if(this.slideIndex == 2) {
                    this.ownerAndCoachList.identity_auth = 7;
                    console.log(this.ownerAndCoachList);
                } 
                

            } else {
                this.$toast({
                    message: '请阅读并勾选瑜伽村平台认证服务协议',
                });
            }
        },
        // 表单验证不为空
        formVerify(submitData, file) {
            if(submitData.real_name === '') {
                this.$toast('真实姓名不能为空！')
                return -1
            } 
            if(submitData.club_name === '') {
                this.$toast('机构名不能为空！')
                return -1
            } 
            if(submitData.club_tel === '') {
                this.$toast('机构电话不能为空！')
                return -1
            } 
            if(submitData.province === '') {
                this.$toast('请填写机构所在地区！')
                return -1
            } 
            if(submitData.address === '') {
                this.$toast('请填写机构的详细地址！')
                return -1
            } 
            if(file.length === 0) {
                this.$toast('请上传认证图片！')
                return -1
            } 
            if(this.slideIndex == 2) {
                if(file.length !== 2) {
                    this.$toast('上传的图片资料至少2张！')
                    return -1
                }
            }
        },
        // 认证
        identityVerify(submitList) {
            this.$request.post('/personal/home',submitList).then(data => {
                console.log(data);
                if(data.msg == 'OK') {
                    this.$toast('资料已上传，请耐心等候...');
                    this.isDisabled = true;
                }
            })
        }
    }
}
</script>
<style lang="scss">
.upload {
    .van-uploader__preview {
        margin-bottom: 0;
        height: 80px;
        .van-icon{
            position: absolute;
            font-size: 20px;
            vertical-align: middle;
        }
    }
}
</style>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    z-index: 99 !important;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.notice {
    position: fixed;
    top: 46px;
    width: 100%;
    height: 25px;
    padding-left: 16px; 
    line-height: 25px;
    background-color: #CCE198;
    color: #fff;
    font-size: 11px;
    z-index: 99;
}
.swiper-picture {
    height: 250px;
    margin-top: 71px;
    padding: 10px 0 20px 0;
    background-color: #fff;
    .swiper-slide {
        width: 163px;
        height: 220px;
        margin-right: 12px;
        transition: 300ms;
	    transform: scale(0.9);
        .identity-box {
            position: absolute;
            top: 170px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            background-color: rgba(255,255,255,0.5);
            font-size: 12px;
            text-align: center;
            box-shadow: 0px 3px 3px rgba(0,0,0,0.2);
        }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
	}
}
.rz-content {
    border-top: 1px solid #eee;
    background-color: #fff;
    .upload-license {
        .license {
            padding-left: 16px;
            margin-top: 9px;
            height: 44px;
            line-height: 44px;
            background-color: #eee;
            font-size: 12px;
        }
        .upload {
            padding: 13px 16px;
            /deep/ .van-uploader__upload {
                margin-bottom: 0;
            }
        }
    }
} 
#pdf {
    height: 400px;
}
.dialog {
    position: fixed;
    top: 5%;
    left: 50%;
    z-index: 999;
    transform: translateX(-50%);
    width: 320px;
    height: 500px;
    background-color: #fff;
}
.submit {
    height: 44px;
    line-height: 44px;
    background-color: #CCE198;
    text-align: center;
    font-size: 12px;
}
.agreement {
    display: flex;
    justify-content: center;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    font-size: 12px;
    color: #619C39;
    .agreed {
        margin-left: 5px;
        color: #2c2c2c;
    }
}
</style>