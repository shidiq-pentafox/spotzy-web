import React from 'react'
import { Box, Button, Grid, Group } from '@mantine/core'
import { checkoutVehicle, getCheckInById } from '../../service/park.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { TextValue, ToastNotification } from '../../components'
import { formatDateToIndianTime } from '../../utils/Utils'
import { IconCheck } from '@tabler/icons-react'
import { toast } from 'react-hot-toast'

const CheckinProfile = ({ checkInId }: { checkInId: string }) => {
  const queryClient = useQueryClient()
  const {data: checkInData, isLoading} = useQuery({
    queryKey: ['checkins', checkInId],
    queryFn: () => getCheckInById(checkInId)
  })

  const handleCheckout = () => {
    checkoutVehicle(checkInId)
    .then((res) => {
      console.log(res)
      toast.success('Vehicle Checked Out Successfully')
      queryClient.invalidateQueries({ queryKey: ['checkin', checkInId] })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Box>
      <Grid>
        <Grid.Col span={6}>
          <TextValue label='Customer Name' value={checkInData?.vehicle?.customer?.name} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Customer Mobile' value={checkInData?.vehicle?.customer?.phone} />
        </Grid.Col>
        <Grid.Col span={6}> 
          <TextValue label='Vehicle Number' value={checkInData?.vehicle?.vehicleNo} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Vehicle Type' value={checkInData?.vehicle?.vehicleType?.name} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Parking Spot' value={checkInData?.parkingSpot?.spotNumber} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Parking State' value={checkInData?.status} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Parking Method' value={checkInData?.parkingMethod} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Advance Amount' value={checkInData?.advanceAmount} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Tariff' value={checkInData?.tariff?.rate} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Total Cost' value={checkInData?.calculatedAmount} color='rgb(76, 108, 90)' />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Check-in Time' value={formatDateToIndianTime(checkInData?.checkinTime)} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextValue label='Check-out Time' value={formatDateToIndianTime(checkInData?.checkOutTime)} />
        </Grid.Col>
      </Grid>

      <Group mt={20}>
        <Button
          leftSection={<IconCheck size={14} />}
          variant='light'
          color='rgb(76, 108, 90)'
          radius='md'
          onClick={handleCheckout}
        >Checkout</Button>
      </Group>
    </Box>
  )
}

export default CheckinProfile