import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  darkText?: boolean
}

const Logo = ({ darkText = false }: LogoProps) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/navLogo.svg"
        alt="Rentora"
        width={40}
        height={40}
      />

      <span
        className={`text-2xl font-extrabold tracking-tight ${
          darkText ? 'text-[#171411]' : 'text-white'
        }`}
      >
        Rent<span className="text-[#F5A623]">ora</span>
      </span>
    </Link>
  )
}

export default Logo