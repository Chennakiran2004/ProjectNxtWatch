const getAuthHeaders = (jwtToken: string): { Authorization: string } => ({
  Authorization: `Bearer ${jwtToken}`,
});
export default getAuthHeaders;
