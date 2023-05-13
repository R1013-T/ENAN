export const useId = (comma_id: string) => {
  const start_end_id = comma_id.split(",");
  const ids:number[] = [];

  for (let i = Number(start_end_id[0]); i <= Number(start_end_id[1]); ++i) {
    ids.push(i)
  }

  return ids;
};