import { Button, Form, Input } from 'antd';
import { Typography } from 'antd'

import { loginSchema } from '../schemas/authSchema';
import zodValidator from '~/shared/utils/zodValidator';

function LoginForm({ onSubmit, loading = false }) {

  return (
    <>
      <Typography.Title level={2}>
        Welcome Back
      </Typography.Title>
      <Typography.Text type="secondary">
        Sign in to your account
      </Typography.Text>
      <Form
        labelAlign="left"
        labelCol={{ span: 8 }}
        style={{ width: 500, marginTop: 16 }}
        onFinish={onSubmit}
        layout="vertical"
        // autoComplete="on"
        requiredMark="optional"

      >
        <Form.Item
          label="Email"
          name="email"
          validateFirst
          rules={[
            {
              validator: zodValidator(loginSchema, "email"),
            }
          ]}
        >
          <Input
            placeholder="Enter your email"
            disabled={loading}
          // autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          validateFirst
          rules={[
            {
              validator: zodValidator(loginSchema, "password"),
            }
          ]}
        >
          <Input.Password
            // autoComplete="current-password"
            placeholder="Enter your password"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20, span: 3 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form >
    </>
  );
}

export default LoginForm;