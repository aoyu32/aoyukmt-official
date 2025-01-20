<template>
  <div ref="markdownDiv" class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, onMounted, watch,nextTick } from 'vue';
import { marked } from 'marked';
import { useDocumentStore } from '@/stores/document';

const markdownDiv = ref(null)
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
const renderMarkdown = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Error loading document: ${response.statusText}`);
    }

    const markdown = await response.text();
    htmlContent.value = marked(markdown);

    await nextTick();
    extractHeadings();

  } catch (error) {
    console.error('Error rendering markdown:', error);
    htmlContent.value = `<p>Unable to load document: ${error.message}</p>`;
  }
};

// 监听 activeFilePath 的变化
watch(
  () => store.activeFilePath,
  (newFilePath) => {
    renderMarkdown(newFilePath);
  },
  { immediate: true }
);

const extractHeadings = () => {
  if (!markdownDiv.value) return [];

  const h2Elements = markdownDiv.value.querySelectorAll('h2');
  const headingsData = Array.from(h2Elements).map((h2, index) => {
    const headingId = `heading-${index}`;
    h2.id = headingId;
    return {
      id: headingId,
      text: h2.textContent,
      element: h2
    };
  });

  store.setHeadings(headingsData);
};


onMounted(() => {
  renderMarkdown(store.activeFilePath)
})

</script>
<style lang="scss">
@use "@/assets/styles/document/markdown.scss";
</style>