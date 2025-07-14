function FindProxyForURL(url, host) {
    // 所有请求都走 SOCKS5 代理
    return "SOCKS5 192.168.2.200:10808";
}
