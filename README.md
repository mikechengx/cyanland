# Cyanland

A living coastal diorama: nine procedural coastlines, a translucent ocean cutaway, sunlight, sunset, moonlight and touchable waves.

**[Open Cyanland](https://mikechengx.github.io/cyanland/)** · [English](https://mikechengx.github.io/cyanland/?lang=en) · [中文](https://mikechengx.github.io/cyanland/?lang=zh)

## Coasts

Qingdao, Dalian, Xiamen, Beihai, Sanya, Gold Coast, Jeju Hyeopjae, Izumisano Rinku and Joetsu Tanihama have different terrain, vegetation, water colours and miniature landmarks. Rinku features white marble pebbles, rather than tropical sand.

## Features

- Single portable HTML with inline JavaScript, WGSL and procedural geometry; no runtime assets or network requests.
- Native WebGPU with WebGL2 fallback; device-dependent adaptive resolution and measured FPS.
- City-local date, time, sunrise/sunset and lunar-calendar information; southern-hemisphere seasons for Gold Coast.
- Golden mornings, violet sunsets, moonlight, fish, coastal details, tide-level animation and wave gestures.
- Rotate, pinch to zoom, hold to pan, scene settings, country filters, search and PNG export.
- Chinese/English UI with a saved preference. Deep links: `?city=jeju&lang=en`.

The scenery is an artistic miniature. Tides are a periodic simulation; weather is a selectable scenario, not live observations or navigation guidance. Solar direction uses an astronomical approximation; lunar dates use the browser Chinese calendar. Moonlight, stars and clouds are artistic atmosphere, not an observed lunar phase.

## Source and build

Readable source is under `source/`. Run `python3 source/build.py` to regenerate `index.html`. No package installation is needed. Run `node source/test-international-time.cjs` for offline calendar, solar and city-time checks. `CyanApp.registerCity(def, builder)` provides an extension point for more coasts.

## Migration

The original `https://mikechengx.github.io/launch-jelly/cyanland.html` redirects here. The public origin and application storage keys are unchanged, so preferences remain available in the same browser. Older history remains in [launch-jelly](https://github.com/mikechengx/launch-jelly).

## 中文

**Cyanland · 海岸观察室**：九座各具特色的果冻海岸，包含国内五城与黄金海岸、济州、泉佐野临空城、上越。支持日出日落、星空月光、海水拨浪、透明剖面、小鱼与城市地标。

点击 中文 / EN 切换界面语言。手机可单指环绕、双指缩放、长按移位；设置抽屉与沙盘分区。潮汐为周期模拟、天气为手动情境，画面不是实景测绘或实时天气预报。

独立网址与仓库均为 `cyanland`。旧网址会自动跳转；同一浏览器内的线上偏好继续可用。
