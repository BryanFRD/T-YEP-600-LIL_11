type FormInputComponentProps = {
  type?: string
  name?: string
  placeholder?: string
  className?: string
    text?: string
    value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInputComponent = ({
  type,
  name,
  placeholder,
  className,
  text
}: FormInputComponentProps) => {
  return (
    <>
      <input
        type={type ?? 'text'}
        name={name}
        placeholder={placeholder}
        className={`${className ?? ''} forminputcomponent_input`}
        
      ></input>
      {text && <p>{text}</p>}
    </>
  )
}

export default FormInputComponent
