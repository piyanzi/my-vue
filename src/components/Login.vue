<template>
  <div class="container">
    <div class="login-container">
      <!-- logo -->
      <div class="avatar-box">
        <img src="../assets/cup.png" alt="#">
      </div>
      <div class="login-form">
        <div class="title">Login</div>
        <!-- 登录表单 -->
        <el-form :model="loginInfo" :rules="rules" ref="loginInfoRef">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="loginInfo.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginInfo.password"></el-input>
          </el-form-item>
          <!-- 操作按钮 -->
          <el-form-item class="buttons">
            <el-button type="primary" @click="onSubmit" plain>登录</el-button>
            <el-button type="info" plain @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginInfo: {
        username: 'admin',
        password: 'admin123'
        // username: '',
        // password: ''
      },

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onSubmit () {
      // console.log(this.$refs)
      this.$refs.loginInfoRef.validate(async valid => {
        // console.log(valid)s
        if (!valid) return
        const { data: res } = await this.$http.post('/users/login', this.loginInfo)
        // console.log(res)
        if (res.status !== 0) {
          return this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
          window.sessionStorage.setItem('user', JSON.stringify(res.data))
          await this.$router.push({ path: '/home' })
        }
      })
    },

    resetForm () {
      this.$refs.loginInfoRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-image: url('../assets/background.jpg');
  // filter: opacity(50%) brightness(200%);
  background-repeat:no-repeat;
  background-size:100% 100%;
  // background-origin:content-box;
  // background-color: rgba(0, 0, 0, 0.5);
}

.login-container {
  background-color: #ffffff;
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.avatar-box {
  width: 368px;
  height: 70px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.title {
  height: 80px;
  width: 100%;
  text-align: center;
  position: relative;
  transform: translate(0, -20%);
  font-size: 50px;
  font-family: Arial, Helvetica, sans-serif;
  color: #409EFF;
}
</style>
