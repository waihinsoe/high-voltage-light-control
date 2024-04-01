import "./App.css";
import { HomePage } from "./pages/Home";
import socket from "./socket/socket";
import { useEffect } from "react";
function App() {
  // useEffect(() => {
  //   // Request notification permission on component mount
  //   if (Notification.permission !== "granted") {
  //     Notification.requestPermission();
  //   }

  //   socket.on("receive-notification", (message) => {
  //     showNotification(message);
  //   });

  //   return () => {
  //     socket.off("receive-notification");
  //   };
  // }, []);

  // const showNotification = (message) => {
  //   // Check if notification permission is granted

  //   if (Notification.permission === "granted") {
  //     console.log("noti");
  //     new Notification("You have a new message!", {
  //       body: message,
  //       // icon: "/path/to/icon.png", // optional
  //     });
  //     // Note: The system's default notification sound will play (if any) based on user's OS and browser settings
  //   } else {
  //     console.log("Notification permission is not granted.");
  //   }
  // };

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
