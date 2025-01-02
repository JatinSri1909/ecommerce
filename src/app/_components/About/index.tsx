'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import classes from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const content = contentRef.current
    const images = imagesRef.current
    const features = featuresRef.current

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

    gsap.fromTo(content,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo(images,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    )

    const featureElements = features?.children
    if (featureElements) {
      Array.from(featureElements).forEach((feature, index) => {
        gsap.fromTo(feature,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4 + (index * 0.1),
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            }
          }
        )
      })
    }
  }, [])

  return (
    <section className={classes.about} ref={sectionRef}>
      <div className={classes.aboutContent}>
        <div className={classes.imagesWrapper} ref={imagesRef}>
          <div className={classes.imageOne}>
            <Image
              src="/Raizada-Fuel.jpg"
              alt="Raizada Fuel Station"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className={classes.imageTwo}>
            <Image 
              src="/slider3.jpg" 
              alt="Raizada Fuel Store" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </div>

        <div className={classes.content} ref={contentRef}>
          <h3 ref={headingRef}>100% Pure Fuel</h3>
          <h2>Welcome to Raizada Fuel!</h2>
          <p className={classes.subtitle}>
            Your One-Stop Destination for Fuel, Food, and Convenience!
          </p>

          <p>
            At Raizada Fuel, we pride ourselves on providing a friendly and efficient service to meet
            all your fueling and convenience needs. Whether you're a local resident or just passing
            through, our state-of-the-art gas station offers 100% pure fuel, a variety of snacks and
            beverages, and essential services to make your stop quick and enjoyable.
          </p>

          <ul className={classes.features} ref={featuresRef}>
            <li>
              <div className={classes.featureContent}>
                <span className={classes.featureIcon}>⛽</span>
                <p>
                  <strong>Convenient Location</strong>
                  Easily accessible with ample parking and quick in-and-out access for busy travelers.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.featureContent}>
                <span className={classes.featureIcon}>✨</span>
                <p>
                  <strong>Quality Products</strong>
                  We offer only the best products, including our 100% pure oil and a selection of fresh snacks.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.featureContent}>
                <span className={classes.featureIcon}>🤝</span>
                <p>
                  <strong>Customer-Centric Approach</strong>
                  We value our customers and strive to create a welcoming atmosphere where everyone feels at home.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
