[目录](./)

# 多张表关联更新以及 rownum 的处理

```
update
	m_device md , m_business mb,
	(SELECT @rownum:=@rownum+1 AS rownum, tt.* FROM (SELECT @rownum:=0) r, m_device tt) tmp
set md.device_name =  concat(mb.version, '-PB-', tmp.rownum)
where md.project_type = 3
and mb.id = md.business_id
and md.id = tmp.id
```
