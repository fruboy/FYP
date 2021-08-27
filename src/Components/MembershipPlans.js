import { Table, Space, Button,Modal, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
export default function Plans() {
    const [value, setValue] = React.useState('');
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
                    const currValue = e.target.value;
                    setValue(currValue);
                    const filteredData = dataSource.filter(entry =>
                        entry.name.includes(currValue)
                    );
                    dataSource = filteredData;
                }}
                style={{width: 200,marginRight: -200}}
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
                        style={{ backgroundColor: "#1F2937", color: 'white' }}>
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
                >
                    Create New Plan
                </Button>
            </div>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
        </div>
    )
};