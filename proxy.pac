function FindProxyForURL(url, host) {
  // 1. 局域网、本地地址直连
  if (
    shExpMatch(host, "*.local") ||
    shExpMatch(host, "localhost") ||
    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")
  ) {
    return "DIRECT";
  }

  // 2. IP地址直连（避免dns误判，IP段根据需要调整）
  if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
      isInNet(host, "192.168.0.0", "255.255.0.0") ||
      isInNet(host, "127.0.0.0", "255.0.0.0") ||
      isInNet(host, "172.16.0.0", "255.240.0.0")) {
    return "DIRECT";
  }

  // 3. 国内主流域名直连，结尾加$更精确匹配，防止误判
  var direct_domains = [
    "baidu.com$", "qq.com$", "bilibili.com$", "sina.com.cn$",
    "jd.com$", "taobao.com$", "tmall.com$", "aliyun.com$", "weibo.com$",
    "douyin.com$", ".cn$", "youku.com$", "iqiyi.com$", "ifeng.com$",
    "zhihu.com$", "kuaishou.com$", "mi.com$"
  ];
  for (var i = 0; i < direct_domains.length; i++) {
    if (shExpMatch(host, "*" + direct_domains[i])) {
      return "DIRECT";
    }
  }

  // 4. Apple相关服务直连，保证系统功能正常
  var apple_domains = [
    "apple.com$", "icloud.com$", "mzstatic.com$", "akadns.net$", "cdn-apple.com$",
    "itunes.apple.com$", "apps.apple.com$", "push.apple.com$", "api.smoot.apple.com$",
    "mzstatic.com$", "edgekey.net$", "akadns.net$"
  ];
  for (var i = 0; i < apple_domains.length; i++) {
    if (shExpMatch(host, "*" + apple_domains[i])) {
      return "DIRECT";
    }
  }

  // 5. 强制走代理的国外主流网站，保证访问畅通
  var proxy_domains = [
    "google.com", "youtube.com", "facebook.com",
    "twitter.com", "instagram.com", "wikipedia.org",
    "github.com", "reddit.com"
  ];
  for (var i = 0; i < proxy_domains.length; i++) {
    if (shExpMatch(host, "*" + proxy_domains[i])) {
      return "SOCKS5 192.168.10.5:7890; PROXY 192.168.10.5:7890";
    }
  }

  // 6. 其他所有网站走代理
  return "SOCKS5 192.168.10.5:7890; PROXY 192.168.10.5:7890";
}
