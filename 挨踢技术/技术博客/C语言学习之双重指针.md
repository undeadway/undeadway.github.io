[目录](./)
# [C语言学习]之双重指针

有如下代码：
```
#include <stdio.h>
#include <stdlib.h>

int func(int **);

int main(void) {

    int **iptr;
    int result = func(iptr);

    printf("result : %d\n", result);
    printf("iptr : %d\n", **iptr);

    return result;
}

int func(int **iptr) {

    int *mallocp = (int*)malloc(sizeof(int));
    *mallocp =100;
    *iptr = mallocp; /* 运行到这里会出错 */

    return 0;
}
```

代码运行到 *iptr = mallocp; 的地方出错，但却不理解为什么这里会出错。  
只能乱修改代码，但把 main 函数修改成下面的代码之后，整个程序就通了。

```
int main(void) {

    int *iptr; /* 修改了变量的初始化类型 */
    int result = func(&iptr); /* 对应在传参的时候，也修改了数据类型 */

    printf("result : %d\n", result);
    printf("iptr : %d\n", *iptr); /* 打印的时候也修改了数据类型 */

    return result;
}
```

在百思不得其解之后，只能询问，得到如下解：

> 
> ```
> int func(int **iptr)
> ```
> 
> 这里传入的一个参数，iptr是一个对象，这类类型的对象，是其存储空间里存放一个地址，这个地址是指向另一个对象a，对象a的存储空间里，是存放一个地址，这个地址，是指向另一对象b。而对象b的存储空间里放的数据是 int型。
> 
> ok，简单说， iptr[0] = addr(a), a[0] = addr(b)  b[0] = int。
> 
> 不知道是否看懂了没有。
> 
> int b 实际表示，一个数据存储空间，名称叫做b，里面存储的数据会被看作int。别傻呼呼的认为b就是整型。
> 
> int result = func(iptr);
> 
> 这里做的事情是，从堆栈或者寄存器中，取出一个空间，假设为tmpiptr ,那么tmpiptr这个小盒子里放了iptr(main里的）这个小盒子了的数据。简单说 tmpiptr = iptr。
> 
> 那么在
> ```
*iptr = mallocp;
> ```
> 这里，实际什么意思呢？ 就是从tmpiptr的小盒子里取出数据，这个数据等同于main 里iptr小盒子里的数据。就是指向a的地址。
> 
> 然后呢，把mallocp 这个里面存储的值，存储到a 这个小盒子里。
> 
> 问题来了，你main函数里，
> 
> int** iptr,你没有对这个小盒子里存放任何真正存在的小盒子地址，也就是你上面的a不知道在什么鬼地方，你还能指望“把mallocp 这个里面存储的值，存储到a 这个小盒子里。”？？？？
> 
> 那么为什么你第二种写法可以呢？（这也是常用写法），
> ```
> int result = func(&iptr);
> ```
> 这里在 func 进入时，
> 
> 会有一个 tmpiptr的小盒子。里面存放了你外部给入的数据，这个数据是iptr的这个小盒子的地址。
> 
> 这样，在
> ```
> *tmpiptr = mallocp;
> ```
> 的操作时，会从 tmpiptr 的小盒子，取出一个地址，这个地址就是你外部，iptr小盒子的地址，然后把mallocp这个小盒子里的内容，放到iptr这个小盒子里。
> 
> 就这么简单。无非初学者不了解，所有的变量都是个小盒子。而不是个值。。。除了简单如的 i+=1 ，这里的1，会直接作为机器指令的一个组成部分。其他所有你能看到的常量、变量，都会有存储空间。都会存在于某个小盒子里。无论是在寄存器里，还是堆栈里，还是内存里。



然后豁然开朗，自己总结如下：
** 其实 \*\*iptr 只定义了指向 \*iptr 的指针，但 \*iptr 本身是非法的所以会赋值错误**

最后想说的就是，当在搞明白双重指针时候什么之后，顿时也想明白了 sql server 里的 @OUTPUT 是个什么玩意儿了。

最后想说的就是，双重指针太方便，最简单的用法就比如 上面提到的 @OUTPUT，以后参数的传出就不用再依靠返回值，而完全可以参数化，多个值的同时传出就不再是问题，虽然这是不是符合现代的程序设计理念有待商榷。