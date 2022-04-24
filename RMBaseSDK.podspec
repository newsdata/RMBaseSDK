#
# Be sure to run `pod lib lint RMBaseSDK.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'RMBaseSDK'
  s.version          = '0.1.0'
  s.summary          = 'A short description of RMBaseSDK.'

  s.description      = <<-DESC
TODO: Add long description of the pod here.
                       DESC

  s.homepage         = 'https://github.com/newsdata/RMBaseSDK'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'shicahgnshun-xhzy' => 'shichangshun@xhzy' }
  s.source           = { :git => 'https://github.com/newsdata/RMBaseSDK.git', :tag => s.version.to_s }
  # s.social_media_url = 'https://twitter.com/<TWITTER_USERNAME>'

  s.ios.deployment_target = '9.0'

  s.source_files = 'RMBaseSDK/Classes/**/*'
  
  # s.vendored_libraries = 'RMBaseSDK/Frameworks/*.framework/*.a'
  s.resource = 'RMBaseSDK/Frameworks/*.framework/*.bundle'
  
  s.vendored_frameworks = 'RMBaseSDK/Frameworks/App.framework','RMBaseSDK/Frameworks/*.framework'
  
   s.dependency 'Masonry', '>= 1.1.0'
   s.dependency 'MJExtension', '>= 3.4.1'
   s.dependency 'YYModel', '>= 1.0.4'
   s.dependency 'AliyunOSSiOS', '>= 2.10.7'
   s.dependency 'AFNetworking', '>= 4.0'
   s.dependency 'Reachability', '>= 3.2'
   s.dependency 'Realm', '>= 4.3.0'
   s.dependency 'FMDB', '>= 2.7.5'
   s.dependency 'libwebp', '>= 1.2.1'
   s.dependency 'YYCategories', '>= 1.0.4'
   s.dependency 'Mantle', '>= 2.2.0'
   
   s.dependency 'SAMKeychain','>=1.5.3'
   s.dependency 'MJRefresh','>=3.7.5'
   s.dependency 'KGHitTestingViews', '>=0.9.5'
   s.dependency 'SVProgressHUD', '>=2.2.5'
   s.dependency 'JXCategoryView', '~>1.3.20'
   s.dependency 'SDWebImage'
   s.dependency 'AliRTCSdk','2.4.1'
  
  # s.resource_bundles = {
  #   'RMBaseSDK' => ['RMBaseSDK/Assets/*.png']
  # }
  # s.resource = 'RMBaseSDK/Assets/*.bundle'

  # s.public_header_files = 'Pod/Classes/**/*.h'
  # s.frameworks = 'UIKit', 'MapKit'

end
