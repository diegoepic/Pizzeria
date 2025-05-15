

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Pizza() {
  const { id } = useParams()
  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/pizzas/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      })
      .then(data => {
        setPizza(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error al cargar pizza:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Cargando pizza…</p>
  if (error)   return <p>Error: {error}</p>
  if (!pizza) return <p>Pizza no encontrada</p>

  return (
    <div>
      <h1>Detalle de Pizza {pizza.id}</h1>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p><strong>Precio:</strong> ${pizza.price}</p>
    
      <button
        onClick={async () => {
          const res = await fetch('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: pizza.id })
          })
          if (res.ok) alert('Añadido al carrito')
          else        alert('Error al añadir al carrito')
        }}
      >
        Añadir al carrito
      </button>
    </div>
  )
}
