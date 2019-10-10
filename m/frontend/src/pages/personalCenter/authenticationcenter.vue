<template>
    <div>
        <van-nav-bar title="认证中心" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="notice">注：普通用户无须认证，该认证仅面向馆主、教练等专业群体</div>
        <div class="swiper-picture">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="../../assets/img/hunker1.png" alt="">
                        <div class="identity-box">我是馆主</div>
                    </div>
                    <div class="swiper-slide">
                        <img src="../../assets/img/hunker2.png" alt="">
                        <div class="identity-box">我是教练</div>
                    </div>
                    <div class="swiper-slide">
                        <img src="../../assets/img/hunker3.png" alt="">
                        <div class="identity-box">馆主&教练</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rz-content">
            <div class="owner" v-if="slideIndex==0">
                <van-field v-model="ownerDataList.username" clearable input-align="right" label="真实姓名" placeholder="姓名" />
                <van-field v-model="ownerDataList.hall" clearable input-align="right" label="会馆名称" placeholder="会馆" />
                <van-field v-model="ownerDataList.tel" clearable input-align="right" label="会馆电话" placeholder="电话" />
                <van-field v-model="ownerDataList.provinces" clearable input-align="right" label="会馆地区" placeholder="选择省/市/区" @focus="focus"/>
                <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
                </van-popup>
                
                <van-field v-model="ownerDataList.address" clearable input-align="right" label="详细地址" placeholder="街道门牌等" />
            </div>
            <div class="coach" v-if="slideIndex==1">
                <van-field v-model="coachDataList.username" clearable input-align="right" label="真实姓名" placeholder="姓名" />
                <van-field v-model="coachDataList.seniority" clearable input-align="right" label="教龄" placeholder="教龄" />
                <van-field v-model="coachDataList.type" clearable input-align="right" label="擅长类型" placeholder="瑜伽流派" />
                <van-field v-model="coachDataList.intro" type="textarea" autosize clearable placeholder="个人简介" />
            </div>
            <div class="owner-coach" v-if="slideIndex==2">
                <van-field v-model="ownerAndCoachList.username" clearable input-align="right" label="真实姓名" placeholder="姓名" />
                <van-field v-model="ownerAndCoachList.hall" clearable input-align="right" label="会馆名称" placeholder="会馆" />
                <van-field v-model="ownerAndCoachList.tel" clearable input-align="right" label="会馆电话" placeholder="电话" />
                <van-field v-model="ownerAndCoachList.address" clearable input-align="right" label="会馆地址" placeholder="地址" />
                <van-field v-model="ownerAndCoachList.seniority" clearable input-align="right" label="教龄" placeholder="教龄" />
                <van-field v-model="ownerAndCoachList.type" clearable input-align="right" label="擅长类型" placeholder="瑜伽流派" />
                <van-field v-model="ownerAndCoachList.intro" type="textarea" autosize clearable placeholder="个人简介" />
            </div>
        </div>
        <van-button class="submit" type="primary" @click="submit">提交认证</van-button>
    </div>
</template>
<script>
import Swiper from 'swiper';
import areaList from "../../assets/js/area.js";
export default {
    data() {
        return {
            areaList,
            show: false,
            ownerDataList: {
                username:'',
                hall: '',
                tel: '',
                provinces: '',
                address: ''
            },
            coachDataList: {
                username: '',
                seniority: '',
                type: '',
                intro: ''
            },
            ownerAndCoachList: {
                username:'',
                hall: '',
                tel: '',
                address: '',
                seniority: '',
                type: '',
                intro: ''
            },
            // slide的索引
            slideIndex: ''
        }
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
        focus() {
            this.show = true;
        },
        onConfirm(area) {
            if(area[0].name === area[1].name) {
                this.ownerDataList.provinces = area[0].name + '/' + area[2].name;
            } else {
                this.ownerDataList.provinces = area[0].name + '/' + area[1].name + '/' + area[2].name;
            }
            this.show = false;
        },
        onCancel() {
            this.show = false;
        },
        submit() {
            console.log('提交成功');
        }
    }
}
</script>
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
} 
.submit {
    width: 343px;
    margin: 20px 16px;
}
</style>