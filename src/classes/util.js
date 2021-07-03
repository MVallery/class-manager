export function getStyle(record, style, snapshot) {
  //ensures that icons do not shift up when moving other ones since we are swapping versus reordering all students.
  if (!snapshot.isDragging) {
    if (record.name === "blank") {
      return { display: "flex" };
    }
    return {
      display: "inline",
    };
  }
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}


