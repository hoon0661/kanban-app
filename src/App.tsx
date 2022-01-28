import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import Trash from "./components/Trash";
import BoardForm from "./components/BoardForm";
import { Scrollbar } from "react-scrollbars-custom";

const Wrapper = styled.div`
  display: flex;
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  height: 80%;
  overflow-y: auto;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObject = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObject);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObject = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObject);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <BoardForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Scrollbar style={{ width: "100%", height: "80%" }}>
            <Boards>
              {Object.keys(toDos).map((boardId) => (
                <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
              ))}
            </Boards>
          </Scrollbar>
        </Wrapper>
        <Trash />
      </DragDropContext>
    </>
  );
}

export default App;
