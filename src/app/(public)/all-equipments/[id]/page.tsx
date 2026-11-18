import { getEquipmentById } from '@/lib/api/equipments'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Gauge,
  ImageOff,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
} from 'lucide-react'

interface EquipmentDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

const EquipmentDetailsPage = async ({ params }: EquipmentDetailsPageProps) => {
  const { id } = await params

  const equipment = await getEquipmentById(id)
  const imageSrc = equipment.image?.trim()
  const isLocalImage = Boolean(
    imageSrc?.startsWith('/') && !imageSrc.startsWith('//')
  )
  const isImgBbImage = imageSrc?.startsWith('https://i.ibb.co/') ?? false
  const isAvailable = equipment.availableQuantity > 0

  const statusStyles = {
    Approved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Pending: 'border-amber-300 bg-amber-50 text-amber-800',
    Rejected: 'border-rose-200 bg-rose-50 text-rose-700',
  }

  const equipmentDetails = [
    {
      label: 'Rental type',
      value: equipment.rentalType,
      icon: Package,
    },
    {
      label: 'Location',
      value: equipment.location,
      icon: MapPin,
    },
    {
      label: 'Available quantity',
      value: `${equipment.availableQuantity} ${
        equipment.availableQuantity === 1 ? 'unit' : 'units'
      }`,
      icon: Package,
    },
    {
      label: 'Condition',
      value: equipment.condition,
      icon: Gauge,
    },
  ]

  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8'>
        <Link
          href='/all-equipments'
          className='mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary'
        >
          <ArrowLeft className='size-4' aria-hidden='true' />
          Back to equipment
        </Link>

        <section className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10'>
          <div className='relative min-h-72 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lg shadow-primary/5 sm:min-h-[440px]'>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={equipment.name}
                fill
                priority
                unoptimized={!isLocalImage && !isImgBbImage}
                sizes='(max-width: 1023px) 100vw, 55vw'
                className='object-cover'
              />
            ) : (
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground'>
                <ImageOff className='size-10' aria-hidden='true' />
                <span className='text-sm'>Image unavailable</span>
              </div>
            )}
          </div>

          <div className='flex flex-col justify-center rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-7 lg:p-8'>
            <div className='mb-5 flex flex-wrap items-center gap-2'>
              <Badge className='border-primary/20 bg-primary/10 text-primary'>
                {equipment.category}
              </Badge>
              <Badge
                className={
                  statusStyles[equipment.status] ??
                  'border-border bg-muted text-muted-foreground'
                }
              >
                {equipment.status}
              </Badge>
            </div>

            <p className='mb-2 text-xs font-semibold tracking-[0.18em] text-secondary uppercase'>
              Equipment details
            </p>
            <h1 className='font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              {equipment.name}
            </h1>
            <p className='mt-4 leading-7 text-muted-foreground'>
              {equipment.description}
            </p>

            <div className='mt-7 rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6'>
              <p className='text-sm font-medium text-muted-foreground'>
                Rental price
              </p>
              <div className='mt-1 flex flex-wrap items-baseline gap-2'>
                <span className='font-heading text-3xl font-bold text-primary'>
                  ৳{equipment.rentalPrice.toLocaleString()}
                </span>
                <span className='text-sm text-muted-foreground'>
                  / {equipment.rentalType.toLowerCase()}
                </span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {equipmentDetails.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className='flex min-w-0 items-start gap-3 rounded-xl border border-border/80 bg-background/70 p-4 transition-colors hover:border-primary/25'
                >
                  <span className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/30 text-primary'>
                    <Icon className='size-4' aria-hidden='true' />
                  </span>
                  <div className='min-w-0'>
                    <p className='text-xs font-medium text-muted-foreground'>
                      {label}
                    </p>
                    <p className='mt-1 break-words text-sm font-semibold text-foreground'>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-5 flex items-center gap-2 text-sm'>
              <span
                className={`size-2 rounded-full ${
                  isAvailable ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                aria-hidden='true'
              />
              <span
                className={
                  isAvailable
                    ? 'font-medium text-emerald-700'
                    : 'font-medium text-rose-700'
                }
              >
                {isAvailable ? 'Currently available' : 'Currently unavailable'}
              </span>
            </div>
          </div>
        </section>

        <section className='mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]'>
          <Card className='rounded-2xl border border-border/80 bg-card py-0 shadow-sm shadow-primary/5 ring-0'>
            <CardContent className='p-6 sm:p-7'>
              <div className='flex items-center gap-2'>
                <ShieldCheck
                  className='size-5 text-primary'
                  aria-hidden='true'
                />
                <h2 className='font-heading text-lg font-bold text-foreground'>
                  Owner information
                </h2>
              </div>

              <div className='mt-6 flex items-center gap-4'>
                <Avatar className='size-14'>
                  {equipment.owner.image ? (
                    <AvatarImage
                      src={equipment.owner.image}
                      alt={equipment.owner.name}
                    />
                  ) : null}
                  <AvatarFallback className='bg-primary/10 text-lg font-semibold text-primary'>
                    {equipment.owner.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className='min-w-0'>
                  <p className='truncate font-semibold text-foreground'>
                    {equipment.owner.name}
                  </p>
                  <p className='mt-1 flex min-w-0 items-center gap-2 text-sm text-muted-foreground'>
                    <Mail
                      className='size-4 shrink-0 text-secondary'
                      aria-hidden='true'
                    />
                    <span className='truncate'>{equipment.owner.email}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='rounded-2xl border border-border/80 bg-card py-0 shadow-sm shadow-primary/5 ring-0'>
            <CardContent className='p-6 sm:p-7'>
              <h2 className='font-heading text-lg font-bold text-foreground'>
                Rental terms and conditions
              </h2>
              <p className='mt-4 whitespace-pre-line leading-7 text-muted-foreground'>
                {equipment.rentalTerms}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default EquipmentDetailsPage
