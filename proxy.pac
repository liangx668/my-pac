function FindProxyForURL(url, host) {
    var directList = [
        "*.baidu.com",
        "*.bilibili.com",
        "*.qq.com",
        "*.tencent.com",
        "*.aliyun.com",
        "*.alibaba.com",
        "*.jd.com",
        "*.taobao.com",
        "*.tmall.com",
        "*.douyin.com",
        "*.bytedance.com",
        "*.zhihu.com",
        "*.weibo.com",
        "*.sina.com.cn",
        "*.360.cn",
        "*.sohu.com",
        "*.youku.com",
        "*.iqiyi.com",
        "*.mi.com",
        "*.xiaomi.com",
        "cn.bing.com",
        "*.gtimg.cn",
        "*.cn",
        "localhost",
        "127.0.0.1"
    ];

    // 先将 host 转小写，确保匹配统一
    host = host.toLowerCase();

    // 判断是否在 directList 中（支持通配符）
    for (var i = 0; i < directList.length; i++) {
        var domain = directList[i].replace(/\./g, "\\.").replace(/\*/g, ".*");
        var regex = new RegExp("^" + domain + "$");
        if (regex.test(host)) {
            return "DIRECT";
        }
    }

    // 默认走代理（HTTP PROXY）
    return "PROXY 192.168.2.200:10808";
}
