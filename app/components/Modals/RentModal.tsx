"use client"
import React,{ useState, useMemo } from 'react'
import Modal from './Modal'
import { useRentModal } from '@/app/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../Navbar/Categories'
import CategoryInput from '../Inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../Inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../Inputs/Counter'
import ImageUpload from '../Inputs/ImageUpload'
import Input from '../Inputs/Input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION =4,
    PRICE = 5,
}

const RentModal = () => {

    const rentModal = useRentModal()
    const router = useRouter()

    const [isLoading,setIsLoading] = useState<boolean>(false)

    const [step,setStep] = useState(STEPS.CATEGORY)

    const {register, handleSubmit, setValue, watch, formState: {
        errors,
    }, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }),[location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    } 

    const onBack = () => setStep((value) => value - 1)
    const onNext = () => setStep((value) => value + 1)

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) return "Create"
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) return undefined
        return 'Back'
    },[step])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE) return onNext()
        setIsLoading(true)
        axios.post('/api/listings',data).then(() => {
            toast.success('Listing Created!')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        }).catch(() => {
            toast.error('Something went wrong!')
        })
    }

    let bodyContent = (
        <div className='flex flex-col gap-8' >
            <Heading
            title='Which of these best describe your place?'
            subtitle='Pick a category'
            />
            <div className='grid grid-cols-2 md:grid-cols-2 gap-2 max-h-[50vh] overflow-auto'>
                {
                    categories.map((item,index) => (
                        <div
                        key={`rentModalCategoryMap${index}`}
                        className='col-span-1'
                        >
                           <CategoryInput
                           onClick={(category) => setCustomValue('category',category)} 
                           selected={category === item.label}
                           label={item.label}
                           icon={item.icon}
                           />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8' >
                <Heading
                title='Where is your place Located?'
                subtitle='Help guests find you.'
                />
                <CountrySelect
                onChange={(value) => setCustomValue('location',value)}
                value={location}
                />
                <Map
                center={location?.latlng}
                />
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8' >
                <Heading
                title='Share some basics about your place'
                subtitle='What amenities do you have?'
                />
                <Counter
                title='Guests'
                subtitle='how many guests do you allow?'
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount',value) }
                />
                <hr />
                <Counter
                title='Rooms'
                subtitle='how many rooms do you provide?'
                value={roomCount}
                onChange={(value) => setCustomValue('roomCount',value) }
                />
                <hr />
                <Counter
                title='Bathrooms'
                subtitle='how many bathrooms do you provide?'
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount',value) }
                />
                <hr />
            </div>
        )
    }

    if(step === STEPS.IMAGES) {
         bodyContent = (
            <div className='flex flex-col gap-8' >
                <Heading
                title='Add a photo of your place'
                subtitle='show guests how your place looks like!'
                />
                <ImageUpload 
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8' >
                <Heading
                title='How would you explain your place?'
                subtitle='short and sweet works the best!'
                />
                <Input
                id='title'
                label='Title'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr />
                <Input
                id='description'
                label='Description'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }

    if(step === STEPS.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8' >
                <Heading
                title='Now,set your Price'
                subtitle='How much do you charge per night?' 
                />
                <Input
                id='price'
                label='Price'
                formatPrice
                type='number'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }

  return (
    <Modal
    title='Airbnb your home!'
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    body={bodyContent}
    disabled={false}
    />
  )
}

export default RentModal