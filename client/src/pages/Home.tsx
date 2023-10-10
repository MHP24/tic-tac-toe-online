import { Button } from '../components/ui'

export const Home = () => {
  return (
    <section className='flex flex-col gap-16 justify-center h-screen'>
      <h1 className='font-primary text-8xl text-center text-shadow-blue italic'>Tic tac toe
        <br/><span className='text-shadow-red'>Online</span></h1>
      <h2 className='font-primary text-center text-3xl'>Matches active now: 10</h2>
      <div className='flex flex-col items-center gap-10'>
        <Button label='Join game' color='red'/>
        <Button label='Create new game' color='blue'/>
      </div>
    </section>
  )
}
