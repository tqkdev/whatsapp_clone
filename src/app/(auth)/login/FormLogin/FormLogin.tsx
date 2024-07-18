'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/Loading/Loading';
import authApiRequest from '@/utils/request';

function FormLogin() {
    const [IsLoader, setIsLoader] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    async function onSubmit(values: LoginBodyType) {
        setIsLoader(true);
        try {
            // const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/login`, {
            //     body: JSON.stringify(values),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     method: 'POST',
            //     credentials: 'include',
            // }).then(async (res) => {
            //     const payload = await res.json();
            //     const data = { status: res.status, payload };
            //     if (!res.ok) {
            //         throw data;
            //     }
            //     return data;
            // });
            // console.log(result);
            const result = await authApiRequest.login(values);
            console.log(result);

            localStorage.setItem('userID', result.payload?.data?.id);
            localStorage.setItem('username', result.payload?.data?.user?.username);

            await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify(result),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(async (res) => {
                const payload = await res.json();
                const data = { status: res.status, payload };
                if (!res.ok) {
                    throw data;
                }
                return data;
            });

            setIsLoader(false);
            router.push('/');
        } catch (error: any) {
            setIsLoader(false);
            const errors = (error as any).payload.errors as { field: string; message: string }[];
            const status = error.status as number;
            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as 'email' | 'password', {
                        type: 'sever',
                        message: error.message,
                    });
                });
            } else {
                toast({
                    title: 'Lỗi',
                    description: error.payload.message,
                    variant: 'destructive',
                });
            }
        }
    }
    return (
        <div>
            <div className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button>Login</Button>
                    </form>
                    <div className="text-center text-sm text-text2">
                        <p>Create an account here?</p>
                        <Link className="text-red-400 hover:text-red-500 hover:cursor-pointer" href={'/register'}>
                            Register
                        </Link>
                    </div>
                </Form>
            </div>
            {IsLoader && <Loading />}
        </div>
    );
}

export default FormLogin;
