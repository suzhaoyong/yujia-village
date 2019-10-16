<template>
    <div>
        <van-nav-bar title="点赞的名师" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="teacher-content">
            <div class="teacher-card">
                <div class="img"></div>
                <div class="teacher-name text">Ivan</div>
                <div class="text">流瑜伽</div>
                <div class="bottom-box text">
                    <div>教龄：5年</div>
                    <div>
                        <van-icon name="good-job" /><span> 554</span>
                    </div>
                </div>
            </div>
            <div class="teacher-card">
                <div class="img"></div>
                <div class="teacher-name text">Ivan</div>
                <div class="text">流瑜伽</div>
                <div class="bottom-box text">
                    <div>教龄：5年</div>
                    <div>
                        <van-icon name="good-job" /><span> 554</span>
                    </div>
                </div>
            </div>
            <div class="teacher-card">
                <div class="img"></div>
                <div class="teacher-name text">Ivan</div>
                <div class="text">流瑜伽</div>
                <div class="bottom-box text">
                    <div>教龄：5年</div>
                    <div>
                        <van-icon name="good-job" /><span> 554</span>
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
            thumbTeacherList: {}
        }
    },
    created() {
        this.getTeacherThumbs();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 获取我点赞的老师数据
        async getTeacherThumbs() {
            const data = await this.$request.get('/personal/teacherThumbsUp');
            console.log(data);
            this.thumbTeacherList = data.data;
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
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.teacher-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 46px;
    padding: 6px 16px;
    .teacher-card {
        width: 169px;
        height: 251px;
        margin-bottom: 13px;
        background-color: #fff;
        border-radius:5px;
        box-shadow: 0px 3px 3px #c8c8c8;
        font-size: 10px;
        .img {
            width: 169px;
            height: 155px;
            background-color: pink;
        }
        .text {
            padding: 0 9px;
        }
        .teacher-name {
            margin-top: 24px;
            font-size: 12px;
            font-weight: 700;
        }
        .bottom-box {
            display: flex;
            justify-content: space-between;
            margin-top: 13px;
            .van-icon {
                font-size: 16px;
                vertical-align: sub;
            }
            span {
                padding-top: 2px;
            }
        }
    }
}
</style>