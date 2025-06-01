function FindProxyForURL(url, host) {
  if (
    shExpMatch(host, "*.local") ||
    shExpMatch(host, "localhost") ||
    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")
  ) return "DIRECT";

  var direct_domains = [
    "baidu.com", "qq.com", "bilibili.com", "sina.com.cn", "jd.com", "taobao.com",
    "tmall.com", "aliyun.com", "weibo.com", "douyin.com", "kuaishou.com",
    "zhihu.com", "xigua.com", "163.com", ".cn", "gov.cn", "edu.cn"
  ];
  for (var i = 0; i < direct_domains.length; i++) {
    if (shExpMatch(host, "*" + direct_domains[i])) return "DIRECT";
  }

  // 国内 IP 段判断（可扩展）
  if (
    isInNet(dnsResolve(host), "36.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "39.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "42.0.0.0", "255.0.0.0")
  ) return "DIRECT";

  // 默认通过手机代理（先 SOCKS5，再 HTTP 兜底）
  return "SOCKS5 192.168.10.5:7890";
}
