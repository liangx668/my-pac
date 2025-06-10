function FindProxyForURL(url, host) {
  var proxy = "SOCKS5 192.168.2.200:7890; SOCKS 192.168.2.200:7890";
  var direct = "DIRECT";

  // Apple / iCloud / iOS 相关域名直连
  var appleDomains = [
    "apple.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "apple-dns.net",
    "appleid.apple.com",
    "itunes.apple.com",
    "api.apple-cloudkit.com",
    "gs.apple.com",
    "push.apple.com",
    "configuration.apple.com",
    "updates-http.cdn-apple.com",
    "updates.cdn-apple.com",
    "mzstatic.com",
    "icloud-content.com"
  ];
  for (var i = 0; i < appleDomains.length; i++) {
    if (dnsDomainIs(host, appleDomains[i]) || shExpMatch(host, "*." + appleDomains[i])) {
      return direct;
    }
  }

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

var facebookDomains = [
  "facebook.com",
  "facebook.net",
  "fbcdn.net",
  "messenger.com"
];
for (var i = 0; i < facebookDomains.length; i++) {
  if (dnsDomainIs(host, facebookDomains[i]) || shExpMatch(host, "*." + facebookDomains[i])) {
    return proxy;
  }
}


  // 其他一律走代理
  return proxy;
}
