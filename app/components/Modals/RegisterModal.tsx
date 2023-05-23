"use client"
import {useCallback, useState} from 'react'
import {signIn} from 'next-auth/react'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'

import axios from "axios"
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form'

import {toast} from 'react-hot-toast'

import { useRegisterModal } from "@/app/hooks/useRegisterModal"
import { setIsLoading } from '@/app/Redux/features/auth'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import { Button } from '../Button'
import { useLoginModal } from '@/app/hooks/useLoginModal'

export const RegisterModal = () => {

    const { register, handleSubmit, formState: { errors} } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    },[registerModal,loginModal])

    const [loading,setLoading]  = useState(false)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        axios.post('/api/register',data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) => toast.error("something went wrong!") )
        .finally(() => setLoading(false))
    }

    const bodyContent = (
        <div className='flex flex-col gap-4' >
            <Heading 
            title='Welcome to Airbnb'
            subtitle='create an account'
            center
            />
            <Input
            id='email'
            register={register}
            label='Email'
            disabled={loading}
            errors={errors}
            required
            />
            <Input
            id='name'
            register={register}
            label='Name'
            disabled={loading}
            errors={errors}
            required
            />
            <Input
            id='password'
            type='password'
            register={register}
            label='Password'
            disabled={loading}
            errors={errors}
            required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-4 flex-col gap-4 mt-3' >
            <hr />
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => { signIn('google') }}
            />
            <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => { signIn('github') }}
            />
            <div className='text-neutral-500 text-center mt-4 font-light' >
                <div className='flex flex-row items-center gap-2 justify-center' >
                    <div>
                        Already have an Account?
                    </div>
                    <div
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline font-semibold' >
                       Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
        disabled={loading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
}