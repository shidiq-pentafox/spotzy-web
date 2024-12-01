import { Box, Text } from '@mantine/core'
import React from 'react'

const TextValue = ({label, value, color}: {label: string, value: string | number, color?: string}) => {
  return (
    <Box>
      <Text variant="text" c="dimmed" size='xs'>{label}</Text>
      {
        value ? (
          <Text fw={600} size='md' c={color ?? 'dark'}>{value}</Text>
        ) : (
          <Text c="dimmed">-</Text>
        )
      }
    </Box>
  )
}

export default TextValue