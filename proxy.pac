function FindProxyForURL(url, host) {
  var proxy = "SOCKS5 192.168.2.200:7890; SOCKS 192.168.2.200:7890; DIRECT";
  var direct = "DIRECT";

  // 本地地址或局域网直连
  if (
    isPlainHostName(host) ||
    dnsDomainIs(host, ".local") ||
    shExpMatch(host, "10.*") ||
    shExpMatch(host, "192.168.*") ||
    shExpMatch(host, "127.*") ||
    shExpMatch(host, "172.16.*") ||
    shExpMatch(host, "172.17.*") ||
    shExpMatch(host, "172.18.*") ||
    shExpMatch(host, "172.19.*") ||
    shExpMatch(host, "172.20.*") ||
    shExpMatch(host, "172.21.*") ||
    shExpMatch(host, "172.22.*") ||
    shExpMatch(host, "172.23.*") ||
    shExpMatch(host, "172.24.*") ||
    shExpMatch(host, "172.25.*") ||
    shExpMatch(host, "172.26.*") ||
    shExpMatch(host, "172.27.*") ||
    shExpMatch(host, "172.28.*") ||
    shExpMatch(host, "172.29.*") ||
    shExpMatch(host, "172.30.*") ||
    shExpMatch(host, "172.31.*")
  ) {
    return direct;
  }

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
    "kuaishou.com"
  ];
  for (var i = 0; i < chinaDomains.length; i++) {
    if (dnsDomainIs(host, chinaDomains[i]) || shExpMatch(host, "*." + chinaDomains[i])) {
      return direct;
    }
  }

  // 常见中国 IP 段直连（适配国内 CDN 和解析）
  var resolved_ip = dnsResolve(host);
  if (resolved_ip) {
    if (
      isInNet(resolved_ip, "10.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "172.16.0.0", "255.240.0.0") ||
      isInNet(resolved_ip, "192.168.0.0", "255.255.0.0") ||
      isInNet(resolved_ip, "100.64.0.0", "255.192.0.0") ||
      isInNet(resolved_ip, "127.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "36.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "58.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "59.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "60.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "61.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "101.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "103.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "106.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "110.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "112.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "113.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "114.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "115.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "116.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "117.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "118.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "119.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "120.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "121.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "122.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "123.0.0.0", "255.0.0.0") ||
      isInNet(resolved_ip, "124.0.0.0", "255.0.0.0")
    ) {
      return direct;
    }
  }

  // 其他一律走代理
  return proxy;
}
