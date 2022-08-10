import React, { useRef, useState,useEffect } from "react";
import { useDrag } from "react-dnd";
import { COLUMN, ROW, SIDEBAR_ITEM } from "../Helpers/constants";
import DropZone from "../components/DropZone";
import Component from "../components/Component";
import { Resizable } from "re-resizable";


const style = {};
const Column = ({ data, components, handleDrop, path }) => {

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COLUMN,
    item: {
      id: data.id,
      children: data.children,
      path
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
  };

  return (

  <Resizable className='resize'>

    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="base draggable column "
    >
      {data.type}
      {data.children.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
    </Resizable>
  );
};
export default Column;
