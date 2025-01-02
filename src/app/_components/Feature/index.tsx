'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Correct Meter',
    description:
      'We use the latest fuel meters to ensure accurate measurements for every gallon, so you get exactly what you pay for.',
    icon: '⚖',
  },
  {
    title: 'Best Quality Fuel',
    description:
      'Our fuel is sourced from trusted suppliers, guaranteeing high-quality oil that enhances your vehicle’s performance and longevity.',
    icon: '⛽',
  },
  {
    title: '24/7 Services',
    description:
      'We’re here for you around the clock! Whether you need fuel, snacks, or essential services, our team is ready to serve you any time of day or night.',
    icon: '🕒',
  },
  {
    title: 'Free Gas Pump',
    description:
      'Enjoy a complimentary gas pump service for your convenience! Let our friendly staff handle your refueling while you relax.',
    icon: '💸',
  },
  {
    title: 'Friendly Staff',
    description:
      'Our knowledgeable and friendly staff is always ready to assist you with a smile. We prioritize customer satisfaction and are here to make your experience enjoyable.',
    icon: '🤗',
  },
  {
    title: 'Clean and Safe Environment',
    description:
      'We maintain a clean and safe environment for all our customers. Our station is regularly cleaned and well-lit, ensuring you feel secure during your visit.',
    icon: '🧼',
  },
]

const Feature: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subHeadingRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const subHeading = subHeadingRef.current
    const cards = cardsRef.current

    gsap.fromTo(
      heading,
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
      subHeading,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      },
    )

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        },
      )
    })
  }, [])

  return (
    <div className={classes.featureWrapper} ref={sectionRef}>
      <div className={classes.content}>
        <h2 ref={headingRef}>Why Choose Raizada Fuel?</h2>
        <p ref={subHeadingRef}>Experience the Difference with Our Top-Notch Services!</p>
        <div className={classes.features}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={classes.featureCard}
              ref={el => (cardsRef.current[index] = el as HTMLDivElement)}
            >
              <span className={classes.icon}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feature
