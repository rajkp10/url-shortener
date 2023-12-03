const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

export { isValidUrl };
