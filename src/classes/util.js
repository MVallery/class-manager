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

export const getPointStyle = record => {
  let style = record.pointStyle === "positive"
    ? {
        backgroundColor: "#50f150",
        backgroundImage:
          "radial-gradient(circle, transparent 40%, #e3f7e3, #c8fdc8, #7ef17e, transparent)",
        transition: "background 1s",
        transitionTimingFunction: "ease-in",
        borderRadius: "45%",
      }
    : record.pointStyle === "negative"
    ? {
        backgroundColor: "red",
        backgroundImage:
          "radial-gradient(circle, transparent 40%, #ffc8c4, #ffe6e6, white)",
        transition: "background 0.5s",
        transitionTimingFunction: "ease-out",
        borderRadius: "45%",
      }
    : null;
return style
  
}