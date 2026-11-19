export default function BookingCancelPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-red-500'>Payment Cancelled!</h1>
        <p className='mt-3 text-muted-foreground'>
          Your payment was cancelled. You can try booking again.
        </p>
      </div>
    </div>
  )
}
