import { type LegacyRef, forwardRef } from 'react'

type Props = {
  placeholder: string
  type: string
  label?: string
  hasError?: boolean
}

export const Input: React.FC<Props> = forwardRef(
  ({ type, placeholder, label, hasError = false, ...rest }, ref) => {
    return (
      <div className={`${label ? 'grid grid-cols-2 gap-3 items-center' : ''}`}>
        {
          Boolean(label) && (
            <label className='font-primary text-left text-lg'>
              {label}
            </label>
          )
        }
        <input
          ref={ref as LegacyRef<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          aria-label={placeholder}
          {...rest}
          className={`
            w-full py-3 px-4 rounded-md outline-none bg-c2 text-lg font-primary
            ${hasError && 'box-red'}
          `}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
