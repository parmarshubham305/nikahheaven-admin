/* eslint-disable eqeqeq */
import axios from 'axios';
import config from '../utils/urlConfig';

export const apiHandler = axios.create({
  baseURL: config?.backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// POST REQUEST
export const axiosPost = async (url:string, data:any, token = null) => {
  let response = {} as any;

  try {
    const result = await apiHandler.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200 && response?.data?.error) {
      response.status = false;
      response.data = result.data;
    } else {
      response.status = true;
      response.data = result.data;
    }
  } catch (e:any) {
    if (e.response) {
      if (e.response.status == 400) {
        response.status = false;
        response.message = e.response.data;
      } else if (e.response.status == 403) {
        response.status = false;
        response.message = e.response.data;
      } else if (e.response.status == 500) {
        response.status = false;
        response.message = 'Internal server error';
      } else {
        response.status = false;
        response.message = 'something went wrong';
      }
    }
  }
  return response;
};

// GET REQUEST
export const axiosGet = async (url:string, token:string, isStandalone = false) => {
  let response = {} as any;

  try {
    const result = isStandalone
      ? await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      : await apiHandler.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    if (response.status == 200 && response?.data?.error) {
      response.status = false;
      response.data = result.data;
    } else {
      response.status = true;
      response.data = result.data;
    }
  } catch (e:any) {
    if (e.response.status == 400 || e.response.status == 401) {
      response.status = false;
      response.error = e.response.data.error;
      response.message = e.response;
    } else if (e.response.status == 500) {
      response.status = false;
      response.message = 'Internal server error';
    } else {
      response.status = false;
      response.message = 'Something went wrong';
    }
  }
  return response;
};

export const axiosDelete = async (url:string, token:string, isStandalone = false) => {
  let response = {} as any;

  try {
    const result = isStandalone
      ? await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      : await apiHandler.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    if (response.status == 200 && response?.data?.error) {
      response.status = false;
      response.data = result.data;
    } else {
      response.status = true;
      response.data = result.data;
    }
  } catch (e:any) {
    if (e.response.status == 400 || e.response.status == 401) {
      response.status = false;
      response.error = e.response.data.error;
      response.message = e.response;
    } else if (e.response.status == 500) {
      response.status = false;
      response.message = 'Internal server error';
    } else {
      response.status = false;
      response.message = 'Something went wrong';
    }
  }
  return response;
};
