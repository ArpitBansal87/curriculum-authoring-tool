import React, { useContext, useState, useEffect } from "react";
import "./index.scss";
import RightArrow from "./SVG/right-arrow.svg";
import LeftArrow from "./SVG/left-arrow.svg";
import Move from "./SVG/move.svg";
import Trash from "./SVG/trash.svg";
import { MyContext } from "../appContext";

export default function Index() {
  const [currentIndent, setCurrentIndent] = useState("HEADING");
  const [newStandard, setNewStandard] = useState("");
  const getConsumer = useContext(MyContext);
  const { subject, children, childrenAllIds } = getConsumer.state;
  const chapter = children;
  const chapterAllIds = childrenAllIds;

  useEffect(() => {});

  const changeOutdentInput = () => {
    if (currentIndent === "SUBHEADING") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("CHAPTER");
  };
  const changeIndentInput = () => {
    if (currentIndent === "CHAPTER") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("SUBHEADING");
  };
  const {
    handleIndent,
    handleOutdent,
    HandleChangeStandard,
    trashStandard,
    addStandard,
  } = getConsumer;

  const setMarginLeft = (standardType) => {
    const UNITS = "em";
    if (standardType === "CHAPTER") return 0 + UNITS;
    else if (standardType === "HEADING") return 1 + UNITS;
    else if (standardType === "SUBHEADING") return 2 + UNITS;

    return "";
  };

  const handleStandardSummit = (event) => {
    event.preventDefault();
    addStandard(currentIndent, newStandard);
    setNewStandard("");
  };
  return (
    <div className="curriculum-wrapper">
      <div className="subject-heading">
        <b>{subject}</b>
      </div>
      <div className="subjects-wrapper">
        <div className="subjects-heading">
          <div className="heading-wrapper">
            <div className="main-heading">Actions</div>
            <div className="sub-heading">Move, Indent, Outdent, Delete </div>
          </div>
          <div className="heading-wrapper">
            <div className="main-heading">Standard</div>
            <div className="sub-heading">The text of the standard</div>
          </div>
        </div>
        <div className="subject-body">
          {chapterAllIds.map((chapterId) => {
            const { name } = chapter[chapterId];
            const heading = chapter[chapterId].children;
            const headingAllIds = chapter[chapterId].childrenAllIds;
            return (
              <div className="subject-box" key={chapterId}>
                <div className="subject-row">
                  <div className="subject-col">
                    <img className="cursor-pointer" src={Move} alt="move" />{" "}
                    <img
                      className="cursor-pointer"
                      src={LeftArrow}
                      alt="left indent"
                      onClick={() => {
                        handleOutdent(chapterId);
                      }}
                    />{" "}
                    <img
                      className="cursor-pointer"
                      src={RightArrow}
                      alt="right indent"
                      onClick={() => {
                        handleIndent(chapterId);
                      }}
                    />{" "}
                    <img
                      className="cursor-pointer"
                      src={Trash}
                      alt="dustbin"
                      onClick={() => trashStandard(chapterId)}
                    />
                  </div>
                  <div className="subject-col">
                    <div
                      className="level"
                      style={{ marginLeft: `${setMarginLeft("CHAPTER")}` }}
                    />
                  </div>
                  <div className="subject-col">
                    <input
                      className="chapter"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        HandleChangeStandard(event, chapterId)
                      }
                    />
                  </div>
                </div>
                <div className="heading-box">
                  {headingAllIds.map((headingId) => {
                    const { name } = heading[headingId];
                    const subHeadingAllIds = heading[headingId].childrenAllIds;
                    const subHeading = heading[headingId].children;
                    return (
                      <React.Fragment key={headingId}>
                        <div className="heading-row" key={headingId}>
                          <div className="heading-col">
                            <img
                              className="cursor-pointer"
                              src={Move}
                              alt="move"
                            />{" "}
                            <img
                              className="cursor-pointer"
                              src={LeftArrow}
                              alt="left arrow"
                              onClick={() => {
                                handleOutdent(chapterId, headingId);
                              }}
                            />{" "}
                            <img
                              className="cursor-pointer"
                              src={RightArrow}
                              alt="right arrow"
                              onClick={() => {
                                handleIndent(chapterId, headingId);
                              }}
                            />{" "}
                            <img
                              className="cursor-pointer"
                              src={Trash}
                              alt="dustbin"
                              onClick={() =>
                                trashStandard(chapterId, headingId)
                              }
                            />
                          </div>
                          <div className="heading-col">
                            <div
                              className="level"
                              style={{
                                marginLeft: `${setMarginLeft("HEADING")}`,
                              }}
                            />
                          </div>
                          <div className="heading-col">
                            <input
                              className="heading"
                              type="text"
                              value={name}
                              onChange={(event) =>
                                HandleChangeStandard(
                                  event.target.value,
                                  chapterId,
                                  headingId
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="sub-heading-box">
                          {subHeadingAllIds &&
                            subHeadingAllIds.map((subHeadingId) => {
                              const { name } = subHeading[subHeadingId];
                              return (
                                <div
                                  className="sub-heading-row"
                                  key={subHeadingId}
                                >
                                  <div className="sub-heading-col">
                                    <img
                                      className="cursor-pointer"
                                      src={Move}
                                      alt="move"
                                    />{" "}
                                    <img
                                      className="cursor-pointer"
                                      src={LeftArrow}
                                      alt="left arrow"
                                      onClick={() => {
                                        handleOutdent(
                                          chapterId,
                                          headingId,
                                          subHeadingId
                                        );
                                      }}
                                    />{" "}
                                    <img
                                      className="cursor-pointer"
                                      src={RightArrow}
                                      alt="right arrow"
                                      onClick={() =>
                                        handleIndent(
                                          chapterId,
                                          headingId,
                                          subHeadingId
                                        )
                                      }
                                    />{" "}
                                    <img
                                      className="cursor-pointer"
                                      src={Trash}
                                      alt="dustbin"
                                      onClick={() =>
                                        trashStandard(
                                          chapterId,
                                          headingId,
                                          subHeadingId
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="sub-heading-col">
                                    <div
                                      className="level"
                                      style={{
                                        marginLeft: `${setMarginLeft(
                                          "SUBHEADING"
                                        )}`,
                                      }}
                                    />
                                  </div>
                                  <div className="sub-heading-col">
                                    <input
                                      className="sub-heading"
                                      type="text"
                                      value={name}
                                      onChange={(event) =>
                                        HandleChangeStandard(
                                          event.target.value,
                                          chapterId,
                                          headingId,
                                          subHeadingId
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="enter-standard">
        <form onSubmit={handleStandardSummit}>
          <div className="standard-row">
            <div className="standard-col">
              <img className="cursor-pointer" src={Move} alt="move" />{" "}
              <img
                className="cursor-pointer"
                src={LeftArrow}
                alt="left arrow"
                onClick={() => changeOutdentInput()}
              />{" "}
              <img
                className="cursor-pointer"
                src={RightArrow}
                alt="right arrow"
                onClick={() => changeIndentInput()}
              />{" "}
              <img
                className="cursor-pointer"
                src={Trash}
                alt="dustbin"
                onClick={() => trashStandard()}
              />
            </div>
            <div className="standard-col">
              <div
                className="level"
                style={{ marginLeft: `${setMarginLeft(currentIndent)}` }}
              />
            </div>
            <div className="standard-col">
              <input
                className={
                  currentIndent === "CHAPTER"
                    ? "chapter"
                    : currentIndent === "HEADING"
                    ? "heading"
                    : "sub-heading"
                }
                type="text"
                placeholder="Enter the required standard. E.g Mathematics "
                required
                autoFocus
                value={newStandard}
                onChange={(e) => setNewStandard(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="add-standard">
              Add a standard &#10010;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
