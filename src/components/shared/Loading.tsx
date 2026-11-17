interface LoadingProps {
  message?: string
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-4'>
      <div className='relative h-12 w-12'>
        <div className='absolute inset-0 animate-spin rounded-full border-[3px] border-[#F5A623]/20 border-t-[#F5A623]' />

        <div className='absolute inset-[10px] animate-pulse rounded-full bg-[#F5A623]/20' />
      </div>

      <p className='text-sm font-medium text-muted-foreground'>{message}</p>
    </div>
  )
}

export default Loading
