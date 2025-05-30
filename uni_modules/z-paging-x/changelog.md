## 0.3.2（2025-02-13）
1.`新增` 添加编译到微信小程序的支持。  
2.`优化` 在web平台刷新列表是【点击加载更多】闪动然后消失的问题。  
3.`优化` 其他细节调整。
## 0.3.1（2024-12-03）
1.`新增` events：`@refresherpulling`、`@refresherrefresh`、`@refresherrestore`、`@refresherabort`、`@scrolltolower`、`@scrolltoupper`、`@refresherStatusChange`、`@loadMoreStatusChange`。  
2.`新增` slot="empty"。  
3.`新增` `scrollToTop`、`scrollToBottom`、`scrollToY`添加是否展示滚动动画参数。  
## 0.3.0（2024-10-13）
1.`新增` 添加编译到web的支持。  
2.`优化` 布局方式，使布局更灵活。  
3.`优化` 插件细节调整。  
## 0.2.2（2024-07-08）
增加对iOS的支持
## 0.2.1（2024-03-10）
1.`新增` `scroll-to-top-when-reload`和`clean-list-when-reload`，支持控制reload时是否自动滚动到顶部&reload时是否立即自动清空原list。  
2.`修复` 在HBuilderX4.0+ 中loading动画失效的问题。  
3.`修复` 分页加载到没有更多数据后下拉刷新，底部依然为没有更多状态的问题。  
4.`修复` 在HBuilderX4.0+ 中点击返回顶部按钮展示异常的问题。  
5.`优化` reload自动清空列表；滑动切换选项卡支持下拉刷新。  
## 0.2.0（2024-02-02）
支持HBuilder X 4.0
## 0.1.5（2024-01-22）
1.`新增` 方法：`completeByTotal`，支持通过total判断是否有更多数据。  
2.`新增` 方法：`completeByNoMore`，支持自行判断是否有更多数据。  
3.`新增` demo：空数据图&加载失败。  
4.`新增` `z-paging-x` logo&更新首页导航栏。  
## 0.1.4（2024-01-17）
1.`新增` 一些demo演示。  
2`优化` 更新内置的空数据图&加载失败图。   
## 0.1.3（2024-01-11）
1.`新增` 支持全局配置。  
2.`新增` 支持滚动到底部&滚动到指定位置。  
3.`优化` 更新空数据图默认图片。  
## 0.1.2（2024-01-03）
1.`新增` 滑动切换选项卡+吸顶演示 & list相关配置。  
2.`新增` props `empty-error-text` & `empty-error-img`，支持配置空数据图加载失败文字&图片。  
3.`新增` 方法 `completeByError`，在请求结束(失败)调用此方法，将自动展示失败页面 。  
4.`新增` slots `loadMore`，支持自定义底部加载更多view。  
5.`新增` event `refresh`，支持监听用户下拉刷新。  
6.`修复` 下拉刷新显示最后更新时间时，时间更新可能不及时的问题。  
7.`修复` 下拉刷新和底部加载更多loading动画未持续执行的问题。  
## 0.1.1（2023-12-26）
1.`新增` 支持下拉刷新view自定义各种状态文字&下拉刷新背景色。  
2.`新增` 支持底部加载更多view配置自定义状态文字。  
3.`新增` 支持自定义`z-paging-x`的style。  
4.`新增` 支持自定义空数据图文字和图片。  
5.`新增` 支持列表刷新时自动显示下拉刷新view。  
6.`新增` 点击滚动到顶部按钮。  
7.`新增` 支持配置下拉刷新显示最后刷新时间。  
## 0.1.0（2023-12-23）
首次发布
