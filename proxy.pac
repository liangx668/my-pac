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

  // 3. 国内主流域名直连（你可继续补充）
  var direct_domains = [
    "baidu.com", "qq.com", "bilibili.com", "sina.com.cn",
    "jd.com", "taobao.com", "tmall.com", "aliyun.com", "weibo.com",
    "douyin.com", ".cn", "youku.com", "iqiyi.com", "ifeng.com",
    "zhihu.com", "kuaishou.com", "mi.com"
  ];
  for (var i = 0; i < direct_domains.length; i++) {
    if (shExpMatch(host, "*" + direct_domains[i])) {
      return "DIRECT";
    }
  }

  // 4. 强制代理访问的国外网站（保证访问畅通）
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

  // 5. 其他网站默认走代理
  return "SOCKS5 192.168.10.5:7890; PROXY 192.168.10.5:7890";
}
