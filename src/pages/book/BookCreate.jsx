import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, Spin, Typography } from "antd";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { getBookGenre, storeBook } from "../../services/bookService";
import "../form.css";

const { Title } = Typography;

const BookCreateComponente = () => {
  const navigate = useNavigate();
  const [genres, setGenre] = useState([]);
  const [saving, setSaving] = useState("checkout");
  const onFinish = async (values) => {
    try {
      setSaving("loading");
      await storeBook(values);
      setSaving("success");
      navigate("/");
    } catch (error) {
      setSaving("reject");
    }
  };

  const layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 8 },
    },
  };

  const buttonStatus = {
    checkout: "Save book",
    loading: <Spin />,
    success: (
      <>
        <span>Book saved successfully</span> <CheckOutlined />
      </>
    ),
    reject: (
      <>
        <span>Something went wrong</span> <CloseCircleOutlined />
      </>
    ),
  };

  useEffect(() => {
    async function fetchGenre() {
      const genre = await getBookGenre();
      setGenre(genre);
    }
    fetchGenre();
  }, []);

  return (
    <div className="site-detail">
      {<Title level={3}>Create book</Title>}
      <Form
        className="site-form"
        {...layout}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Author is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre_id"
          rules={[{ required: true, message: "Genre is required!" }]}
        >
          <Select>
            {genres.map((genre) => (
              <Select.Option value={genre.id} key={genre.id}>
                {genre.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Published year"
          name="published_year"
          rules={[
            {
              required: true,
              message: "Published year is required!",
            },
          ]}
        >
          <Input type="number" max={new Date().getFullYear()} />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Stock is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 24 },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="site-checkout-button"
            disabled={saving !== "checkout"}
          >
            {buttonStatus[saving]}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookCreateComponente;
