"use client"

import Container from "../Container"

import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
import {IoDiamond} from 'react-icons/io5'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!',
    },
    {
        label: 'WindMills',
        icon: GiWindmill,
        description: 'This property is close to or have  windmills!',
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is Modern!',
    },
    {
        label: 'CountrySide',
        icon: TbMountain,
        description: 'This property is in the countryside!',
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool!',
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This property is in an Island!',
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a Lake!',
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities!',
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a Castle!',
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities!',
    },
    {
        label: 'Artic',
        icon: BsSnow,
        description: 'This property is surrounded by snow!',
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is like or is a cave!',
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in a Desert!',
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in the Barn!',
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is Luxurious!',
    },
]

const Categories = () => {

    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    if(!isMainPage) return null

  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto" >
            {
                categories.map((item,index) => (
                    <CategoryBox
                    key={`categoryIndex${index}`}
                    label={item.label}
                    description={item.description}
                    icon={item.icon}
                    selected={category === item.label}
                    />
                ))
            }
        </div>
    </Container>
  )
}

export default Categories