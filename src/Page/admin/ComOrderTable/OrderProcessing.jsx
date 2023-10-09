
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Highlighter from 'react-highlight-words';
import * as yup from "yup"
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Space, Table, Tooltip, Typography, notification } from 'antd';
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


export default function OrderProcessing() {
    const [disabled, setDisabled] = useState(false);
    const [image, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [dataRun, setDataRun] = useState(false);
    const [productRequestDefault, setProductRequestDefault] = useState({});
    const [productPrice, setProductPrice] = useState(1000);
    const [productReducedPrice, setProductReducedPrice] = useState(1000);
    const [productQuantity, setProductQuantity] = useState(1);
    const [api, contextHolder] = notification.useNotification();
    const [selectedMaterials, setSelectedMaterials] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    console.log(productRequestDefault);
    const showModalEdit = (e) => {
        setSelectedMaterials(e.material)
        setProductPrice(e.price)
        setProductReducedPrice(e.reducedPrice)
        setProductQuantity(e.quantity)
        setProductRequestDefault({
            name: e.name,
            price: e.price,
            price1: e.price,
            reducedPrice1: e.reducedPrice,
            reducedPrice: e.reducedPrice,
            quantity: e.quantity,
            detail: e.detail,
            shape: e.shape,
            models: e.models,
            material: e.material,
            accessory: e.accessory,
            description: e.description,
            id: e._id
        })
        setIsModalOpen(true);
    };

    const showModalDelete = (e) => {
        setProductRequestDefault({
            id: e._id
        })
        setIsModalOpenDelete(true);
    };
    const options = [
        {
            label: "Gỗ",
            value: "Gỗ"
        },
        {
            label: "Nhựa",
            value: "Nhựa"
        },
        {
            label: "Kim Loại",
            value: "Kim loại"
        },
    ];

    const handleCancel = () => {
        setIsModalOpen(false);

    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);

    };
    const handleValueChange = (e, value) => {
        setProductPrice(value)
        setValue("price", value, { shouldValidate: true });
    };

    const handleValueChange1 = (e, value) => {
        setProductReducedPrice(value)
        setValue("reducedPrice", value, { shouldValidate: true });
    };
    const handleValueChangeQuantity = (e, value) => {
        setProductQuantity(value)
        setValue("quantity", value, { shouldValidate: true });
    };
    function formatCurrency(number) {
        // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
        return number.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
        });
    }
    const CreateProductMessenger = yup.object({

        name: yup.string().required(textApp.CreateProduct.message.name),
        price: yup.number().min(1, textApp.CreateProduct.message.priceMin).typeError(textApp.CreateProduct.message.price),
        price1: yup.string().required(textApp.CreateProduct.message.price).min(1, textApp.CreateProduct.message.priceMin).test('no-dots', textApp.CreateProduct.message.priceDecimal, value => !value.includes('.')),
        reducedPrice: yup.number().min(1, textApp.CreateProduct.message.priceMin).typeError(textApp.CreateProduct.message.price),
        reducedPrice1: yup.string().required(textApp.CreateProduct.message.price).min(1, textApp.CreateProduct.message.priceMin).test('no-dots', textApp.CreateProduct.message.priceDecimal, value => !value.includes('.')),
        quantity: yup.number().min(0, textApp.CreateProduct.message.quantityMin).typeError(textApp.CreateProduct.message.quantity),
        shape: yup.string().required(textApp.CreateProduct.message.shape),
        material: yup.array().required(textApp.CreateProduct.message.material),
        description: yup.string().required(textApp.CreateProduct.message.description),
    })

    const methods = useForm({
        resolver: yupResolver(CreateProductMessenger),
        defaultValues: {
            name: "",
            price: "",
            quantity: "",
            detail: "",
            material: [],
            models: "",
            accessory: "",
            description: "",
        },
        values: productRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    function isInteger(number) {
        return typeof number === 'number' && isFinite(number) && Math.floor(number) === number;
    }
    const onSubmit = (data) => {
        if (data.price % 1000 !== 0) {
            api["error"]({
                message: textApp.CreateProduct.Notification.m7.message,
                description:
                    textApp.CreateProduct.Notification.m7.description
            });
            return
        }
        if (data.reducedPrice % 1000 !== 0) {
            api["error"]({
                message: textApp.CreateProduct.Notification.m8.message,
                description:
                    textApp.CreateProduct.Notification.m8.description
            });
            return
        }
        if (!isInteger(data.price)) {

            api["error"]({
                message: textApp.CreateProduct.Notification.m1.message,
                description:
                    textApp.CreateProduct.Notification.m1.description
            });
            return
        }

        if (data.material.length === 0) {
            api["error"]({
                message: textApp.CreateProduct.Notification.m4.message,
                description:
                    textApp.CreateProduct.Notification.m4.description
            });
            return
        }


        if (data.price <= data.reducedPrice) {
            api["error"]({
                message: textApp.CreateProduct.Notification.m6.message,
                description:
                    textApp.CreateProduct.Notification.m6.description
            });
            return
        }

        setDisabled(true)
        firebaseImgs(image)
            .then((dataImg) => {
                if (Array.isArray(image) && image.length === 0) {
                    const updatedData = {
                        ...data, // Giữ lại các trường dữ liệu hiện có trong data

                    };

                    putData(`/product`, productRequestDefault.id, updatedData, {})
                        .then((dataS) => {
                            api["success"]({
                                message: textApp.TableProduct.Notification.update.message,
                                description:
                                    textApp.TableProduct.Notification.update.description
                            });
                        })
                        .catch((error) => {
                            api["error"]({
                                message: textApp.TableProduct.Notification.updateFail.message,
                                description:
                                    textApp.TableProduct.Notification.updateFail.description
                            });
                            console.error("Error fetching items:", error);
                            setDisabled(false)
                        });
                } else {
                    const updatedData = {
                        ...data, // Giữ lại các trường dữ liệu hiện có trong data
                        image: dataImg, // Thêm trường images chứa đường dẫn ảnh
                    };
                    putData(`/product`, productRequestDefault.id, updatedData, {})
                        .then((dataS) => {
                            api["success"]({
                                message: textApp.TableProduct.Notification.change.message,
                                description:
                                    textApp.TableProduct.Notification.change.description
                            });
                        })
                        .catch((error) => {
                            console.error("Error fetching items:", error);
                            setDisabled(false)
                            api["error"]({
                                message: textApp.TableProduct.Notification.updateFail.message,
                                description:
                                    textApp.TableProduct.Notification.updateFail.description
                            });
                        });
                }

            }
            )
            .catch((error) => {
                console.log(error)
            });
        setImages([]);
        setDisabled(false)
        setIsModalOpen(false);
        setDataRun(!dataRun)
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
            getData('/product', {})
                .then((data) => {
                    setProducts(data?.data?.docs)
                })
                .catch((error) => {
                    console.error("Error fetching items:", error);
                });

        }, 100);


    }, [dataRun]);

    const onChange = (data) => {
        const selectedImages = data;
        // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
        const newImages = selectedImages.map((file) => file.originFileObj);
        // Cập nhật trạng thái 'image' bằng danh sách tệp mới
        setImages(newImages);

    }
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
            title: 'Ảnh sản phẩm',

            dataIndex: 'image',
            key: 'img',
            fixed: 'left',
            render: (_, record) => (

                <div className='flex items-center justify-center'>
                    <img src={record.image} className='h-24 object-cover object-center   ' alt={record.image} />
                </div>
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            width: 300,
            key: 'name',
            fixed: 'left',

            render: (_, record) => (

                <div >
                    <h1>{record.name}</h1>
                </div>
            ),
            ...getColumnSearchProps('name', 'tên sản phẩm'),
        },
        {
            title: 'Giá Tiền',
            width: 150,
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (_, record) => (

                <div >
                    <h1>{formatCurrency(record.price)}</h1>
                </div>
            )
        },
        {
            title: 'Giá tiền đã giảm',
            width: 150,
            dataIndex: 'reducedPrice',
            key: 'reducedPrice',
            sorter: (a, b) => a.reducedPrice - b.reducedPrice,
            render: (_, record) => (

                <div >
                    <h1>{formatCurrency(record.reducedPrice)}</h1>
                </div>
            )
        },
        {
            title: 'Số lượng',
            width: 100,
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: 110,
            key: 'createdAt',
            sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
            render: (_, record) => (

                <div className="text-sm text-gray-700 line-clamp-4">
                    <p>{moment(record.createdAt).format('l')}</p>
                </div>
            )
        },
        {
            title: 'Ngày chỉnh sửa',
            dataIndex: 'updatedAt',
            width: 110,
            key: 'updatedAt',
            sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
            render: (_, record) => (
                <div className="text-sm text-gray-700 line-clamp-4">
                    <p>{moment(record.updatedAt).format('l')}</p>
                </div>
            )
        },
        {
            title: 'Chất liệu',
            dataIndex: 'material',
            key: 'material',
            render: (_, record) => (

                <div className="text-sm text-gray-700 line-clamp-4">
                    <p>{record.material?.[0]}</p>
                    <p>{record.material?.[1]}</p>
                    <p>{record.material?.[2]}</p>
                </div>


            )
        },
        {
            title: 'Chi tiết sản phẩm',
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

            render: (_, record) => (

                <div className='flex items-center flex-col'>
                    <div>
                        <Typography.Link onClick={() => showModalEdit(record)}>
                            Chỉnh sửa
                        </Typography.Link>
                    </div>
                    <div className='mt-2'>
                        <Typography.Link onClick={() => showModalDelete(record)}>
                            <div className='text-red-600'>  Xóa</div>
                        </Typography.Link>
                    </div>
                </div>
            )
        },
    ];
    const handleChangeSelect = (value) => {
        setSelectedMaterials(value);
    };
    const handleValueChangeSelect = (e, value) => {
        if (value.length === 0) {
            setValue("material", null, { shouldValidate: true });
        } else {
            setValue("material", value, { shouldValidate: true });

        }
    };
    const handleChange = (e, value) => {
        console.log(value);
        setSelectedMaterials(value);
        // setMaterial(value)
        if (value.length === 0) {
            setValue("material", null, { shouldValidate: true });
        } else {
            setValue("material", value, { shouldValidate: true });

        }
        console.log([value]);
    };
    return (
        <>
            {contextHolder}
           
            <div className='flex p-5 justify-center'>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={products}
                    scroll={{
                        x: 1520,
                        y: "70vh",
                    }}
                    bordered
                    pagination={{
                        showSizeChanger: true, // Hiển thị dropdown cho phép chọn số lượng dữ liệu
                        pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số lượng dữ liệu
                    }}
                />
            </div>
            <Modal title={textApp.TableProduct.title.change}
                okType="primary text-black border-gray-700"
                open={isModalOpen}

                width={800}
                style={{ top: 20 }}

                onCancel={handleCancel}>
                <FormProvider {...methods} >
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-xl sm:mt-8">
                        <div className=' overflow-y-auto p-4'>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                                style={{ height: "65vh" }}>
                                <div className="sm:col-span-2">
                                    <div className="mt-2.5">
                                        <ComInput
                                            type="text"
                                            label={textApp.CreateProduct.label.name}
                                            placeholder={textApp.CreateProduct.placeholder.name}
                                            {...register("name")}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <ComNumber
                                        label={textApp.CreateProduct.label.price}
                                        placeholder={textApp.CreateProduct.placeholder.price}
                                        // type="money"
                                        value={productPrice}
                                        defaultValue={productRequestDefault.price}
                                        min={1000}
                                        money
                                        onChangeValue={handleValueChange}
                                        {...register("price1")}
                                        required
                                    />

                                </div>
                                <div>
                                    <ComNumber
                                        label={textApp.CreateProduct.label.reducedPrice}
                                        placeholder={textApp.CreateProduct.placeholder.reducedPrice}
                                        // type="money"
                                        // defaultValue={productRequestDefault.reducedPrice}
                                        min={1000}
                                        value={productReducedPrice}
                                        money
                                        onChangeValue={handleValueChange1}
                                        {...register("reducedPrice1")}
                                        required
                                    />

                                </div>
                                <div>
                                    <ComNumber
                                        label={textApp.CreateProduct.label.quantity}
                                        placeholder={textApp.CreateProduct.placeholder.quantity}
                                        // type="numbers"
                                        min={0}
                                        value={productQuantity}
                                        onChangeValue={handleValueChangeQuantity}
                                        {...register("quantity")}
                                        required
                                    />

                                </div>


                                <div className="">
                                    <ComSelect
                                        size={"large"}
                                        style={{
                                            width: '100%',
                                        }}
                                        label={textApp.CreateProduct.label.material}
                                        placeholder={textApp.CreateProduct.placeholder.material}
                                        required
                                        onChangeValue={handleChange}
                                        value={selectedMaterials}
                                        options={options}
                                        {...register("material")}

                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <ComInput
                                        label={textApp.CreateProduct.label.shape}
                                        placeholder={textApp.CreateProduct.placeholder.shape}
                                        required
                                        type="text"
                                        {...register("shape")}
                                    />
                                </div>
                                {/* <div className="sm:col-span-2">
                                    <ComInput
                                        label={textApp.CreateProduct.label.detail}
                                        placeholder={textApp.CreateProduct.placeholder.detail}
                                        required
                                        type="text"
                                        {...register("detail")}
                                    />
                                </div> */}
                                {/* <div className="sm:col-span-2">
                                    <ComInput
                                        label={textApp.CreateProduct.label.models}
                                        placeholder={textApp.CreateProduct.placeholder.models}
                                        required
                                        type="text"
                                        {...register("models")}
                                    />
                                </div>
    
                                <div className="sm:col-span-2">
                                    <ComInput
                                        label={textApp.CreateProduct.label.accessory}
                                        placeholder={textApp.CreateProduct.placeholder.accessory}
                                        required
                                        type="text"
                                        {...register("accessory")}
                                    />
                                </div> */}


                                <div className="sm:col-span-2">

                                    <div className="mt-2.5">

                                        <ComTextArea
                                            label={textApp.CreateProduct.label.description}
                                            placeholder={textApp.CreateProduct.placeholder.description}
                                            rows={4}
                                            defaultValue={''}
                                            required
                                            maxLength={1000}
                                            {...register("description")}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <ComUpImg onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <ComButton

                                disabled={disabled}
                                htmlType="submit"
                                type="primary"

                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {textApp.common.button.createProduct}
                            </ComButton>
                        </div>
                    </form>
                </FormProvider>

            </Modal>


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
