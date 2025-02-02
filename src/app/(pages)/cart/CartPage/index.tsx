'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { cart, cartIsEmpty, addItemToCart, cartTotal, refundableTotal, deliveryCharge } = useCart()
  const { user } = useAuth()

  return (
    <Fragment>
      <br />
      {!cartIsEmpty ? (
        <Fragment>
          <div className={classes.cartWrapper}>
            <div>
              {/* CART LIST HEADER */}
              <div className={classes.header}>
                <p>Products</p>
                <div className={classes.headerItemDetails}>
                  <p></p>
                  <p></p>
                  <p>Quantity</p>
                </div>
                <p className={classes.headersubtotal}>Total</p>
              </div>
              {/* CART ITEM LIST */}
              <ul className={classes.itemsList}>
                {cart?.items?.map((item, index) => {
                  if (typeof item.product === 'object') {
                    const {
                      quantity,
                      product,
                      product: { id, title, meta, stripeProductID },
                    } = item

                    const metaImage = meta?.image

                    return (
                      <CartItem
                        key={index}
                        product={product}
                        title={title}
                        metaImage={metaImage}
                        qty={quantity}
                        addItemToCart={addItemToCart}
                      />
                    )
                  }
                  return null
                })}
              </ul>
            </div>

            <div className={classes.summary}>
              <div className={classes.row}>
                <p>Refundable Amount</p>
                <p>{refundableTotal?.formatted}</p>
              </div>
              <div className={classes.row}>
                <p>Delivery</p>
                <p>{deliveryCharge?.formatted || '$0'}</p>
              </div>
              <div className={[classes.row, classes.total].join(' ')}>
                <p>Total</p>
                <p>
                  {((cartTotal?.raw + refundableTotal?.raw) / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </p>
              </div>

              <Button
                className={classes.checkoutButton}
                href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                label={user ? 'Checkout' : 'Login to checkout'}
                appearance="primary"
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <div className={classes.empty}>
          Your cart is empty.
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`} className={classes.emptyLink}>
                Continue shopping?
              </Link>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  )
}
