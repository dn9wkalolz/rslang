export const getPageLimit = (page: number): number[] => [page * 20, page * 20 + 19];

export const getStringDate = () => {
  const d = new Date();
  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();
  return [year, month, day].join('/');
};
