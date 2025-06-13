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
import { callBack, layerListToBitmap, markerIcon } from './utils'
import BitmapDescriptorFactory from 'com.amap.api.maps.model.BitmapDescriptorFactory'
import MarkerOptions from "com.amap.api.maps.model.MarkerOptions";
import BitmapFactory from "android.graphics.BitmapFactory";
import R from "uts.sdk.modules.lmAmap.R"
import Bitmap from 'android.graphics.Bitmap';
import OnCameraChangeListener from "com.amap.api.maps.AMap.OnCameraChangeListener"
import Marker from 'com.amap.api.maps.model.Marker'
import CameraPosition from 'com.amap.api.maps.model.CameraPosition'
import Point from "android.graphics.Point";
import BitmapDescriptor from 'com.amap.api.maps.model.BitmapDescriptor'
// console.log
class cameraChange implements OnCameraChangeListener {
	protected aMap: AMap | null = null;
	protected marker: Marker | null = null;
	constructor(aMap: AMap | null, marker: Marker | null){
		this.aMap = aMap;
		this.marker = marker;
	}
	override onCameraChangeFinish(param0: CameraPosition): void {
		this.marker?.setAnchor(0.5.toFloat(), 1.0.toFloat());
	}
	override onCameraChange(cameraPosition: CameraPosition){
		const screenPosition: Point = this.aMap?.getProjection().toScreenLocation(cameraPosition.target)!;
		this.marker?.setPositionByPixels(screenPosition.x, screenPosition.y);
		this.marker?.setAnchor(0.5.toFloat(), 1.2.toFloat());
		// console.log(this.marker!)
	}
}

// type markerOption = {
// 	latlng: LatLng;
// 	icon: BitmapDescriptor
// }

export default {
	name: "lm-Amap",
	emits: ['mapLoad'],
	props:{
		zoom: {
			type: Number,
			default: 14
		},
		markers:{
			type: Array,
			default: []
		}
	},
	watch:{
		"zoom":{
			handler(val:number){
				const mCameraUpdate: CameraUpdate = CameraUpdateFactory.zoomTo(val.toFloat());
				this.aMap?.moveCamera(mCameraUpdate)
			},
			immediate: true
		},
		// "markers":{
		// 	handler(val:[]){
		// 		console.log(val);
		// 	},
		// 	immediate: true
		// }
	},
	data() {
		return {
			aMap: null as AMap | null,
			marker: null as Marker | null
		}
	},
	expose: ['addMarker'],
	methods: {
		addMarker(latlng: LatLng, icon: BitmapDescriptor){
			const markerOption = new MarkerOptions();
			markerOption.position(latlng);
			markerOption.icon(icon);
			markerOption.anchor(0.5.toFloat(), 1.0.toFloat());
			this.marker = this.aMap?.addMarker(markerOption)
		},
		toBitmap(): BitmapDescriptor{
			const bitmap = BitmapFactory.decodeResource(this.$androidContext!.resources, R.drawable.ic_pin)
			console.log(bitmap,R.drawable.ic_pin);
			const resizedBitmap = Bitmap.createScaledBitmap(bitmap, 100, 100, true);
			return BitmapDescriptorFactory.fromBitmap(resizedBitmap)
		}
	},
	NVLoad(): MapView {
		const map =  new MapView(this.$androidContext!)
		map.onCreate(new Bundle())
		this.aMap = map.getMap() as AMap
		return map
	},
	NVLayouted(){
		const mapUiSetting = this.aMap?.getUiSettings()
		mapUiSetting?.setZoomControlsEnabled(false)
		mapUiSetting?.setGestureScaleByMapCenter(true);
		// getLocation( true, (res)=>{
		// 	const { latitude, longitude } = res;
		// 	const latlng = new LatLng(latitude.toDouble(),longitude.toDouble())
		// 	console.log(latlng);
		// 	// const mCameraUpdate: CameraUpdate = CameraUpdateFactory.changeLatLng(latlng)
		// 	// this.aMap?.animateCamera(mCameraUpdate, 200, new callBack())
		// 	this.addMarker(latlng, this.toBitmap())
		// 	// this.aMap?.setOnCameraChangeListener(new cameraChange(this.aMap!,this.marker!))
		// })
		this.$emit('mapLoad')

		// this.aMap?.OnMapTouchListener()
	}
}
</script>