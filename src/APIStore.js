export const mainState = {
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
          children: {
            1005: {
              name: "c-1 h-1 s-1",
            },
            1006: {
              name: "c-1 h-1 s-2",
            },
            1007: {
              name: "c-1 h-1 s-3",
            },
            1008: {
              name: "c-1 h-1 s-2",
            },
          },
          childrenAllIds: [1005, 1006, 1007, 1008],
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
        105: {
          name: "h-5",
          children: {},
          childrenAllIds: [],
        },
      },
      childrenAllIds: [101, 102, 103, 104, 105],
    },
  },
  childrenAllIds: [1],
};