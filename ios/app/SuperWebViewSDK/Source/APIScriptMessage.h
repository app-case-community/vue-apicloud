//
//  APIScriptMessage.h
//  APICloud
//
//  Created by kenny on 16/1/8.
//  Copyright (c) 2016年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@class APIWebView;

@interface APIScriptMessage : NSObject

@property (nonatomic, copy, readonly) NSString *name;
@property (nonatomic, copy, readonly) id userInfo;
@property (nonatomic,readonly) NSInteger callback;      // 此次消息的回调方法，通过APIWebView进行回调数据时需要

@end


/*! html页面和原生交换数据协议，需要根据webView来区分具体是哪个页面 */
@protocol APIScriptMessageDelegate <NSObject>

/*!
 接收到html里面通过api.accessNative方法发送的消息
 @param webView 所在的页面
 @param scriptMessage 接收到的消息
 */
- (void)webView:(APIWebView *)webView didReceiveScriptMessage:(APIScriptMessage *)scriptMessage;

@end
