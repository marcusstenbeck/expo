/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ABI27_0_0ARTNodeManager.h"

#import "ABI27_0_0ARTNode.h"

@implementation ABI27_0_0ARTNodeManager

ABI27_0_0RCT_EXPORT_MODULE()

- (ABI27_0_0ARTNode *)node
{
  return [ABI27_0_0ARTNode new];
}

- (UIView *)view
{
  return [self node];
}

- (ABI27_0_0RCTShadowView *)shadowView
{
  return nil;
}

ABI27_0_0RCT_EXPORT_VIEW_PROPERTY(opacity, CGFloat)
ABI27_0_0RCT_EXPORT_VIEW_PROPERTY(transform, CGAffineTransform)

@end
