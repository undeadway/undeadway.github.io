[目录](./)
# pdf

```
<template>
  <div v-loading="inLoading" element-loading-text="正在加载数据...">
    <h3>{{fileName}}</h3>
    <div class="pdf">
      <!-- // 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了 -->
      <pdf :src="pdfUrl" :page="currentPage" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" @loaded="loadPdfHandler">
      </pdf>
      <p class="arrow">
        <!-- // 上一页 -->
        <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
          {{currentPage}} / {{pageCount}}
        <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>
      </p>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import syaAdminFileApi from '@/core/apis/sys-admin/file'

export default {
  props: {
    fileId: {
      type: String,
      default: ''
    }
  },
  components: { pdf },
  data () {
    return {
      inLoading: false,
      pdfUrl: '',
      currentPage: 0, // pdf文件页码
      pageCount: 0 // pdf文件总页数
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        this.inLoading = true
        const response = await syaAdminFileApi.download({ fileId: this.fileId })
        console.log(response)
        this.fileName = response.body[0].fileName
        this.pdfUrl = 'data:application/pdf;base64,' + response.body[0].fileValue
      } catch (e) {
        console.log(e)
      } finally {
        this.inLoading = false
      }
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage (val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    // 关闭前确认
    onClosed () {
      return true
    },
    loadPdfHandler () {
      this.currentPage = 1
    }
  }
}
</script>

<style>
.arrow {
  text-align: right;
}
</style>

```