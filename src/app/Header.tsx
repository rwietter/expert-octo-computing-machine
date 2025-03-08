import Link from "next/link"
import { PiDatabaseDuotone, PiHouseLineThin } from "react-icons/pi"

const Header = () => {
  return (
    <header className='w-full  font-medium text-xl
     text-gray-200 p-3  bg-zinc-600/50 backdrop-blur-md'>
      <div className='text-xl font-bold'>
        <Link href='/'>
          <PiHouseLineThin className='inline-block text-xl mr-2' /> Home
        </Link>
        <span className='text-sm font-normal px-2'> / </span>
        <Link href='/bibliometria'>
          <PiDatabaseDuotone className='inline-block text-xl mr-2' /> Dashboard        </Link>
      </div>
    </header>
  )
}

export default Header