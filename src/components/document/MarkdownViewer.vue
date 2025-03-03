<template>
  <div ref="markdownDiv" class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { marked } from 'marked';

const markdownDiv = ref(null)
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

// 监听 filePath 的变化
watch(
  () => props.filePath,
  (newFilePath) => {
    renderMarkdown(newFilePath);
    window.scrollTo(0, 0)
  },
  { immediate: true }
);

//提取h2标题
const emit = defineEmits(['getHeadings'])
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

  emit('getHeadings', headingsData)
};


onMounted(() => {
  console.log(props.filePath);

  renderMarkdown(props.filePath)
})

</script>
<style lang="scss">
@use "@/assets/styles/document/markdown.scss";
</style>