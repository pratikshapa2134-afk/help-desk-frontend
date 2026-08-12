import API from './api';

export const getTickets = async () => {
  const { data } = await API.get('/tickets');
  return data;
};

export const createTicket = async (ticketData) => {
  const { data } = await API.post('/tickets', ticketData);
  return data;
};