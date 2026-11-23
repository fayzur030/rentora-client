import { Skeleton } from '@/components/ui/skeleton'

interface TableSkeletonProps {
  // Number of placeholder rows.
  rows?: number
  // Number of placeholder columns.
  columns?: number
}

// Skeleton for table based pages (dashboard lists, rentals, users).
const TableSkeleton = ({
  rows = 5,
  columns = 4,
}: TableSkeletonProps) => {
  return (
    <>
      <div className='hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block'>
        <table className='w-full min-w-96 border-collapse'>
          <thead>
            <tr className='border-b border-border bg-muted/40'>
              {Array.from({ length: columns }, (_, columnIndex) => (
                <th key={columnIndex} className='px-4 py-3 text-left'>
                  <Skeleton className='h-4 w-24' />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr
                key={rowIndex}
                className='border-b border-border last:border-0'
              >
                {Array.from({ length: columns }, (_, columnIndex) => (
                  <td key={columnIndex} className='px-4 py-4'>
                    <Skeleton
                      className={
                        columnIndex === 0 ? 'h-4 w-3/4' : 'h-4 w-20'
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='space-y-3 md:hidden'>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className='rounded-2xl border border-border bg-card p-4 shadow-sm'>
            <div className='flex items-center justify-between gap-3'>
              <Skeleton className='h-5 w-2/3' />
              <Skeleton className='h-6 w-16 rounded-full' />
            </div>
            <div className='mt-4 grid grid-cols-2 gap-3 border-t border-border/70 pt-3'>
              {Array.from({ length: Math.min(columns, 4) }, (_, fieldIndex) => (
                <div key={fieldIndex} className='space-y-2'>
                  <Skeleton className='h-3 w-16' />
                  <Skeleton className='h-4 w-24 max-w-full' />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export { TableSkeleton }
