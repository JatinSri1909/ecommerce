'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'John Smith',
    role: 'Regular Customer',
    comment:
      "Best fuel station in the area! The quality of fuel is exceptional, and the staff is always helpful. I've been a regular customer for years.",
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Local Business Owner',
    comment:
      'The convenience store has everything I need, and the service is always quick. Their 24/7 availability is a lifesaver for my business needs.',
    rating: 5,
  },
  {
    name: 'Mike Brown',
    role: 'Truck Driver',
    comment:
      "Clean facilities, accurate meters, and friendly staff. It's my go-to station whenever I'm in the area. The free gas pump service is fantastic!",
    rating: 5,
  },
]

const Testimonial: React.FC = () => {
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
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3 + (index * 0.2),
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      )
    })
  }, [])

  return (
    <div className={classes.testimonialWrapper} ref={sectionRef}>
      <div className={classes.testimonialContent}>
        <div className={classes.heading}>
          <h2 ref={headingRef}>People Say The Nicest Things</h2>
          <p ref={subHeadingRef}>Experience the Difference – Hear from Our Satisfied Customers!</p>
        </div>
        <div className={classes.testimonials}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={classes.testimonialCard}
              ref={el => cardsRef.current[index] = el as HTMLDivElement}
            >
              <div className={classes.stars}>{'★'.repeat(testimonial.rating)}</div>
              <p className={classes.comment}>{testimonial.comment}</p>
              <div className={classes.author}>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial
