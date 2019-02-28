//
//  APIManager.h
//  APICloud
//
//  Created by kenny on 15/11/23.
//  Copyright (c) 2015年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "APIWebView.h"
#import "APIModuleMethod.h"
#import "APIScriptMessage.h"
#import "APIConfiguration.h"

@interface APIManager : NSObject

/*! 设置全局模块方法调用代理，设置后，页面js调用所有模块方法之前都会询问代理是否该方法允许被调用 */
@property (nonatomic, weak) id<APIModuleMethodDelegate> moduleMethodDelegate;

/*! 设置全局webView的代理，处理页面请求 */
@property (nonatomic, weak) id<APIWebViewDelegate> webViewDelegate;

/*! 设置接收html页面发送的消息代理，html页面可以通过api.accessNative方法和原生交换数据 */
@property (nonatomic, weak) id<APIScriptMessageDelegate> scriptMessageDelegate;

+ (instancetype)manager __attribute__((deprecated("使用sharedManager代替")));
+ (instancetype)sharedManager;

/*!
 初始化SDK，使用之前必须调用此方法进行初始化。此方法即将废弃，请使用- (void)initSDKWithLaunchOptions:(NSDictionary *)launchOptions代替
 */
- (void)initSDK __attribute__((deprecated("使用initSDKWithLaunchOptions:configuration:代替")));

/*!
 初始化SDK，使用之前必须调用此方法进行初始化。将应用的启动信息传递给SDK，使得SDK能够处理信息并将其交给html页面，在- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions方法中调用
 @param launchOptions 应用启动信息
 */
- (void)initSDKWithLaunchOptions:(NSDictionary *)launchOptions;

/*!
 初始化SDK，使用之前必须调用此方法进行初始化。将应用的启动信息传递给SDK，使得SDK能够处理信息并将其交给html页面，在- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions方法中调用
 @param launchOptions 应用启动信息
 @param configuration 配置信息，传nil时使用默认配置
 */
- (void)initSDKWithLaunchOptions:(NSDictionary *)launchOptions configuration:(APIConfiguration *)configuration;

@end
