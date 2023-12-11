export default function MissionLayout({
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
