type Props = {
  placeholder: string
  type: string
  label?: string
}

export const Input: React.FC<Props> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      aria-label={placeholder}
      className='w-full py-3 px-4 rounded-md outline-none bg-c2 text-lg font-primary'
    />
  )
}
