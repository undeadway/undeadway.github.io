[目录](./)
# PropType

> 1. 用一句简单的话来说，就是为了类型推论，让我们在使用属性的时候获取更丰富的类型提示，比如在这里我们定义了一个属性 list，使用 vue 默认的 Array，只能确定它是一个数组类型，不能确定数组里面的每一项到底是什么样子的。你在 setup 中，看 props.list 就是一个any数组，但是如果使用PropTyp&lt;ColumnProps[]&gt; 这个时候，props.list 就变成一个 ColumnProps 的数组，你使用它的时候不论在 ts 中还是模版中都能获得类型的推断和自动补全。  
>等等。
> 2. 校验属性

```
<script lang='ts'>
import {defineComponent, PropType} from 'vue'
export interface ColumnProps{
    id: string;
    title: string;
    avatar: string;
    description: string;
}
export default defineComponent({
    name:'ColumnList',
    props:{
        list:{
            type:Array as PropType<ColumnProps[]>,
            required:true
        }
    }
})
</script>
```

参考：[https://www.jianshu.com/p/c61b7c13c6d4](https://www.jianshu.com/p/c61b7c13c6d4)

在实际项目中，看到了类似这样的代码：
```
PropType<('contextmenu' | 'click' | 'hover')[]>
PropType<(DropMenu & Recordable)[]>
```

特别是前一种，暂时有些不理解。
