<template>
  <div>
    <van-nav-bar title="系统消息" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="System">
        <div class="System_list">
            <div class="text">2019-05-20 09:00</div>
            <div class="System_list_item">
                <div class="System_img">
                   <img src="../../assets/teacherclub/headimg.png"/>
                </div>
                <div class="send">
                   <div class="kailong"></div>
                   <div class="send_text">恭喜您，您的认证审核已通过恭喜您，您的认证审核已通过恭喜您，您的认证审核已通过</div>
                </div>
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
    }
}
</script>
<style lang="scss" scoped>
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    font-size: 16px;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.System{
    display: flow-root;
    padding: 53px 0 0 0;
    .System_list{
        width: 93%;
        margin: 0 auto;
        height: auto;
        margin-bottom: 10px;
        .text{
            text-align: center;
            font-size:11px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(153,153,153,1);
            margin-top: 13px;
            margin-bottom: 13px;
         }
         .System_list_item{
             display: flex;
            .System_img{
                width: 16%;
                img{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }   
            .send{
                position:relative;
                width:70%;
                height:auto;
                background:#fff;
                border-radius:5px;
                margin-left: 6px;
                line-height: 20px;
                margin-bottom: 10px;
                .send_text{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(153,153,153,1);
                margin: 10px;
                }
                .kailong {
                position: absolute;
                top: 10px;
                left: -16px;
                width: 0;
                height: 0;
                font-size: 0;
                border: solid 8px;
                border-color: #eee #fff #eee #eee;
                }
              }
       }
    }
}
</style>