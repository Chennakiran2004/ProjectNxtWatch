type APIResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

const fetchApi = async (
  url: string,
  options: RequestInit
): Promise<APIResponse> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      return { success: true, data };
    }
    return { success: false, data };
  } catch (error) {
    return { success: false, error };
  }
};

export default fetchApi;
