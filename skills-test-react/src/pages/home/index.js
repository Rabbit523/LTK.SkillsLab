import * as React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import {
  IconButton,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import IconDelete from "@mui/icons-material/Delete";
import AccountMenu from "../../components/AccountMenu";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleOnClick = () => {
    navigate("/todo");
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  return (
    <Container maxWidth="sm">
      <AccountMenu onClick={handleOnClick} />
      <Table aria-label="todos table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo, idx) => (
            <TableRow key={idx}>
              <TableCell>{todo.firstName}</TableCell>
              <TableCell>{todo.lastName}</TableCell>
              <TableCell>{todo.email}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => handleDelete(todo.id)}
                >
                  <IconDelete />
                  Delete
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
