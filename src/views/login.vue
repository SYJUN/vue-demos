<template>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginFormEl" label-width="100px" class="form-container">
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="loginForm.username"  placeholder="请输入用户名" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    const validateRequired = (rule, value, callback) => {
      const errorText = {
        username: '用户名不能为空！',
        password: '密码不能为空！',
      }[rule.fullField];

      callback(value.trim() === '' ? new Error(errorText) : undefined);
    };

    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { validator: validateRequired, trigger: 'blur' },
        ],
        password: [
          { validator: validateRequired, trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    ...mapActions('auth', ['logIn']),
    submitForm() {
      this.$refs['loginFormEl'].validate((valid) => {
        if (!valid) {
          this.$message({
            message: '账号和密码不能为空!',
            type: 'warning',
          });
          return;
        }

        this.logIn({
          username: this.loginForm.username.trim(),
          password: this.loginForm.password.trim(),
        }).then(() => {
          this.$router.push('/home');
        });
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 500px;
  margin: 0 auto;
}
</style>
