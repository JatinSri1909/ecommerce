'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const alternatives = [
  {
    title: 'High-Performance Gasoline',
    description:
      'High-Performance Gasoline with Ethanol Fuel Treatment for a Smoother Ride, Every Time.',
    icon: '⚡',
  },
  {
    title: 'Biodiesel',
    description:
      'Made from renewable resources such as vegetable oils and animal fats, biodiesel is a cleaner-burning diesel replacement that helps reduce reliance on fossil fuels.',
    icon: '🌱',
  },
  {
    title: 'CNG (Ethanol Free)',
    description:
      'A cost-effective and clean-burning alternative to gasoline and diesel, CNG is ideal for fleet vehicles and those looking to minimize their carbon footprint.',
    icon: '🌿',
  },
]

const Alternative: React.FC = () => {
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
          delay: 0.2 + index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        },
      )
    })
  }, [])

  return (
    <div className={classes.alternativeWrapper} ref={sectionRef}>
      <div className={classes.alternativeContent}>
        <div className={classes.heading}>
          <h2 ref={headingRef}>Explore Our Alternative Fuels</h2>
          <p ref={subHeadingRef}>Eco-friendly options for a greener journey!</p>
        </div>
        <div className={classes.alternatives}>
          {alternatives.map((alternative, index) => (
            <div
              key={index}
              className={classes.alternativeCard}
              ref={el => (cardsRef.current[index] = el as HTMLDivElement)}
            >
              <span className={classes.icon}>{alternative.icon}</span>
              <h3>{alternative.title}</h3>
              <p>{alternative.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Alternative
