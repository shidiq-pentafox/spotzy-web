import { Grid, Text } from '@mantine/core'
import React from 'react'

const FormLayout = ({label, children}: {label: string, children: React.ReactNode}) => {
  return (
    <Grid columns={12} align='center' my={16}>
      <Grid.Col span={6}>
        <Text>{label}</Text>
      </Grid.Col>
      <Grid.Col span={6}>
        {children}
      </Grid.Col>
    </Grid>
  )
}

export default FormLayout