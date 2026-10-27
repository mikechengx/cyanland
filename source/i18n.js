/* Cyanland bilingual interface. Geographic state and model values stay language-neutral.
   Only app-authored display text is localized; input values, URLs and storage are untouched. */
(() => {
  'use strict';
  const STRINGS = {
    'Cyanland 首页':'Cyanland home','本地预览':'Local preview','切换沿海城市':'Choose a coastal city',
    '关于这座海岸':'About this coast','返回海岸手记':'Back to coast notes','海岸手记':'Coast notes',
    '一方海岸，':'A little coast,','晴光入水。':'held in sunlight.','山脊映着日光，浅湾收藏细碎的浪。':'Sunlit ridges, a quiet bay, and little waves to keep.',
    '在海与陆的边缘，观察光、潮汐与一座海岸的呼吸。':'At the meeting of land and sea, watch a coast breathe with light and tide.',
    '调整场景':'Scene settings','自由探索':'Explore','交互式海岸沙盘，拖动旋转，滑动海水拨浪，双指或滚轮缩放，长按拖动平移':'Interactive coastal diorama. Drag land to orbit, swipe water to make ripples, pinch or scroll to zoom, and hold then drag to pan.',
    'Cyanland 三维海岸沙盘':'Cyanland 3D coastal diorama','REAL-TIME COAST / 此刻海岸':'REAL-TIME COAST',
    '景观呈现方式':'Scene presentation','沉浸海岸':'Immersive','展台沙盘':'Studio','让光与潮汐，慢慢流过。':'Let light and tide drift slowly by.',
    '切换拨浪模式':'Switch to ripple mode','拨浪 · 滑动海水画出涟漪':'Ripples · swipe the water to stir it',
    '拨浪':'Ripples','环绕':'Orbit','轻触果冻，让海岸弹一弹':'Give the jelly coast a gentle bounce','让海岸弹一弹':'Bounce the coast',
    '重置沙盘视角':'Reset the diorama view','重置视角':'Reset view','全屏探索':'Fullscreen',
    '正在凝成一方海岸':'Growing a little coast','正在连接图形设备':'Connecting to the graphics device',
    '请使用支持 WebGPU 的浏览器，并开启硬件加速。':'Use a WebGPU-capable browser with hardware acceleration enabled.',
    '重新连接':'Reconnect','调整这一刻':'Shape this moment','收起场景设置':'Close scene settings',
    '01 — 选择一方海岸':'01 — Choose a coast','搜索海岸':'Search coasts','搜索城市、海岸或国家':'Search a city, coast or country',
    '按地区浏览海岸':'Browse coasts by region','九座海岸，随光漫游。':'Nine coasts, a journey through light.',
    '02 — 让时间流过':'02 — Let time drift','海岸天光时段':'Coastal light presets',
    '追日出':'Sunrise','黎明，第一束光抵岸':'The first light reaches the shore','金色清晨':'Golden morning',
    '把阳光铺在沙与浪上':'Sunlight across sand and waves','紫红落日':'Rose sunset','让海面收藏晚霞':'An ocean holding the evening glow',
    '月光海岸':'Moonlit coast','潮声里的蓝与银':'Blue and silver, to the sound of tides','流转一天':'Play a day',
    '跟随此刻':'Live time','漫游时间':'Set time','公历日期':'Calendar date','一天中的时刻':'Time of day',
    '播放时间':'Play time','暂停时间':'Pause time','时间播放速度':'Time playback speed',
    '1× · 自然流逝':'1× · Real time','60× · 每秒一分钟':'60× · One minute per second','360× · 10 秒一小时':'360× · One hour in 10 seconds','1440× · 1 分钟一昼夜':'1440× · One day per minute',
    '按所选海岸的当地时间同步；光照随日期与纬度变化。':'Synced to the coast’s local time. Sunlight follows the date and latitude.',
    '03 — 天光与海的表情':'03 — Light and sea','选择模拟天气':'Choose simulated weather','晴朗':'Clear','多云':'Cloudy','细雨':'Light rain','薄雾':'Mist',
    '天气为可调情境；阳光随日期与时刻缓缓移动。':'Weather is a manual scenario. Sunlight moves with the date and time.',
    '阳光强度':'Sunlight intensity','柔光':'Soft','晴光':'Bright','海浪起伏':'Wave height','果冻弹性':'Jelly bounce','海水透明度':'Water clarity',
    '透亮':'Clear','浓郁':'Rich','与海相处':'Interact with the sea','场景交互方式':'Interaction mode',
    '滑过海面拨动涟漪；双指缩放，长按拖动平移。':'Swipe the sea to stir ripples. Pinch to zoom; hold then drag to pan.',
    '剖面海水 · 看见海床':'Water cutaway · reveal the seabed','海岸注释 · 轻点单条收起':'Coast labels · tap a label to hide it','注释可见度':'Label opacity',
    '默认隐藏，打开后以轻薄文字标记风物；点一下便消失。':'Labels are hidden by default. Turn them on for subtle landmarks; tap each one to hide it.',
    '04 — 留住你的风景':'04 — Keep this view','保存画面':'Save image','弹一弹':'Bounce','海岸档案':'Coast profile',
    '每座海岸独立程序生成。潮汐为周期演示，不作为赶海、航行或防灾依据。':'Each coast is generated independently. Tides are a cyclic demonstration, not guidance for shore foraging, navigation or hazard planning.',
    '正在读取农历':'Reading the lunar calendar','天光 · 太阳高度':'SUN · ALTITUDE','潮汐 · 周期模拟':'TIDE · SIMULATION',
    '模拟潮位':'Simulated tide level','季节 · 海岸情境':'SEASON · WEATHER','拖拽环绕 · 滑水拨浪':'Drag land to orbit · Swipe water for ripples',
    '双指缩放 · 长按平移':'Pinch to zoom · Hold to pan','日出日落信息':'Sunrise and sunset information','日出':'Sunrise','日落':'Sunset',
    '晴光入水':'Sunlit water','金色晨光':'Golden morning','日出时分':'Sunrise','蓝调时刻':'Blue hour',
    '快速抵达海岸时刻':'Jump to a coastal moment','太阳位置与潮汐进度':'Sun position and tidal progress','太阳与潮汐的周期':'The sun and tide cycle',
    '关闭海岸档案':'Close coast profile','海岸位置':'Coordinates','当季天光':'Seasonal light','日出 / 日落':'Sunrise / Sunset','潮汐阶段':'Tide phase',
    '观察水下随波摆动的海草、珊瑚与沙纹，让一座海岸慢慢进入视线。':'Look beneath the water at swaying seagrass, coral and sand ripples, and let the coast come into focus.',
    '观察水下随波摆动的海草、礁石与沙纹，让一座海岸慢慢进入视线。':'Look beneath the water at swaying seagrass, rocks and sand ripples, and let the coast come into focus.',
    'Cyanland 是程序化生成的概念海岸沙盘，提炼城市地貌与生态特征，不是实测地形复刻。日照根据日期与城市经纬度估算；潮汐为周期模型，天气为手动情境。月光、星空与云霞为艺术化氛围示意，不对应实测月相。画面与数据不用于气象、潮汐或航行预报。':'Cyanland is a procedurally generated concept diorama inspired by each city’s landforms and ecology, not a surveyed terrain replica. Sunlight is estimated from the date and city coordinates; tides use a cyclic model and weather is manually selected. Moonlight, stars and clouds are artistic atmosphere, not an observed lunar phase. These visuals and values are not weather, tide or navigation forecasts.',
    '运行信息':'Runtime details','正在凝成海岸':'Growing the coast','图形体验因设备而异，单文件离线生成，无外部素材。':'Graphics performance varies by device. One HTML file, generated offline, with no external assets.',
    '中国':'China','日本':'Japan','韩国':'South Korea','澳洲':'Australia','澳大利亚':'Australia','全部':'All','随光漫游':'Follow the light',
    '中国标准时间':'China Standard Time','韩国标准时间':'Korea Standard Time','日本标准时间':'Japan Standard Time','昆士兰时间':'Queensland Time','当地时间':'Local time',
    '青岛':'Qingdao','大连':'Dalian','厦门':'Xiamen','北海':'Beihai','三亚':'Sanya','黄金海岸':'Gold Coast','济州岛':'Jeju','临空城':'Rinku','上越':'Joetsu',
    '没有找到这座海岸，试试城市名或国家。':'No coast found. Try a city or country name.',
    '黄金海岸 · 冲浪者天堂':'Gold Coast · Surfers Paradise','济州旅游公社 · 挟才海岸':'Visit Jeju · Hyeopjae Beach','临空公园 · 大理石海滩':'Rinku Park · Marble Beach','泉佐野市 · 临空公园':'Visit Izumisano · Rinku Park','上越观光 · 谷浜海岸':'Joetsu Tourism · Tanihama Beach','海岸铁路 · 日本海翡翠线':'Coastal railway · Nihonkai Hisui Line',
    '这一步暂时没有完成，请再试一次。':'That action could not be completed. Please try again.',
    '自由探索 · 拖动环绕，滑水拨浪，双指缩放':'Explore · Drag land to orbit, swipe water for ripples, pinch to zoom','已返回海岸手记':'Back to coast notes',
    '农历日期暂不可用':'Lunar date unavailable','当前为拨浪模式，点击切换环绕':'Ripple mode active. Tap to return to orbit','拨浪中 · 点击返回环绕':'Ripple mode · tap to return to orbit',
    '拨浪模式 · 滑动海面画出涟漪；双指缩放，长按平移。':'Ripple mode · swipe the sea, pinch to zoom, hold to pan.',
    '已回到环绕模式 · 滑过海面也能拨动水波。':'Orbit mode · swiping the sea also makes ripples.',
    '此刻海岸 · 与时间同行':'LIVE COAST · LOCAL TIME','时光流转 · 一日海岸':'TIME LAPSE · A DAY AT THE COAST','此刻停留 · 海岸漫游':'TIME PAUSED · COASTAL STUDY',
    '暂停流转':'Pause day','周期模拟':'Cyclic simulation','潮汐模拟':'Simulated tide','涨潮':'Rising','落潮':'Falling','平潮':'Slack',
    '春':'Spring','夏':'Summer','秋':'Autumn','冬':'Winter','春季':'Spring','夏季':'Summer','秋季':'Autumn','冬季':'Winter',
    '时间已停留；拖动时刻滑块，或播放一天。':'Time paused. Move the time slider or play a day.','让一天缓缓流转 · 再点一次即可停留':'Watch a day drift by · tap again to pause','视角已归位':'View reset',
    '已进入自由探索 · 本浏览器未提供网页全屏':'Explore enabled · fullscreen is unavailable in this browser','浏览器暂未允许全屏，可以使用自由探索。':'Fullscreen was not allowed. You can still use Explore.',
    '兼容模式':'Compatibility mode','此浏览器没有 WebGPU':'WebGPU is unavailable in this browser','WebGPU 适配器响应超时':'WebGPU adapter timed out','未找到 WebGPU 适配器':'No WebGPU adapter found','WebGPU画布不可用':'WebGPU canvas unavailable','此设备没有可用的 WebGPU 或 WebGL2':'Neither WebGPU nor WebGL2 is available on this device','阴影缓冲区不可用':'Shadow buffer unavailable','图形设备暂时不可用，点击重试可重新连接。':'Graphics are temporarily unavailable. Tap retry to reconnect.','启动中':'Starting','重新连接画面':'Reconnect graphics','点击收起这条注释':'Tap to hide this label',
    '月色入海，星光渐深。':'Moonlight on the sea, stars gathering above.','天光初醒，潮声仍轻。':'The sky awakens; the tide whispers.','晚霞将尽，海岸入蓝。':'The last glow fades; the coast turns blue.','晨光铺金，浅滩初醒。':'Morning turns the waking shallows to gold.','落日熔金，紫霞入海。':'Molten sunset, rose and violet on the sea.','晴空照水，海风正好。':'Clear skies, shining water, and a sea breeze.',
    '礁石海岸 · 黄海':'Rocky coast · Yellow Sea','风过礁岸，':'Wind over rocks,','海色漫长。':'an endless sea.',
    '花岗岩的灰、红瓦的暖，与黄海的蓝在一方切片中相遇。沿着礁岸转一圈，看浪花擦亮石缝，潮水慢慢收起浅滩。':'Granite grey, warm red roofs and the blue Yellow Sea meet in a tiny coastal slice. Circle the rocks as foam brightens their cracks and the tide slowly gathers the shallows.',
    '花岗岩礁岸':'Granite shore','红瓦海边小屋':'Red-roof cottages','松林与灯塔':'Pines and lighthouse','潮间带岩池':'Intertidal rock pools','岩礁 · 松林':'Rocks · Pines','温带季风':'Temperate monsoon','岩滩与起伏海岬':'Rocky beach and rolling headlands',
    '丘陵崖岸 · 黄渤海':'Hills and cliffs · Yellow and Bohai seas','山脊向海，':'Ridges meet the sea,','松风有声。':'pines sing in the wind.',
    '起伏山脊伸入海中，灰白崖壁托起一片墨绿松林。海岬的转折处，航标安静站立；深蓝近海与浅色岩层一同显露。':'Rolling ridges reach into the sea; pale cliffs hold a deep green pine forest. A quiet beacon marks a headland, with dark blue water below exposed layers of stone.',
    '高差丘陵':'Rolling hills','切削海崖':'Sheer sea cliffs','海岬松林':'Headland pines','山脊步道':'Ridge path','海崖 · 针叶林':'Sea cliffs · Conifers','高山脊与陡峭崖壁':'High ridges and steep cliffs',
    '弯湾双岛 · 台湾海峡':'Twin-island bay · Taiwan Strait','湾藏小岛，':'Islands in a bay,','潮送远帆。':'a sail with the tide.',
    '一弯细沙抱住温柔海湾，两座小岛隔水相望。榕树与海边小屋之间，木栈道通向码头；浅湾把流动的天光留得更久。':'A crescent of sand cradles a gentle bay, where two islands face one another across the water. Between banyans and seaside houses, a timber walk leads to a jetty. The shallows linger with the light.',
    '弧形沙湾':'Crescent sand bay','双岛水道':'Twin-island channel','滨海阔叶林':'Coastal broadleaf trees','木栈桥与帆船':'Timber jetty and sailboat','沙湾 · 岛屿':'Sand bay · Islands','亚热带海洋':'Subtropical maritime','弯曲海湾与离岸双岛':'Curving bay and two offshore islands',
    '银沙浅滩 · 北部湾':'Silver sand · Gulf of Tonkin','银沙铺岸，':'Silver sand ashore,','浅浪生光。':'small waves shine.',
    '宽阔的浅滩铺开柔白沙纹，岸线很低，天空很远。潮退时，沙洲从浅青色海水中慢慢浮现，细碎贝壳和沙丘草留下温柔的尺度。':'A wide, low shore unfolds in soft white sand beneath a distant sky. As the tide retreats, a sandbar slowly emerges through pale turquoise water; shells and dune grass lend a delicate scale.',
    '宽阔白沙滩':'Wide white beach','低缓沙丘':'Low dunes','浅海沙洲':'Shallow sandbar','贝壳与滨海草':'Shells and beach grass','沙滩 · 浅潮滩':'Beach · Shallow flats','低缓白沙与宽广浅滩':'Low white sands and broad shallows',
    '热带珊瑚湾 · 南海':'Tropical coral bay · South China Sea','椰影入海，':'Palm shadows drift,','珊瑚藏光。':'coral keeps the light.',
    '热带山丘披着深绿，椰影在白沙上轻轻摆动。清澈浅海保留珊瑚与鱼群的颜色，让一整片流动的蓝，像果冻般被阳光托起。':'Deep green covers tropical hills while palm shadows sway over white sand. Clear shallows reveal coral and schools of fish: a flowing blue held up by sunlight like jelly.',
    '热带双岛':'Tropical twin islands','椰林白沙':'Palms and white sand','彩色珊瑚礁':'Colourful coral reef','透明浅海鱼群':'Fish in clear shallows','珊瑚 · 椰林':'Coral · Palms','热带海洋':'Tropical maritime','热带高岛与珊瑚浅礁':'Tropical islands and shallow coral reefs',
    '冲浪金沙 · 珊瑚海':'Golden surf beach · Coral Sea','长浪吻岸，':'Long waves kiss sand,','金砂映城。':'gold beneath a city.',
    '一线金沙展开在珊瑚海与城市之间。低沙丘留住滨海草与露兜树的影子，冲浪板、救生塔和高楼在绵长浪线上各占一角。南半球的季节，随着当地日光缓缓变化。':'Golden sand stretches between the Coral Sea and the city. Low dunes hold beach grass and pandanus shadows, while surfboards, lifeguard towers and high-rises mark the long surf line. Southern Hemisphere seasons follow the local sunlight.',
    '绵长金色沙滩':'Long golden beach','沙丘与冲浪浪线':'Dunes and surf lines','背岸高楼天际线':'Beachfront skyline','微型救生塔':'Miniature lifeguard tower','金沙 · 沙丘植被':'Golden sand · Dune plants','长直金沙岸与低沙丘':'Long straight beach and low dunes',
    '挟才翡翠湾 · 济州海峡':'Hyeopjae emerald bay · Jeju Strait','黑岩抱玉，':'Black rock, jade sea,','白沙听潮。':'white sand hears tides.',
    '挟才的浅海呈现清透翡翠色，白沙从黑色玄武岩之间伸入水中。彼岸的飞扬岛是一枚圆润的火山剪影，低石墙与村屋安静地留在风中。这里是以海岸特征重构的微缩意境。':'Hyeopjae’s clear emerald shallows meet white sand between black basalt rocks. Offshore, Biyangdo forms a rounded volcanic silhouette; low stone walls and village houses rest in the wind. This miniature is an artistic study of the coast.',
    '翡翠色浅海':'Emerald shallows','白沙与黑色玄武岩':'White sand and black basalt','飞扬岛火山轮廓':'Biyangdo volcanic outline','低石墙与村落':'Low stone walls and village','火山岩 · 贝壳沙岸':'Volcanic rock · Shell sand','温带海洋':'Temperate maritime','黑岩白沙湾与离岸火山岛':'Basalt and white sand with a volcanic island',
    '泉佐野白石海岸 · 大阪湾':'Izumisano white-stone coast · Osaka Bay','白石入湾，':'White stones by the bay,','云帆临空。':'skyward sails of cloud.',
    '泉佐野临空城的 Marble Beach 铺着白色圆润大理石砾石。整齐海堤、滨海步道与摩天轮面向大阪湾，远处的机场岛和跨海桥把海岸连向天空。白色来自石砾，而非热带细沙。':'Marble Beach at Rinku, Izumisano, is covered in rounded white marble pebbles. An orderly seawall, promenade and Ferris wheel face Osaka Bay; an airport island and bridge connect the coast with the sky. The white shore is stone, not tropical sand.',
    '白色大理石砾滩':'White marble pebble beach','人工弧形海堤':'Curved artificial seawall','临空城摩天轮':'Rinku Ferris wheel','机场岛与跨海桥':'Airport island and bridge','白石砾滩 · 人工海岸':'White pebbles · Artificial coast','人工白色砾岸与大阪湾机场岛':'White pebble shore and Osaka Bay airport island',
    '谷浜深蓝海 · 日本海':'Tanihama deep blue · Sea of Japan','山青向海，':'Green hills meet sea,','深蓝入梦。':'deep blue into dreams.',
    '上越谷浜的深蓝海水沿粗砂与碎砾岸铺开，背后是起伏山脊与滨海村落。铁路顺着山海之间的窄地带延伸，港口的防波堤收住一小片平静水面。':'Deep blue water follows the coarse sand and gravel of Tanihama, Joetsu, beneath rolling ridges and coastal villages. A railway threads the narrow land between mountains and sea; a breakwater shelters a small patch of calm.',
    '深蓝日本海':'Deep blue Sea of Japan','粗砂与碎砾岸':'Coarse sand and gravel','近海山脊与小村':'Coastal ridges and village','滨海铁路与渔港':'Coastal railway and fishing port','碎砾岸 · 海岸林':'Gravel shore · Coastal forest','温带日本海':'Temperate Sea of Japan','山脊、沿岸铁路与深蓝海岸':'Ridges, railway and deep blue coast',
    '礁缝边留着螺壳、卷起的渔网与木浮标；微型潮池随海水涨落，浅海中有游鱼和海草。':'Shells, rolled fishing nets and wooden floats lie beside the rocks. Tiny tide pools rise and fall beside fish and seagrass in the shallows.',
    '螺壳与渔具':'Shells and fishing gear','微型潮池':'Tiny tide pools',
    '冷色岩岸上有贝壳与海带，浅海的海参形小生物藏在石间，山径沿崖转弯。':'Shells and kelp dot the cool rocky coast. Sea-cucumber-shaped creatures hide among shallow rocks while a path curves around the cliffs.',
    '贝壳与海带':'Shells and kelp','海参形海底小生物':'Sea-cucumber-shaped sea creatures',
    '一叶木渔船停在湾边，绳圈与网具留在干沙上；贝壳和细小蟹足点缀潮线。':'A wooden fishing boat rests by the bay, with coiled rope and nets on dry sand. Shells and tiny crab tracks follow the tide line.',
    '木渔船与绳圈':'Wooden fishing boat and rope','湾边小沙蟹':'Little sand crabs',
    '白沙上散着成对珠母色贝壳，小贝壳与遮阳伞只占一角，留下开阔的浅滩。':'Pairs of pearly shells lie on the white sand. A few shells and parasols occupy one corner, leaving the shallows open and wide.',
    '珠母色贝壳':'Pearly shells','白沙遮阳伞':'White-sand parasols',
    '椰树下留着几枚椰子与一顶小阳伞，珊瑚边的小鱼在清浅海水里结伴游动。':'A few coconuts and a little parasol rest beneath the palms. Small fish swim together beside coral in the clear shallows.',
    '椰子与沙滩小伞':'Coconuts and beach parasol','珊瑚边游鱼':'Fish beside coral',
    '金沙上点缀着冲浪板、救生设施与贝壳，低沙丘留出一片开阔海风。微型游鱼成群经过透明的近岸海水。':'Surfboards, lifesaving equipment and shells dot the golden sand, with low dunes open to the sea breeze. Tiny schools of fish cross clear nearshore water.',
    '冲浪板与救生设施':'Surfboards and lifesaving gear','沙丘草与海滨树影':'Dune grass and coastal trees',
    '白色贝壳沙与黑色玄武岩交错，矮石墙围着海边小村；浅海里藏着银绿色小鱼和海草。':'White shell sand mingles with black basalt. Low stone walls enclose a seaside village; silver-green fish and seagrass hide in the shallows.',
    '黑色石墙与海女意象':'Basalt walls and haenyeo motifs','贝壳沙与银绿鱼群':'Shell sand and silver-green fish',
    '白色圆石在潮线旁露出细碎高光，整齐步道边留着长椅与路灯；机场与摩天轮构成临空城的海湾剪影。':'White pebbles catch small highlights at the tide line. Benches and lamps line an orderly promenade, with the airport and Ferris wheel forming Rinku’s bay silhouette.',
    '白色圆石与滨海长椅':'White pebbles and seaside benches','海湾鱼群':'Bay fish',
    '碎砾与漂木散落潮线，山间列车沿岸而行；小渔港、渔具与冷色海草点出日本海的日常尺度。':'Gravel and driftwood scatter along the tide line as a little train follows the coast. A small fishing port, fishing gear and cool-toned seagrass suggest everyday life by the Sea of Japan.',
    '漂木与岸边渔具':'Driftwood and fishing gear','深蓝水下银色鱼群':'Silver fish in deep blue water',
    '丘陵与崖岸沿海面起伏。海草在岩底生长，低潮时露出的岸缘，留着风和浪反复刻下的线条。':'Hills and cliffs rise above the sea. Seagrass grows on the rocky bottom; low tide reveals edges repeatedly carved by wind and waves.',
    '花岗岩礁石铺开成岩滩，潮水进出石隙。海草、藻丛与潮间带小生物，在剖开的清水里缓缓显现。':'Granite boulders form a rocky shore where tides move through the cracks. Seagrass, algae and intertidal creatures appear through the clear water cutaway.',
    '海湾围住细沙与近岸小岛。湾内的水色比外海温柔，潮间带草丛与沙纹随光线一起改变。':'A bay surrounds fine sand and nearshore islands. Its water is gentler in colour than the open sea; intertidal plants and sand ripples change with the light.',
    '平缓白沙滩向浅海延伸，潮退后，宽阔浅滩才露出细腻的脉络。海草与小型底栖生物藏在沙床之间。':'A gentle white beach slopes into shallow water. Retreating tides reveal the patterns of broad flats, with seagrass and small bottom-dwelling creatures among the sand.',
    '热带岛屿被清澈浅海环抱。棕榈与珊瑚、海草与游鱼，从岸上的暖绿过渡到水下的青蓝。':'Clear shallows surround tropical islands. Palms and coral, seagrass and fish carry the shore’s warm greens into the water’s turquoise blue.',
    '海岬灯塔':'Headland lighthouse','红瓦海岸':'Red-roof coast','灰白海崖':'Pale sea cliffs','湾心双岛':'Twin islands','临海栈桥':'Seaside jetty','白沙与低丘':'White sand and low dunes','潮下沙洲':'Tidal sandbar','绵长金沙与低沙丘':'Golden beach and low dunes','飞扬岛':'Biyangdo','挟才白沙与玄武岩':'Hyeopjae sand and basalt','Marble Beach 白色石砾':'Marble Beach · White pebbles','谷浜山海':'Tanihama mountains and sea','椰影白沙':'Palms over white sand','浅海珊瑚花园':'Shallow coral garden',
    '冲浪者天堂':'Surfers Paradise','红黄旗海滩':'Red-and-yellow flag beach','玄武岩石墙与海边小屋':'Basalt walls and cottages','挟才海岸':'Hyeopjae Beach','临空城天际线':'Rinku skyline','白色大理石海滩':'White marble beach','海上机场岛':'Airport island','山麓海岸铁路':'Coastal railway','日本海的小渔港':'Sea of Japan fishing port',
    '艺术化地形 · 非实测':'Artistic terrain · not surveyed'
  };
  const langKey='cyanland.lang', sources=new WeakMap(), attributes=new WeakMap();
  let lang='zh';
  try { const query=new URLSearchParams(location.search).get('lang');const saved=localStorage.getItem(langKey);lang=['en','zh'].includes(query)?query:['en','zh'].includes(saved)?saved:'zh'; } catch (_) { try { const query=new URLSearchParams(location.search).get('lang');if(['en','zh'].includes(query))lang=query; } catch (_) {} }
  function english(value) {
    const source=String(value),trim=source.trim();
    if(STRINGS[trim])return source.replace(trim,STRINGS[trim]);
    let match;
    if((match=trim.match(/^(\d+) 座海岸 · (.+)$/)))return `${match[1]} coasts · ${english(match[2])}`;
    if((match=trim.match(/^(全部|中国|日本|韩国|澳洲) (\d+)$/)))return `${english(match[1])} ${match[2]}`;
    if((match=trim.match(/^按(.+)当地时间同步；(.+)$/)))return `Synced to ${english(match[1])} local time. ${match[2].startsWith('南半球')?'Southern Hemisphere seasons are opposite to the north.':'Sunlight follows the date and latitude.'}`;
    if((match=trim.match(/^演示当地时间 · (.+) · 调整日期与时刻。$/)))return `Local time preview · ${match[1]} · Adjust the date and time.`;
    if((match=trim.match(/^太阳高度 ([\d.-]+) 度；(.+)；日出 (.+)，日落 (.+)$/)))return `Sun altitude ${match[1]} degrees; ${english(match[2])}; sunrise ${match[3]}, sunset ${match[4]}`;
    if((match=trim.match(/^(.+)，点击收起$/)))return `${english(match[1])}, tap to hide`;
    if((match=trim.match(/^海岸生成失败：(.+)$/)))return `Coast generation failed: ${match[1]}`;
    if((match=trim.match(/^([+-]?[\d.]+) 沙盘单位$/)))return `${match[1]} model units`;
    if(trim.endsWith(' ↗'))return english(trim.slice(0,-2))+' ↗';
    if(trim.includes(' · ')){
      const pieces=trim.split(' · '),out=[];
      for(let i=0;i<pieces.length;){let end=pieces.length;while(end>i+1&&!STRINGS[pieces.slice(i,end).join(' · ')])end--;out.push(english(pieces.slice(i,end).join(' · ')));i=end;}
      return out.join(' · ');
    }
    return source;
  }
  function text(value) {return lang==='en'?english(value):String(value);}
  const skip=node=>node.parentElement?.closest('script,style,input,textarea,[data-no-i18n]');
  function localizeText(node) {
    if(skip(node))return;
    const current=node.nodeValue,prior=sources.get(node);
    const original=prior&&current===prior.en?prior.zh:current;
    let translated=lang==='en'?english(original):original;
    if(lang==='en'&&node.parentElement?.id==='coastTitle'&&node.nextSibling?.nodeName==='BR')translated=translated.trimEnd()+' ';
    if(translated!==original)sources.set(node,{zh:original,en:translated});
    else if(prior&&current!==prior.en)sources.delete(node);
    if(current!==translated)node.nodeValue=translated;
  }
  const attrNames=['aria-label','title','placeholder'];
  function localizeElement(node) {
    if(node.closest('script,style,[data-no-i18n]'))return;
    let originals=attributes.get(node);if(!originals){originals={};attributes.set(node,originals);}
    for(const key of attrNames){if(!node.hasAttribute(key))continue;const current=node.getAttribute(key),prior=originals[key],original=prior&&current===prior.en?prior.zh:current,translated=lang==='en'?english(original):original;if(translated!==original)originals[key]={zh:original,en:translated};else if(prior&&current!==prior.en)delete originals[key];if(translated!==current)node.setAttribute(key,translated);}
  }
  function refresh(root=document.body) {
    if(root.nodeType===Node.TEXT_NODE){localizeText(root);return;}
    if(root.nodeType!==Node.ELEMENT_NODE||root.matches('script,style,[data-no-i18n]'))return;
    localizeElement(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:node=>node.nodeType===Node.ELEMENT_NODE&&node.matches('script,style,[data-no-i18n]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    while(walker.nextNode()){const node=walker.currentNode;if(node.nodeType===Node.TEXT_NODE)localizeText(node);else localizeElement(node);}
  }
  const controls=document.createElement('div');controls.className='language-switch';controls.dataset.noI18n='';controls.setAttribute('role','group');
  for(const [code,label] of [['zh','中文'],['en','EN']]){const button=document.createElement('button');button.type='button';button.dataset.language=code;button.dataset.lang=code;button.textContent=label;button.lang=code==='zh'?'zh-CN':'en';button.onclick=()=>setLanguage(code);controls.append(button);}
  const headerActions=document.createElement('div');headerActions.className='header-actions';document.querySelector('.topbar').append(headerActions);for(const id of ['aboutOpen','exploreExit'])headerActions.append(document.getElementById(id));headerActions.append(controls);
  function syncLanguage(){document.documentElement.lang=lang==='en'?'en':'zh-CN';document.documentElement.dataset.language=lang;controls.setAttribute('aria-label',lang==='en'?'Interface language':'界面语言');controls.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===lang)));}
  function setLanguage(value){if(!['zh','en'].includes(value))return;lang=value;try{localStorage.setItem(langKey,lang);}catch(_){}try{const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);}catch(_){}syncLanguage();refresh();window.dispatchEvent(new CustomEvent('cyanlanguagechange',{detail:{lang}}));}
  window.CyanI18n={get lang(){return lang;},get language(){return lang;},text,english,refresh,setLanguage,strings:STRINGS};
  syncLanguage();refresh();
  const observer=new MutationObserver(records=>{const changed=new Set();for(const record of records){if(record.type==='characterData')changed.add(record.target);else if(record.type==='attributes')localizeElement(record.target);else for(const node of record.addedNodes)if(node.nodeType===Node.ELEMENT_NODE||node.nodeType===Node.TEXT_NODE)changed.add(node);}for(const node of changed)if(node.isConnected)refresh(node);});
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attrNames});
})();
