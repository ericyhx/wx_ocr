Page({
  data: {
    barcode: ''
  },
  scanBarcode: function() {
    wx.scanCode({
      success: (res) => {
        this.setData({
          barcode: res.result
        });
        console.log(this.data)
      }
    });
  },
  save: function() {
    wx.request({
      url: 'http://127.0.0.1:9000/ds/map/save', // 替换为你的API地址
      method: 'post', // 或者 'POST' 等
      data: {
        // 你的请求参数
        qrCode:'124145235325'
      },
      header: {
        'content-type': 'x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log('请求成功', res);
        // 处理请求成功的情况
      },
      fail: function(err) {
        console.error('请求失败', err);
        // 处理请求失败的情况
      }
    });
  }
});