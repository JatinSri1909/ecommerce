import React from 'react'
import { Metadata } from 'next'

import Contact from '../../_components/Contact'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

export default function ContactPage() {
  return <Contact />
}

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us.',
  openGraph: mergeOpenGraph({
    title: 'Contact Us',
    url: '/contact',
  }),
}
