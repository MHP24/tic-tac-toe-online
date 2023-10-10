type Props = {
  label: string
  color: string
}

export const Button: React.FC<Props> = ({ label, color }) => {
  return (
    <button className={`box-${color} text-shadow-${color} 
      font-primary text-2xl border-[3px] w-full max-w-md p-4 rounded-full`}>
      {label}
    </button>
  )
}
