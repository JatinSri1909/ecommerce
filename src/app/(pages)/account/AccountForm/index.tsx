'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

const AccountForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, setUser } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            email: json.doc.email,
            name: json.doc.name,
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    if (user) {
      reset({
        email: user.email,
        name: user.name,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {(error || success) && (
        <Message error={error} success={success} className={classes.message} />
      )}
      
      <div className={classes.inputWrap}>
        {!changePassword ? (
          <Fragment>
            <Input
              name="email"
              label="Email Address"
              required
              register={register}
              error={errors.email}
              type="email"
            />
            <Input 
              name="name" 
              label="Name" 
              register={register} 
              error={errors.name} 
            />
          </Fragment>
        ) : (
          <Fragment>
            <Input
              name="password"
              type="password"
              label="New Password"
              required
              register={register}
              error={errors.password}
            />
            <Input
              name="passwordConfirm"
              type="password"
              label="Confirm New Password"
              required
              register={register}
              validate={value => value === password.current || 'The passwords do not match'}
              error={errors.passwordConfirm}
            />
          </Fragment>
        )}
      </div>

      <div className={classes.switchModes}>
        {!changePassword ? (
          <Fragment>
            Want to change your password?
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => setChangePassword(true)}
            >
              Click here
            </button>
          </Fragment>
        ) : (
          <Fragment>
            Want to update your profile?
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => setChangePassword(false)}
            >
              Click here
            </button>
          </Fragment>
        )}
      </div>

      <Button
        type="submit"
        label={isLoading ? 'Processing...' : changePassword ? 'Update Password' : 'Update Profile'}
        disabled={isLoading}
        appearance="primary"
        className={classes.submit}
      />
    </form>
  )
}

export default AccountForm
