<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts"></script>

<style>
/*全局样式*/
body,
html,
#app {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
p,
div,
span {
  font-size: 16px;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}

.el-input .el-input__wrapper {
  box-shadow: none;
  background: none;
}
.el-input__inner {
  font-size: large;
}
#new-button {
  color: #333;
  background-color: #ffbd00;
  border: none;
}
#Content-page {
  position: absolute;
  top: 70px;
  left: 430px;
  right: 180px;
}

.content-main {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.pager-next {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.el-pagination.is-background .el-pager li.is-active {
  background-color: #ffbd00 !important;
}
.overflow-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
