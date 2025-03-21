import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gym'

let gymsRepository: inMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'js gym',
      description: null,
      phone: null,
      latitude: -14.8478133,
      longitude: -40.867746,
    })

    await gymsRepository.create({
      title: 'ts gym',
      description: null,
      phone: null,
      latitude: -14.8478133,
      longitude: -40.867746,
    })

    const { gyms } = await sut.execute({
      query: 'js',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'js gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `js gym ${i}`,
        description: null,
        phone: null,
        latitude: -14.8478133,
        longitude: -40.867746,
      })
    }

    const { gyms } = await sut.execute({
      query: 'js',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'js gym 21' }),
      expect.objectContaining({ title: 'js gym 22' }),
    ])
  })
})
