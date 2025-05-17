[目录](./)
# [PHP]从求下个星期一是几号引发的一系列有趣的实验

许多年前的一篇帖子了。

上个月，公司接到一单业务，其中有这样的需求：

> 需要按周对批量数据进行统计，开始的和结束的时期由用户自己输入，比如输入2011-07-30开始，2011-12-31结束。
但问题在于开始的日子并不一定是一周的开始（周一），所以统计的第一周是不完整的一个星期，所以需要求开始日的下一个星期一，然后开始完整周的统计，直到最后一周结束。

拿到这个需求后，有些无从下手，于是上论坛问之。

> 需要按周对批量数据进行统计，开始的和结束的时期由用户自己输入，比如输入2011-07-30开始，2011-12-31结束。
但问题在于开始的日子并不一定是一周的开始（周一），所以统计的第一周是不完整的一个星期，所以需要求开始日的下一个星期一，然后开始完整周的统计，直到最后一周结束。
> 
> 比如这样：next_monday('2011-07-30');  
> 返回2011-08-01
> 
> next_monday('2011-08-01');  
> 返回2011-08-08
> 
> next_monday('2011-11-15');  
> 返回2011-11-20
> 
> 参数和返回值的形式可以是比如字符串、数组、UNIX时间戳、时间对象，等任意合法形式，  
> 只要我能最终取得到（直接或间接都无所谓）“2011-08-01”这个日期就可以了
> 
> 初学PHP，看了PHP的手册，似乎里面没有提及类似的功能，不知道是否有类似的代码可以使用。  
> 还望不吝赐教。

不久便有高人给了我这个答案：  
PHP 代码
```
echo date('Y-m-d' , strtotime('next monday' , strtotime('2011-08-01'))); 
```

结果确实非常好的给出了我想要的“2011-08-08”，  
但我没满足与此，于是继续做了这么下面这一系列无聊的尝试：  
PHP 代码
```
date('Y-m-d' , strtotime('neXt<tab>sunday' , strtotime('2011-07-02'))) // 输出: 2011-07-03
date('Y-m-d' , strtotime(' NEXT MONDAY ' , strtotime('2011-08-01'))) // 输出: 2011-08-08
date('Y-m-d' , strtotime('next_tuesday' , strtotime('2011-10-10'))) // 输出: 1970-01-01
date('Y-m-d' , strtotime('next WedNesdaY' , strtotime('2011-11-01'))) // 输出: 2011-11-02
date('Y-m-d' , strtotime('next-thursday' , strtotime('2011-12-01'))) // 输出: 1970-01-01
date('Y-m-d' , strtotime('NextFriday' , strtotime('2011-08-01'))) // 输出: 1970-01-01
date('Y-m-d' , strtotime('NEXT/SATURDAY' , strtotime('2011-07-02'))) // 输出: 1970-01-01 
```

然后在PHP手册上查阅sttotime函数的时候，发现下面这些例子：  
PHP 代码
```
echo strtotime("10 September 2000"), "\n";
echo strtotime("+1 day"), "\n";
echo strtotime("+1 week"), "\n";
echo strtotime("+1 week 2 days 4 hours 2 seconds"), "\n";  
```

感慨到：PHP是一种“神奇”的语言，真的很“神奇”……

到了这里，因为 strtotime 函数表现出太多神奇的功能，不得不让我对它的效率有所怀疑，于是进行测试。
执行一次 date('Y-m-d' , strtotime('next monday' , strtotime('2011-7-25'))); 的结果（两次microtime ('now')）之差为： 0.00060701370239258

代码如下：  
PHP 代码
```
$start_1 = microtime ('now');
$in_day = 25;
$in_month = 7;
$in_year = 2011;
date('Y-m-d' , strtotime('next monday' , strtotime($in_year.'-'.$in_month.'-'.$in_day)));
$end_1 = microtime ('now');
echo ($end_1 - $start_1);  
```

而因为时间关系，没来得及等高人给我结果，我就自己先写了一个方法凑合，代码如下：  
PHP 代码
```
$start_2 = microtime ('now');
$in_day = 25;
$in_month = 7;
$in_year = 2011;
$week = date('w', mktime(0, 0, 0, $in_month, $in_day, $in_year));
if (!checkdate($in_month, ($in_day + 8 - $week), $in_year)) {
    $out_day = next_monday($in_year, $in_month, $in_day, $week, 1);
    if (!checkdate($in_month+1, $out_day, $in_year)) {
        $out_month = 1;
        $out_year = $in_year + 1;
    } else {
        $out_month = $in_month + 1;
        $out_year = $in_year;
    }
} else {
    $out_day = $in_day + 7 - $week;
    $out_month = $in_month;
    $out_year = $in_year;
}

$out_date = $out_year.'-'.$out_month.'-'.$out_day;
$end_2 = microtime ('now');
echo ($end_2 - $start_2);

function next_monday($n_year, $n_month, $n_day, $week, $next) {
    if (checkdate($n_month, ($n_day + $next), $n_year)) {
        return next_monday($n_year, $n_month, $n_day, $week, ++$next);
    } else {
        return (9 - ($week + $next));
    }
}
```

跑了一下的结果则是：0.00038003921508789

这结果一出来，不得不再次让我发出“PHP是一种‘神奇’的语言，真的很‘神奇’”的感慨  
而自己写的那个函数，原来认为效率相当差，但表现结果竟然还不错……


本来做到这里就算告一个段落了，但我看了上面写的代码，又查阅了一下PHP手册，不禁想到一些有趣的东西，于是有了下面的代码和测试：  
PHP 代码
```
$start_3 = microtime ('now');
$in_day = 25;
$in_month = 7;
$in_year = 2011;
$week = date('w', mktime(0, 0, 0, $in_month, $in_day, $in_year));
$out_date = date('Y-m-d' , mktime(0, 0, 0, $in_month, $in_day, $in_year) + (8 - $week) * 24 * 60 * 60);
$end_3 = microtime ('now');
echo ($end_3 - $start_3);
```

而代码的执行结果是： 0.00069308280944824  
原本以为这样会是最快的方式，但PHP却和我开了个天大的玩笑，此时此刻，我唯囧以对……  
囧了半天之后，发现代码其实并不是最合理的，于是优化改进之：  

PHP 代码
```
$start_4 = microtime ('now');
$in_day = 25;
$in_month = 7;
$in_year = 2011;
$target_time = mktime(0, 0, 0, $in_month, $in_day, $in_year);
$week = date('w', $target_time);
$out_date = date('Y-m-d' , $target_time + (8 - $week) * 24 * 60 * 60);
$end_4 = microtime ('now');
echo ($end_4 - $start_4);
```

执行的结果是： 0.00049519538879395  
而修改后的结果，虽然明显比第三种方式要优化了很多，但还是没达到我预想的那种程度，这应该是最快的方式了啊，为啥捏……  
如果说是因为date()函数导致的效率低下，那难道checkdate()效率相当高？不解……  
或者原因在date()函数有字符串参数，要去解析字符串而导致了效率降低？不解……  
一大堆不解，不过这已经是本次测试的范围之外的话题了，以后再有机会吧……

结论：PHP是一种“神奇”的语言，真的很“神奇”……