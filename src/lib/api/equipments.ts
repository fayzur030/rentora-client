import { Equipment, MyEquipment, PopularEquipments } from '@/types/equipment'
import { baseUrl } from '../config'
import { getTokenFromServer } from '../auth/getTokenFromServer'

export const getAllEquipments = async (query = ''): Promise<Equipment[]> => {
  const res = await fetch(`${baseUrl}/api/equipment/equipments?${query}`, {
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}

// get equipmentById

export const getEquipmentById = async (id: string): Promise<Equipment> => {
  const token = await getTokenFromServer()

  if (!token) {
    throw new Error('Please log in to view equipment details')
  }

  const res = await fetch(`${baseUrl}/api/equipment/equipment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipment')
  }

  return result.data
}

// owner dashboard: => my equipment

export const getMyEquipments = async (): Promise<MyEquipment> => {
  const token = await getTokenFromServer()

  if (!token) {
    throw new Error('Please log in to view equipment details')
  }
  const res = await fetch(`${baseUrl}/api/equipment/my-equipments`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipment')
  }

  return result.data
}

// admin dashboard all equipment

export const getAllAdminEquipments = async (): Promise<Equipment[]> => {
  const token = await getTokenFromServer()

  const res = await fetch(`${baseUrl}/api/equipment/admin/equipments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}

//todo: category equipments

export const getPopularEquipments = async (): Promise<PopularEquipments[]> => {
  const res = await fetch(`${baseUrl}/api/equipment/popular-equipments`, {
    cache: 'no-store',
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}

// get recently added equipment

export const getRecentlyAddedEquipments = async (): Promise<Equipment[]> => {
  const res = await fetch(
    `${baseUrl}/api/equipment/recently-added-equipments`,
    {
      cache: 'no-store',
    }
  )
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}
