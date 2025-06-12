[目录](./)

# fakepath的一些记录

想要上传一个 excel文件给服务器，于是有了以下代码：
```
<input type="file" id="file" />
<button onclick="getFile()">按钮</button>
<script type="text/javascript">

    function getFile() {

        var file = document.getElementById('file');
        var filename = file.value;
        // 后续处理
        };
    }
</script>
```
本来以为获得到的 filename 就是个文件路径，只要把这个路径交给后续的各种文件上传框架就可以了。  
但问题马上就来了，可是浏览器（Chrome，下同）却给了一个 fakepath 。

![](./chrome_patkpath.webp)

这fakepath又是什么鬼？

![](./trump.webp)

于是，为了解决这个 fakepath 问题，在网上一番搜索之后，得到了一个解决方案，就是使用 H5 新增的FileReader对象来处理，于是代码就变成了：
```
<input type="file" id="file" />
<button onclick="getFile()">按钮</button>
<script type="text/javascript">

    function getFile() {

        var file = document.getElementById('file');
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file.files[0]);
        oFReader.onloadend = function (oFRevent) {
            var src = oFRevent.target.result;
        };
    }
</script>
```
可是，当我以为一切都美好的时候，浏览器却给了我这么个东西：

![](./base64.webp)

？？？？   
这一大坨是什么鬼？

仔细看过之后才发现，这是一大坨base64编码的字符串。   
换句话说，通过FileReader 获取到的，并不是文件的真实路径，而是这个文件的所有数据内容。

而到了这里，也就理解了浏览器的逻辑：因为安全考虑，我不可能让用户随意操作本地文件（特别是js脚本）。但我可以把本地文件建立一个副本，把这个副本引入浏览器的沙箱之中，任JS玩耍。

想通了这一层之后，所要作的事情也就变得简单了。既然都已经是base64了，那也不同考虑什么文件上传什么了，直接ajax，然后到后台去解析这坨字符串。   
于是，问题就变成了：怎么让nodejs去处理 base64 字符串。

因为我要做的是文件上传，并处理上传之后的文件，所以一个最简单的思路就是：先让Nodejs把这串base64字符串转换成二进制流，然后再让程序去处理这个二进制流，就可以实现相关功能了。  
可是，这一步并不好走。

在浏览器中，处理base64字符串可以通过 btoa/atob来解决，但nodejs中没有这两个函数。  
虽然理论上应该是可以通过某些方式来解决这个问题的，可在我尝试的方法中，并没有很好的解决。  
所以在短暂的纠结之后，决定先暂时放弃这个方案。

替代方案也很简单：看能不能让程序直接处理base64字符串。  
这次我要处理的是excel文件，所以在查找和实验之后，选中了js-xlsx这个包。  
测试以后，代码可用。
```
let workbook = XLSX.read(base64Str, { type: 'base64' });
let firstSheetName = workbook.SheetNames[0];
let firstSheet = workbook.Sheets[firstSheetName];

for (let index = 1; ; index++) {
    // 处理文件
}
```
当然，这里需要注意的是，前端通过FileReader得到的字符串包含了base64的头`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64`，但在处理文件的时候，却不用这个头，所以得先把这部分给去掉。  
这里也就不展开了。  
这里有个表，是各种文件转换base64之后的头，供参考
<pre>
    文档
    1.txt     data:text/plain;base64,
    2.doc     data:application/msword;base64,
    3.docx    data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,
    4.xls     data:application/vnd.ms-excel;base64,
    5.xlsx    data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,
    6.pdf     data:application/pdf;base64,
    7.pptx    data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,
    8.ppt     data:application/vnd.ms-powerpoint;base64,

    图片
    1.png     data:image/png;base64,
    2.jpg     data:image/jpeg;base64,
    3.gif     data:image/gif;base64,
    4.svg     data:image/svg+xml;base64,
    5.ico     data:image/x-icon;base64,
    6.bmp     data:image/bmp;base64,
</pre>
处理到这里，整个excel文件已经被读入了程序，那剩下的就没多少事情了。