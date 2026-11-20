import { BookingPayload } from '@/types/booking'
import { baseUrl } from '../config'
import { getTokenFromClient } from '../auth/getTokenFromClient'

export async function createBooking(payload: BookingPayload) {
  try {
    const token = await getTokenFromClient()

    if (!token) {
      throw new Error('Please log in to create a booking')
    }

    const res = await fetch(`${baseUrl}/api/bookings/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(
        res.status === 401
          ? 'Your session has expired. Please log in again.'
          : data.message || 'Failed to create booking'
      )
    }

    return data
  } catch (error) {
    console.error('Create Booking Error:', error)
    throw error
  }
}
