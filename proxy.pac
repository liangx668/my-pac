function FindProxyForURL(url, host) {
  // 1. 局域网、本地地址直连
  if (
    shExpMatch(host, "*.local") ||
    shExpMatch(host, "localhost") ||
    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0")
  ) {
    return "DIRECT";
  }

  // 2. 常用国外服务走代理
  var proxy_domains = [
    // ChatGPT & OpenAI
    "openai.com", "chat.openai.com", "auth0.com",
    
    // Google 系
    "google.com", "gstatic.com", "googleapis.com", "googleusercontent.com", "googlesyndication.com", "googlevideo.com", "ytimg.com", "youtube.com", "youtube-nocookie.com", "withgoogle.com",

    // Facebook 系
    "facebook.com", "fbcdn.net", "facebook.net", "messenger.com",

    // X / Twitter
    "twitter.com", "t.co", "x.com",

    // Telegram
    "telegram.org", "t.me",

    // Instagram
    "instagram.com", "cdninstagram.com",

    // Discord
    "discord.com", "discord.gg", "discordapp.com", "discordmedia.com",

    // Reddit
    "reddit.com", "redd.it", "redditmedia.com",

    // Github
    "github.com", "githubusercontent.com", "githubassets.com", "ghcr.io",

    // Microsoft & Outlook
    "microsoft.com", "live.com", "outlook.com", "office.com", "msn.com",

    // Netflix
    "netflix.com", "nflximg.net", "nflxvideo.net", "nflxso.net",

    // Twitch
    "twitch.tv", "ttvnw.net",

    // Zoom & Teams
    "zoom.us", "zoom.com", "teams.microsoft.com",

    // CDN / 基础资源
    "cloudflare.com", "cloudfront.net", "akamai.net", "fastly.net",

    // 其它常见
    "medium.com", "notion.so", "slack.com", "duckduckgo.com", "line.me", "pinterest.com", "vimeo.com"
  ];

  for (var i = 0; i < proxy_domains.length; i++) {
    if (shExpMatch(host, "*" + proxy_domains[i])) {
      return "SOCKS5 192.168.10.5:7890; PROXY 192.168.10.5:7890";
    }
  }

  // 3. 其它默认直连
  return "DIRECT";
}
