import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/navLogo.svg"
        alt="Rentora"
        width={40}
        height={40}
      />

      <span className="text-2xl font-extrabold text-foreground">
        Rent<span className="text-[#F5A623]">ora</span>
      </span>
    </Link>
  )
}

export default Logo