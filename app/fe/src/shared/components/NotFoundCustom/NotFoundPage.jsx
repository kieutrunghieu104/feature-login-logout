import { useState } from 'react';
import { Button, Form, Input, Radio, Tag } from 'antd';

const customizeRequiredMark = (label, { required }) => (
  <>
    {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
    {label}
  </>
);

function NotFoundPage() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMark] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMark(requiredMarkValue);
  };
  return (
    <div className="" style={{ display: "flex", justifyContent: "center", width: "500px", height: "100vh", alignItems: "center" }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: requiredMark }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
      >
        <Form.Item label="Required Mark" name="requiredMarkValue">
          <Radio.Group>
            <Radio.Button value>Default</Radio.Button>
            <Radio.Button value="optional">Optional</Radio.Button>
            <Radio.Button value={false}>Hidden</Radio.Button>
            <Radio.Button value="customize">Customize</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Field A"
          required
          rules={[
            { required: true }
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Field B"
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div >
  );
}

export default NotFoundPage;