import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComFooter from "../../Components/ComFooter/ComFooter";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { textApp } from "../../../TextContent/textApp";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import ComInput from "../../Components/ComInput/ComInput";
import ComUpImg from "../../Components/ComUpImg/ComUpImg";
import ComSelect from "../../Components/ComInput/ComSelect";
import ComTextArea from "../../Components/ComInput/ComTextArea";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../../api/api";
import { Button, notification, Checkbox, Upload, Modal } from "antd";

import bird from "../../../../src/img/bird-svgrepo-com.svg";

import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Required(props) {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const dataProduct = location?.state?.dataProduct || null;
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const schema = yup
    .object({
        image: yup
        .string()
        .test("valid-format", "Không đúng định dạng", (value) => {
          return !!value || value === "";
        })
        .required("Hình ảnh là bắt buộc"),

      birdName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Chỉ nhập chữ ")
        .required("Không bỏ trống và chỉ nhập chữ")
        .test("valid-format", "Không đúng định dạng", (value) => {
          return !!value || value === "";
        }),
        // materials: yup
        // .array()
        // .of(yup.string().oneOf(["Gỗ", "Kim loại", "Nhựa"]))
        // .required("Không bỏ trống")
        // .test("valid-format", "Chọn ít nhất một nguyên liêu", (value) => {
        //   return !!value || value === "";
        // }),
      cageNumber: yup
        .number()
        .min(10, "Phải lớn hơn hoặc bằng 10")
        .max(30, "Phải nhỏ hơn hoặc bằng 30")
        .required("Không bỏ trống và phải là số")
        .typeError("Không bỏ trống và phải là số")
        .test("valid-format", "Không đúng định dạng", (value) => {
          return !!value || value === "";
        }),
      email: yup
        .string()
        .email("Không đúng định dạng email")
        .required("Không bỏ trống và phải là email")
        .test("valid-format", "Không đúng định dạng", (value) => {
          return !!value || value === "";
        }),
      phone: yup
        .string()
        .matches(/^\d{10}$/, "Phải là số và có 10 chữ số")
        .required("Không bỏ trống và không quá 10 số")
        .test("valid-format", "Không đúng định dạng", (value) => {
          return !!value || value === "";
        }),
      address: yup
        .string()
        .required("Không bỏ trống")
        .test("valid-format", "Không đúng định dạng", (value) => {
          return !!value || value === "";
        }),
      description: yup
        .string()
        .max(1000, "Nhỏ hơn 1000 ký tự")
        .required("Không bỏ trống")
        .test("valid-format", "Không đúng định dạng", (value) => {
          return !!value || value === "";
        }),
    })
    .required();
  const LoginRequestDefault = {
    image: "",
    birdName: "",
    materials: [],
    cageNumber: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  };
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // code: "",
    },
    values: LoginRequestDefault,
  });
  const promotion = useForm({});
  const { handleSubmit, register, setFocus, watch, setValue } = methods;

  const onSubmit = (data) => {
    setDisabled(true);
    const dataPost = { ...data, products: dataProduct };
    // console.log(dataPost);
    postData("/order/user", dataPost)
      .then((data) => {
        navigate(`bill/${data._id}`);
        setDisabled(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        api["error"]({
          message: textApp.Payment.error,
          description: error.response.data.error,
        });
        setDisabled(false);
      });
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      onError("Không phải file ảnh");
      return;
    }
    try {
      const res = await getBase64(file);
      onSuccess(res);
    } catch (error) {
      onError("Lỗi");
    }
  };

  return (
    <>
      {contextHolder}
      <ComHeader />
      <div className="flex justify-center flex-col py-5 text-center">
        {/* bird */}
        <div className="flex justify-center">
          <img src={bird} alt="bird" className="w-32 h-32" />
        </div>
        <h1 className="text-4xl">{"Đặt hàng theo yêu cầu"}</h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
                <ComInput
                  label="Tên chim"
                  placeholder="Nhập tên chim"
                  {...register("birdName")}
                  pattern="[A-Za-z ]*"
                  required
                />
                <div className="">
                  <ComSelect
                    size={"large"}
                    style={{
                      width: "100%",
                    }}
                    label={textApp.CreateProduct.label.material}
                    placeholder={textApp.CreateProduct.placeholder.material}
                    onChangeValue={handleChange}
                    options={[
                      { value: "Gỗ", label: "Gỗ" },
                      { value: "Kim loại", label: "Kim loại" },
                      { value: "Nhựa", label: "Nhựa" },
                    ]}
                    {...register("material")}
                    {...register("materials")}
                    required
                  />
                </div>

                <ComInput
                  label="Số nan"
                  placeholder="Nhập số nan"
                  {...register("cageNumber")}
                  min={10}
                  max={30}
                  required
                  defaultValue={10}
                />

                <ComInput
                  label="Email"
                  placeholder="Nhập email"
                  type="email"
                  {...register("email")}
                  defaultValue={user.email}
                  required
                />

                <ComInput
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  type="tel"
                  {...register("phone")}
                  defaultValue={user.phone}
                  required
                />
                <ComInput
                  label="Địa chỉ"
                  {...register("address")}
                  defaultValue={user.address}
                  required
                />
                <ComTextArea
                  label="Yêu cầu"
                  placeholder="Nhập yêu cầu về lồng chim"
                  {...register("description")}
                  rows={4}
                  maxLength={1000}
                />
              </div>
              {/* <div className="flex flex-col">
                <label className="text-paragraph font-bold">
                  Hình ảnh
                  <span className="text-red-500">*</span>
                </label>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  customRequest={customUpload}
                  // {...register("image")}
                  required
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </div> */}
               <label className="text-paragraph font-bold">
                  Hình ảnh
                  <span className="text-red-500">*</span>
                </label>
              <ComUpImg
                onChange={(value) => {
                  setValue("image", value);
                }}
                required
              />

              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
              <Button
                disabled={disabled}
                className="bg-blue-500 h-12 text-white py-3 px-6 rounded-lg w-full mb-6"
                type="primary"
                htmlType="submit"
              >
                {textApp.Payment.orderButton}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      <ComFooter />
    </>
  );
}
