// pages/ocr/index.js
Page({
  data: {
    imagePath: '', // 用于存储图片的临时路径
    ocrResult: '',  // 用于存储OCR识别结果
    wordsArray: [],
    wordsCount: 0
  },
  takePhoto: function() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          imagePath: res.tempFilePaths[0]
        });
        // that.processImage(tempFilePaths[0]);
        that.callBaiduOCR(tempFilePaths[0]);
      }
    });
  },
  chooseImage: function() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: function(res) {
        that.setData({
          imagePath: res.tempFilePaths[0]
        });
        that.callBaiduOCR(res.tempFilePaths[0]);
      }
    });
  },
  callBaiduOCR: function(imagePath) {
    const that = this;
    console.log("img path:"+imagePath)
    const fs = wx.getFileSystemManager();
    fs.readFile({
      filePath: imagePath,
      success: function(res) {
        // res.data 是一个 ArrayBuffer 类型，包含了图片的二进制数据
        // 可以在这里对图片的二进制数据进行操作
        // console.log('图片读取成功，二进制数据:', res.data);
        const base64String = wx.arrayBufferToBase64(res.data);
            // 发送请求到百度OCR服务
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=24.42c7fd116e531b115d053302fe735ebf.2592000.1719713612.282335-76823684',
          method: 'POST',
          data: {
            "image":base64String
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            const result = JSON.stringify(res.data, null, 4);
            let obj =JSON.parse(result);
            that.setData({
              ocrResult: result,
              wordsArray: obj['words_result']
            });
          },
          fail: function(err) {
            console.error('调用百度OCR接口失败：', err);
          }
        });
      },
      fail: function(err) {
        // 读取失败时的处理
        console.error('图片读取失败：', err);
      }
    });
  }
});