"use client"
import React from 'react'

export default function error({error}: {error: Error}) {
  return (
    <div>
        <h1>Some went wrong</h1>
      <p>{error.message}</p>
    </div>
  )
}
