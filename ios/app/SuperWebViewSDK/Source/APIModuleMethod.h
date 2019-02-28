//
//  APIModuleMethod.h
//  APICloud
//
//  Created by kenny on 15/12/31.
//  Copyright © 2015年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@class APIWebView;

@interface APIModuleMethod : NSObject

/*! 调用方法的页面 */
@property (nonatomic, weak) APIWebView *webView;
@property (nonatomic, copy) NSString *module;
@property (nonatomic, copy) NSString *method;

@end

@protocol APIModuleMethodDelegate <NSObject>

// 是否允许方法被调用，返回NO则html页面无法调用该方法
- (BOOL)shouldInvokeModuleMethod:(APIModuleMethod *)moduleMethod;

@end