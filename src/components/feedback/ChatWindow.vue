<template>
    <div class="chat-window" id="chat-window" >
        <div class="chat-tip"></div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.chat-window {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100% - 100px);
}
</style>
