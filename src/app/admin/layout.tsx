import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Auth check will be added when Supabase is connected
  return (
    <div className="min-h-screen bg-charcoal text-offwhite">
      {children}
    </div>
  )
}
