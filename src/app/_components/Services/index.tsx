'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: '100% Pure Fuel',
    description:
      'We provide only the highest quality, 100% pure oil to keep your engine running smoothly and efficiently.',
    icon: '⛽',
  },
  {
    title: 'Pre-Order & Pick Up',
    description:
      'Order your snacks, drinks, and fuel ahead of time, and pick them up without any wait.',
    icon: '🛍️',
  },
  {
    title: 'Convenience Store',
    description:
      'Grab a variety of fresh snacks, beverages, and essentials during your quick stop.',
    icon: '🏪',
  },
  {
    title: 'Gift Cards',
    description:
      'Looking for the perfect gift? Our Raizada Fuel gift cards are a thoughtful way to treat friends and family. Available in various denominations.',
    icon: '🎁',
  },
  {
    title: 'Check Tire Pressure & Fluids',
    description:
      'Keep your tires properly inflated and top off fluids with our easy-to-use air and water stations available at all locations.',
    icon: '🚗',
  },
  {
    title: 'EV Charging Stations',
    description:
      'Catering to the future of travel, our electric vehicle charging stations are fast, reliable, and available 24/7. (Coming Soon)',
    icon: '⚡',
  },
]

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subHeadingRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const subHeading = subHeadingRef.current
    const cards = cardsRef.current

    gsap.fromTo(heading,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo(subHeading,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    )

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2 + (index * 0.1),
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    })
  }, [])

  return (
    <div ref={sectionRef}>
      <div className={classes.heading}>
        <h2 ref={headingRef}>Our Services – More Than Just Fuel</h2>
        <p ref={subHeadingRef}>
          Explore the full range of services designed to make your stops quick, convenient, and
          enjoyable.
        </p>
      </div>
      <div className={classes.services}>
        {services.map((service, index) => (
          <div 
            key={index} 
            className={classes.serviceCard}
            ref={el => cardsRef.current[index] = el as HTMLDivElement}
          >
            <span className={classes.icon}>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
