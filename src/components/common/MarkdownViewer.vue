<template>
  <div ref="markdownDiv" class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import "highlight.js/styles/github-dark.min.css";  // 你可以换成其他主题
import { useDocumentStore } from '@/stores/document';
const store = useDocumentStore()
const markdownDiv = ref(null)
const props = defineProps({
  markdownData: {
    type: String, // 只接受 Markdown 内容
    default: ''
  },
  docsUrl: {
    type: String, // 只接受文件路径
    default: ''
  }
});

// **设置 marked 代码高亮，只执行一次**
marked.setOptions({
  highlight: (code, lang) => {
    const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language: validLang }).value;
  }
});

// 渲染 Markdown 文件内容
const htmlContent = ref('');
const renderMarkdown = async (docsUrl) => {
  try {
    const response = await fetch(docsUrl);
    if (!response.ok) {
      throw new Error(`Error loading document: ${response.statusText}`);
    }
    const markdown = await response.text();
    htmlContent.value = marked(markdown);

    await nextTick();
    hljs.highlightAll()
    extractHeadings();
  } catch (error) {
    console.error('Error rendering markdown:', error);
    htmlContent.value = `<p>Unable to load document: ${error.message}</p>`;
  }
};

// 监听 filePath 的变化
watch(
  () => props.docsUrl,
  (newFilePath) => {
    renderMarkdown(newFilePath);
    window.scrollTo(0, 0)
  },
  { immediate: true }
);

// // 观察器实例
let observer = null;
// // 设置标题观察器
const setupHeadingObserver = () => {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          store.setActiveHeadingId(entry.target.id);
        } else {
          store.setActiveHeadingId(null);
        }
      });

    },
    {
      threshold: 0.1,
      rootMargin: '-100px 0px -60% 0px',
    }
  );
  const h2Elements = markdownDiv.value.querySelectorAll('h2');
  h2Elements.forEach((heading) => {
    observer.observe(heading);
  });
};


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

  // 设置 Intersection Observer
  nextTick(() => {
    setupHeadingObserver();
  });
};


onMounted(() => {
  renderMarkdown(props.docsUrl)
})

// 组件卸载时清理 observer
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});


</script>
<style lang="scss">
@use "@/assets/styles/document/markdown.scss";
</style>