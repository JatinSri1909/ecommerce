'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    title: 'Main Office',
    description: '132 Main Avenue\nWynantskill, NY 12198, United States',
    icon: '📍',
  },
  {
    title: 'Make a Call',
    description: '+1 (518) 365-5210\nMon – Sat: 09am – 08pm',
    icon: '📞',
  },
  {
    title: 'Send a Mail',
    description: 'contact@raizadafuel.com',
    icon: '✉️',
  },
]

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })

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
    setStatus('success')
    setTimeout(() => setStatus('idle'), 3000)
    setFormData({ name: '', phone: '', email: '', service: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={classes.contactWrapper} ref={sectionRef}>
      <div className={classes.contactContent}>
        <div className={classes.content} ref={contentRef}>
          <span className={classes.subtitle}>Get In Touch</span>
          <h2>Any Question?</h2>
          <p>Write Down And Send Us</p>
        </div>

        <form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
          <div className={classes.formGrid}>
            <div className={classes.inputWrapper}>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="text"
                name="service"
                placeholder="Service Description"
                value={formData.service}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.inputWrapper}>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">Submit</button>
          {status === 'success' && (
            <p className={classes.successMessage}>
              Thank you for your message! We'll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className={classes.errorMessage}>Something went wrong. Please try again.</p>
          )}
        </form>

        <div className={classes.contactInfo}>
          {contactInfo.map((info, index) => (
            <div key={index} className={classes.infoItem}>
              <span className={classes.infoIcon}>{info.icon}</span>
              <div className={classes.infoText}>
                <h3>{info.title}</h3>
                <p>{info.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact
