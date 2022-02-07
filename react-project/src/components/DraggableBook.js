import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Book = styled.div`
  height: 100%;
  width: 100px;
  background-color: pink;
`;

function DraggableBook({ index, title, bookId, imgUrl }) {
  return (
    <Draggable draggableId={bookId} index={index}>
      {(provided, info) => {
        return (
          <Book
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
