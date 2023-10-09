
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Highlighter from 'react-highlight-words';
import * as yup from "yup"
import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Modal, Radio, Select, Space, Table, Tooltip, Typography, notification } from 'antd';
import { textApp } from '../../../TextContent/textApp';
import { deleteData, getData, postData, putData } from '../../../api/api';
import { firebaseImgs } from '../../../upImgFirebase/firebaseImgs';
import ComHeaderAdmin from '../../Components/ComHeaderAdmin/ComHeaderAdmin';
import ComButton from '../../Components/ComButton/ComButton';
import ComUpImg from '../../Components/ComUpImg/ComUpImg';
import ComInput from '../../Components/ComInput/ComInput';
import ComTextArea from '../../Components/ComInput/ComTextArea';
import ComNumber from '../../Components/ComInput/ComNumber';
import ComSelect from '../../Components/ComInput/ComSelect';
import moment from 'moment/moment';


export default function OrderPending() {
    const [disabled, setDisabled] = useState(false);

    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [dataRun, setDataRun] = useState(false);
    const [productRequestDefault, setProductRequestDefault] = useState({});
    const [api, contextHolder] = notification.useNotification();
    const [selectedMaterials, setSelectedMaterials] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [selected, setSelected] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            setSelected(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const showModalEdit = (e) => {
        setSelectedMaterials(e.material)

    };

    const showModalDelete = (e) => {
        setProductRequestDefault({
            id: e._id
        })
        setIsModalOpenDelete(true);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);

    };

    function formatCurrency(number) {
        // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
        return number.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
        });
    }


    const onSubmit = () => {
        putData('/order/admin/put', 'Processing', { orders: selected })
            .then((e) => {
                setDataRun(!dataRun);
            })
            .catch(err => console.log(err))
        setDataRun(!dataRun);
    }

    const deleteById = () => {
        setDisabled(true)
        deleteData('product', productRequestDefault.id)
            .then((data) => {
                setDisabled(false)
                handleCancelDelete()
                api["success"]({
                    message: textApp.TableProduct.Notification.delete.message,
                    description:
                        textApp.TableProduct.Notification.delete.description
                });

            })
            .catch((error) => {
                console.log(error);
                setDisabled(false)
                handleCancelDelete()
                api["error"]({
                    message: textApp.TableProduct.Notification.deleteError.message,
                    description:
                        textApp.TableProduct.Notification.deleteError.description
                });
            })
        setDataRun(!dataRun)

    }
    useEffect(() => {
        setTimeout(() => {
            getData('/order/admin/pending', {})
                .then((data) => {
                    setProducts(data?.data?.docs)
                })
                .catch((error) => {
                    console.error("Error fetching items:", error);
                });

        }, 100);


    }, [dataRun]);


    const getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <ComButton
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        // icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        <div className='justify-center flex '><SearchOutlined />Tìm kiếm</div>
                    </ComButton>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Đặt lại
                    </Button>
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [


        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            width: 300,
            key: '_id',
            fixed: 'left',

            render: (_, record) => (

                <div >
                    <h1>{record._id}</h1>
                </div>
            ),
            ...getColumnSearchProps('_id', 'Mã đơn hàng'),
        },
        {
            title: 'Tên Người đặt',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name', "tên"),

        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            width: 110,
            key: 'createdAt',
            sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
            ...getColumnSearchProps('createdAt', "Ngày đặt hàng"),
            render: (_, record) => (

                <div className="text-sm text-gray-700 line-clamp-4">
                    <p>{moment(record.createdAt).format('l')}</p>
                </div>
            ),
        },
        {
            title: 'Số điện thoại',
            width: 200,
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone', "phone"),

        },
        {
            title: 'Email',
            width: 200,
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email', "email"),
        },

        {
            title: 'Địa chỉ ',
            width: 300,
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            ...getColumnSearchProps('shippingAddress', "Địa chỉ"),

        },
        {
            title: 'Tổng tiền đơn hàng',
            width: 300,
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            // ...getColumnSearchProps('totalAmount', "Địa chỉ"),
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            render: (_, record) => (

                <div >
                    <h1>{formatCurrency(record.totalAmount)}</h1>
                </div>
            )
        },
        {
            title: 'Thông tin bổ sung',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            ...getColumnSearchProps('description', "chi tiết"),
            // render: (_, record) => (

            //     <div className="text-sm text-gray-700 line-clamp-4">
            //         <p className="text-sm text-gray-700 line-clamp-4">{record.description}</p>
            //     </div>

            // ),
            ellipsis: {
                showTitle: false,
            },
            render: (record) => (
                <Tooltip placement="topLeft" title={record}>
                    {record}
                </Tooltip>
            ),

        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (_, record) => (

                <div className='flex items-center flex-col'>
                    <div>
                        <Typography.Link onClick={() => showModalEdit(record)}>
                            Chấp nhận
                        </Typography.Link>
                    </div>
                    <div className='mt-2'>
                        <Typography.Link onClick={() => showModalDelete(record)}>
                            <div className='text-red-600'>hủy</div>
                        </Typography.Link>
                    </div>
                </div>
            )
        },
    ];


    return (
        <>
            {contextHolder}
            <Button
                disabled={disabled}
                type="primary"
                onClick={onSubmit}
                className={`flex  items-center justify-center rounded-md border border-transparent text-base font-medium text-white ${disabled ? " bg-slate-700" : "hover:to-sky-700 hover:from-sky-800 bg-gradient-to-b from-sky-600 to-sky-700"}  `}
            >
                Chấp nhận
            </Button>
            <div className='flex p-2 justify-center'>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="_id"
                    columns={columns}
                    dataSource={products}
                    scroll={{
                        x: 1520,
                        y: "55vh",
                    }}
                    bordered
                    pagination={{
                        showSizeChanger: true, // Hiển thị dropdown cho phép chọn số lượng dữ liệu
                        pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số lượng dữ liệu
                    }}
                />
            </div>


            <Modal title={textApp.TableProduct.title.delete}
                okType="primary text-black border-gray-700"
                open={isModalOpenDelete}
                width={500}
                // style={{ top: 20 }}
                onCancel={handleCancelDelete}>

                <div className='flex'>
                    <ComButton
                        disabled={disabled}
                        type="primary"
                        danger
                        onClick={deleteById}
                    >
                        {textApp.TableProduct.modal.submitDelete}
                    </ComButton>
                    <ComButton
                        type="primary"
                        disabled={disabled}
                        onClick={handleCancelDelete}
                    >
                        {textApp.TableProduct.modal.cancel}
                    </ComButton>
                </div>
            </Modal>
        </>
    )
}
