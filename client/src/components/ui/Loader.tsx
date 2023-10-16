import { Grid } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <Grid
      height='140'
      width='140'
      color='#fb1212'
      ariaLabel='grid-loading'
      radius='12.5'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  )
}
