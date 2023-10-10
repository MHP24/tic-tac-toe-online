type Props = {
  label: string
  color: string
}

export const Button: React.FC<Props> = ({ label, color }) => {
  return (
    <button className={`box text-shadow box-${color} text-shadow-${color} 
      font-primary text-xl md:text-2xl border-[3px] w-full 
      max-w-sm md:max-w-md p-4 rounded-full bg-c2`}>
      {label}
    </button>
  )
}
