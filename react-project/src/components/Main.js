import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Shelves = styled.article``;

function Main() {
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/shelves");
    })();
  }, []);

  function onDragEnd() {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="shelves" direction="vertical" type="shelve">
        {(provided, info) => {
          return (
            <Shelves
              ref={provided.innerRef}
              {...provided.droppableProps}
            ></Shelves>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default Main;
