//
//  APIWidgetContainer.h
//  APICloud
//
//  Created by kenny on 15/12/29.
//  Copyright (c) 2015年 APICloud. All rights reserved.
//

#import <UIKit/UIKit.h>

@class UZWidget;

@interface APIWidgetContainer : UINavigationController

// 创建一个带导航控制器的widget容器并附加信息，里面第一个window的名字默认为root，页面里面可以通过api.wgtParam来获取userInfo，导航栏默认隐藏
+ (APIWidgetContainer *)widgetContainerWithUrl:(NSString *)url;
+ (APIWidgetContainer *)widgetContainerWithUrl:(NSString *)url userInfo:(NSDictionary *)userInfo;
- (instancetype)initWithUrl:(NSString *)url userInfo:(NSDictionary *)userInfo;
// 通过页面参数创建一个带导航控制器的widget容器，里面第一个window的名字默认为root，导航栏默认隐藏，attribute里面的key可以参考openWin方法的参数：http://docs.apicloud.com/Client-API/api#33 ，其中url为必需字段
+ (instancetype)widgetContainerWithAttribute:(NSDictionary *)attribute;
+ (instancetype)widgetContainerWithAttribute:(NSDictionary *)attribute widget:(UZWidget *)widget;

// 加载页面
- (void)startLoad;

/*!
 在指定window和frame中执行javascript脚本
 @param script javascript脚本
 @param window 指定window的名称，若在当前window中执行则可以传nil
 @param frame 指定frame的名称，若是在window中执行脚本则传nil
 @return 执行结果
 */
- (id)execScript:(NSString *)script window:(NSString *)window frame:(NSString *)frame;

@end
