import { fetcherPost, fetcherPostFormData } from "../utils/axios";

export const endpoints = {
    key: "/",
    tyres: "tyres",
    oils: "oils",
    batterys: "batterys",
    tyresdetails: "tyres/tyresdetails"

};

// get portal tyre list
export async function tyres(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.tyres,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// get portal oils list
export async function oils(formValue) {
    try {
      const newData = await fetcherPost([
        endpoints.key + endpoints.oils,
        formValue,
      ]);
      return newData;
    } catch (error) {
      return error;
    }
  }


  // get portal battery list
export async function batterys(formValue) {
    try {
      const newData = await fetcherPost([
        endpoints.key + endpoints.batterys,
        formValue,
      ]);
      return newData;
    } catch (error) {
      return error;
    }
  }

   // get portal battery list
export async function tyresdetails(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.tyresdetails,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}