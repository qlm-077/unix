# lm-Vibrator
### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS uni-app兼容模式组件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[UTS 标准模式组件](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-vue-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)

# 使用教程
```javascript
<script setup>
	import { VibrationUtil } from '@/uni_modules/lm-Vibrator'

	const click = () => {
		/** 
		* @method vibrateShort 短震动 (200ms)
		* @method vibrateLong 长震动 (500ms)
		* @method vibrate 自定义时长震动
		* @method vibratePattern 自定义震动模式 (间隔模式)
		* @method vibrateWithAmplitude 带强度控制的震动 (Android 12+)
		* @method cancelVibration 取消震动
		*/
	   
	   
		/** 短震动 (200ms) */
		VibrationUtil.vibrateShort()
		/** 长震动 (500ms) */
		VibrationUtil.vibrateLong()
		/** 
		* @param duration 时长(ms)
		*/
		VibrationUtil.vibrate(300)
		/** 
		* @param pattern 交替表示震动时间和暂停时间的number数组
		* [0, 100, 200, 300] 表示: 立即开始（延迟 0ms）-> 震动 100ms -> 暂停 200ms -> 再震动 300ms
		* @param repeat 默认-1(不重复) 0(重复)
		*/
		VibrationUtil.vibratePattern([0, 100, 200, 300])
		/** 
		* @param duration 时长(ms)
		* @param amplitude 强度 1-255 取值
		*/
		VibrationUtil.vibrateWithAmplitude(200, 50)
		/** 取消震动*/
		VibrationUtil.cancelVibration()
	}
</script>
```