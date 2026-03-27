import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const User_creating = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [access, setAccess] = useState("student");
  const [college, setCollege] = useState("");
  const [query, setQuery] = useState("");
  const [colleges, setColleges] = useState([]);
  const [show, setShow] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://book-store-backend-api-rsv8.onrender.com/books/create_user`, {
        username,
        password,
        access,
        college,
      });
      setMessage("User created successfully ");
      setError("");
      setUsername("");
      setPassword("");
      setCollege("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setUsername("");
      setPassword("");
      setCollege("");
      setMessage("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 1) {
        try {
          const res = await axios.get(
            `https://book-store-backend-api-rsv8.onrender.com/books/colleges/${query}`
          );
          setColleges(res.data);
          setShow(true);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        setColleges([]);
        setShow(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (college) => {
    setQuery(college);
    setShow(false);
  };

  return (
    <div className="h-screen flex justify-center align-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <form
          onSubmit={submit}
          className="flex flex-col w-sm gap-2 rounded border-2 border-[#8e9aaf]"
        >
          <div className="m-2 flex flex-col">
            <label htmlFor="name"> Create Username</label>
            <input
              type="text"
              id="name"
              value={username}
              className="border-2 rounded-sm border-[#e5e5e5]"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="m-2 flex flex-col">
            <label htmlFor="password"> Create Password</label>
            <input
              type="password"
              id="password"
              value={password}
              className="border-2 rounded-sm border-[#e5e5e5]"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <select
              name="access"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              className="border-2 border-[#e5e5e5] rounded ml-2 "
            >
              <option value="student">Student</option>
              <option value="library">Library Member</option>
            </select>
          </div>
          <div className="m-2 flex flex-col">
            <label htmlFor="college">Enter college name</label>
            <input
              type="text"
              id="college"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter college"
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />

            {show && colleges.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg z-10">
                {colleges.map((college, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(college)}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {college}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="border-2 bg-blue-600 text-white m-2 rounded"
          >
            Submit
          </button>
        </form>
        {message && (
          <div className="mt-2">
            <p>{message}</p>
          </div>
        )}
        {error && <p>{error}</p>}
        <Link to="/">
          <button className="text-[#48cae4] underline hover:text-[#0077b6]">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default User_creating;
