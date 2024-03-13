import styles from './index.module.less'
import { Card, Button, Form, Input } from 'antd';
import { LockFilled, } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import type { Rule } from 'antd/es/form';
import { userStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
// 使用 iconfont.cn 的多个资源
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4451566_x4nj8hb5olf.js',
  ],
});

const validatePhone = (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('手机号不能为空');
  }
  if (!/^[1][0-9]{10}$/.test(value)) {
    return Promise.reject('请输入正确的手机号');
  }
  return Promise.resolve('手机号正确');
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  const handleLogin = userStore(state => state.handleLogin)
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    handleLogin(values).then(() => {
      navigate('/')
    })
  };
  return (
    <div className={styles['login-wrap']}>
      <Card title="欢迎登录后台管理系统" bordered={false} className={styles['login-card']} styles={{
        header: {
          textAlign: 'center'
        }
      }}>
        <Form
          name="login"
          // initialValues={{ remember: true }}
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
          validateTrigger={["onBlur"]}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, validator: validatePhone }
            ]}
          >
            <Input addonBefore={<IconFont type="icon-user" />} placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password addonBefore={<LockFilled />} placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>登录</Button>
          </Form.Item>
        </Form>
      </Card>

    </div>
  )
}

export default Login