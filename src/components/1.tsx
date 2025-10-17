export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
}) => {
  const res = await api.get(`/notes`, {
    params: { page, perPage, search },
  });
  return res.data;
};





