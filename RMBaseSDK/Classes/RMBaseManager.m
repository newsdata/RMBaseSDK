//
//  RMBaseManager.m
//  RMBaseSDK
//
//  Created by ShiChangShun on 2022/3/22.
//

#import "RMBaseManager.h"
#import <FlutterSDK/FlutterSDK.h>
#import "RMGeneratedPluginRegistrant.h"
#import <SHWJianBeiMix/SHWJianBeiMix.h>


@interface RMBaseManager()

@property (nonatomic,strong) FlutterEngineSDK *engine;

@end

@implementation RMBaseManager

static RMBaseManager * _instance;

+ (RMBaseManager *)defaultManager {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (!_instance) {
            _instance = [[RMBaseManager alloc]init];
        }
    });
    return _instance;
}

- (instancetype)init {
    if (_instance) {
        return _instance;
    }
    if (self = [super init]) {}
    return self;
}

- (void)initEngine {
    if (!self.engine) {
        [MgcAppDelegateSDK mgcSetup];
        self.engine = [[FlutterEngineSDK alloc]initWithName:@"io.flutter.flutter"];
        [self.engine run];
        [RMGeneratedPluginRegistrant registerWithRegistry:self.engine];
        [MgcPluginRegistrant registerWithRegistry:self.engine];
    }
}

+ (void)destroyEngine {
    if ([RMBaseManager defaultManager].engine != nil) {
        [[RMBaseManager defaultManager].engine destroyContext];
        [RMBaseManager defaultManager].engine = nil;
        [RMBasePluginManager setLaunch:NO];
    }
}

- (void)destroyEngine {
    if (self.engine) {
        [self.engine destroyContext];
        self.engine = nil;
    }
}

+ (void)config {

}

+ (void)registerCollectWithToken:(NSString *)token {
    [[RMBaseManager defaultManager] initEngine];
    [RMBasePluginManager registerCollectWithToken:token];
}

+ (void)registerMaterialWithToken:(NSString *)token {
    [[RMBaseManager defaultManager] initEngine];
    [RMBasePluginManager registerMaterialWithToken:token];
}

+ (void)registerAuditWithToken:(NSString *)token {
    [[RMBaseManager defaultManager] initEngine];
    [RMBasePluginManager registerAuditWithToken:token];
}

+ (void)registerProductionWithToken:(NSString *)token {
    [[RMBaseManager defaultManager] initEngine];
    [RMBasePluginManager registerProductionWithToken:token];
}

+ (void)registerManuscriptWithToken:(NSString *)token {
    [[RMBaseManager defaultManager] initEngine];
    [RMBasePluginManager registerManuscriptWithToken:token];
}

+ (void)registerDistributionWithToken:(NSString *)token {
    [[RMBaseManager defaultManager] initEngine];
    [RMBasePluginManager registerDistributionWithToken:token];
}

+ (void)registerSharePlatforms:(NSArray *)platforms withListenShareInfoBlock:(void(^)(NSDictionary*))shareBlock {
    [RMBasePluginManager registerSharePlatforms:platforms withListenShareInfoBlock:shareBlock];
}

+ (BOOL)openFlutterViewWithRoute:(NSString *)route isAnimate:(BOOL)animate isPush:(BOOL)isPush {
    if (![RMBaseManager defaultManager].engine) {
        return NO;
    }
    return [[self defaultManager] openFlutterViewWithRoute:route isAnimate:animate isPush: isPush];
}

- (BOOL)openFlutterViewWithRoute:(NSString *)route isAnimate:(BOOL)animate isPush:(BOOL)isPush {
    
    UIViewController *controller = [self findCurrentShowingViewController];
    
    [RMBasePluginManager  navigateTo:route];
    FlutterViewControllerSDK *vc = [[FlutterViewControllerSDK alloc]initWithEngine:self.engine nibName:nil bundle:nil];
    vc.modalPresentationStyle = UIModalPresentationOverCurrentContext;
    
    if (isPush) {
        controller.navigationController.view.backgroundColor = [UIColor whiteColor];
        if ([controller isKindOfClass:[UINavigationController class]]) {
            UINavigationController *navC = (UINavigationController *)controller;
            navC.navigationBarHidden = YES;
            [navC pushViewController:vc animated:animate];
        }else if ([controller isKindOfClass:[UITabBarController class]]) {
            controller.navigationController.navigationBarHidden = YES;
            [((UITabBarController *)controller).navigationController pushViewController:vc animated:animate];
        }else {
            controller.navigationController.navigationBarHidden = YES;
            [controller.navigationController pushViewController:vc animated:animate];
        }
    }else {
        vc.modalPresentationStyle = UIModalPresentationOverCurrentContext;
        vc.viewOpaque = NO;
        [controller presentViewController:vc animated:animate completion:nil];
    }
    
    return YES;
}

- (UIViewController *)findCurrentShowingViewController {
    UIViewController *vc = [UIApplication sharedApplication].keyWindow.rootViewController;
    UIViewController *currentShowingVC = [self findCurrentShowingViewControllerFrom:vc];
    return currentShowingVC;
}

- (UIViewController *)findCurrentShowingViewControllerFrom:(UIViewController *)vc
{
    UIViewController *currentShowingVC;
    if ([vc presentedViewController]) {
        
        UIViewController *nextRootVC = [vc presentedViewController];
        currentShowingVC = [self findCurrentShowingViewControllerFrom:nextRootVC];
        
    } else if ([vc isKindOfClass:[UITabBarController class]]) {
        UIViewController *nextRootVC = [(UITabBarController *)vc selectedViewController];
        currentShowingVC = [self findCurrentShowingViewControllerFrom:nextRootVC];
        
    } else if ([vc isKindOfClass:[UINavigationController class]]){
        UIViewController *nextRootVC = [(UINavigationController *)vc visibleViewController];
        currentShowingVC = [self findCurrentShowingViewControllerFrom:nextRootVC];
        
    } else {
        currentShowingVC = vc;
    }
    
    return currentShowingVC;
}



@end
