import { Table, Space, Button, Modal, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';

export default function Salons() {
    const [dataSource, setdataSource] = React.useState([]);
    const [value, setValue] = React.useState('');
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
                >
                    Add Salon
                </Button>
            </div>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
        </div>
    )
};