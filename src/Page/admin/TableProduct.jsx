
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

import { Table } from 'antd';
import { textApp } from '../../TextContent/textApp';
import { getData, postData } from '../../api/api';
import { firebaseImgs } from '../../upImgFirebase/firebaseImgs';
import ComHeaderAdmin from '../Components/ComHeaderAdmin/ComHeaderAdmin';


export default function CreateProduct() {
    const [disabled, setDisabled] = useState(false);
    const [image, setImages] = useState([]);
    const [products, setProducts] = useState([]);


    const CreateProductMessenger = yup.object({

        name: yup.string().required(textApp.CreateProduct.message.name),
        price: yup.string().required(textApp.CreateProduct.message.price),
        quantity: yup.string().required(textApp.CreateProduct.message.quantity),
        detail: yup.string().required(textApp.CreateProduct.message.detail),
        models: yup.string().required(textApp.CreateProduct.message.models),
        material: yup.string().required(textApp.CreateProduct.message.material),
        accessory: yup.string().required(textApp.CreateProduct.message.accessory),
        // image: yup.string().required(textApp.CreateProduct.message.image),
        // describe: yup.string().required(textApp.CreateProduct.message.describe),
        // email: yup.string().email('định dạng sai').required('Login ID is required email'),
    })
    const CreateProductRequestDefault = {


    };
    const methods = useForm({
        resolver: yupResolver(CreateProductMessenger),
        defaultValues: {
            name: "",
            price: "",
            quantity: "",
            detail: "",
            models: "",
            material: "",
            accessory: "",
            image: [],
            describe: "",
        },
        values: CreateProductRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods

    const onSubmit = (data) => {
        console.log(data);
        setDisabled(true)
        firebaseImgs(image)
            .then((dataImg) => {
                console.log('ảnh nè : ', dataImg);
                const updatedData = {
                    ...data, // Giữ lại các trường dữ liệu hiện có trong data
                    image: dataImg, // Thêm trường images chứa đường dẫn ảnh
                };

                postData('/product', updatedData, {})
                    .then((dataS) => {
                        console.log(dataS);
                        setDisabled(false)
                    })
                    .catch((error) => {
                        console.error("Error fetching items:", error);
                        setDisabled(false)
                    });
            }
            )
            .catch((error) => {
                console.log(error)
            });


    }

    useEffect(() => {
        getData('/product', {})
            .then((data) => {


                setProducts(data?.data?.docs)

                setDisabled(false)
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
                setDisabled(false)
            });
    }, []);
    console.log(products);
    const onChange = (data) => {
        const selectedImages = data;
        // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
        const newImages = selectedImages.map((file) => file.originFileObj);
        // Cập nhật trạng thái 'image' bằng danh sách tệp mới
        setImages(newImages);

    }
    const columns = [
        {
            title: 'Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Price',
            width: 100,
            dataIndex: 'price',
            key: 'price',
            fixed: 'left',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'quantity',
            width: 100,
            dataIndex: 'quantity',
            key: 'quantity',
            fixed: 'left',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'updatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'detail',
            dataIndex: 'detail',
            key: '1',
        },
        {
            title: 'models',
            dataIndex: 'models',
            key: 'models',
        },
        {
            title: 'accessory',
            dataIndex: 'accessory',
            key: 'accessory',
        },
        {
            title: 'material',
            dataIndex: 'material',
            key: 'material',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>,
        },
    ];


    return (
        <>
            <ComHeaderAdmin />
            <div className='flex p-5'>
                <Table
                    columns={columns}
                    dataSource={products}
                    scroll={{
                        x: 1500,
                        y: 700,
                    }}
                    bordered
                    pagination={{
                        showSizeChanger: true, // Hiển thị dropdown cho phép chọn số lượng dữ liệu
                        pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số lượng dữ liệu
                    }}
                />
            </div>

        </>
    )
}
