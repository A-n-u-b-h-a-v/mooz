"use client";
import React, { useState, useEffect } from "react";

const DatenTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h1 className='relative after:content-[""] after:size-3 after:rounded-full after:bg-red-600 after:animate-pulse after:absolute after:right-0 text-4xl font-extrabold lg:text-7xl pe-4 w-fit '>
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
      </h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl">
        {date.toLocaleDateString([], {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </>
  );
};

export default DatenTime;
