function FindProxyForURL(url, host) {
  // 代理服务器地址（请替换为你自己的代理）
  var proxy = "PROXY 192.168.2.200:10808";
  var direct = "DIRECT";

  // 黑名单：国外主流网站 + ChatGPT/OpenAI
  var blacklist = [
    "google.com",
    "gstatic.com",
    "googleapis.com",
    "youtube.com",
    "ytimg.com",
    "facebook.com",
    "fbcdn.net",
    "instagram.com",
    "twitter.com",
    "t.co",
    "twimg.com",
    "telegram.org",
    "t.me",
    "whatsapp.com",
    "netflix.com",
    "nflximg.net",
    "nflxvideo.net",
    "tiktok.com",
    "musical.ly",
    "snapchat.com",
    "discord.com",
    "discordapp.com",
    "reddit.com",
    "pinterest.com",
    "quora.com",
    "dropbox.com",
    "github.com",
    "gitlab.com",
    "medium.com",
    "tumblr.com",
    "soundcloud.com",
    "spotify.com",
    "zoom.us",
    "skype.com",
    "line.me",
    "viber.com",
    "signal.org",
    "naver.com",
    "daum.net",
    // ChatGPT / OpenAI 系列
    "openai.com",
    "chatgpt.com",
    "oaistatic.com",
    "auth0.com",
    "oaiusercontent.com"
  ];

  var hostLower = host.toLowerCase();

  for (var i = 0; i < blacklist.length; i++) {
    if (dnsDomainIs(hostLower, blacklist[i]) || shExpMatch(hostLower, "*." + blacklist[i])) {
      return proxy;
    }
  }

  return direct;
}
