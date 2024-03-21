import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { todoAdd, todoEdit, todoRemove } from "./redux/todoReducer";
import "./App.css";

function App() {
  const local = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [retur, setReturn] = useState(false);
  const [update, setUpdate] = useState('');
  const todos = useSelector((state) => state.todos.value);
  const dispatch = useDispatch();
  const name = useRef();
  const age = useRef();
  const desc = useRef();
  const editName = useRef();
  const editAge = useRef();
  const editDesc = useRef();

  function validate(name, age, desc) {
    if (!name.current.value) {
      name.current.focus();
      setError1(true);
      setError2(false);
      setError3(false);
      return false;
    }
    if (!age.current.value) {
      age.current.focus();
      setError3(false);
      setError1(false);
      setError2(true);
      return false;
    }
    if (!desc.current.value) {
      desc.current.focus();
      setError1(false);
      setError2(false);
      setError3(true);
      return false;
    }
    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    const isValid = validate(name, age, desc);

    if (isValid) {
      let todo = {
        id: Date.now(),
        name: name.current.value,
        age: age.current.value,
        desc: desc.current.value,
      };

      name.current.value = "";
      age.current.value = "";
      desc.current.value = "";
      setError3(false);

      dispatch(todoAdd(todo));
      local.push(todo);
      console.log(local);
      localStorage.setItem("todos", JSON.stringify(local));
    }
  }

  function deleted(id) {
    const isDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (isDelete) {
      dispatch(todoRemove(id));
      let copied = local.filter((el) => {
        return el.id != id;
      });
      localStorage.setItem("todos", JSON.stringify(copied));
    }
  }

  function edited(el) {
    setReturn(true)
    setUpdate(el);
  }

  function handleEdit() {
    let avatar = {
            id:update.id,
            name:editName.current.value == '' ? update.name : editName.current.value,
            age: editAge.current.value == '' ? update.age : editAge.current.value,
            desc:editDesc.current.value == '' ? update.desc : editDesc.current.value
        }
        console.log(avatar);
        dispatch(todoEdit(avatar));
        let copied = local.map(el => {
          if (el.id == avatar.id) {
            el = avatar;
          }
          return el;
        });
        localStorage.setItem('todos', JSON.stringify(copied));
        editName.current.value = ''
        editAge.current.value = ''
        editDesc.current.value = ''
        setReturn(false)
  }

  return (
    <>
      <div className="todos w-75 mx-auto ">
        <h1 className="text-center mt-2 mb-3 ">Users</h1>

        {/* MODAl  */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Name
                    </label>
                    <input
                      ref={editName}
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Age
                    </label>
                    <input
                      ref={editAge}
                      type="number"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Description
                    </label>
                    <input
                      ref={editDesc}
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleEdit}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss={retur ? `modal` : ""}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <form
          className="w-75 mx-auto  p-4 "
          style={{ border: "8px outset grey" }}
        >
          <div className={`form-floating ${!error1 && "mb-3"}`}>
            <input
              ref={name}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          {error1 && (
            <p className="text-danger mx-1">Name bo'sh bo'lishi mumkin emas</p>
          )}
          <div className="form-floating">
            <input
              ref={age}
              type="number"
              className="form-control"
              id="floatingPassword"
              placeholder="Number"
            />
            <label htmlFor="floatingPassword">Age</label>
          </div>
          {error2 && (
            <p className="text-danger mx-1">Age bo'sh bo'lishi mumkin emas</p>
          )}
          <div className="form-floating mt-3">
            <textarea
              ref={desc}
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
            ></textarea>
            <label htmlFor="floatingTextarea">Comments</label>
          </div>
          {error3 && (
            <p className="text-danger mx-1">
              Comments bo'sh bo'lishi mumkin emas
            </p>
          )}
          <button onClick={handleClick} className="btn btn-success w-100 mt-3">
            Add
          </button>
        </form>

        {/* TABLE  */}
        <table className="table table-striped table-hover table-dark mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0
              ? todos.map((el, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{el.name}</td>
                      <td>{el.age}</td>
                      <td>{el.desc}</td>
                      <td>
                        <i
                          onClick={() => deleted(el.id)}
                          className="fa-solid fa-trash-can fs-5"
                          style={{ cursor: "pointer" }}
                        ></i>
                        <i
                          onClick={() => edited(el)}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          data-bs-whatever="@mdo"
                          className="fa-solid fa-pen-to-square mx-3 fs-5"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              : local.length > 0 &&
                local.map((el, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{el.name}</td>
                      <td>{el.age}</td>
                      <td>{el.desc}</td>
                      <td>
                        <i
                          onClick={() => deleted(el.id)}
                          className="fa-solid fa-trash-can fs-5"
                          style={{ cursor: "pointer" }}
                        ></i>
                        <i
                          onClick={() => edited(el)}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          data-bs-whatever="@mdo"
                          className="fa-solid fa-pen-to-square mx-3 fs-5"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
