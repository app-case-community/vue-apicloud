//
//  APIConfig.h
//  UZEngine
//
//  Created by kenny on 2018/5/29.
//  Copyright © 2018年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface APIConfiguration : NSObject

/*!
 是否开启WiFi同步功能，开启后应用可以像自定义loader那样通过WiFi进行代码同步，方便调试，默认值为NO。WiFi同步操作请参考文档https://docs.apicloud.com/Dev-Tools/wifi-debug
 */
@property (nonatomic) BOOL enableWifiSync;

/*!
 指定初始化widget目录，目录里面必须包含config.xml文件。如果不设置此参数，将默认使用应用的bundle目录下的widget文件夹。
 */
@property (nonatomic, copy) NSString *defaultWidgetPath;

@end
