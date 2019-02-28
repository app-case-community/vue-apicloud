//
//  APIUpdateManager.h
//  UZEngine
//
//  Created by kenny on 16/3/15.
//  Copyright © 2016年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol APISmartUpdateDelegate;

@interface APIUpdateManager : NSObject

/*! 设置云修复更新代理 */
@property (nonatomic, weak) id<APISmartUpdateDelegate>smartUpdateDelegate;

+ (instancetype)manager __attribute__((deprecated("使用sharedManager代替")));
+ (instancetype)sharedManager;

@end


@interface SmartUpdatePackage : NSObject

@property (nonatomic, readonly) BOOL silent;    // 是否是静默更新包
@property (nonatomic, readonly) int version;    // 更新包版本
@property (nonatomic, copy, readonly) NSString *extra;  //更新包附加信息

@end


@protocol APISmartUpdateDelegate <NSObject>

/*!
 云修复完成的回调。
 
 @param packages 所有本次更新的云修复包
 */
- (void)didSmartUpdateFinished:(NSArray *)packages;

/*!
 该方法只对静默修复起作用。若返回NO，修复包将在下次应用重新启动时自动生效，同时- (void)didSmartUpdateFinished:(NSArray *)packages方法将不会被调用。若返回YES，修复包将立刻生效，Native需要在- (void)didSmartUpdateFinished:(NSArray *)packages方法里面做热重启应用的操作来保证整个修复流程的完整性。
 若未实现该方法，默认以返回YES处理。
 
 @return 是否立刻重启应用
 */
- (BOOL)shouldRebootApp;

@end
