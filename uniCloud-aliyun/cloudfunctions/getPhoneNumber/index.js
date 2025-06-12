'use strict';
exports.main = async (event, context) => {
	// event里包含着客户端提交的参数
	const res = await uniCloud.getPhoneNumber({
		appid: context.APPID, // 客户端callFunction时携带的AppId信息
		provider: 'univerify',
		access_token: event.access_token,
		openid: event.openid
	})

	console.log(res); // res里包含手机号
	// 执行用户信息入库等操作，正常情况下不要把完整手机号返回给前端
	return {
		code: 0,
		message: '获取手机号成功',
		phoneNumber: res.phoneNumber // 示例：实际项目中请根据需求决定是否返回手机号
	}
}; 