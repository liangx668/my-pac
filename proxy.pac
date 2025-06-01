function FindProxyForURL(url, host) {
  // 直连局域网、localhost
  if (
    shExpMatch(host, "*.local") ||
    shExpMatch(host, "localhost") ||
    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")
  ) return "DIRECT";

  // 常见国内域名直连（可扩展）
  var direct_domains = [
    "baidu.com", "qq.com", "bilibili.com", "sina.com.cn",
    "jd.com", "taobao.com", "tmall.com", "aliyun.com", "weibo.com",
    "douyin.com", ".cn"
  ];
  for (var i = 0; i < direct_domains.length; i++) {
    if (shExpMatch(host, "*" + direct_domains[i])) return "DIRECT";
  }

  // 其余全部走手机代理（HTTP 或 SOCKS5 任选其一）
  return "SOCKS5 192.168.10.5:7890; PROXY 192.168.10.5:7890";
}
