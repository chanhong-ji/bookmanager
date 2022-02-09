import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Shelve from "./Shelve";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { shelvesState } from "../atoms";

const Container = styled.div`
  padding-top: 50px;
`;

const Shelves = styled.div`
  padding-top: 100px;
  border: 3px solid black;
  width: 50%;
  min-height: 80vh;
  background-color: grey;
`;

const CategoryForm = styled.form``;

function Main() {
  const [shelves, setShelves] = useRecoilState(shelvesState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();

  function onValid({ category }) {
    setValue("category", "");
    if (shelves.find((shelve) => shelve.category === category)) {
      setError(
        "category",
        { message: "Already declared" },
        { shouldFocus: true }
      );
    } else {
      setShelves((prev) => [...prev, { category, books: [] }]);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <CategoryForm onSubmit={handleSubmit(onValid)}>
          <input
            {...register("category", { required: true })}
            placeholder="New category"
          />
          <span>{errors?.category?.message}</span>
        </CategoryForm>
        <Droppable droppableId="shelves" type="shelve" direction="vertical">
          {(provided, info) => {
            return (
              <Shelves ref={provided.innerRef} {...provided.droppableProps}>
                {shelves.map((shelve, index) => (
                  <Shelve
                    key={shelve._id + ""}
                    category={shelve.category}
                    index={index}
                    books={shelve.books}
                  />
                ))}
                {provided.placeholder}
              </Shelves>
            );
          }}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}

export default Main;
