import React from 'react'
import { Metadata } from 'next'

import AboutUs from '../../_components/About Us'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

export default function About() {
  return <AboutUs />
}

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company and mission.',
  openGraph: mergeOpenGraph({
    title: 'About Us',
    url: '/about',
  }),
}
