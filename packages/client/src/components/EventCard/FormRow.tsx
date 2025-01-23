import { ChangeEvent, useState } from 'react'
import { Button, Flex, Grid, Text, TextInput } from '@mantine/core';
import { MdAdd, MdClose } from 'react-icons/md';
import classes from './event.module.css';

type FormRowProps = {
  openedLabel: string,
  closedLabel: string,
  placeholder: string,
  submitLabel?: string,
  submitHandler: (e: any) => void
}
export default function FormRow({ openedLabel, closedLabel, placeholder, submitLabel, submitHandler }: FormRowProps) {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClickOpen = () => {
    setInputOpen(true)
  }

  const handleClickClose = () => {
    setInputOpen(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value)
  }

  const handleClickSubmit = () => {
    submitHandler(inputValue);
    setInputValue("");
  }
    return (
      <>
        <Grid.Col span={4}>
          <Flex justify="flex-end" align="center">
            {inputOpen ? (
              <>
              <Button className={classes.xButton} onClick={handleClickClose} variant="subtle" size="compact-sm"><MdClose /></Button>
              
              <Text>{ openedLabel }</Text>
              </>
              
            ) : (
              <Button leftSection={<MdAdd size={14} />} variant="default" onClick={handleClickOpen}>
                { closedLabel }
              </Button>
            )}
            
          </Flex>
        </Grid.Col>
      <Grid.Col span={8}>
        {inputOpen && (
          <Flex justify="flex-start">
          <TextInput value={inputValue} onChange={handleInputChange} className={classes.formRowInput} placeholder={placeholder}/>
          <Button onClick={handleClickSubmit}>{ submitLabel || 'Submit'}</Button>
        </Flex>
        )}
      </Grid.Col>
      </>
    )
}
