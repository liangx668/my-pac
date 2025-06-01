function FindProxyForURL(url, host) {
  // 局域网和本地服务直连
  if (
    shExpMatch(host, "*.local") ||
    shExpMatch(host, "localhost") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")
  ) {
    return "DIRECT";
  }

  // 国内常见域名直连
  var direct_domains = [
    ".cn", "baidu.com", "qq.com", "taobao.com", "jd.com", 
    "weibo.com", "bilibili.com", "sina.com.cn", "aliyun.com"
  ];
  for (var i = 0; i < direct_domains.length; i++) {
    if (shExpMatch(host, "*" + direct_domains[i])) {
      return "DIRECT";
    }
  }

  // 其余流量走 HTTP 代理 （v2rayNG 在手机上监听 10809）
  return "PROXY 192.168.10.5:7890";
}
