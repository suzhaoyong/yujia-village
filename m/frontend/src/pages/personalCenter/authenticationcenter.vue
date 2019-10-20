<template>
    <div>
        <van-nav-bar title="认证中心" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
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
                    <div class="text">负责人&教练</div>
                    <div class="en-name color3">Principal & Coach</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
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