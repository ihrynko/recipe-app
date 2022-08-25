import React, { ReactNode } from 'react';
import { toast } from "react-toastify";

// type NotificationProps = {
//   children: ReactNode;
// };

// function Notification(): JSX.Element {
//   return <>{
//     toast.error("Error! Bad request!", {
//     autoClose: 3000,
//   }),
//   toast.clearWaitingQueue()
//   }</>
// }


export const Notification = () => {

   toast.error("Error! Bad request!", {
    autoClose: 3000,
  }),
  toast.clearWaitingQueue()

      
  
};

