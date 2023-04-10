import React, { FC } from 'react';

export interface ITaskItem {
  id: string | number;
  name: string;
  status: string | boolean;
}

const TaskItem: FC<ITaskItem> = ({ id, name, status }) => {
  return (
    <li
      className="flex flex-col p-2 border border-red-500 rounded-md hover:bg-defaultBlack hover:text-white cursor-pointer hover:border-2"
      key={id}
    >
      <p>{name}</p>
      <p>Completed: {String(status).toLocaleUpperCase()}</p>
    </li>
  );
};

export default TaskItem;
