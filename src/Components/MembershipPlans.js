import { Table, Space, Button, Modal, Input, Form } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
export default function Plans() {
    const [value, setValue] = React.useState('');
    const [modalVisibilty, setmodalVisibilty] = React.useState(false);
    const [editmodalVisibilty, seteditmodalVisibilty] = React.useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        form.resetFields();
        setmodalVisibilty(false);
    };
    const onFinishedit = (values) => {
        console.log('Received values of form: ', values);
        form.resetFields();
        setmodalVisibilty(false);
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const dataSource = [
        {
            key: '1',
            name: 'Basic',
            price: '2000',
            duration: '1 year',
            salons: 78
        },
        {
            key: '2',
            name: 'Advance',
            price: '5000',
            duration: '1 year',
            salons: 50
        },
        {
            key: '3',
            name: 'Advance Plus',
            price: '10000',
            duration: '1 year',
            salons: 12
        },
        {
            key: '4',
            name: 'Basic Plus',
            price: '2500',
            duration: '1 year',
            salons: 69
        }
    ];
    const FilterByNameInput = (
        <>
            <h2>Name</h2>
            <Input
                placeholder="Plan Name"
                value={value}
                onChange={e => {
                    
                }}
                style={{ width: 200, marginRight: -200 }}
            />
        </>
    );
    const columns = [
        {
            title: FilterByNameInput,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Plan Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Plan Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Active Salons',
            dataIndex: 'salons',
            key: 'salons',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}
                        onClick={() => filleditform(record)}
                    >
                        Edit
                    </Button>
                    <Button onClick={showConfirm} type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}>Delete</Button>
                </Space>
            ),
        },
    ];
    const { confirm } = Modal;

    function showConfirm() {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const filleditform = (record)=>{
        console.log(record)
        form.setFieldsValue({
            editname: record.name,
            editduration: record.duration,
            editprice: record.price
        });
        seteditmodalVisibilty(true);
    };
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Membership Plans</h1>
                </div>
            </header>
            <div style={{ float: 'right' }}>
                <Button
                    type="default"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "#1F2937", color: 'white', margin: 20 }}
                    onClick={() => setmodalVisibilty(true)}
                >
                    Create New Plan
                </Button>
            </div>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
            <Modal
                title="Add new Plan"
                centered
                visible={modalVisibilty}
                onCancel={() => setmodalVisibilty(false)}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Enter Plan Name"
                        tooltip="Please enter the membership plan name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the membership plan name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan price!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="duration"
                        label="Plan Duration"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan duration!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Edit Membership Plan"
                centered
                visible={editmodalVisibilty}
                onCancel={() => seteditmodalVisibilty(false)}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="edit"
                    onFinish={onFinishedit}
                    scrollToFirstError
                >
                    <Form.Item
                        name="editname"
                        label="Edit Plan Name"
                        tooltip="Please enter the membership plan name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the membership plan name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editprice"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan price!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editduration"
                        label="Plan Duration"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan duration!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};