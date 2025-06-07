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
				this.aMap?.moveCamera(mCameraUpdate)
			},
			immediate: true
		}
	},
	data() {
		return {
			aMap: null as AMap | null,
			marker: null as Marker | null
		}
	},
	expose: ['addMarker'],
	methods: {
		addMarker(latlng: LatLng){
			// aMap?.addMarker(new MarkerOptions().position(latlng).icon(BitmapDescriptorFactory.fromBitmap(marker)))
			// Picasso.get().load("https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/samantha/logo-icon-white-bg.png").resize(200,200).centerCrop().into(new markerIcon(this.aMap!,latlng))
			const markerOption = new MarkerOptions();
			markerOption.position(latlng);
			const bitmap = BitmapFactory.decodeResource(this.$androidContext!.resources, R.drawable.ic_pin)
			console.log(bitmap,R.drawable.ic_pin);
			const resizedBitmap = Bitmap.createScaledBitmap(bitmap, 100, 100, true);
			markerOption.icon(BitmapDescriptorFactory.fromBitmap(resizedBitmap));
			markerOption.anchor(0.5.toFloat(), 1.0.toFloat());
			this.marker = this.aMap?.addMarker(markerOption)
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
		getLocation( true, (res)=>{
			const { latitude, longitude } = res;
			const latlng = new LatLng(latitude.toDouble(),longitude.toDouble())
			const mCameraUpdate: CameraUpdate = CameraUpdateFactory.changeLatLng(latlng)
			this.aMap?.animateCamera(mCameraUpdate, 200, new callBack())
			this.addMarker(latlng)
			this.aMap?.setOnCameraChangeListener(new cameraChange(this.aMap!,this.marker!))
		})
		// this.aMap?.OnMapTouchListener()
	}
}
</script>
