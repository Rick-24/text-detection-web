<template>
  <el-container style="margin-top: 10px">
    <el-checkbox-group v-model="checkList" size="small" style="margin-left: 15px">
      <el-checkbox-button :label="0" >province</el-checkbox-button>
      <el-checkbox-button :label="1" >city</el-checkbox-button>
      <el-checkbox-button :label="2" >district</el-checkbox-button>
    </el-checkbox-group>
    <el-cascader
      v-model="path"
      style="margin-left: 15px"
      placeholder="请选择匹配区域和等级"
      ref="current"
      size="small"
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
    event: 'selectedChange'
  },
  data () {
    return {
      province: {
        options: []
      },
      props: {
        value: 'value',
        children: 'next',
        checkStrictly: true
      },
      checkList:[],
      path:["","",""]
    }
  },
  computed: {},
  created () {
    this._initData()
  },
  watch:{
    checkList:{
      deep:true,
      immediate:true,
      handler(newVal){
        const localPath = JSON.parse(JSON.stringify(this.path))
        if(newVal.indexOf(0)===-1) localPath[0]=""
        if(newVal.indexOf(1)===-1) localPath[1]=""
        if(newVal.indexOf(2)===-1) localPath[2]=""
        // this.$emit("getAreaCode",newVal.map((current,index,array)=>{
        //   return this.path[current]}))
        this.$emit("getAreaCode",localPath)
        console.log("emitted",localPath)
      }
    }
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
      const localPath=JSON.parse(JSON.stringify(val))
      if (val.length<3) {
        this.resetCheckList()
        alert("请将匹配精确到区,然后在复选框选择匹配范围")
      } else if(this.checkList.length===0){
        this.$emit("getAreaCode",val)
        console.log("emitted",val)
      } else {
        if(this.checkList.indexOf(0)===-1) localPath[0]=""
        if(this.checkList.indexOf(1)===-1) localPath[1]=""
        if(this.checkList.indexOf(2)===-1) localPath[2]=""
        this.$emit("getAreaCode",localPath)
        console.log("emitted",localPath)
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
