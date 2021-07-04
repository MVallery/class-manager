import React from "react";
import { useSelector } from "react-redux";
import ButtonColor from "./ButtonColor";
import ButtonSelect from "./ButtonSelect";

const Desk = (props) => {
  const { smallStyle, record, index } = props;
  const activeClass = useSelector((state) => state.activeClass);

  var studentCountStyle =
    record.count > 0
      ? "student-count-style-positive"
      : record.count < 0
      ? "student-count-style-negative"
      : null;
  var darkDesks =
    activeClass.styling.theme === "darkPurpleBlue" ? { color: "white" } : null;
  return (
    <React.Fragment>
      <div className="desk-top" style={props.backgroundStyle}></div>
      <div
        className={`desk ${smallStyle.smallFont}`}
        style={{ ...props.backgroundLightStyle, ...darkDesks }}
      >
        {smallStyle && (
          <span
            className={
              record.name.length < 9
                ? "student-name name-small"
                : "student-name name-xsmall"
            }
          >
            {" "}
            {record.name}
          </span>
        )}
        {!smallStyle && (
          <span
            className={
              record.name.length < 9
                ? "student-name name-large"
                : "student-name name-medium"
            }
          >
            {record.name}
          </span>
        )}

        <div className={`desk-button-main-container`}>
          <div className="desk-button-container">
            <ButtonColor
              index={index}
              record={record}
              smallStyle={smallStyle}
            />
            <ButtonSelect
              index={index}
              record={record}
              smallStyle={smallStyle}
            />
          </div>
          <p className={studentCountStyle}>{record.count}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Desk;
