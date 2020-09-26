import { mainState } from "./APIStore";
import React, { useState } from "react";
export const MyContext = React.createContext();

export default function ContextWrapper({ children }) {
  const [state, setState] = useState(mainState);

  const HandleChangeStandard = (value, chapterId, headingId, subheadingId) => {
    const newState = state;
    if (chapterId && headingId && subheadingId) {
      newState.children[chapterId].children[headingId].children[
        subheadingId
      ].name = value;
    } else if (chapterId && headingId) {
      newState.children[chapterId].children[headingId].name = value;
    } else if (chapterId) {
      newState.children[chapterId].name = value;
    }

    setState({ ...newState });
  };

  const trashStandard = (chapterId, headingId, subheadingId) => {
    const newState = state;

    if (chapterId && headingId && subheadingId) {
      newState.children[chapterId].children[
        headingId
      ].childrenAllIds = newState.children[chapterId].children[
        headingId
      ].childrenAllIds.filter((id) => id !== subheadingId);
      delete newState.children[chapterId].children[headingId].children[
        subheadingId
      ];
    } else if (chapterId && headingId) {
      newState.children[chapterId].childrenAllIds = newState.children[
        chapterId
      ].childrenAllIds.filter((id) => id !== headingId);
      delete newState.children[chapterId].children[headingId];
    } else if (chapterId) {
      newState.childrenAllIds = newState.childrenAllIds.filter(
        (id) => id !== chapterId
      );
      delete newState.children[chapterId];
    }

    setState({ ...newState });
  };

  const addStandard = (currentStandard, newStandard) => {
    const newState = state;
    const newId = Math.random();
    if (currentStandard === "CHAPTER") {
      newState.childrenAllIds = [...newState.childrenAllIds, newId];
      newState.children[newId] = {
        name: newStandard,
        children: {},
        childrenAllIds: [],
      };
    } else if (currentStandard === "HEADING") {
      const getLastChapterId =
        newState.childrenAllIds[newState.childrenAllIds.length - 1];

      newState.children[getLastChapterId].childrenAllIds = [
        ...newState.children[getLastChapterId].childrenAllIds,
        newId,
      ];
      newState.children[getLastChapterId].children[newId] = {
        name: newStandard,
        children: {},
        childrenAllIds: [],
      };
      setState({ ...newState });
    } else if (currentStandard === "SUBHEADING") {
      const getLastChapterId =
        newState.childrenAllIds[newState.childrenAllIds.length - 1];

      const getLastHeadingId =
        newState.children[getLastChapterId].childrenAllIds[
          newState.children[getLastChapterId].childrenAllIds.length - 1
        ];
      const getLastHeadingChildren =
        newState.children[getLastChapterId].children[getLastHeadingId];

      getLastHeadingChildren.children[newId] = { name: newStandard };
      getLastHeadingChildren.childrenAllIds = [
        ...getLastHeadingChildren.childrenAllIds,
        newId,
      ];
    }
  };

  const handleIndent = (chapterId, headingId, subHeadingId) => {
    const newState = state;

    if (chapterId && headingId && subHeadingId) {
      alert("Maximum intend level reached.");
    } else if (chapterId && headingId) {
      const { children, childrenAllIds } = newState.children[chapterId];
      const { name } = children[headingId];

      const getPreviousHeadingOrder =
        childrenAllIds.findIndex((id) => id === headingId) - 1;

      if (getPreviousHeadingOrder === -1) {
        alert("Your Chapter is having no heading.");
      } else {
        const takeAllHeadingIds = children[headingId].childrenAllIds.splice(
          0,
          children[headingId].childrenAllIds.length
        );

        const previousHeadId = childrenAllIds[getPreviousHeadingOrder];

        children[previousHeadId].children[headingId] = {
          name,
          children: {},
          childrenAllIds: [],
        };
        /*
         *   Merging the Children
         */

        children[previousHeadId].childrenAllIds = [
          ...children[previousHeadId].childrenAllIds,
          headingId,
          ...takeAllHeadingIds,
        ];

        for (const i of takeAllHeadingIds) {
          children[previousHeadId].children[i] = {
            name: children[headingId].children[i].name,
            children: {},
            childrenAllIds: [],
          };
        }
        delete children[headingId];

        const newChildrenAllIds = childrenAllIds.filter(
          (id) => id !== headingId
        );

        newState.children[chapterId].childrenAllIds = newChildrenAllIds;

        setState({ ...state });
      }
    } else if (chapterId) {
      if (newState.childrenAllIds.length === 1) {
        alert("One Chapter cannot be Subhead.");
      } else {
        /**
         * Moving from chapter
         * to heading and making sub-heading
         * */
        const { name } = newState.children[chapterId];
        const { children, childrenAllIds } = newState;

        const getAllCurrentChapterId = children[chapterId].childrenAllIds;
        const getBeforeChapterIndex =
          childrenAllIds.findIndex((id) => id === chapterId) - 1;
        const getBeforeChapterId = childrenAllIds[getBeforeChapterIndex];

        children[getBeforeChapterId].children[chapterId] = {
          name,
          childrenAllIds: [],
          children: {},
        };

        children[getBeforeChapterId].childrenAllIds = [
          ...children[getBeforeChapterId].childrenAllIds,
          chapterId,
        ];

        for (const i of getAllCurrentChapterId) {
          children[getBeforeChapterId].childrenAllIds = [
            ...children[getBeforeChapterId].childrenAllIds,
            i,
          ];
          const childNamesOfHeading = children[chapterId].children[i].name;
          children[getBeforeChapterId].children[i] = {
            name: childNamesOfHeading,
            children: {},
            childrenAllIds: [],
          };
        }

        const newChildrenAllIds = childrenAllIds.filter(
          (id) => id !== chapterId
        );
        newState.childrenAllIds = newChildrenAllIds;
        delete newState.children[chapterId];

        setState({ ...newState });
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
      /* from heading
       * to chapter
       */
      const { children, childrenAllIds } = newState;
      const { name } = children[chapterId].children[headingId];
      const findHeadingIndex = children[chapterId].childrenAllIds.findIndex(
        (id) => id === headingId
      );

      if (children[chapterId].children[headingId].childrenAllIds.length !== 0) {
        alert("You have Sub-heading to settle.");
      } else if (findHeadingIndex) {
        const slicingChildren = children[chapterId].childrenAllIds.slice(
          findHeadingIndex,
          children[chapterId].childrenAllIds.length
        );
        slicingChildren.shift();

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
        }

        children[chapterId].childrenAllIds = children[
          chapterId
        ].childrenAllIds.slice(0, findHeadingIndex);

        for (const i of slicingChildren) {
          delete children[chapterId].children[i];
        }
        delete children[chapterId].children[headingId];

        const getChapterIndex = childrenAllIds.findIndex(
          (id) => id === chapterId
        );
        newState.childrenAllIds.splice(getChapterIndex + 1, 0, headingId);

        setState({ ...newState });
      } else {
        alert("No heading but sub headings are there.");
      }
    } else if (chapterId) {
      alert("Maximum outdent level reached.");
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
