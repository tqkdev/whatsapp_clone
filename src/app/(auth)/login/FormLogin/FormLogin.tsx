'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import { useToast } from '@/components/ui/use-toast';

function FormLogin() {
    const { toast } = useToast();
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    // async function onSubmit(values: LoginBodyType) {
    //     const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/login`, {
    //         body: JSON.stringify(values),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         method: 'POST',
    //         credentials: 'include',
    //     }).then((res) => res.json());
    //     console.log(result);
    // }

    async function onSubmit(values: LoginBodyType) {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/login`, {
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                credentials: 'include',
            }).then(async (res) => {
                const payload = await res.json();
                const data = { status: res.status, payload };
                if (!res.ok) {
                    throw data;
                }
                return data;
            });
        } catch (error: any) {
            const errors = (error as any).payload.errors as { field: string; message: string }[];
            const status = error.status as number;
            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as 'username' | 'password', {
                        type: 'sever',
                        message: error.message,
                    });
                });
            } else {
                toast({
                    title: 'Lỗi',
                    description: error.payload.message,
                });
            }
        }
    }
    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
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
    );
}

export default FormLogin;
