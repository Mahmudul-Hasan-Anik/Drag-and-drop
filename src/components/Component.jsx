import React, { useRef, useState } from "react";
import Modals from "./Modals";
import { useDrag } from "react-dnd";
import { COMPONENT } from "../Helpers/constants";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move"
};
const Component = (props) => {
  const {data, components,path} = props

  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    setOpen(true)
    event.stopPropagation();

    console.log('compo')
  };
  const handleClose = () => setOpen(false);

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: { id: data.id, path },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);


  const component = components[data.id];

  return (
    <>
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
      onClick={handleOpen}
    >
      <div>{data.id}</div>
      <div>{component.content}</div>
    </div>

 {/* MODAL FOR ITEM ID */}
      <Modals
        open={open}
        handleClose={handleClose}
        data={data}
      />
    </>
  );
};
export default Component;
