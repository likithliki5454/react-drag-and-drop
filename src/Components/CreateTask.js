import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, settasks }) => {
  const [data, setdata] = useState({
    id: '',
    name: '',
    status: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setdata((prevData) => ({
      ...prevData,
      id: uuidv4(),
      name: e.target.value,
    }));
  };

  const handleRadioButtonChange = (e) => {
    setdata({
      ...data,
      status: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name.length < 3) return alert('Please fill the correct name...');

    settasks((prev) => {
      const list = [...prev, data];
      window.localStorage.setItem('storeddata', JSON.stringify(list));
      return list;
    });

    setdata({
      id: '',
      name: '',
      status: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-10 w-64"
        onChange={handleChange}
        value={data.name}
      />
      <div className='p-10'>
        <label className='p-5'>
          <input
            type="radio"
            value="todo"
            checked={data.status === 'todo'}
            onChange={handleRadioButtonChange}
          />
          TODO
        </label>

        <label className='p-5'>
          <input
            type="radio"
            value="progress"
            checked={data.status === 'progress'}
            onChange={handleRadioButtonChange}
          />
          PROGRESS
        </label>

        <label className='p-5'>
          <input
            type="radio"
            value="completed"
            checked={data.status === 'completed'}
            onChange={handleRadioButtonChange}
          />
          COMPLETED
        </label>
      </div>
      <button className="bg-cyan-500 rounded-md px-4 h-10 text-white">create</button>
    </form>
  );
};

export default CreateTask;
