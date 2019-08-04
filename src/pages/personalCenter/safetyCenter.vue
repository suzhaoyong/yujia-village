<template>
  <div>
    <div class="safe">
      <session-title name="信息与安全中心"></session-title>
      <div class="body">
        <div class="tabs">
          <div class="tab active">修改密码</div>
          <div class="tab">修改绑定手机</div>
        </div>
        <div class="content">
          <div class="edit-password" v-show="false">
            <div class="form">
              <div class="item">
                <span class="title">旧密码</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips"></div>
                </div>
              </div>
              <div class="item">
                <span class="title">新密码</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips">密码错误</div>
                </div>
              </div>
              <div class="item">
                <span class="title">二次确认</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips">密码错误</div>
                </div>
              </div>
              <div class="submit">
                <div class="btn">返回</div>
                <div class="btn">更改</div>
              </div>
            </div>
            <div class="tips">
              <span>忘记密码？更换验证方式</span>
            </div>
          </div>
          <div class="edit-password-by-code" v-show="false">
            <div class="form">
              <div class="item">
                <span class="title">验证码</span>
                <div class="form_input">
                  <input type="text" class="form-control input" placeholder="请输入验证码" />
                  <div class="getcode">发送验证码</div>
                  <div class="form_input-tips">密码错误</div>
                </div>
              </div>
              <div class="item">
                <span class="title">新密码</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips">密码错误</div>
                </div>
              </div>
              <div class="item">
                <span class="title">二次确认</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips">密码错误</div>
                </div>
              </div>
              <div class="submit">
                <div class="btn">返回</div>
                <div class="btn">更改</div>
              </div>
            </div>
            <div class="tips">
              <span>您当前手机号:</span>
              <br />
              <span>152*****093</span>
            </div>
          </div>
          <div class="edit-phone" v-show="false">
            <div class="form">
              <div class="item">
                <span class="title">验证码</span>
                <div class="form_input">
                  <input type="text" class="form-control input" placeholder="请输入验证码" />
                  <div class="getcode">发送验证码</div>
                  <div class="form_input-tips">密码错误</div>
                </div>
              </div>
              <div class="item">
                <span class="title">新手机号</span>
                <div class="form_input">
                  <input type="text" class="form-control input" placeholder="请输入新手机号" />
                  <div class="form_input-tips">密码错误</div>
                </div>
              </div>
              <div class="submit">
                <div class="btn">返回</div>
                <div class="btn">更改</div>
              </div>
            </div>
            <div class="tips">
              <span>您当前手机号:</span>
              <br />
              <span>152*****093</span>
            </div>
          </div>
          <div class="success">
            <span>更改成功！</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
export default {
  components: {
    SessionTitle
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.safe {
  width: 60rem;
  margin: 0 auto;
  .body {
    display: flex;
    padding-bottom: 5rem;
    .tabs {
      font-size: 0.7rem;
      .tab {
        cursor: pointer;
        margin-bottom: 1.55rem;
        &.active {
          font-weight: 800;
          position: relative;
          z-index: 4;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: -0.4rem;
            transform: translateY(-50%);
            width: 0.2rem;
            height: 0.7rem;
            background: #2c2c2c;
          }
          &::after {
            content: "";
            display: block;
            position: absolute;
            left: -0.35rem;
            top: 0;
            background: rgba(0, 0, 0, 0.3);
            background: linear-gradient(to right, #afafaf 0%, #ffffff 100%);
            z-index: -1;
            width: 100%;
            height: 100%;
          }
        }
      }
      padding-right: 4.85rem;
    }
    .content {
      border: 1px solid #ccc;
      box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
      border-radius: 0.25rem;
      width: 40rem;
      padding: 2.4rem 1.5rem 1.5rem;
      font-size: 0.7rem;
      .success {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          padding-top: 1.4rem;
          padding-bottom: 2.5rem;
          font-weight: 800;
        }
      }
      .edit-password,
      .edit-password-by-code,
      .edit-phone {
        display: flex;
        .form {
          .item {
            display: flex;
            .title {
              width: 5em;
              line-height: 1.85rem;
              text-align: right;
              padding-right: 0.5rem;
            }
            .input {
              width: 22rem;
              height: 1.85rem;
              font-size: 0.7rem;
              padding-left: 0.6rem;
              overflow: hidden;
            }
            .form_input {
              position: relative;
            }
            .getcode {
              position: absolute;
              top: 0;
              right: 0;
              height: 1.85rem;
              line-height: 1.85rem;
              border-radius: 0.25rem;
              padding: 0 0.85rem;
              border: 1px solid #dcdcdc;
            }
            .form_input-tips {
              color: #d83211;
              padding-top: 0.2rem;
              padding-left: 0.6rem;
              height: 1.8rem;
            }
          }
          .submit {
            display: flex;
            justify-content: center;
            .btn {
              cursor: pointer;
              border: 1px solid #7d7d7d;
              padding: 0.55rem 1.95rem;
              &:first-child {
                margin-right: 2.45rem;
              }
            }
          }
        }
        .tips {
          margin-left: 2.3rem;
          cursor: pointer;
        }
      }
      .edit-phone,
      .edit-password-by-code {
        .form {
          .title {
          }
          .getcode {
          }
          .form-control {
          }
          .submit {
            .btn {
            }
          }
        }
        .tips {
          padding-top: 2rem;
          span {
            &:nth-of-type(2) {
              display: block;
              padding-top: 0.4rem;
              font-weight: 800;
            }
          }
        }
      }
    }
  }
}
</style>

