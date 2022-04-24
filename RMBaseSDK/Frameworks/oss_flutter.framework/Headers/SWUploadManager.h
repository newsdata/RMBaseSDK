//
//  SWUploadManager.h
//  S3TransferUtilitySampleObjC
//
//  Created by ShiChangShun on 2021/12/15.
//  Copyright © 2021 Amazon. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AWSS3/AWSS3.h>
#import "BPOssModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface SWUploadManager : NSObject

///
+(instancetype)defaultManager;

-(void)configAWSWithModel:(BPOssModel *)model;


- (AWSS3TransferUtilityUploadTask *)currentUploadTask;

- (AWSS3TransferUtilityDownloadTask *)currentDownloadTask;


- (void)cancelCurrentUploadTask;

-(void)cancelCurrentDownloadTask;

- (void)pauseCurrentUploadTask;

- (void)resumeCurrentUploadTask;


/// 上传文件
/// @param filePath 文件路径
/// @param fileName 文件名称
/// @param fileId 文件id
/// @param bucketName 桶
/// @param progressBlock 进度回调
/// @param completeBlock 完成回调
- (AWSS3TransferUtilityUploadTask *)uploadWithFilePath:(NSString *)filePath FileName:(NSString *)fileName FileId:(NSString *)fileId BucketName:(NSString *)bucketName WithProgressBlock:(void (^)(float progress))progressBlock CompleteBlock:(void (^)(AWSS3TransferUtilityUploadTask *task,NSError * _Nullable error))completeBlock;


- (void)downloadWithFileName:(NSString *)fileName BucketName:(NSString *)bucketName progressBlock:(void (^)(float progress))progressBlock success:(void (^)(NSData *data))completion failure:(void (^)(NSError *error))failure;

@end

NS_ASSUME_NONNULL_END
