import { useState } from "react";
import { Input, Button, Form, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_SIGNIN } from "../../utils/Endpoint";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        setErrMsg("");

        const data = {
            email: values.email,
            password: values.password,
        };

        try {
            const res = await axios.post(URL_SIGNIN, data);

            if (res.data.token && res.data.role) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);

                if (res.data.role === "Admin") {
                    navigate("/admin/dashboard");
                } else {
                    setErrMsg("Anda tidak memiliki akses ke dalam dashboard admin.");
                    // Hapus token dan role karena bukan admin
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                }
            } else {
                setErrMsg("Login gagal. Token atau role tidak valid.");
            }
        } catch (err) {
            setErrMsg(err.response?.data?.message || "Login gagal. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {errMsg && (
                <div style={{ padding: "20px" }}>
                    <Alert message={errMsg} type="error" showIcon />
                </div>
            )}
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Silakan masukkan email Anda!" }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Email"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Silakan masukkan password Anda!" }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                size="large"
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Login;
