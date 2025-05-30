<template>
	<view></view>
</template>
<script lang="uts">
import MapView from 'com.amap.api.maps.MapView'
import AMap from "com.amap.api.maps.AMap" // AMap类
import Bundle from "android.os.Bundle"
import LatLng from "com.amap.api.maps.model.LatLng"
import CameraUpdateFactory from "com.amap.api.maps.CameraUpdateFactory"
import CameraUpdate  from "com.amap.api.maps.CameraUpdate"
import { getLocation } from '.'
import CancelableCallback from 'com.amap.api.maps.AMap.CancelableCallback'
export type mapParams ={
	latitude: number,
	longitude: number,
	zoom: number,
	pitchAngle: number,
	yawAngle: number
}
let aMap:AMap | null = null ;

class callBack implements CancelableCallback{
	override onFinish() {
		console.log('动画执行完成');
	}
	override onCancel() {
		console.log('动画已取消');
	}
}
export default {
	name: "lm-Amap",
	props:{
		zoom: {
			type: Number,
			default: 14
		}
	},
	watch:{
		"zoom":{
			handler(val:number){
				const mCameraUpdate: CameraUpdate = CameraUpdateFactory.zoomTo(val.toFloat());
				aMap?.moveCamera(mCameraUpdate)
			},
			immediate: true
		}
	},
	data() {
		return {}
	},
    expose: ['init'],
	methods:{
		init(data: mapParams){
			console.log(data);
			// const {latitude, longitude, zoom, pitchAngle, yawAngle} = data
			// const mCameraUpdate: CameraUpdate = CameraUpdateFactory.newCameraPosition(new CameraPosition(new LatLng(latitude.toDouble(),longitude.toDouble()), zoom.toFloat(), pitchAngle.toFloat(), yawAngle.toFloat()));
			// console.log(aMap,this.$el);
			// aMap?.moveCamera(mCameraUpdate)
		}
	},
	NVLoad(): MapView {
		const map =  new MapView(this.$androidContext!)
		map.onCreate(new Bundle())
		aMap = map.getMap() as AMap
		return map
	},
	NVLayouted(){
		const mapUiSetting = aMap?.getUiSettings()
		mapUiSetting?.setZoomControlsEnabled(false)
		getLocation( true, (res)=>{
			console.log(res);
			const { latitude, longitude } = res;
			const latlng = new LatLng(latitude.toDouble(),longitude.toDouble())
			const mCameraUpdate: CameraUpdate = CameraUpdateFactory.changeLatLng(latlng)
			aMap?.animateCamera(mCameraUpdate, 200, new callBack())
		})
	}
}
</script>
