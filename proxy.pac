function FindProxyForURL(url, host) {
  var proxy = "SOCKS5 192.168.2.200:7890";
  var direct = "DIRECT";

  // 常见国内网站直连
  var chinaDomains = [
    "baidu.com",
    "qq.com",
    "jd.com",
    "bilibili.com",
    "youku.com",
    "iqiyi.com",
    "taobao.com",
    "tmall.com",
    "alipay.com",
    "wechat.com",
    "weixin.com",
    "sina.com.cn",
    "sohu.com",
    "douyin.com",
    "kuaishou.com",
    "zhihu.com",
    "cctv.com",
    "doubanio.com",
    "weibo.com",
    "yuewen.com",
    "duolingo.cn",
    "izuiyou.com",
    "tencent.com",
    "liangx.sbs",
    "microsoft.com",
    "live.com",
    "qidian.com",
    "epicgames.com",
    "test.ustc.edu.cn"
  ];
  for (var i = 0; i < chinaDomains.length; i++) {
    if (dnsDomainIs(host, chinaDomains[i]) || shExpMatch(host, "*." + chinaDomains[i])) {
      return direct;
    }
  }

  // 其他一律走代理
  return proxy;
}
