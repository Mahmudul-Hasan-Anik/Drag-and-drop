import React,{useState} from "react";
import { useDrag } from "react-dnd";
import { SIDEBAR_ITEM } from "../Helpers/constants";
import { Modals } from "./Modals";

export const SideBar = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: SIDEBAR_ITEM,
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });


  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    console.log( event.currentTarget,'aaaaaaaaaaaaaaaa')
    event.stopPropagation();
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  return (
    <>
    <div className="sideBarItem" ref={drag} style={{ opacity }} onClick={handleOpen}>
      {data.component.type}
    </div>
    <Modals
        open={open}
        handleClose={handleClose}
        data={data}
      />
    </>
  );
};



