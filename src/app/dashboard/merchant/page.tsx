"use client";
import { addMerchant } from "@/utils/api/merchant";
import {
  addCategory,
  addSubCategory,
  addTags,
  getCategories,
  getSubCategories,
  getTags,
} from "@/utils/api/statistics";
import { useCurrentContext } from "@/utils/context/CurrentContext";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputRef,
  Row,
  Select,
  SelectProps,
  Space,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";

export default function Merchant() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { isUserVerified, code } = useCurrentContext();

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  // const [fieldToAdd, setFieldToAdd] = useState();

  const categoriesRef = useRef(null);
  const subCategoriesRef = useRef(null);
  const tagsRef = useRef(null);

  async function handleFormSubmit(formData: any) {
    const fieldToBeAppened = {
      merchantType: "Normal",
      code,
    };
    const data = { ...formData, ...fieldToBeAppened };
    try {
      messageApi.loading("Adding merchant");
      await addMerchant(data);
      messageApi.success("Merchant added successfully");
    } catch (error) {
      messageApi.error("Error while adding merchant");
    }
  }

  async function handleAddCategory() {
    //@ts-ignore
    const value = categoriesRef?.current?.input?.value;
    if (value) {
      try {
        const res = await addCategory({
          code,
          category: value,
        });
        setCategoriesOptions(res.data);
        messageApi.success("Category added successfully");
      } catch (error) {
        messageApi.error("Error while Adding categories");
      }
    }
  }
  async function handleAddSubCategory() {
    //@ts-ignore
    const value = subCategoriesRef?.current?.input?.value;
    if (value) {
      try {
        const res = await addSubCategory({
          code,
          subCategory: value,
        });
        setSubCategoriesOptions(res.data);
        messageApi.success("Sub Category added successfully");
      } catch (error) {
        messageApi.error("Error while Adding sub categories");
      }
    }
  }
  async function handleAddTags() {
    //@ts-ignore
    const value = tagsRef?.current?.input.value;
    if (value) {
      try {
        const res = await addTags({ code, tag: value });
        setTagsOptions(res.data);
        messageApi.success("Tag added successfully");
      } catch (error) {
        messageApi.error("Error while Adding tags");
      }
    }
  }

  useEffect(() => {
    async function getCategoriesFromBackend() {
      try {
        const res = await getCategories({ code: "Rywards@123" });
        setCategoriesOptions(res.data);
      } catch (error) {
        messageApi.error("Error while fetching categories");
      }
    }
    async function getSubCategoriesFromBackend() {
      try {
        const res = await getSubCategories({ code: "Rywards@123" });
        setSubCategoriesOptions(res.data);
      } catch (error) {
        messageApi.error("Error while fetching sub categories");
      }
    }
    async function getTagsFromBackend() {
      try {
        const res = await getTags({ code: "Rywards@123" });
        setTagsOptions(res.data);
      } catch (error) {
        messageApi.error("Error while fetching tags");
      }
    }
    getCategoriesFromBackend();
    getSubCategoriesFromBackend();
    getTagsFromBackend();
  }, []);

  if (!isUserVerified) {
    return <div>Not Authorized</div>;
  }

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        // disabled={componentDisabled}
        style={{
          width: "100%",
        }}
        onFinish={handleFormSubmit}
      >
        <SectionHeader title="Basic Details" />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input placeholder="User Email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Merchant Type" name="merchantType">
              <Input
                placeholder="Merchant Type"
                defaultValue={"Normal"}
                value={"Normal"}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <SectionHeader title="Business Details" />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Name"
              name="businessName"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Business Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Category" name="businessCategory">
              <Select
                style={{ width: "100%" }}
                placeholder="Business Category"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        ref={categoriesRef}
                        // value={fieldToAdd}
                        // onChange={(event: any) => {
                        //   setFieldToAdd(event.target.value);
                        // }}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={handleAddCategory}
                      >
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={categoriesOptions.map((item: any) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Sub Category" name="businessSubCategory">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Business Sub Category"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        ref={subCategoriesRef}
                        // value={fieldToAdd}
                        // onChange={(event: any) => {
                        //   setFieldToAdd(event.target.value);
                        // }}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={handleAddSubCategory}
                      >
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={subCategoriesOptions.map((item: any) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="businessDescription"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input placeholder="Business Description" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Phone Number is required" }]}
            >
              <Input placeholder="Phone Number" type="number" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Start Hours"
              name="businessStartHours"
              rules={[{ required: true, message: "Start Hours is required" }]}
            >
              <Input placeholder="Business Start Hours" type="number" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="End Hours"
              name="businessEndHours"
              rules={[{ required: true, message: "End Hours is required" }]}
            >
              <Input placeholder="Business End Hours" type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Weblink"
              name="weblink"
              rules={[{ required: true, message: "Weblink is required" }]}
            >
              <Input placeholder="www.example.com" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Address"
              name="businessAddress"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input placeholder="Business Address" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Country"
              name="businessCountry"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Input placeholder="Business Country" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tags" name="tags">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        ref={tagsRef}
                        // value={fieldToAdd}
                        // onChange={(event: any) => {
                        //   setFieldToAdd(event.target.value);
                        // }}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={handleAddTags}
                      >
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={tagsOptions.map((item: any) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="businessCoordinatesX"
              label="Coordinates X"
              rules={[{ required: true, message: "Coordinates X is required" }]}
            >
              <Input placeholder="Coordinates X" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="businessCoordinatesY"
              label="Coordinates Y"
              rules={[{ required: true, message: "Coordinates Y is required" }]}
            >
              <Input placeholder="Coordinates Y" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Minimum Spend"
              name="businessMinimumSpend"
              rules={[{ required: true, message: "Minimum Spend is required" }]}
            >
              <Input type="number" placeholder="Minimum Spend" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Coupon Description"
              name="coupon_description"
              rules={[
                { required: true, message: "Coupon Description is required" },
              ]}
            >
              <Input placeholder="Enter Coupon Description" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const SectionHeader = ({
  title,
  divider,
}: {
  title: string;
  divider?: "above" | "below";
}) => (
  <>
    {divider === "above" && <Divider />}
    <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>{title}</p>
    {divider === "below" && <Divider />}
  </>
);
