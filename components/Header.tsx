import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

function Header() {
  
    const[isScrolled, setIsScrolled] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0){
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Cleanup - basicamente faz com que o evento não seja executado a cada renderização.
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
    return (
                /* Basicamente está fazendo uma rederização funcional no CSS, nesse caso
                 irá mudar o background do header com base no scroll.*/
    <header className={`${isScrolled && "bg-[#141414]"}`}>
        {/* Left */}
        <div className="flex items-center space-x-2 md:space-x-10">
        {/* Tailwind é feito primeiro para celulares, então quando for fazer o @media do css
        se utiliza o min-width*/}
        {/* SVG Image - Por isso não foi utilizado o componente do NextJS*/}
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 md:flex">
            <li className="headerLink">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
        </ul>
        </div>

        {/* Right */}

        <div className='flex items-center space-x-4 text-sm font-light'>
            
            <SearchIcon className="hidden h-6 w-6 sm:inline"/>
            
            <p className='hidden lg:inline'>Kids</p>
            
            <BellIcon className='h-6 w-6'/>

            {/* <Link href={"/account"}> */}
                <img
                onClick={logout}
                src="https://rb.gy/g1pwyx"
                alt=""
                className="cursor-pointer rounded"
                />
            {/* </Link> */}
        </div>
    </header>
  )
}

export default Header