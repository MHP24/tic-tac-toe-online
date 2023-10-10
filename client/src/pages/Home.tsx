import { Button, Modal } from '../components/ui'
import { useModal } from '../hooks'

export const Home = () => {
  const { open, ...rest } = useModal()

  return (
    <>
      <Modal {...rest}>
        <div className='w-full h-[50vh]'>
          <p>Example text from children</p>
        </div>
      </Modal>
      <section className='flex flex-col gap-16 justify-center h-screen bg-bg bg-fixed bg-center bg-cover p-10'>
        <h1 className='font-primary text-6xl md:text-7xl lg:text-8xl text-center text-shadow-blue italic'>Tic tac toe
          <br/><span className='text-shadow-red'>Online</span></h1>
        <h2 className='font-primary text-center text-2xl md:text-3xl'>Matches active now: 10</h2>
        <div className='flex flex-col items-center gap-10'>
          <Button label='Join game' color='red' onClick={open}/>
          <Button label='Create new game' color='blue' onClick={() => {}}/>
        </div>
      </section>
    </>
  )
}
