import { apiUrl } from "./ApiConfig";

const GetMemberByID = async () => {
  const id = localStorage.getItem("uid");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let result = await fetch(`${apiUrl}/member/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return false;
      }
    }); 

  return result;
};

export { GetMemberByID };

const GetStaffByID = async () => {
  const id = localStorage.getItem("uid");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let result = await fetch(`${apiUrl}/staff/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return false;
      }
    }); 

  return result;
};

export { GetStaffByID };

async function ListLocationReservation() {
  const requestOptions = {
      method: "GET",
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/locationReservation/`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
      if (res.data) {
          console.log("print",res.data);
          return res.data;
      } else {
          return false;
      }
      });

  return res;
}
export { ListLocationReservation };
