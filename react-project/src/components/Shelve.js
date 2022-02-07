import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableBook from "./DraggableBook";

const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: green;
`;

const CategoryTitle = styled.h1``;

const Area = styled.div``;

function Shelve({ category, index, books }) {
  return (
    <Draggable draggableId={category} index={index}>
      {(provided, info) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <CategoryTitle {...provided.dragHandleProps}>
            {category}
          </CategoryTitle>
          <Droppable droppableId={category} type="book">
            {(provided, info) => {
              return (
                <Area ref={provided.innerRef} {...provided.droppableProps}>
                  {books.map((book, index) => (
                    <DraggableBook
                      key={book._id}
                      index={index}
                      title={book.title}
                      bookId={book._id}
                      Img={book.imgUrl}
                    />
                  ))}
                  {provided.placeholder}
                </Area>
              );
            }}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default Shelve;
