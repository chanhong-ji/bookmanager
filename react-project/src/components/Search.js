import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { fetchSearchResult } from "../api";
import FlashMessage from "react-flash-message";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 70%;
  background-color: white;
  border-radius: 30px;
`;

const Form = styled.form`
  width: 100%;
  height: 30px;
  background-color: green;
  input {
    width: 100%;
    height: 100%;
  }
`;

const Booklist = styled.ul`
  width: 100%;
  overflow-y: scroll;
  flex-grow: 1;
`;

const BookWrapper = styled.li`
  height: 100px;
  border: 1px solid black;
`;

const Message = styled.div``;

function Book({ isbn, imgUrl, title }) {
  const [showMessage, setShowMessage] = useState(null);
  async function onBtnClick(event) {
    const result = await fetch("/api/book", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ isbn, title }),
    }).then((res) => res.json());
    if (result.type) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(null);
      }, 3000);
    } else {
      setShowMessage(false);
      setTimeout(() => {
        setShowMessage(null);
      }, 3000);
    }
  }

  return (
    <BookWrapper>
      <span>{title}</span>
      <button onClick={onBtnClick}>Add to MY shelve</button>
      {showMessage ? (
        <FlashMessage duration={3000} persistOnHover={true}>
          <Message>추가 되었습니다.</Message>
        </FlashMessage>
      ) : showMessage === false ? (
        <FlashMessage duration={3000} persistOnHover={true}>
          <Message>이미 책장에 있습니다.</Message>
        </FlashMessage>
      ) : null}
    </BookWrapper>
  );
}

function Search() {
  const [total, setTotal] = useState(null);
  const [books, setBooks] = useState([]);
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  function onOverlayClick() {
    history.goBack();
  }
  async function onSearchSubmit({ keyword }) {
    const { total, items } = await fetchSearchResult(keyword);
    setTotal(total);
    setBooks(items);
  }

  return (
    <Overlay onClick={onOverlayClick}>
      <Wrapper
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Form onSubmit={handleSubmit(onSearchSubmit)}>
          <input
            {...register("keyword", { required: true })}
            placeholder="Search Book..."
          />
        </Form>
        <Booklist>
          <span>{total}</span>
          {books.map((book, index) => {
            return (
              <Book
                key={index}
                title={book.title.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                isbn={book.isbn.split(" ")[0]}
                imgUrl={book.image}
              />
            );
          })}
        </Booklist>
      </Wrapper>
    </Overlay>
  );
}

export default Search;
