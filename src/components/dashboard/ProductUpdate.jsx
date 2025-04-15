import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../../../utils/Endpoint";
import { useNavigate, useParams } from "react-router-dom";
import NumberFormat from "react-number-format";

const UpdateProduct = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [rawPrice, setRawPrice] = useState(""); // Harga asli tanpa format
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${URL_PRODUCT}/${id}`)
            .then((res) => {
                const data = res.data;
                form.setFieldsValue({
                    name: data.name,
                    description: data.description,
                    stock: data.stock,
                    category: data.category,
                });
                setRawPrice(data.price);

                if (data.thumbnail) {
                    setFileList([
                        {
                            uid: "-1",
                            name: "thumbnail.png",
                            status: "done",
                            url: data.thumbnail,
                        },
                    ]);
                }
            })
            .catch((err) => {
                console.error(err);
                message.error("Gagal mengambil data produk");
            });
    }, [id, form]);

    const handleSubmit = async (values) => {
        setLoading(true);

        if (
            fileList.length === 0 ||
            (!fileList[0].originFileObj && !fileList[0].url)
        ) {
            message.error("Please upload a thumbnail!");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", rawPrice); // gunakan harga asli tanpa format
        formData.append("description", values.description);
        formData.append("stock", values.stock);
        formData.append("category", values.category);

        if (fileList[0].originFileObj) {
            formData.append("thumbnail", fileList[0].originFileObj);
        }

        try {
            await axios.patch(`${URL_PRODUCT}/${id}`, formData);
            message.success("Produk berhasil diperbarui!");
            navigate("/admin/dashboard"); // Mengarahkan ke /admin/dashboard setelah update berhasil
        } catch (error) {
            console.error(error);
            message.error("Gagal memperbarui produk");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-6">Edit Produk</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="name" label="Nama Produk" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Harga" required>
                    <NumberFormat
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        value={rawPrice}
                        onValueChange={(values) => setRawPrice(values.floatValue)}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                        required
                    />
                </Form.Item>

                <Form.Item name="description" label="Deskripsi" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item name="stock" label="Stok" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item name="category" label="Kategori" rules={[{ required: true }]}>
                    <Input placeholder="Misal: coffee, non-coffee, makanan" />
                </Form.Item>

                <Form.Item label="Thumbnail">
                    <Upload
                        beforeUpload={() => false}
                        listType="picture"
                        fileList={fileList}
                        onChange={handleChange}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Simpan Perubahan
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateProduct;
