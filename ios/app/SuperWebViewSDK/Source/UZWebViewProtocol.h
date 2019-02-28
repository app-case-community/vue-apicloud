//
//  UZWebViewProtocol.h
//  APICloud
//
//  Created by kenny on 16/1/8.
//  Copyright (c) 2016年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol UZWebViewProtocol <NSObject>

@property (nonatomic, readonly) NSURLRequest *request;

- (void)loadRequest:(NSURLRequest *)request;

- (void)reload;
- (void)stopLoading;

- (void)goBack;
- (void)goForward;

@property (nonatomic, readonly) BOOL canGoBack;
@property (nonatomic, readonly) BOOL canGoForward;
@property (nonatomic, readonly, getter=isLoading) BOOL loading;

- (void)evaluateJavaScript:(NSString *)javaScriptString completionHandler:(void (^)(id, NSError *error))completionHandler;

@end
