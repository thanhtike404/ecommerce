export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

export const fetchCategories = async () => {
  const res = await fetch('/api/v1/dashboard/categories');
  return res.json();
};
