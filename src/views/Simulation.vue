<script setup>
import {reactive, ref} from 'vue';
import {Delete, Edit} from "@element-plus/icons-vue";

// 定义选中的标签页
const activeTab = ref('model');

// 定义仿真模型的步骤
const step = ref('建立模型')
const modelSteps = ref([
  '建立模型',
  '选择方案',
  '导入参数',
  '确定函数',
  '创建完成',
]);
const handleSelect = (key, path) => {
  console.log("选中菜单项：" + key);
}
// 处理标签页点击事件
const handleClick = (tab) => {
  activeTab.value = tab.name;
}

const modelName = ref()
const type = ref()
const options = [
  {
    value: '功能需求',
    label: '功能需求',
  },
  {
    value: '性能需求',
    label: '性能需求',
  },
]
const demand = ref()
const demands = ref([
  {
    value: '需求1',
    label: '需求1',
  },
  {
    value: '需求2',
    label: '需求2',
  },
])
const formInline = reactive({
  name: '',
  demand: '',
  description: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const currentPage = ref(1)
const pageSize = ref(10)
const schemaTable = ref([
  {
    id: 1,
    name: '方案1',
    demand: '需求1',
    description: "这是方案1的简介",
    materials: '1台冲压机',
    template: false,
  },
  {
    id: 2,
    name: "方案2",
    demand: "需求1",
    description: "描述2",
    materials: '20个磨头',
    template: true,
  }
])
const schemaIndex = ref(-1)
const schemaId = ref(-1)
const schemaName = ref("")
const confirmSchema = () => {
  step.value = '导入参数';
  schemaId.value = schemaTable.value[schemaIndex.value].id
  schemaName.value = schemaTable.value[schemaIndex.value].name
}

const paramTable = ref([
  {
    name: "转速",
    symbol: "n",
    value: "3000",
    unit: "rpm",
    material: "打磨机",
    type: "计算参数"
  },
  {
    name: "表面粗糙度",
    symbol: "Ra",
    value: "-",
    unit: "μm",
    material: "-",
    type: "评估标准"
  }
])
const classFilter = ({row}) => {
  //console.log(row);
  if(row.type === "评估标准") {
    return 'param-standard';
  } else if (row.type === "误差") {
    return 'param-error';
  } else {
    return '';
  }
}

const func = ref('')
</script>

<template>
  <el-aside width="200px">
    <el-tabs v-model="activeTab" @tab-click="handleClick" type="border-card" stretch>
      <el-tab-pane label="仿真模型" name="model" class="menu-title">
        <el-segmented v-model="step" :options="modelSteps" name="model"
                      direction="vertical" size="large" disabled/>
      </el-tab-pane>
      <el-tab-pane label="仿真结果" name="result" class="menu-title">
        <el-menu default-active="start"
                 class="menu-bar"
                 mode="vertical"
                 @select="handleSelect">
          <el-menu-item index="start">开始仿真</el-menu-item>
          <el-menu-item index="last">最近一次结果</el-menu-item>
          <el-menu-item index="manage">仿真结果管理</el-menu-item>
        </el-menu>
      </el-tab-pane>
    </el-tabs>
  </el-aside>

  <div v-if="activeTab === 'result'">
    <h2>仿真结果</h2>
  </div>

  <div v-else style="width:100%;">
    <el-container class="container" v-if="step === '建立模型'">
      <div class="horizontal-container">
        <h2>创建一个新的仿真模型</h2>
      </div>
      <div class="horizontal-container">
        <span>仿真模型名称：</span>
        <el-input
            v-model="modelName"
            style="width: 240px"
            placeholder="请输入仿真模型名称"
            clearable
        />
      </div>
      <div class="horizontal-container">
        <span>关联需求：</span>
        <el-select
            v-model="type"
            placeholder="类型"
            size="default"
            style="width: 120px"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-select
            v-model="demand"
            placeholder="需求名称"
            size="default"
            style="width: 240px; margin-left: 10px"
        >
          <el-option
              v-for="item in demands"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="horizontal-container">
        <el-button type="primary" @click="() => {step = '选择方案'}">下一步</el-button>
      </div>
    </el-container>

    <el-container class="container" v-else-if="step === '选择方案'">
      <div class="schema-table">
        <!--标题-->
        <div class="card-header">
          <h2>选择方案</h2>
        </div>
        <div class="horizontal-container">
          <span>解决需求：</span>
          <span>{{ demand }}</span>
        </div>
        <!--分割线-->
        <el-divider style="margin-top: 20px" />
        <!--表头-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="formInline.name" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="解决需求">
            <el-select
                v-model="formInline.demand"
                placeholder="请选择"
                clearable
            >
              <el-option label="需求1" value="shanghai" />
              <el-option label="需求2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
        <!--表单-->
        <el-table :data="schemaTable" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="demand" label="解决需求" />
          <el-table-column prop="description" label="描述" show-overflow-tooltip />
          <el-table-column prop="operation" label="操作" v-slot="scope">
            <el-button v-if="schemaIndex !== scope.$index" type="primary" @click="schemaIndex=scope.$index">选择</el-button>
            <span v-else style="color: #67c23a; font-size: large; font-weight: bold;">√</span>
          </el-table-column>
        </el-table>
      </div>
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
          :total=schemaTable.length
      />
      <div class="horizontal-container">
        <el-button type="primary" @click="() => {step = '建立模型'}">上一步</el-button>
        <el-button type="primary" @click="confirmSchema()">下一步</el-button>
      </div>
    </el-container>

    <el-container class="container" v-else-if="step === '导入参数'">
      <div class="card-header">
        <h2>导入所需参数</h2>
      </div>
      <div class="horizontal-container">
        <span>关联方案：</span>
        <span>{{ schemaName }}</span>
      </div>
      <el-table
          :data="paramTable"
          border
          style="width: 100%"
          :row-class-name="classFilter"
      >
        <el-table-column prop="name" label="参数名称" width="180" />
        <el-table-column prop="symbol" label="参数符号" width="180" />
        <el-table-column prop="value" label="数值" width="180" />
        <el-table-column prop="unit" label="参数单位" width="180" />
        <el-table-column prop="material" label="所属物料" width="180" />
        <el-table-column prop="type" label="类型" width="180" />
      </el-table>
      <div class="horizontal-container">
        <el-button type="primary" @click="() => {step = '选择方案'}">上一步</el-button>
        <el-button type="primary" @click="() => {step = '确定函数'}">下一步</el-button>
      </div>
    </el-container>

    <el-container class="container" v-else-if="step === '确定函数'">
      <div class="card-header">
        <h2>确定仿真函数</h2>
      </div>
      <div class="horizontal-container">
        <div style="display: flex; flex-direction: column;">
          <span>请输入仿真函数(以latex公式形式)</span>
          <el-input
              v-model="func"
              style="width: 600px;font-size: large"
              placeholder="在此输入您的仿真函数"
              :rows="8"
              type="textarea"
              clearable
          />
        </div>
        <div style="display: flex; flex-direction: column;">
          <span>变量列表</span>
          <el-table
              :data="paramTable"
              border
              style="width: 100%"
              :row-class-name="classFilter"
          >
            <el-table-column prop="type" label="类型" width="180" />
            <el-table-column prop="symbol" label="参数符号" width="180" />
            <el-table-column prop="name" label="参数名称" width="180" />
          </el-table>
          <span>设置评价标准</span>
        </div>
      </div>

      <div class="horizontal-container">
        <el-button type="primary" @click="() => {step = '导入参数'}">上一步</el-button>
        <el-button type="success" @click="() => {step = '创建完成'}">创建完成</el-button>
      </div>
    </el-container>

    <el-container class="container" v-else-if="step === '创建完成'">
      <div class="card-header">
        <h2>模型：仿真模型1</h2>
      </div>
      <div class="horizontal-container">
        <el-button type="primary" @click="() => {step = '建立模型'}">继续创建新模型</el-button>
        <el-button type="success" @click="">前往模拟</el-button>
      </div>
    </el-container>
  </div>
</template>

<style scoped>
.el-aside {
  height: 100%; /* 设置侧边栏容器高度为100% */
  background-color: #edeff0; /* 设置背景颜色 */
  border-right: none; /* 移除默认边框 */
  color: black;
  font-size: 16px; /* 你可以根据需要调整这个值 */
}
.el-menu {
  height: 100%; /* 设置菜单高度为100% */
  border-right: none; /* 移除默认边框 */
  background: none;
}
.menu-title {
  font-weight: bold;
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 14px;
}
.el-menu-item {
  color: black;
  font-weight: normal;
  font-size: 18px;
}
.el-menu-item.is-active {
  color: #306bba;
  background: lightgray;
}

.container {
  display: flex;
  flex-direction: column; /* 纵向排列 */
  padding-left: 20px;
  padding-right: 20px;
}
.horizontal-container {
  display: flex;
  flex-direction: row; /* 横向排列 */
  justify-content: center;
  width: 100%; /* 根据需要设置宽度 */
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 10px;
}

.card-header{
  display: flex;
  justify-content: space-between;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.schema-table {
  width: 100%;
}

.param-standard {
  background-color: rgba(255, 0, 0, 0.075) !important;
  color:red;
  font-weight: 700;
}
.param-error {
  --el-table-tr-bg-color: var(--el-color-error-light-9);
}
</style>