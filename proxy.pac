function FindProxyForURL(url, host) {
  // 一、局域网、本地地址直连
  if (
    shExpMatch(host, "*.local") ||
    shExpMatch(host, "localhost") ||
    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0")
  ) {
    return "DIRECT";
  }

// 二、国内主要平台直连（包含补充）
var direct_domains = [
  // 腾讯系
  "qq.com$", "weixin.qq.com$", "qzone.com$", "qqun.com$", "qplus.com$", "myapp.com$", "tencent.com$",

  // 阿里系
  "alibaba.com$", "1688.com$", "taobao.com$", "tmall.com$", "alipay.com$", "alipayobjects.com$", "zfbjk.com$", "etao.com$", "mmstat.com$", "cainiao.com$", 
  "xiami.com$", "feizhu.com$", "dingtalk.com$", "aliyun.com$",

  // 字节系
  "bytedance.com$", "douyin.com$", "toutiao.com$", "ixigua.com$", "feishu.cn$", "capcut.cn$", "lemon8.com$",

  // 百度系
  "baidu.com$", "tieba.baidu.com$", "hao123.com$", "iqiyi.com$", "baofeng.com$", "baijiahao.baidu.com$",

  // 央视系
  "cctv.com$", "news.cn$", "cntv.cn$",

  // 豆瓣、酷安、起点、番茄、咪咕、DeepSeek、优酷
  "douban.com$", "coolapk.com$", "qidian.com$", "hongdian.com$", "migu.cn$", "deepseek.com$", "youku.com$",

  // 社交
  "wechat.com$", "weixin.com$", "weibo.com$", "weibo.cn$", "m.weibo.cn$",

  // 视频音频
  "bilibili.com$", "mgtv.com$", "ximalaya.com$", "lizhi.fm$", "kuaishou.com$",

  // 电商
  "jd.com$", "pinduoduo.com$", "vip.com$", "dangdang.com$", "suning.com$",

  // 新闻资讯
  "people.com.cn$", "xinhuanet.com$", "ifeng.com$", "163.com$", "sina.com.cn$",

  // 工具/邮箱/导航
  "2345.com$", "so.com$", "115.com$", "mail.qq.com$", "mail.163.com$", "189.cn$", "10086.cn$",

  // 教育/阅读
  "zxxk.com$", "zuoyebang.com$", "xueersi.com$", "book.qq.com$",

  // 手机厂商
  "mi.com$", "xiaomi.com$", "vivo.com$", "oppo.com$", "huawei.com$", "honor.cn$", "meizu.com$", "smartisan.com$",

  // 云服务
  "tencentcloud.com$", "hicloud.com$", "bdstatic.com$", "baidubce.com$", "qcloud.com$", "qiniu.com$",

  // 支付宝支付相关
  "wx.tenpay.com$", "pay.weixin.qq.com$", "qpay.qq.com$", "tenpay.com$",
  "95516.com$", "unionpay.com$", "yunshanfu.com$", "chinaunionpay.com$",
  "jdpay.com$", "pay.jd.com$",
  "wallet.xiaomi.com$", "qrcode.alipay.com$", "qrcode.tenpay.com$", "qr.alipay.com$",
  "qianbao.qq.com$", "pay.cmbchina.com$", "ebank.icbc.com.cn$", "ebank.abchina.com$",

  // Apple 相关（支付及系统服务）
  "apple.com$", "mzstatic.com$", "akadns.net$", "cdn-apple.com$", "itunes.apple.com$", "apps.apple.com$", "push.apple.com$", "api.smoot.apple.com$",

  // 其他常用平台补充
  "zhihu.com$", "xiaohongshu.com$", "meituan.com$", "ctrip.com$",

  // 泛 .cn 结尾（大部分中国网站）
  ".cn$"
];
  for (var i = 0; i < direct_domains.length; i++) {
    if (shExpMatch(host, "*" + direct_domains[i])) {
      return "DIRECT";
    }
  }

  // 三、Apple服务直连（避免系统功能受限）
  var apple_domains = [
    "apple.com$", "icloud.com$", "mzstatic.com$", "akadns.net$", "cdn-apple.com$",
    "itunes.apple.com$", "apps.apple.com$", "push.apple.com$", "api.smoot.apple.com$",
    "edgekey.net$"
  ];
  for (var i = 0; i < apple_domains.length; i++) {
    if (shExpMatch(host, "*" + apple_domains[i])) {
      return "DIRECT";
    }
  }

  // 四、国外网站强制代理
  var proxy_domains = [
    "google.com", "youtube.com", "gstatic.com", "googleapis.com",
    "facebook.com", "twitter.com", "instagram.com", "wikipedia.org",
    "github.com", "github.io", "reddit.com", "t.co", "medium.com",
    "telegram.org", "t.me", "openai.com", "pinterest.com", "netflix.com"
  ];
  for (var i = 0; i < proxy_domains.length; i++) {
    if (shExpMatch(host, "*" + proxy_domains[i])) {
      return "SOCKS5 192.168.10.5:7890; PROXY 192.168.10.5:7890";
    }
  }

  // 五、其他全部走代理（默认兜底）
  return "SOCKS5 192.168.2.200:7890; PROXY 192.168.2.200:7890";
}
