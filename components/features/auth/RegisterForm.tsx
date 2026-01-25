'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormLabel, FormError } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'
import type { AuthResponse } from '@/types'

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: AuthResponse = await response.json()

      if (result.success) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError(result.error || 'Registrasi gagal')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat registrasi')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <FormField>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          type="text"
          placeholder="johndoe"
          {...register('username')}
        />
        {errors.username && (
          <FormError>{errors.username.message}</FormError>
        )}
      </FormField>

      <FormField>
        <FormLabel htmlFor="fullName">Nama Lengkap</FormLabel>
        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          {...register('fullName')}
        />
        {errors.fullName && (
          <FormError>{errors.fullName.message}</FormError>
        )}
      </FormField>

      <FormField>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="nama@email.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError>{errors.email.message}</FormError>
        )}
      </FormField>

      <FormField>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
        {errors.password && (
          <FormError>{errors.password.message}</FormError>
        )}
      </FormField>

      <FormField>
        <FormLabel htmlFor="phone">No. Telepon (Opsional)</FormLabel>
        <Input
          id="phone"
          type="tel"
          placeholder="081234567890"
          {...register('phone')}
        />
        {errors.phone && (
          <FormError>{errors.phone.message}</FormError>
        )}
      </FormField>

      <FormField>
        <FormLabel htmlFor="address">Alamat (Opsional)</FormLabel>
        <Input
          id="address"
          type="text"
          placeholder="Alamat lengkap"
          {...register('address')}
        />
        {errors.address && (
          <FormError>{errors.address.message}</FormError>
        )}
      </FormField>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Memproses...' : 'Daftar'}
      </Button>
    </Form>
  )
}
