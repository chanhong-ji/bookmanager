import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Shelve from "./Shelve";

const Shelves = styled.div`
  padding-top: 100px;
  border: 3px solid black;
  width: 50%;
  min-height: 80vh;
  background-color: grey;
`;

function Main() {
  const [shelves, setShelves] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { categories, shelves } = await fetch("/api/shelves").then((res) =>
        res.json()
      );
      setShelves(shelves);
      setCategories(categories);
    })();
  }, []);

  function onDragEnd() {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="shelves" type="shelve">
        {(provided, info) => {
          return (
            <Shelves ref={provided.innerRef} {...provided.droppableProps}>
              {categories.map((category, index) => (
                <Shelve
                  key={category}
                  category={category}
                  index={index}
                  books={shelves.filter((book) => book.category === category)}
                />
              ))}
              {provided.placeholder}
            </Shelves>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default Main;
