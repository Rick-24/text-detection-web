<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:keyword:view" type="primary"
                     @click="findPage(null)"/>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:keyword:add" type="primary"
                     @click="handleAdd"/>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <kt-table permsEdit="sys:keyword:edit" permsDelete="sys:keyword:delete" :highlightCurrentRow="true" :stripe="false"
              :data="pageResult" :columns="columns" :showBatchDelete="false"
              @handleCurrentChange="handleRoleSelectChange"
              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>
    <!-- </el-col> -->
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="value">
          <el-input v-model="dataForm.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="userRoles">
          <el-select v-model="dataForm.typeid" placeholder="请选择"
                     style="width: 100%;">
            <el-option v-for="item in keytypes" :key="item.id"
                       :label="item.value" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="dataForm.description" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
          {{ $t('action.submit') }}
        </el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import TableTreeColumn from '@/views/Core/TableTreeColumn'
import {format} from "@/utils/datetime"

export default {
  components: {
    KtTable,
    KtButton,
    TableTreeColumn
  },
  data() {
    return {
      size: 'small',
      filters: {
        name: ''
      },
      columns: [
        {prop: "id", label: "ID", minWidth: 50},
        {prop: "value", label: "关键字", minWidth: 120},
        {prop: "type",label:"关键字类型",minWidth: 120},
        {prop: "description", label: "备注", minWidth: 120}
      ],
      pageRequest: {pageNum: 1, pageSize: 10},
      pageResult: {},
      keytypes:[],

      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      dataFormRules: {
        name: [
          {required: true, message: '请输入角色名', trigger: 'blur'}
        ]
      },
      // 新增编辑界面数据
      dataForm: {
        id: 0,
        value: '',
        description: '',
        typeid: ''
      },
      selectKeyType: {},
      menuData: [],
      menuSelections: [],
      menuLoading: false,
      authLoading: false,
      checkAll: false,
      currentRoleMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    // 获取分页数据
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest
      }
      // this.pageRequest.params = [{name:'name', value:this.filters.name}]
      this.$api.keyword.findPage(this.pageRequest).then((res) => {
        this.pageResult = res.data
        this.getKeyTypes()
      }).then(data != null ? data.callback : '')
    },
    getKeyTypes: function (){
      this.$api.keytype.findAll().then((res) => {
        this.keytypes = res.data
      })
    },
    // 显示新增界面
    handleAdd: function (data) {
      this.dialogVisible = true
      this.operation = true
      this.dataForm = {
        id: 0,
      }
    },
    // 批量删除
    handleDelete: function (data) {
      this.$api.keyword.batchDelete(data.params).then(data.callback)
    },

    // 显示编辑界面
    handleEdit: function (params) {
      this.dialogVisible = true
      this.operation = false
      this.dataForm = Object.assign({}, params.row)
    },
    // 编辑
    submitForm: function () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let params = Object.assign({}, this.dataForm)
            this.$api.keyword.save(params).then((res) => {
              this.editLoading = false
              if (res.code == 200) {
                this.$message({message: '操作成功', type: 'success'})
                this.dialogVisible = false
                this.$refs['dataForm'].resetFields()
              } else {
                this.$message({message: '操作失败, ' + res.msg, type: 'error'})
              }
              this.findPage(null)
            })
          })
        }
      })
    },
    // 角色选择改变监听
    handleRoleSelectChange(val) {
      if (val == null || val.val == null) {
        return
      }
      this.selectKeyType = val.val
      this.$api.keyword.findKeyWords({'keytypeId': val.val.id}).then((res) => {
        console.log(res.data)
        this.pageResult2 = res.data
        // this.$refs.menuTree.setCheckedNodes(res.data)
      })
    },
    handleRoleSelectChange2(val) {
      if (val == null || val.val == null) {
        return
      }
      this.selectKeyWord = val.val
    }
  },
  name: "Keyword"
}
</script>
<style scoped>
.menu-container {
  margin-top: 10px;
}

.menu-header {
  padding-left: 8px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 16px;
  color: rgb(20, 89, 121);

}
</style>
