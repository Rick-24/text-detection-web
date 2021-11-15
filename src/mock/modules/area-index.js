/**
 * 区域列表模块
 */

export function province() {
  let data ={
    "value": {
      "models": [
        {
          "name": "北京市",
          "code": 110000,
          "id": 10000001
        },
        {
          "name": "天津市",
          "code": 120000,
          "id": 10000002
        },
        {
          "name": "河北省",
          "code": 130000,
          "id": 10000003
        },
        {
          "name": "山西省",
          "code": 140000,
          "id": 10000004
        },
        {
          "name": "内蒙古自治区",
          "code": 150000,
          "id": 10000005
        },
        {
          "name": "辽宁省",
          "code": 210000,
          "id": 10000006
        },
        {
          "name": "吉林省",
          "code": 220000,
          "id": 10000007
        },
        {
          "name": "黑龙江省",
          "code": 230000,
          "id": 10000008
        },
        {
          "name": "上海市",
          "code": 310000,
          "id": 10000009
        },
        {
          "name": "江苏省",
          "code": 320000,
          "id": 10000010
        },
        {
          "name": "浙江省",
          "code": 330000,
          "id": 10000011
        },
        {
          "name": "安徽省",
          "code": 340000,
          "id": 10000012
        },
        {
          "name": "福建省",
          "code": 350000,
          "id": 10000013
        },
        {
          "name": "江西省",
          "code": 360000,
          "id": 10000014
        },
        {
          "name": "山东省",
          "code": 370000,
          "id": 10000015
        },
        {
          "name": "河南省",
          "code": 410000,
          "id": 10000016
        },
        {
          "name": "湖北省",
          "code": 420000,
          "id": 10000017
        },
        {
          "name": "湖南省",
          "code": 430000,
          "id": 10000018
        },
        {
          "name": "广东省",
          "code": 440000,
          "id": 10000019
        },
        {
          "name": "广西壮族自治区",
          "code": 450000,
          "id": 10000020
        },
        {
          "name": "海南省",
          "code": 460000,
          "id": 10000021
        },
        {
          "name": "重庆市",
          "code": 500000,
          "id": 10000022
        },
        {
          "name": "四川省",
          "code": 510000,
          "id": 10000023
        },
        {
          "name": "贵州省",
          "code": 520000,
          "id": 10000024
        },
        {
          "name": "云南省",
          "code": 530000,
          "id": 10000025
        },
        {
          "name": "西藏自治区",
          "code": 540000,
          "id": 10000026
        },
        {
          "name": "陕西省",
          "code": 610000,
          "id": 10000027
        },
        {
          "name": "甘肃省",
          "code": 620000,
          "id": 10000028
        },
        {
          "name": "青海省",
          "code": 630000,
          "id": 10000029
        },
        {
          "name": "宁夏回族自治区",
          "code": 640000,
          "id": 10000030
        },
        {
          "name": "新疆维吾尔自治区",
          "code": 650000,
          "id": 10000031
        },
        {
          "name": "台湾省",
          "code": 710000,
          "id": 10000032
        },
        {
          "name": "香港特别行政区",
          "code": 810000,
          "id": 10000033
        },
        {
          "name": "澳门特别行政区",
          "code": 820000,
          "id": 10000034
        }
      ]
    },
    "errorMessage": null,
    "status": 1,
    "errorCode": null
  };
  return {
    url : 'area/province',
    type : 'get',
    data : data
  }
}


export function city() {
  let data ={
    "value": {
      "models": [
        {
          "name": "沈阳市",
          "code": 210100,
          "id": 10000071
        },
        {
          "name": "大连市",
          "code": 210200,
          "id": 10000072
        },
        {
          "name": "鞍山市",
          "code": 210300,
          "id": 10000073
        },
        {
          "name": "抚顺市",
          "code": 210400,
          "id": 10000074
        },
        {
          "name": "本溪市",
          "code": 210500,
          "id": 10000075
        },
        {
          "name": "丹东市",
          "code": 210600,
          "id": 10000076
        },
        {
          "name": "锦州市",
          "code": 210700,
          "id": 10000077
        },
        {
          "name": "营口市",
          "code": 210800,
          "id": 10000078
        },
        {
          "name": "阜新市",
          "code": 210900,
          "id": 10000079
        },
        {
          "name": "辽阳市",
          "code": 211000,
          "id": 10000080
        },
        {
          "name": "盘锦市",
          "code": 211100,
          "id": 10000081
        },
        {
          "name": "铁岭市",
          "code": 211200,
          "id": 10000082
        },
        {
          "name": "朝阳市",
          "code": 211300,
          "id": 10000083
        },
        {
          "name": "葫芦岛市",
          "code": 211400,
          "id": 10000084
        }
      ]
    },
    "errorMessage": null,
    "status": 1,
    "errorCode": null
  };
  return {
    url : 'area/city',
    type : 'get',
    data : data
  }
}



export function district() {
  let data ={
    "value": {
      "models": [
        {
          "name": "中山区",
          "code": 210202,
          "id": 10000840
        },
        {
          "name": "西岗区",
          "code": 210203,
          "id": 10000841
        },
        {
          "name": "沙河口区",
          "code": 210204,
          "id": 10000842
        },
        {
          "name": "甘井子区",
          "code": 210211,
          "id": 10000843
        },
        {
          "name": "旅顺口区",
          "code": 210212,
          "id": 10000844
        },
        {
          "name": "金州区",
          "code": 210213,
          "id": 10000845
        },
        {
          "name": "普兰店区",
          "code": 210214,
          "id": 10000846
        },
        {
          "name": "长海县",
          "code": 210224,
          "id": 10000847
        },
        {
          "name": "瓦房店市",
          "code": 210281,
          "id": 10000848
        },
        {
          "name": "庄河市",
          "code": 210283,
          "id": 10000849
        }
      ]
    },
    "errorMessage": null,
    "status": 1,
    "errorCode": null
  };
  return {
    url : 'area/district',
    type : 'get',
    data : data
  }
}
