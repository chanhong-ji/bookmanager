import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Book = styled.div`
  height: 100%;
  width: 100px;
  background-color: pink;
  border: 2px solid black;
`;

function DraggableBook({ index, title, bookId, imgUrl }) {
  return (
    <Draggable draggableId={bookId + ""} index={index}>
      {(provided, info) => {
        return (
          <Book
            key={bookId + ""}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {title}
          </Book>
        );
      }}
    </Draggable>
  );
}

export default DraggableBook;
