import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit'>{pending ? "Logging in ..." : "Login"}</button>
  )
}

export default SubmitButton