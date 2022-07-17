<template>
  <el-dialog
    title='评论'
    width='60%'
    v-model='state.dialogDodel'
    @close='cancel'
    >
    <el-form>
      <el-form-item>
        <el-input
          type='textarea'
          v-model='state.content'
          placeholder='友善讨论'
          autocomplete='off'></el-input>
      </el-form-item>
    </el-form>

    <div
      slot='footer'
      class='dialog-footer'
    >
    <el-button
      type='default'
      @click='cancel'
      >取 消</el-button>
      <el-button
        type='default'
        @click='handleOk'
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, watch } from 'vue'
import service from '../utils/https'
import urls from '../utils/urls'

export default defineComponent({
  name: 'Comment',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    commentId: {
      type: String,
      default: '',
    },
    articleId: {
      type: String,
      default: '',
    },
    toUser: {
      // type: any
      default: {},
    },
  },
  emits: ['ok', 'cancel'],
  setup(props, context) {
    const state = reactive({
      dialogDodel: props.visible,
      btnLoading: false,
      content: '',
      cacheTime: 0,   // 缓存时间
      times: 0,       // 留言次数
    })

    const cancel = (): boolean => {
      context.emit('cancel', false)
      return false
    }

    const handleOk = async (): Promise<void> => {
      if (!props.articleId) {
        ElMessage({
          message: '该文章不存在:)',
          type: 'error',
        })
        return
      }

      if (state.times > 2) {
        ElMessage({
          message: '今天的评论次数已经用完了，明天再来评论吧！',
          type: 'warning',
        })
        return
      }

      let now = new Date()
      let noeTime = now.getTime()
      if (noeTime - state.cacheTime < 4000) {
        ElMessage({
          message: '评论的太过频繁，1 分钟后再来评论吧:-(',
          type: 'warning',
        })
        return
      }

      if (!state.content) {
        ElMessage({
          message: '评论内容不能为空',
          type: 'error',
        })
        return
      }

      let userId = ''
      if (window.sessionStorage.userInfo) {
        let userInfo = JSON.parse(window.sessionStorage.userInfo)
        userId = userInfo.id
      } else {
        ElMessage({
          message: '请登陆后评论',
          type: 'warning',
        })
        return
      }

      state.btnLoading = true
      await service.post(urls.addThirdComment, {
        article_id: props.articleId,
        userId,
        comment_id: props.commentId,
        to_user: JSON.stringify(props.toUser),
        content: state.content,
      })
      state.btnLoading = false
      state.times++

      state.cacheTime = noeTime
      state.content = ''
      context.emit('ok', false)
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    }

    watch(props, (val, oldValue) => {
      state.dialogDodel = val.visible
    })

    return {
      state,
      cancel,
      handleOk
    }
  },
})

</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>