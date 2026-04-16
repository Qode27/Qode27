import { useState } from 'react'
import { FiClock, FiCoffee, FiShoppingBag, FiTruck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DemoToastStack } from '../../../components/demo/DemoPrimitives'
import Seo from '../../../components/ui/Seo'
import { buildDemoRequestPath, buildDemoWhatsAppHref } from '../../../config/demo-apps'
import { createRestaurantState, restaurantUsers } from '../../../data/demo/restaurant'
import { buildToast } from '../../../lib/demo/mock'
import { useDemoAppState } from '../../../lib/demo/useDemoAppState'
import { useDemoNetworkGuard } from '../../../lib/demo/useDemoNetworkGuard'
import type { DemoAppRouteProps } from '../../../lib/demo/types'

const sections = [['dashboard', 'Service Board'], ['orders', 'Orders'], ['kitchen', 'Kitchen'], ['menu', 'Menu'], ['delivery', 'Delivery']] as const

function sectionHref(section: string) {
  return section === 'dashboard' ? '/demo/restaurant' : `/demo/restaurant/${section}`
}

function FoodBadge({ tone, children }: { tone: 'neutral' | 'positive' | 'warning'; children: string }) {
  const className = tone === 'positive' ? 'bg-emerald-50 text-emerald-700' : tone === 'warning' ? 'bg-orange-50 text-orange-700' : 'bg-rose-50 text-rose-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}

export default function RestaurantDemoPage({ app, section }: DemoAppRouteProps) {
  useDemoNetworkGuard()
  const { state, currentUser, users, switchUser, resetDemo, refreshDemo, isRefreshing, toasts, addToast, patchState } = useDemoAppState({ storageKey: 'qode27-demo-restaurant', createInitialState: createRestaurantState, users: restaurantUsers })
  const activeSection = sections.some(([slug]) => slug === section) ? section ?? 'dashboard' : 'dashboard'
  const [channelFilter, setChannelFilter] = useState('All')

  const updateOrder = (id: string) => {
    patchState((current) => ({ ...current, orders: current.orders.map((order) => order.id !== id ? order : order.status === 'Queued' ? { ...order, status: 'Cooking' } : order.status === 'Cooking' ? { ...order, status: 'Ready' } : order.status === 'Ready' ? { ...order, status: 'Delivered' } : order) }))
    addToast(buildToast('Order status updated', 'Service board changed in local demo state.', 'success'))
  }

  return (
    <>
      <Seo title="Restaurant Order Interactive Demo | Qode27" description="Interactive frontend-only restaurant demo with live orders, kitchen flow, menu items, and delivery tracking." canonicalPath={activeSection === 'dashboard' ? '/demo/restaurant' : `/demo/restaurant/${activeSection}`} />
      <div className="min-h-screen bg-[#fff7ed] text-slate-900">
        <div className="mx-auto max-w-[1650px] px-4 py-4 lg:px-6">
          <header className="rounded-[2rem] border border-orange-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_60%,#fef2f2_100%)] p-6 shadow-[0_24px_60px_rgba(220,38,38,0.08)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-rose-600"><Link to="/" className="font-semibold">Qode27</Link><span className="h-1 w-1 rounded-full bg-rose-300" /><span>Demo Environment - sample data only</span></div><h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">A fast service board for kitchen flow, takeaway orders, and outlet revenue.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">This product is snappier and more hospitality-driven. Orders move through visible service states instead of looking like another admin workspace.</p></div>
              <div className="grid gap-3 sm:grid-cols-2"><select value={currentUser.email} onChange={(event) => { switchUser(event.target.value); addToast(buildToast('Persona switched', 'Outlet view updated for the selected role.', 'info')) }} className="min-h-12 rounded-xl border border-orange-100 bg-white px-4 text-sm outline-none">{users.map((user) => <option key={user.email} value={user.email}>{user.name} · {user.role}</option>)}</select><button type="button" onClick={() => { refreshDemo(); addToast(buildToast('Service board refreshed', 'Kitchen and rider data refreshed locally.', 'info')) }} className="rounded-xl border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-900">{isRefreshing ? 'Refreshing...' : 'Refresh'}</button><button type="button" onClick={() => { resetDemo(); addToast(buildToast('Demo reset', 'Restaurant sample data restored.', 'success')) }} className="rounded-xl border border-orange-100 bg-white px-4 text-sm font-semibold text-slate-900">Reset</button><a href={buildDemoRequestPath(app.name)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">Request tailored demo</a></div>
            </div>
            <nav className="mt-6 flex flex-wrap gap-2">{sections.map(([slug, label]) => <Link key={slug} to={sectionHref(slug)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeSection === slug ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-rose-700'}`}>{label}</Link>)}</nav>
          </header>

          <main className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              {activeSection === 'dashboard' ? <><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[['Orders Today', '286', 'Peak at 8:15 PM'], ['Kitchen SLA', '14 min', '3 orders delayed'], ['Daily Sales', 'Rs 74,800', 'Combo sales up 12%'], ['Live Riders', '9', '2 waiting at counter']].map(([label, value, note]) => <div key={label} className="rounded-[1.5rem] border border-orange-100 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{note}</p></div>)}</section><section className="grid gap-4 md:grid-cols-3">{['Queued', 'Cooking', 'Ready'].map((lane) => <div key={lane} className="rounded-[1.8rem] border border-orange-100 bg-white p-5"><p className="text-xs uppercase tracking-[0.18em] text-rose-600">{lane}</p><div className="mt-4 space-y-3">{state.orders.filter((order) => order.status === lane).map((order) => <div key={order.id} className="rounded-[1rem] border border-orange-100 bg-orange-50/40 p-4"><p className="font-semibold text-slate-950">{order.customer}</p><p className="mt-1 text-sm text-slate-600">{order.items}</p><p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{order.amount} · {order.channel}</p><button type="button" onClick={() => updateOrder(order.id)} className="mt-3 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white">Move next</button></div>)}</div></div>)}</section></> : null}
              {activeSection === 'orders' ? <section className="rounded-[1.8rem] border border-orange-100 bg-white p-6"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><FiShoppingBag className="text-rose-600" /><h3 className="text-2xl font-semibold text-slate-950">Order queue</h3></div><div className="flex gap-2">{['All', 'Counter', 'Swiggy', 'Zomato'].map((channel) => <button key={channel} type="button" onClick={() => setChannelFilter(channel)} className={`rounded-full px-4 py-2 text-sm font-semibold ${channelFilter === channel ? 'bg-rose-600 text-white' : 'bg-orange-50 text-rose-700'}`}>{channel}</button>)}</div></div><div className="mt-6 space-y-3">{state.orders.filter((order) => channelFilter === 'All' || order.channel === channelFilter).map((order) => <div key={order.id} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(220,38,38,0.04)]"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{order.customer}</p><p className="mt-1 text-sm text-slate-600">{order.items}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{order.amount}</span><FoodBadge tone={order.status === 'Delivered' ? 'positive' : order.status === 'Queued' ? 'warning' : 'neutral'}>{order.status}</FoodBadge></div></div></div>)}</div></section> : null}
              {activeSection === 'kitchen' ? <section className="rounded-[1.8rem] border border-orange-100 bg-white p-6"><div className="flex items-center gap-3"><FiCoffee className="text-rose-600" /><h3 className="text-2xl font-semibold text-slate-950">Kitchen prep board</h3></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{state.orders.filter((order) => order.status !== 'Delivered').map((order) => <div key={order.id} className="rounded-[1.2rem] border border-orange-100 bg-orange-50/40 p-5"><p className="text-xs uppercase tracking-[0.18em] text-rose-600">{order.channel}</p><p className="mt-3 text-lg font-semibold text-slate-950">{order.items}</p><p className="mt-2 text-sm text-slate-600">{order.customer}</p><div className="mt-4 flex items-center justify-between"><FoodBadge tone={order.status === 'Queued' ? 'warning' : 'neutral'}>{order.status}</FoodBadge><button type="button" onClick={() => updateOrder(order.id)} className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white">Advance</button></div></div>)}</div></section> : null}
              {activeSection === 'menu' ? <section className="rounded-[1.8rem] border border-orange-100 bg-white p-6"><h3 className="text-2xl font-semibold text-slate-950">Menu engineering</h3><div className="mt-6 grid gap-4 md:grid-cols-2">{state.menu.map((item) => <div key={item.id} className="rounded-[1.2rem] border border-orange-100 bg-orange-50/40 p-5"><p className="text-xs uppercase tracking-[0.18em] text-rose-600">{item.category}</p><p className="mt-3 text-xl font-semibold text-slate-950">{item.name}</p><p className="mt-2 text-sm text-slate-600">{item.price}</p><div className="mt-4"><FoodBadge tone={item.availability === 'Available' ? 'positive' : 'warning'}>{item.availability}</FoodBadge></div></div>)}</div></section> : null}
              {activeSection === 'delivery' ? <section className="rounded-[1.8rem] border border-orange-100 bg-white p-6"><div className="flex items-center gap-3"><FiTruck className="text-rose-600" /><h3 className="text-2xl font-semibold text-slate-950">Delivery and counter dispatch</h3></div><div className="mt-6 space-y-3">{state.riders.map((rider) => <div key={rider.id} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-950">{rider.rider}</p><p className="mt-1 text-sm text-slate-600">{rider.orderId}</p></div><div className="flex items-center gap-3"><span className="text-sm text-slate-600">{rider.eta}</span><FoodBadge tone={rider.status === 'Delivered' ? 'positive' : rider.status === 'Waiting' ? 'warning' : 'neutral'}>{rider.status}</FoodBadge></div></div></div>)}</div></section> : null}
            </div>
            <aside className="space-y-6"><section className="rounded-[1.8rem] border border-orange-100 bg-white p-6"><div className="flex items-center gap-3"><FiClock className="text-rose-600" /><p className="font-semibold text-slate-950">Service note</p></div><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><p>Kitchen, order, and delivery states all share the same local-only service board.</p><p>This route is intentionally brighter and more energetic than the office-style products.</p><p><a href={buildDemoWhatsAppHref(app.name)} className="font-semibold text-rose-700">WhatsApp Qode27</a> for a custom rollout.</p></div></section></aside>
          </main>
        </div>
      </div>
      <DemoToastStack toasts={toasts} />
    </>
  )
}
