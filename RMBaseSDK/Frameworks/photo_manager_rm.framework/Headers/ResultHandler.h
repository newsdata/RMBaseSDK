//
// Created by Caijinglong on 2019-09-06.
//

#import <Foundation/Foundation.h>
#import <FlutterSDK/FlutterSDK.h>

@interface ResultHandler : NSObject

@property(nonatomic, strong) FlutterResult result;

+ (instancetype)handlerWithResult:(FlutterResult)result;

- (instancetype)initWithResult:(FlutterResult)result;

- (void)replyError:(NSString *)errorCode;

- (void)reply:(id)obj;

- (BOOL)isReplied;

@end
