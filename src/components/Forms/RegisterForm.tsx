'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { registerFormSchema } from '@/lib/validations/auth/authValidations'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      // role: 'Team Lead',
    },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values)
    const formData = new URLSearchParams()
    formData.append('username', values.email)
    formData.append('password', values.password)
    formData.append('job_title', values.job_title)
    formData.append('role', values.role)
    const res = await fetch('http://18.237.25.116:8000/register', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    // if (data.access_token) {
    //   // setAccesstoken(data.access_token)
    //   navigate(state.from ? state.from : '/')
    // }

    if (data.detail) {
      toast.error(data.detail)
      // setloading(false)
      return
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 '>
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
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
              {/* <FormLabel>Role</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='h-14  text-lg font-normal text-black/60 focus:ring-1 focus:ring-[#69C920]  focus:ring-offset-1 focus:ring-offset-[#69C920]'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select your Role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Team Lead'>Team Lead</SelectItem>
                  <SelectItem value='Customer Success Manager'>
                    Customer Success Manager
                  </SelectItem>
                  <SelectItem value='Customer Success Manager II'>
                    Customer Success Manager II
                  </SelectItem>
                  <SelectItem value='Super Admin'>Super Admin</SelectItem>
                  <SelectItem value='Admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          asChild
          className=' bg-[#69C920] px-6 text-lg flex items-center gap-1 '
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
  )
}

export default RegisterForm
