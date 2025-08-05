import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { loginUser, registerUser } from '../api-handler/api-call';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<Props> = ({ isOpen, onClose }) => {

  // handle local state
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();


  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (isSignIn) {
        const res = await loginUser({
          email: values.email,
          password: values.password,
        });

        if (res.token) {
          message.success('Login successful!');
          onClose();
          window.location.reload();
        }
      } else {
        const res = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });

        if (res.token) {
          message.success('Registration successful!');
          setIsSignIn(true);
          form.resetFields();
          onClose();
          window.location.reload();
        }
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.error || 'Something went wrong';

        if (status === 401) message.error('Invalid credentials');
        else if (status === 400) message.error('Bad request');
        else message.error(msg);
      } else {
        message.error('Network error or server not reachable');
      }
    } finally {
      setLoading(false);
    }
  };

  // handle modal 

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);



  return (
    <Modal
      open={isOpen}
      title={isSignIn ? 'Sign In' : 'Sign Up'}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      footer={null}
      centered
      width={360}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {!isSignIn && (
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Full name" maxLength={30} />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input placeholder="Email" maxLength={40} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" maxLength={20} />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            block
            style={{ backgroundColor: '#272727', border: 'none' }}
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: 'center' }}>
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span
          style={{ cursor: 'pointer', color: '#1677ff' }}
          onClick={() => {
            setIsSignIn(!isSignIn);
            form.resetFields();
          }}
        >
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </span>
      </p>
    </Modal>
  );
};

export default SignInModal;
