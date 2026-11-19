import { BookingPayload } from '@/types/booking'
import { baseUrl } from '../config'

export async function createBooking(payload: BookingPayload) {
  try {
    const res = await fetch(`${baseUrl}/api/bookings/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to create booking')
    }

    return data
  } catch (error) {
    console.error('Create Booking Error:', error)
    throw error
  }
}
