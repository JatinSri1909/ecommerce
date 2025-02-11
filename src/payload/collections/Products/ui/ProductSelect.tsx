import React, { useCallback, useEffect, useState } from 'react'
import { SelectInput, useField } from 'payload/components/forms'
import CopyToClipboard from 'payload/dist/admin/components/elements/CopyToClipboard'
import { TextField } from 'payload/dist/fields/config/types'

import { Product } from '../../../payload-types'

export const ProductSelect: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [loading, setLoading] = useState(true)

  const getProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products')
      const json = await res.json()

      if (json?.data) {
        const formattedOptions = json.data.map(product => ({
          label: `${product.name} - ${
            product.default_price ? `$${product.default_price.unit_amount / 100}` : 'No price set'
          }`,
          value: product.id,
        }))

        setOptions(formattedOptions)
      }
    } catch (e) {
      console.error('Error fetching products:', e) // eslint-disable-line no-console
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const href = `https://dashboard.stripe.com/${
    process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : ''
  }products/${value}`

  return (
    <div>
      <p style={{ marginBottom: '0' }}>Select a Stripe Product</p>
      <p
        style={{
          marginBottom: '0.75rem',
          color: 'var(--theme-elevation-400)',
        }}
      >
        {`Select the related Stripe product or `}
        <a
          href={`https://dashboard.stripe.com/${
            process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : ''
          }products/create`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--theme-text' }}
        >
          create a new one
        </a>
        {'.'}
      </p>
      <SelectInput
        path={path}
        name="stripeProduct"
        label="Select a Stripe Product"
        options={options}
        value={value}
        onChange={setValue}
      />
      {Boolean(value) && (
        <div
          style={{
            marginTop: '-1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <span
              className="label"
              style={{
                color: '#9A9A9A',
              }}
            >
              {`Manage "${
                options.find(option => option.value === value)?.label || 'Unknown'
              }" in Stripe`}
            </span>
            <CopyToClipboard value={href} />
          </div>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: '600',
            }}
          >
            <a
              href={`https://dashboard.stripe.com/${
                process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : ''
              }products/${value}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {href}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
