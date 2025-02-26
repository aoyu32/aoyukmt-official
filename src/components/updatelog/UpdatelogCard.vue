<template>
    <div class="updatelog-card" v-aos="{
        animation: 'flip-down',
    }">
        <div class="log">
            <div class="log-header">
                <span class="version-title">v2.0.0</span>
                <span class="update-date">2024年12月11日</span>
            </div>
            <div class="log-content">
                <h3>基于上一个版本的修复更新</h3>
                <ul class="update-list">
                    <li>[新功能] 模块化设计：各功能模块分离，用户可以按需启用或禁用，灵活性更高。</li>
                    <li>[新功能] 快捷字符输入：支持快速输入特殊字符，例如 `!`, `@`, `#`，提高输入效率。</li>
                    <li>[新功能] 方向键增强：通过 `space + w/a/s/d` 实现快捷的上下左右方向键移动。</li>
                    <li>[新功能] 编辑操作快捷键：新增常用编辑功能快捷键：复制、粘贴、撤销、全选等操作一键完成。</li>
                    <li>[新功能] 磁盘快捷启动：快速打开指定磁盘，例如使用 `RShift + c` 打开 C 盘。</li>
                    <li>[新功能] 应用快捷启动：快速启动常用软件，如 `LAlt + g` 启动 Chrome 浏览器。</li>
                    <li>[新功能] 自定义热字符串：支持通过短字符串快速输入常用内容（例如邮箱地址、用户名等）。</li>
                    <li>[新功能] 系统操作增强：快捷键控制系统音量、任务管理器、打开系统托盘等功能。</li>
                    <li>[新功能] 窗口管理功能：新增快捷键管理窗口最小化、最大化和移动功能。</li>
                </ul>
            </div>
            <div class="log-download">
                <h4>下载该版本:</h4>
                <p>
                    <a href="#" class="download-link download-link-install">安装版</a>
                <p>sha1：9affedc55b1a3b0dfd2cbea9826194353e330749</p>
                </p>
                <p>
                    <a href="#" class="download-link download-link-portable">便携版</a>
                <p>sha1：9affedc55b1a3b0dfd2cbea9826194353e330749</p>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/card.scss" as *;
</style>