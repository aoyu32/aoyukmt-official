<template>
    <header class="header">
        <nav class="nav">
            <a href="#" class="logo">
                <img src="./assets/aoyukmt.png">
                <span class="logo-text" id="logo-text"></span>
            </a>
            <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
                &#9776;
            </button>
            <div class="nav-links" id="nav-links">
                <router-link to="/download">🖥️ 下载安装</router-link>
                <router-link to="/document">📇 使用文档</router-link>
                <router-link to="/feedback">🗳️ 意见反馈</router-link>
                <router-link to="/updatelog" class="updatelog-link">🐋 更新日志</router-link>
            </div>
        </nav>
    </header>
    <router-view></router-view>
    <div>
        <section class="introduce">
            <canvas id="backgroundCanvas"></canvas> <!-- 将 canvas 放入 section 内 -->
            <div class="aoyukmt-ico">
                <img src="./assets/aoyukmt.png">
            </div>
            <div class="introduce-content">
                <h2>AOYUKMT</h2>
                <h1>自定义“真快捷”键工具</h1>
                <p>自由支配你的按键，让你拥有一套属于自己的快捷键，独特的键盘操作</p>
                <a href="https://github.com/aoyu32/aoyukmt_pro/releases" class="download-btn floating">
                    立即下载
                </a>
            </div>
            <div class="scroll-down">
                <span>&#9660;</span>
            </div>
        </section>
        <section class="features" id="features">
            <h2>✨ 功能特点</h2>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">🔧</div>
                    <h3>模块化设计</h3>
                    <p>灵活可控的功能模块，按需开启禁用</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⌨️</div>
                    <h3>快捷字符输入</h3>
                    <p>特殊字符快速输入，效率倍增</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3>方向键操作</h3>
                    <p>方向键与space组合，移动更便捷</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📝</div>
                    <h3>编辑操作</h3>
                    <p>复制、粘贴、撤销等操作一键完成</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>快捷启动</h3>
                    <p>磁盘和应用程序快速启动</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📌</div>
                    <h3>自定义热字符串</h3>
                    <p>常用内容快速输入</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"> ⚡ </div>
                    <h3>小巧迅速</h3>
                    <p>响应迅速，无卡顿，资源占用低</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🪟</div>
                    <h3>便捷窗口操作</h3>
                    <p>方便快捷的窗口管理操作方式</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🗂️</div>
                    <h3>文件管理器快捷键</h3>
                    <p>自由配置文件管理器常用操作快捷键</p>
                </div>
            </div>
        </section>

        <section class="feature-details" id="details">
            <h2>🔖 功能展示</h2>
            <div class="detail-card">
                <h3><span class="icon">⌨️</span>快捷字符输入</h3>
                <div class="detail-content">
                    <div class="detail-text">
                        <p>通过简单的快捷键组合，即可快速输入各种特殊字符。支持自定义映射规则，让您的输入更加高效。无需记忆复杂的字符码，一键即可输入常用符号。</p>
                    </div>
                    <div class="detail-image">
                        <img src="./assets/8.webp" alt="快捷字符输入示意图">
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3><span class="icon">🎯</span>方向键操作</h3>
                <div class="detail-content">
                    <div class="detail-image">
                        <img src="./assets/5.webp" alt="方向键操作示意图">
                    </div>
                    <div class="detail-text">
                        <p>创新的方向键与空格键组合操作，让您的光标移动更加灵活。无需频繁移动手部位置，即可实现精确的光标控制，大大提升工作效率。</p>
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3><span class="icon">🚀</span>快捷启动</h3>
                <div class="detail-content">
                    <div class="detail-text">
                        <p>一键启动常用应用程序和文件夹，快速访问系统磁盘。支持自定义启动项配置，让您的工作流程更加流畅。告别繁琐的点击操作，提升工作效率。</p>
                    </div>
                    <div class="detail-image">
                        <img src="./assets/6.webp" alt="快捷启动示意图">
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3><span class="icon">📝</span>编辑操作</h3>
                <div class="detail-content">
                    <div class="detail-image">
                        <img src="./assets/7.webp" alt="方向键操作示意图">
                    </div>
                    <div class="detail-text">
                        <p>常用编辑操作快捷键不在局限于固定Ctrl,C,V,X,Z，告别别扭的Ctrl组合快捷键，灵活快捷键配置常用编辑操作快捷键。</p>
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3><span class="icon">🪟</span>窗口操作</h3>
                <div class="detail-content">
                    <div class="detail-text">
                        <p>一键启动常用应用程序和文件夹，快速访问系统磁盘。支持自定义启动项配置，让您的工作流程更加流畅。告别繁琐的点击操作，提升工作效率。</p>
                    </div>
                    <div class="detail-image">
                        <img src="./assets/6.webp" alt="快捷启动示意图">
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3><span class="icon">🗂️</span>文件操作</h3>
                <div class="detail-content">
                    <div class="detail-image">
                        <img src="./assets/7.webp" alt="方向键操作示意图">
                    </div>
                    <div class="detail-text">
                        <p>常用编辑操作快捷键不在局限于固定Ctrl,C,V,X,Z，告别别扭的Ctrl组合快捷键，灵活快捷键配置常用编辑操作快捷键。</p>
                    </div>
                </div>
            </div>

        </section>

        <footer>
            <div class="footer-waves"></div>
            <div class="footer-content">
                <div class="copyright">
                    <p class="copyright-text">打造更高效的键盘操作体验</p>
                    <p class="copyright-explain">Copyright © 2024 - Aoyukmt All Rights Reserved</p>
                </div>
            </div>
        </footer>
    </div>
</template>
<script setup>


</script>
<style lang="scss" scoped>
@import "@/assets/styles/index/introduce.scss";
@import "@/assets/styles/index/features.scss";
@import "@/assets/styles/index/detail.scss";
@import "@/assets/styles/index/footer.scss";
</style>