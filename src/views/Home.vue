<template>
  <el-container>

    <el-aside width="50%" class="col">
      <el-row>
        <el-upload
          style="float:left;margin-left: 15px;margin-top: 10px"
          action="http://localhost:8001/text/detection"
          accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          :limit="1"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleOnChange"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="file" ref="file_upload_button">
            上传到服务器并解析
          </el-button>
          <div slot="tip" class="el-upload__tip">只能上传docx文件，且不超过500kb</div>
        </el-upload>
      </el-row>

      <el-row>
        <AreaCode v-on:getAreaCode="getAreaCode" ref="AreaCode"></AreaCode>
      </el-row>

      <el-row>
        <el-input
          class="el-textarea"
          type="textarea"
          :rows="20"
          placeholder="请输入内容"
          v-html="contents">
        </el-input>
      </el-row>


    </el-aside>

    <el-main class="col" :width="widthControlled">
      <el-collapse :accordion="true" v-for="(item,indexI) in errorInfo.provinceModel" :key="item.ruleName">
        <el-collapse-item  name="indexI" class="error_div" >
          <template slot="title" >
            <strong style="color: #2c3e50">匹配省级文件:{{item.ruleName}}</strong>
          </template>
          <div v-for="(rules,indexJ) in item.fileResult" :key="indexJ">
            <p><strong style="color: red">匹配到第{{rules.inputSegment}}段，第{{rules.inputSentenceNum}}句.</strong>
              <i class="el-icon-s-promotion" @click="goAnchor('#anchorProvince-'+(indexI*100+indexJ))"></i>
            </p>
            <p>上级规则: {{rules.text}}</p>
            <p>原文: {{rules.input}}</p>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse v-for="(item,index) in errorInfo.cityModel" :key="item.ruleName" >
        <el-collapse-item  name="index" class="error_div" >
          <template slot="title" >
            <strong style="color: #2c3e50">匹配市级文件:{{item.ruleName}}</strong>
          </template>
          <div v-for="(rules,index) in item.fileResult" :key="index">
            <p><strong style="color: red">匹配到第{{rules.inputSegment}}段，第{{rules.inputSentenceNum}}句.</strong>
              <i class="el-icon-s-promotion" @click="goAnchor('#anchorCity-'+index)"></i>
            </p>
            <p>上级规则: {{rules.text}}</p>
            <p>原文: {{rules.input}}</p>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse v-for="(item,index) in errorInfo.districtModel" :key="item.ruleName">
        <el-collapse-item v-for="(item,index) in errorInfo.districtModel" :key="item.ruleName" name="index" class="error_div" >
          <template slot="title" >
            <strong style="color: #2c3e50">匹配区级文件:{{item.ruleName}}</strong>
          </template>
          <div v-for="(rules,index) in item.fileResult" :key="index">
            <p><strong style="color: red">匹配到第{{rules.inputSegment}}段，第{{rules.inputSentenceNum}}句.</strong>
              <i class="el-icon-s-promotion" @click="goAnchor('#anchorDistrict-'+index)"></i>
            </p>
            <p>上级规则: {{rules.text}}</p>
            <p>原文: {{rules.input}}</p>
          </div>
        </el-collapse-item>
      </el-collapse>

    </el-main>

  </el-container>

</template>

<script>
import axios from 'axios'
import mock from '@/mock/index.js'
import mammoth from 'mammoth'
import AreaCode from "./components/AreaCode";

