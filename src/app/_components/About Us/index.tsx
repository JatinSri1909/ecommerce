'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const content = contentRef.current
    const images = imagesRef.current

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
      content,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      },
    )

    gsap.fromTo(
      images,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      },
    )
  }, [])

  return (
    <section className={classes.aboutUs} ref={sectionRef}>
      <div className={classes.aboutContent}>
        <div className={classes.content} ref={contentRef}>
          <h3 ref={headingRef}>Fueling your journey, one mile and one smile at a time!</h3>
          <h2>About Company</h2>
          <p className={classes.subtitle}>
            Since 2000, Raizada Fuel has been a trusted fuel and convenience store provider
          </p>

          <p>
            We're dedicated to customer convenience, community service, and product quality in
            Wynantskill. We provide high-performance gasoline, eco-friendly alternative fuels, and a
            fully stocked convenience store that offers a range of essentials to meet your needs.
          </p>

          <div className={classes.missionBox}>
            <h4>Our Mission</h4>
            <p>
              To fuel your journey with quality, efficiency, and unmatched customer service. Whether
              it's your daily commute or a long trip, we ensure you have the convenience and quality
              you deserve.
            </p>
          </div>

          <p>
            As a family-owned business with a community-first approach, Raizada Fuel provides
            reliable, high-quality services with a personal touch. Our knowledgeable team is here to
            make each visit smooth and satisfying, treating you like part of the family.
          </p>
        </div>

        <div className={classes.imagesWrapper} ref={imagesRef}>
          <div className={classes.imageOne}>
            <Image
              src="/raizada-history.jpg"
              alt="Raizada Fuel Station History"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={classes.imageTwo}>
            <Image
              src="/raizada-team.jpg"
              alt="Raizada Fuel Team"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
