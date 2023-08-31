import type { FormRules } from 'element-plus'

const formRules: FormRules = {
  name: [
    { required: true, message: '账号为必填项!', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成!',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码为必填项!', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '必须是3位以上的数字或字母组成!',
      trigger: 'blur'
    }
  ]
}

export default formRules
