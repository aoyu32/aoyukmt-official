<template>
    <div class="forum-window" ref="forumWindowRef">
        <div class="message-item" v-for="(item, index) in forumStore.messages" :key="index">
            <ForumMessage :message="item" />
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import ForumMessage from './ForumMessage.vue';
import { useForumStore } from '@/stores/forum';
import { scrollTo } from '@/utils/scroll';
const forumStore = useForumStore()
const forumWindowRef = ref(null)

watch(() => forumStore.messages, (value) => {
    scrollTo('bottom', 150,forumWindowRef.value)
    console.log(value);

}, { deep: true })

</script>
<style scoped lang="scss">
.forum-window {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    .message-item {
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>