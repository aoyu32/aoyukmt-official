<template>
    <div class="feedback-window">
        <!-- 初始消息，让用户选择反馈类型，靠右的消息 -->
        <div class="feedback-left">
            <div class="feedback-select">
                <div class="message">您好！我是反馈助手，很高兴为您服务。请问您想要反馈什么问题呢？☺️</div>
                <div class="select">
                    <p>
                        请选择您要反馈的类型：
                    </p>
                    <div class="select-option">
                        <button>有意见或建议</button>
                        <button>提交应用 Bug</button>
                        <button>有功能需求</button>
                        <button>其他</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 消息式反馈表单，靠左的消息 -->
        <div class="feedback-right">
            <div class="feedback-form">

                <!-- 表单头部，显示下边框，实现分割线 -->
                <div class="form-header">
                    <div class="card-title">
                        <h3>📑反馈卡片</h3>
                        <!-- 反馈类型，靠右 -->
                        <div class="option-type">
                            提交应用 Bug
                        </div>
                    </div>

                </div>

                <div class="user-info">
                    <label for="">用户名称：</label>
                    <div class="name-input">
                        <input type="text">
                    </div>
                </div>

                <!-- 表单内容 -->

                <div class="form-body">
                    <label for="">附加文件：</label>
                    <!-- 用户上传的附加文件，没上传时显示一个上传盒子，里面有个加号图标，上传时显示文件名称列表，响应式的，适应盒子大小 -->
                    <div class="body-file">

                    </div>
                    <!-- 用户输入的消息，这里没有输入框，只是实时显示用户在输入框中输入的内容 -->
                    <label for="">反馈内容：</label>
                    <div class="body-content">

                    </div>
                </div>
            </div>
            <div class="feedback-submit">
                <button>发送</button>
                <button>重置</button>
            </div>
        </div>

    </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.feedback-window {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding: 10px 15px;


    @media (max-width: 768px) {
        max-width: 100%;
    }

    .feedback-left {
        width: 100%;
        display: flex;
        justify-content: start;

        .feedback-select {
            width: 100%;
            padding: 10px;
            border: 1px solid $theme-primary;
            margin-bottom: 20px;
            background-color: rgba($theme-primary, 0.05);
            max-width: 50%;

            @media (max-width: 480px) {
                padding: 5px;
            }

            .message {
                margin-bottom: 5px;
                color: $theme-font-dark;
            }

            .select {
                p {
                    color: $theme-font-dark;
                    margin-bottom: 5px;
                }

                .select-option {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;

                    button {
                        padding: 8px 15px;
                        background-color: $theme-primary;
                        border: none;
                        color: $theme-font-light;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                        width: auto;
                        white-space: nowrap;

                        &:hover {
                            background-color: darken($theme-primary, 10%);
                        }
                    }
                }
            }
        }
    }

    .feedback-right {
        width: 100%;
        display: flex;
        // flex-direction: column;
        justify-content: end; // 垂直方向对齐到底部
        // align-items: start; // 水平方向左对齐


        label {
            color: $theme-primary;
            font-weight: $font-weight;
        }


        .feedback-form {
            width: 100%;
            border: 1px solid $theme-primary;
            padding: 15px;
            background-color: rgba($theme-primary, 0.05);
            max-width: 45%;

            @media (max-width: 480px) {
                padding: 10px;
            }

            .form-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid $theme-primary;
                margin-bottom: 15px;

                .card-title {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 10px;

                    h3 {
                        text-align: center;
                        color: $theme-primary;
                    }


                    .option-type {
                        color: $theme-primary;
                        font-size: 0.9em;
                    }
                }
            }

            .user-info {
                width: 100%;

                input {
                    width: 100%;
                    padding: 6px;
                    margin: 10px 0;
                    border: 1px solid $theme-primary;
                    outline: none;
                    font-weight: 550;
                    background-color: transparent;
                    color: $theme-font-gray;
                }
            }

            .form-body {
                display: flex;
                flex-direction: column;
                gap: 12px;

                .body-file {
                    min-height: 80px;
                    border: 1px dashed $theme-primary;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(#000, 0.02);
                    padding: 10px;

                    &:empty::before {
                        content: '+';
                        font-size: 24px;
                        color: #aaa;
                    }

                    &:not(:empty) {
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        gap: 8px;
                        padding: 15px;
                    }
                }

                .body-content {
                    min-height: 100px;
                    background-color: rgba($theme-primary, 0.05);
                    border: 1px solid $theme-primary;
                    padding: 12px;
                    word-break: break-word;
                    line-height: 1.5;
                    color: $theme-font-dark;

                    &:empty::before {
                        content: '等待用户输入中......';
                        color: #aaa;
                        font-style: italic;
                    }
                }
            }
        }

        .feedback-submit {
            display: flex;
            gap: 10px;
            margin-top: auto; // 让按钮始终靠底部

            button {
                padding: 5px 15px;
                background-color: $theme-primary;
                border: none;
                color: $theme-font-light;
                cursor: pointer;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: darken($theme-primary, 10%);
                }
            }
        }
    }
}
</style>