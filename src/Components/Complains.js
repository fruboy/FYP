import { Table, Space, Menu, Dropdown,Modal,Button } from 'antd';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

export default function Complains() {
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
    const dataSource = [
        {
            key: '1',
            customer: 'Mark',
            salon: "Jason's Salon",
            subject: 'Un proffesion behaviour from the staff',
        },
    ];
    
    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Salon Name',
            dataIndex: 'salon',
            key: 'salon',
        },
        {
            title: 'Complain Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Status',
            key: 'salons',
            render: (text, record) => (
                <Dropdown overlay={<Menu>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            Pending
                        </a>
                    </Menu.Item>
                    <Menu.Item >
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            Anwsered
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                            Closed
                        </a>
                    </Menu.Item>
                </Menu>}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="">
                        Select Status <DownOutlined />
                    </a>
                </Dropdown>
    
            ),
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
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Complains</h1>
                </div>
            </header>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
        </div>
    )
};