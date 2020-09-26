import React, { useState } from "react";
export const MyContext = React.createContext();

const mainState2 = {
  subject: "mathematics",
  children: {
    1: {
      name: "c-1",
      children: {
        101: {
          name: "H-1",
          children: {
            1001: {
              name: "c-1 h-1 s-1",
            },
            1002: {
              name: "c-1 h-1 s-2",
            },
            1003: {
              name: "c-1 h-1 s-3",
            },
            1004: {
              name: "c-1 h-1 s-2",
            },
          },
          childrenAllIds: [1001, 1002, 1003, 1004],
        },
        102: {
          name: "h-2",
          children: {},
          childrenAllIds: [],
        },
      },
      childrenAllIds: [101, 102],
    },
  },
  childrenAllIds: [1],
};

const mainState = {
  subject: "mathematics",
  children: {
    1: {
      name: "c-1",
      children: {
        101: {
          name: "H-1",
          children: {
            1001: {
              name: "c-1 h-1 s-1",
            },
            1002: {
              name: "c-1 h-1 s-2",
            },
            1003: {
              name: "c-1 h-1 s-3",
            },
            1004: {
              name: "c-1 h-1 s-2",
            },
          },
          childrenAllIds: [1001, 1002, 1003, 1004],
        },
        102: {
          name: "h-2",
          children: {},
          childrenAllIds: [],
        },
        103: {
          name: "h-3",
          children: {},
          childrenAllIds: [],
        },
        104: {
          name: "h-4",
          children: {},
          childrenAllIds: [],
        },
      },
      childrenAllIds: [101, 102, 103, 104],
    },
  },
  childrenAllIds: [1],
};

