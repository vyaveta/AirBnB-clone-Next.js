"use client"
import {useState} from 'react'
import {signIn} from 'next-auth/react'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from 'react-icons/fc'

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form'

import {toast} from 'react-hot-toast'

import { useRegisterModal } from "@/app/hooks/useRegisterModal"
import { useLoginModal } from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import { Button } from '../Button'
import { useRouter } from 'next/navigation'

export const LoginModal = () => {

    const { register, handleSubmit, formState: { errors} } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const router = useRouter()

    const [loading,setLoading]  = useState(false)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        signIn('credentials',{
            ...data,
            redirect: false,
        }).then((callback) => {
            setLoading(false)
            if(callback?.ok){
                toast.success('Login success')
                router.refresh()
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4' >
            <Heading 
            title='Welcome back'
            subtitle='Login to your account'
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
            onClick={() => { signIn("github") }}
            />
            <div className='text-neutral-500 text-center mt-4 font-light' >
                <div className='flex flex-row items-center gap-2 justify-center' >
                    <div>
                        Dont have an Account?
                    </div>
                    <div
                    onClick={() => loginModal.onClose()}
                    className='text-neutral-800 cursor-pointer hover:underline font-semibold' >
                       sign up
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
        disabled={loading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
}