<template>
  <div class='comment-list'>
    <div class='top-title'>
      <span>{{ numbers }} 条评论</span>
    </div>
    <div
      v-for='(item, i) in list'
      :key='item.id'
      class='item'>
      <div class='item-header'>
        <div class='author'>
          <div class='avatar'>
            <img
              v-if='item.user.avatar.length < 10'
              src='../assets/user.png'
              alt='默认图片'
            >
            <img
              v-else
              :src='item.user.avatar'
              alt=''
            >
          </div>
        </div>
        <div class='info'>
          <div class='name'>
            {{ item.user.name }}
            {{ item.user.type === 0 ? '（作者）' : '' }}
          </div>
          <div class='time'>
            {{ formatTime(item.createTime) }}
          </div>
        </div>
      </div>
      <div class='comment-detail'>{{ item.content }}</div>
      <div class='item-comment'>
        <div
          @click='showCommentModal(item._id, item.user)'
          class='message'>
          <el-button size='small'>回复</el-button>
        </div>
      </div>
      <div
        v-for='e in item.otherComments'
        :key='e._id'
        class='item-other'
      >
        <div class='item-header'>
          <div class='author'>
            <div class='avatar'>
              <img
                v-if='e.user.avatar.length < 10'
                src='../assets/user.png'
                alt='默认图片'
              >
              <img
                v-else
                :src='e.user.avatar'
                alt=''
              >
            </div>
          </div>
          <div class='info'>
            <div class='name'>
              {{ e.user.name }}
              {{ e.user.type === 0 ? '（作者）' : '' }}
            </div>
            <div class='time'>
              {{ formatTime(e.createTime) }}
            </div>
          </div>
        </div>
        <div class='comment-detail'>
          {{ '@' + e.toUser.name }}
          {{ e.toUser.type === 0 ? '（作者）' : '' }}：{{ e.content }}
        </div>
        <div class='item-comment'>
          <div class='message'>
            <el-button
              @click='showCommentModal(item._id, item.user, e.user)'
              size='small'
            >回复
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <Comment
      :visivle='state.visible'
      :toUser='state.toUser'
      :commentId='state.commentId'
      :articleId='articleId'
      @ok='handleOk'
      @cancel='handleCancel'
    />
  </div>
</template>

<script lang='ts'>
import { ElMessage } from 'element-plus'
import { defineComponent, defineAsyncComponent, reactive } from 'vue'
import { timestampToTime } from '../utils/utils'
import { ToUser } from '../types/index'

export default defineComponent({
  name: 'CommentList',
  components: {
    Comment: defineAsyncComponent(() => import('./Comment.vue')),
  },
  props: {
    list: {
      default: [] as any,
    },
    numbers: {
      type: Number,
      default: 0,
    },
    articleId: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const state = reactive({
      visible: false,
      commentId: '',
      toUser: {
        userId: '',
        name: '',
        avatar: '',
        type: 0,
      },
    })

    const formatTime = (value: string | Date): string => {
      return timestampToTime(value, true)
    }

    const handleCancel = (): void => {
      state.visible = false
    }

    const handleOk = (): void => {
      state.visible = false
      context.emit('refreshArticle')
    }

    const showCommentModal = (
      commitId: string,
      user: ToUser,
      secondUser?: ToUser,
    ): boolean | void => {
      if (!window.sessionStorage.userInfo) {
        ElMessage({
          message: '登陆才能点赞，请先登陆',
          type: 'warning',
        })
        return false
      }

      if (secondUser) {
        state.visible = true
        state.commentId = commitId
        state.toUser = user
      } else {
        state.visible = true
        state.commentId = commitId
        state.toUser = user
      }
    }

    return {
      state,
      showCommentModal,
      handleCancel,
      handleOk,
      formatTime,
    }
  },
})
</script>

<style lang='less' scoped>
.comment-list {
  text-align: center;
}

.comment-list {
  position: relative;
  text-align: left;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  .avatar {
    position: absolute;
    left: 0px;
  }

  .el-icon-circle-plus {
    font-size: 40px;
  }
}

.clearfix {
  clear: both;
}

.comment-list {
  margin-top: 30px;

  .top-title {
    padding-bottom: 20px;
    font-size: 17px;
    font-weight: 700;
    border-bottom: 1px solid #f0f0f0;
  }

  .item {
    padding: 20px 0 30px;
    border-bottom: 1px solid #f0f0f0;

    .item-header {
      position: relative;
      padding-left: 45px;
      padding-bottom: 10px;

      .author {
        position: absolute;
        left: 0;
        display: inline-block;

        .avatar {
          display: inline-block;
          margin-right: 5px;
          width: 40px;
          height: 40px;
          vertical-align: middle;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }

      .info {
        display: inline-block;

        .name {
          font-size: 15px;
          color: #333;
        }

        .time {
          font-size: 12px;
          color: #969696;
        }
      }
    }

    .comment-detail {
      min-height: 40px;
    }

    .item-comment {
      .like {
        margin-right: 20px;
      }
    }
  }
}

.item-other {
  margin: 20px;
  padding: 10px;
  border-left: 2px solid #f0f0f0;

  .item-header {
    position: relative;
    padding-left: 45px;
    padding-bottom: 10px;

    .author {
      position: absolute;
      left: 0;
      display: inline-block;

      .avatar {
        display: inline-block;
        margin-right: 5px;
        width: 38px;
        height: 38px;
        vertical-align: middle;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }

    .info {
      display: inline-block;

      .name {
        font-size: 15px;
        color: #333;
      }

      .time {
        font-size: 12px;
        color: #969696;
      }
    }
  }

  .comment-detail {
    min-height: 40px;
    border-bottom: 1px dashed #f0f0f0;
  }

  .message {
    padding: 10px;
  }
}
</style>