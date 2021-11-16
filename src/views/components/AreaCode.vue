<template>
  <el-container style="margin-top: 10px">
    <el-checkbox-group v-model="checkList" size="small" style="margin-left: 15px">
      <el-checkbox-button label="province"></el-checkbox-button>
      <el-checkbox-button label="city"></el-checkbox-button>
      <el-checkbox-button label="district"></el-checkbox-button>
    </el-checkbox-group>
    <el-cascader
      v-model="path"
      style="margin-left: 15px"
      placeholder="请选择匹配区域和等级"
      ref="current"
      size="small"
      expand-trigger="hover"
      :options="province.options"
      :props="props"
      @active-item-change="handleItemChange"
      @change="selectedChange">
    </el-cascader>
  </el-container>
</template>

<script>
export default {
  name: "AreaCode",
  model: {
    prop: 'areaCode',
    event: 'selectedChange'
  },
  data () {
    return {
      // 所在省市
      province: {
        options: []
      },
      props: { // 级联选择器的属性配置
        value: 'value',
        children: 'next',
        checkStrictly: true
      },
      checkList:[],
      path:[]
    }
  },
  computed: {},
  created () {
    this._initData()
  },
  mounted () {
  },
  methods: {
    _initData() {
      this.$api.areaIndex.province().then((res)=> {
        console.log("province",res)
        this.province.options = res.value.models.map(item => {
          // 所在省市
          return {
            value: item.code,
            label: item.name,
            next: []
          }
        })
      }).catch(function (res) {
        console.log(res)
      })

    },
    handleItemChange(val){
      const matchProvince = this.province.options.findIndex(item => {
        return item.value === val[0];
      })
      const provinceSelected=this.province.options[matchProvince]
      if(val.length===1){
        if(provinceSelected.next.length!==0) return
        setTimeout(item =>{
          this.$api.areaIndex.city(provinceSelected.value).then((res)=> {
            console.log("cities",res)
            provinceSelected.next = res.value.models.map(item => {
              return {
                value: item.code,
                label: item.name,
                next: []
              }
            })
          }).catch(function (res) {
            console.log(res)
          })
        },300)
      }else if(val.length===2){
        const matchCity = provinceSelected.next.findIndex(item => {
          return item.value === val[1];
        })
        const citySelected=provinceSelected.next[matchCity]
        if(citySelected.next.length!==0) return
        setTimeout(item =>{
          this.$api.areaIndex.district(citySelected.value).then((res)=> {
            console.log("districts",res)
            citySelected.next = res.value.models.map(item => {
              return {
                value: item.code,
                label: item.name,
              }
            })
          }).catch(function (res) {
            console.log(res)
          })
        },100)
      }

    },
    selectedChange(val){
      if(val.length<3) {
        alert("请将匹配精确到区,然后在复选框选择匹配范围")
      } else {
        console.log(this.checkList)
        if(this.checkList.indexOf("province")===-1) val[0]=""
        if(this.checkList.indexOf("city")===-1) val[1]=""
        if(this.checkList.indexOf("district")===-1) val[2]=""
        this.$emit("getAreaCode",val)
      }
    },
    resetCheckList(){
      this.checkList=[]
      this.path=[]
    }
  }

}
</script>

<style scoped>

</style>
