import type { DemoTrendPoint, DemoUser } from '../../lib/demo/types'

export type RestaurantOrder = {
  id: string
  customer: string
  channel: string
  items: string
  amount: string
  status: 'Queued' | 'Cooking' | 'Ready' | 'Delivered'
}

export type RestaurantMenuItem = {
  id: string
  name: string
  category: string
  price: string
  availability: 'Available' | 'Sold Out'
}

export type RestaurantCounter = {
  id: string
  rider: string
  orderId: string
  eta: string
  status: 'Assigned' | 'Waiting' | 'Delivered'
}

export type RestaurantState = {
  orders: RestaurantOrder[]
  menu: RestaurantMenuItem[]
  riders: RestaurantCounter[]
  revenueTrend: DemoTrendPoint[]
}

export const restaurantUsers: DemoUser[] = [
  { name: 'Naveena Das', role: 'Outlet Manager', email: 'naveena@demo.qode27', avatar: 'ND' },
  { name: 'Kishore P', role: 'Kitchen Lead', email: 'kishore@demo.qode27', avatar: 'KP' },
  { name: 'Ibrahim S', role: 'Dispatch Counter', email: 'ibrahim@demo.qode27', avatar: 'IS' },
]

export function createRestaurantState(): RestaurantState {
  return {
    orders: [
      { id: 'ORD-201', customer: 'Rhea K', channel: 'Swiggy', items: '2 Burrito Bowls', amount: 'Rs 560', status: 'Cooking' },
      { id: 'ORD-204', customer: 'Walk-in #52', channel: 'Counter', items: 'Paneer Wrap + Fries', amount: 'Rs 310', status: 'Queued' },
      { id: 'ORD-208', customer: 'Aman P', channel: 'Zomato', items: 'Family Combo', amount: 'Rs 890', status: 'Ready' },
      { id: 'ORD-214', customer: 'Diya S', channel: 'Counter', items: 'Pasta + Cold Coffee', amount: 'Rs 420', status: 'Delivered' },
    ],
    menu: [
      { id: 'ITM-01', name: 'Smoky Paneer Bowl', category: 'Bowls', price: 'Rs 260', availability: 'Available' },
      { id: 'ITM-02', name: 'Peri Peri Fries', category: 'Sides', price: 'Rs 120', availability: 'Available' },
      { id: 'ITM-03', name: 'Cheese Burst Pizza Slice', category: 'Fast Food', price: 'Rs 170', availability: 'Sold Out' },
      { id: 'ITM-04', name: 'Cold Coffee', category: 'Beverages', price: 'Rs 140', availability: 'Available' },
    ],
    riders: [
      { id: 'RDR-01', rider: 'Vikram', orderId: 'ORD-208', eta: '08 min', status: 'Assigned' },
      { id: 'RDR-02', rider: 'Sandeep', orderId: 'ORD-214', eta: 'Delivered', status: 'Delivered' },
      { id: 'RDR-03', rider: 'Arif', orderId: 'ORD-221', eta: '05 min', status: 'Waiting' },
    ],
    revenueTrend: [
      { label: '12 PM', value: 8 },
      { label: '2 PM', value: 14 },
      { label: '5 PM', value: 11 },
      { label: '8 PM', value: 19 },
      { label: '10 PM', value: 12 },
    ],
  }
}
