<template>
  <div class="feedback">
      <div class="main-content">
          <div class="feedback-form">
              <div class="form-header">
                  <h2>意见反馈</h2>
                  <p class="description">感谢您的访问，请填写以下表单告诉我们您的想法或遇到的问题。</p>
              </div>
              <div class="form-content">
                  <form action="" class="form">
                      <!-- 用户信息 -->
                      <!-- <div class="content-user-info">
                          <div class="user-name">
                              <label for="name">姓名 <span class="required">*</span></label>
                              <input type="text" id="name" placeholder="请输入您的姓名（可选，默认用户名）" required />
                          </div>
                          <div class="user-contact">
                              <label for="email">联系方式 <span class="required">*</span></label>
                              <input type="email" id="email" placeholder="请输入您的联系方式（可选，默认站内联系）" required />
                          </div>
                      </div> -->
                      <!-- 反馈类型 -->
                      <div class="content-feedback-type">
                          <label for="feedbackType">反馈类型 <span class="required">*</span></label>
                          <select class="type-select" required>
                              <option value="" disabled selected>请选择反馈类型（可选，默认其他）</option>
                              <option value="suggestion">有意见或建议</option>
                              <option value="bug">要提交应用 Bug </option>
                              <option value="complaint">有功能需求</option>
                              <option value="praise">其他</option>
                          </select>
                      </div>

                      <!-- 附件 -->
                      <div class="content-attachment">
                          <label for="file">上传附件（可选）</label>
                          <div class="upload-file-box">
                              <div class="upload-icon">
                                  <i class="iconfont icon-add-bold"></i>
                              </div>
                          </div>
                      </div>

                      <!-- 反馈内容 -->
                      <div class="content-textarea">
                          <label for="message">详细描述 <span class="required">*</span></label>
                          <textarea id="message" placeholder="请详细描述您的意见或问题..." rows="5" required></textarea>
                      </div>

                      <!-- 提交按钮 -->
                      <div class="submit-button">
                          <button type="button" class="btn-reset">重置</button>
                          <button type="submit" class="btn-submit">提交反馈</button>
                      </div>
                  </form>
              </div>
              <!-- 其他联系方式 -->
              <div class="feedback-other">

              </div>
          </div>
      </div>
  </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.feedback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .main-content {
      width: 100%;
      height: 95%;
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: antiquewhite;

      // 意见反馈信息表单
      .feedback-form {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          border: 2px solid $theme-primary;
          padding: 10px 60px;

          .required {
              color: $theme-primary;
          }

          /* 设置子元素之间的间距 */
          label {
              display: block;
              margin-bottom: 10px;
              font-weight: 550;
              color: $theme-secondary;
          }

          //表单头部
          .form-header {
              width: 100%;
              display: flex;
              align-items: center;
              // margin-bottom: 15px;
              justify-content: center;
              flex-direction: column;

              h2 {
                  color: $theme-primary;
                  margin-bottom: 10px;
              }

              p {
                  color: $theme-font-gray;
              }
          }

          //表单内容
          .form-content {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              //表单元素
              .form {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  width: 100%;

                  //用户信息
                  .content-user-info {
                      display: grid;
                      width: 100%;
                      grid-template-columns: 1fr 1fr;
                      /* 定义两列，每列占一半宽度 */
                      gap: 50px;
                      margin: 15px 0;



                      input {
                          width: 100%;
                          padding: 10px;
                          border: 1px solid $theme-primary;
                          border-radius: 4px;
                          box-sizing: border-box;
                      }

                      .user-name {
                          display: flex;
                          flex-direction: column;
                      }

                      .user-contact {
                          display: flex;
                          flex-direction: column;
                      }
                  }

                  //反馈类型
                  .content-feedback-type {

                      width: 100%;
                      padding: 15px 0;

                      .type-select {
                          width: 100%;
                          padding: 10px 15px;
                          font-size: 14px;
                          border: 2px solid #ccc;
                          border-radius: 5px;
                          background-color: #fff;
                          appearance: none;
                          /* Remove default arrow */
                          -webkit-appearance: none;
                          -moz-appearance: none;
                          cursor: pointer;
                          transition: all 0.3s ease;
                      }
                  }

                  //上传附件
                  .content-attachment {
                      width: 100%;
                      padding: 15px 0;

                      .upload-file-box {
                          width: 100%;
                          height: 150px;
                          border: 1px solid $theme-primary;
                          border-radius: 15px;
                          display: flex;
                          align-items: center;
                          justify-content: center;

                          .upload-icon {
                              width: 40px;
                              height: 40px;
                              display: flex;
                              align-items: center;
                              justify-content: center;

                              i {
                                  font-size: 24px;
                                  font-weight: 600;
                                  color: $theme-primary;
                              }
                          }
                      }

                  }

                  //反馈内容输入
                  .content-textarea {
                      width: 100%;
                      padding: 15px 0;

                      textarea {
                          width: 100%;
                          height: 160px;
                          padding: 10px;
                          border: 1px solid $theme-primary;
                          border-radius: 15px;
                          box-sizing: border-box;
                      }

                  }

                  //提交按钮
                  .submit-button {
                      width: 100%;
                      // background-color: antiquewhite;
                      display: flex;
                      justify-content: space-between;
                      padding: 5px 0;
                      gap: 1rem;

                      button {
                          height: 45px;
                          background-color: $theme-primary;
                          color: $theme-font-light;
                          font-weight: 600;
                          border: none;
                          border-radius: 5px;
                      }

                      .btn-reset{
                          flex: 1;
                      }
                      .btn-submit{
                          flex: 6;
                      }
                  }

              }

          }



      }
  }
}
</style>