type Props = {
  label: string
  color: 'blue' | 'red'
  onClick: (args: any) => any
  height?: number
  text?: string
}

export const Button: React.FC<Props> = ({ label, color, height = 3, onClick, text = '2xl' }) => {
  return (
    <button
      onClick={onClick}
      className={`box text-shadow box-${color} text-shadow-${color} 
      font-primary text-xl md:text-${text} border-2 border-gray-400 w-full 
      max-w-sm md:max-w-md p-${height} rounded-lg bg-c2`}>
      {label}
    </button>
  )
}
