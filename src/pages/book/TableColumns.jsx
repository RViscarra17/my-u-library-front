import { Space } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    responsive: ["md", "lg"],
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`book/${record.key}`}>Show details</Link>
      </Space>
    ),
  },
];

export default columns;
