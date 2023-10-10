type Props = {
  label: string
  color: 'blue' | 'red'
  onClick: (args: any) => void
  height?: number
}

export const Button: React.FC<Props> = ({ label, color, height = 3, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`box text-shadow box-${color} text-shadow-${color} 
      font-primary text-xl md:text-2xl border-[3px] w-full 
      max-w-sm md:max-w-md p-${height} rounded-lg bg-c2`}>
      {label}
    </button>
  )
}
