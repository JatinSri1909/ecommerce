import React from 'react'
import Link from 'next/link'

import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'

import classes from './index.module.scss'

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.content}>
        <div className={classes.titleWrapper}>
          <h3>
            Shop <span>By</span> Categories
          </h3>
          <Link href="/products">View All Categories</Link>
        </div>

        <div className={classes.list}>
          {categories.map(category => {
            return <CategoryCard key={category.id} category={category} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Categories
