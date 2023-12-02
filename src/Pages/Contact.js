import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CreateContact,
  DeleteContact,
  GetAllContact,
  GetContactByCode,
  UpdateContact,
} from "../redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../redux/Action";
import CloseIcon from "@mui/icons-material/Close";

const Contact = (props) => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "phone", name: "Phone" },
    { id: "email", name: "Email" },
    { id: "action", name: "Action" },
  ];

  const dispatch = useDispatch();

  const [id, idChange] = useState(0);
  const [name, nameChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [email, emailChange] = useState("");
  const [open, openChange] = useState(false);

  const [rowperpage, rowperpageChange] = useState(5);
  const [page, pageChange] = useState(0);

  const [isEdit, isEditChange] = useState(false);
  const [title, titleChange] = useState("Add new Contact");

  const editObj = useSelector((state) => state.contact.contactobj);

  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      idChange(editObj.id);
      nameChange(editObj.name);
      phoneChange(editObj.phone);
      emailChange(editObj.email);
    } else {
      clearstate();
    }
  }, [editObj]);

  const handlePageChange = (event, newpage) => {
    pageChange(newpage);
  };

  const handleRowsperpageChange = (event) => {
    rowperpageChange(event.target.value);
    pageChange(0);
  };

  const enable = name.length > 0 && phone.length > 0;
  const addItem = () => {
    isEditChange(false);
    titleChange("Add new contact");
    openPopup();
  };

  const closePopup = () => {
    openChange(false);
  };

  const openPopup = () => {
    openChange(true);
    clearstate();
    dispatch(OpenPopup());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const _obj = { id, name, phone, email };
    if (isEdit) {
      dispatch(UpdateContact(_obj));
    } else {
      dispatch(CreateContact(_obj));
    }
    closePopup();
  };

  const handleEdit = (code) => {
    isEditChange(true);
    titleChange("Update contact");
    openChange(true);
    dispatch(GetContactByCode(code));
  };

  const handleDelete = (code) => {
    if (window.confirm("Do you want to delete?")) {
      dispatch(DeleteContact(code));
    }
  };

  const clearstate = () => {
    idChange(0);
    nameChange("");
    phoneChange("");
    emailChange("");
  };

  useEffect(() => {
    props.loadContact();
  }, []);

  return (
    props.contactstate.isLoading ? <div><h2>Loading...</h2></div>:
    props.contactstate.errorMessage ? <div><h2>{props.contactstate.errorMessage}</h2></div>:
    <div>
      <Paper sx={{ margin: "1%" }}>
        <div
          style={{ margin: "1%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={addItem} variant="contained">
            Add
          </Button>
        </div>
        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "midnightblue" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ color: "white" }}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.contactstate.contactList &&
                  props.contactstate.contactList
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>
                            <Button
                              onClick={(e) => {
                                handleEdit(row.id);
                              }}
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={(e) => {
                                handleDelete(row.id);
                              }}
                              variant="contained"
                              color="error"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            rowsPerPage={rowperpage}
            page={page}
            count={props.contactstate.contactList.length}
            component={"div"}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsperpageChange}
          ></TablePagination>
        </div>
      </Paper>

      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="lg">
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p>{title}</p>
          <IconButton style={{ float: "right" }} onClick={closePopup}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                required
                error={name.length === 0}
                value={name}
                onChange={(e) => {
                  nameChange(e.target.value);
                }}
                variant="outlined"
                label="Name"
              ></TextField>
              <TextField
                required
                error={name.length === 0}
                value={phone}
                onChange={(e) => {
                  phoneChange(e.target.value);
                }}
                variant="outlined"
                label="Phone"
              ></TextField>
              <TextField
                value={email}
                onChange={(e) => {
                  emailChange(e.target.value);
                }}
                vzariant="outlined"
                label="Email"
              ></TextField>
              <Button disabled={!enable} variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    contactstate: state.contact,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    loadContact: () => dispatch(GetAllContact()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Contact);
