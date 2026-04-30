const VERSION = "v5.3.0";
function isInfoNode(name) {
  const infoPatterns = [
    "导航网址",
    "距离下次重置",
    "剩余流量",
    "套餐到期",
    "网址导航",
    "官网",
    "订阅",
    "到期",
    "剩余",
    "重置",
  ];
  const s = String(name || "");
  return infoPatterns.some((p) => s.includes(p));
}
const RESIDENTIAL_PATTERNS = [
  /家宽|家庭宽带|家庭住宅|住宅宽带|住宅|宽带/,
  /\bresi(?:dential)?\b/i,
  /\bhome(?:\s|-|_)?ip\b/i,
  /\bhome(?:\s|-|_)?broadband\b/i,
  /\bbroadband\b/i,
  /\bisp\b/i,
];
function isResidentialNode(name) {
  const s = String(name || "");
  return RESIDENTIAL_PATTERNS.some((re) => re.test(s));
}
const REGION_DB = [
  { id: "HK", kw: ["香港", "hong kong", "hongkong", "hkg"], iso: ["HK"] },
  {
    id: "TW",
    kw: [
      "台湾",
      "台北",
      "台中",
      "高雄",
      "新北",
      "桃园",
      "taiwan",
      "taipei",
      "taichung",
      "kaohsiung",
      "tpe",
      "twn",
    ],
    iso: ["TW"],
  },
  {
    id: "CN",
    kw: [
      "中国",
      "大陆",
      "国内",
      "中国大陆",
      "china",
      "mainland",
      "回国节点",
      "回国专线",
      "回国线路",
      "回国加速",
      "回国服务",
      "直连国内",
      "国内直连",
      "中转国内",
      "落地国内",
      "北京",
      "上海",
      "广州",
      "深圳",
      "beijing",
      "shanghai",
      "guangzhou",
      "shenzhen",
      "成都",
      "重庆",
      "杭州",
      "南京",
      "武汉",
      "天津",
      "苏州",
      "西安",
      "长沙",
      "chengdu",
      "chongqing",
      "hangzhou",
      "nanjing",
      "wuhan",
      "tianjin",
      "suzhou",
      "xian",
      "changsha",
      "沈阳",
      "青岛",
      "郑州",
      "大连",
      "东莞",
      "宁波",
      "厦门",
      "济南",
      "无锡",
      "合肥",
      "昆明",
      "福州",
      "哈尔滨",
      "佛山",
      "长春",
      "石家庄",
      "太原",
      "南宁",
      "贵阳",
      "乌鲁木齐",
      "兰州",
      "海口",
      "银川",
      "西宁",
      "拉萨",
      "呼和浩特",
      "电信",
      "联通",
      "移动",
      "铁通",
      "chinatelecom",
      "chinaunicom",
      "chinamobile",
      "chn",
      "pek",
      "pkx",
      "pvg",
      "szx",
      "ctu",
      "ckg",
      "hgh",
      "nkg",
      "wuh",
      "tsn",
      "syx",
      "xiy",
      "csx",
      "kmg",
      "hak",
      "dlc",
      "tao",
      "she",
      "hrb",
      "cgo",
    ],
    iso: ["CN"],
  },
  {
    id: "JP",
    kw: [
      "日本",
      "东京",
      "大阪",
      "横滨",
      "名古屋",
      "福冈",
      "札幌",
      "京都",
      "神户",
      "千叶",
      "埼玉",
      "仙台",
      "广岛",
      "冲绳",
      "那霸",
      "japan",
      "tokyo",
      "osaka",
      "yokohama",
      "nagoya",
      "fukuoka",
      "sapporo",
      "kyoto",
      "kobe",
      "chiba",
      "sendai",
      "hiroshima",
      "okinawa",
      "naha",
      "jpn",
      "nrt",
      "hnd",
      "kix",
      "ngo",
      "fuk",
      "cts",
      "oka",
    ],
    iso: ["JP"],
  },
  {
    id: "KR",
    kw: [
      "韩国",
      "首尔",
      "釜山",
      "仁川",
      "大田",
      "大邱",
      "光州",
      "济州",
      "korea",
      "seoul",
      "busan",
      "incheon",
      "daejeon",
      "daegu",
      "gwangju",
      "jeju",
      "kor",
      "icn",
      "gmp",
      "pus",
    ],
    iso: ["KR"],
  },
  {
    id: "SG",
    kw: ["新加坡", "singapore", "sgp", "狮城", "sg", "sing", "sin"],
    iso: ["SG"],
  },
  {
    id: "US",
    kw: [
      "美国",
      "united states",
      "america",
      "usa",
      "洛杉矶",
      "los angeles",
      "圣何塞",
      "san jose",
      "旧金山",
      "三藩市",
      "san francisco",
      "西雅图",
      "seattle",
      "纽约",
      "new york",
      "芝加哥",
      "chicago",
      "达拉斯",
      "dallas",
      "丹佛",
      "denver",
      "凤凰城",
      "phoenix",
      "亚特兰大",
      "atlanta",
      "迈阿密",
      "miami",
      "波士顿",
      "boston",
      "华盛顿",
      "washington",
      "费城",
      "philadelphia",
      "休斯顿",
      "houston",
      "圣地亚哥",
      "san diego",
      "拉斯维加斯",
      "las vegas",
      "波特兰",
      "portland",
      "硅谷",
      "silicon valley",
      "弗吉尼亚",
      "virginia",
      "夏洛特",
      "charlotte",
      "奥斯汀",
      "austin",
      "纳什维尔",
      "nashville",
      "盐湖城",
      "salt lake",
      "明尼阿波利斯",
      "minneapolis",
      "圣路易斯",
      "st louis",
      "堪萨斯",
      "kansas city",
      "底特律",
      "detroit",
      "匹兹堡",
      "pittsburgh",
      "克利夫兰",
      "cleveland",
      "檀香山",
      "honolulu",
      "安克雷奇",
      "anchorage",
      "lax",
      "sjc",
      "sfo",
      "sea",
      "jfk",
      "ewr",
      "ord",
      "dfw",
      "iad",
      "atl",
      "mia",
      "bos",
      "den",
      "phx",
      "iah",
      "msp",
      "dtw",
      "phl",
      "san",
      "las",
      "slc",
      "pdx",
      "clt",
      "hnl",
      "anc",
    ],
    iso: ["US"],
  },
  {
    id: "EU",
    kw: [
      "欧洲",
      "europe",
      "英国",
      "united kingdom",
      "england",
      "britain",
      "london",
      "伦敦",
      "manchester",
      "曼彻斯特",
      "birmingham",
      "glasgow",
      "edinburgh",
      "liverpool",
      "leeds",
      "bristol",
      "lhr",
      "lgw",
      "man",
      "edi",
      "爱尔兰",
      "ireland",
      "dublin",
      "都柏林",
      "法国",
      "france",
      "paris",
      "巴黎",
      "marseille",
      "马赛",
      "lyon",
      "里昂",
      "nice",
      "toulouse",
      "cdg",
      "ory",
      "德国",
      "germany",
      "frankfurt",
      "法兰克福",
      "berlin",
      "柏林",
      "munich",
      "慕尼黑",
      "hamburg",
      "汉堡",
      "dusseldorf",
      "cologne",
      "fra",
      "muc",
      "ber",
      "荷兰",
      "netherlands",
      "holland",
      "amsterdam",
      "阿姆斯特丹",
      "rotterdam",
      "ams",
      "比利时",
      "belgium",
      "brussels",
      "布鲁塞尔",
      "卢森堡",
      "luxembourg",
      "瑞士",
      "switzerland",
      "zurich",
      "苏黎世",
      "geneva",
      "日内瓦",
      "bern",
      "zrh",
      "奥地利",
      "austria",
      "vienna",
      "维也纳",
      "vie",
      "列支敦士登",
      "liechtenstein",
      "摩纳哥",
      "monaco",
      "丹麦",
      "denmark",
      "copenhagen",
      "哥本哈根",
      "冰岛",
      "iceland",
      "reykjavik",
      "挪威",
      "norway",
      "oslo",
      "奥斯陆",
      "瑞典",
      "sweden",
      "stockholm",
      "斯德哥尔摩",
      "芬兰",
      "finland",
      "helsinki",
      "赫尔辛基",
      "爱沙尼亚",
      "estonia",
      "tallinn",
      "塔林",
      "拉脱维亚",
      "latvia",
      "riga",
      "里加",
      "立陶宛",
      "lithuania",
      "vilnius",
      "维尔纽斯",
      "意大利",
      "italy",
      "rome",
      "罗马",
      "milan",
      "米兰",
      "naples",
      "florence",
      "fco",
      "mxp",
      "西班牙",
      "spain",
      "madrid",
      "马德里",
      "barcelona",
      "巴塞罗那",
      "mad",
      "bcn",
      "葡萄牙",
      "portugal",
      "lisbon",
      "里斯本",
      "希腊",
      "greece",
      "athens",
      "雅典",
      "马耳他",
      "malta",
      "安道尔",
      "andorra",
      "圣马力诺",
      "san marino",
      "波兰",
      "poland",
      "warsaw",
      "华沙",
      "krakow",
      "waw",
      "捷克",
      "czech",
      "prague",
      "布拉格",
      "斯洛伐克",
      "slovakia",
      "bratislava",
      "匈牙利",
      "hungary",
      "budapest",
      "布达佩斯",
      "罗马尼亚",
      "romania",
      "bucharest",
      "布加勒斯特",
      "保加利亚",
      "bulgaria",
      "sofia",
      "索菲亚",
      "俄罗斯",
      "russia",
      "moscow",
      "莫斯科",
      "svo",
      "dme",
      "乌克兰",
      "ukraine",
      "kiev",
      "kyiv",
      "基辅",
      "白俄罗斯",
      "belarus",
      "minsk",
      "明斯克",
      "摩尔多瓦",
      "moldova",
      "chisinau",
      "塞尔维亚",
      "serbia",
      "belgrade",
      "贝尔格莱德",
      "黑山",
      "montenegro",
      "克罗地亚",
      "croatia",
      "zagreb",
      "斯洛文尼亚",
      "slovenia",
      "ljubljana",
      "波黑",
      "bosnia",
      "herzegovina",
      "sarajevo",
      "马其顿",
      "macedonia",
      "skopje",
      "阿尔巴尼亚",
      "albania",
      "tirana",
      "科索沃",
      "kosovo",
      "pristina",
      "塞浦路斯",
      "cyprus",
      "nicosia",
      "格鲁吉亚",
      "georgia",
      "tbilisi",
      "第比利斯",
    ],
    iso: [
      "GB",
      "UK",
      "IE",
      "FR",
      "DE",
      "NL",
      "LU",
      "CH",
      "DK",
      "SE",
      "FI",
      "EE",
      "LV",
      "LT",
      "ES",
      "PT",
      "GR",
      "PL",
      "CZ",
      "SK",
      "HU",
      "RO",
      "BG",
      "RU",
      "UA",
      "MD",
      "RS",
      "HR",
      "SI",
      "MK",
      "XK",
      "CY",
      "GE",
      "EU",
    ],
  },
  {
    id: "AM",
    kw: [
      "美洲",
      "americas",
      "拉丁美洲",
      "latin america",
      "南美",
      "south america",
      "中美洲",
      "central america",
      "加勒比",
      "caribbean",
      "加拿大",
      "canada",
      "toronto",
      "多伦多",
      "vancouver",
      "温哥华",
      "montreal",
      "蒙特利尔",
      "ottawa",
      "渥太华",
      "calgary",
      "卡尔加里",
      "edmonton",
      "winnipeg",
      "yyz",
      "yvr",
      "yul",
      "墨西哥",
      "mexico",
      "mexico city",
      "墨西哥城",
      "cancun",
      "坎昆",
      "guadalajara",
      "monterrey",
      "mex",
      "危地马拉",
      "guatemala",
      "伯利兹",
      "belize",
      "萨尔瓦多",
      "el salvador",
      "洪都拉斯",
      "honduras",
      "尼加拉瓜",
      "nicaragua",
      "哥斯达黎加",
      "costa rica",
      "巴拿马",
      "panama",
      "古巴",
      "cuba",
      "牙买加",
      "jamaica",
      "多米尼加",
      "dominican republic",
      "波多黎各",
      "puerto rico",
      "巴哈马",
      "bahamas",
      "巴巴多斯",
      "barbados",
      "特立尼达",
      "trinidad",
      "海地",
      "haiti",
      "巴西",
      "brazil",
      "sao paulo",
      "圣保罗",
      "rio de janeiro",
      "里约热内卢",
      "gru",
      "gig",
      "阿根廷",
      "argentina",
      "buenos aires",
      "布宜诺斯艾利斯",
      "eze",
      "智利",
      "chile",
      "santiago",
      "秘鲁",
      "peru",
      "lima",
      "利马",
      "哥伦比亚",
      "colombia",
      "bogota",
      "波哥大",
      "medellin",
      "委内瑞拉",
      "venezuela",
      "厄瓜多尔",
      "ecuador",
      "玻利维亚",
      "bolivia",
      "巴拉圭",
      "paraguay",
      "乌拉圭",
      "uruguay",
      "montevideo",
      "圭亚那",
      "guyana",
      "苏里南",
      "suriname",
    ],
    iso: [
      "CA",
      "MX",
      "GT",
      "BZ",
      "SV",
      "HN",
      "NI",
      "CR",
      "PA",
      "CU",
      "JM",
      "PR",
      "BS",
      "BB",
      "TT",
      "HT",
      "BR",
      "AR",
      "CL",
      "PE",
      "CO",
      "VE",
      "EC",
      "BO",
      "PY",
      "UY",
      "GY",
      "SR",
    ],
  },
  {
    id: "AF",
    kw: [
      "非洲",
      "africa",
      "埃及",
      "egypt",
      "cairo",
      "开罗",
      "cai",
      "苏丹",
      "sudan",
      "南苏丹",
      "south sudan",
      "利比亚",
      "libya",
      "突尼斯",
      "tunisia",
      "阿尔及利亚",
      "algeria",
      "摩洛哥",
      "morocco",
      "casablanca",
      "埃塞俄比亚",
      "ethiopia",
      "索马里",
      "somalia",
      "肯尼亚",
      "kenya",
      "nairobi",
      "nbo",
      "坦桑尼亚",
      "tanzania",
      "乌干达",
      "uganda",
      "卢旺达",
      "rwanda",
      "布隆迪",
      "burundi",
      "厄立特里亚",
      "eritrea",
      "吉布提",
      "djibouti",
      "马达加斯加",
      "madagascar",
      "毛里求斯",
      "mauritius",
      "莫桑比克",
      "mozambique",
      "塞舌尔",
      "seychelles",
      "赞比亚",
      "zambia",
      "津巴布韦",
      "zimbabwe",
      "马拉维",
      "malawi",
      "喀麦隆",
      "cameroon",
      "刚果",
      "congo",
      "安哥拉",
      "angola",
      "加蓬",
      "gabon",
      "乍得",
      "chad",
      "中非",
      "central african",
      "赤道几内亚",
      "equatorial guinea",
      "南非",
      "south africa",
      "johannesburg",
      "约翰内斯堡",
      "cape town",
      "开普敦",
      "pretoria",
      "jnb",
      "cpt",
      "纳米比亚",
      "namibia",
      "博茨瓦纳",
      "botswana",
      "莱索托",
      "lesotho",
      "斯威士兰",
      "eswatini",
      "swaziland",
      "尼日利亚",
      "nigeria",
      "lagos",
      "abuja",
      "加纳",
      "ghana",
      "accra",
      "塞内加尔",
      "senegal",
      "dakar",
      "马里",
      "mali",
      "布基纳法索",
      "burkina faso",
      "几内亚",
      "guinea",
      "科特迪瓦",
      "ivory coast",
      "cote d'ivoire",
      "塞拉利昂",
      "sierra leone",
      "利比里亚",
      "liberia",
      "多哥",
      "togo",
      "贝宁",
      "benin",
      "尼日尔",
      "niger",
      "毛里塔尼亚",
      "mauritania",
      "冈比亚",
      "gambia",
      "佛得角",
      "cape verde",
    ],
    iso: [
      "EG",
      "SD",
      "SS",
      "LY",
      "TN",
      "DZ",
      "ET",
      "KE",
      "TZ",
      "UG",
      "RW",
      "MG",
      "MU",
      "MZ",
      "ZM",
      "ZW",
      "MW",
      "CM",
      "CD",
      "CG",
      "AO",
      "GA",
      "TD",
      "ZA",
      "BW",
      "LS",
      "SZ",
      "NG",
      "GH",
      "SN",
      "ML",
      "BF",
      "GN",
      "CI",
      "SL",
      "LR",
      "TG",
      "BJ",
      "NE",
      "MR",
      "GM",
      "CV",
    ],
  },
  {
    id: "APAC_OTHER",
    kw: [
      "马来",
      "亚太",
      "apac",
      "asia pacific",
      "asia",
      "亚洲",
      "大洋洲",
      "oceania",
      "iplc",
      "iepl",
      "专线",
      "低延迟",
      "cn2",
      "gia",
      "马来西亚",
      "malaysia",
      "kuala lumpur",
      "吉隆坡",
      "kul",
      "印度尼西亚",
      "印尼",
      "indonesia",
      "jakarta",
      "雅加达",
      "泰国",
      "thailand",
      "bangkok",
      "曼谷",
      "bkk",
      "越南",
      "vietnam",
      "hanoi",
      "河内",
      "ho chi minh",
      "胡志明",
      "saigon",
      "sgn",
      "han",
      "菲律宾",
      "philippines",
      "manila",
      "马尼拉",
      "mnl",
      "柬埔寨",
      "cambodia",
      "phnom penh",
      "金边",
      "缅甸",
      "myanmar",
      "yangon",
      "老挝",
      "laos",
      "vientiane",
      "文莱",
      "brunei",
      "东帝汶",
      "timor-leste",
      "印度",
      "india",
      "mumbai",
      "孟买",
      "delhi",
      "新德里",
      "bangalore",
      "班加罗尔",
      "chennai",
      "hyderabad",
      "kolkata",
      "bom",
      "del",
      "blr",
      "巴基斯坦",
      "pakistan",
      "karachi",
      "islamabad",
      "孟加拉",
      "bangladesh",
      "dhaka",
      "斯里兰卡",
      "sri lanka",
      "colombo",
      "尼泊尔",
      "nepal",
      "kathmandu",
      "马尔代夫",
      "maldives",
      "不丹",
      "bhutan",
      "阿富汗",
      "afghanistan",
      "土耳其",
      "turkey",
      "turkiye",
      "istanbul",
      "伊斯坦布尔",
      "ankara",
      "ist",
      "以色列",
      "israel",
      "tel aviv",
      "tlv",
      "沙特",
      "saudi",
      "riyadh",
      "阿联酋",
      "uae",
      "emirates",
      "dubai",
      "迪拜",
      "abu dhabi",
      "dxb",
      "auh",
      "卡塔尔",
      "qatar",
      "doha",
      "doh",
      "科威特",
      "kuwait",
      "巴林",
      "bahrain",
      "阿曼",
      "oman",
      "muscat",
      "伊拉克",
      "iraq",
      "baghdad",
      "伊朗",
      "iran",
      "tehran",
      "约旦",
      "jordan",
      "amman",
      "黎巴嫩",
      "lebanon",
      "beirut",
      "叙利亚",
      "syria",
      "也门",
      "yemen",
      "巴勒斯坦",
      "palestine",
      "亚美尼亚",
      "armenia",
      "yerevan",
      "阿塞拜疆",
      "azerbaijan",
      "baku",
      "哈萨克斯坦",
      "kazakhstan",
      "almaty",
      "astana",
      "乌兹别克斯坦",
      "uzbekistan",
      "tashkent",
      "吉尔吉斯斯坦",
      "kyrgyzstan",
      "土库曼斯坦",
      "turkmenistan",
      "塔吉克斯坦",
      "tajikistan",
      "澳门",
      "macau",
      "macao",
      "蒙古",
      "mongolia",
      "ulaanbaatar",
      "澳大利亚",
      "australia",
      "sydney",
      "悉尼",
      "melbourne",
      "墨尔本",
      "brisbane",
      "perth",
      "adelaide",
      "syd",
      "mel",
      "新西兰",
      "new zealand",
      "auckland",
      "奥克兰",
      "wellington",
      "akl",
      "斐济",
      "fiji",
      "巴布亚新几内亚",
      "papua new guinea",
      "关岛",
      "guam",
      "新喀里多尼亚",
      "new caledonia",
    ],
    iso: [
      "IN",
      "IND",
      "MY",
      "ID",
      "TH",
      "VN",
      "PH",
      "KH",
      "MM",
      "BN",
      "TL",
      "PK",
      "BD",
      "LK",
      "NP",
      "MV",
      "BT",
      "AF",
      "TR",
      "IL",
      "AE",
      "QA",
      "KW",
      "BH",
      "OM",
      "IQ",
      "IR",
      "JO",
      "LB",
      "SY",
      "YE",
      "PS",
      "AZ",
      "KZ",
      "UZ",
      "KG",
      "TM",
      "TJ",
      "MO",
      "MN",
      "AU",
      "NZ",
      "FJ",
      "PG",
      "GU",
      "NC",
      "PF",
    ],
  },
];
const _regexCache = new Map();
function _getWordBoundaryRegex(keyword, caseSensitive) {
  const key = (caseSensitive ? "S:" : "I:") + keyword;
  if (_regexCache.has(key)) return _regexCache.get(key);
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const flags = caseSensitive ? "" : "i";
  const re = new RegExp("(^|[^a-zA-Z])" + escaped + "([^a-zA-Z]|$)", flags);
  _regexCache.set(key, re);
  return re;
}
function _isChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}
const _compiledRegions = REGION_DB.map(function (region) {
  var matchers = [];
  for (var i = 0; i < region.iso.length; i++) {
    matchers.push({
      type: "iso",
      regex: _getWordBoundaryRegex(region.iso[i], true),
    });
  }
  for (var j = 0; j < region.kw.length; j++) {
    var kw = region.kw[j];
    if (_isChinese(kw)) {
      matchers.push({ type: "cn", text: kw });
    } else {
      matchers.push({ type: "en", regex: _getWordBoundaryRegex(kw, false) });
    }
  }
  return { id: region.id, matchers: matchers };
});
function classifyNode(name) {
  var nameStr = String(name || "");
  if (!nameStr) return null;
  for (var i = 0; i < _compiledRegions.length; i++) {
    var region = _compiledRegions[i];
    for (var j = 0; j < region.matchers.length; j++) {
      var m = region.matchers[j];
      if (m.type === "cn") {
        if (nameStr.indexOf(m.text) !== -1) return region.id;
      } else {
        if (m.regex.test(nameStr)) return region.id;
      }
    }
  }
  return null;
}
function classifyAllNodes(proxies) {
  var result = {
    HK: [],
    TW: [],
    CN: [],
    JP: [],
    KR: [],
    SG: [],
    US: [],
    EU: [],
    AM: [],
    AF: [],
    APAC_OTHER: [],
    UNCLASSIFIED: [],
    ALL: [],
    HOME_HK: [],
    HOME_TW: [],
    HOME_CN: [],
    HOME_JP: [],
    HOME_KR: [],
    HOME_SG: [],
    HOME_US: [],
    HOME_EU: [],
    HOME_AM: [],
    HOME_AF: [],
    HOME_APAC_OTHER: [],
    HOME_UNCLASSIFIED: [],
    HOME_ALL: [],
  };
  for (var i = 0; i < proxies.length; i++) {
    var p = proxies[i];
    if (!p || typeof p !== "object" || !p.name) continue;
    if (isInfoNode(p.name)) continue;
    var name = String(p.name);
    var isHome = isResidentialNode(name);
    result.ALL.push(name);
    if (isHome) result.HOME_ALL.push(name);
    var region = classifyNode(name);
    if (region && result[region]) {
      result[region].push(name);
      if (isHome && result["HOME_" + region])
        result["HOME_" + region].push(name);
    } else {
      result.UNCLASSIFIED.push(name);
      if (isHome) result.HOME_UNCLASSIFIED.push(name);
    }
  }
  return result;
}
const SMART = {
  GLOBAL: "🌍 全球节点",
  GLOBAL_HOME: "🏡 全球家宽",
  HK: "🇭🇰 香港节点",
  HK_HOME: "🏡 香港家宽",
  TW: "🇹🇼 台湾节点",
  TW_HOME: "🏡 台湾家宽",
  JP: "🇯🇵 日本节点",
  JP_HOME: "🏡 日本家宽",
  SG: "🇸🇬 坡县节点",
  SG_HOME: "🏡 坡县家宽",
  KR: "🇰🇷 小偷节点",
  KR_HOME: "🏡 小偷家宽",
  APAC: "🌏 亚太节点",
  APAC_HOME: "🏡 亚太家宽",
  US: "🇺🇸 美国节点",
  US_HOME: "🏡 美国家宽",
  EU: "🇪🇺 欧洲节点",
  EU_HOME: "🏡 欧洲家宽",
  AMERICAS: "🌎 美洲节点",
  AMERICAS_HOME: "🏡 美洲家宽",
  AFRICA: "🌍 非洲节点",
  AFRICA_HOME: "🏡 非洲家宽",
};
const BIZ = {
  AI: "🤖 AI 服务",
  GPTAI: "🤖 ChatGPT-AI 服务",
  CLAI: "🤖 Claude AI 服务",
  GAI: "🤖 Google AI 服务",
  CRYPTO: "💰 加密货币",
  PAYMENTS: "🏦 金融支付",
  WHITE: "🪐 ‍白名单",
  BLACK: "🏳️‍🌈 ‍黑名单",
  BILI: "📺 ‍B站(港澳台)",
  SPEED: "⚡ ‍测速",
  TIKTOK: "🎵 ‍抖音",
  IM: "💬 即时通讯",
  SOCIAL: "📱 社交媒体",
  WORK: "🧑‍💼 会议协作",
  CNMEDIA: "📺 国内流媒体",
  NFLX: "🎥 Netflix",
  DSNP: "🎬 Disney+",
  HBO: "📡 HBO/Max",
  HULU: "📺 Hulu",
  PRIME: "🎬 Prime Video",
  YT: "📹 YouTube",
  MUSIC: "🎵 音乐流媒体",
  STREAM_HK: "🇭🇰 香港流媒体",
  STREAM_TW: "🇹🇼 台湾流媒体",
  STREAM_JP: "🇯🇵 日韩流媒体",
  STREAM_EU: "🇪🇺 欧洲流媒体",
  STREAM_OTHER: "🌐 其他国外流媒体",
  GAME_CN: "🕹️ 国内游戏",
  GAME_INTL: "🎮 国外游戏",
  TOOLS: "🔧 工具与服务",
  BING: "🧊 ‍Bing",
  MS: "Ⓜ️ 微软服务",
  APPLE: "🍎 苹果服务",
  GOOGLE: "🇬 Google服务",
  OD: "💾 OneDrive",
  DOWNLOAD: "📥 下载更新",
  TRACKER: "🛰️ BT/PT Tracker",
  CN_SITE: "🏠 国内网站",
  GFW: "✈️ 受限网站",
  INTL_SITE: "🌐 国外网站",
  FINAL: "🐟 漏网之鱼",
  AD: "💩 广告拦截",
};
const REGION_ORDER = [
  "HK",
  "TW",
  "SG",
  "JP",
  "KR",
  "APAC",
  "US",
  "EU",
  "AMERICAS",
  "AFRICA",
  "GLOBAL",
];
const REGION_HOME_MAP = {
  GLOBAL: "GLOBAL_HOME",
  HK: "HK_HOME",
  TW: "TW_HOME",
  SG: "SG_HOME",
  JP: "JP_HOME",
  KR: "KR_HOME",
  APAC: "APAC_HOME",
  US: "US_HOME",
  EU: "EU_HOME",
  AMERICAS: "AMERICAS_HOME",
  AFRICA: "AFRICA_HOME",
};
const MANUAL = {
  HK: "📍🇭🇰 香港节点",
  TW: "📍🇹🇼 台湾节点",
  JP: "📍🇯🇵 日本节点",
  US: "📍🇺🇸 美国节点",
  SG: "📍🇸🇬 坡县节点",
  KR: "📍🇰🇷 小偷节点",
  APAC: "📍🌏 亚太节点",
  EU: "📍🇪🇺 欧洲节点",
  AMERICAS: "📍🌎 美洲节点",
  AFRICA: "📍🌍 非洲节点",
  GLOBAL: "📍🌍 全球节点",
};
const MANUAL_ORDER = [
  "HK",
  "TW",
  "JP",
  "US",
  "SG",
  "KR",
  "APAC",
  "EU",
  "AMERICAS",
  "AFRICA",
  "GLOBAL",
];
function withResidential(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (SMART[key]) result.push(SMART[key]);
    var homeKey = REGION_HOME_MAP[key];
    if (homeKey && SMART[homeKey]) result.push(SMART[homeKey]);
  }
  return result;
}
function buildStandardProxies() {
  return withResidential(REGION_ORDER).concat("DIRECT");
}
function buildHomeFirstProxies(keys) {
  var homes = [];
  var full = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var homeKey = REGION_HOME_MAP[key];
    if (homeKey && SMART[homeKey]) homes.push(SMART[homeKey]);
  }
  for (var j = 0; j < keys.length; j++) {
    var fullKey = keys[j];
    if (SMART[fullKey]) full.push(SMART[fullKey]);
  }
  return homes.concat(full, ["DIRECT"]);
}
function buildRegionPreferredProxies(primaryKey) {
  var order = [primaryKey].concat(
    REGION_ORDER.filter(function (key) {
      return key !== primaryKey;
    }),
  );
  return withResidential(order).concat("DIRECT");
}
function buildDirectFirstProxies() {
  return ["DIRECT"].concat(withResidential(REGION_ORDER));
}
function buildTrackerProxies() {
  return ["REJECT", "DIRECT"].concat(withResidential(["GLOBAL", "HK", "APAC"]));
}
function buildSeaProxies() {
  return withResidential([
    "APAC",
    "GLOBAL",
    "HK",
    "SG",
    "JP",
    "KR",
    "US",
  ]).concat("DIRECT");
}
const GEO_REGIONS_ALL = [
  "Asia_East",
  "Asia_EastSouth",
  "Asia_South",
  "Asia_Central",
  "Asia_West",
  "Asia_China",
  "America_North",
  "America_South",
  "Europe_West",
  "Europe_East",
  "Oceania",
  "Antarctica",
  "Africa_North",
  "Africa_South",
  "Africa_West",
  "Africa_East",
  "Africa_Central",
];
const GEO_REGIONS_INTL = GEO_REGIONS_ALL.filter((r) => r !== "Asia_China");
function upsertSmartGroup(config, name, proxies) {
  var group = {
    name: name,
    type: "smart",
    uselightgbm: true,
    collectdata: false,
    strategy: "sticky-sessions",
    interval: 480,
    tolerance: 100,
    proxies: proxies.slice(),
  };
  var idx = config["proxy-groups"].findIndex(function (g) {
    return g && g.name === name;
  });
  if (idx !== -1) {
    config["proxy-groups"][idx] = group;
  } else {
    config["proxy-groups"].push(group);
  }
  console.log(`[${VERSION}]Smart:"${name}"->${proxies.length}nodes`);
}
function injectBusinessGroups(config, activeSmartNames) {
  function filterActive(arr) {
    if (!activeSmartNames) return arr.slice();
    return arr.filter(function (p) {
      return activeSmartNames.has(p);
    });
  }
  var aiProxies = filterActive(buildHomeFirstProxies(REGION_ORDER));
  var standardProxies = filterActive(buildStandardProxies());
  var streamUsProxies = filterActive(buildRegionPreferredProxies("US"));
  var streamHkProxies = filterActive(buildRegionPreferredProxies("HK"));
  var streamTwProxies = filterActive(buildRegionPreferredProxies("TW"));
  var streamJpProxies = filterActive(buildRegionPreferredProxies("JP"));
  var streamEuProxies = filterActive(buildRegionPreferredProxies("EU"));
  var directFirstProxies = filterActive(buildDirectFirstProxies());
  var trackerProxies = filterActive(buildTrackerProxies());
  var seaProxies = filterActive(buildSeaProxies());
  var groups = [
    { name: BIZ.AI, type: "select", proxies: aiProxies.slice() },
    { name: BIZ.GPTAI, type: "select", proxies: aiProxies.slice() },
    { name: BIZ.CLAI, type: "select", proxies: aiProxies.slice() },
    { name: BIZ.GAI, type: "select", proxies: aiProxies.slice() },
    { name: BIZ.CRYPTO, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.PAYMENTS, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.IM, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.SOCIAL, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.WORK, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.CNMEDIA, type: "select", proxies: directFirstProxies.slice() },
    { name: BIZ.NFLX, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.DSNP, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.HBO, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.HULU, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.PRIME, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.YT, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.MUSIC, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.STREAM_HK, type: "select", proxies: streamHkProxies.slice() },
    { name: BIZ.STREAM_TW, type: "select", proxies: streamTwProxies.slice() },
    { name: BIZ.STREAM_JP, type: "select", proxies: streamJpProxies.slice() },
    { name: BIZ.STREAM_EU, type: "select", proxies: streamEuProxies.slice() },
    {
      name: BIZ.STREAM_OTHER,
      type: "select",
      proxies: standardProxies.slice(),
    },
    { name: BIZ.GAME_CN, type: "select", proxies: directFirstProxies.slice() },
    { name: BIZ.GAME_INTL, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.TOOLS, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.MS, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.OD, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.APPLE, type: "select", proxies: directFirstProxies.slice() },
    { name: BIZ.DOWNLOAD, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.TRACKER, type: "select", proxies: trackerProxies.slice() },
    { name: BIZ.CN_SITE, type: "select", proxies: directFirstProxies.slice() },
    { name: BIZ.GFW, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.INTL_SITE, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.FINAL, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.AD, type: "select", proxies: ["REJECT", "DIRECT", BIZ.GFW] },
    { name: BIZ.SPEED, type: "select", proxies: directFirstProxies.slice() },
    {
      name: BIZ.TIKTOK,
      type: "select",
      proxies: ["REJECT", "DIRECT", BIZ.GFW],
    },
    { name: BIZ.WHITE, type: "select", proxies: ["DIRECT", "REJECT", BIZ.GFW] },
    { name: BIZ.BLACK, type: "select", proxies: ["REJECT", "DIRECT", BIZ.GFW] },
    { name: BIZ.BILI, type: "select", proxies: streamHkProxies.slice() },
    { name: BIZ.BING, type: "select", proxies: standardProxies.slice() },
    { name: BIZ.GOOGLE, type: "select", proxies: standardProxies.slice() },
  ];
  var firstSmartIdx = config["proxy-groups"].findIndex(function (g) {
    return g && g.type === "smart";
  });
  groups.forEach(function (group, i) {
    var existIdx = config["proxy-groups"].findIndex(function (g) {
      return g && g.name === group.name;
    });
    if (existIdx !== -1) {
      config["proxy-groups"][existIdx] = group;
    } else if (firstSmartIdx !== -1) {
      config["proxy-groups"].splice(firstSmartIdx + i, 0, group);
    } else {
      config["proxy-groups"].push(group);
    }
  });
  var manualGroupsToInject = [];
  MANUAL_ORDER.forEach(function (key) {
    var smartGroupName = SMART[key];
    var homeKeyName = REGION_HOME_MAP[key] ? SMART[REGION_HOME_MAP[key]] : null;
    var smartGroup = config["proxy-groups"].find(function (g) {
      return g && g.name === smartGroupName;
    });
    var homeGroup = homeKeyName
      ? config["proxy-groups"].find(function (g) {
          return g && g.name === homeKeyName;
        })
      : null;
    var mergedProxies = [];
    var proxySet = new Set();
    if (smartGroup && smartGroup.proxies) {
      smartGroup.proxies.forEach(function (p) {
        if (!proxySet.has(p)) {
          proxySet.add(p);
          mergedProxies.push(p);
        }
      });
    }
    if (homeGroup && homeGroup.proxies) {
      homeGroup.proxies.forEach(function (p) {
        if (!proxySet.has(p)) {
          proxySet.add(p);
          mergedProxies.push(p);
        }
      });
    }
    if (mergedProxies.length > 0) {
      manualGroupsToInject.push({
        name: MANUAL[key],
        type: "select",
        proxies: mergedProxies,
      });
    }
  });
  manualGroupsToInject.forEach(function (group) {
    var existIdx = config["proxy-groups"].findIndex(function (g) {
      return g && g.name === group.name;
    });
    if (existIdx === -1) {
      config["proxy-groups"].push(group);
    }
  });
  console.log(
    `[${VERSION}]Injected ${groups.length}business groups&${manualGroupsToInject.length}manual select groups`,
  );
}
function injectRuleProviders(config) {
  if (!config["rule-providers"]) config["rule-providers"] = {};
  const META =
    "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo";
  const ACC =
    "https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main";
  const RP_PROXY = BIZ.GFW;
  const RP_BASE = 85500;
  const RP_STEP = 15;
  let _rpIdx = 0;
  const nextInterval = () =>
    RP_BASE + _rpIdx++ * RP_STEP + Math.floor(Math.random() * 60);
  const BM7_FASTLY =
    "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash";
  const BM7_CF =
    "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash";
  let _bm7Idx = 0;
  const ACL = "https://fastly.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash";
  const BAN = "https://fastly.jsdelivr.net/gh/Biggulu/ban@main";
  config["rule-providers"]["unban"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${ACL}/UnBan.list`,
    path: "./ruleset/unban.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["bt-direct"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${BAN}/Ruleset/BT.list`,
    path: "./ruleset/bt.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["white"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${BAN}/Ruleset/White.list`,
    path: "./ruleset/White.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["anti-ad"] = {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://fastly.jsdelivr.net/gh/DustinWin/ruleset_geodata@mihomo-ruleset/ads.mrs",
    path: "./ruleset/anti-ad.mrs",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["black"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${BAN}/Ruleset/Black.list`,
    path: "./ruleset/black.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ad-acl"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${ACL}/BanAD.list`,
    path: "./ruleset/ad-acl.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ad-prog"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${BAN}/BanProgramAD.list`,
    path: "./ruleset/ad-prog.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ad-easy"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${ACL}/BanEasyList.list`,
    path: "./ruleset/ad-easy.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ad-easycn"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${ACL}/BanEasyListChina.list`,
    path: "./ruleset/ad-easycn.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ad-easypv"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${ACL}/BanEasyPrivacy.list`,
    path: "./ruleset/ad-easypv.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  const AET =
    "https://testingcf.jsdelivr.net/gh/Aethersailor/Custom_OpenClash_Rules@main/rule";
  config["rule-providers"]["ini-direct-domain"] = {
    type: "http",
    behavior: "classical",
    url: `${AET}/Custom_Direct_Domain.yaml`,
    path: "./ruleset/ini-direct-domain.yaml",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ini-direct-ip"] = {
    type: "http",
    behavior: "classical",
    url: `${AET}/Custom_Direct_Classical_IP.yaml`,
    path: "./ruleset/ini-direct-ip.yaml",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ini-steam-cdn"] = {
    type: "http",
    behavior: "classical",
    url: `${AET}/Steam_CDN_Classical.yaml`,
    path: "./ruleset/ini-steam-cdn.yaml",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  const SZKANE =
    "https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash";
  config["rule-providers"]["szkane-bilihmt"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${SZKANE}/Ruleset/BilibiliHMT.list`,
    path: "./ruleset/Szkane-Bilihmt.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ini-proxy-domain"] = {
    type: "http",
    behavior: "domain",
    url: `${AET}/Custom_Proxy_Domain.yaml`,
    path: "./ruleset/ini-proxy-domain.yaml",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["ini-proxy-ip"] = {
    type: "http",
    behavior: "classical",
    url: `${AET}/Custom_Proxy_Classical_IP.yaml`,
    path: "./ruleset/ini-proxy-ip.yaml",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["cnmedia"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: `${ACL}/ChinaMedia.list`,
    path: "./ruleset/cnmedia.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["sukka-phishing"] = {
    type: "http",
    behavior: "domain",
    format: "text",
    url: "https://ruleset.skk.moe/Clash/domainset/reject_phishing.txt",
    path: "./ruleset/sukka-reject-phishing.txt",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["hagezi-tif"] = {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://fastly.jsdelivr.net/gh/MiHomoer/MiHomo-Hagezi@release/HageziUltimate.mrs",
    path: "./ruleset/hagezi-tif.mrs",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["szkane-proxygfw"] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: "https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/ProxyGFWlist.list",
    path: "./ruleset/szkane-ProxyGFWlist.list",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  config["rule-providers"]["acc-prerepaireasyprivacy"] = {
    type: "http",
    behavior: "classical",
    url: "https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/PreRepairEasyPrivacy/PreRepairEasyPrivacy.yaml",
    path: "./ruleset/acc-PreRepairEasyPrivacy.yaml",
    interval: nextInterval(),
    proxy: RP_PROXY,
  };
  const count = Object.keys(config["rule-providers"]).length;
  console.log(
    `[${VERSION}]Injected ${count}HTTP rule-providers(Local GeoData used directly in Rules)`,
  );
}
function injectRules(config) {
  config.rules = [
    `GEOSITE,private,DIRECT`,
    `GEOIP,private,DIRECT,no-resolve`,
    `RULE-SET,unban,${BIZ.CN_SITE}`,
    `RULE-SET,bt-direct,DIRECT`,
    `RULE-SET,white,${BIZ.WHITE}`,
    `RULE-SET,black,${BIZ.BLACK}`,
    `RULE-SET,anti-ad,${BIZ.AD}`,
    `RULE-SET,ad-acl,${BIZ.AD}`,
    `RULE-SET,ad-prog,${BIZ.AD}`,
    `RULE-SET,acc-prerepaireasyprivacy,${BIZ.AD}`,
    `RULE-SET,ad-easy,${BIZ.AD}`,
    `RULE-SET,ad-easycn,${BIZ.AD}`,
    `RULE-SET,ad-easypv,${BIZ.AD}`,
    `RULE-SET,sukka-phishing,${BIZ.AD}`,
    `RULE-SET,hagezi-tif,${BIZ.AD}`,
    `RULE-SET,ini-direct-domain,${BIZ.CN_SITE}`,
    `RULE-SET,ini-direct-ip,${BIZ.CN_SITE},no-resolve`,
    `RULE-SET,ini-steam-cdn,${BIZ.CN_SITE}`,
    `GEOSITE,category-game-platforms-download,${BIZ.CN_SITE}`,
    `GEOSITE,category-public-tracker,${BIZ.CN_SITE}`,
    `GEOSITE,category-pt,${BIZ.TRACKER}`,
    `GEOSITE,google-cn,${BIZ.CN_SITE}`,
    `GEOSITE,category-games@cn,${BIZ.CN_SITE}`,
    `GEOSITE,openai,${BIZ.GPTAI}`,
    `GEOSITE,anthropic,${BIZ.CLAI}`,
    `GEOSITE,google-gemini,${BIZ.GAI}`,
    `GEOSITE,bing,${BIZ.BING}`,
    `GEOSITE,category-ai-!cn,${BIZ.AI}`,
    `GEOSITE,category-communication,${BIZ.IM}`,
    `GEOIP,telegram,${BIZ.IM},no-resolve`,
    `GEOSITE,category-social-media-!cn,${BIZ.SOCIAL}`,
    `GEOIP,twitter,${BIZ.SOCIAL},no-resolve`,
    `GEOIP,facebook,${BIZ.SOCIAL},no-resolve`,
    `GEOSITE,onedrive,${BIZ.OD}`,
    `GEOSITE,youtube,${BIZ.YT}`,
    `GEOSITE,netflix,${BIZ.NFLX}`,
    `GEOIP,netflix,${BIZ.NFLX},no-resolve`,
    `GEOSITE,apple-tvplus,${BIZ.STREAM_OTHER}`,
    `GEOSITE,tiktok,${BIZ.TIKTOK}`,
    `GEOSITE,disney,${BIZ.DSNP}`,
    `GEOSITE,hbo,${BIZ.HBO}`,
    `GEOSITE,primevideo,${BIZ.PRIME}`,
    `GEOSITE,category-emby,${BIZ.STREAM_OTHER}`,
    `GEOSITE,spotify,${BIZ.MUSIC}`,
    `GEOSITE,bahamut,${BIZ.STREAM_TW}`,
    `RULE-SET,szkane-bilihmt,${BIZ.BILI}`,
    `GEOSITE,googlefcm,${BIZ.GOOGLE}`,
    `GEOSITE,google,${BIZ.GOOGLE}`,
    `GEOIP,google,${BIZ.GOOGLE},no-resolve`,
    `GEOSITE,apple,${BIZ.APPLE}`,
    `GEOSITE,microsoft,${BIZ.MS}`,
    `GEOSITE,github,${BIZ.TOOLS}`,
    `GEOSITE,category-speedtest,${BIZ.SPEED}`,
    `GEOSITE,steam,${BIZ.GAME_INTL}`,
    `GEOSITE,category-games,${BIZ.GAME_INTL}`,
    `GEOSITE,paypal,${BIZ.PAYMENTS}`,
    `GEOSITE,category-ecommerce,${BIZ.INTL_SITE}`,
    `RULE-SET,ini-proxy-domain,${BIZ.GFW}`,
    `RULE-SET,ini-proxy-ip,${BIZ.GFW},no-resolve`,
    `GEOSITE,category-entertainment,${BIZ.INTL_SITE}`,
    `GEOSITE,gfw,${BIZ.GFW}`,
    `RULE-SET,szkane-proxygfw,${BIZ.GFW}`,
    `RULE-SET,cnmedia,${BIZ.CN_SITE}`,
    `GEOSITE,cn,${BIZ.CN_SITE}`,
    `GEOIP,cn,${BIZ.CN_SITE},no-resolve`,
    `MATCH,${BIZ.FINAL}`,
  ];
  console.log(`[${VERSION}]Injected ${config.rules.length}rules`);
}
function overwriteGeneral(config) {
  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;
  config["find-process-mode"] = "strict";
  config["keep-alive-idle"] = 30;
  config["keep-alive-interval"] = 15;
  config["geodata-mode"] = true;
  config["geox-url"] = {
    geoip:
      "https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/geoip.dat",
    mmdb: "https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb",
    asn: "https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/GeoLite2-ASN.mmdb",
  };
  config["geo-auto-update"] = true;
  if (!config.profile) config.profile = {};
  config.profile["store-selected"] = true;
  config.profile["store-fake-ip"] = true;
  config.profile["tracing"] = true;
  if (!config.tun) config.tun = {};
  if (!config.tun["exclude-process"]) config.tun["exclude-process"] = [];
  var gcuExcludes = [
    "GCUService.exe",
    "GCUBridge.exe",
    "WorkPro.exe",
    "GSCService.exe",
    "gsupservice.exe",
    "gchsvc.exe",
  ];
  gcuExcludes.forEach(function (proc) {
    if (config.tun["exclude-process"].indexOf(proc) === -1) {
      config.tun["exclude-process"].push(proc);
    }
  });
}
function cleanupSubscription(config) {
  var removed = (config["proxy-groups"] || []).length;
  config["proxy-groups"] = [];
  if (removed > 0)
    console.log(`[${VERSION}]Removed ${removed}subscription proxy-groups`);
  config.rules = [];
  config["rule-providers"] = {};
}
function _simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}
function injectSmartFingerprint(config) {
  if (!Array.isArray(config.proxies)) return;
  const fpByPurpose = {
    STREAM: "chrome",
    GAME: "ios",
    SOCIAL: "firefox",
    DEV: "edge",
  };
  const fpFallbackCandidates = [
    "chrome",
    "firefox",
    "safari",
    "ios",
    "android",
    "edge",
  ];
  config.proxies.forEach((p) => {
    if (!p || typeof p !== "object") return;
    if (["vless", "vmess", "trojan"].indexOf(p.type) === -1) return;
    const isReality = !!(p["reality-opts"] || p["reality_opts"]);
    const flow = (p.flow || "").toLowerCase();
    const isXTLS = /xtls-rprx/.test(flow);
    if (!p.tls && !isReality && !isXTLS) return;
    if (p["client-fingerprint"]) return;
    let chosenFP = null;
    const name = String(p.name);
    if (/netflix|youtube|hulu|primevideo|disney|twitch/i.test(name)) {
      chosenFP = fpByPurpose.STREAM;
    } else if (/game|steam|playstation|nintendo|epic|valorant/i.test(name)) {
      chosenFP = fpByPurpose.GAME;
    } else if (
      /twitter|facebook|instagram|tiktok|snapchat|linkedin/i.test(name)
    ) {
      chosenFP = fpByPurpose.SOCIAL;
    } else if (/api|dev|github|gitlab|npm|pypi|docker/i.test(name)) {
      chosenFP = fpByPurpose.DEV;
    }
    if (!chosenFP) {
      const idx = _simpleHash(name) % fpFallbackCandidates.length;
      chosenFP = fpFallbackCandidates[idx];
    }
    p["client-fingerprint"] = chosenFP;
  });
}
function sortProxyGroups(config) {
  const bizGroups = [],
    smartGroups = [],
    otherGroups = [];
  const bizNames = new Set(Object.values(BIZ));
  const smartNames = new Set(Object.values(SMART));
  config["proxy-groups"].forEach((g) => {
    if (!g || !g.name) return;
    if (bizNames.has(g.name)) {
      bizGroups.push(g);
    } else if (smartNames.has(g.name) || g.type === "smart") {
      smartGroups.push(g);
    } else {
      otherGroups.push(g);
    }
  });
  const bizOrder = Object.values(BIZ);
  bizGroups.sort((a, b) => bizOrder.indexOf(a.name) - bizOrder.indexOf(b.name));
  const smartOrder = Object.values(SMART);
  smartGroups.sort((a, b) => {
    const ia = smartOrder.indexOf(a.name);
    const ib = smartOrder.indexOf(b.name);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
  config["proxy-groups"] = [...bizGroups, ...otherGroups, ...smartGroups];
}
function main(config) {
  try {
    if (!config || typeof config !== "object") return config;
    if (!Array.isArray(config.proxies) || config.proxies.length === 0)
      return config;
    console.log(`[${VERSION}]Start processing,${config.proxies.length}proxies`);
    if (!Array.isArray(config["proxy-groups"])) config["proxy-groups"] = [];
    if (!Array.isArray(config.rules)) config.rules = [];
    overwriteGeneral(config);
    cleanupSubscription(config);
    injectSmartFingerprint(config);
    var c = classifyAllNodes(config.proxies);
    console.log(
      `[${VERSION}]Classification:ALL=${c.ALL.length}HOME_ALL=${c.HOME_ALL.length}HK=${c.HK.length}/${c.HOME_HK.length} TW=${c.TW.length}/${c.HOME_TW.length}CN=${c.CN.length}/${c.HOME_CN.length} JP=${c.JP.length}/${c.HOME_JP.length}KR=${c.KR.length}/${c.HOME_KR.length} SG=${c.SG.length}/${c.HOME_SG.length}US=${c.US.length}/${c.HOME_US.length} EU=${c.EU.length}/${c.HOME_EU.length}AM=${c.AM.length}/${c.HOME_AM.length} AF=${c.AF.length}/${c.HOME_AF.length}APAC_OTHER=${c.APAC_OTHER.length}/${c.HOME_APAC_OTHER.length} UNCLASSIFIED=${c.UNCLASSIFIED.length}/${c.HOME_UNCLASSIFIED.length}`,
    );
    var apacNodes = c.HK.concat(c.TW, c.CN, c.JP, c.KR, c.SG, c.APAC_OTHER);
    var americasNodes = c.US.concat(c.AM);
    var homeApacNodes = c.HOME_HK.concat(
      c.HOME_TW,
      c.HOME_CN,
      c.HOME_JP,
      c.HOME_KR,
      c.HOME_SG,
      c.HOME_APAC_OTHER,
    );
    var homeAmericasNodes = c.HOME_US.concat(c.HOME_AM);
    upsertSmartGroup(config, SMART.GLOBAL, c.ALL);
    if (c.HOME_ALL.length > 0)
      upsertSmartGroup(config, SMART.GLOBAL_HOME, c.HOME_ALL);
    if (c.HK.length > 0) upsertSmartGroup(config, SMART.HK, c.HK);
    if (c.HOME_HK.length > 0)
      upsertSmartGroup(config, SMART.HK_HOME, c.HOME_HK);
    if (c.TW.length > 0) upsertSmartGroup(config, SMART.TW, c.TW);
    if (c.HOME_TW.length > 0)
      upsertSmartGroup(config, SMART.TW_HOME, c.HOME_TW);
    if (c.JP.length > 0) upsertSmartGroup(config, SMART.JP, c.JP);
    if (c.HOME_JP.length > 0)
      upsertSmartGroup(config, SMART.JP_HOME, c.HOME_JP);
    if (c.KR.length > 0) upsertSmartGroup(config, SMART.KR, c.KR);
    if (c.HOME_KR.length > 0)
      upsertSmartGroup(config, SMART.KR_HOME, c.HOME_KR);
    if (c.SG.length > 0) upsertSmartGroup(config, SMART.SG, c.SG);
    if (c.HOME_SG.length > 0)
      upsertSmartGroup(config, SMART.SG_HOME, c.HOME_SG);
    if (apacNodes.length > 0) upsertSmartGroup(config, SMART.APAC, apacNodes);
    if (homeApacNodes.length > 0)
      upsertSmartGroup(config, SMART.APAC_HOME, homeApacNodes);
    if (c.US.length > 0) upsertSmartGroup(config, SMART.US, c.US);
    if (c.HOME_US.length > 0)
      upsertSmartGroup(config, SMART.US_HOME, c.HOME_US);
    if (c.EU.length > 0) upsertSmartGroup(config, SMART.EU, c.EU);
    if (c.HOME_EU.length > 0)
      upsertSmartGroup(config, SMART.EU_HOME, c.HOME_EU);
    if (americasNodes.length > 0)
      upsertSmartGroup(config, SMART.AMERICAS, americasNodes);
    if (homeAmericasNodes.length > 0)
      upsertSmartGroup(config, SMART.AMERICAS_HOME, homeAmericasNodes);
    if (c.AF.length > 0) upsertSmartGroup(config, SMART.AFRICA, c.AF);
    if (c.HOME_AF.length > 0)
      upsertSmartGroup(config, SMART.AFRICA_HOME, c.HOME_AF);
    var activeSmartNames = new Set(
      config["proxy-groups"]
        .filter(function (g) {
          return g && g.type === "smart";
        })
        .map(function (g) {
          return g.name;
        }),
    );
    activeSmartNames.add("DIRECT");
    activeSmartNames.add("REJECT");
    console.log(
      `[${VERSION}]Active Smart groups:${[...activeSmartNames]
        .filter(function (n) {
          return n !== "DIRECT" && n !== "REJECT";
        })
        .join(", ")}`,
    );
    injectBusinessGroups(config, activeSmartNames);
    injectRuleProviders(config);
    injectRules(config);
    sortProxyGroups(config);
    console.log(
      `[${VERSION}]Done!Groups:${config["proxy-groups"].length},Rules:${
        config.rules.length
      },Providers:${Object.keys(config["rule-providers"]).length}`,
    );
    return config;
  } catch (e) {
    console.error(`[${VERSION}]Error:`, e);
    return config;
  }
}
