<template>
    <div>
        <van-nav-bar title="认证中心" left-arrow @click-left="onClickLeft">
            <div class="prompt" slot="right" @click="showFile">
                <!-- <img src="../../assets/img/sz3.gif" alt=""> -->
                <van-icon name="question-o" color="#72BC46"/>
            </div>
        </van-nav-bar>
        <van-popup 
            v-model="isshowFile"
            :style="{ height: '70%', width: '80%' }"
            round
        >
            <div class="showtext" v-html="editor_html">
            </div>
        </van-popup>
        <div class="notice">注：普通用户无须认证，该认证仅面向馆主、教练等专业群体</div>
        <div class="pic-box">
            <div class="bgc hunker1" @click="goFormSubmit('principal')">
                <div class="identity border-color">
                    <div class="text">机构负责人</div>
                    <div class="en-name color1">I am in charge</div>
                </div>
            </div>
            <div class="bgc hunker2" @click="goFormSubmit('coach')">
                <div class="identity border-color">
                    <div class="text">我是教练</div>
                    <div class="en-name color2">I am a coach</div>
                </div>
            </div>
            <div class="bgc hunker3" @click="goFormSubmit('both')">
                <div class="identity border-color">
                    <div class="text">我是导师</div>
                    <div class="en-name color3">I am a teacher</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            isshowFile: false,
            editor_html: `<p>
    <p></p>
    <p><h4 style='text-align: center; font-size: 16px; font-weight: bold' >机构认证</h4>
    <p'>您好，欢迎您参与中国瑜伽村机构认证！</p>
    <p>中国瑜伽村，全国培训信息最丰富的瑜伽行业平台。 </p>
    认证机构参与积分兑换，可兑换中国瑜伽村手机端和网络端广告位展示，获得更多曝光机会。
    您的机构在中国瑜伽村平台获取点赞数越多，机构展示排名越靠前，可让更多人关注您的机构。
    <p>感谢您的加入！</p></p>
    <p> </p>
    <p><h4 style='text-align: center; font-size: 16px; font-weight: bold'>教练认证</h4>
    <p>您好，欢迎您参与中国瑜伽村教练认证！ </p>
    中国瑜伽村，全国培训信息最丰富的瑜伽行业平台。
    认证教练可参与积分兑换,兑换丰富的瑜伽课程及活动礼遇.
    享受中国瑜伽村教练专属瑜伽用品及课程折扣.
    <p> 感谢您的加入！</p></p>
    <p> </p>
    <p><h4 style='text-align: center; font-size: 16px; font-weight: bold'>导师认证</h4>
    <p> 您好，欢迎您参与中国瑜伽村导师认证！</p>
    中国瑜伽村，全国培训信息最丰富的瑜伽行业平台。
    认证导师可展示您更详细全面的瑜伽培训信息，让更多机构发现您。
    您获取的点赞数越多，排名越靠前，可让更多人关注您，参与您的课程。
    参与积分换礼，可兑换瑜伽礼品及活动礼遇。
    <p> 感谢您的加入！</p></p></p>
`,
        }
    },
    methods: {
        showFile() {
            this.isshowFile = true
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        goFormSubmit(keyword) {
            this.$router.push({
                name: 'authenticationForm',
                query: {
                    key: keyword
                }
            })
        }, 
    }
}
</script>
<style lang="scss" scoped>
.prompt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: red;
    height: 44px;
}
.showtext {
    font-size: 14px;
    padding: 14px;
    p {
        font-size: 12px;
    }
    h4 {
        text-align: center;
        font-size: 16px;
    }
}
.notice {
    width: 100%;
    height: 25px;
    padding-left: 16px; 
    line-height: 25px;
    background-color: #CCE198;
    color: #fff;
    font-size: 11px;
}
.pic-box {
    padding: 0 16px;
    padding-top: 20px;
    .hunker1 {
        background: url('../../assets/img/hunker1.png') no-repeat;
        .border-color {
            border-left: 5px solid #004D54;
        }
    }
    .hunker2 {
        background: url('../../assets/img/hunker2.png') no-repeat;
        .border-color {
            border-left: 5px solid #CE5722;
        }
    }
    .hunker3 {
        background: url('../../assets/img/hunker3.png') no-repeat;
        .border-color {
            border-left: 5px solid #93D4B9;
        }
    }
    .bgc {
        position: relative;
        width: 343px;
        height: 159.5px;
        margin-bottom: 15px;
        border-radius: 10px;
        background-size: cover;
        box-shadow:2px 0px 6px 0px rgba(0, 0, 0, 0.15);
        .identity {
            position: absolute;
            top: 50%;
            left: 210px;
            transform: translateY(-50%);
            padding-left: 8px;
            height: 36px;
            .text {
                font-size: 16px;
                font-weight: 700;
            }
            .en-name {
                font-size: 12px;
            }
            .color1 {
                color: #004D54;
            }
            .color2 {
                color: #CE5722;
            }
            .color3 {
                color: #93D4B9;
            }
        }
        
    }
}

</style>