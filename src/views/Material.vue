<script setup>
import {Delete, Edit} from '@element-plus/icons-vue'
import { ref } from "vue";
import { reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const activeIndex = ref('all')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const createForm = ref({
  name: '',
  category: '',
  description: "这是物料的描述",
  type: '',
  parameters: ''
})

const handleSelect = (key, path) => {
  console.log("选中菜单项：" + key);
}

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const currentPage = ref(1)
const pageSize = ref(10)
const materialTable = ref([
  {
    name: "物料1",
    priority: 1,
    category: "分类1",
    description: "描述1",
    type: "设备",
    parameters: '每秒3000转'
  },
  {
    name: "物料2",
    priority: 12,
    category: "分类2",
    description: "描述2",
    type: "耗材",
    parameters: '寿命为可使用50次'
  }
])
const id = ref(1)  // 当前所选中的id
const drawer = ref(false)
const handleClose = function(done) {
  ElMessageBox.confirm('确认保存所作的修改吗？')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
function cancelClick() {
  drawer.value = false
}
function confirmClick() {
  ElMessageBox.confirm('确认保存所作的修改吗？')
      .then(() => {
        drawer.value = false
      })
      .catch(() => {
        // catch error
      })
}

</script>

<template>
  <el-container>
    <!--侧边导航栏-->
    <el-aside width="200px">
      <span class="menu-title">物料管理</span>
      <el-menu default-active="all"
               class="menu-bar"
               mode="vertical"
               @select="handleSelect">
        <el-menu-item index="all">所有物料</el-menu-item>
        <el-menu-item index="equipment">设备库</el-menu-item>
        <el-menu-item index="consumable">耗材库</el-menu-item>
      </el-menu>
    </el-aside>

    <!--新建物料-->
    <el-dialog v-model="dialogFormVisible" title="创建物料" width="500">
      <el-form :model="createForm">
        <el-form-item label="物料名称" :label-width="formLabelWidth">
          <el-input v-model="createForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="createForm.type">
            <el-radio-button value="设备" size="large" >设备</el-radio-button>
            <el-radio-button value="耗材" size="large">耗材</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="物料分类" :label-width="formLabelWidth">
          <el-select v-model="createForm.category" placeholder="请选择物料所属的分类">
            <el-option label="分类1" value="1" />
            <el-option label="分类2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="createForm.description" autocomplete="off" autosize type="textarea" />
        </el-form-item>
        <el-form-item label="属性" :label-width="formLabelWidth">
          <el-input v-model="createForm.parameters" autocomplete="off" autosize type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确定创建
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!--  主体表单  -->
    <el-container class="material-content">
      <el-card class="material-table">
        <!--标题-->
        <div class="card-header">
          <span>物料管理</span>
          <el-button plain @click="dialogFormVisible = true">创建物料</el-button>
        </div>
        <!--分割线-->
        <el-divider style="margin-top: 20px" />
        <!--表头-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="分类">
            <el-select
                v-model="formInline.region"
                placeholder="请选择"
                clearable
            >
              <el-option label="分类1" value="shanghai" />
              <el-option label="分类2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
        <!--表单-->
        <el-table :data="materialTable" style="width: 100%" stripe>
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="category" label="分类" />
          <el-table-column prop="description" label="描述" show-overflow-tooltip />
          <el-table-column prop="operation" label="操作" v-slot="scope">
            <el-button type="success" :icon="Edit" @click="drawer=true;id=scope.$index">详情</el-button>
            <el-button type="danger" :icon="Delete">删除</el-button>
          </el-table-column>/
        </el-table>
      </el-card>
      <!--分页器-->
      <el-pagination
          class="el-p"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :size="'default'"
          :disabled="false"
          :background="false"
          :hide-on-single-page="true"
          layout="total, sizes, jumper, prev, pager, next"
          :total=materialTable.length
      />
    </el-container>
  </el-container>

  <!-- 编辑详情 -->
  <el-drawer
      v-model="drawer"
      :direction="'rtl'"
      :before-close="handleClose"
      size="50%"
  >
    <template #header>
      <h4>编辑物料详情</h4>
    </template>
    <template #default>
      <el-form :model="materialTable">
        <el-form-item label="物料名称" :label-width="formLabelWidth">
          <el-input v-model="materialTable[id].name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="materialTable[id].type">
            <el-radio-button value="设备" size="large" >设备</el-radio-button>
            <el-radio-button value="耗材" size="large">耗材</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="物料分类" :label-width="formLabelWidth">
          <el-select v-model="materialTable[id].category" placeholder="请选择物料所属的分类">
            <el-option label="分类1" value="1" />
            <el-option label="分类2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="materialTable[id].description" autocomplete="off" autosize type="textarea" />
        </el-form-item>
        <el-form-item label="属性" :label-width="formLabelWidth">
          <el-input v-model="materialTable[id].parameters" autocomplete="off" autosize type="textarea" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存修改</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.card-header{
  display: flex;
  justify-content: space-between;
}

.el-p{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.el-aside {
  height: 100%; /* 设置侧边栏容器高度为100% */
  background-color: #888888; /* 设置背景颜色 */
  border-right: none; /* 移除默认边框 */
  color: white;
}
.el-menu {
  height: 100%; /* 设置菜单高度为100% */
  border-right: none; /* 移除默认边框 */
  background: none;
}
.menu-title {
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 14px;
}
.el-menu-item {
  color: white;
  font-weight: bold;
  font-size: 18px;
}
.el-menu-item.is-active {
  color: #306bba;
  background: lightgray;
}

.material-content {
  flex: 1;
  width: 100%;
}
.material-table {
  width: 100%;
}
</style>