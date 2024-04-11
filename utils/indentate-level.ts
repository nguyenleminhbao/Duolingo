export const indentationLevelFunc = (cycleIndex: number) => {
  let indentantionLevel;

  if (cycleIndex <= 2) {
    indentantionLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentantionLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentantionLevel = 4 - cycleIndex;
  } else {
    indentantionLevel = cycleIndex - 8;
  }
  return indentantionLevel;
};