export default function ContextWrapper({ children }) {
  const [state, setState] = useState(mainState);

  const handleIndent = (chapterId, headingId, subHeadingId) => {
    const newState = state;

    if (chapterId && headingId && subHeadingId) {
      alert("Maximum intend reached.");
    } else if (chapterId && headingId) {
      const { children, childrenAllIds } = newState.children[chapterId];
      const { name } = children[headingId];
      const getPreviousIndex =
        childrenAllIds.findIndex((id) => id === headingId) - 1;
      const previousId = childrenAllIds[getPreviousIndex];

      const newSubHeading = {};
      newSubHeading[headingId] = { name };
      children[previousId].children = {
        ...children[previousId].children,
        ...newSubHeading,
      };
      children[previousId].childrenAllIds = [
        ...children[previousId].childrenAllIds,
        headingId,
      ];
      delete children[headingId];
      const newChildrenAllIds = childrenAllIds.filter((id) => id !== headingId);
      const newChildrenObject = newState.children;
      newChildrenObject[chapterId].childrenAllIds = newChildrenAllIds;

      setState({ ...state, children: newChildrenObject });
    } else if (chapterId) {
      if (newState.childrenAllIds.length === 1) {
        alert("One Chapter cannot be Subhead.");
      } else {
        const { name } = newState.children[chapterId];
        /**
         * Moving from chapter
         * to heading and making sub-heading
         * */
        const { children, childrenAllIds } = newState;
        delete children[chapterId];
        const getPreviousIndex =
          childrenAllIds.findIndex((id) => id === chapterId) - 1;
        const previousId = childrenAllIds[getPreviousIndex];
        const newHeading = { name, children: {}, chidrenAllId: [] };
        children[previousId].children[chapterId] = newHeading;
        children[previousId].childrenAllIds = [
          ...children[previousId].childrenAllIds,
          chapterId,
        ];
        const newchildrenAllIds = childrenAllIds.filter(
          (id) => id !== chapterId
        );
        setState({ ...state, children, childrenAllIds: newchildrenAllIds });
      }
    }
  };
  const handleOutdent = (chapterId, headingId, subHeadingId) => {
    const newState = state;
    if (chapterId && headingId && subHeadingId) {
      const { children, childrenAllIds } = newState.children[chapterId];
      const { name } = newState.children[chapterId].children[
        headingId
      ].children[subHeadingId];

      const findSubheadingIndex = children[headingId].childrenAllIds.findIndex(
        (id) => id === subHeadingId
      );

      const extractRemainingSubHeadingIds = children[
        headingId
      ].childrenAllIds.splice(
        findSubheadingIndex + 1,
        children[headingId].childrenAllIds.length
      );
      console.log(children[headingId].childrenAllIds);
      children[subHeadingId] = {
        children: {},
        childrenAllIds: extractRemainingSubHeadingIds,
      };

      const subHeadingChildren = children[headingId].children;

      children[subHeadingId].name = name;
      for (const i of extractRemainingSubHeadingIds) {
        children[subHeadingId].children[i] = {
          name: subHeadingChildren[i].name,
        };
      }

      ///REMOVING ALL ID OF SUBHEADING
      for (const i of children[subHeadingId].childrenAllIds) {
        delete children[headingId].children[i];
      }
      delete children[headingId].children[subHeadingId];
      const findSubheadingIndexDelete = children[
        headingId
      ].childrenAllIds.findIndex((id) => id === subHeadingId);

      children[headingId].childrenAllIds.splice(findSubheadingIndexDelete, 1);

      const getHeadingIndex = childrenAllIds.findIndex(
        (id) => id === headingId
      );
      childrenAllIds.splice(getHeadingIndex + 1, 0, subHeadingId);

      setState({ ...newState });
    } else if (chapterId && headingId) {
      console.log("chapterId" + chapterId);
      console.log("headingId" + headingId);
      const { children, childrenAllIds } = newState;

      console.log(children);
      console.log(childrenAllIds);

      const { name } = children[chapterId].children[headingId];

      console.log(children[chapterId].childrenAllIds);
      const findHeadingIndex = children[chapterId].childrenAllIds.findIndex(
        (id) => id === headingId
      );

      const slicingChildren = children[chapterId].childrenAllIds.slice(
        findHeadingIndex,
        children[chapterId].childrenAllIds.length
      );
      slicingChildren.shift();

      console.log(slicingChildren);

      children[headingId] = {
        name,
        children: {},
        childrenAllIds: slicingChildren,
      };

      for (const i of slicingChildren) {
        children[headingId].children[i] = {
          name: children[chapterId].children[i].name,
          children: {},
          childrenAllIds: [],
        };
      };


      console.log(children[chapterId].childrenAllIds=children[chapterId].childrenAllIds.slice(0,findHeadingIndex));
      /////Deleteing Children of heading///\
      for(const i of slicingChildren){
        delete children[chapterId].children[i];
      }
      delete children[chapterId].children[headingId];

     const getChapterIndex=childrenAllIds.findIndex(id=>id===chapterId)
     newState.childrenAllIds.splice(getChapterIndex+1,0,headingId)

      console.log(newState);
    

     setState({...newState})
    } else if (chapterId) {
      alert("Maximum outdent level.");
    }
  };

  const HandleChangeStandard = (topicId, event) => {};

  const trashStandard = (topicId) => {};

  const addStandard = (currentStandard, newStandard) => {
    const newState = state;
    if (currentStandard === "HEADING") {
      const newId = Math.random();
      const newChildrenAllIds = (newState.childrenAllIds = [
        ...newState.childrenAllIds,
        newId,
      ]);
      const newChapter = {};
      newChapter[newId] = {
        name: newStandard,
        children: { children: {}, childrenAllIds: [] },
        childrenAllIds: [],
      };
      setState({
        ...state,
        childrenAllIds: newChildrenAllIds,
        children: { ...state.children, ...newChapter },
      });
    } else if (currentStandard === "SUB_HEADING") {
    }
  };

  return (
    <MyContext.Provider
      value={{
        state: state,
        handleIndent,
        handleOutdent,
        HandleChangeStandard,
        trashStandard,
        addStandard,
      }}
    >
      <div className="App">{children}</div>
    </MyContext.Provider>
  );
}
