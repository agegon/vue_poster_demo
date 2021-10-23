<template>
  <el-row class="my-2">
    <el-col :xs="24" :lg="{ offset: 6, span: 14 }">
      <el-card v-for="{ author, ...comment } in comments" class="mb-2" :key="comment.id">
        <template #header class="header">
          <el-row>
            <div class="user-container">
              <app-user
                :image="author.image"
                :username="author.username"
                :date="comment.createdAt"
              ></app-user>
            </div>
            <el-button
              v-if="currentUser && author.username === currentUser.username"
              class="ml-1"
              type="danger"
              icon="el-icon-delete"
              size="small"
              plain
              @click="() => handleDeleteClick(comment.id)"
            ></el-button>
          </el-row>
        </template>
        <p class="comment">{{ comment.body }}</p>
      </el-card>

      <el-card v-if="currentUser" class="mb-2">
        <template #header>
          <app-user :image="currentUser.image" :username="currentUser.username"></app-user>
        </template>
        <form @submit.prevent="handleCreateComment">
          <div class="form-control mb-2">
            <el-input
              id="comment-body"
              name="body"
              placeholder="Describe your comment"
              type="textarea"
              v-model="commentBody"
              :rows="3"
              :disabled="isCreating"
            ></el-input>
          </div>
          <el-row justify="end">
            <el-button type="primary" native-type="submit" :loading="isCreating" size="small">
              Share
            </el-button>
          </el-row>
        </form>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog v-model="isDeleteConfirm" width="320px" @close="handleConfirmClose">
    <span class="confirm-message">Your comment will be removed. Are you sure?</span>
    <template #footer>
      <el-button @click="handleConfirmClose" size="mini">Cancel</el-button>
      <el-button type="danger" @click="handleCommentDelete" size="mini">Confirm</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ElButton, ElCard, ElCol, ElDialog, ElInput, ElRow } from 'element-plus';
import AppUser from '@/components/AppUser';
import {
  clearCommentsState,
  COMMENTS_GETTERS,
  createComment,
  deleteComment,
  getComments,
} from '@/store/modules/comments';
import { AUTH_GETTERS } from '@/store/modules/auth';

export default {
  name: 'TheComments',
  setup() {
    const commentBody = ref('');
    const isDeleteConfirm = ref(false);
    const deletingId = ref(null);

    const store = useStore();
    const route = useRoute();

    const isAuth = computed(() => store.getters[AUTH_GETTERS.IS_AUTHENTICATED]);
    const currentUser = computed(() => store.getters[AUTH_GETTERS.CURRENT_USER]);
    const isCreating = computed(() => store.getters[COMMENTS_GETTERS.IS_CREATING]);
    const comments = computed(() => store.getters[COMMENTS_GETTERS.DATA]);

    const fetchComments = (id) => {
      store.dispatch(getComments(id));
    };

    const handleCreateComment = async () => {
      const result = await store.dispatch(
        createComment({
          slug: route.params.id,
          comment: { body: commentBody.value },
        }),
      );

      if (result) {
        commentBody.value = '';
      }
    };

    const handleDeleteClick = (id) => {
      deletingId.value = id;
      isDeleteConfirm.value = true;
    };

    const handleConfirmClose = () => {
      deletingId.value = null;
      isDeleteConfirm.value = false;
    };

    const handleCommentDelete = () => {
      const commentId = deletingId.value;
      handleConfirmClose();

      store.dispatch(
        deleteComment({
          id: commentId,
          slug: route.params.id,
        }),
      );
    };

    onMounted(() => {
      fetchComments(route.params.id);
    });

    onBeforeRouteUpdate((to, from, next) => {
      if (from.params.id !== to.params.id) {
        fetchComments(to.params.id);
      }
      next();
    });

    onBeforeUnmount(() => {
      store.commit(clearCommentsState());
    });

    return {
      comments,
      commentBody,
      currentUser,
      handleCreateComment,
      handleDeleteClick,
      handleConfirmClose,
      handleCommentDelete,
      isAuth,
      isCreating,
      isDeleteConfirm,
    };
  },
  components: {
    AppUser,
    ElButton,
    ElCard,
    ElCol,
    ElDialog,
    ElInput,
    ElRow,
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  flex-grow: 1;
}

.comment {
  min-height: 40px;
}

.confirm-message {
  word-break: normal;
}
</style>
