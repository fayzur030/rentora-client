'use client'

import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { Badge } from '@/components/ui/badge'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { updateUserRole } from '@/lib/actions/users'
import type { RoleChange, UserRole, Users } from '@/types/users'

interface ManageUsersTableProps {
  users: Users[]
  errorMessage: string | null
}

const userRoles: UserRole[] = ['customer', 'owner', 'admin']

const roleLabels: Record<UserRole, string> = {
  customer: 'Customer',
  owner: 'Owner',
  admin: 'Admin',
}

const roleBadgeStyles: Record<UserRole, string> = {
  customer: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  owner: 'border-amber-200 bg-amber-50 text-amber-800',
  admin: 'border-primary/20 bg-primary/10 text-primary',
}

const formatRegistrationDate = (date: string) => {
  const registrationDate = new Date(date)

  if (Number.isNaN(registrationDate.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(registrationDate)
}

const ManageUsersTable = ({
  users: initialUsers,
  errorMessage,
}: ManageUsersTableProps) => {
  const [users, setUsers] = useState(initialUsers)
  const [roleChange, setRoleChange] = useState<RoleChange | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleRoleSelection = (user: Users, newRole: string | null) => {
    if (!newRole || newRole === user.role) return

    setRoleChange({
      userId: user._id,
      userName: user.name,
      newRole: newRole as UserRole,
    })
  }

  const handleRoleUpdate = async () => {
    if (!roleChange) return

    try {
      setIsUpdating(true)

      await updateUserRole(roleChange.userId, roleChange.newRole)

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id === roleChange.userId
            ? { ...user, role: roleChange.newRole }
            : user
        )
      )

      toast.success('User role updated successfully')
      setRoleChange(null)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update user role'
      )
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      {errorMessage ? (
        <div
          role='alert'
          className='rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive'
        >
          {errorMessage}
        </div>
      ) : (
        <div className='space-y-2'>
          <p className='text-xs text-muted-foreground sm:hidden'>
            Swipe sideways to see all table columns.
          </p>

          <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
            <Table className='min-w-190'>
              <TableHeader className='bg-muted/40'>
                <TableRow className='hover:bg-transparent'>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead className='text-right'>Manage User</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className='h-28 text-center text-muted-foreground'
                    >
                      No registered users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id} className='hover:bg-muted/35'>
                      <TableCell className='font-semibold text-foreground'>
                        {user.name}
                      </TableCell>

                      <TableCell className='text-foreground'>
                        {user.email}
                      </TableCell>

                      <TableCell>
                        <Badge className={roleBadgeStyles[user.role]}>
                          {roleLabels[user.role]}
                        </Badge>
                      </TableCell>

                      <TableCell className='whitespace-nowrap'>
                        {formatRegistrationDate(user.createdAt)}
                      </TableCell>

                      <TableCell className='text-right'>
                        <Select
                          value={user.role}
                          onValueChange={(newRole) =>
                            handleRoleSelection(user, newRole)
                          }
                          disabled={isUpdating}
                        >
                          <SelectTrigger
                            aria-label={`Change role for ${user.name}`}
                            className='ml-auto w-36 bg-background'
                          >
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent align='end'>
                            {userRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {roleLabels[role]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <AlertDialog
        open={roleChange !== null}
        onOpenChange={(open) => {
          if (!open && !isUpdating) {
            setRoleChange(null)
          }
        }}
      >
        <AlertDialogContent className='border-border/50 bg-background/90 shadow-2xl'>
          <AlertDialogHeader>
            <AlertDialogTitle>Change user role?</AlertDialogTitle>

            <AlertDialogDescription>
              Change {roleChange?.userName}&apos;s role to{' '}
              {roleChange ? roleLabels[roleChange.newRole] : ''}? This will
              update their access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleRoleUpdate} disabled={isUpdating}>
              {isUpdating && (
                <LoaderCircle
                  className='size-4 animate-spin'
                  aria-hidden='true'
                />
              )}

              {isUpdating ? 'Updating...' : 'Confirm role change'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ManageUsersTable
