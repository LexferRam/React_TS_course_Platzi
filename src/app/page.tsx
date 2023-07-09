"use client"
import { useState } from "react";
import type { MouseEventHandler } from 'react'
import LazyImage from "@/components/RandomFox";


function generateUniqueId(): string {
  // Get the current timestamp.
  const timestamp = Math.floor(Date.now() / 1000);

  // Generate a random number.
  const randomNumber = Math.random() * 100000;

  // Combine the timestamp and random number to create a unique ID.
  const uniqueId = `${timestamp}${randomNumber}`;

  // Return the unique ID.
  return uniqueId;
}

const random = (): number => Math.floor(Math.random()*123)+1

type ImageItem = {id: string; url: string}

export default function Home() {
  const [images, setImages] = useState<Array<ImageItem>>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {

    const newImageItem: ImageItem = {
      id: generateUniqueId(), 
      url:`https://randomfox.ca/images/${random()}.jpg`
    }

    setImages([
      ...images,
      newImageItem
    ])
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Hello Platzi</h1>
      <button onClick={addNewFox}>Add new fox</button>
      {images.map((image,index) => (
        <div key={index} className="p-4">
          <LazyImage
           src={image.url} 
           width={320} 
           height='auto'
           className="rounded bg-gray-300"
          />
        </div>
      ))}
    </main>
  )
}
