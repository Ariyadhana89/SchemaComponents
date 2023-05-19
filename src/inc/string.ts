export const camelTextToTitleText = (keyName: string) => {
  const titleText = keyName.replace(/([A-Z])/g, " $1");
  return titleText.charAt(0).toUpperCase() + titleText.slice(1);
};
