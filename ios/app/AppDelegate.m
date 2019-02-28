//
//  AppDelegate.m
//  vue-apicloud
//
//  Created by zhu zhe on 2019/2/28.
//  Copyright © 2019 zhe Zhu. All rights reserved.
//

#import "AppDelegate.h"
#import "APIManager.h"
#import "APIWindowContainer.h"
#import "APIWidgetContainer.h"
#import "UZAppUtils.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    APIConfiguration *configuration = [[APIConfiguration alloc] init];
    // 调试时可以开启WiFi代码同步功能
    configuration.enableWifiSync = NO;
    [[APIManager sharedManager] initSDKWithLaunchOptions:launchOptions configuration:configuration];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    
    NSString *url = @"widget://index.html";
    NSString *name = @"index";
    APIWindowContainer *windowContainer = [APIWindowContainer windowContainerWithAttribute:@{@"url":url, @"name":name}];
    [windowContainer startLoad];
    UINavigationController* nav = [[APIWidgetContainer alloc] initWithRootViewController:windowContainer];
    self.window.rootViewController = nav;
    [self.window makeKeyAndVisible];
    nav.navigationBar.barTintColor = [UZAppUtils colorFromNSString:@"#272c3b"];
    nav.navigationBar.translucent = NO;
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
