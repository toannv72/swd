
export const textApp = {

    common: {
        button: {
            login: "Đăng nhập",
            reissue: "Reissue",
            createProduct: "Tạo sản phẩm"
        }
    },
    Login: {
        pageTitle: "Đăng nhập",
        label: {
            username: "Tài khoản",
            password: "Password"
        },
        placeholder: {
            username: "Please enter you Login ID",
            password: "Please enter you password"
        },
        message: {
            username: "Login ID is required item",
            password: "Password is required item",
            error: "Tài khoản hoặc mật khẩu sai"
        }
    },
    Reissue: {
        pageTitle: "Tạo tài khoản",
        label: {
            username: "Tên đăng nhập",
            password: "Mật Khẩu",
            password2: "Xác nhận lại mật khẩu",
            phone: "Số điện thoại",
            email: "Email"
        },
        placeholder: {
            username: "Please enter you Login User",
            phone: "Please enter you phone",
            email: "Please enter you email",
            password: "Please enter you password",
            password2: "Please enter you password",
        },
        message: {
            username: "Login User is required item",
            usernameMIn: "Tài khoản phải lớn hơn 6 kí tự",
            phone: "Phone is required item",
            password: "Password is required item",
            password2: "Password is required item",
            passwordMIn: "Mật khẩu phải lớn hơn hoặc bằng 5 kí tự",
            email: "Email is required item",
            emailFormat: "Định dạng mail không hợp lệ.",
            passwordCheck: "Mật khẩu nhập lại không khớp.",
        }
    },
    CreateProduct: {
        pageTitle: "Create Product",
        label: {
            name: "Tên sản phẩm",
            price: "Giá tiền gốc",
            reducedPrice: "Giá tiền giảm",
            shape: "Hình dáng",
            quantity: "Số lượng sản phẩm",
            detail: "detail",
            models: "models",
            material: "Chất liệu",
            accessory: "accessory",
            sold: "sold",
            image: 'Img',
            description: "Chi tiết sản phẩm",
        },
        placeholder: {
            name: "Please enter Product Name",
            price: "Please enter price",
            quantity: "Please enter quantity",
            shape: "Vui lòng nhập hình dáng sản phẩm",
            detail: "Please enter detail",
            models: "Please enter models",
            material: "Please enter material",
            accessory: "Please enter accessory",
            sold: "Please enter sold",
            image: "Please enter Img",
            description: "Please enter Describe",
        },
        message: {
            name: "name is required item",
            price: "price is required item",
            priceMin: "phải lớn hơn hoặc bằng 1",
            shape: "Yêu cầu này là bắt buộc",
            priceDecimal: "Số tiền không được là số thập phân ",
            quantity: "quantity is required item",
            quantityMin: "phải lớn hơn hoặc bằng 1",
            detail: "detail is required item",
            models: "models is required item",
            material: "material is required item",
            accessory: "accessory is required item",
            sold: "sold is required item",
            image: "image is required item",
            description: "description is required item",
        },
        Notification: {
            m1: {
                message: "Lỗi",
                description: "Giá tiền phải là số nguyên!"
            },
            m2: {
                message: "Thành công",
                description: "Tạo sản phẩm thành công!"
            },
            m3: {
                message: "Lỗi",
                description: "Tạo sản phẩm không thành công!"
            },
            m4: {
                message: "Lỗi",
                description: "Vui lòng chọn Chất liệu sản phẩm!"
            },
            m5: {
                message: "Lỗi",
                description: "Vui lòng chọn ít nhất một ảnh cho sản phẩm!"
            }
        }
    },
    TableProduct: {
        title: {
            change: "Chỉnh sửa",
            delete: 'Xóa sản phẩm'
        },
        modal: {
            cancel: "Hủy",
            submitChange: "Thay đổi",
            submitDelete: "Xóa"
        },
        Notification: {
            delete: {
                message: "Thành công!",
                description: "Đã xóa sản phẩm!"
            },
            deleteError: {
                message: "Thất bại!",
                description: "Vui lòng kiểm tra lại hoặc báo cho kĩ thuật!"
            },
            change: {
                message: "Thành công!",
                description: "Vui lòng chọn Chất liệu sản phẩm!"
            }
        }
    },
    Product: {
        title: {

        },
        page: {
            quantity: "Số lượng",
            material: "Chất Liệu :",
            shape: "Hình Dáng :"
        },
        message: {
            name: "name is required item",
            price: "price is required item",
            quantity: "quantity is required item",
            detail: "detail is required item",
            models: "models is required item",
            material: "material is required item",
            accessory: "accessory is required item",
            sold: "sold is required item",
            image: "image is required item",
            description: "description is required item",
        }
    },
    Footer: {
        contact: {
            title: "Thông tin liên hệ",
            adress: "Địa chỉ: LôE2a Đường D1, Thành phố Thủ Đức",
            email: "Email: banlongchim@gmail.com",
            phone: "Số điện thoại: (0123) 456-7890",
        },

        aboutUs: {
            title: "Thông tin",
            infor: "Về chúng tôi",
            info1: "Sản phẩm",
            info2: "Chính sách bảo mật",
            info3: "Điều khoản sử dụng"
        },
        ship: {
            title: "Thông tin vận chuyển",
            freeShip: "Miễn phí vận chuyển cho đơn hàng trên 1.000.000 VND",
            time: "Thời gian vận chuyển: 3-5 ngày làm việc"
        },
        send: {
            field: "Nhập địa chỉ email",
            submit: "Gửi"
        }
    },
    HeaderAdmin: {
        product: "Sản phẩm",
    },
    Header: {
        search: "Tìm kiếm...",
    }

}
