//
//  RMBaseManager.h
//  RMBaseSDK
//
//  Created by ShiChangShun on 2022/3/22.
//

#import <Foundation/Foundation.h>


typedef NS_ENUM(NSUInteger, OpenFlutterViewType) {
    OpenFlutterViewPush,
    OpenFlutterViewPresent,
    OpenFlutterViewOther,
};

NS_ASSUME_NONNULL_BEGIN

@interface RMBaseManager : NSObject

/// 启动配置
+(void)config;

/// 释放engine
+ (void)destroyEngine;

/// 注册智能采集
/// @param token 登录token
+ (void)registerCollectWithToken:(NSString *)token;

/// 注册智能媒资
/// @param token 登录token
+ (void)registerMaterialWithToken:(NSString *)token;

/// 注册智能媒资
/// @param token 登录token
+ (void)registerProductionWithToken:(NSString *)token;

/// 注册智能媒资
/// @param token 登录token
+ (void)registerAuditWithToken:(NSString *)token;

/// 注册智能媒资
/// @param token 登录token
+ (void)registerManuscriptWithToken:(NSString *)token;

/// 注册智能媒资
/// @param token 登录token
+ (void)registerDistributionWithToken:(NSString *)token;


/// 跳转Flutter路由页面
/// @param route 跳转目标页的路由
/// @param animate 是否需要跳转动画
/// @param isPush 页面跳转方式
+ (BOOL)openFlutterViewWithRoute:(NSString *)route isAnimate:(BOOL)animate isPush:(BOOL)isPush;


/// 注册分享功能的回调
/// @param platforms 分享平台
/// @param shareBlock 分享回调Block
+ (void)registerSharePlatforms:(NSArray *)platforms withListenShareInfoBlock:(void(^)(NSDictionary* shareInfo))shareBlock;


@end

NS_ASSUME_NONNULL_END
