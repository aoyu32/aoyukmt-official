<template>
    <div class="forum-window">
        <div class="message-item">
            <ForumMessage />
        </div>
    </div>
</template>
<script setup>
import ForumMessage from './ForumMessage.vue';

</script>
<style scoped lang="scss">
.forum-window {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;


    .message-item {
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>