[目录](./)
# Linux下FF不要标题栏的办法

把 Desktop 文件里的 Exec 改成下面这样就可以了。
```
Exec=env MOZ_GTK_TITLEBAR_DECORATION=client /opt/firefox/firefox/firefox %U
```

不过最新版（Firefox Developer Edtiion v >= 122.0b3 (64 位)）似乎不用这么些了。  
具体在哪个版本中改的，没有调查过，反正上面列举的版本已经不用了。