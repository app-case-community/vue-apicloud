//
//  UZWidget.h
//  APICloud
//
//  Created by kenny on 2017/6/19.
//  Copyright © 2017年 APICloud. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UZWidget : NSObject
    
/*! widget的id */
@property (nonatomic, readonly) NSString *widgetId;
/*! widget的根目录 */
@property (nonatomic, readonly) NSString *folderPath;
/*! widget的起始页 */
@property (nonatomic, readonly) NSString *src;
    
/*!
 通过指定config.xml文件来创建一个widget对象
 @param path config.xml文件的绝对路径
 @return 返回一个widget对象
 */
- (id)initWithConfigPath:(NSString *)path;

@end
