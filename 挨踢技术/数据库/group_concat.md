[目录](./)

# group_concat

> GROUP_CONCAT() 是一个非常实用的聚合函数，主要用于将属于一组的相关行的数据项进行合并并以字符串的形式返回。

## 实例

假设我们有一个 `orders` 表，包含 `order_id` 和 `product` 字段，每个订单可能包含多个产品。

```
+---------+-----------+
| order_id|   product |
+---------+-----------+
|    1    |   apple   |
|    1    |   banana  |
|    2    |   orange  |
|    2    |   apple   |
+---------+-----------+
```

如果要把 `product` 里的输出为一个字段，就可以用 `group_concat`

```
SELECT order_id, GROUP_CONCAT(product SEPARATOR ', ') AS products
FROM orders
GROUP BY order_id;
```

输出结果为：
```
+---------+-----------------+
| order_id|     products    |
+---------+-----------------+
|    1    | apple, banana   |
|    2    | orange, apple   |
+---------+-----------------+
```

## 参考

* [https://blog.csdn.net/wenxuankeji/article/details/136046922](https://blog.csdn.net/wenxuankeji/article/details/136046922)