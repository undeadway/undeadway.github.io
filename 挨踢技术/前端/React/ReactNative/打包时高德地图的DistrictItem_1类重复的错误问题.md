[目录](./)

# 打包时高德地图的DistrictItem$1类重复的错误问题

### 现象

#### 报错信息

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:transformClassesWithJarMergingForRelease'.
> com.android.build.api.transform.TransformException: java.util.zip.ZipException: duplicate entry: com/amap/api/fence/DistrictItem$1.class

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.

* Get more help at https://help.gradle.org

BUILD FAILED in 33s
```

#### 旧配置
```
dependencies {
    compile "com.android.support:multidex:1.0.1"
    compile project(':react-native-vector-icons')
    compile project(':react-native-fast-image')
    compile project(':react-native-code-push')
    compile project(':react-native-aliyun-push')
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"
    compile "com.facebook.react:react-native:0.55.4"
    implementation 'com.facebook.react:react-native:0.55.4'
    //3D地图so及jar
    implementation 'com.amap.api:3dmap:latest.integration'
    //定位功能
    implementation 'com.amap.api:location:latest.integration'
    //搜索功能
    // compile 'com.amap.api:search:latest.integration'
}
```

### 原因

参考网上资料：

> 高德地图9.3.0以后的包也增加了com.amap.api.fence.DistrictItem这个类，而本身定位的SDK中也存在同路径的类，所以导致在编译时报路径类重复引用异常。

所以这里修改高德地图的配置就可以了。

### 解决方案

```
dependencies {
    compile "com.android.support:multidex:1.0.1"
    compile project(':react-native-vector-icons')
    compile project(':react-native-fast-image')
    compile project(':react-native-code-push')
    compile project(':react-native-aliyun-push')
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"
    compile "com.facebook.react:react-native:0.55.4"
    implementation 'com.facebook.react:react-native:0.55.4'
    //3D地图so及jar
    implementation 'com.amap.api:3dmap:9.2.0'
    //定位功能
    implementation 'com.amap.api:location:6.1.0'
    //搜索功能
    // compile 'com.amap.api:search:latest.integration'
}
```

将高德地图的配置修改为旧版本之后，马上就打包成功了。

### 参考资料

* [https://blog.csdn.net/Ann_52547/article/details/108672252](https://blog.csdn.net/Ann_52547/article/details/108672252)