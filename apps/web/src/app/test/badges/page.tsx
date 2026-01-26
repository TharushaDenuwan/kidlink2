import { getClient } from '@/lib/rpc/server'
import { get } from 'http'
import React from 'react'

type Props = {}


export default async function BadgesPage({}: Props) {
    const rpc = await getClient()
    const badges = await rpc.
  return (
    <div>BadgesPage</div>
  )
}