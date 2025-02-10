<template>
  <el-container class="layout">
    <el-header>
      <span>整机打磨喷涂系统</span>
      <el-menu
          :default-active="activeIndex.value"
          class="menu-bar"
          mode="horizontal"
          @select="handleSelect"
          :ellipsis="false"
          :router="true"
      >
        <el-menu-item index="/demand">需求管理</el-menu-item>
        <el-menu-item index="/schema">方案管理</el-menu-item>
        <el-menu-item index="/material">物料管理</el-menu-item>
        <el-menu-item index="/simulation">仿真管理</el-menu-item>
        <el-menu-item index="/system">系统管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-container class="content">
      <router-view/>
    </el-container>
  </el-container>
</template>

<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const activeIndex = ref('/demand')
const handleSelect = (key, path) => {
  console.log("当前模块为" + key);
}
// 获取当前路由对象
const route = useRoute();

// 初始化激活的菜单项
// activeIndex.value = route.path;

// 监听路由变化
watch(() => route.path, (newPath) => {
  activeIndex.value = newPath;
});
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.layout {
  height: 100vh; /* 设置整个布局的高度为视口的高度 */
  display: flex;
  flex-direction: column;
}

.el-header {
  height: 10vh; /* 根据需要设置header的高度 */
  display: flex;
  align-items: center;
  background-color: #306bba;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  justify-content: space-between; /* 添加这一行 */
  padding: 0 20px; /* 添加这一行 */
}
.menu-bar {
  background-color: transparent; /* 设置背景为透明 */
  border-bottom: none; /* 移除底部边框 */
  display: flex;
  justify-content: flex-end; /* 使导航栏靠右 */
  padding-right: 20px; /* 可以根据需要调整右边距 */
}

.menu-bar .el-menu-item {
  color: white; /* 设置文字颜色为白色 */
}

.menu-bar .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1); /* 鼠标悬停时的背景色 */
}

.content {
  height: calc(100vh - 10vh); /* 减去header的高度 */
  display: flex;
  flex-grow: 1; /* 使content占据剩余空间 */
  overflow: auto;
}
</style>