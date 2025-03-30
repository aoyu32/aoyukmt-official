<template>
  <div ref="markdownDiv" class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import "highlight.js/styles/github-dark.min.css"; // 可替换为其他主题样式
import { useDocumentStore } from '@/stores/document';

const store = useDocumentStore();
const markdownDiv = ref(null);

const props = defineProps({
  // Markdown 文本内容
  markdownText: {
    type: String,
    default: ''
  },
  // 远程 Markdown 文件 URL
  markdownUrl: {
    type: String,
    default: ''
  },
  // 本地 Markdown 文件对象
  markdownFile: {
    type: File,
    default: null
  },
  // 是否自动高亮代码
  autoHighlight: {
    type: Boolean,
    default: true
  },
  // 是否提取标题
  extractHeadings: {
    type: Boolean,
    default: true
  },
  // 自定义 marked 选项
  markedOptions: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['getHeadings', 'loading', 'loaded', 'error']);

// 初始化 marked 配置
const initMarked = () => {
  marked.setOptions({
    gfm: true,
    breaks: true,
    ...props.markedOptions,
    highlight: (code, lang) => {
      if (!props.autoHighlight) return code;
      const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language: validLang }).value;
    }
  });
};

initMarked();

// 渲染内容
const htmlContent = ref('');

// 渲染 Markdown 文本
const renderMarkdownText = (text) => {
  try {
    htmlContent.value = marked(text || '');
    postRender();
  } catch (error) {
    handleError(error);
  }
};

// 渲染远程 Markdown 文件
const renderMarkdownUrl = async (url) => {
  if (!url) return;

  emit('loading');
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error loading document: ${response.statusText}`);
    }
    const markdown = await response.text();
    htmlContent.value = marked(markdown);
    postRender();
    emit('loaded');
  } catch (error) {
    handleError(error);
  }
};

// 渲染本地 Markdown 文件
const renderMarkdownFile = (file) => {
  if (!file) return;

  emit('loading');
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      htmlContent.value = marked(e.target.result);
      postRender();
      emit('loaded');
    } catch (error) {
      handleError(error);
    }
  };
  reader.onerror = (error) => {
    handleError(error);
  };
  reader.readAsText(file);
};

// 渲染后处理
const postRender = async () => {
  await nextTick();
  if (props.autoHighlight) {
    hljs.highlightAll();
  }
  if (props.extractHeadings) {
    extractHeadings();
  }
};

// 错误处理
const handleError = (error) => {
  console.error('Error rendering markdown:', error);
  htmlContent.value = `<div class="markdown-error"><p>Error rendering markdown: ${error.message}</p></div>`;
  emit('error', error);
};

// 观察器实例
let observer = null;

// 设置标题观察器
const setupHeadingObserver = () => {
  if (observer) observer.disconnect();
  if (!props.extractHeadings) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          store.setActiveHeadingId(entry.target.id);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '-100px 0px -60% 0px',
    }
  );

  const h2Elements = markdownDiv.value?.querySelectorAll('h2') || [];
  h2Elements.forEach((heading) => {
    observer.observe(heading);
  });
};

// 提取标题
const extractHeadings = () => {
  if (!markdownDiv.value || !props.extractHeadings) return [];

  const h2Elements = markdownDiv.value.querySelectorAll('h2, h3');
  const headingsData = Array.from(h2Elements).map((heading, index) => {
    const headingId = `heading-${index}-${heading.tagName.toLowerCase()}`;
    heading.id = headingId;
    return {
      id: headingId,
      text: heading.textContent,
      level: parseInt(heading.tagName.substring(1)),
      element: heading
    };
  });

  emit('getHeadings', headingsData);
  setupHeadingObserver();
};

// 监听所有 props 变化
watch(() => [
  props.markdownText,
  props.markdownUrl,
  props.markdownFile,
  props.autoHighlight,
  props.extractHeadings
], () => {
  if (props.markdownText) {
    renderMarkdownText(props.markdownText);
  } else if (props.markdownUrl) {
    renderMarkdownUrl(props.markdownUrl);
  } else if (props.markdownFile) {
    renderMarkdownFile(props.markdownFile);
  }
}, { immediate: true });

// 组件卸载时清理
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style lang="scss">
@use "@/assets/styles/document/markdown.scss";

.markdown-error {
  color: #ff4d4f;
  padding: 16px;
  background-color: #fff2f0;
  border-radius: 4px;
  border: 1px solid #ffccc7;
}
</style>