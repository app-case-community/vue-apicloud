//
//  APIEvent.h
//  APICloud
//
//  Created by kenny on 15/11/30.
//  Copyright © 2015年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface APIEvent : NSObject

@property (nonatomic, readonly, copy) NSString *name;
@property (nonatomic, readonly, copy) id userInfo;

+ (instancetype)eventWithName:(NSString *)name userInfo:(id)userInfo;

@end


@interface APIEventCenter : NSObject

+ (APIEventCenter *)defaultCenter;

// 发送事件，网页里面可以通过api.addEventListener方法监听
- (void)sendEvent:(APIEvent *)event;
- (void)sendEventWithName:(NSString *)name userInfo:(id)userInfo;

// 监听事件，网页里面可以通过api.sendEvent方法发送事件
- (void)addEventListener:(id)listener selector:(SEL)selector name:(NSString *)name;

// 移除事件监听
- (void)removeEventListener:(id)listener name:(NSString *)name;
- (void)removeEventListener:(id)listener;

@end