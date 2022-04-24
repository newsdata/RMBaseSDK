//
//  MgcVideoTemplateManager.h
//  SHWJianBeiMix
//
//  Created by ShiChangShun on 2022/1/11.
//

#import <Foundation/Foundation.h>

typedef  void(^RMShareInfoBlock)(NSDictionary* shareInfo);

static NSString *flutterLoadedNoti = @"Flutter_load_notification";

@interface RMBasePluginManager : NSObject

+ (void)registerFlutterChannel:(id)channel;

/// 原生跳转flutter页面之前调用
/// @param route 跳转的页面路由
+ (void)navigateTo:(NSString *)route;

/// 注册分享平台
/// @param platforms  支持平台的数组可以为空 @[@"qq",@"dingding",@"wechat"]
+ (void)registerSharePlatforms:(NSArray *)platforms withListenShareInfoBlock:(void(^)(NSDictionary* shareInfo))shareBlock;

/// flutter 点击分享后传递到native端的分享信息
/// @param shareInfo 分享信息 (String platform, String title, String content, String url)
+ (void)shareTo:(NSDictionary *)shareInfo;

///获取用户token
+ (NSString *)getToken;

/// 删除Token
+ (void)removeToken;

/// 是否已经启动flutter
+ (void)setLaunch:(BOOL)isLaunched;

///注册智能采集
+ (void)registerCollectWithToken:(NSString *)token;

/// 注册智能媒资
+ (void)registerMaterialWithToken:(NSString *)token;

///注册智能生产
+ (void)registerProductionWithToken:(NSString *)token;

//注册智能审核
+ (void)registerAuditWithToken:(NSString *)token;

///注册作品管理
+ (void)registerManuscriptWithToken:(NSString *)token;

///注册渠道分发
+ (void)registerDistributionWithToken:(NSString *)token;



@end

