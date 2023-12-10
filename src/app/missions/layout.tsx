export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div>
        {children}
      </div> 
    </main>
  )
}
