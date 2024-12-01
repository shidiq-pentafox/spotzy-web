import { Grid, SegmentedControl, Text } from '@mantine/core'

const InputSegmentControl = () => {
  return (
    <Grid columns={12} align='center'>
      <Grid.Col span={6}>
        <Text>Parking Type</Text>
      </Grid.Col>
      <Grid.Col span={6}>
        <SegmentedControl color='rgb(76, 108, 90)' fullWidth data={['daily', 'monthly']} radius='md' />
      </Grid.Col>
    </Grid>
  )
}

export default InputSegmentControl