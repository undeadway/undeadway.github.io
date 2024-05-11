[目录](./)

# 程序包com.facebook.react不存在不存在错误

### 现象

react native 的项目编译打包安卓，在 andriod 文件夹下执行 `./gradlew assembleRelease` 命令后，出现类似下面这样的错误

```
> Task :react-native-aliyun-push:compileReleaseJavaWithJavac
/home/waygc/workspace/work/my-project/node_modules/react-native-aliyun-push/android/src/main/java/org/wonday/aliyun/push/AliyunPushMessageReceiver.java:18: 错误: 程序包javax.annotation不存在
import javax.annotation.Nullable;

  符号:   变量 Arguments
  位置: 类 AliyunPushMessageReceiver
/home/waygc/workspace/work/my-project/node_modules/react-native-aliyun-push/android/src/main/java/org/wonday/aliyun/push/AliyunPushMessageReceiver.java:70: 错误: 找不到符号
        FLog.d(ReactConstants.TAG, "onNotification.");
               ^
```

### 解决方案

只知道解决方案，原理未知。

修改 android 文件夹下的 `build.gradle` 文件。

修改前：
```
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
        google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        maven {
            url "http://maven.aliyun.com/nexus/content/repositories/releases/"
        }
        flatDir {
            dirs project(':react-native-aliyun-push').file('libs')
        }
    }
}
```

修改后：
```
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
        google()
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
        maven{ url 'http://maven.aliyun.com/nexus/content/repositories/jcenter'}
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

def REACT_NATIVE_VERSION = new File(['node', '--print',"JSON.parse(require('fs').readFileSync(require.resolve('react-native/package.json'), 'utf-8')).version"].execute(null, rootDir).text.trim())

allprojects {
    configurations.all {
        resolutionStrategy {
            // Remove this override in 0.65+, as a proper fix is included in react-native itself.
            force "com.facebook.react:react-native:" + REACT_NATIVE_VERSION
        }
    }
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        maven {
            url "http://maven.aliyun.com/nexus/content/repositories/releases/"
        }
        flatDir {
            dirs project(':react-native-aliyun-push').file('libs')
        }
    }
}

```