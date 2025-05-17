[目录](./)
# could not load PC BIOS 'bios-256k.bin'

在 windows 下通过 `Git Bash` 执行以下代码的时候
```
qemu-system-i386 -m 16 -k en-us -rtc base=localtime -soundhw sb16,adlib -device cirrus-vga -hda dos.img -drive file=fat:rw:dosfiles/ -boot order=c
```

，出现以下错误：
```
waygc@DESKTOP-7GIRED1 MINGW64 /f/Games/han/dosvm
$ ./start.sh
WARNING: Image format was not specified for 'dos.img' and probing guessed raw.
         Automatically detecting the format is dangerous for raw images, write operations on block 0
 will be restricted.
         Specify the 'raw' format explicitly to remove the restrictions.
WARNING: Image format was not specified for 'json:{"fat-type": 0, "backing": {"driver": "vvfat_write
_target"}, "dir": "dosfiles/", "driver": "vvfat", "floppy": false, "rw": true, "write-target": {"dri
ver": "qcow", "file": {"driver": "file", "filename": "C:\\Users\\waygc\\AppData\\Local\\Temp\\qem5C1
C...' and probing guessed raw.
         Automatically detecting the format is dangerous for raw images, write operations on block 0
 will be restricted.
         Specify the 'raw' format explicitly to remove the restrictions.
qemu: could not load PC BIOS 'bios-256k.bin'
```

但上面的 shell 在 Deepin 下执行的时候，没有问题。  
而且在我 qemu 的安装目录下，也有 `bios-256k.bin` 这个文件。

上 SOF 查询后，发现要加 `-L` 来指定 qemu 的安装路径（或者 `bios-256k.bin` 的所在路径）。  
参考：[https://unix.stackexchange.com/questions/134893/cannot-start-kvm-vm-because-missing-bios](https://unix.stackexchange.com/questions/134893/cannot-start-kvm-vm-because-missing-bios)  
代码改动如下：
```
qemu-system-i386 -m 16 -k en-us -rtc base=localtime -soundhw sb16,adlib -device cirrus-vga -hda dos.img -drive file=fat:rw:dosfiles/ -boot order=c -L /D/qemu/
```

qemu 启动成功。