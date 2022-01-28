import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ITrashProps {
  isDraggingOver: boolean;
}

const Area = styled.div<ITrashProps>`
  color: ${(props) => (props.isDraggingOver ? "#40739e" : "#353b48")};
  text-align: right;
  padding-right: 100px;
  font-size: ${(props) => (props.isDraggingOver ? "70px" : "65px")};
  transition: font-size 0.3s ease-in-out;
`;

function Trash() {
  return (
    <Droppable droppableId="trash">
      {(magic, snapshot) => (
        <Area
          ref={magic.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
          {...magic.droppableProps}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Area>
      )}
    </Droppable>
  );
}

export default Trash;
