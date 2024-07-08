import React from 'react'

type ButtonProps = {
  className?: string
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ className, text, type = 'button', onClick }: ButtonProps) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
