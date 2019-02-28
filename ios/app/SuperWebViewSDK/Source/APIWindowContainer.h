//
//  APIWindowContainer.h
//  APICloud
//
//  Created by kenny on 15/12/29.
//  Copyright (c) 2015年 APICloud. All rights reserved.
//

#import <UIKit/UIKit.h>

@class UZWidget;

@interface APIWindowContainer : UIViewController

@property (nonatomic, readonly) NSString *name;     //若创建对象时未指定，则默认值为root

// 创建一个window容器，url为网页文件的路径，name为window的名字，页面里面通过该值来区分各个window，页面里面可以通过api.pageParam来获取userInfo
+ (APIWindowContainer *)windowContainerWithUrl:(NSString *)url;
+ (APIWindowContainer *)windowContainerWithUrl:(NSString *)url name:(NSString *)name userInfo:(NSDictionary *)userInfo;
- (instancetype)initWithUrl:(NSString *)url name:(NSString *)name userInfo:(NSDictionary *)userInfo;
// 通过指定页面参数来创建一个window容器, attribute里面的key可以参考openWin方法的参数：http://docs.apicloud.com/Client-API/api#33 ，其中name和url为必需字段
+ (instancetype)windowContainerWithAttribute:(NSDictionary *)attribute;
+ (instancetype)windowContainerWithAttribute:(NSDictionary *)attribute widget:(UZWidget *)widget;

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
