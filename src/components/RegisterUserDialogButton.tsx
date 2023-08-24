import { Button } from '@/components/ui/button'
// import { useId } from 'react'
// import generator from 'generate-password'
import { v4 as uuidv4 } from 'uuid'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  //   DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { registerFormSchema } from '@/lib/validations/auth/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import RegisterForm from './Forms/RegisterForm'

const roles = [
  'Team Lead',
  'Customer Success Manager',
  'Customer Success Manager II',
  'Recruitment Manager',
  'Recruitment Specialist',
  'Operations Manager',
  'Super Admin',
  'Admin',
]

export function RegisterUserDialogButton() {
  const [open, setopen] = useState(false)
  const { access_token } = useAuthStore()
  const [randomPassword, setrandomPassword] = useState('')
  // const [showPassword, setshowPassword] = useState(false)

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: randomPassword,
      job_title: '',
      role: 'Admin',
      // role: 'Team Lead',
    },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values)
    const res = await fetch('http://18.237.25.116:8000/register', {
      method: 'POST',

      headers: {
        accept: 'application/json',
        authorization: `Bearer ${access_token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: values.email,
        password: values.password,
        job_title: values.job_title,
        role: values.role,
      }),
    })
    const data = await res.json()

    if (data.detail) {
      toast.error(data.detail)
      return
    }
    toast.success('New CSM Account Created')
    setopen(false)
    setrandomPassword('')
    form.reset()
  }
  const GeneratePassword = () => {
    const password = uuidv4()

    setrandomPassword(password)
  }
  // console.log(form.getValues())
  useEffect(() => {
    // This effect will trigger whenever randomPassword changes
    if (randomPassword) {
      form.setValue('password', randomPassword)
    }
  }, [randomPassword, form])

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create User</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create a new CSM User</DialogTitle>
          <DialogDescription>Enter credentials for csm user</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className=' max-w-md '>
                  <FormControl>
                    <Input
                      className='  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                      placeholder='Email'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-y-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className=' max-w-md'>
                    <FormControl>
                      <Input
                        className='  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                        placeholder='Password'
                        {...field}
                        value={randomPassword}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                // disabled={form.formState.isSubmitting}
                asChild
                className=' bg-[#69C920] px-2  text-sm w-fit '
                type='button'
              >
                <button type='button' onClick={() => GeneratePassword()}>
                  Generate Password
                </button>
              </Button>
            </div>

            <FormField
              control={form.control}
              name='job_title'
              render={({ field }) => (
                <FormItem className=' max-w-md '>
                  <FormControl>
                    <Input
                      className='  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                      placeholder='Job Title'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className=' max-w-xs   '>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className=' text-lg font-normal text-black/60 focus:ring-1 focus:ring-[#69C920]  focus:ring-offset-1 focus:ring-offset-[#69C920]'>
                      <SelectTrigger>
                        <SelectValue placeholder='Select your Role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              asChild
              className=' bg-[#69C920] px-6 text-lg flex items-center gap-1 w-full'
              type='submit'
            >
              {form.formState.isSubmitting ? (
                <button className=' gap-x-1'>
                  Creating User
                  <Loader2 className='mr-2 h-4 w-4 animate-spin mt-1' />
                </button>
              ) : (
                <button>Create User</button>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
