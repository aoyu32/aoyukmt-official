<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { marked } from 'marked';
import { useDocumentStore } from '@/stores/document';

const store = useDocumentStore()

const props = defineProps({
  markdownData: {
    type: String, // 只接受 Markdown 内容
    default: ''
  },
  filePath: {
    type: String, // 只接受文件路径
    default: ''
  }
});

const htmlContent = ref('');

// 渲染 Markdown 文件内容
const renderMarkdown = (filePath) => {
  console.log(filePath);
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error loading document: ${response.statusText}`);
      }
      return response.text();
    })
    .then(markdown => {
      htmlContent.value = marked(markdown); // 使用 marked 解析 Markdown
    })
    .catch(error => {
      htmlContent.value = `<p>无法加载文档内容：${error.message}</p>`;
    });
};

// 监听 activeFilePath 的变化
watch(
  () => store.activeFilePath,
  (newFilePath) => {
    renderMarkdown(newFilePath);
  },
  { immediate: true }
);

// // 在组件挂载时根据传入的属性加载 Markdown
// onMounted(() => {
//   if (props.filePath) {
//     // 如果传入了文件路径，加载文件
//     renderMarkdown(props.filePath);
//   } else if (props.markdownData) {
//     // 否则直接解析传递的 Markdown 内容
//     htmlContent.value = marked(props.markdownData);
//   }
// });

onMounted(() => {
  renderMarkdown(store.activeFilePath)
})

</script>
<style lang="scss">
@use "@/assets/styles/document/markdown.scss";
</style>