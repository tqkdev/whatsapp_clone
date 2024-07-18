'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading/Loading';
import authApiRequest from '@/utils/request';

function FormRegister() {
    const router = useRouter();
    const [IsLoader, setIsLoader] = useState(false);
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: RegisterBodyType) {
        setIsLoader(true);
        // await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/register`, {
        //     body: JSON.stringify(values),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     method: 'POST',
        // }).then((res) => res.json());
        await authApiRequest.register(values);
        setIsLoader(false);
        router.push('/login');
    }

    return (
        <div>
            <div className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Quang Khải" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="nguyenvana@gmail.com" {...field} />
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

                        {/* <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ConfirmPassword</FormLabel>
                                <FormControl>
                                    <Input placeholder="ConfirmPassword" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                        <Button type="submit">Register</Button>
                    </form>
                    <div className="text-center text-sm text-text2">
                        <p>Do you already have an account?</p>
                        <Link className="text-red-400 hover:text-red-500 hover:cursor-pointer" href={'/login'}>
                            Login here
                        </Link>
                    </div>
                </Form>
            </div>

            {IsLoader && <Loading />}
        </div>
    );
}

export default FormRegister;
