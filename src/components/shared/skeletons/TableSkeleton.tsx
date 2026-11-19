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
    <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
      <div className='overflow-x-auto'>
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
    </div>
  )
}

export { TableSkeleton }
