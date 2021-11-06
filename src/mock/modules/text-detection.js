/**
 * 文本检测模块
 */

export function file() {
  let data ={
    value: {
      detectionModels: [
        {
          text: "对年度实现规模以上工业总产值在全区排前五名的街道，分别奖励50万元、40万元、30万元、20万元、10万元",
          input: "每年工业总产值在全区排前二十名的街道，分别奖励50万元、30万元、20万元",
          segmentNum: 2,
          sentenceNum: 1,
          display : "匹配到第2段，第一句"
        }
      ]
    },
    errorMessage: null,
    status: 1,
    errorCode: null
  };
  return {
    url : 'text/detection',
    type : 'post',
    data : data
  }
}
