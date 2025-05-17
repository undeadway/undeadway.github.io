[目录](./)
# eltable 中因为 vif velse 造成的 template 显示不正常的问题

有如下代码
```
<template v-if="divice===true">
<el-table :data="tbls.device">
    <el-table-column prop="deviceId" label="设备ID"></el-table-column>
    <el-table-column prop="deviceName" label="设备名称"></el-table-column>
    <el-table-column fixed="right" label="操作" align="center" min-width="120" width="120">
        <template slot-scope="deviceScp">
            <el-button slot="reference" plain>删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>
<template v-else>
<el-table :data="tbls.subGrp">
    <el-table-column prop="deviceGrp" label="设备组"></el-table-column>
    <el-table-column prop="appName" label="应用名称"></el-table-column>
    <el-table-column prop="description" label="描述"></el-table-column>
    <el-table-column fixed="right" label="操作" align="center" min-width="120" width="120">
        <template slot-scope="subGrpScp">
              <el-button type="text" @click="onView(subGrpScp.row.id)" size="mini">查看</el-button>
            <el-button slot="reference" plain>删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>
```

本意是想通过 if / else 的代码块来切换两个表格的显示。

但在实际效果中，`v-else` 块中的 `template` 的内容始终无法正常显示。  
查了下资料，发现说是 **vue在渲染元素时，处于效率考虑， 会尽量地复用已有的元素而非重新渲染，导致元素间相互影响，不能正常渲染**。

参考资料：[用 key 管理可复用的元素](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)

修改之后的代码：
```
<template v-if="divice===true">
<el-table :data="tbls.device">
    <el-table-column prop="deviceId" label="设备ID"></el-table-column>
    <el-table-column prop="deviceName" label="设备名称"></el-table-column>
    <el-table-column key="deviceTpl" fixed="right" label="操作" align="center" min-width="120" width="120">
        <template slot-scope="deviceScp">
            <el-button slot="reference" plain>删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>
<template v-else>
<el-table :data="tbls.subGrp">
    <el-table-column prop="deviceGrp" label="设备组"></el-table-column>
    <el-table-column prop="appName" label="应用名称"></el-table-column>
    <el-table-column prop="description" label="描述"></el-table-column>
    <el-table-column key="subGrpTpl" fixed="right" label="操作" align="center" min-width="120" width="120">
        <template slot-scope="subGrpScp">
              <el-button type="text" @click="onView(subGrpScp.row.id)" size="mini">查看</el-button>
            <el-button slot="reference" plain>删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>
```
