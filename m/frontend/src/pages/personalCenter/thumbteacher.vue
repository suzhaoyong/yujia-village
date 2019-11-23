<template>
    <div>
        <van-nav-bar title="点赞的名师" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <van-list v-model="loading" :offset="30" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="teacher-content">
                <div class="teacher-card" v-for="(item,index) in thumbTeacherList" :key="index" @click="goTeacherDetail(item.id)">
                    <div class="img" :style="{backgroundImage: 'url('+ item.first_img +')'}"></div>
                    <div class="teacher-name text">{{item.name}}</div>
                    <div class="text">{{item.good_at}}</div>
                    <div class="bottom-box text">
                        <div>教龄：{{item.num}}年</div>
                        <div>
                            <van-icon name="good-job" /><span> {{item.praise}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>    
    </div>
</template>
<script>
export default {
    data() {
        return {
            thumbTeacherList: [],
            loading: false,
            finished: false,
            page: 1,
            last_page: '',
        }
    },
    created() {
        this.getTeacherThumbs();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.page++;
                this.getTeacherThumbs(this.page);
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.page >= this.last_page) {
                    this.finished = true;
                }
            }, 500);
        },
        // 获取我点赞的老师数据
        async getTeacherThumbs(page = 1) {
            const data = await this.$request.get('/personal/teacherThumbsUp/6?page=' + page);
            // console.log(data);
            const info = data.data;
            info.forEach(item => {
                if(item) {
                    this.thumbTeacherList.push(item);
                }
            });
            this.last_page = data.last_page;
        },
        // 跳转 -> 老师详情页
        goTeacherDetail(id) {
            this.$router.push({
                name: 'teacherDetails',
                query: {
                    id: id
                }
            });
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
    padding: 0 16px;
    padding-top: 10px;
    .teacher-card {
        width: 169px;
        height: 251px;
        margin-bottom: 13px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 3px 3px #c8c8c8;
        font-size: 10px;
        overflow: hidden;
        .img {
            width: 169px;
            height: 155px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .text {
            padding: 0 9px;
            padding-top: 5px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .teacher-name {
            margin-top: 15px;
            font-size: 12px;
            font-weight: 700;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .bottom-box {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
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