<template>
  <div id="login-view">
    <p class="merchant-name">Back-office management center</p>
    <div class="login-region">
      <div class="login-input">
        <div class="login-type">
          <p
            v-for="(item, index) in loginType"
            :key="index"
            :class="{ activeIndex: index === loginTypeIndex }"
            @click="loginTypeIndex = index"
          >
            {{ item }}
          </p>
        </div>
        <!--账号登录-->
        <div v-if="loginTypeIndex === 0">
          <div class="input-value">
            <span>邮箱</span>
            <el-input placeholder="输入邮箱" v-model="emailNumber" />
          </div>
          <div class="input-value">
            <span>密码</span>
            <el-input
              placeholder="输入密码"
              v-model="PassWard"
              type="password"
            />
          </div>
        </div>
        <!--验证码登录-->
        <div v-if="loginTypeIndex === 1">
          <div class="input-value">
            <span>邮箱</span>
            <el-input placeholder="输入邮箱" v-model="emailNumber" />
          </div>
          <div class="input-value">
            <span>密码</span>
            <el-input placeholder="输入验证码" v-model="CodeVal" />
            <!-- <el-button link class="code-style">发送验证码</el-button> -->
          </div>
        </div>
        <!--密码登录按钮---->
        <el-button
          v-if="loginTypeIndex === 0"
          class="login-button"
          type="primary"
          size="large"
          @click="Check"
          :loading="phoneLoding"
          >登录</el-button
        >
        <!--验证码登录按钮---->
        <el-button
          v-if="loginTypeIndex === 1"
          class="login-button"
          type="primary"
          size="large"
          @click="Check"
          >注册</el-button
        >
        <!-- <el-button type="primary" class="login-button" size="large" @click=""
          >注册</el-button
        > -->
        <div v-if="loginTypeIndex === 2"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { emailCheck, passWordCheck } from "@/common/check";
import { loginApi } from "@/common/api";
import { useRouter } from "vue-router";
import { user } from "@/store/Store";
const userStore = user(); // 实例化 store
const $router = useRouter();
const loginType = ref(["账号登录", "注册"]);
const loginTypeIndex = ref(0);
const emailNumber = ref("");
const PassWard = ref("");
const CodeVal = ref("");
// 创建一个用户

const Check = () => {
  try {
    emailCheck(emailNumber.value);
    passWordCheck(PassWard.value);
    emailLoginApi();
  } catch (error: any) {
    console.log(error.message);
  }
};
const phoneLoding = ref(false);
const emailLoginApi = async () => {
  phoneLoding.value = true;
  try {
    const res = await loginApi({
      EMAIL: emailNumber.value,
      PASSWORD: PassWard.value,
    });
    // localStorage.setItem("userInfo", JSON.stringify(res.data.token));

    // Cookies.set("token", res.data.token);
    console.log(res);
    userStore.setData(res.data);
    console.log(userStore.data);
    $router.push("/index");
    phoneLoding.value = false;
  } catch (error) {
    phoneLoding.value = false;
  }
};
</script>

<style scoped>
#login-view::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("../../assets/wallhaven-gp17xe.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* filter: blur(2px) brightness(90%); */
  z-index: -1;
}
#login-view {
  position: relative;
  min-height: 100vh;
}
/* #login-view {
  background-image: url("../../assets/wallhaven-1pol63.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
} */

.login-region {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.merchant-name {
  text-align: center;
  font-size: 40px;
  font-family: "Algerian";
  padding-top: 40px;
  color: white;
}
.login-input {
  background-color: rgba(255, 255, 255, 1);
  width: 400px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: -9px 10px 0px 5px rgba(0, 0, 0, 0.3);
  /* border: #ccc solid 2px; */
}
.login-type {
  display: flex;
  justify-content: space-around;
}
.activeIndex {
  border-bottom: rgb(13, 80, 175) solid 3px;
}
.login-type p {
  cursor: pointer;
  padding-bottom: 6px;
}
.input-value {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}

.input-value span {
  width: 60px;
}

.input-value .el-input {
  flex: 1;
}

/* .input-value .el-input >>> .el-input__wrapper {
  box-shadow: none;
  background: none;
} */
.input-value .el-text {
  width: auto !important;
  cursor: pointer;
}

.code-style {
  color: rgb(23, 136, 248);
  background: none;
  border: none;
}

.code-style span {
  font-size: 14px !important;
}

.login-button {
  width: 90%;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
