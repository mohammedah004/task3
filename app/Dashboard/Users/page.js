      'use client';
      import React, { useEffect, useRef, useState } from 'react'
      import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
      import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

      export default function Users() {
      const [status, setStatus] = useState("");
      const nameRef = useRef(null);
      const roleRef = useRef(null);
      const [users, setUsers] = useState([]);
      const [show, setShow] = useState(false);
      const [editElement, SetEditElement] = useState({});

      const roleColors = {
            Admin: "#7c3aed",
            Editor: "#14b8a6",
            User: "green"
      };


      const resetFields = () => {
      nameRef.current.value = "";
      roleRef.current.value = "";
      };

      // دالة المعالجة عند الضغط على Save Changes أو Create User
      function handelSubmit(e) {
            e.preventDefault();
            const name = nameRef.current.value;
            const role = roleRef.current.value;

            if (name === "" || role === "") {
                  alert("Please fill all fields");
                  return;
            }

            if (show) {
                  // إذا كانت النافذة مفتوحة، نقوم بالتعديل
                  updateUser();
            } else {
                  // إذا كانت مغلقة، نقوم بإضافة مستخدم جديد
                  addUser();
            }
      }

      // إضافة مستخدم جديد (POST)
      const addUser = async () => {
            const data = {
                  name: nameRef.current.value,
                  role: roleRef.current.value
            }
            try {
                  const response = await fetch('https://69ef3562112e1b968e242fb4.mockapi.io/db/user', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                  });
                  if (response.ok) {
                  setStatus("User Added Successfully! ✅");
                  getUsers(); // تحديث القائمة
                  resetFields()
                  setTimeout(()=>{
                        setStatus("")
                  },3000)
                  }
            } catch (error) {
                  setStatus("Can not connect to Database 📡");
            }
      }

      // تعديل مستخدم موجود (PUT)
      const updateUser = async () => {
            const data = {
                  name: nameRef.current.value,
                  role: roleRef.current.value
            };
            try {
                  const response = await fetch(`https://69ef3562112e1b968e242fb4.mockapi.io/db/user/${editElement.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                  });
                  if (response.ok) {
                  setStatus("User Updated Successfully! ✅");
                  resetFields()
                  setTimeout(()=>{
                        setStatus("")
                  },3000)
                  setShow(false);
                  getUsers();
                  }
            } catch (error) {
                  setStatus("Update Failed ❌");
            }
      }

      /* Get Users */
      const getUsers = async () => {
            try {
                  const response = await fetch('https://69ef3562112e1b968e242fb4.mockapi.io/db/user');
                  if (response.ok) {
                  const result = await response.json();
                  setUsers(result);
                  }
            } catch (error) {
                  console.log("Error loading users");
            }
      }

      useEffect(() => {
            getUsers();
      }, []);

      /* Delete User */
      const deletUser = async (id) => {
            try {
                  const response = await fetch(`https://69ef3562112e1b968e242fb4.mockapi.io/db/user/${id}`, {
                  method: 'DELETE'
                  })
                  if (response.ok) {
                  setUsers(users.filter((user) => user.id !== id));
                  alert("User deleted successfully!");
                  }
            } catch (error) {
                  alert("Delete failed");
            }
      }

      /* Handling Edit Clicks */
      function handelEditClick(ele) {
            SetEditElement(ele); // تخزين بيانات المستخدم المراد تعديله
            setShow(true); // فتح النافذة
      }

      function handleClose() {
            setShow(false);
            SetEditElement({}); // تفريغ البيانات عند الإغلاق
            resetFields();
      }

      return (
            <>
                  <div className="FormBox" >
                  <form className="UserForm" onSubmit={handelSubmit}>
                        <h3>Add New User</h3>
                        {status && <div style={{ textAlign: 'center', padding: '10px', background: '#eee' }}>{status}</div>}
                        <div className="cont">
                              <div className="field-group">
                              <label>User Name</label>
                              <input type="text" placeholder="Enter Full Name" ref={nameRef} />
                              </div>
                              <div className="field-group">
                              <label>Role</label>
                              <select ref={roleRef} defaultValue="">
                                    <option value="" disabled>Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                    <option value="User">User</option>
                              </select>
                              </div>
                        </div>
                        <button type="submit">Create User</button>
                  </form>
                  </div>

                  <div className="userBox">
                  <h3 className="title">Our Users</h3>
                  {users.map((ele) => (
                        <div className="userCard" key={ele.id}>
                              <div className="inf">
                              <h2>{ele.name}</h2>
                              <h3 className="role" style={{ backgroundColor: roleColors[ele.role] || "black", color: "#fff", padding: "2px 10px", borderRadius: "5px" }}>
                                    {ele.role}
                              </h3>
                              </div>
                              <div className="buttons">
                              <FontAwesomeIcon icon={faEdit} className="icon edit" onClick={() => handelEditClick(ele)} />
                              <FontAwesomeIcon icon={faTrash} className="icon delet" onClick={() => deletUser(ele.id)} />
                              </div>
                        </div>
                  ))}
                  </div>

                  {/* Start PopEdit */}
                  {show && <div className="EditPoP">
                  <form className="EditCard" onSubmit={handelSubmit}>
                        <div className="CardTitle">
                              <h2>Edit The User</h2>
                              <div className="close" onClick={handleClose} style={{ cursor: 'pointer' }}>X</div>
                        </div>
                        <div className="cont">
                              <div className="name">
                              <label>Enter name</label>
                              <input type="text" ref={nameRef} defaultValue={editElement.name} />
                              </div>
                              <div className="field-group">
                              <label>Authorization Role</label>
                              <select ref={roleRef} defaultValue={editElement.role}>
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                    <option value="User">User</option>
                              </select>
                              </div>
                        </div>
                        <button type="submit" style={{ marginTop: '10px', width: '100%' }}>Save Changes</button>
                  </form>
                  </div>}
            </>
      )
      }