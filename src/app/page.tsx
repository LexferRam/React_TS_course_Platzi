"use client"
import { useState } from "react";
import RandomFox from "@/components/RandomFox";

const random = (): number => Math.floor(Math.random()*123)+1

export default function Home() {
  const [images, setImages] = useState<string[]>([
    `https://randomfox.ca/images/${random()}.jpg`,
    `https://randomfox.ca/images/${random()}.jpg`,
    `https://randomfox.ca/images/${random()}.jpg`,
    `https://randomfox.ca/images/${random()}.jpg`
  ])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Hello Platzi</h1>
      {images.map((image,index) => (
        <div key={index} className="p-4">
          <RandomFox image={image} />
        </div>
      ))}
    </main>
  )
}
