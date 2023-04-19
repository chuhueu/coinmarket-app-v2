
import Header from '../components/Header';

export default function User() {

  return (
    <div className='min-h-screen'>
      <Header />
      <div className='mt-10'></div>
      <div className='w-full p-10'>
        <div className='p-10 bg-[#323546] rounded-xl text-white'>
          <div className='mb-2'><span className='font-bold'>Profile id</span>: {localStorage.getItem('user-profileId') ?? ''}</div>
          <div className='mb-2'><span className='font-bold'>Signature</span>: {localStorage.getItem('user-signature') ?? ''}</div>
          <div><span className='font-bold'>Address</span>: {localStorage.getItem('user-address') ?? ''}</div>
        </div>
      </div>
    </div>
  );
}