//
//  APIWebView.h
//  APICloud
//
//  Created by kenny on 15/12/31.
//  Copyright © 2015年 APICloud. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UZWebViewProtocol.h"

@class APIWidgetContainer, APIWindowContainer, APIScriptMessage;

typedef NS_ENUM(NSInteger, APIWebViewType) {
    /*! 页面类型为window，即通过windowContainerWithUrl:方法打开的，或者是html中通过openWin等方法打开的 */
    APIWebViewTypeWindow,
    /*! 页面类型为frame，即html页面中通过openFrame、openFrameGroup等方法打开的 */
    APIWebViewTypeFrame
};

@interface APIWebView : UIView
<UZWebViewProtocol>

/*! 当前页面所属的widgetContainer，只有通过SDK自己创建的APIWidgetContainer对象，里面APIWebView页面的该属性才有值 */
@property (nonatomic, readonly) APIWidgetContainer *widgetContainer;

/*! 当前页面所属的windowContainer */
@property (nonatomic, readonly) APIWindowContainer *windowContainer;

/*! 页面的类型，表明是window还是frame */
@property (nonatomic, readonly) APIWebViewType webViewType;

/*! 当前页面的名称，对应js里面通过openWin、openFrame方法打开页面时传的name参数 */
@property (nonatomic, readonly) NSString *name;

/*! 当前页面所在的window的名称，若当前页面就是window类型，那么此属性值和name的值一样 */
@property (nonatomic, readonly) NSString *winName;

/*!
 执行回调方法，规定js中的方法形式为function funcName(ret,err){}，有ret和err两个参数
 @param callback 回调方法
 @param ret 表示成功的参数
 @param del 是否执行回调后在js端删除该function，若只需要回调一次则传YES，便于内存回收
 @param err 表示错误的参数
 */
- (void)sendResultWithCallback:(NSInteger)callback ret:(NSDictionary *)ret err:(NSDictionary *)err delete:(BOOL)del;

@end


@protocol APIWebViewDelegate <NSObject>

@optional
- (BOOL)webView:(APIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (void)webViewDidStartLoad:(APIWebView *)webView;
- (void)webViewDidFinishLoad:(APIWebView *)webView;
- (void)webView:(APIWebView *)webView didFailLoadWithError:(NSError *)error;

@end
