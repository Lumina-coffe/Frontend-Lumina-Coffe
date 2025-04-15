// Products.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Image, Card, Spin, Popconfirm } from "antd";
import axios from "axios";
import { URL_PRODUCT } from "../../../utils/Endpoint";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetchProducts();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        axios
            .get(URL_PRODUCT)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`${URL_PRODUCT}/${id}`)
            .then(() => {
                fetchProducts(); // refresh tanpa reload
            })
            .catch((err) => console.log("err", err));
    };

    const columns = [
        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (_, record) => (
                <Image src={record?.thumbnail} width={100} loading="lazy" />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Stock",
            dataIndex: "stock",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Link to={`/admin/dashboard/products/${record?._id}`}>
                        <Button type="primary">Update</Button>
                    </Link>
                    <Popconfirm
                        title="Yakin ingin hapus produk ini?"
                        onConfirm={() => handleDelete(record?._id)}
                        okText="Ya"
                        cancelText="Batal"
                    >
                        <Button className="ml-2 mt-2" type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <h1>List Products</h1>
            <Link to="/admin/dashboard/products/create">
                <Button className="mt-2 mb-4" type="primary">
                    Tambah
                </Button>
            </Link>

            {loading ? (
                <div className="text-center py-10">
                    <Spin />
                </div>
            ) : isMobile ? (
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <Card key={product._id}>
                            <Image src={product.thumbnail} width={120} />
                            <p className="mt-2">
                                <strong>Name:</strong> {product.name}
                            </p>
                            <p>
                                <strong>Price:</strong> {product.price}
                            </p>
                            <p>
                                <strong>Stock:</strong> {product.stock}
                            </p>
                            <div className="flex gap-2 mt-2">
                                <Link to={`/admin/dashboard/products/${product._id}`}>
                                    <Button type="primary">Update</Button>
                                </Link>
                                <Popconfirm
                                    title="Yakin ingin hapus produk ini?"
                                    onConfirm={() => handleDelete(product._id)}
                                    okText="Ya"
                                    cancelText="Batal"
                                >
                                    <Button type="primary" danger>
                                        Delete
                                    </Button>
                                </Popconfirm>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Table
                    className="mt-2"
                    dataSource={products}
                    columns={columns}
                    rowKey="_id"
                />
            )}
        </div>
    );
};

export default Products;
