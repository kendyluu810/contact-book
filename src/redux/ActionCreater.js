import axios from "axios";
import {
  AddRequest,
  DeleteRequest,
  UpdateRequest,
  getAllRequestFail,
  getAllRequestSuccess,
  getByCodeSuccess,
  makeRequest,
} from "./Action";
import { toast } from "react-toastify";

export const GetAllContact = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    setTimeout(() => {
      axios
        .get("http://localhost:8000/contact")
        .then((res) => {
          const _list = res.data;
          dispatch(getAllRequestSuccess(_list));
        })
        .catch((err) => {
          dispatch(getAllRequestFail(err.message));
        });
    }, 1000);
  };
};

export const CreateContact = (data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/contact", data)
      .then((res) => {
        dispatch(AddRequest(data));
        toast.success("Contact created successfully.");
      })
      .catch((err) => {
        toast.error("Failed to create contact due to" + err.message);
      });
  };
};

export const UpdateContact = (data) => {
  return (dispatch) => {
    axios
      .put("http://localhost:8000/contact/" + data.id, data)
      .then((res) => {
        dispatch(UpdateRequest(data));
        toast.success("Contact updated successfully.");
      })
      .catch((err) => {
        toast.error("Failed to update contact due to" + err.message);
      });
  };
};

export const DeleteContact = (code) => {
  return (dispatch) => {
    axios
      .delete("http://localhost:8000/contact/" + code)
      .then((res) => {
        dispatch(DeleteRequest(code));
        toast.success("Contact deleted successfully.");
      })
      .catch((err) => {
        toast.error("Failed to delete contact due to" + err.message);
      });
  };
};

export const GetContactByCode = (code) => {
  return (dispatch) => {
    axios
      .get("http://localhost:8000/contact/" + code)
      .then((res) => {
        const _obj = res.data;
        dispatch(getByCodeSuccess(_obj));
      })
      .catch((err) => {
        toast.error("Failed to fetch data ");
      });
  };
};
