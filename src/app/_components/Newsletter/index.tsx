'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const form = formRef.current

    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      },
    )

    gsap.fromTo(
      form,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      },
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the newsletter subscription
    // For now, we'll just simulate a success response
    setStatus('success')
    setTimeout(() => setStatus('idle'), 3000)
    setEmail('')
  }

  return (
    <div className={classes.newsletterWrapper} ref={sectionRef}>
      <div className={classes.newsletterContent}>
        <div className={classes.content} ref={contentRef}>
          <h2>Subscribe to Our Newsletter</h2>
          <p>
            Stay updated with our latest offers, fuel prices, and eco-friendly initiatives. Join our
            community today!
          </p>
        </div>
        <form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
          <div className={classes.inputWrapper}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </div>
          {status === 'success' && (
            <p className={classes.successMessage}>Thank you for subscribing!</p>
          )}
          {status === 'error' && (
            <p className={classes.errorMessage}>Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Newsletter
