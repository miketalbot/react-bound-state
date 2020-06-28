import { styleState } from './states'
import Box from '@material-ui/core/Box'
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { CardContent } from '@material-ui/core'
import { Combo, useState, useStyles } from './App'

export function Description() {
  const [description] = useState('description')
  const [color] = styleState.useState('color')
  console.log('draw Description')
  return (
    <Box>
      <Box p={2} color={color}>
        {description}
      </Box>
      <Combo
        property={'color'}
        defaultValue={'red'}
        options={['red', 'darkred', 'blue', 'green', 'darkgreen']}
      />
    </Box>
  )
}

export function Profile() {
  const classes = useStyles()
  const [name] = useState('name')
  const [location] = useState('location')
  console.log('draw Profile')
  return (
    <Card>
      <CardHeader title={'Profile'} action={<Bubble/>}/>
      <CardContent>
        <Box mt={1} className={classes.name}>
          {name}
        </Box>
        <Box mt={1} className={classes.location}>
          {location}
        </Box>
      </CardContent>
    </Card>
  )
}

function Bubble() {
  const [color] = styleState.useState('color')
  const props = styleState.useBinding('style', { attribute: 'style' })
  console.log('draw Bubble')
  return (
    <Box
      style={{ ...props.style }}
      m={1}
      borderRadius={'100%'}
      bgcolor={color}
      width={32}
      height={32}
    >
      Pr
    </Box>
  )
}
