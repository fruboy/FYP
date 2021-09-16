import { Table, Space, Button, Modal, Input, Form,Select } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';
const { Option } = Select;

export default function Salons() {
    const [dataSource, setdataSource] = React.useState([]);
    const [modalVisibilty, setmodalVisibilty] = React.useState(false);
    const [editmodalVisibilty, seteditmodalVisibilty] = React.useState(false);
    const [value, setValue] = React.useState('');
    const { confirm } = Modal;
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
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            +92
        </Form.Item>
    );
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
    };
    const FilterByNameInput = (
        <>
            <h2>Name</h2>
            <Input
                placeholder="Search Name"
                value={value}
                onChange={e => {
                    const currValue = e.target.value;
                    setValue(currValue);
                    const filteredData = dataSource.filter(entry =>
                        entry.name.includes(currValue)
                    );
                    setdataSource(filteredData);
                }}
                style={{ width: 150, marginRight: -100 }}
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
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Membership Plan',
            dataIndex: 'membershipplan',
            key: 'membershipplan',
        },
        {
            title: 'Phone',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Total Cutomers',
            dataIndex: 'customers',
            key: 'customers',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="default"
                        onClick={() => filleditform(record)}
                        style={{ backgroundColor: "#1F2937", color: 'white' }}>
                        Edit
                    </Button>
                    <Button onClick={showConfirm} type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}>Delete
                    </Button>
                </Space>
            ),
        },
    ];
    const filleditform = (record)=>{
        console.log(record)
        form.setFieldsValue({
            editname: record.name,
            editaddress: record.address,
            editphone: record.number
        });
        seteditmodalVisibilty(true);
    };
    React.useEffect(() => {
        axios.get(`http://3.138.67.96:5000/Salons/SalonsData`)
            .then(res => {
                const result = res.data;
                setdataSource(result);
            })
    }, [dataSource])
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Salons</h1>
                </div>
            </header>
            <div style={{ float: 'right' }}>
                <Button
                    type="default"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "#1F2937", color: 'white', margin: 20 }}
                    onClick={() => setmodalVisibilty(true)}
                >
                    Add Salon
                </Button>
            </div>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
            <Modal
                title="Add new Salon"
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
                        name="Salonname"
                        label="Salon Name"
                        tooltip="Please enter salon's name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter salon name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Salon Address"
                        tooltip="Please enter salon's adress"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter salon address!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="membershipplan"
                        label="Membership Plan"
                        rules={[{ required: true, message: 'Province is required' }]}
                    >
                        <Select placeholder="Select Membership Plan">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Edit Customer"
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
                        label="Edit Salon Name"
                        tooltip="Please enter your full name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your full name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editaddress"
                        label="Adress"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editphone"
                        label="Edit Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="editpassword"
                        label="Enter New Password"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmedit"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: false,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('editpassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
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