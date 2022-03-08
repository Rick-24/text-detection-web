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
      <el-collapse v-for="(item,index) in errorInfo.sentenceModel" :key="'sentence'+index">
        <el-collapse-item name="indexI" class="error_div">
          <template slot="title">
            原文第<strong>{{ item.segmentNum }}</strong>段 - 第<strong>{{ item.sentenceNum }}</strong>句
            <i class="el-icon-s-promotion" @click="goAnchor('#anchor-'+item.segmentNum+'-'+item.sentenceNum)"></i>
          </template>

          <el-descriptions :column="1" :size="mini" border>
            <el-descriptions-item label="输入原文" label-class-name="my-label">
              {{ item.input }}
            </el-descriptions-item>
          </el-descriptions>
          <div v-for="sentenceSpec in item.sentenceSpecList">
            <el-descriptions :title="sentenceSpec.ruleName" :column="2" :size="mini" border>
              <el-descriptions-item label="段号">
                <el-tag size="small">{{ sentenceSpec.ruleSegmentNum }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="行号">
                <el-tag size="small">{{ sentenceSpec.ruleSentenceNum }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="文本">{{ sentenceSpec.text }}</el-descriptions-item>

            </el-descriptions>
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
import AreaCode from "../components/AreaCode";

export default {
  name: "Compliance",
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
      formData.append('matchList', area.toString())
      formData.append('file', this.form.file)
      if (this.areaCode.every((current, index, array) => {
        return current === ""
      })) alert("请提供解析范围")
      this.$api.textDetection.file(formData).then((res) => {
        console.log("response province model", res)
        this.errorInfo = res.value
        this.$refs.file_upload_button.loading = "false"
        this.errorDisplay()
      }).catch((res) => {
        console.log("error", res)
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
          console.log("there is no segment " + segmentNum + ", so it won't be emphasized ");
          continue;
        }

        let processedSegment = strList[segmentNum - 1].split("。");
        processedSegment.splice(sentenceNum - 1, 0, "<strong style='color: #2e6da4'>");
        processedSegment.splice(sentenceNum + 1, 0, "</strong>");
        strList.splice(segmentNum - 1, 1, processedSegment.join(""));
      }
      this.contents = strList[0] + "<p>" + strList.slice(1).join("<\p><p>") + "</p>";

    },
    processSentenceModel(anchor, errorInfoList, strList) {
      // console.log("confirm errorInfoResult",errorInfoList)
      // console.log("check for errorInfoList length",errorInfoList.length)
      // console.log("check for errorInfoResult length",errorInfoResult.length)
      for (let i = 0; i < errorInfoList.length; i++) {
        let segmentNum =errorInfoList[i].segmentNum;
        let sentenceNum = errorInfoList[i].sentenceNum;
        if (this.lengthOfContents < segmentNum) {
          console.log("there is no segment-" + segmentNum + ", so it won't be emphasized ");
          continue;
        }
        let processedSegment = strList[segmentNum - 1].split("。").filter(item => item !== '')
        if (processedSegment.length < sentenceNum) {
          console.log("the sentence-" + sentenceNum + " is not in segment-" + segmentNum + ", so it won't be emphasized ")
          continue;
        }
        let anchorTmp = `<strong style='color: #2e6da4' id='${anchor}${segmentNum}-${sentenceNum}'>`
        processedSegment.splice(sentenceNum - 1, 0, anchorTmp);
        processedSegment.splice(sentenceNum + 1, 0, "</strong>");
        let processedSegmentTmp = ""
        if (sentenceNum !== 1) {
          processedSegmentTmp += processedSegment.slice(0, sentenceNum - 1).join("。") + "。"
        }
        processedSegmentTmp += processedSegment.slice(sentenceNum - 1, sentenceNum + 2).join("") + "。" +
          processedSegment.slice(sentenceNum + 2).join("。")
        // console.log("processedSegment",processedSegment)
        // console.log("processedSegment join",processedSegment.join("。"))
        // console.log("processedSegment",processedSegmentTmp)
        strList.splice(segmentNum - 1, 1, processedSegmentTmp);
      }

      return strList
    },
    processForEach(anchor, errorInfoList, strList) {
      // console.log("confirm errorInfoResult",errorInfoList)
      // console.log("check for errorInfoList length",errorInfoList.length)
      // console.log("check for errorInfoResult length",errorInfoResult.length)
      for (let i = 0; i < errorInfoList.length; i++) {
        const errorInfoResult = errorInfoList[i].fileResult
        for (let j = 0; j < errorInfoResult.length; j++) {
          let segmentNum = errorInfoResult[j].inputSegment;
          let sentenceNum = errorInfoResult[j].inputSentenceNum;
          if (this.lengthOfContents < segmentNum) {
            console.log("there is no segment-" + segmentNum + ", so it won't be emphasized ");
            continue;
          }
          let processedSegment = strList[segmentNum - 1].split("。").filter(item => item !== '')
          if (processedSegment.length < sentenceNum) {
            console.log("the sentence-" + sentenceNum + " is not in segment-" + segmentNum + ", so it won't be emphasized ")
            continue;
          }
          let anchorTmp = `<strong style='color: #2e6da4' id='${anchor}${segmentNum}-${sentenceNum}'>`
          processedSegment.splice(sentenceNum - 1, 0, anchorTmp);
          processedSegment.splice(sentenceNum + 1, 0, "</strong>");
          let processedSegmentTmp = ""
          if (sentenceNum !== 1) {
            processedSegmentTmp += processedSegment.slice(0, sentenceNum - 1).join("。") + "。"
          }
          processedSegmentTmp += processedSegment.slice(sentenceNum - 1, sentenceNum + 2).join("") + "。" +
            processedSegment.slice(sentenceNum + 2).join("。")
          // console.log("processedSegment",processedSegment)
          // console.log("processedSegment join",processedSegment.join("。"))
          // console.log("processedSegment",processedSegmentTmp)
          strList.splice(segmentNum - 1, 1, processedSegmentTmp);
        }
      }
      return strList
    },
    errorDisplay() {
      let strList = this.contents.split(/<\/?p>/gi).filter(item => item !== '');
      this.lengthOfContents = strList.length;
      console.log("confirm strList", strList)
      this.processForEach("anchor-", this.errorInfo.provinceModel, strList)
      console.log("confirm strList after pro", strList)
      this.processForEach("anchor-", this.errorInfo.cityModel, strList)
      console.log("confirm strList after city", strList)
      this.processForEach("anchor-", this.errorInfo.districtModel, strList)
      console.log("confirm strList after dis", strList)

      this.processSentenceModel("anchor-", this.errorInfo.sentenceModel, strList)
      console.log("confirm strList after sentence", strList)
      this.contents = strList[0] + "<p>" + strList.slice(1).join("<\p><p>") + "</p>";
    },
    goAnchor(selector) {
      console.log(selector)
      let offsetTop = document.querySelector(selector).offsetTop;
      document.querySelector(".el-textarea").scrollTop = offsetTop
      event.stopPropagation();
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
  /*background: #f5f5f5;*/
  height: 637px
}

.error_div {
  text-align: left;
}

.my-label {
  background: #E1F3D8;
}
</style>
