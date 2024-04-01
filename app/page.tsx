"use client";
import { NotificationContext } from "@/components/NotificationProvider";
import { useCallback, useContext } from "react";

export default function Home() {
  const handleSendNotification = useCallback(() => {
    fetch("/api/notification", { method: "POST", body: JSON.stringify({}) });
  }, []);

  const { isSubscribed } = useContext(NotificationContext);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-100">
        <h1 className="text-white text-3xl">Lorem Ipsum...</h1>
        <h2 className="text-slate-500 text-xl">Lorem ipsum dolor sit amet.</h2>
      </div>
      <div className="w-full">
        <img
          src={"/bg.png"}
          alt="background-image"
          className="w-full max-w-[400px] m-auto"
        />
      </div>
      <div className="w-full">
        {isSubscribed ? (
          <button
            className="w-4/5 max-w-[320px] h-11 m-auto flex justify-center items-center notification-button text-white text-lg font-bold"
            onClick={handleSendNotification}
          >
            Send Notification
          </button>
        ) : (
          <button
            className="w-4/5 max-w-[320px] h-11 m-auto flex justify-center items-center border rounded-md text-white text-lg font-bold cursor-not-allowed"
            disabled
          >
            Wait for Popup
          </button>
        )}
      </div>
    </>
  );
}
