'use client'
import { Progress } from "@/app/components/ui/progress"
import { useEffect, useState } from "react";

export default function Loader() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue(prev => prev + 2.5);
    }, 1000);

    if(value >= 100) clearInterval(intervalId);
    console.log(value);
    return () => {
      clearInterval(intervalId);
    }
  })

  return (
    <Progress value={value} className="m-5 w-4/5 h-6"/>
  )
}
