#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "IdleTimerDisabledObserver.h"
#import "messages.h"
#import "RMWakelockPlugin.h"

FOUNDATION_EXPORT double wakelock_rmVersionNumber;
FOUNDATION_EXPORT const unsigned char wakelock_rmVersionString[];