export default {
  name: "Home",
  data() {
    return {
      widthControlled: "50%",
      fileList: [],
      form: {
        file: ''
      },
      contents: '',
      errorInfo: [],
      areaCode: [],
      ifReset: false,
    };
  },
  components: {
    AreaCode
  },
  methods: {
    file() {
      this.$refs.file_upload_button.loading = "true"
      let formData = new FormData()
      // todo remove
      let area = [this.areaCode[0], this.areaCode[1], this.areaCode[2]]
      console.log(area)
      formData.append('areaCode', this.areaCode[3])
      formData.append('matchList',area.toString())
      formData.append('file', this.form.file)
      if (this.areaCode.every((current, index, array) => {
        return current === ""
      })) alert("请提供解析范围")
      this.$api.textDetection.file(formData).then((res) => {
        console.log("response province model",res)
        this.errorInfo = res.value
        this.$refs.file_upload_button.loading = "false"
        this.errorDisplay()
      }).catch((res) => {
        console.log("error",res)
        this.$refs.file_upload_button.loading = "false"
      })
    },

    handleRemove(file, fileList) {
      this.$refs.AreaCode.resetCheckList()
      this.contents = ''
      this.errorInfo = []
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleOnChange(file, fileList) {
      let reader = new FileReader();
      const that = this
      this.form.file = file.raw
      reader.onloadend = function (event) {
        let arrayBuffer = this.result;

        mammoth.convertToHtml({arrayBuffer: arrayBuffer})
          .then(function (resultObject) {
            that.contents = resultObject.value;
            //that.errorDisplay();
          });
      };
      reader.readAsArrayBuffer(file.raw);
    },

    contentsProcess() {
      // /<\/?.+?>/gi
      // /\<\/p\>/gi
      let strList = this.contents.split(/<\/?p>/gi).filter(item => item !== '');
      this.lengthOfContents = strList.length;
      console.log(strList.length);
      for (let i = 0; i < this.errorInfo.length; i++) {
        let segmentNum = this.errorInfo[i].segmentNum;
        let sentenceNum = this.errorInfo[i].sentenceNum;
        if (strList.length < segmentNum) {
          alert("there is no segment " + segmentNum + ", so it won't be emphasized ");
          continue;
        }

        let processedSegment = strList[segmentNum - 1].split("。");
        processedSegment.splice(sentenceNum - 1, 0, "<strong style='color: #2e6da4'>");
        processedSegment.splice(sentenceNum + 1, 0, "</strong>");
        strList.splice(segmentNum - 1, 1, processedSegment.join(""));
      }
      this.contents = strList[0] + "<p>" + strList.slice(1).join("<\p><p>") + "</p>";

    },

    processForEach(anchor,errorInfoList,strList){
      // console.log("confirm errorInfoResult",errorInfoList)
      // console.log("check for errorInfoList length",errorInfoList.length)
      // console.log("check for errorInfoResult length",errorInfoResult.length)
      for (let i = 0; i < errorInfoList.length; i++) {
        const errorInfoResult=errorInfoList[i].fileResult
        for(let j = 0; j < errorInfoResult.length; j++){
          let segmentNum = errorInfoResult[j].inputSegment;
          let sentenceNum = errorInfoResult[j].inputSentenceNum;
          if (this.lengthOfContents < segmentNum) {
            alert("there is no segment-" + segmentNum + ", so it won't be emphasized ");
            continue;
          }
          let processedSegment = strList[segmentNum - 1].split("。");
          if(processedSegment.length < sentenceNum){
            alert("the sentence-" + sentenceNum + " is not in segment-"+segmentNum+", so it won't be emphasized ");
            continue;
          }
          let anchorTmp = `<strong style='color: #2e6da4' id='${anchor}${i*100+j}'>`
          processedSegment.splice(sentenceNum - 1, 0, anchorTmp);
          processedSegment.splice(sentenceNum + 1, 0, "</strong>");
          strList.splice(segmentNum - 1, 1, processedSegment.join(""));
        }
      }
      return strList
    },
    errorDisplay() {
      // /<\/?.+?>/gi
      // /\<\/p\>/gi
      let strList = this.contents.split(/<\/?p>/gi).filter(item => item !== '');
      this.lengthOfContents = strList.length;
      console.log("confirm strList",strList)
      this.processForEach("anchorProvince-",this.errorInfo.provinceModel,strList)
      console.log("confirm strList after pro",strList)
      this.processForEach("anchorCity-",this.errorInfo.cityModel,strList)
      console.log("confirm strList after city",strList)
      this.processForEach("anchorDistrict-",this.errorInfo.districtModel,strList)
      console.log("confirm strList after dis",strList)
      this.contents = strList[0] + "<p>" + strList.slice(1).join("<\p><p>") + "</p>";
    },
    goAnchor(selector) {
      console.log(selector)
      let offsetTop = document.querySelector(selector).offsetTop;
      if(!offsetTop){
        console.log("no anchor:",selector)
        return
      }
      document.querySelector(".el-textarea").scrollTop = offsetTop
    },
    getAreaCode(areaCode) {
      this.areaCode = areaCode
    }

  }
}
</script>

<style scoped>
.el-textarea {
  text-align: left;
  margin-top: 10px;
  overflow: auto;
  height: 525px;
  background-color: white;
}

.col {
  background: #f5f5f5;
  height: 600px
}

.error_div {
  text-align: left;
}
</style>
