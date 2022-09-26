import { useEffect, useState } from "react";
import { Button, Card, Spin, Tag } from "antd";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Meta from "antd/lib/card/Meta";

import { getBook, checkoutBook } from "../../services/bookService";

import "./book.css";

const BookDetailComponent = () => {
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState("checkout");
  const { book_id: bookId } = useParams();

  const buttonStatus = {
    checkout: "Checkout",
    loading: <Spin />,
    success: (
      <>
        <span>Book checkout successfully</span> <CheckOutlined />
      </>
    ),
    reject: (
      <>
        <span>Something went wrong</span> <CloseCircleOutlined />
      </>
    ),
  };

  async function fetchCheckout() {
    try {
      setChecking("loading");
      const response = await checkoutBook(Number(bookId));
      setChecking("success");
    } catch (error) {
      setChecking("reject");
    }
  }

  useEffect(() => {
    async function fetchBook() {
      const book = await getBook(bookId);
      setBook(book);
      setLoading(false);
    }

    fetchBook();
  }, [bookId]);
  return (
    <div className="site-index-detail">
      <Card
        loading={loading}
        className="site-index-card"
      >
        <Meta
          title={book?.title}
          description={book?.description}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        />
        <p className="site-index-card-info">Author: {book?.author}</p>
        <p className="site-index-card-info">
          Published year: {book?.published_year}
        </p>
        <p className="site-index-card-info">Genre: {book?.genre}</p>
        <p className="site-index-card-info">Stock: {book?.stock}</p>
        {book?.stock > 0 ? (
          book?.checkout ? (
            <Tag style={{ margin: "1em" }} color="red">
              You already checkout this book
            </Tag>
          ) : (
            <Button
              className="site-checkout-button"
              onClick={fetchCheckout}
              disabled={checking !== "checkout"}
            >
              {buttonStatus[checking]}
            </Button>
          )
        ) : (
          <p
            style={{
              color: "red",
            }}
            className="site-index-card-info"
          >
            Not available
          </p>
        )}
      </Card>
    </div>
  );
};

export default BookDetailComponent;
