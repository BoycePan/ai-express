import { get } from './request'

export interface AreaData {
  p: Array<{ i: string; n: string }>
  c: Record<string, Array<{ i: string; n: string }>>
  d: Record<string, Array<{ i: string; n: string }>>
}

export async function getAreaData(): Promise<AreaData> {
  const response = await get<AreaData>('/areas/data')
  return response.data
}
