import React, { useRef, useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  let getPasswords = async () => {
    const req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    if (passwords) {
      setpasswordArray(passwords);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copytext = (text) => {
    toast("Text Copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/closedeye.png"))
      ref.current.src = "icons/eyeopen.png";
    else if (ref.current.src.includes("icons/eyeopen.png"))
      ref.current.src = "icons/closedeye.png";
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error in Format", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const deletePassword = async (id) => {
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(passwordArray.filter(item=>item.id!==id))
    // );
    let res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast("Site Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = async (id) => {
    setForm({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="container mx-auto  text-center items-center">
        <h1 className="text-4xl text-center">
          <span className="text-green-700">&lt;i</span>
          <span>Pass</span>
          <span className="text-green-700">/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center mb-5">
          Your Own Password Manager
        </p>
        <div className="text-white flex flex-col p-4 gap-6">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter Website URL"
            className="bg-white rounded-full border border-green-500 w-full text-black px-4 py-0.5"
            type="text"
            id=""
          />
          <div className="flex w-full gap-10 ">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              className="bg-white rounded-full border border-green-500 w-full text-black px-4 py-0.5"
              type="text"
              id=""
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Password"
                className="bg-white rounded-full border border-green-500 w-full text-black px-4 py-0.5"
                type="password"
                id=""
              />
              <span
                className="absolute right-2.5 cursor-pointer top-2 text-black"
                onClick={showPassword}
              >
                {/* <img ref={ref} src="icons/eyeopen.png" width={15} alt="" /> */}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={savePassword}
          className="cursor-pointer bg-green-400 rounded-full w-fit p-2 hover:bg-green-500 ease-in-out duration-200"
        >
          Add Password
        </button>
        <h2 className="mt-3 text-lg font-bold text-green-950">
          Your Passwords
        </h2>
        {passwordArray.length === 0 && (
          <div className="mt-3 text-lg font-bold text-green-950">
            No Passwords To Show
          </div>
        )}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full mt-3 overflow-hidden rounded-xl mx-auto">
            <thead className="bg-green-800">
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-50">
              {passwordArray.map((item, index) => {
                return (
                  <tr className="" key={index}>
                    <td>
                      <div className="flex justify-center mr-4">
                        <a href={item.site} target="_blank" className="">
                          {item.site}
                        </a>{" "}
                        <span
                          onClick={() => {
                            copytext(item.site);
                          }}
                          className="cursor-pointer mt-1 ml-1"
                        >
                          <FaCopy />
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex justify-center mr-4">
                        {item.username}{" "}
                        <span
                          onClick={() => {
                            copytext(item.username);
                          }}
                          className="cursor-pointer mt-1 ml-1"
                        >
                          <FaCopy />
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex justify-center mr-4">
                        {"*".repeat(item.password.length)}
                        <span
                          onClick={() => {
                            copytext(item.password);
                          }}
                          className="cursor-pointer mt-1 ml-1"
                        >
                          <FaCopy />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex">
                        <span
                          className="mr-2 cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <MdDelete />
                        </span>
                        <span
                          className="cursor-pointer "
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <FaEdit />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
