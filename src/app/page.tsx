import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black">
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Hero />
        </div>
      </div>
    </div>
  )
}
